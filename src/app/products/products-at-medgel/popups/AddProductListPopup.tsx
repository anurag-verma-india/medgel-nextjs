// src/components/EditProductCategoryPopup.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, message, Modal } from "antd";

interface AddProductListPopupProps {
  visible: boolean;
  categoryId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductListPopup: React.FC<AddProductListPopupProps> = ({
  visible,
  categoryId,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const handleSaveChanges = async (): Promise<void> => {
    try {
      // const values: { product_category_name: string } =
      //   await form.validateFields();
      const values: { product_list_name: string } = await form.validateFields();
      setSaveLoading(true);
      // const createCategoryPayload: {
      //   product_category_name: string;
      // } = {
      //   product_category_name: values.product_category_name,
      // };
      const createListPayload = {
        product_category_id: categoryId,
        list_names_to_add: [values.product_list_name],
      };
      console.log("Create list payload:", createListPayload);
      const response = await axios.put<{
        success: boolean;
        partial_success: boolean;
        message: string;
        problems: string[];
        details: object;
      }>(
        `${process.env.NEXT_PUBLIC_API_URL}/product_category`,
        // createCategoryPayload,
        createListPayload,
      );
      if (!response.data || !response.data.success) {
        message.error("Failed to add a new product list");
      } else {
        message.success("New Product List created successfully!");
        onSuccess();
        onClose();
      }
    } catch (error: unknown) {
      console.error("Error while creating a new product list:", error);
      message.error(
        "Failed to create a new product list due to an unexpected error.",
      );
    } finally {
      setSaveLoading(false);
    }
  };
  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Modal
        title={"Create new Product List"}
        open={visible}
        // onOk={handleSaveChanges}
        onCancel={handleCancel}
        okText={saveLoading ? "Saving..." : "Save Changes"}
        okButtonProps={{
          style: { backgroundColor: "#00a5a5", borderColor: "#00a5a5" },
          loading: saveLoading,
        }}
        cancelText="Cancel"
        width={600}
        confirmLoading={saveLoading}
        maskClosable={false}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSaveChanges}
            loading={saveLoading}
            style={{ backgroundColor: "#00a5a5", borderColor: "#00a5a5" }}
          >
            {saveLoading ? "Saving..." : "Save Changes"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Product List Name"
            name="product_list_name"
            rules={[
              { required: true, message: "Please enter product list name!" },
            ]}
          >
            <Input placeholder="Enter product list name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductListPopup;
