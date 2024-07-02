import React, { useEffect, useState } from 'react'
import { Table, Button } from "antd";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
const Users = () => {

  const [users, setUsers] = useState([])
  const token = Cookies.get("token");
  const userRedux = useSelector((state) => state.admin);
  useEffect(() => {
    controller.getAll(endpoints.users, userRedux.id, token).then((res) => {
      setUsers(res.data);
    });

  }, [userRedux, token]);


  const columns = [
    {
      title: 'Image',
      dataIndex: 'src',
      render: (record) => {
        return <img src={record} width={"80px"} height={80} style={{ objectFit: 'cover' }} />
      }
    },
    {
      title: 'Username',
      dataIndex: 'username',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: users.map((user) => {
        return {
          text: user.username,
          value: user.username,
        }
      }
      ),

      onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Password',
      dataIndex: 'password',
    },
    {
      title: "Delete",
      render: (record) => {
        return (
          <Button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  setUsers((currentBlogs) => currentBlogs.filter((x) => x._id !== record._id));
                  controller.delete(endpoints.users, record._id, token);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              });
            }}
            style={{ color: 'red', border: 'none', fontSize: 18 }}
          >
            <MdDelete />
          </Button>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>

      <Table
        columns={columns}
        dataSource={users}
        onChange={onChange}
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        pagination={{
          defaultPageSize: 3,
          pageSizeOptions: ["2", "5", "10"],
          showSizeChanger: true,
        }}
        style={{ paddingTop: '120px' }}
      />

    </>
  )
}

export default Users