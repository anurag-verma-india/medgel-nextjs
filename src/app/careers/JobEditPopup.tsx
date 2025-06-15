// src/app/about/life-at-medgel/JobEditPopup.tsx
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
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { JobDepartmentTypeDB, JobTypeDB, JobType } from "@/types"; // Assuming these types are defined in "@/types"

// API Interface Types (Moved out of comments and defined as actual interfaces)
interface PostJobOpeningsRequest {
  departments?: {
    department_name: string;
    sequence: number;
  }[];
  jobs?: {
    department_id: string; // MongoDB ObjectId of the department
    designation: string;
    experience: string;
    qualification: string;
    job_description: string;
    requirement: number;
  }[];
}

interface PutJobOpeningsRequest {
  departments?: {
    id: string; // MongoDB ObjectId of the department to edit
    department_name?: string; // Optional - new name for the department
    sequence?: number; // Optional - new sequence number
  }[];
  jobs?: {
    department_id: string; // MongoDB ObjectId of the department
    job_id: string; // MongoDB ObjectId of the job to edit
    designation?: string; // Optional - new designation
    experience?: string; // Optional - new experience requirement
    qualification?: string; // Optional - new qualification requirement
    job_description?: string; // Optional - new job description
    requirement?: number; // Optional - new requirement count
  }[];
}

interface DeleteJobOpeningsRequest {
  jobs_to_delete?: {
    department_id: string; // MongoDB ObjectId of the department
    job_id: string; // MongoDB ObjectId of the job to delete
  }[];
  departments_to_delete?: {
    id: string; // MongoDB ObjectId of the department to delete
  }[];
}

interface JobOpeningsResponse {
  success: boolean;
  message: string;
  departments?: JobDepartmentTypeDB[];
  department_results?: any; // Generic type, could be more specific if MongoDB results are typed
  job_results?: any; // Generic type, could be more specific if MongoDB results are typed
  problems?: string[];
}

// Component Props
interface JobEditPopupProps {
  visible: boolean;
  onClose: () => void;
  department: JobDepartmentTypeDB; // The department this job belongs to
  jobToEdit?: JobTypeDB; // Optional: if provided, we are editing this job; otherwise, adding a new one
  onSuccess: () => void;
}

// Job state for tracking changes
interface JobChange extends JobType {
  _id: string; // This will be the actual MongoDB _id or a temporary client-side ID
  isNew: boolean;
  isModified: boolean;
}

/**
 * Modal component for editing or adding jobs within a specific department.
 * It intelligently handles existing jobs (for editing) and new jobs (for adding)
 * based on the `jobToEdit` prop.
 *
 * @param visible - Boolean to control modal visibility.
 * @param onClose - Function to close the modal.
 * @param department - The department object containing jobs or where a new job will be added.
 * @param jobToEdit - Optional. The specific job object to edit. If not provided, it's an "Add Job" operation.
 * @param onSuccess - Callback function called after successful operations.
 * @returns JSX Modal component for job management.
 */
