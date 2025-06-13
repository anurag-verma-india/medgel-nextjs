import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  policy_Report: { type: String, required: true },
});

// ✅ Safe model export (avoid OverwriteModelError)
// ✅ Correct: match key name to schema name
const Policy = mongoose.models['Policy'] || mongoose.model('Policy', PolicySchema);
export default Policy;
