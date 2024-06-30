import React, { useEffect, useState } from 'react';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { Button, Table, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const Blog = () => {
  const token = Cookies.get('token');
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const userRedux = useSelector((state) => state.user);

  useEffect(() => {
    controller.getAll(endpoints.users, token).then((res) => {
      setUsers(res.data);
    });
  }, [token]);

  useEffect(() => {
    controller.getAll(endpoints.bloks, token).then((resp) => {
      setBlogs([...resp.data]);
    });
  }, [token]);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'src',
      render: (src) => {
        return <img src={src} width={"80px"} height={80} style={{ objectFit: 'cover' }} alt="Blog" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: blogs.map((blog) => {
        return {
          text: blog.title,
          value: blog.title,
        }
      }),
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
      title: 'Comments',
      dataIndex: 'comments',
      render: (comments) => (
        <div>
          <strong>Comments ({comments.length})</strong>
          {comments.map((comment, index) => {
            const user = users.find((user) => user._id === comment.userId);
            return (
              <Tooltip key={index} title={comment.content}>
                <div>
                  <strong>{user?.username}</strong> {comment.content.length > 0 ? `${comment.content.substring(0, 0)}` : comment.content}
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
              }).then((result) => {
                if (result.isConfirmed) {
                  setBlogs((currentBlogs) => currentBlogs.filter((x) => x._id !== record._id));
                  controller.delete(endpoints.bloks, record._id, token);
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
      dataSource={blogs}
      onChange={onChange}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
      style={{ paddingTop: '120px' }}
    />
  );
}

export default Blog;
