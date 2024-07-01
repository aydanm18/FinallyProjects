import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Button, Table, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';

const Help = () => {
  const token = Cookies.get('token');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const resp = await controller.getAll(endpoints.messages, token);
        setMessages(resp.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [token]);

  const handleRead = async (id) => {
    try {
      await controller.patch(endpoints.messages, id, { isRead: true });
      const updatedMessages = messages.map(message =>
        message._id === id ? { ...message, isRead: true } : message
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error(error);
    }
  };

 

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters:messages.map((message) => ({
        text: message.name,
        value: message.name,
      })),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters:messages.map((message) => ({
        text: message.email,
        value: message.email,
      })),
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      render: (text) => (
        <Tooltip title={text}>
          <span>{text.length > 10 ? `${text.substring(0, 10)}...` : text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: "Delete",
      render: (record) => (
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
                setMessages((currentMessages) => currentMessages.filter((x) => x._id !== record._id));
                controller.delete(endpoints.messages, record._id, token);
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
      ),
    },
    {
      title: "Read",
      render: (record) => (
        <Button
          onClick={() => handleRead(record._id)}
          disabled={record.isRead}
          type="primary"
          style={{ background: record.isRead ? '#ccc' : '#1890ff' }}
        >
          Read
        </Button>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={messages}
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

export default Help;
