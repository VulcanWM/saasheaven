"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { PostMortemData } from "@/lib/github"

interface PostMortemsClientProps {
    postMortemsData: PostMortemData[]
}

export default function PostMortemsClient({ postMortemsData }: PostMortemsClientProps) {
    const [selectedStacks, setSelectedStacks] = useState<string[]>([])
    const [selectedReasons, setSelectedReasons] = useState<string[]>([])
    const [mrrFilter, setMrrFilter] = useState<string>("all")

    // Extract unique stacks and reasons
    const allStacks = useMemo(() => {
        return Array.from(new Set(postMortemsData.flatMap((p) => p.tech_stack))).sort()
    }, [postMortemsData])

    const allReasons = useMemo(() => {
        return Array.from(new Set(postMortemsData.map((p) => p.death.reason))).sort()
    }, [postMortemsData])

    const toggleStack = (stack: string) => {
        setSelectedStacks((prev) => (prev.includes(stack) ? prev.filter((s) => s !== stack) : [...prev, stack]))
    }

    const toggleReason = (reason: string) => {
        setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))
    }

    const filteredProjects = useMemo(() => {
        return postMortemsData.filter((project) => {
            // Stack filter
            if (selectedStacks.length > 0 && !selectedStacks.some((stack) => project.tech_stack.includes(stack))) {
                return false
            }

            // Reason filter
            if (selectedReasons.length > 0 && !selectedReasons.includes(project.death.reason)) {
                return false
            }

            // MRR filter
            const mrr = project.snapshot.peak_mrr
            if (mrrFilter === "0-500" && mrr > 500) return false
            if (mrrFilter === "500-2000" && (mrr < 500 || mrr > 2000)) return false
            if (mrrFilter === "2000+" && mrr < 2000) return false

            return true
        })
    }, [postMortemsData, selectedStacks, selectedReasons, mrrFilter])

    const clearFilters = () => {
        setSelectedStacks([])
        setSelectedReasons([])
        setMrrFilter("all")
    }

    const hasActiveFilters = selectedStacks.length > 0 || selectedReasons.length > 0 || mrrFilter !== "all"

    return (
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
                                key={project.slug}
                                className={`border-b-2 border-black hover:bg-black hover:text-white transition-colors group ${
                                    index === filteredProjects.length - 1 ? "border-b-0" : ""
                                }`}
                            >
                                <td className="p-4">
                                    <Link href={`/post-mortems/${project.slug}`} className="block">
                                        <div className="font-bold text-lg mb-1">{project.name}</div>
                                        <div className="text-sm opacity-80">{project.tagline}</div>
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <Link href={`/post-mortems/${project.slug}`} className="block">
                                        {project.author.name}
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <Link href={`/post-mortems/${project.slug}`} className="block">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tech_stack.slice(0, 2).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 border border-black text-xs font-bold group-hover:border-white group-hover:bg-white group-hover:text-black"
                                                >
                            {tech}
                          </span>
                                            ))}
                                            {project.tech_stack.length > 2 && (
                                                <span className="px-2 py-1 text-xs font-bold">+{project.tech_stack.length - 2}</span>
                                            )}
                                        </div>
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <Link href={`/post-mortems/${project.slug}`} className="block">
                                        {project.death.reason}
                                    </Link>
                                </td>
                                <td className="p-4 text-right">
                                    <Link href={`/post-mortems/${project.slug}`} className="block font-bold">
                                        ${project.snapshot.peak_mrr.toLocaleString()}
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <Link href={`/post-mortems/${project.slug}`} className="block text-sm">
                                        {project.snapshot.duration.start}
                                        <br />→ {project.snapshot.duration.end}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