const JobEditPopup: React.FC<JobEditPopupProps> = ({
  visible,
  onClose,
  department,
  jobToEdit,
  onSuccess,
}) => {
  // State for managing job changes within the modal
  const [jobChanges, setJobChanges] = useState<JobChange[]>([]);
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
   * Initializes the `jobChanges` state.
   * If `jobToEdit` is provided, it initializes with only that job for editing.
   * If `jobToEdit` is not provided (meaning we're adding a new job), it starts with an empty array.
   *
   * @returns void
   */
  const initializeJobs = (): void => {
    if (jobToEdit) {
      setJobChanges([
        {
          _id: jobToEdit._id,
          designation: jobToEdit.designation,
          experience: jobToEdit.experience,
          qualification: jobToEdit.qualification,
          job_description: jobToEdit.job_description,
          requirement: jobToEdit.requirement,
          isNew: false,
          isModified: false,
        },
      ]);
    } else {
      // If jobToEdit is undefined, it means we are in "Add New Job" mode.
      // We don't initialize with department.jobs directly, as we're managing specific job.
      setJobChanges([]);
    }
  };

  // Effect hook to initialize jobs whenever the modal becomes visible or the department/jobToEdit prop changes.
  useEffect(() => {
    if (visible && department) {
      initializeJobs();
    }
  }, [visible, department, jobToEdit]); // Dependencies ensure this runs when `visible`, `department`, or `jobToEdit` changes

  /**
   * Adds a new, temporary job entry to the `jobChanges` state.
   * A unique temporary `_id` is generated using `Date.now()`.
   * The `isNew` flag is set to `true` to distinguish it from existing jobs.
   * This is typically called when "Add New Job" button inside the modal is clicked.
   *
   * @returns void
   */
  const handleAddJob = (): void => {
    const newJob: JobChange = {
      _id: `temp_job_${Date.now()}`, // Temporary ID for new jobs
      designation: "New Position",
      experience: "0-1 years",
      qualification: "Bachelor's degree",
      job_description: "Job description here",
      requirement: 1,
      isNew: true,
      isModified: false,
    };

    setJobChanges((prev: JobChange[]) => [...prev, newJob]);
  };

  /**
   * Updates a specific field of a job in the `jobChanges` state.
   * It marks the job as `isModified` if it's not a newly added job.
   *
   * @param jobId - The `_id` (MongoDB or temporary) of the job to be updated.
   * @param field - The name of the field to update (e.g., "designation", "experience").
   * @param value - The new value for the specified field.
   * @returns void
   */
  const handleJobChange = (
    jobId: string,
    field: keyof Omit<JobType, "_id">, // Exclude '_id' as it's not meant to be directly changed by user input
    value: string | number,
  ): void => {
    setJobChanges((prev: JobChange[]) =>
      prev.map((job: JobChange) =>
        job._id === jobId
          ? { ...job, [field]: value, isModified: !job.isNew } // Mark as modified if not a new job
          : job,
      ),
    );
  };

  /**
   * Removes a job from the `jobChanges` state based on its `_id`.
   * This action prepares the job for deletion on the server (if it's an existing job)
   * or simply discards it (if it's a new, unsaved job).
   *
   * @param jobId - The `_id` (MongoDB or temporary) of the job to be removed.
   * @returns void
   */
  const handleRemoveJob = (jobId: string): void => {
    setJobChanges((prev: JobChange[]) =>
      prev.filter((job: JobChange) => job._id !== jobId),
    );
  };

  /**
   * Orchestrates saving all changes (creations, updates, deletions) to job openings.
   * It categorizes jobs into new, modified, and deleted lists, then sends corresponding
   * API requests (`POST`, `PUT`, `DELETE`). Handles loading states and displays
   * success or error messages.
   *
   * @returns Promise<void>
   */
  const handleSaveChanges = async (): Promise<void> => {
    setLoading(true); // Set loading state to true
    try {
      const requests: Promise<any>[] = []; // Array to hold all API request promises
      let hasErrors: boolean = false; // Flag to track if any errors occurred
      const allErrors: string[] = []; // Array to collect all error messages

      // To determine deleted jobs, we need to compare `jobChanges` with original `department.jobs`.
      // However, since this modal now manages only a subset (1 job for edit, or new jobs),
      // the deletion logic needs to consider the context.
      // If `jobToEdit` was provided, and now it's not in `jobChanges`, it means it was deleted.
      // If `jobToEdit` was not provided (add mode), there are no original jobs to delete from.
      const originalJobIds = jobToEdit ? [jobToEdit._id] : [];
      const currentJobIds = jobChanges.map((job) => job._id);
      const deletedJobIds: string[] = originalJobIds.filter(
        (id) => !currentJobIds.includes(id),
      );

      const newJobs: JobChange[] = jobChanges.filter(
        (job: JobChange) => job.isNew,
      );
      const modifiedJobs: JobChange[] = jobChanges.filter(
        (job: JobChange) => job.isModified && !job.isNew,
      );

      // Handle deletions
      if (deletedJobIds.length > 0) {
        const deletePayload: DeleteJobOpeningsRequest = {
          jobs_to_delete: deletedJobIds.map((jobId: string) => ({
            department_id: department._id,
            job_id: jobId,
          })),
        };
        requests.push(
          axios.delete<JobOpeningsResponse>("/api/job_openings", {
            data: deletePayload,
          }),
        );
      }

      // Handle creations
      if (newJobs.length > 0) {
        const createPayload: PostJobOpeningsRequest = {
          jobs: newJobs.map((job: JobChange) => ({
            department_id: department._id,
            designation: job.designation,
            experience: job.experience,
            qualification: job.qualification,
            job_description: job.job_description,
            requirement: job.requirement,
          })),
        };
        requests.push(
          axios.post<JobOpeningsResponse>("/api/job_openings", createPayload),
        );
      }

      // Handle updates
      if (modifiedJobs.length > 0) {
        const updatePayload: PutJobOpeningsRequest = {
          jobs: modifiedJobs.map((job: JobChange) => ({
            department_id: department._id,
            job_id: job._id, // Existing job ID
            designation: job.designation,
            experience: job.experience,
            qualification: job.qualification,
            job_description: job.job_description,
            requirement: job.requirement,
          })),
        };
        requests.push(
          axios.put<JobOpeningsResponse>("/api/job_openings", updatePayload),
        );
      }

      const responses = await Promise.all(requests);

      responses.forEach((response: { data: JobOpeningsResponse }) => {
        const result: JobOpeningsResponse = response.data;
        if (!result.success) {
          hasErrors = true;
          if (result.problems) {
            allErrors.push(...result.problems);
          }
        }
      });

      if (hasErrors) {
        setErrorMessages(allErrors);
        setIsErrorModalVisible(true);
      } else {
        message.success("Jobs updated successfully!");
        onSuccess(); // Call the `onSuccess` callback to refresh parent component data
        onClose(); // Close the modal
      }
    } catch (error: unknown) {
      console.error("Error saving job changes:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        setErrorMessages(error.response.data.problems);
        setIsErrorModalVisible(true);
      } else {
        message.error("Failed to save job changes");
      }
    } finally {
      setLoading(false); // Always reset loading state when operations complete
    }
  };

  /**
   * Handles the modal cancellation event.
   * Resets all internal state (job changes, error messages) and closes the modal.
   *
   * @returns void
   */
  const handleCancel = (): void => {
    setJobChanges([]);
    setErrorMessages([]);
    setIsErrorModalVisible(false);
    onClose();
  };

  return (
    <>
      {/* Main Job Edit Modal component */}
      <Modal
        title={
          jobToEdit
            ? `Edit Job for ${department.department_name}`
            : `Add New Job to ${department.department_name}`
        }
        open={visible}
        onOk={handleSaveChanges}
        onCancel={handleCancel}
        okText={loading ? "Saving..." : "Save Changes"}
        okButtonProps={{
          style: { backgroundColor: "#00a5a5", borderColor: "#00a5a5" },
        }}
        cancelText="Cancel"
        width={900}
        confirmLoading={loading}
        maskClosable={false}
      >
        <div className="mb-4">
          {/* Only show "Add New Job" button if not in "edit single job" mode */}
          {!jobToEdit && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddJob}
              style={{
                backgroundColor: "#00a5a5",
                borderColor: "#00a5a5",
              }}
            >
              Add Another Job
            </Button>
          )}
        </div>

        {/* Conditional rendering based on whether there are jobs to display */}
        {jobChanges.length === 0 && !jobToEdit ? (
          <div className="py-8 text-center">
            <p className="mb-4">{`No jobs to display. Click "Add Another Job" to create one.`}</p>
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <div className="max-h-96 overflow-y-auto pr-2">
              {jobChanges.map((job: JobChange, index: number) => (
                <div
                  key={job._id}
                  className="mb-6 rounded border border-gray-200 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {/* {job.isNew ? "New Job" : `Job ${index + 1}`} */}
                      {job.isNew ? "New Job" : ``}
                      {job.isNew && (
                        <span className="ml-2 rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                          New
                        </span>
                      )}
                      {job.isModified && (
                        <span className="ml-2 rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                          Modified
                        </span>
                      )}
                    </h3>
                    <Popconfirm
                      title="Remove Job"
                      description={
                        job.isNew
                          ? "Remove this new job?"
                          : "This will delete this job. Are you sure?"
                      }
                      onConfirm={() => handleRemoveJob(job._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                      >
                        {job.isNew ? "Remove" : "Delete"}
                      </Button>
                    </Popconfirm>
                  </div>

                  {/* Input fields for job properties */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Designation
                      </label>
                      <Input
                        value={job.designation}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleJobChange(
                            job._id,
                            "designation",
                            e.target.value,
                          )
                        }
                        placeholder="Enter designation"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Experience
                      </label>
                      <Input
                        value={job.experience}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleJobChange(job._id, "experience", e.target.value)
                        }
                        placeholder="e.g., 2-5 years"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Qualification
                      </label>
                      <Input
                        value={job.qualification}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleJobChange(
                            job._id,
                            "qualification",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Bachelor's, Master's"
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="mb-1 block text-sm font-medium">
                        Job Description
                      </label>
                      <Input.TextArea
                        value={job.job_description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleJobChange(
                            job._id,
                            "job_description",
                            e.target.value,
                          )
                        }
                        placeholder="Enter detailed job description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Requirement (No. of positions)
                      </label>
                      <InputNumber
                        value={job.requirement}
                        onChange={(value: number | null) =>
                          handleJobChange(job._id, "requirement", value || 0)
                        }
                        placeholder="Enter number of openings"
                        min={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Form>
        )}
      </Modal>

      {/* Error Modal for displaying API errors */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined className="text-red-500" />
            <span>Save Errors</span>
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
          <p className="mb-4">The following errors occurred while saving:</p>
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

export default JobEditPopup;
