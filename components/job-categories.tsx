"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: 1,
    name: "Frontend Developer",
    count: 120,
  },
  {
    id: 2,
    name: "Backend Developer",
    count: 85,
  },
  {
    id: 3,
    name: "Full Stack Developer",
    count: 67,
  },
  {
    id: 4,
    name: "UI/UX Designer",
    count: 45,
  },
  {
    id: 5,
    name: "Data Scientist",
    count: 38,
  },
  {
    id: 6,
    name: "DevOps Engineer",
    count: 29,
  },
]

export default function JobCategories() {
  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 3

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(categories.length - itemsToShow, prev + 1))
  }

  const visibleCategories = categories.slice(startIndex, startIndex + itemsToShow)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">Categories</h3>
          <p className="text-gray-600">Explore our extensive job market.</p>
        </div>

        <div className="flex items-center justify-center">
          <Button variant="outline" size="icon" className="mr-4" onClick={handlePrev} disabled={startIndex === 0}>
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h4 className="font-bold text-lg">{category.name}</h4>
                <p className="text-gray-500 text-sm mt-1">{category.count} jobs available</p>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="ml-4"
            onClick={handleNext}
            disabled={startIndex >= categories.length - itemsToShow}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

