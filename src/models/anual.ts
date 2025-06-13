import mongoose from "mongoose";

const AnualReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  anual_Report: { type: String, required: true },
});

// ✅ Safe model export (avoid OverwriteModelError)
const AnualReport = mongoose.models['Anual-Report'] || mongoose.model('Anual-Report', AnualReportSchema);

export default AnualReport;
