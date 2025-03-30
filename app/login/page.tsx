import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
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
            <Link href="/login" className="font-medium font-bold text-purple-600">
              Login
            </Link>
            <Button className="bg-red-600 hover:bg-red-700">Register</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-600 hover:underline">
                Sign up
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

