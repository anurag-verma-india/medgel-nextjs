import mongoose from "mongoose";

const AwardsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

// ✅ Safe model export (avoid OverwriteModelError)
const Award = mongoose.models.Award || mongoose.model("Award", AwardsSchema);

export default Award;
