import React, { useEffect, useState } from 'react';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { Button, Table, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Modal,Input } from "antd";
const { TextArea } = Input;
import { MdEdit } from "react-icons/md";

const Blog = () => {
  const token = Cookies.get('token');
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const userRedux = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const updated = {
      title: editBlog.title,
      description: editBlog.description,
      src: editBlog.src,

    };
    controller.patch(endpoints.bloks, editBlog._id, updated);
    setBlogs((currentBlog) => {
      const idx = currentBlog.findIndex((x) => x._id == editBlog._id);
      currentBlog.splice(idx, 1, editBlog);
      return [...currentBlog];
    });
    Swal.fire({
      title: "Blog updated successfully!!",
      text: "Your file has been deleted.",
      icon: "success",
    });
    setIsModalOpen(false);
    setEditBlog(null);
  };
  const handleCancel = () => {
    setEditBlog(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'src',
      render: (src) => {
        return <img src={src} width={80} height={80} style={{ objectFit: 'cover' }} alt="Blog" />
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

    {
      title: "Edit",
      render: (record) => {
        return (
          <Button
            onClick={() => {
              showModal();
              setEditBlog(record);
            }}
            style={{ border: 'none', color: 'red', fontSize: '18px' }}
          >
            <MdEdit />
          </Button>
        );
      },
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
   <>
    <Table
      columns={columns}
      dataSource={blogs}
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

<Modal
        title="Edit Blog Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            onChange={(e) =>
              setEditBlog({ ...editBlog, title: e.target.value })
            }
            value={editBlog?.title}
            type="text"
            placeholder="Title"
          />
          <Input
            onChange={(e) =>
              setEditBlog({ ...editBlog, src: e.target.value })
            }
            value={editBlog?.src}
            type="url"
            placeholder="ImageSrc"
          />
          <TextArea
            onChange={(e) =>
              setEditBlog({
                ...editBlog,
                description: e.target.value,
              })
            }
            value={editBlog?.description}
            rows={4}
            placeholder="Description"
          />
        </form>
      </Modal>
   </>
  );
}

export default Blog;
