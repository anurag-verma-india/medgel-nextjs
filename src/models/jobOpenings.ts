// src/models/jobOpenings.ts

import mongoose from "mongoose";

const JobObj = new mongoose.Schema({
  designation: String,
  experience: String,
  qualification: String,
  job_description: String,
  requirement: Number,
  other: Object,
});

const job_opening = new mongoose.Schema({
  department_name: String,
  sequence: Number,
  jobs: [JobObj],
  other: Object,
});

const JobOpening =
  mongoose.models.job_opening || mongoose.model("job_opening", job_opening);

export default JobOpening;
