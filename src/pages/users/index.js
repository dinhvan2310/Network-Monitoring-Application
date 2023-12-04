import { useEffect } from "react";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Table,
  Tooltip,
  Form,
  Input,
  Checkbox,
  Space,
  Radio,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import userService from "services/userService";
import JSAlert from "js-alert";

function Users() {
  const [userData, setUserData] = useState([]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
    },
    {
      title: "User role",
      dataIndex: "userrole",
    },
    {
      title: () => (
        <Tooltip title="Add User">
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          ></Button>
        </Tooltip>
      ),
      dataIndex: "action",
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      // console.log(await userService.checkAuthentication(localStorage.getItem("token")));
      const response = await userService.getUsers();
      console.log(response);
      const promises = response.result.map(async (user) => {
        const role = await userService.getRole(user.roleid);
        return {
          key: user.userid,
          username: user.username,
          name: user.name,
          lastname: user.surname,
          userrole: role.result[0].name,
        };
      });
      const users = await Promise.all(promises);
      setUserData(users);
      console.log(users);
    };
    fetchUsers();
  }, []);

  const [autologin, setAutologin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };
  return (
    <>
      <Modal
        title="Add User"
        open={isModalOpen}
        onOk={() => {}}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          name="adduser"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={async (values) => {
            console.log(values);
            console.log(autologin);
            const response = await userService.addUser(
              values.username,
              values.password,
              values.name,
              values.lastname,
              autologin,
              values.autologout,
              values.refresh,
              values.rowperpage,
              values.userrole
            );
            console.log(response)
            if(response.error) {
              JSAlert.alert(response.error.data, response.error.message);
              return;
            } else{
              setUserData([
                ...userData,
                {
                  key: response.result.userids[0],
                  username: values.username,
                  name: values.name,
                  lastname: values.lastname,
                  userrole: values.userrole==='1'? "User role" : "Super admin role",
                },
              ]);
              setIsModalOpen(false);
            }
          }}
          onFinishFailed={null}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="User role" name="userrole"
            rules={[
              {
                required: true,
                message: "Please input your user role!",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="3">Admin</Radio.Button>
              <Radio.Button value="1">User</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Lastname" name="lastname" rules={[{}]}>
            <Input />
          </Form.Item>
          <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please enter your password' },
        ]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Passwords do not match');
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm your password" />
      </Form.Item>
          <Form.Item label="Auto Login" name="autologin">
            <Checkbox checked={true} onChange={(e) => {
              setAutologin(e.target.checked);
            }}/>
          </Form.Item> 
          <Form.Item label="Auto Logout" name="autologout">
            <Input />
          </Form.Item>
          <Form.Item
            label="Refresh"
            name="refresh"
            rules={[
              {
                required: true,
                message: "Please input your value!",
              },
            ]}
            initialValue={"30s"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Row per page"
            name="rowperpage"
            rules={[
              {
                required: true,
                message: "Please input your value!",
              },
            ]}
            initialValue={"50"}
          >
            <Input />
          </Form.Item>
          <Form.Item >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default" htmlType="reset">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userData}
      />
      <Popconfirm
        title="Delete the selected users?"
        description="This action cannot be undone."
        onConfirm={() => {
          selectedRowKeys.forEach(async (key) => {
            const response = await userService.deleteUser(key);
            console.log(response);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
            } else {
              setUserData(preUserData => {
                return preUserData.filter(user => user.key !== key)
              });
            }
          });
          setSelectedRowKeys([]);
        }}
        onCancel={(e) => {
          message.error("Canceled deleting users.");
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
        >
          Delete
        </Button>
      </Popconfirm>
    </>
  );
}

export default Users;
