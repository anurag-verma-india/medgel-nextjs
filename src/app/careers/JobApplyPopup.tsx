"use client";

import { Button, Form, Input, message, Modal, Space } from "antd";
import { JobDepartmentTypeDB } from "@/types";
import React, { useEffect, useState } from "react";

const JobApplyPopup = () => {
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
  // If jobOpeningsData is empty, display a message indicating no job openings
  if (jobOpeningsData.length === 0) {
    return (
      <div>
        <h2>Job Openings</h2>
        <p>Currently, there are no job openings available.</p>
      </div>
    );
  }

  // return (
  //   <>
  //     <Modal
  //       title="User Information"
  //       // open={isModalVisible}
  //       // onOk={handleModalOk}
  //       // onCancel={handleModalCancel}
  //       okText="Save"
  //       cancelText="Cancel"
  //       width={500}
  //     >
  //       <Form
  //         // form={form}
  //         layout="vertical"
  //         initialValues={{ name: "", email: "" }}
  //       >
  //         <Form.Item
  //           label="Name"
  //           name="name"
  //           rules={[{ required: true, message: "Please enter your name!" }]}
  //         >
  //           <Input placeholder="Enter your name" />
  //         </Form.Item>

  //         <Form.Item
  //           label="Email"
  //           name="email"
  //           rules={[
  //             { required: true, message: "Please enter your email!" },
  //             { type: "email", message: "Please enter a valid email!" },
  //           ]}
  //         >
  //           <Input placeholder="Enter your email" />
  //         </Form.Item>
  //       </Form>
  //     </Modal>
  //   </>
  // );

  // TODO: using /antd-popup/page.tsx as a reference implementing a popup for job openings
  // export interface JobType {
  //   designation: string;
  //   experience: string;
  //   qualification: string;
  //   job_description: string;
  //   requirement: number;
  // }
  // export interface JobDepartmentType {
  //   department_name: string;
  //   sequence: number;
  //   jobs: JobType[];
  // }
  // export interface JobTypeDB extends JobType {
  //   _id: string;
  // }
  // export interface JobDepartmentTypeDB extends JobDepartmentType {
  //   _id: string;
  //   jobs: JobTypeDB[];
  // }

  return (
    <>
      <div style={{ padding: "20px" }} className="flex w-full">
        <Space
          direction="vertical"
          size="large"
          style={{ display: "flex" }}
          className="w-full"
        >
          <h2>Job Openings</h2>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Apply Now
          </Button>
          <Modal
            title="Apply for Job"
            open={isModalVisible}
            onOk={() => {
              form.submit();
              setIsModalVisible(false);
            }}
            onCancel={() => setIsModalVisible(false)}
            okText="Submit"
            cancelText="Cancel"
            width={500}
          >
            {/* {jobOpeningsData.map((department) => (
          <div key={department._id}>
            <h3>{department.department_name}</h3>
            {department.jobs.map((job) => (
              <div key={job._id} className="mb-4">
                <h4>{job.designation}</h4>
                <p>Experience: {job.experience}</p>
                <p>Qualification: {job.qualification}</p>
                <p>Description: {job.job_description}</p>
                <p>Requirements: {job.requirement}</p>
              </div>
            ))}
          </div>
        ))} */}
            <Form
              form={form}
              layout="vertical"
              initialValues={{ name: "", email: "" }}
              onFinish={(values) => {
                console.log("Form Submitted:", values);
                message.success("Application submitted successfully!");
                form.resetFields();
                setIsModalVisible(false);
              }}
            >
              {/* <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item> */}

              {jobOpeningsData.map((department) => (
                <Form.Item
                  key={department._id}
                  label={department.department_name}
                  name={department.department_name}
                  rules={[{ required: true, message: "Please select a job!" }]}
                >
                  <select>
                    {department.jobs.map((job) => (
                      <option key={job._id} value={job._id}>
                        {job.designation}
                      </option>
                    ))}
                  </select>
                </Form.Item>
              ))}
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: "Please enter a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item
                label="Resume"
                name="resume"
                rules={[
                  { required: true, message: "Please upload your resume!" },
                ]}
              >
                <Input type="file" accept=".pdf,.doc,.docx" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Application
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <div>
            {/* {jobOpeningsData.map((department) => (
              <div key={department._id} className="mb-4">
                <h3>{department.department_name}</h3>
                {department.jobs.map((job) => (
                  <div key={job._id} className="mb-4">
                    <h4>{job.designation}</h4>
                    <p>Experience: {job.experience}</p>
                    <p>Qualification: {job.qualification}</p>
                    <p>Description: {job.job_description}</p>
                    <p>Requirements: {job.requirement}</p>
                  </div>
                ))}
              </div>
            ))} */}
          </div>
        </Space>
      </div>
    </>
  );
};
export default JobApplyPopup;
