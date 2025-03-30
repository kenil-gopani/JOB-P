import mongoose from "mongoose"

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Company description is required"],
  },
  logo: {
    type: String, // URL to logo image
  },
  website: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Company location is required"],
    trim: true,
  },
  headquarters: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
    trim: true,
  },
  companySize: {
    type: String,
    enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"],
  },
  foundedYear: {
    type: Number,
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String,
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  jobCount: {
    type: Number,
    default: 0,
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
companySchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Index for search
companySchema.index({
  name: "text",
  description: "text",
  industry: "text",
  location: "text",
})

const Company = mongoose.model("Company", companySchema)

export default Company

