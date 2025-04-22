import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  file: String,

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const applicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default applicationModel;
