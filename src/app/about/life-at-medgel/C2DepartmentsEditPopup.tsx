"use client";
// src/app/about/life-at-medgel/DepartmentsEditPopup.tsx

import { Button, Form, Input, message, Modal, Space, Popconfirm, InputNumber } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

// API Interface Types
interface PostJobOpeningsRequest {
  departments?: {
    department_name: string;
    sequence: number;
  }[];
  jobs?: {
    department_id: string;
    designation: string;
    experience: string;
    qualification: string;
    job_description: string;
    requirement: number;
  }[];
}

interface PutJobOpeningsRequest {
  departments?: {
    id: string;
    department_name?: string;
    sequence?: number;
  }[];
  jobs?: {
    department_id: string;
    job_id: string;
    designation?: string;
    experience?: string;
    qualification?: string;
    job_description?: string;
    requirement?: number;
  }[];
}

interface DeleteJobOpeningsRequest {
  jobs_to_delete?: {
    department_id: string;
    job_id: string;
  }[];
  departments_to_delete?: {
    id: string;
  }[];
}

interface JobOpeningsSuccessResponse {
  success: true;
  message: string;
  departments?: any;
  department_results?: any;
  job_results?: any;
}

interface JobOpeningsErrorResponse {
  success: false;
  message: string;
  problems: string[];
  department_results?: any;
  job_results?: any;
}

// Component Types
export interface JobType {
  designation: string;
  experience: string;
  qualification: string;
  job_description: string;
  requirement: number;
}

export interface JobTypeDB extends JobType {
  _id: string;
}

export interface JobDepartmentType {
  department_name: string;
  sequence: number;
  jobs: JobType[];
}

export interface JobDepartmentTypeDB extends JobDepartmentType {
  _id: string;
  jobs: JobTypeDB[];
}

// State Management Types
interface DepartmentState {
  original: JobDepartmentTypeDB[];
  current: JobDepartmentTypeDB[];
  toDelete: string[];
  toCreate: Omit<JobDepartmentType, 'jobs'>[];
  toUpdate: { id: string; department_name?: string; sequence?: number }[];
}

interface JobState {
  toDelete: { department_id: string; job_id: string }[];
  toCreate: { department_id: string; job: JobType }[];
  toUpdate: { department_id: string; job_id: string; updates: Partial<JobType> }[];
}

// Component Props
interface DepartmentsEditPopupProps {
  popupState: boolean;
  popupOpenFn: (state: boolean) => void;
}

