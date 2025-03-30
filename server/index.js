import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Define Schemas
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobseeker", "employer"], required: true },
  createdAt: { type: Date, default: Date.now },
})

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  website: String,
  logo: String,
  industry: String,
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  location: { type: String, required: true },
  type: { type: String, required: true }, // Full-time, Part-time, Contract, etc.
  salary: String,
  skills: [String],
  experience: String,
  education: String,
  deadline: Date,
  createdAt: { type: Date, default: Date.now },
})

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resume: { type: String, required: true },
  coverLetter: String,
  status: { type: String, enum: ["pending", "reviewed", "rejected", "shortlisted", "hired"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
})

// Create Models
const User = mongoose.model("User", userSchema)
const Company = mongoose.model("Company", companySchema)
const Job = mongoose.model("Job", jobSchema)
const Application = mongoose.model("Application", applicationSchema)

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error()
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." })
  }
}

// Routes

// User Registration
app.post("/api/users/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    })

    await user.save()

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// User Login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get User Profile
app.get("/api/users/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.json(user)
  } catch (error) {
    console.error("Profile error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Company Routes
app.post("/api/companies", auth, async (req, res) => {
  try {
    // Check if user is an employer
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can create companies" })
    }

    const { name, description, location, website, industry } = req.body

    const company = new Company({
      name,
      description,
      location,
      website,
      industry,
      employerId: req.user._id,
    })

    await company.save()
    res.status(201).json(company)
  } catch (error) {
    console.error("Company creation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.find()
    res.json(companies)
  } catch (error) {
    console.error("Get companies error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Job Routes
app.post("/api/jobs", auth, async (req, res) => {
  try {
    // Check if user is an employer
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" })
    }

    const { title, description, companyId, location, type, salary, skills, experience, education, deadline } = req.body

    // Check if company exists and belongs to the employer
    const company = await Company.findOne({
      _id: companyId,
      employerId: req.user._id,
    })

    if (!company) {
      return res.status(404).json({ message: "Company not found or not authorized" })
    }

    const job = new Job({
      title,
      description,
      company: companyId,
      location,
      type,
      salary,
      skills: skills.split(",").map((skill) => skill.trim()),
      experience,
      education,
      deadline: new Date(deadline),
    })

    await job.save()
    res.status(201).json(job)
  } catch (error) {
    console.error("Job creation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all jobs with filters
app.get("/api/jobs", async (req, res) => {
  try {
    const { title, location, type, company, skills, minSalary } = req.query

    const filter = {}

    if (title) filter.title = { $regex: title, $options: "i" }
    if (location) filter.location = { $regex: location, $options: "i" }
    if (type) filter.type = type
    if (company) filter.company = company
    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim())
      filter.skills = { $in: skillsArray }
    }
    if (minSalary) {
      // This is simplified - in a real app you'd need to handle salary ranges better
      filter.salary = { $gte: minSalary }
    }

    const jobs = await Job.find(filter).populate("company", "name location").sort({ createdAt: -1 })

    res.json(jobs)
  } catch (error) {
    console.error("Get jobs error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company", "name description location website industry")

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    res.json(job)
  } catch (error) {
    console.error("Get job error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Application Routes
app.post("/api/applications", auth, async (req, res) => {
  try {
    // Check if user is a job seeker
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only job seekers can apply for jobs" })
    }

    const { jobId, resume, coverLetter } = req.body

    // Check if job exists
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    })

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" })
    }

    const application = new Application({
      job: jobId,
      applicant: req.user._id,
      resume,
      coverLetter,
    })

    await application.save()
    res.status(201).json(application)
  } catch (error) {
    console.error("Application creation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get applications for a job (for employers)
app.get("/api/jobs/:jobId/applications", auth, async (req, res) => {
  try {
    // Check if user is an employer
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can view applications" })
    }

    const jobId = req.params.jobId

    // Check if job exists and belongs to the employer
    const job = await Job.findById(jobId).populate("company")

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    // Check if the job belongs to the employer
    const company = await Company.findOne({
      _id: job.company._id,
      employerId: req.user._id,
    })

    if (!company) {
      return res.status(403).json({ message: "Not authorized to view these applications" })
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "firstName lastName email")
      .sort({ createdAt: -1 })

    res.json(applications)
  } catch (error) {
    console.error("Get applications error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get my applications (for job seekers)
app.get("/api/applications/me", auth, async (req, res) => {
  try {
    // Check if user is a job seeker
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only job seekers can view their applications" })
    }

    const applications = await Application.find({ applicant: req.user._id })
      .populate({
        path: "job",
        populate: { path: "company", select: "name" },
      })
      .sort({ createdAt: -1 })

    res.json(applications)
  } catch (error) {
    console.error("Get my applications error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update application status (for employers)
app.patch("/api/applications/:id/status", auth, async (req, res) => {
  try {
    // Check if user is an employer
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can update application status" })
    }

    const { status } = req.body
    const applicationId = req.params.id

    // Find application
    const application = await Application.findById(applicationId).populate({
      path: "job",
      populate: { path: "company" },
    })

    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }

    // Check if the job belongs to the employer
    const company = await Company.findOne({
      _id: application.job.company._id,
      employerId: req.user._id,
    })

    if (!company) {
      return res.status(403).json({ message: "Not authorized to update this application" })
    }

    application.status = status
    await application.save()

    res.json(application)
  } catch (error) {
    console.error("Update application status error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Example of how to use this server:
console.log(`
To use this server:
1. Create a .env file with:
   - MONGODB_URI=your_mongodb_connection_string
   - JWT_SECRET=your_jwt_secret_key
   - PORT=5000 (optional)

2. Start the server with: npm start

3. API Endpoints:
   - POST /api/users/register - Register a new user
   - POST /api/users/login - Login
   - GET /api/users/profile - Get user profile (auth required)
   - POST /api/companies - Create a company (employer only)
   - GET /api/companies - Get all companies
   - POST /api/jobs - Create a job (employer only)
   - GET /api/jobs - Get all jobs (with filters)
   - GET /api/jobs/:id - Get job by ID
   - POST /api/applications - Apply for a job (jobseeker only)
   - GET /api/jobs/:jobId/applications - Get applications for a job (employer only)
   - GET /api/applications/me - Get my applications (jobseeker only)
   - PATCH /api/applications/:id/status - Update application status (employer only)
`)

