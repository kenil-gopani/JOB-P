import Link from "next/link"
import { Search } from "lucide-react"
import JobCategories from "@/components/job-categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
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
            <Link href="/jobs" className="font-medium">
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

      <main className="flex-1">
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
              <span className="text-gray-800">
                <span className="font-medium text-red-600">No.1</span> Job Hunt Website
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Search Apply &{" "}
              <div className="md:inline">
                Get Your <span className="text-purple-600">Dream Job</span>
              </div>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-10">
              Start your hunt for the best, life-changing career opportunities from here in your selected areas
              conveniently and get hired quickly.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Input
                type="text"
                placeholder="Find Your Dream Job"
                className="w-full h-14 pl-4 pr-12 rounded-full shadow-md"
              />
              <Button
                className="absolute right-1 top-1 h-12 w-12 rounded-full bg-black hover:bg-gray-800"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <JobCategories />
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

