
import React, { useEffect, useState } from 'react';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { Button, Table } from "antd";
import { MdDelete } from "react-icons/md";
const OurTeam = () => {
  const token = Cookies.get('token');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.teams, token).then((resp) => {
      setTeams([...resp.data]);
    });
  }, [token]);
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (record) => {
        return <img src={record} width={"80px"} height={80} style={{ objectFit: 'cover' }} />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: teams.map((team) => {
        return {
          text: team.title,
          value: team.title,
        }
      }
      ),

      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
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

                  setTeams((currentTeam) => {
                    return currentTeam.filter((x) => x._id !== record._id);
                  });
                  controller.delete(endpoints.teams, record._id, token);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              });
            }}
            style={{color:'red',border:'none',fontSize:18}}
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
    <Table
    columns={columns}
    dataSource={teams}
    onChange={onChange}
    showSorterTooltip={{
      target: 'sorter-icon',
    }}
    style={{ paddingTop: '120px' }}
  />

  )
}

export default OurTeam