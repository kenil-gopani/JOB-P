import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RegisterPage() {
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

      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
            <p className="text-gray-600 mt-2">Join our job portal today</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <RadioGroup defaultValue="jobseeker" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jobseeker" id="jobseeker" />
                  <Label htmlFor="jobseeker">Job Seeker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employer" id="employer" />
                  <Label htmlFor="employer">Employer</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="First Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Last Name" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded text-purple-600" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Sign in
              </Link>
            </p>
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

