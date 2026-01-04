"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Mock data for post-mortems
const mockProjects = [
  {
    id: "taskflow-ai",
    name: "TaskFlow AI",
    tagline: "AI-powered project management that nobody wanted",
    author: "Sarah Chen",
    stack: ["Next.js", "OpenAI", "Postgres"],
    reason: "No market fit",
    peakMRR: 420,
    launchedDate: "Jan 2024",
    shutdownDate: "Aug 2024",
    totalRaised: 0,
  },
  {
    id: "devops-dashboard",
    name: "DevOps Dashboard",
    tagline: "Kubernetes monitoring for teams that just used Heroku",
    author: "Marcus Liu",
    stack: ["React", "Node.js", "MongoDB"],
    reason: "Wrong target audience",
    peakMRR: 1200,
    launchedDate: "Mar 2023",
    shutdownDate: "Dec 2023",
    totalRaised: 0,
  },
  {
    id: "social-scheduler",
    name: "Social Scheduler Pro",
    tagline: "Yet another social media scheduler in a saturated market",
    author: "Alex Rivera",
    stack: ["Vue.js", "Firebase", "Stripe"],
    reason: "Too much competition",
    peakMRR: 890,
    launchedDate: "Jun 2023",
    shutdownDate: "Mar 2024",
    totalRaised: 5000,
  },
  {
    id: "email-cleaner",
    name: "Email Cleaner",
    tagline: "Unsubscribe from emails (turned out Gmail already does this)",
    author: "Jordan Kim",
    stack: ["Python", "Flask", "Redis"],
    reason: "Feature already exists",
    peakMRR: 150,
    launchedDate: "Sep 2023",
    shutdownDate: "Jan 2024",
    totalRaised: 0,
  },
  {
    id: "code-review-bot",
    name: "Code Review Bot",
    tagline: "Automated code reviews that developers actively avoided",
    author: "Taylor Wong",
    stack: ["TypeScript", "OpenAI", "Postgres"],
    reason: "Poor user experience",
    peakMRR: 2100,
    launchedDate: "Feb 2023",
    shutdownDate: "Nov 2023",
    totalRaised: 10000,
  },
  {
    id: "freelance-invoicing",
    name: "Freelance Invoicing",
    tagline: "Invoicing tool built while ignoring Invoice Ninja exists",
    author: "Cameron Parks",
    stack: ["Next.js", "Supabase", "Stripe"],
    reason: "Better alternatives exist",
    peakMRR: 680,
    launchedDate: "May 2023",
    shutdownDate: "Feb 2024",
    totalRaised: 0,
  },
  {
    id: "fitness-tracker",
    name: "Fitness Tracker+",
    tagline: "Track your workouts (and watch as users stop after 2 weeks)",
    author: "Morgan Lee",
    stack: ["React Native", "Firebase", "Stripe"],
    reason: "Low retention",
    peakMRR: 340,
    launchedDate: "Jan 2024",
    shutdownDate: "Jul 2024",
    totalRaised: 0,
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes AI",
    tagline: "AI meeting notes before we realized Zoom already added this",
    author: "Riley Scott",
    stack: ["Next.js", "OpenAI", "MongoDB"],
    reason: "Platform added feature",
    peakMRR: 3400,
    launchedDate: "Aug 2022",
    shutdownDate: "Jun 2023",
    totalRaised: 15000,
  },
]

const allStacks = Array.from(new Set(mockProjects.flatMap((p) => p.stack))).sort()
const allReasons = Array.from(new Set(mockProjects.map((p) => p.reason))).sort()

