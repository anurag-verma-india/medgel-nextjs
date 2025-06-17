import mongoose from "mongoose";

const ApplySchema = new mongoose.Schema({
  deptid: { type: String, required: true },
  designation: { type: String, required: true },
  experience: { type: String, required: true },
  qualification: { type: String, required: true },
  jobdesc: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobilenumber: { type: Number, required: true },
  resume: { type: String, required: true },
});

// ✅ Safe model export (avoid OverwriteModelError)
const Apply = mongoose.models['Apply'] || mongoose.model('Apply', ApplySchema);

export default Apply;
