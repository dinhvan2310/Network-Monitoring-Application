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
  Drawer,
  Col,
  Row,
  Select,
  DatePicker,
  notification,
  Switch,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import userService from "services/userService";
import JSAlert from "js-alert";

function Users() {
  const [reload, setReload] = useState(false);

  const { Option } = Select;
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

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [isChangePassword, setIsChangePassword] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      // console.log(await userService.checkAuthentication(localStorage.getItem("token")));
      const response = await userService.getUsers();
      console.log(response);
      const promises = response.result.map(async (user) => {
        const role = await userService.getRole(user.roleid);
        return {
          ...user,
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
  }, [reload]);

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

  // const [selectUser, setSelectUser] = useState({});

  return (
    <>
      <>
        <Drawer
          title="Edit User"
          width={536}
          onClose={() => {
            setIsChangePassword(false);
            setOpen(false);
          }}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          destroyOnClose={true}
        >
          <Form
            name="edituser"
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
              values.userid = selectedRowKeys[0]
              console.log(values);
              
              const response = await userService.updateUser(values)

              if(values.changepassword){
                const response = await userService.updateUserPassword(values.userid, values.password)
                console.log(response)
                if(response.error){
                  JSAlert.alert(response.error.data, response.error.message);
                  return;
                }
              }

              console.log(response)
              if(response.error){
                JSAlert.alert(response.error.data, response.error.message);
                return;
              }else{
                setSelectedRowKeys([])
                JSAlert.alert("User updated successfully");
                setReload(!reload)
              }
              setOpen(false);
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
              initialValue={
                userData.filter((user) => user.userid === selectedRowKeys[0])[0]
                  ?.username
              }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User role"
              name="roleid"
              rules={[
                {
                  required: true,
                  message: "Please input your user role!",
                },
              ]}
              initialValue={
                userData.filter((user) => user.userid === selectedRowKeys[0])[0]
                  ?.roleid
              }
            >
              <Radio.Group>
                <Radio.Button value="3">Super Admin</Radio.Button>
                <Radio.Button value="2">User</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{}]}
              initialValue={
                userData.filter((user) => user.userid === selectedRowKeys[0])[0]
                  ?.name
              }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="surname"
              rules={[{}]}
              initialValue={
                userData.filter((user) => user.userid === selectedRowKeys[0])[0]
                  ?.surname
              }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Change Password"
              name="changepassword"
              initialValue={isChangePassword}
            >
              <Switch
                onChange={(checked) => {
                  console.log(checked);
                  setIsChangePassword(checked);
                }}
              />
            </Form.Item>
            {isChangePassword && (
              <>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Passwords do not match");
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
              </>
            )}
            {/* <Form.Item label="Auto Login" name="autologin"
              initialValue={setAutologin(userData.filter((user) => user.userid === selectedRowKeys[0])[0]?.autologin)}
            >
              <Checkbox
                // checked={autologin}
                checked={autologin}
                onChange={(e) => {
                  setAutologin(e.target.checked);
                }}
              />
            </Form.Item> */}
            {/* <Form.Item label="Auto Logout" name="autologout"
              initialValue={userData.filter((user) => user.userid === selectedRowKeys[0])[0]?.autologout}
              rules={[
                {
                  pattern: /^(\d+)(s|m|h|d)|0$/,
                  message: "Please input auto logout as number with s|m|h|d",
                }
              ]}
            >
              <Input />
            </Form.Item> */}
            {/* <Form.Item
              label="Refresh"
              name="refresh"
              rules={[
                {
                  required: true,
                  message: "Please input your value!",
                },
                {
                  pattern: /^(\d+)(s|m|h)$/,
                  message: "Please input refresh as number with s|m|h",
                }
              ]}
              initialValue={userData.filter((user) => user.userid === selectedRowKeys[0])[0]?.refresh}
            >
              <Input />
            </Form.Item> */}
            {/* <Form.Item
              label="Row per page"
              name="rowperpage"
              rules={[
                {
                  required: true,
                  message: "Please input your value!",
                },
                {
                  pattern: /^(\d+)$/,
                  message: "Please input row per page as number",
                }
              ]}
              initialValue={userData.filter((user) => user.userid === selectedRowKeys[0])[0]?.rows_per_page}
            >
              <Input />
            </Form.Item> */}
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
                <Button type="default" htmlType="reset">
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Drawer>
      </>
      <Modal
        title="Add User"
        width={536}
        open={isModalOpen}
        onOk={() => {}}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose={true}
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
            if(values.name === undefined) values.name = ""
            if(values.lastname === undefined) values.lastname = ""
            console.log(autologin);
            const response = await userService.addUser(
              values.username,
              values.password,
              values.name,
              values.lastname,
              // autologin,
              // values.autologout,
              // values.refresh,
              // values.rowperpage,
              values.userrole
            );
            console.log(response);
            if (response.error) {
              JSAlert.alert(response.error.data, response.error.message);
              return;
            } else {
              setReload(!reload);
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
          <Form.Item
            label="User role"
            name="userrole"
            rules={[
              {
                required: true,
                message: "Please input your user role!",
              },
            ]}
          >
            <Radio.Group>
            <Radio.Button value="3">Super Admin</Radio.Button>
                <Radio.Button value="2">User</Radio.Button>
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
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          {/* <Form.Item label="Auto Login" name="autologin">
            <Checkbox
              checked={autologin}
              onChange={(e) => {
                setAutologin(e.target.checked);
              }}
            />
          </Form.Item>
          <Form.Item label="Auto Logout" name="autologout"
            rules={[
              {
                pattern: /^(\d+)(s|m|h|d)|0$/,
                message: "Please input auto logout as number with s|m|h|d",
              }
            ]}
          >
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
              {
                pattern: /^(\d+)(s|m|h)$/,
                message: "Please input refresh as number with s|m|h",
              }
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
              {
                pattern: /^(\d+)$/,
                message: "Please input row per page as number",
              }
            ]}
            initialValue={"50"}
          >
            <Input />
          </Form.Item> */}
          <Form.Item>
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
      <Space>
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
                setUserData((preUserData) => {
                  return preUserData.filter((user) => user.key !== key);
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
          <Button danger disabled={selectedRowKeys.length > 0 ? false : true}>
            Delete
          </Button>
        </Popconfirm>

        <Button
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => {
            if (selectedRowKeys.length > 1) {
              JSAlert.alert("Please select only one host to edit");
              return;
            }
            if (selectedRowKeys.length === 0) {
              JSAlert.alert("Please select a host to edit");
              return;
            }
            setOpen(true);
          }}
          onCancel={(e) => {
            message.error("Canceled editing users.");
          }}
        >
          Edit
        </Button>
      </Space>
    </>
  );
}
export default Users;
