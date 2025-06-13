// src/app/api/job_openings/route.tsx

/*
TODO: 
GET: Email verified
-----
PUT: User admin
*/

import { NextRequest, NextResponse } from "next/server";
import handleError from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import JobOpening from "@/models/jobOpenings";
import { JobDepartmentType, JobType } from "@/types";
import { AnyBulkWriteOperation } from "mongoose";

const validMongoDBObjectId: RegExp = /^[0-9a-fA-F]{24}$/;

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      departments,
      jobs,
    }: {
      departments: {
        department_name: string;
        sequence: number;
      }[];
      jobs: {
        department_id: string; // ID of the department to which the job belongs
        designation: string;
        experience: string;
        qualification: string;
        job_description: string;
        requirement: number;
      }[];
    } = body;
    const problems: string[] = [];

    const operations_in_departments: AnyBulkWriteOperation[] = [];

    // --> Operations on departments
    if (departments && departments.length > 0) {
      for (const department of departments) {
        // validate department_id is a valid MongoDB ObjectId with regex
        if (
          !department.department_name ||
          typeof department.department_name !== "string" ||
          !department.sequence ||
          typeof department.sequence !== "number"
        ) {
          problems.push(
            `Invalid department data: ${JSON.stringify(department)}`,
          );
          continue; // Skip to the next department
        }

        const { department_name, sequence } = department;

        // Check if the department already exists
        const existingDepartment = await JobOpening.findOne({
          department_name,
        });
        if (existingDepartment) {
          problems.push(`Department "${department_name}" already exists.`);
          continue; // Skip to the next department
        }
        // Create a new department
        const newDepartment: JobDepartmentType = {
          department_name,
          sequence,
          jobs: [],
        };
        operations_in_departments.push({
          updateOne: {
            filter: { department_name },
            update: { $setOnInsert: newDepartment },
            upsert: true, // Insert if it doesn't exist
          },
        });
      }
    }

    const department_results = await JobOpening.bulkWrite(
      operations_in_departments,
    );
    console.log("Department operations results:", department_results);

    // --> Operations on jobs
    const operations_in_jobs: AnyBulkWriteOperation[] = [];
    if (jobs && jobs.length > 0) {
      for (const job of jobs) {
        // Validate job fields

        // Validate department_id is a valid MongoDB ObjectId with regex
        if (
          !job.department_id ||
          typeof job.department_id !== "string" ||
          !validMongoDBObjectId.test(job.department_id) ||
          !job.designation ||
          typeof job.designation !== "string" ||
          !job.experience ||
          typeof job.experience !== "string" ||
          !job.qualification ||
          typeof job.qualification !== "string" ||
          !job.job_description ||
          typeof job.job_description !== "string" ||
          !job.requirement ||
          typeof job.requirement !== "number"
        ) {
          // If any field is invalid, push an error message and skip to the next job
          problems.push(`Invalid job data: ${JSON.stringify(job)}`);
          continue; // Skip to the next job
        }
        const {
          department_id,
          designation,
          experience,
          qualification,
          job_description,
          requirement,
        } = job;
        // Check if the department exists
        const existingDepartment = await JobOpening.findById(department_id);
        if (!existingDepartment) {
          problems.push(
            `Department with ID "${department_id}" does not exist.`,
          );
          continue; // Skip to the next job
        }
        // Create a new job object
        const newJob: JobType = {
          designation,
          experience,
          qualification,
          job_description,
          requirement,
        };
        operations_in_jobs.push({
          updateOne: {
            filter: { _id: department_id },
            update: { $addToSet: { jobs: newJob } }, // Add job to the department's jobs array
          },
        });
      }
    }
    const job_results = await JobOpening.bulkWrite(operations_in_jobs);
    console.log("Job operations results:", job_results);
    // If there are any problems, return them
    if (problems.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some problems occurred while updating jobs and departments",
          problems,
          department_results,
          job_results,
        },
        { status: 400 },
      );
    }
    // If everything is successful, return the results
    return NextResponse.json(
      {
        success: true,
        message: "Jobs and departments updated successfully",
        department_results,
        job_results,
      },
      { status: 200 },
    );
  } catch (error) {
    handleError(error, "Error in editing jobs");
  }
}

