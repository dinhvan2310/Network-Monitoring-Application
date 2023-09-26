import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const MyForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Form Popup"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Settings = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = (values) => {
    console.log('Received values:', values);
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Form
      </Button>
      <MyForm visible={visible} onCancel={handleCancel} onCreate={handleCreate} />
    </div>
  );
};

export default Settings;
