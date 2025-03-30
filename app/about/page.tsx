import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Building2, Users, Award, Clock } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/about" className="font-medium font-bold text-purple-600">
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
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Job Portal</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              India's leading job portal connecting talented professionals with top companies across the country. Our
              mission is to simplify the job search process and help people find their dream careers.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                <p className="text-gray-600 mb-4">
                  Founded in 2020, Job Portal was created with a simple mission: to transform how people find jobs and
                  how companies hire talent in India.
                </p>
                <p className="text-gray-600 mb-4">
                  We recognized the challenges faced by both job seekers and employers in the Indian market and built a
                  platform that addresses these unique needs.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to be one of India's fastest-growing job platforms, serving thousands of companies
                  and millions of job seekers across the country.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Team working together"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-12">Why Choose Us</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-bold mb-2">10,000+ Companies</h4>
                <p className="text-gray-600 text-sm">Partner with top companies across India</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-bold mb-2">Millions of Users</h4>
                <p className="text-gray-600 text-sm">Trusted by job seekers nationwide</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-bold mb-2">Quality Listings</h4>
                <p className="text-gray-600 text-sm">Verified and high-quality job opportunities</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-bold mb-2">Fast Hiring</h4>
                <p className="text-gray-600 text-sm">Streamlined process for quick results</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-6">Join Our Community</h3>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              Whether you're looking for your next career move or searching for top talent, Job Portal is here to help
              you succeed in the Indian job market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700">Find Jobs</Button>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                For Employers
              </Button>
            </div>
          </div>
        </section>
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

