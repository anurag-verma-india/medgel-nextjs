// src/components/EditProductCategoryPopup.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, message, Modal, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ProductCategoryItemDB, ProductCategoryItemState } from "@/types";

interface EditProductCategoryPopupProps {
  visible: boolean;
  onClose: () => void;
  category: ProductCategoryItemState;
  onSuccess: () => void;
}

const EditProductCategoryPopup: React.FC<EditProductCategoryPopupProps> = ({
  visible,
  onClose,
  category,
  onSuccess,
}) => {
  // console.log(category._id);
  const [form] = Form.useForm();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // const [errorMessages, setErrorMessages] = useState<string[]>([]);
  // const [isErrorModalVisible, setIsErrorModalVisible] =
  // useState<boolean>(false);

  // Set form fields when modal becomes visible or category changes
  useEffect(() => {
    if (visible && category) {
      form.setFieldsValue({
        product_category_name: category.name,
      });
    } else {
      form.resetFields(); // Reset fields when modal is hidden
    }
  }, [visible, category, form]);

  const handleSaveChanges = async (): Promise<void> => {
    if (!category) return; // Ensure category is selected
    try {
      const values: { product_category_name: string } =
        await form.validateFields();
      setSaveLoading(true);
      // setErrorMessages([]);
      // setIsErrorModalVisible(false);
      const updatePayload = {
        product_category_id: category._id,
        product_category_name: values.product_category_name,
      };
      console.log("Updated payload: ", updatePayload);
      const response = await axios.put<{
        // success: boolean;
        // message: string;
        // partial_success: boolean;
        // details?: object;
        success: boolean;
        partial_success: boolean;
        message: string;
        problems: string[];
        details: object;
      }>(`${process.env.NEXT_PUBLIC_API_URL}/product_category`, updatePayload);

      console.log("Update Response");
      console.log(response);

      // if (!response.data.problems && response.data.details) {
      //   message.success("Category Updated successfully!");
      //   onSuccess();
      //   onClose();
      // } else {
      //   if (response.data.problems && response.data.message) {
      //     // setErrorMessages([response.data.message]);
      //     // setIsErrorModalVisible(true);
      //     message.error(response.data.message);
      //     onClose();
      //   } else {
      //     message.error("Failed to update category");
      //   }
      // }
      if (!response.data.success) {
        message.success("Category Updated successfully!");
      } else
        message.info(
          "Some operations completed successfully, but some had errors",
        );
      onSuccess();
      onClose();
    } catch (error: unknown) {
      console.error("Error saving category changes:", error);
      message.error(
        "Failed to save category changes due to an unexpected error.",
      );
      // }
    } finally {
      setSaveLoading(false);
    }
  };
  const handleDeleteCategory = async (): Promise<void> => {
    if (!category) return; // Ensure category is selected
    setDeleteLoading(true);

    try {
      const deletePayload = {
        product_category_id: category._id,
      };

      const response = await axios.delete<{
        message: string;
        problems: boolean;
        deleted_category: ProductCategoryItemDB;
      }>(`${process.env.NEXT_PUBLIC_API_URL}/product_category`, {
        data: deletePayload,
      });

      if (!response.data.problems) {
        message.success("Category deleted successfully!");
        onSuccess(); // Indicate deletion
        onClose();
      } else {
        message.error("Some error happened while deleting the category");
      }
    } catch (error: unknown) {
      console.error("Error deleting category:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        message.error(error.response.data.problems);
      } else {
        message.error("Failed to delete category due to an unexpected error.");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  if (!category) return null; // Don't render if no category is selected

  return (
    <>
      <Modal
        title={`Edit Category: ${category.name}`}
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
          <Popconfirm
            key="delete-confirm"
            title="Delete Category"
            description={`Are you sure you want to delete "${category.name}"? This will also delete all the products and product lists in this category`}
            onConfirm={handleDeleteCategory}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={deleteLoading}
            >
              Delete Category
            </Button>
          </Popconfirm>,
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

export default EditProductCategoryPopup;
