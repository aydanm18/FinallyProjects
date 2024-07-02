
import React, { useEffect, useState } from 'react';
import controller from '../../services/api/requests';
import { endpoints } from '../../services/api/constants';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { Button, Table, Input } from "antd";
import { MdDelete } from "react-icons/md";
import { Modal } from "antd";
const { TextArea } = Input;
import { MdEdit } from "react-icons/md";


const OurTeam = () => {
  const token = Cookies.get('token');
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTeam, setEditTeam] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {

    const updated = {
      image: editTeam.image,
      title: editTeam.title,
      description: editTeam.description,

    };
    controller.patch(endpoints.teams, editTeam._id, updated);

    setTeams((currentTeams) => {
      const idx = currentTeams.findIndex((x) => x._id == editTeam._id);
      currentTeams.splice(idx, 1, editTeam);
      return [...currentTeams];
    });
    Swal.fire({
      title: "Team updated successfully!!",
      text: "Your file has been deleted.",
      icon: "success",
    });

    setIsModalOpen(false);
    setEditTeam(null);
  };
  const handleCancel = () => {
    setEditTeam(null);
    setIsModalOpen(false);
  };

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
              setEditTeam(record);
            }}
          style={{border:'none',color:'red',fontSize:'18px'}}
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
        dataSource={teams}
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
        title="Edit Team Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            onChange={(e) =>
              setEditTeam({ ...editTeam, title: e.target.value })
            }
            value={editTeam?.title}
            type="text"
            placeholder="Title"
          />
          <Input
            onChange={(e) =>
              setEditTeam({ ...editTeam, image: e.target.value })
            }
            value={editTeam?.image}
            type="url"
            placeholder="ImageSrc"
          />
          <TextArea
            onChange={(e) =>
              setEditTeam({
                ...editTeam,
                description: e.target.value,
              })
            }
            value={editTeam?.description}
            rows={4}
            placeholder="Description"
          />
        </form>
      </Modal>
    </>

  )
}

export default OurTeam