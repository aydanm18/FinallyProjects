import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import { Button, Table, Select } from "antd";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    controller.getAll(endpoints.orders, token).then((res) => {
      setOrders(res.data);
    })
  }, [token]);

  const handleStatusChange = (record, newStatus) => {
    const updatedOrder = { ...record, status: newStatus };
    controller.patch(endpoints.orders, record._id, updatedOrder, token)
      .then(() => {
        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order._id === record._id ? updatedOrder : order
          )
        );
        const message = newStatus === 'accepted'
          ? 'Your order has been Accepted!'
          : 'Your order has been Rejected.';
        Swal.fire({
          title: `Order ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
          text: message,
          icon: 'success',
        });
        
      })
      
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `$${price}`,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <ul style={{ listStyle: 'none' }}>
          {items.map((item, index) => (
            <li key={index}>
            <img width={50} src={item.itemImg} alt={item.itemName} />{item.itemName} - Quantity: {item.count}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(record, newStatus)}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="accepted">Accept</Select.Option>
          <Select.Option value="rejected">Reject</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Delete',
      render: (record) => (
        <div>
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
                  controller.delete(endpoints.orders, record._id, token)
                    .then(() => {
                      setOrders((currentOrders) =>
                        currentOrders.filter((x) => x._id !== record._id)
                      );
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                      });
                    })
                    .catch((error) => {
                      Swal.fire({
                        title: 'Error',
                        text: 'There was an error deleting the order.',
                        icon: 'error',
                      });
                      console.error('Error deleting order:', error);
                    });
                }
              });
            }}
            style={{ color: 'red', border: 'none', fontSize: 18, marginRight: 10 }}
          >
            <MdDelete />
          </Button>
        </div>
      ),
    },
    {
      title: "Detail",
      render: (record) => {
        return (
          <Button
            style={{ border: 'none', color: 'red', fontSize: '18px' }}
          ><Link to={`/orders/${record._id}`}>  <InfoIcon fontSize='20'/></Link>
      
          </Button>
        );
      },
    
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      pagination={{
        defaultPageSize: 3,
        pageSizeOptions: ["2", "5", "10"],
        showSizeChanger: true,
      }}
      style={{ paddingTop: '120px' }}
      rowKey={(record) => record._id}
    />
  );
};

export default Orders;
