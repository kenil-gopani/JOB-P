import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Briefcase, IndianRupee } from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    salary: "₹18-25 LPA",
    type: "Full-time",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "InnovateX Solutions",
    location: "Hyderabad, Telangana",
    salary: "₹15-22 LPA",
    type: "Full-time",
    posted: "1 week ago",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Digital Dynamics",
    location: "Pune, Maharashtra",
    salary: "₹20-28 LPA",
    type: "Full-time",
    posted: "3 days ago",
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "CreativeMinds Tech",
    location: "Mumbai, Maharashtra",
    salary: "₹12-18 LPA",
    type: "Full-time",
    posted: "5 days ago",
    skills: ["Figma", "Adobe XD", "UI Design"],
  },
]

export default function JobsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-purple-600">Job</span> <span className="text-orange-500">Portal</span>
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/browse" className="font-medium">
              Browse
            </Link>
            <Link href="/jobs" className="font-medium font-bold text-purple-600">
              Jobs
            </Link>
            <Link href="/about" className="font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="font-medium">
              Login
            </Link>
            <Button className="bg-red-600 hover:bg-red-700">Register</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Find Your Dream Job</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Job title, keywords, or company" />
              </div>
              <div className="flex-1">
                <Input placeholder="Location" />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Search className="h-4 w-4 mr-2" /> Search Jobs
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-gray-700 mt-1">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col items-end">
                    <span className="text-gray-500 text-sm mb-2">Posted {job.posted}</span>
                    <Button className="bg-purple-600 hover:bg-purple-700">Apply Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-gray-600">
        <div className="container mx-auto px-4">
          <p>© 2024 Job Portal. All rights reserved.</p>
          <p className="mt-2">Powered by Next.js</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

