import React from 'react'
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { Button, Table, Select } from "antd";
import { useState } from 'react';
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";

const Reservations = () => {
  const token = Cookies.get('token');
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.reservations, token).then((resp) => {
      setReservation([...resp.data]);
    });
  }, [token]);

  const handleStatusChange = (record, newStatus) => {
    const updatedReservatuin = { ...record, status: newStatus };
    controller.patch(endpoints.reservations, record._id, updatedReservatuin, token)
      .then(() => {
        setReservation((currentReservations) =>
          currentReservations.map((reservation) =>
            reservation._id === record._id ? updatedReservatuin : reservation
          )
        );
        const message = newStatus === 'accepted'
          ? 'Your Reservation has been Accepted!'
          : 'Your Reservation has been Rejected!.';
        Swal.fire({
          title: `Reservation ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
          text: message,
          icon: 'success',
        });
        
      })
      
  };

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
      title: 'Actions',
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
                  controller.delete(endpoints.reservations, record._id, token)
                    .then(() => {
                      setReservation((currentReservation) =>
                        currentReservation  .filter((x) => x._id !== record._id)
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
      rowKey={(record) => record._id}
    />
  )
}

export default Reservations