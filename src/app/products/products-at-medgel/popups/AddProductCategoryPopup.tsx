// src/components/EditProductCategoryPopup.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, message, Modal } from "antd";

interface AddProductCategoryPopupProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductCategoryPopup: React.FC<AddProductCategoryPopupProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const handleSaveChanges = async (): Promise<void> => {
    try {
      const values: { product_category_name: string } =
        await form.validateFields();
      setSaveLoading(true);
      const createCategoryPayload: {
        product_category_name: string;
      } = {
        product_category_name: values.product_category_name,
      };
      console.log("Create rqst payload: ", createCategoryPayload);
      const response = await axios.post<{
        message: string;
        error: string;
        success: boolean;
        savedCategory?: object;
      }>(
        `${process.env.NEXT_PUBLIC_API_URL}/product_category`,
        createCategoryPayload,
      );
      if (
        !response.data ||
        !response.data.success ||
        !response.data.savedCategory
      ) {
        message.error("Failed to add a new product category");
      } else {
        message.success("New Category created successfully!");
        onSuccess();
        onClose();
      }
    } catch (error: unknown) {
      console.error("Error saving making a new category:", error);
      message.error(
        "Failed to create a new category due to an unexpected error.",
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
        title={"Create new Category"}
        open={visible}
        onOk={handleSaveChanges}
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
            label="Category Name"
            name="product_category_name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductCategoryPopup;
