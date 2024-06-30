import React, { useEffect, useState } from 'react';
import { Table, Tooltip, Button } from 'antd';
import Cookies from 'js-cookie';
import { useDeleteByIdMenuMutation, useGetMenusQuery } from '../../services/redux/procektApi';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2"; 
const Products = () => {
  const [users, setUsers] = useState([]);
  const userRedux = useSelector((state) => state.user);
  const token = Cookies.get('token');
  const { data: menus, refetch } = useGetMenusQuery();
  const [deleteProduct] = useDeleteByIdMenuMutation()
  
  useEffect(() => {
    controller.getAll(endpoints.users, token).then((res) => {
      setUsers(res.data);
    });
  }, [token]);
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (record) => {
        return <img src={record} width={'80px'} height={80} style={{ objectFit: 'cover' }} alt="Product" />;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: menus?.data.map((menu) => ({
        text: menu.title,
        value: menu.title,
      })),
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text) => (
        <Tooltip title={text}>
          <span>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</span>
        </Tooltip>
      ),
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      render: (likes) => (
        <div>
          <span>Likes ({likes.length})</span>
          <div>
            {likes.map((like, index) => {
              const user = users.find((user) => user._id === like.userId);
              return (
                <div key={index}>
                  <span>{user ? user.username : 'Unknown User'}</span>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      render: (comments) => (
        <div>
          <span>Comments ({comments.length})</span>
          {comments.map((comment, index) => {
            const user = users.find((user) => user._id === comment.userId);
            return (
              <Tooltip key={index} title={comment.content}>
                <div>
                  <span>{user?.username}</span> {comment.content.length > 0 ? `${comment.content.substring(0, 0)}` : comment.content}
                </div>
              </Tooltip>
            );
          })}
        </div>
      ),
      sorter: (a, b) => a.comments.length - b.comments.length,
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
              }).then(async(result) => {
                if (result.isConfirmed) {
                  await deleteProduct(record._id)
                  refetch()
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
    <Table
      columns={columns}
      dataSource={menus?.data}
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
  );
};

export default Products;
