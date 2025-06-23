"use client";

import React, { useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { Button, Form, Input, message, Modal, Popconfirm, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ProductContextProps, ProductListEntry } from "@/types";
import ProductCategoriesContext from "@/contexts/ProductCategoriesContext";
import { product_category_put_request_body } from "@/app/api/product_category/types";

interface EditProductListPopupProps {
  visible: boolean;
  onClose: () => void;
  categoryId: string;
  list: ProductListEntry;
  onSuccess: () => void;
}

const EditProductListPopup: React.FC<EditProductListPopupProps> = ({
  visible,
  onClose,
  categoryId,
  list,
  onSuccess,
}) => {
  const { productsState } = useContext<ProductContextProps>(
    ProductCategoriesContext,
  );
  if (!productsState) {
    throw new Error(
      "EditProductsListPopup must be used within a ProductsContextProvider",
    );
  }
  const { categories, loading } = productsState;

  type CategoryMoveSelectOptionsTypes = {
    value: string;
    label: ReactNode;
  }[];
  const [categoryMoveSelectOptions, setCategoryMoveSelectOptions] =
    useState<CategoryMoveSelectOptionsTypes>([
      {
        value: "",
        label: <>{"Loading..."}</>,
      },
    ]);

  // let cate
  useEffect(() => {
    if (!loading) {
      const optionsToSet: CategoryMoveSelectOptionsTypes = [];
      categories.forEach((category_from_state) => {
        optionsToSet.push({
          value: category_from_state._id,
          label: <>{category_from_state.name}</>,
        });
      });
      setCategoryMoveSelectOptions(optionsToSet);
    }
  }, [categories, loading, productsState]);

  // console.log(category._id);
  const [form] = Form.useForm();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // const [errorMessages, setErrorMessages] = useState<string[]>([]);
  // const [isErrorModalVisible, setIsErrorModalVisible] =
  // useState<boolean>(false);

  // Set form fields when modal becomes visible or category changes
  useEffect(() => {
    if (visible && list) {
      form.setFieldsValue({
        product_list_name: list.name,
      });
    } else {
      form.resetFields(); // Reset fields when modal is hidden
    }
  }, [visible, list, form]);

  const handleSaveChanges = async (): Promise<void> => {
    if (!list) return; // Ensure list is passed to this component
    try {
      // const values: { product_category_name: string } =
      //   await form.validateFields();
      const values: { product_list_name: string; move_to_category_id: string } =
        await form.validateFields();
      setSaveLoading(true);
      console.log(values);
      const editListPayload: product_category_put_request_body = {
        product_category_id: categoryId,
        lists_to_edit: [
          {
            _id: list.id,
            product_list_name: values.product_list_name,
          },
        ],
        // "lists_to_move": [
        //     {
        //         "move_to_category_id": "682f466c01ad7b9fb616bc96",
        //         "product_list_id": "683d667254f80909062e4d59"
        //     }
        // ]
      };
      if (values.move_to_category_id) {
        editListPayload.lists_to_move = [
          {
            move_to_category_id: values.move_to_category_id,
            product_list_id: list.id,
          },
        ];
      }
      console.log("Create list payload:", editListPayload);
      const response = await axios.put<{
        success: boolean;
        partial_success: boolean;
        message: string;
        problems: string[];
        details: object;
      }>(
        `${process.env.NEXT_PUBLIC_API_URL}/product_category`,
        // createCategoryPayload,
        editListPayload,
      );
      console.log("Edit list response:", response);
      if (!response.data || !response.data.success) {
        message.error("Failed to edit product list");
      } else if (response.data.success && response.data.partial_success) {
        message.success("Product List edit successfully");
      } else {
        message.info(
          "Some operations completed successfully, but some had errors",
        );
      }
      onSuccess();
      onClose();
    } catch (error: unknown) {
      console.error("Error while creating a new product list:", error);
      message.error(
        "Failed to create a new product list due to an unexpected error.",
      );
    } finally {
      setSaveLoading(false);
    }
  };
  const handleDeleteCategory = async (): Promise<void> => {
    if (!list) return; // Ensure list is passed to this component
    try {
      setDeleteLoading(true);
      const deleteListPayload: product_category_put_request_body = {
        product_category_id: categoryId,
        lists_to_delete: [list.id],
      };
      console.log("Delete list payload:", deleteListPayload);
      const response = await axios.put<{
        success: boolean;
        partial_success: boolean;
        message: string;
        problems: string[];
        details: object;
      }>(
        `${process.env.NEXT_PUBLIC_API_URL}/product_category`,
        // createCategoryPayload,
        deleteListPayload,
      );
      // console.log("Delete list response:", response);
      if (!response.data || !response.data.success) {
        message.error("Failed to delete product list");
      } else if (response.data.success && response.data.partial_success) {
        message.success("Product List deleted successfully");
      } else {
        message.info(
          "Some operations completed successfully, but some had errors",
        );
      }
      onSuccess();
      onClose();
    } catch (error: unknown) {
      console.error("Error while deleting product list:", error);
      message.error(
        "Failed to delete product list due to an unexpected error.",
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  if (!categoryId) return null; // Don't render if no category is selected

  return (
    <>
      <Modal
        title={`Edit List: ${list.name}`}
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
          <Popconfirm
            key="delete-confirm"
            title="Delete List"
            description={`Are you sure you want to delete "${list.name}"? This will also delete all the products in this list`}
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
              Delete List
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
            label="Product List"
            name="product_list_name"
            rules={[
              { required: true, message: "Please enter product list name!" },
            ]}
          >
            <Input placeholder="Enter product list name" />
          </Form.Item>

          <Form.Item
            label="Move different category"
            name="move_to_category_id"
            rules={[{ required: false }]}
          >
            <Select
              // style={{width: 50}}
              className="w-full"
              // options={[
              // { value: categories[0]._id, label: <>{categories[0].name}</> },
              // { value: categories[1]._id, label: <>{categories[1].name}</> },
              // { value: "sample_value0", label: <>{"Sample Label"}</> },
              // { value: "sample_value1", label: <>{"Sample Label 2"}</> },
              // {
              //   value: "sample_value2",
              //   label: <>{"This is a very long label"}</>,
              // },
              // ]}
              options={categoryMoveSelectOptions}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductListPopup;