export async function GET() {
  try {
    await dbConnect();
    const fetched_jobs = await JobOpening.find();
    console.log("Fetched jobs from database: ", fetched_jobs);
    return NextResponse.json(
      {
        success: true,
        message: "Jobs fetched successfully",
        departments: fetched_jobs,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    return handleError(error, "Failed to fetch jobs");
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      departments,
      jobs,
    }: {
      departments?: {
        id: string; // ID of the department to edit
        department_name?: string; // New Name of the department
        sequence?: number; // Sequence number for ordering
      }[];
      jobs?: {
        department_id: string; // ID of the department to which the job belongs
        job_id: string; // ID of the job to edit
        designation?: string;
        experience?: string;
        qualification?: string;
        job_description?: string;
        requirement?: number;
      }[];
    } = body;
    const problems: string[] = [];

    // --> Operations on jobs
    const operations_on_jobs: AnyBulkWriteOperation[] = [];
    if (jobs && jobs.length > 0) {
      for (const job of jobs) {
        // Validate ids are valid MongoDB ObjectIds with regex
        // if (
        //   !job.department_id ||
        //   typeof job.department_id !== "string" ||
        //   validMongoDBObjectId.test(job.department_id) ||
        //   !job.job_id ||
        //   typeof job.job_id !== "string" ||
        //   validMongoDBObjectId.test(job.job_id)
        // ) {
        //   problems.push(`Invalid job data: ${JSON.stringify(job)}`);
        //   continue; // Skip to the next job
        // }
        // Return more specific error messages for each field
        if (!job.department_id || typeof job.department_id !== "string") {
          problems.push(`Invalid department_id: ${job.department_id}`);
          continue; // Skip to the next job
        }
        if (!job.job_id || typeof job.job_id !== "string") {
          problems.push(`Invalid job_id: ${job.job_id}`);
          continue; // Skip to the next job
        }
        const {
          department_id,
          job_id,
          designation,
          experience,
          qualification,
          job_description,
          requirement,
        } = job;
        // Check if the department exists
        const existingDepartment = await JobOpening.findById(department_id);
        if (!existingDepartment) {
          problems.push(
            `Department with ID "${department_id}" does not exist.`,
          );
          continue; // Skip to the next job
        }

        operations_on_jobs.push({
          updateOne: {
            filter: { _id: department_id, "jobs._id": job_id },
            update: {
              $set: {
                // https://www.mongodb.com/docs/manual/reference/operator/update/positional/#std-label-positional-operator
                "jobs.$._id": job_id,
                "jobs.$.designation": designation,
                "jobs.$.experience": experience,
                "jobs.$.qualification": qualification,
                "jobs.$.job_description": job_description,
                "jobs.$.requirement": requirement,
              },
            },
          },
        });
      }
    }
    const job_results = await JobOpening.bulkWrite(operations_on_jobs);
    console.log("Job edit operations results:", job_results);

    // --> Operations on departments
    const operations_on_departments: AnyBulkWriteOperation[] = [];
    if (departments && departments.length > 0) {
      for (const department of departments) {
        // Validate department_name is a string and sequence is a number
        // if (
        //   !department.id ||
        //   typeof department.id !== "string" ||
        //   validMongoDBObjectId.test(department.id)
        // ) {
        //   problems.push(`Invalid department id: ${JSON.stringify(department)}`);
        //   continue; // Skip to the next department
        // }
        // Return more specific error messages for cause of failure
        if (
          !department.id
          //   ||
          //   typeof department.id !== "string" ||
          //   !validMongoDBObjectId.test(department.id)
        ) {
          problems.push(`Invalid department id: ${department.id}`);
          continue; // Skip to the next department
        }
        if (typeof department.id !== "string") {
          problems.push(`Invalid department id type: ${typeof department.id}`);
          continue; // Skip to the next department
        }
        if (!validMongoDBObjectId.test(department.id)) {
          problems.push(`Invalid department id format: ${department.id}`);
          continue; // Skip to the next department
        }

        if (
          (department.department_name &&
            typeof department.department_name !== "string") ||
          (department.sequence && typeof department.sequence !== "number")
        ) {
          problems.push(
            `Invalid department data: ${JSON.stringify(department)}`,
          );
          continue; // Skip to the next department
        }
        const { department_name, sequence } = department;
        // Check if the department exists
        const existingDepartment = await JobOpening.findOne({
          _id: department.id,
        });
        if (!existingDepartment) {
          problems.push(`Department "${department_name}" does not exist.`);
          continue; // Skip to the next department
        }
        // Prepare the update operation for the department

        const updatedDepartment: {
          department_name?: string; // New Name of the department
          sequence?: number; // Sequence number for ordering
        } = {};
        if (department_name) {
          updatedDepartment.department_name = department_name;
        }
        if (sequence) {
          updatedDepartment.sequence = sequence;
        }

        operations_on_departments.push({
          updateOne: {
            filter: { _id: existingDepartment._id },
            update: { $set: updatedDepartment },
          },
        });
      }
    }
    const department_results = await JobOpening.bulkWrite(
      operations_on_departments,
    );
    console.log("Department edit operations results:", department_results);

    // If there are any problems, return them
    if (problems.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some problems occurred while editing jobs",
          problems,
          job_results,
        },
        { status: 400 },
      );
    }
    // If everything is successful, return the results
    return NextResponse.json(
      {
        success: true,
        message: "Jobs edited successfully",
        job_results,
        department_results,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error editing jobs: ", error);
    return handleError(error, "Failed to edit jobs");
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      jobs_to_delete,
      departments_to_delete,
    }: {
      jobs_to_delete: {
        department_id: string; // ID of the department to which the job belongs
        job_id: string; // ID of the job to delete
      }[];
      departments_to_delete: {
        id: string; // ID of the department to delete
      }[];
    } = body;
    const problems: string[] = [];
    console.log("jobs_to_delete: ", jobs_to_delete);
    console.log("departments_to_delete: ", departments_to_delete);

    const operations_on_jobs: AnyBulkWriteOperation[] = [];
    if (jobs_to_delete && jobs_to_delete.length > 0) {
      for (const job of jobs_to_delete) {
        // Validate ids are valid MongoDB ObjectIds with regex
        if (
          !job.department_id ||
          typeof job.department_id !== "string" ||
          validMongoDBObjectId.test(job.department_id) ||
          !job.job_id ||
          typeof job.job_id !== "string" ||
          validMongoDBObjectId.test(job.job_id)
        ) {
          problems.push(`Invalid job data: ${JSON.stringify(job)}`);
          continue; // Skip to the next job
        }

        const { department_id, job_id } = job;
        console.log(
          `Deleting job with ID "${job_id}" from department "${department_id}"`,
        );
        // Check if the department exists
        const existingDepartment = await JobOpening.findById(department_id);
        if (!existingDepartment) {
          problems.push(
            `Department with ID "${department_id}" does not exist.`,
          );
          continue; // Skip to the next job
        }

        const existingJob = existingDepartment.jobs.find(
          (job) => job._id.toString() === job_id,
        );
        if (!existingJob) {
          problems.push(
            `Job with ID "${job_id}" does not exist in department "${department_id}".`,
          );
          continue; // Skip to the next job
        }

        operations_on_jobs.push({
          updateOne: {
            filter: { _id: department_id },
            update: { $pull: { jobs: { _id: job_id } } }, // Remove the job from the department's jobs array
          },
        });
      }
    }
    const job_results = await JobOpening.bulkWrite(operations_on_jobs);
    console.log("Job delete operations results:", job_results);

    // --> Operations on departments
    const operations_on_departments: AnyBulkWriteOperation[] = [];
    if (departments_to_delete && departments_to_delete.length > 0) {
      for (const department of departments_to_delete) {
        // Validate id is a valid MongoDB ObjectId with regex
        if (
          !department.id ||
          typeof department.id !== "string" ||
          !validMongoDBObjectId.test(department.id)
        ) {
          problems.push(
            `Invalid department data: ${JSON.stringify(department)}`,
          );
          continue; // Skip to the next department
        }
        const { id } = department;
        // Check if the department exists
        const existingDepartment = await JobOpening.findById(id);
        if (!existingDepartment) {
          problems.push(`Department with ID "${id}" does not exist.`);
          continue; // Skip to the next department
        }
        operations_on_departments.push({
          deleteOne: {
            filter: { _id: id },
          },
        });
      }
    }
    const department_results = await JobOpening.bulkWrite(
      operations_on_departments,
    );
    console.log("Department delete operations results:", department_results);

    // If there are any problems, return them
    if (problems.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some problems occurred while deleting jobs",
          problems,
          job_results,
          department_results,
        },
        { status: 400 },
      );
    }
    // If everything is successful, return the results
    return NextResponse.json(
      {
        success: true,
        message: "Jobs deleted successfully",
        job_results,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting jobs: ", error);
    return handleError(error, "Failed to delete jobs");
  }
}

