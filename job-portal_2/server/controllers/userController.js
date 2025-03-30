import User from "../models/User.js"
import jwt from "jsonwebtoken"

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })

    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone
      user.location = req.body.location || user.location
      user.skills = req.body.skills || user.skills

      // Only update password if provided
      if (req.body.password) {
        user.password = req.body.password
      }

      // Update experience if provided
      if (req.body.experience) {
        user.experience = req.body.experience
      }

      // Update education if provided
      if (req.body.education) {
        user.education = req.body.education
      }

      // Update resume if provided
      if (req.body.resume) {
        user.resume = req.body.resume
      }

      // Check if profile is complete
      user.profileComplete = Boolean(
        user.firstName &&
          user.lastName &&
          user.email &&
          user.phone &&
          user.location &&
          user.skills &&
          user.skills.length > 0 &&
          (user.role === "jobseeker" ? user.resume : true),
      )

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        location: updatedUser.location,
        skills: updatedUser.skills,
        experience: updatedUser.experience,
        education: updatedUser.education,
        resume: updatedUser.resume,
        profileComplete: updatedUser.profileComplete,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export default {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
}

