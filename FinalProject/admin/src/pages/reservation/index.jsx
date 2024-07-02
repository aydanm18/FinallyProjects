import React from 'react'
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { Button, Table } from "antd";
import { useState } from 'react';
import { useEffect } from 'react';

const Reservations = () => {
  const token = Cookies.get('token');
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.reservations, token).then((resp) => {
      setReservation([...resp.data]);
    });
  }, [token]);
  const columns = [
  
    {
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: reservation.map((reser) => {
        return {
          text: reser.name,
          value: reser.name,
        }
      }
      ),

      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
     
    },
    {
      title: 'Email',
      dataIndex: 'email',
     
    },
    {
      title: 'Date',
      dataIndex: 'date',
     
    },
    {
      title: 'Time',
      dataIndex: 'time',
     
    },
    {
      title: 'Guest',
      dataIndex: 'guest',
     
    },
   
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={reservation}
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
  )
}

export default Reservations