/*
// Request body interfaces for /api/job_openings endpoints

// POST request - Create new departments and jobs
export interface PostJobOpeningsRequest {
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

// PUT request - Update existing departments and jobs
export interface PutJobOpeningsRequest {
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

// DELETE request - Delete departments and jobs
export interface DeleteJobOpeningsRequest {
  jobs_to_delete?: {
    department_id: string; // MongoDB ObjectId of the department
    job_id: string; // MongoDB ObjectId of the job to delete
  }[];
  departments_to_delete?: {
    id: string; // MongoDB ObjectId of the department to delete
  }[];
}

// Response interfaces for all methods
export interface JobOpeningsSuccessResponse {
  success: true;
  message: string;
  departments?: any; // For GET requests - contains fetched departments
  department_results?: any; // For POST/PUT/DELETE - MongoDB bulk operation results
  job_results?: any; // For POST/PUT/DELETE - MongoDB bulk operation results
}

export interface JobOpeningsErrorResponse {
  success: false;
  message: string;
  problems: string[]; // Array of error messages for failed operations
  department_results?: any; // Partial results if some operations succeeded
  job_results?: any; // Partial results if some operations succeeded
}

// GET request has no body - it returns all job openings
// GET /api/job_openings
// Returns: JobOpeningsSuccessResponse with departments array
*/
