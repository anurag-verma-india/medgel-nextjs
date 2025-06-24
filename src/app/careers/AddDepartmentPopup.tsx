// src/app/about/life-at-medgel/AddDepartmentPopup.tsx
"use client";

import { Button, Form, Input, message, Modal, InputNumber } from "antd";
// import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import axios from "axios";
// import BulkWriteResult from "mongoose"
import { BulkWriteResult } from "mongodb";

// Request body interfaces for API calls (copied from ContextCode.tsx for clarity in this file)
interface PostJobOpeningsRequest {
  departments?: {
    department_name: string;
    sequence: number;
  }[];
}

interface JobOpeningsResponse {
  success: boolean;
  message: string;
  problems?: string[];
  // department_results?: any;
  department_results?: BulkWriteResult;
  // job_results?: any;
  job_results?: BulkWriteResult;
}

interface AddDepartmentPopupProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Modal component for adding new departments.
 * It only allows creation of new departments and does not show existing ones.
 *
 * @param visible - Boolean to control modal visibility.
 * @param onClose - Function to close the modal.
 * @returns JSX Modal component for adding a new department.
 */
const AddDepartmentPopup: React.FC<AddDepartmentPopupProps> = ({
  visible,
  onClose,
}) => {
  // State for the new department's data
  const [newDepartmentName, setNewDepartmentName] = useState<string>("");
  const [newDepartmentSequence, setNewDepartmentSequence] = useState<number>(1);
  // Loading state for API calls
  const [loading, setLoading] = useState<boolean>(false);
  // State to store error messages from API calls
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  // State to control the visibility of the error modal
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);
  // Ant Design Form instance
  const [form] = Form.useForm();

  /**
   * Handles saving the new department.
   * Sends a POST request to the API to create the department.
   * Displays loading state and handles success/error messages.
   *
   * @returns Promise<void>
   */
  const handleSaveNewDepartment = async (): Promise<void> => {
    // Validate form fields before submission
    try {
      await form.validateFields(); // Validate all fields in the form
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
      message.error("Please fill in all required fields correctly.");
      return; // Stop the function if validation fails
    }

    setLoading(true); // Set loading state to true
    setErrorMessages([]); // Clear previous errors
    setIsErrorModalVisible(false); // Hide error modal from previous attempts

    try {
      const createPayload: PostJobOpeningsRequest = {
        departments: [
          {
            department_name: newDepartmentName,
            sequence: newDepartmentSequence,
          },
        ],
      };

      const response = await axios.post<JobOpeningsResponse>(
        "/api/job_openings",
        createPayload,
      );

      if (response.data.success) {
        message.success("Department added successfully!");
        form.resetFields(); // Reset form fields after success
        setNewDepartmentName(""); // Clear state
        setNewDepartmentSequence(1); // Reset sequence
        onClose(); // Close the modal
      } else {
        if (response.data.problems && response.data.problems.length > 0) {
          setErrorMessages(response.data.problems);
          setIsErrorModalVisible(true);
        } else {
          message.error("Failed to add department");
        }
      }
    } catch (error: unknown) {
      console.error("Error adding new department:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        setErrorMessages(error.response.data.problems);
        setIsErrorModalVisible(true);
      } else {
        message.error("Failed to add department");
      }
    } finally {
      setLoading(false); // Always reset loading state
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
    setNewDepartmentName("");
    setNewDepartmentSequence(1);
    setErrorMessages([]);
    setIsErrorModalVisible(false);
    onClose();
  };

  return (
    <>
      <Modal
        title="Add New Department"
        open={visible}
        onOk={handleSaveNewDepartment}
        onCancel={handleCancel}
        okText={loading ? "Adding..." : "Add Department"}
        okButtonProps={{
          style: { backgroundColor: "#00a5a5", borderColor: "#00a5a5" },
        }}
        cancelText="Cancel"
        width={600}
        confirmLoading={loading}
        maskClosable={false}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Department Name"
            name="department_name"
            rules={[
              { required: true, message: "Please enter department name!" },
            ]}
          >
            <Input
              value={newDepartmentName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewDepartmentName(e.target.value)
              }
              placeholder="Enter department name"
            />
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
            <InputNumber
              value={newDepartmentSequence}
              onChange={
                (value: number | null) => setNewDepartmentSequence(value || 1) // Default to 1 if null
              }
              placeholder="Enter sequence"
              min={1}
              className="w-full"
            />
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
          <p className="mb-4">
            The following errors occurred while adding the department:
          </p>
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

export default AddDepartmentPopup;
