import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import { Button, Table, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    controller.getAll(endpoints.orders, token).then((res) => {
      setOrders(res.data);
    });
  }, [token]);

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
        <ul style={{listStyle:'none'}}>
          {items.map((item, index) => (
            <li key={index}>
              {item.itemName} - Quantity: {item.count}
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
                  setOrders((currentOrders) => currentOrders.filter((x) => x._id !== record._id));
                  controller.delete(endpoints.orders, record._id, token);
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
      dataSource={orders}
      onChange={onChange}
      pagination={{
        defaultPageSize: 3,
        pageSizeOptions: ["2", "5", "10"],
        showSizeChanger: true,
      }}
      style={{ paddingTop: '120px' }}
    />
  );
};

export default Orders;
