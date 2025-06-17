import mongoose from "mongoose";

const ConatctUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

// ✅ Safe model export (avoid OverwriteModelError)
const ContactUs = mongoose.models['ContactUs'] || mongoose.model('ContactUs', ConatctUsSchema);

export default ContactUs;