const DepartmentsEditPopup: React.FC<DepartmentsEditPopupProps> = ({
  popupState,
  popupOpenFn
}) => {
  const [departmentState, setDepartmentState] = useState<DepartmentState>({
    original: [],
    current: [],
    toDelete: [],
    toCreate: [],
    toUpdate: []
  });

  const [jobState, setJobState] = useState<JobState>({
    toDelete: [],
    toCreate: [],
    toUpdate: []
  });

  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  
  const [departmentForm] = Form.useForm();
  const [jobForm] = Form.useForm();

  // Fetch job openings data
  useEffect(() => {
    if (popupState) {
      fetchJobOpenings();
    }
  }, [popupState]);

  const fetchJobOpenings = async () => {
    try {
      const response = await axios.get<JobOpeningsSuccessResponse>("/api/job_openings");
      if (response.data && response.data.departments) {
        console.log("Job Openings Data:", response.data.departments);
        const departments = response.data.departments || [];
        setDepartmentState(prev => ({
          ...prev,
          original: departments,
          current: [...departments]
        }));
        
        // Reset job state when fetching new data
        setJobState({
          toDelete: [],
          toCreate: [],
          toUpdate: []
        });
      }
    } catch (error) {
      console.error("Error fetching job openings:", error);
      message.error("Failed to fetch job openings");
    }
  };

  // Department management functions
  const handleDepartmentChange = (departmentId: string, field: 'department_name' | 'sequence', value: string | number) => {
    setDepartmentState(prev => {
      const updatedCurrent = prev.current.map(dept => 
        dept._id === departmentId 
          ? { ...dept, [field]: value }
          : dept
      );

      // Track changes for update
      const existingUpdateIndex = prev.toUpdate.findIndex(update => update.id === departmentId);
      let updatedToUpdate = [...prev.toUpdate];
      
      if (existingUpdateIndex >= 0) {
        updatedToUpdate[existingUpdateIndex] = {
          ...updatedToUpdate[existingUpdateIndex],
          [field]: value
        };
      } else {
        updatedToUpdate.push({
          id: departmentId,
          [field]: value
        });
      }

      return {
        ...prev,
        current: updatedCurrent,
        toUpdate: updatedToUpdate
      };
    });
  };

  const handleAddDepartment = () => {
    const newDepartment: JobDepartmentTypeDB = {
      _id: `temp_${Date.now()}`,
      department_name: "New Department",
      sequence: departmentState.current.length + 1,
      jobs: []
    };

    setDepartmentState(prev => ({
      ...prev,
      current: [...prev.current, newDepartment],
      toCreate: [...prev.toCreate, {
        department_name: newDepartment.department_name,
        sequence: newDepartment.sequence
      }]
    }));
  };

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartmentState(prev => {
      const filteredCurrent = prev.current.filter(dept => dept._id !== departmentId);
      
      // If it's a temporary department (not saved to DB), just remove from toCreate
      if (departmentId.startsWith('temp_')) {
        const departmentIndex = prev.current.findIndex(dept => dept._id === departmentId);
        const tempIndex = departmentIndex - (prev.current.length - prev.toCreate.length);
        const filteredToCreate = prev.toCreate.filter((_, index) => index !== tempIndex);
        
        return {
          ...prev,
          current: filteredCurrent,
          toCreate: filteredToCreate
        };
      }

      // If it's an existing department, add to toDelete
      return {
        ...prev,
        current: filteredCurrent,
        toDelete: [...prev.toDelete, departmentId]
      };
    });
  };

  // Job management functions
  const handleOpenJobModal = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setIsJobModalVisible(true);
    
    // Set initial values for job form
    const department = departmentState.current.find(dept => dept._id === departmentId);
    if (department) {
      const formValues: Record<string, any> = {};
      department.jobs.forEach((job, index) => {
        formValues[`job_${index}_designation`] = job.designation;
        formValues[`job_${index}_experience`] = job.experience;
        formValues[`job_${index}_qualification`] = job.qualification;
        formValues[`job_${index}_job_description`] = job.job_description;
        formValues[`job_${index}_requirement`] = job.requirement;
      });
      jobForm.setFieldsValue(formValues);
    }
  };

  const handleJobChange = (jobId: string, field: keyof JobType, value: string | number) => {
    // Update current state
    setDepartmentState(prev => ({
      ...prev,
      current: prev.current.map(dept => 
        dept._id === selectedDepartmentId 
          ? {
              ...dept,
              jobs: dept.jobs.map(job => 
                job._id === jobId 
                  ? { ...job, [field]: value }
                  : job
              )
            }
          : dept
      )
    }));

    // Track for updates if it's not a temporary job
    if (!jobId.startsWith('temp_job_')) {
      setJobState(prev => {
        const existingUpdateIndex = prev.toUpdate.findIndex(
          update => update.department_id === selectedDepartmentId && update.job_id === jobId
        );
        let updatedToUpdate = [...prev.toUpdate];
        
        if (existingUpdateIndex >= 0) {
          updatedToUpdate[existingUpdateIndex] = {
            ...updatedToUpdate[existingUpdateIndex],
            updates: {
              ...updatedToUpdate[existingUpdateIndex].updates,
              [field]: value
            }
          };
        } else {
          updatedToUpdate.push({
            department_id: selectedDepartmentId,
            job_id: jobId,
            updates: { [field]: value }
          });
        }

        return {
          ...prev,
          toUpdate: updatedToUpdate
        };
      });
    }
  };

  const handleAddJob = () => {
    const newJob: JobTypeDB = {
      _id: `temp_job_${Date.now()}`,
      designation: "New Position",
      experience: "0-1 years",
      qualification: "Bachelor's degree",
      job_description: "Job description here",
      requirement: 1
    };

    setDepartmentState(prev => ({
      ...prev,
      current: prev.current.map(dept => 
        dept._id === selectedDepartmentId 
          ? { ...dept, jobs: [...dept.jobs, newJob] }
          : dept
      )
    }));

    setJobState(prev => ({
      ...prev,
      toCreate: [...prev.toCreate, {
        department_id: selectedDepartmentId,
        job: {
          designation: newJob.designation,
          experience: newJob.experience,
          qualification: newJob.qualification,
          job_description: newJob.job_description,
          requirement: newJob.requirement
        }
      }]
    }));
  };

  const handleDeleteJob = (jobId: string) => {
    // Remove from current state
    setDepartmentState(prev => ({
      ...prev,
      current: prev.current.map(dept => 
        dept._id === selectedDepartmentId 
          ? { ...dept, jobs: dept.jobs.filter(job => job._id !== jobId) }
          : dept
      )
    }));

    // If it's a temporary job, remove from toCreate
    if (jobId.startsWith('temp_job_')) {
      setJobState(prev => ({
        ...prev,
        toCreate: prev.toCreate.filter(item => {
          const job = departmentState.current
            .find(dept => dept._id === selectedDepartmentId)
            ?.jobs.find(j => j._id === jobId);
          return !(item.department_id === selectedDepartmentId && 
                   job && 
                   item.job.designation === job.designation &&
                   item.job.experience === job.experience &&
                   item.job.qualification === job.qualification);
        })
      }));
    } else {
      // If it's an existing job, add to toDelete
      setJobState(prev => ({
        ...prev,
        toDelete: [...prev.toDelete, { department_id: selectedDepartmentId, job_id: jobId }]
      }));
    }
  };

  // Save all changes
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const requests: Promise<any>[] = [];
      let hasErrors = false;
      const allErrors: string[] = [];

      // Handle deletions first
      if (departmentState.toDelete.length > 0 || jobState.toDelete.length > 0) {
        const deletePayload: DeleteJobOpeningsRequest = {};
        if (departmentState.toDelete.length > 0) {
          deletePayload.departments_to_delete = departmentState.toDelete.map(id => ({ id }));
        }
        if (jobState.toDelete.length > 0) {
          deletePayload.jobs_to_delete = jobState.toDelete;
        }

        requests.push(
          axios.delete<JobOpeningsSuccessResponse | JobOpeningsErrorResponse>("/api/job_openings", {
            data: deletePayload
          })
        );
      }

      // Handle creations
      if (departmentState.toCreate.length > 0 || jobState.toCreate.length > 0) {
        const createPayload: PostJobOpeningsRequest = {};
        if (departmentState.toCreate.length > 0) {
          createPayload.departments = departmentState.toCreate;
        }
        if (jobState.toCreate.length > 0) {
          // Map temporary department IDs to actual department IDs for jobs
          const jobsToCreate = jobState.toCreate.map(job => {
            let departmentId = job.department_id;
            
            // If it's a temporary department, we need to find the corresponding real department
            if (departmentId.startsWith('temp_')) {
              // For now, we'll keep the temp ID and handle it on the backend
              // In a real scenario, you'd need to get the actual ID after department creation
              departmentId = departmentId;
            }
            
            return {
              department_id: departmentId,
              ...job.job
            };
          });
          createPayload.jobs = jobsToCreate;
        }

        requests.push(
          axios.post<JobOpeningsSuccessResponse | JobOpeningsErrorResponse>("/api/job_openings", createPayload)
        );
      }

      // Handle updates
      if (departmentState.toUpdate.length > 0 || jobState.toUpdate.length > 0) {
        const updatePayload: PutJobOpeningsRequest = {};
        if (departmentState.toUpdate.length > 0) {
          updatePayload.departments = departmentState.toUpdate;
        }
        if (jobState.toUpdate.length > 0) {
          updatePayload.jobs = jobState.toUpdate.map(job => ({
            department_id: job.department_id,
            job_id: job.job_id,
            ...job.updates
          }));
        }

        requests.push(
          axios.put<JobOpeningsSuccessResponse | JobOpeningsErrorResponse>("/api/job_openings", updatePayload)
        );
      }

      // Execute all requests
      const responses = await Promise.all(requests);
      
      // Check results and collect errors
      responses.forEach(response => {
        const result = response.data;
        if (!result.success) {
          hasErrors = true;
          allErrors.push(...(result as JobOpeningsErrorResponse).problems);
        }
      });

      if (hasErrors) {
        setErrorMessages(allErrors);
        setIsErrorModalVisible(true);
      } else {
        message.success("All changes saved successfully!");
        
        // Reset states
        setDepartmentState(prev => ({
          original: prev.current,
          current: prev.current,
          toDelete: [],
          toCreate: [],
          toUpdate: []
        }));
        setJobState({
          toDelete: [],
          toCreate: [],
          toUpdate: []
        });
        
        // Close modals and reload page
        popupOpenFn(false);
        setIsJobModalVisible(false);
        
        // Reload the page
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      if (axios.isAxiosError(error) && error.response?.data?.problems) {
        setErrorMessages(error.response.data.problems);
        setIsErrorModalVisible(true);
      } else {
        message.error("Failed to save changes");
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedDepartment = departmentState.current.find(dept => dept._id === selectedDepartmentId);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => popupOpenFn(true)}
          className="absolute right-0 top-0 z-50 mr-5 mt-5 rounded bg-[#00a5a5] px-4 py-2 text-black opacity-40 shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black w-fit"
        >
          Edit Jobs
        </button>
      </div>
      {/* Main Department Modal */}
      <Modal
        title="Manage Departments"
        open={popupState}
        onOk={handleSaveChanges}
        onCancel={() => popupOpenFn(false)}
        okText={loading ? "Saving..." : "Save All Changes"}
        cancelText="Cancel"
        width={800}
        confirmLoading={loading}
        maskClosable={false}
      >
        {departmentState.current.length === 0 ? (
          <div className="text-center py-8">
            <p className="mb-4">No Job Openings Found</p>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddDepartment}
            >
              Add First Department
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddDepartment}
                className="mb-4"
              >
                Add New Department
              </Button>
            </div>

            <Form form={departmentForm} layout="vertical">
              {departmentState.current.map((department, index) => (
                <div key={department._id} className="mb-6 rounded border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Department {index + 1}</h3>
                    <div className="flex gap-2">
                      <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenJobModal(department._id)}
                        size="small"
                      >
                        Edit Jobs ({department.jobs.length})
                      </Button>
                      <Popconfirm
                        title="Delete Department"
                        description="Are you sure you want to delete this department? This will also delete all jobs in this department."
                        onConfirm={() => handleDeleteDepartment(department._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          type="primary"
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Department Name</label>
                      <Input
                        value={department.department_name}
                        onChange={(e) => handleDepartmentChange(department._id, 'department_name', e.target.value)}
                        placeholder="Enter department name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Sequence</label>
                      <InputNumber
                        value={department.sequence}
                        onChange={(value) => handleDepartmentChange(department._id, 'sequence', value || 0)}
                        placeholder="Enter sequence"
                        min={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Form>
          </>
        )}
      </Modal>

      {/* Job Management Modal */}
      <Modal
        title={`Manage Jobs - ${selectedDepartment?.department_name}`}
        open={isJobModalVisible}
        onCancel={() => setIsJobModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsJobModalVisible(false)}>
            Close
          </Button>
        ]}
        width={900}
        maskClosable={false}
      >
        <div className="mb-4">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddJob}
            className="mb-4"
          >
            Add New Job
          </Button>
        </div>

        {selectedDepartment?.jobs.length === 0 ? (
          <div className="text-center py-8">
            <p>No jobs in this department yet.</p>
          </div>
        ) : (
          <Form form={jobForm} layout="vertical">
            {selectedDepartment?.jobs.map((job, index) => (
              <div key={job._id} className="mb-6 rounded border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold">Job {index + 1}</h4>
                  <Popconfirm
                    title="Delete Job"
                    description="Are you sure you want to delete this job opening?"
                    onConfirm={() => handleDeleteJob(job._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Designation</label>
                    <Input
                      value={job.designation}
                      onChange={(e) => handleJobChange(job._id, 'designation', e.target.value)}
                      placeholder="Enter job designation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Experience</label>
                    <Input
                      value={job.experience}
                      onChange={(e) => handleJobChange(job._id, 'experience', e.target.value)}
                      placeholder="Enter experience requirement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Qualification</label>
                    <Input
                      value={job.qualification}
                      onChange={(e) => handleJobChange(job._id, 'qualification', e.target.value)}
                      placeholder="Enter qualification requirement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Requirements</label>
                    <InputNumber
                      value={job.requirement}
                      onChange={(value) => handleJobChange(job._id, 'requirement', value || 1)}
                      placeholder="Number of openings"
                      min={1}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Job Description</label>
                  <Input.TextArea
                    value={job.job_description}
                    onChange={(e) => handleJobChange(job._id, 'job_description', e.target.value)}
                    placeholder="Enter job description"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </Form>
        )}
      </Modal>

      {/* Error Modal */}
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
          </Button>
        ]}
        width={600}
      >
        <div className="max-h-96 overflow-y-auto">
          <p className="mb-4">The following errors occurred while saving:</p>
          <ul className="list-disc list-inside space-y-2">
            {errorMessages.map((error, index) => (
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

export default DepartmentsEditPopup;