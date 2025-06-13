"use client";
// src/app/about/life-at-medgel/DepartmentsEditPopup.tsx

import { Button, Form, Input, message, Modal, Space } from "antd";
import { JobDepartmentTypeDB } from "@/types";
import React, { useEffect, useState } from "react";

// import React from 'react'

export interface JobType {
  designation: string;
  experience: string;
  qualification: string;
  job_description: string;
  requirement: number;
}
export interface JobDepartmentType {
  department_name: string;
  sequence: number;
  jobs: JobType[];
}
export interface JobTypeDB extends JobType {
  _id: string;
}
export interface JobDepartmentTypeDB extends JobDepartmentType {
  _id: string;
  jobs: JobTypeDB[];
}

const DepartmentsEditPopup = () => {
  const [jobOpeningsData, setJobOpeningsData] = useState<JobDepartmentTypeDB[]>(
    [],
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch job openings data from the API
    const fetchJobOpenings = async () => {
      try {
        const response = await fetch("/api/job_openings");
        if (!response.ok) {
          throw new Error("Failed to fetch job openings");
        }
        const data = await response.json();
        if (data && data.departments) {
          console.log("Job Openings Data:", data.departments);
          setJobOpeningsData(data.departments || []);
        }
      } catch (error) {
        console.error("Error fetching job openings:", error);
      }
    };

    fetchJobOpenings();
  }, []);

  // Handle modal OK button click
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Values:", values);
      // Prepare the data to be sent to the API
      const updatedDepartments = jobOpeningsData.map((department) => {
        return {
          ...department,
          department_name: values[`department_name_${department._id}`],
          sequence: values[`sequence_${department._id}`],
        };
      });
      // Send the updated data to the API
      const response = await fetch("/api/job_openings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ departments: updatedDepartments }),
      });
      if (!response.ok) {
        throw new Error("Failed to update job openings");
      }
      const result = await response.json();
      console.log("Update Result:", result);
      // message.success("Job openings updated successfully!");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating job openings:", error);
      message.error("Failed to update job openings");
    }
  };

  // If jobOpeningsData is empty, display a message indicating no job openings
  if (jobOpeningsData.length === 0) {
    return (
      <Modal>
        <h2>Job Openings</h2>
        <p>No Job Openings</p>
        <Button type="primary" onClick={() => setIsModalVisible(false)}>
          Close
        </Button>
      </Modal>
    );
  }

  return (
    <>
      {/* <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Edit Job Opening
      </Button> */}

      <div className="relative">
        <button
          // onClick={onClick}
          onClick={() => setIsModalVisible(true)}
          className="absolute right-0 top-0 z-50 mr-5 mt-5 rounded bg-[#00a5a5] px-4 py-2 text-black opacity-40 shadow hover:bg-[#197777] focus:outline-none focus:ring-2 focus:ring-black w-fit"
        >
          Edit Departments
        </button>
      </div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Modal
          title="Edit Departments"
          open={isModalVisible}
          // onOk={() => setIsModalVisible(false)}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          okText="Save"
          cancelText="Cancel"
          width={500}
        >
          {/* {jobOpeningsData.map((department) => (
            <div key={department._id} className="mb-4 rounded bg-gray-100 p-4">
              <Form
                key={department._id}
                form={form}
                layout="vertical"
                initialValues={{
                  department_name: department.department_name,
                  sequence: department.sequence,
                }}
              >
                <Form.Item
                  label="Department Name"
                  name="department_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input department name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Sequence"
                  name="sequence"
                  rules={[
                    { required: true, message: "Please input sequence!" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Form>
            </div>
          ))} */}
          {/* Fix the error that all fields are getting updated simultaneously when one is edited in the modal's form */}
          <Form
            form={form}
            layout="vertical"
            initialValues={{ department_name: "", sequence: 0 }}
            onFinish={handleModalOk}
          >
            {jobOpeningsData.map((department) => (
              <div
                key={department._id}
                className="mb-4 rounded bg-gray-100 p-4"
              >
                <h3 className="font-bold">{department.department_name}</h3>
                <Form.Item
                  label="Department Name"
                  name={`department_name_${department._id}`}
                  initialValue={department.department_name}
                  rules={[
                    {
                      required: true,
                      message: "Please input department name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Sequence"
                  name={`sequence_${department._id}`}
                  initialValue={department.sequence}
                  rules={[
                    { required: true, message: "Please input sequence!" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
            ))}
            {/* <Button type="primary" htmlType="submit">
              Save Changes
            </Button> */}
          </Form>
        </Modal>
      </Space>
    </>
  );
};
export default DepartmentsEditPopup;


/*
Example test data for POST request:
{
  "departments": [
    {
      "department_name": "Engineering",
      "sequence": 1
    },
    {
      "department_name": "Marketing",
      "sequence": 2 
    }
  ],
  "jobs": [
    {
      "department_id": "60c72b2f9b1e8b001c8e4d3a",
      "designation": "Software Engineer",
      "experience": "2-3 years",
      "qualification": "B.Tech in Computer Science",
      "job_description": "Develop and maintain software applications.",
      "requirement": 1
    },
    {
      "department_id": "60c72b2f9b1e8b001c8e4d3a",
      "designation": "Data Scientist",
      "experience": "3-5 years",
      "qualification": "M.Tech in Data Science",
      "job_description": "Analyze and interpret complex data sets.",
      "requirement": 1
    }
  ]
}
/*
Example test data for PUT request:
{
  "departments": [
    {
      "id": "60c72b2f9b1e8b001c8e4d3a",
      "department_name": "Engineering",
      "sequence": 1
    },
    {
      "id": "60c72b2f9b1e8b001c8e4d3b",
      "department_name": "Marketing",
      "sequence": 2
    }
  ],
  "jobs": [
    {
      "department_id": "60c72b2f9b1e8b001c8e4d3a",
      "job_id": "60c72b2f9b1e8b001c8e4d3c",
      "designation": "Senior Software Engineer",
      "experience": "5-7 years",
      "qualification": "B.Tech in Computer Science",
      "job_description": "Lead software development projects.",
      "requirement": 1
    },
    {
      "department_id": "60c72b2f9b1e8b001c8e4d3a",
      "job_id": "60c72b2f9b1e8b001c8e4d3d", 
        "designation": "Data Analyst",
        "experience": "1-2 years",
        "qualification": "B.Tech in Data Science",
        "job_description": "Assist in data analysis and reporting.",
        "requirement": 1
        }
    ]
}
/*
Example test data for DELETE request:
{
  "jobs_to_delete": [
    {
      "department_id": "60c72b2f9b1e8b001c8e4d3a",
      "job_id": "60c72b2f9b1e8b001c8e4d3c"
    },
    {
      "department_id": "60c72b2f9b1e8b001c8e4d3a",
      "job_id": "60c72b2f9b1e8b001c8e4d3d"
    }
  ]
}
*/