export default function PostMortemsPage() {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([])
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [mrrFilter, setMrrFilter] = useState<string>("all")

  const toggleStack = (stack: string) => {
    setSelectedStacks((prev) => (prev.includes(stack) ? prev.filter((s) => s !== stack) : [...prev, stack]))
  }

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))
  }

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Stack filter
      if (selectedStacks.length > 0 && !selectedStacks.some((stack) => project.stack.includes(stack))) {
        return false
      }

      // Reason filter
      if (selectedReasons.length > 0 && !selectedReasons.includes(project.reason)) {
        return false
      }

      // MRR filter
      if (mrrFilter === "0-500" && project.peakMRR > 500) return false
      if (mrrFilter === "500-2000" && (project.peakMRR < 500 || project.peakMRR > 2000)) return false
      if (mrrFilter === "2000+" && project.peakMRR < 2000) return false

      return true
    })
  }, [selectedStacks, selectedReasons, mrrFilter])

  const clearFilters = () => {
    setSelectedStacks([])
    setSelectedReasons([])
    setMrrFilter("all")
  }

  const hasActiveFilters = selectedStacks.length > 0 || selectedReasons.length > 0 || mrrFilter !== "all"

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b-2 border-black p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors">
            SAAS HEAVEN
          </Link>
          <Link href="/enter">
            <Button
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white font-bold bg-transparent"
            >
              SIGN IN
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-6xl lg:text-7xl font-bold mb-4">THE GRAVEYARD</h1>
          <p className="text-xl lg:text-2xl max-w-3xl">
            {filteredProjects.length} failed projects. Real stories. Open source code. Lessons learned the hard way.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 border-4 border-black p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">FILTERS</h2>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="ghost" className="font-bold hover:bg-black hover:text-white">
                CLEAR ALL
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Stack Filter */}
            <div>
              <h3 className="text-sm font-bold mb-3">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {allStacks.map((stack) => (
                  <button
                    key={stack}
                    onClick={() => toggleStack(stack)}
                    className={`px-4 py-2 border-2 border-black font-bold text-sm transition-colors ${
                      selectedStacks.includes(stack) ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {stack}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason Filter */}
            <div>
              <h3 className="text-sm font-bold mb-3">REASON FOR FAILURE</h3>
              <div className="flex flex-wrap gap-2">
                {allReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => toggleReason(reason)}
                    className={`px-4 py-2 border-2 border-black font-bold text-sm transition-colors ${
                      selectedReasons.includes(reason) ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            {/* MRR Filter */}
            <div>
              <h3 className="text-sm font-bold mb-3">PEAK MRR (USD)</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "ALL", value: "all" },
                  { label: "$0 - $500", value: "0-500" },
                  { label: "$500 - $2K", value: "500-2000" },
                  { label: "$2K+", value: "2000+" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMrrFilter(option.value)}
                    className={`px-4 py-2 border-2 border-black font-bold text-sm transition-colors ${
                      mrrFilter === option.value ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        {filteredProjects.length === 0 ? (
          <div className="border-4 border-black p-12 text-center">
            <p className="text-2xl font-bold mb-2">NO PROJECTS FOUND</p>
            <p className="text-lg">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="border-4 border-black overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-4 border-black">
                  <th className="text-left p-4 font-bold text-sm">PROJECT</th>
                  <th className="text-left p-4 font-bold text-sm">AUTHOR</th>
                  <th className="text-left p-4 font-bold text-sm">STACK</th>
                  <th className="text-left p-4 font-bold text-sm">REASON</th>
                  <th className="text-right p-4 font-bold text-sm">PEAK MRR</th>
                  <th className="text-left p-4 font-bold text-sm">DURATION</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`border-b-2 border-black hover:bg-black hover:text-white transition-colors group ${
                      index === filteredProjects.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="p-4">
                      <Link href={`/post-mortems/${project.id}`} className="block">
                        <div className="font-bold text-lg mb-1">{project.name}</div>
                        <div className="text-sm opacity-80">{project.tagline}</div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link href={`/post-mortems/${project.id}`} className="block">
                        {project.author}
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link href={`/post-mortems/${project.id}`} className="block">
                        <div className="flex flex-wrap gap-1">
                          {project.stack.slice(0, 2).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 border border-black text-xs font-bold group-hover:border-white group-hover:bg-white group-hover:text-black"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 2 && (
                            <span className="px-2 py-1 text-xs font-bold">+{project.stack.length - 2}</span>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link href={`/post-mortems/${project.id}`} className="block">
                        {project.reason}
                      </Link>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/post-mortems/${project.id}`} className="block font-bold">
                        ${project.peakMRR.toLocaleString()}
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link href={`/post-mortems/${project.id}`} className="block text-sm">
                        {project.launchedDate}
                        <br />→ {project.shutdownDate}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
