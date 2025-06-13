"use client"
import React, { useState } from 'react';
import {
  Modal,
  Popover,
  Tooltip,
  Drawer,
  Button,
  Space,
  Input,
  Form,
  message,
  Popconfirm,
  notification,
} from 'antd';
import {
  InfoCircleOutlined,
  UserOutlined,
  SettingOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

// Interface for form data
interface UserFormData {
  name: string;
  email: string;
}

const PopupExamples: React.FC = () => {
  // State for different popup visibility
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [form] = Form.useForm<UserFormData>();

  // Modal handlers
  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleModalOk = (): void => {
    form.validateFields()
      .then((values: UserFormData) => {
        console.log('Form values:', values);
        message.success('User information saved successfully!');
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleModalCancel = (): void => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Drawer handlers
  const showDrawer = (): void => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = (): void => {
    setIsDrawerVisible(false);
  };

  // Popover content
  const popoverContent = (
    <div style={{ maxWidth: 200 }}>
      <p>This is a popover with custom content.</p>
      <Button size="small" type="primary">
        Action Button
      </Button>
    </div>
  );

  // Notification handler
  const showNotification = (): void => {
    notification.info({
      message: 'Notification Title',
      description: 'This is a notification popup that appears in the corner.',
      placement: 'topRight',
      duration: 4.5,
    });
  };

  // Popconfirm handler
  const handleDelete = (): void => {
    message.success('Item deleted successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ant Design Popup Examples</h1>
      
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        {/* Modal Example */}
        <div>
          <h3>1. Modal Popup</h3>
          <Button type="primary" onClick={showModal} icon={<UserOutlined />}>
            Open User Form Modal
          </Button>
          
          <Modal
            title="User Information"
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText="Save"
            cancelText="Cancel"
            width={500}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ name: '', email: '' }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Form>
          </Modal>
        </div>

        {/* Drawer Example */}
        <div>
          <h3>2. Drawer Popup</h3>
          <Button type="default" onClick={showDrawer} icon={<SettingOutlined />}>
            Open Settings Drawer
          </Button>
          
          <Drawer
            title="Settings Panel"
            placement="right"
            onClose={closeDrawer}
            open={isDrawerVisible}
            width={400}
          >
            <Space direction="vertical" style={{ display: 'flex' }}>
              <h4>Application Settings</h4>
              <Input placeholder="Setting 1" />
              <Input placeholder="Setting 2" />
              <Button type="primary" block>
                Save Settings
              </Button>
            </Space>
          </Drawer>
        </div>

        {/* Popover Example */}
        <div>
          <h3>3. Popover Popup</h3>
          <Popover
            content={popoverContent}
            title="Popover Title"
            trigger="click"
            placement="top"
          >
            <Button icon={<InfoCircleOutlined />}>
              Click for Popover
            </Button>
          </Popover>
        </div>

        {/* Tooltip Example */}
        <div>
          <h3>4. Tooltip Popup</h3>
          <Tooltip title="This is a helpful tooltip message" placement="top">
            <Button icon={<QuestionCircleOutlined />}>
              Hover for Tooltip
            </Button>
          </Tooltip>
        </div>

        {/* Popconfirm Example */}
        <div>
          <h3>5. Popconfirm Popup</h3>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            placement="top"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete Item
            </Button>
          </Popconfirm>
        </div>

        {/* Notification Example */}
        <div>
          <h3>6. Notification Popup</h3>
          <Button type="dashed" onClick={showNotification}>
            Show Notification
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default PopupExamples;