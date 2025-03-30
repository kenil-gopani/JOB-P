import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Company is required"],
  },
  location: {
    type: String,
    required: [true, "Job location is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Job type is required"],
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
  },
  category: {
    type: String,
    required: [true, "Job category is required"],
    trim: true,
  },
  salary: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    currency: {
      type: String,
      default: "INR",
    },
    displaySalary: {
      type: Boolean,
      default: true,
    },
  },
  skills: {
    type: [String],
    required: [true, "At least one skill is required"],
  },
  experience: {
    min: {
      type: Number,
      required: [true, "Minimum experience is required"],
    },
    max: {
      type: Number,
    },
  },
  education: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "closed", "draft"],
    default: "active",
  },
  applicationCount: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

// Index for search
jobSchema.index({
  title: "text",
  description: "text",
  skills: "text",
  location: "text",
})

// Pre-save middleware to update the updatedAt field
jobSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Virtual for salary range display
jobSchema.virtual("salaryDisplay").get(function () {
  if (!this.salary.displaySalary) return "Not disclosed"

  if (this.salary.min && this.salary.max) {
    return `${this.salary.currency} ${this.salary.min} - ${this.salary.max} LPA`
  } else if (this.salary.min) {
    return `${this.salary.currency} ${this.salary.min}+ LPA`
  } else if (this.salary.max) {
    return `Up to ${this.salary.currency} ${this.salary.max} LPA`
  }

  return "Not disclosed"
})

// Virtual for experience range display
jobSchema.virtual("experienceDisplay").get(function () {
  if (this.experience.min && this.experience.max) {
    return `${this.experience.min} - ${this.experience.max} years`
  } else if (this.experience.min) {
    return `${this.experience.min}+ years`
  }

  return "No experience required"
})

const Job = mongoose.model("Job", jobSchema)

export default Job

