"use client";

import { Button, Form, Input, message, Modal, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

import React, { useState } from "react";

const PopupPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm<UserFormData>();

  interface UserFormData {
    name: string;
    email: string;
  }

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleModalCancel = (): void => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalOk = (): void => {
    form
      .validateFields()
      .then((values: UserFormData) => {
        console.log("Form values:", values);
        message.success("User information saved successfully!");
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <div style={{ padding: "20px" }} className="flex w-full">
      <Space direction="vertical" size="large" style={{ display: "flex" }} className="w-full">
        {/* Modal Example */}
        <div className="flex w-full align-center justify-center">
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
              initialValues={{ name: "", email: "" }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Space>
    </div>
  );
};

export default PopupPage;
