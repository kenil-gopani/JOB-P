import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: [true, "Job reference is required"],
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Applicant reference is required"],
  },
  resume: {
    type: String, // URL to resume file
    required: [true, "Resume is required"],
  },
  coverLetter: {
    type: String,
  },
  answers: [
    {
      question: String,
      answer: String,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "reviewed", "rejected", "shortlisted", "interviewed", "offered", "hired"],
    default: "pending",
  },
  employerNotes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Pre-save middleware to update the updatedAt field
applicationSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Compound index to ensure a user can only apply once to a job
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true })

const Application = mongoose.model("Application", applicationSchema)

export default Application

