// src/app/about/life-at-medgel/currentopenings.tsx

"use client";

import { JobDepartmentTypeDB, JobTypeDB } from "@/types";
import "./currentopenings.css";

import React, { useEffect, useState } from "react";
import AddDepartmentPopup from "./AddDepartmentPopup";
import EditDepartmentPopup from "./EditDepartmentPopup";
import JobEditPopup from "./JobEditPopup";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message, Modal } from "antd";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// Request body interfaces for API calls (copied from ContextCode.tsx for clarity in this file)
interface DeleteJobOpeningsRequest {
  departments_to_delete?: {
    id: string;
  }[];
  jobs_to_delete?: {
    department_id: string;
    job_id: string;
  }[];
}

interface JobOpeningsResponse {
  success: boolean;
  message: string;
  departments?: JobDepartmentTypeDB[];
  problems?: string[];
  department_results?: any;
  job_results?: any;
}

interface CurrentOpeningsProps {
  checkAdmin: boolean;
}

const CurrentOpenings: React.FC<CurrentOpeningsProps> = ({ checkAdmin }) => {
  // State management
  const [jobOpenings, setJobOpenings] = useState<JobDepartmentTypeDB[]>([]);
  const [addDepartmentVisible, setAddDepartmentVisible] =
    useState<boolean>(false);
  const [editDepartmentVisible, setEditDepartmentVisible] =
    useState<boolean>(false);
  const [jobEditVisible, setJobEditVisible] = useState<boolean>(false);

  // State to hold the ID of the department being edited (for EditDepartmentPopup)
  const [selectedDepartmentForEdit, setSelectedDepartmentForEdit] = useState<
    JobDepartmentTypeDB | undefined
  >(undefined);
  // State to hold the ID of the department for which jobs are being managed
  const [
    selectedDepartmentForJobManagement,
    setSelectedDepartmentForJobManagement,
  ] = useState<JobDepartmentTypeDB | undefined>(undefined);
  // State to hold the ID of the job being edited (if a specific job is selected for editing)
  const [selectedJobForEdit, setSelectedJobForEdit] = useState<
    JobTypeDB | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false); // General loading state
  const [deleteLoading, setDeleteLoading] = useState<string>(""); // Loading state for department deletion
  const [jobDeleteLoading, setJobDeleteLoading] = useState<string>(""); // Loading state for job deletion
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

  /**
   * Fetches job openings from the API.
   * Sorts the departments by sequence number and then alphabetically by department name.
   *
   * @returns Promise<void>
   */
  const fetchJobOpenings = async (): Promise<void> => {
    setLoading(true); // Set loading for fetching data
    try {
      const response =
        await axios.get<JobOpeningsResponse>("/api/job_openings");
      if (!response.data.success) {
        // If API returns success: false, but no problems array, show generic error
        if (response.data.problems && response.data.problems.length > 0) {
          setErrorMessages(response.data.problems);
          setIsErrorModalVisible(true);
        } else {
          message.error("Failed to fetch job openings");
        }
        return;
      }

      // Sort departments: first by sequence, then by department_name alphabetically
      const sortedDepartments = (response.data.departments || []).sort(
        (a, b) => {
          if (a.sequence !== b.sequence) {
            return a.sequence - b.sequence;
          }
          return a.department_name.localeCompare(b.department_name);
        },
      );

      setJobOpenings(sortedDepartments);
    } catch (error: unknown) {
      console.error("Error fetching job openings:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        setErrorMessages(error.response.data.problems);
        setIsErrorModalVisible(true);
      } else {
        message.error("Failed to fetch job openings");
      }
    } finally {
      setLoading(false); // Reset loading after fetch
    }
  };

  /**
   * Opens the Add Department modal.
   *
   * @returns void
   */
  const openAddDepartment = (): void => {
    setAddDepartmentVisible(true);
  };

  /**
   * Closes the Add Department modal and refreshes job openings.
   *
   * @returns void
   */
  const closeAddDepartment = (): void => {
    setAddDepartmentVisible(false);
    fetchJobOpenings(); // Refresh data after adding
  };

  /**
   * Opens the Edit Department modal for a specific department.
   * @param department - The department object to be edited.
   * @returns void
   */
  const openEditDepartment = (department: JobDepartmentTypeDB): void => {
    setSelectedDepartmentForEdit(department);
    setEditDepartmentVisible(true);
  };

  /**
   * Closes the Edit Department modal and refreshes job openings.
   *
   * @returns void
   */
  const closeEditDepartment = (): void => {
    setEditDepartmentVisible(false);
    setSelectedDepartmentForEdit(undefined); // Clear selected department
    fetchJobOpenings(); // Refresh data after editing
  };

  /**
   * Opens the Job Edit modal for a specific department, optionally for a specific job.
   * If `job` is provided, it's for editing an existing job.
   * If `job` is not provided, it's for adding a new job to the department.
   *
   * @param department - The department object to which the job belongs or will be added.
   * @param job - Optional. The specific job object to edit. If not provided, it's an "Add Job" operation.
   * @returns void
   */
  const openJobEdit = (
    department: JobDepartmentTypeDB,
    job?: JobTypeDB,
  ): void => {
    setSelectedDepartmentForJobManagement(department);
    setSelectedJobForEdit(job); // Set the specific job if editing, otherwise undefined for adding
    setJobEditVisible(true);
  };

  /**
   * Closes the Job Edit modal and refreshes job openings.
   *
   * @returns void
   */
  const closeJobEdit = (): void => {
    setJobEditVisible(false);
    setSelectedDepartmentForJobManagement(undefined);
    setSelectedJobForEdit(undefined);
    fetchJobOpenings(); // Refresh data after editing/adding jobs
  };

  /**
   * Handles the deletion of a department.
   * Displays loading state and error messages from the API.
   *
   * @param departmentId - The ID of the department to delete.
   * @returns Promise<void>
   */
  const handleDeleteDepartment = async (
    departmentId: string,
  ): Promise<void> => {
    setDeleteLoading(departmentId); // Set loading specific to this department ID
    try {
      const deletePayload: DeleteJobOpeningsRequest = {
        departments_to_delete: [{ id: departmentId }],
      };

      const response = await axios.delete<JobOpeningsResponse>(
        "/api/job_openings",
        {
          data: deletePayload,
        },
      );

      if (response.data.success) {
        message.success("Department deleted successfully!");
        fetchJobOpenings(); // Refresh data
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
      setDeleteLoading(""); // Reset loading state
    }
  };

  /**
   * Handles the deletion of a job.
   * Displays loading state and error messages from the API.
   *
   * @param departmentId - The ID of the department the job belongs to.
   * @param jobId - The ID of the job to delete.
   * @returns Promise<void>
   */
  const handleDeleteJob = async (
    departmentId: string,
    jobId: string,
  ): Promise<void> => {
    setJobDeleteLoading(jobId); // Set loading specific to this job ID
    try {
      const deletePayload: DeleteJobOpeningsRequest = {
        jobs_to_delete: [{ department_id: departmentId, job_id: jobId }],
      };

      const response = await axios.delete<JobOpeningsResponse>(
        "/api/job_openings",
        {
          data: deletePayload,
        },
      );

      if (response.data.success) {
        message.success("Job deleted successfully!");
        fetchJobOpenings(); // Refresh data
      } else {
        if (response.data.problems && response.data.problems.length > 0) {
          setErrorMessages(response.data.problems);
          setIsErrorModalVisible(true);
        } else {
          message.error("Failed to delete job");
        }
      }
    } catch (error: unknown) {
      console.error("Error deleting job:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        setErrorMessages(error.response.data.problems);
        setIsErrorModalVisible(true);
      } else {
        message.error("Failed to delete job");
      }
    } finally {
      setJobDeleteLoading(""); // Reset loading state
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchJobOpenings();
  }, []);

  // Show loading spinner if data is being fetched and there are no existing job openings
  if (loading && jobOpenings.length === 0) {
    return (
      <div className="current-openings-container">
        <h1 className="current-openings-title">Current Openings</h1>
        <p className="text-center text-gray-500">Loading job openings...</p>
      </div>
    );
  }

  // Render empty state if no job openings and not loading
  if (!loading && jobOpenings.length === 0) {
    return (
      <div className="current-openings-container">
        <h1 className="current-openings-title">
          Current Openings
          <div className="current-openings-underline"></div>
        </h1>
        <p className="current-openings-subtitle-description">
          No current openings available.
        </p>
        {checkAdmin && (
          <div className="mt-4 text-center">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openAddDepartment}
              style={{
                backgroundColor: "#00a5a5",
                borderColor: "#00a5a5",
              }}
            >
              Add First Department
            </Button>
          </div>
        )}

        {/* Add Department Modal (only for adding new) */}
        <AddDepartmentPopup
          visible={addDepartmentVisible}
          onClose={closeAddDepartment}
        />
      </div>
    );
  }

  return (
    <>
      <div className="current-openings-container">
        <h1 className="current-openings-title">
          Current Openings
          <div className="current-openings-underline"></div>
        </h1>
        <p className="current-openings-subtitle">
          What Inspires You, Inspires Us
        </p>
        <p className="current-openings-subtitle-description">
          Are you inspired to lead, learn, grow, and make a difference? You've
          come to the right place.
        </p>

        <div className="department-section">
          {jobOpenings.map((department: JobDepartmentTypeDB) => (
            <div key={department._id} className="department-item">
              <div className="department-header">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                  <div>
                    <h2>{department.department_name}</h2>
                    <div className="department-header-underline"></div>
                  </div>

                  {checkAdmin && (
                    <div className="mt-2 flex flex-col gap-2 sm:mt-0 sm:flex-row">
                      <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => openEditDepartment(department)} // Open edit department modal
                        size="small"
                        className="flex items-center"
                      >
                        Edit Department
                      </Button>

                      <Popconfirm
                        title="Delete Department"
                        description={`Are you sure you want to delete "${
                          department.department_name
                        }"? This will also delete all ${
                          department.jobs.length
                        } job(s) in this department.`}
                        onConfirm={() => handleDeleteDepartment(department._id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                      >
                        <Button
                          type="primary"
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                          loading={deleteLoading === department._id}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                  )}
                </div>
              </div>

              <div className="department-openings">
                {department.jobs.map((job: JobTypeDB) => (
                  <div key={job._id} className="opening-card">
                    <div className="opening-info">
                      <p className="opening-title">
                        <span className="opening-bold">Designation: </span>
                        {job.designation}
                      </p>
                      <p className="opening-experience">
                        <span className="opening-bold">Experience: </span>
                        {job.experience}
                      </p>
                      <p className="opening-qualification">
                        <span className="opening-bold">Qualification: </span>
                        {job.qualification}
                      </p>
                      <p className="opening-description">
                        <span className="opening-bold">Job Description: </span>
                        {job.job_description}
                      </p>
                      <p className="opening-requirement">
                        <span className="opening-bold">Requirement: </span>
                        {job.requirement}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-auto"> {/* Centered buttons */}
                      <button className="apply-btn">Apply Now</button>
                      {checkAdmin && (
                        <>
                          <Button
                            type="default"
                            icon={<EditOutlined />}
                            onClick={() => openJobEdit(department, job)} // Open job edit modal for specific job
                            className="job-action-btn edit-job-btn" // Added custom class
                            size="small"
                          >
                            Edit Job
                          </Button>
                          <Popconfirm
                            title="Delete Job"
                            description={`Are you sure you want to delete the job "${job.designation}"?`}
                            onConfirm={() => handleDeleteJob(department._id, job._id)}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                          >
                            <Button
                              type="primary"
                              danger
                              icon={<DeleteOutlined />}
                              className="job-action-btn delete-job-btn" // Added custom class
                              size="small"
                              loading={jobDeleteLoading === job._id}
                            >
                              Delete Job
                            </Button>
                          </Popconfirm>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Modified Add Job button section */}
                {checkAdmin && (
                  <div className="add-job-card">
                    <Button
                      type="dashed" // Using Ant Design's dashed type for an "add" button
                      icon={<PlusOutlined />}
                      onClick={() => openJobEdit(department)} // Open job edit modal for adding new job
                      className="add-job-button-style"
                    >
                      Add Job
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {checkAdmin && (
          <div className="mt-8 text-center">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openAddDepartment} // Open add department modal
              size="large"
              style={{
                backgroundColor: "#00a5a5",
                borderColor: "#00a5a5",
              }}
            >
              Add New Department
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Add Department Modal (only for adding new) */}
      <AddDepartmentPopup
        visible={addDepartmentVisible}
        onClose={closeAddDepartment}
      />

      {/* Edit Department Modal (for editing existing department) */}
      {selectedDepartmentForEdit && (
        <EditDepartmentPopup
          visible={editDepartmentVisible}
          onClose={closeEditDepartment}
          department={selectedDepartmentForEdit}
          onSuccess={fetchJobOpenings}
        />
      )}

      {/* Job Edit/Add Modal */}
      {selectedDepartmentForJobManagement && (
        <JobEditPopup
          visible={jobEditVisible}
          onClose={closeJobEdit}
          department={selectedDepartmentForJobManagement}
          jobToEdit={selectedJobForEdit} // Pass the specific job if editing, undefined if adding
          onSuccess={fetchJobOpenings}
        />
      )}

      {/* General Error Modal for CurrentOpenings component's direct API calls */}
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
          <p className="mb-4">The following errors occurred:</p>
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

export default CurrentOpenings;