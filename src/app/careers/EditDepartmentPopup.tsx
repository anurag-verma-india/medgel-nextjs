// src/app/about/life-at-medgel/EditDepartmentPopup.tsx
"use client";

import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  InputNumber,
} from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { JobDepartmentTypeDB } from "@/types";

// Request body interfaces for API calls (copied from ContextCode.tsx for clarity in this file)
interface PutJobOpeningsRequest {
  departments?: {
    id: string;
    department_name?: string;
    sequence?: number;
  }[];
}

interface DeleteJobOpeningsRequest {
  departments_to_delete?: {
    id: string;
  }[];
}

interface JobOpeningsResponse {
  success: boolean;
  message: string;
  problems?: string[];
  department_results?: any;
  job_results?: any;
}

interface EditDepartmentPopupProps {
  visible: boolean;
  onClose: () => void;
  department: JobDepartmentTypeDB; // The department being edited
  onSuccess: () => void;
}

/**
 * Modal component for editing an existing department's name and sequence.
 * Also allows deletion of the department.
 *
 * @param visible - Boolean to control modal visibility.
 * @param onClose - Function to close the modal.
 * @param department - The JobDepartmentTypeDB object representing the department to be edited.
 * @param onSuccess - Callback function called after successful update or deletion.
 * @returns JSX Modal component for department management.
 */
const EditDepartmentPopup: React.FC<EditDepartmentPopupProps> = ({
  visible,
  onClose,
  department,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  // State for loading indicators for save and delete buttons
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // State to store error messages from API calls
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  // State to control the visibility of the error modal
  const [isErrorModalVisible, setIsErrorModalVisible] = useState<boolean>(false);

  // Effect to set form fields when the modal becomes visible or department prop changes
  useEffect(() => {
    if (visible && department) {
      form.setFieldsValue({
        department_name: department.department_name,
        sequence: department.sequence,
      });
    }
  }, [visible, department, form]);

  /**
   * Handles saving changes to the department.
   * Sends a PUT request to the API to update the department.
   * Displays loading state and handles success/error messages.
   *
   * @returns Promise<void>
   */
  const handleSaveChanges = async (): Promise<void> => {
    try {
      const values = await form.validateFields(); // Validate form fields
      setSaveLoading(true); // Set loading state for save button
      setErrorMessages([]); // Clear previous errors
      setIsErrorModalVisible(false); // Hide error modal from previous attempts

      const updatePayload: PutJobOpeningsRequest = {
        departments: [
          {
            id: department._id,
            department_name: values.department_name,
            sequence: values.sequence,
          },
        ],
      };

      const response = await axios.put<JobOpeningsResponse>("/api/job_openings", updatePayload);

      if (response.data.success) {
        message.success("Department updated successfully!");
        onSuccess(); // Call success callback to refresh parent data
        onClose(); // Close the modal
      } else {
        if (response.data.problems && response.data.problems.length > 0) {
          setErrorMessages(response.data.problems);
          setIsErrorModalVisible(true);
        } else {
          message.error("Failed to update department");
        }
      }
    } catch (error: unknown) {
      console.error("Error saving department changes:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        setErrorMessages(error.response.data.problems);
        setIsErrorModalVisible(true);
      } else {
        // If validation fails, Ant Design's message will already show, so no need for generic message here
        if (error && typeof error === 'object' && 'errorFields' in error) {
            // Validation error, message already handled by Ant Design's form
        } else {
            message.error("Failed to save department changes");
        }
      }
    } finally {
      setSaveLoading(false); // Always reset loading state
    }
  };

  /**
   * Handles the deletion of the current department.
   * Sends a DELETE request to the API.
   * Displays loading state and handles success/error messages.
   *
   * @returns Promise<void>
   */
  const handleDeleteDepartment = async (): Promise<void> => {
    setDeleteLoading(true); // Set loading state for delete button
    setErrorMessages([]); // Clear previous errors
    setIsErrorModalVisible(false); // Hide error modal from previous attempts

    try {
      const deletePayload: DeleteJobOpeningsRequest = {
        departments_to_delete: [{ id: department._id }],
      };

      const response = await axios.delete<JobOpeningsResponse>("/api/job_openings", {
        data: deletePayload,
      });

      if (response.data.success) {
        message.success("Department and its jobs deleted successfully!");
        onSuccess(); // Call success callback to refresh parent data
        onClose(); // Close the modal
      } else {
        if (response.data.problems && response.data.problems.length > 0) {
          setErrorMessages(response.data.problems);
          setIsErrorModalVisible(true);
        } else {
          message.error("Failed to delete department");
        }
      }
    } catch (error: unknown) {
      console.error("Error deleting department:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        setErrorMessages(error.response.data.problems);
        setIsErrorModalVisible(true);
      } else {
        message.error("Failed to delete department");
      }
    } finally {
      setDeleteLoading(false); // Always reset loading state
    }
  };

  /**
   * Handles the modal cancellation event.
   * Resets form fields and closes the modal.
   *
   * @returns void
   */
  const handleCancel = (): void => {
    form.resetFields();
    setErrorMessages([]);
    setIsErrorModalVisible(false);
    onClose();
  };

  return (
    <>
      <Modal
        title={`Edit Department: ${department.department_name}`}
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
            title="Delete Department"
            description={`Are you sure you want to delete "${department.department_name}"? This will also delete all ${department.jobs.length} job(s) in this department.`}
            onConfirm={handleDeleteDepartment}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button type="primary" danger icon={<DeleteOutlined />} loading={deleteLoading}>
              Delete Department
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
            label="Department Name"
            name="department_name"
            rules={[{ required: true, message: "Please enter department name!" }]}
          >
            <Input placeholder="Enter department name" />
          </Form.Item>
          <Form.Item
            label="Sequence"
            name="sequence"
            rules={[
              { required: true, message: "Please enter sequence number!" },
              {
                type: "number",
                min: 1,
                message: "Sequence must be a positive number!",
              },
            ]}
          >
            <InputNumber placeholder="Enter sequence" min={1} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Error Modal for displaying API errors */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined className="text-red-500" />
            <span>Errors</span>
          </div>
        }
        open={isErrorModalVisible}
        onCancel={() => setIsErrorModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsErrorModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        <div className="max-h-96 overflow-y-auto">
          <p className="mb-4">The following errors occurred while saving/deleting:</p>
          <ul className="list-inside list-disc space-y-2">
            {errorMessages.map((error: string, index: number) => (
              <li key={index} className="text-red-600">
                {error}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default EditDepartmentPopup;
