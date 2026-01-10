import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllPostMortemSlugs, getPostMortemData } from "@/lib/github"
import { SiGithub } from "react-icons/si";

export async function generateStaticParams() {
    const slugs = await getAllPostMortemSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export default async function PostMortemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await getPostMortemData(slug)

    if (!project) {
        return (
            <main className="min-h-screen bg-white text-black">
                {/* Header */}
                <div className="border-b-2 border-black p-6">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors">
                            SAAS HEAVEN
                        </Link>
                        <Link href="https://github.com/VulcanWM/saasheaven" target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-2 border-black font-mono text-xs font-bold uppercase bg-transparent"
                            >
                                <SiGithub className="mr-2 h-4 w-4" />
                                GITHUB
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto p-6 lg:p-12">
                    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                        <div className="border-4 border-black p-12 max-w-2xl">
                            <h1 className="text-6xl lg:text-8xl font-bold mb-6">404</h1>
                            <h2 className="text-3xl font-bold mb-4">PROJECT NOT FOUND</h2>
                            <p className="text-lg mb-8 leading-relaxed">
                                This post-mortem doesn't exist. Maybe it failed so hard it never made it to the graveyard.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/post-mortems">
                                    <Button className="bg-black text-white hover:bg-gray-800 font-bold h-12 px-8">
                                        BROWSE ALL FAILURES
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        className="border-2 border-black hover:bg-black hover:text-white font-bold h-12 px-8 bg-transparent"
                                    >
                                        GO HOME
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <div className="border-b-2 border-black p-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors">
                        SAAS HEAVEN
                    </Link>
                    <Link href="https://github.com/VulcanWM/saasheaven" target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-2 border-black font-mono text-xs font-bold uppercase bg-transparent"
                        >
                            <SiGithub className="mr-2 h-4 w-4" />
                            GITHUB
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 lg:p-12">
                {/* Back Link */}
                <Link
                    href="/post-mortems"
                    className="inline-block mb-8 text-sm font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors"
                >
                    ← BACK TO GRAVEYARD
                </Link>

                {/* Grid layout for main content and sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Project Header */}
                        <div className="mb-12">
                            <div className="border-4 border-black p-8">
                                <h1 className="text-5xl lg:text-6xl font-bold mb-4">{project.name}</h1>
                                <p className="text-xl lg:text-2xl mb-8">{project.tagline}</p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="border-2 border-black p-4">
                                        <div className="text-xs font-bold mb-1">PEAK MRR</div>
                                        <div className="text-2xl font-bold">${project.snapshot.peak_mrr.toLocaleString()}</div>
                                    </div>
                                    <div className="border-2 border-black p-4">
                                        <div className="text-xs font-bold mb-1">TOTAL USERS</div>
                                        <div className="text-2xl font-bold">{project.snapshot.total_users}</div>
                                    </div>
                                    <div className="border-2 border-black p-4">
                                        <div className="text-xs font-bold mb-1">RAISED</div>
                                        <div className="text-2xl font-bold">${project.snapshot.raised.toLocaleString()}</div>
                                    </div>
                                    <div className="border-2 border-black p-4">
                                        <div className="text-xs font-bold mb-1">DURATION</div>
                                        <div className="text-sm font-bold">
                                            {project.snapshot.duration.start}
                                            <br />→ {project.snapshot.duration.end}
                                        </div>
                                    </div>
                                </div>

                                {/* Meta Info */}
                                <div className="space-y-4 text-sm border-t-2 border-black pt-6">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                                        <span className="font-bold min-w-32">AUTHOR</span>
                                        <span>
                      {project.author.name} — {project.author.bio}
                    </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                                        <span className="font-bold min-w-32">REASON FOR DEATH</span>
                                        <span>{project.death.reason}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-2">
                                        <span className="font-bold min-w-32">TECH STACK</span>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech_stack.map((tech) => (
                                                <span key={tech} className="px-2 py-1 border-2 border-black text-xs font-bold">
                          {tech}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                                        <span className="font-bold min-w-32">SOURCE CODE</span>
                                        <a
                                            href={project.links.source_code}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:bg-black hover:text-white px-1 transition-colors"
                                        >
                                            {project.links.source_code}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post Mortem Content */}
                        <div className="space-y-12">
                            {/* The Idea */}
                            <section>
                                <h2 className="text-3xl font-bold mb-4 pb-2 border-b-4 border-black">THE IDEA</h2>
                                <p className="text-lg leading-relaxed">{project.story.idea}</p>
                            </section>

                            {/* What Went Wrong */}
                            <section>
                                <h2 className="text-3xl font-bold mb-4 pb-2 border-b-4 border-black">WHAT WENT WRONG</h2>
                                <p className="text-lg leading-relaxed whitespace-pre-line">{project.story.what_went_wrong}</p>
                            </section>

                            {/* Lessons Learned */}
                            <section>
                                <h2 className="text-3xl font-bold mb-4 pb-2 border-b-4 border-black">LESSONS LEARNED</h2>
                                <div className="space-y-4">
                                    {project.story.lessons_learned.map((lesson, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="text-2xl font-bold min-w-12">{String(index + 1).padStart(2, "0")}</div>
                                            <p className="text-lg leading-relaxed pt-1">{lesson}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* What's Next */}
                            <section>
                                <h2 className="text-3xl font-bold mb-4 pb-2 border-b-4 border-black">WHAT'S NEXT</h2>
                                <p className="text-lg leading-relaxed">{project.story.whats_next}</p>
                            </section>

                            {/* CTA Box */}
                            <div className="border-4 border-black p-8 bg-black text-white">
                                <h3 className="text-2xl font-bold mb-4">LEARN FROM THIS FAILURE</h3>
                                <p className="mb-6">
                                    Fork the code, read through the mistakes, and build something better. That's what this is all about.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href={project.links.source_code} target="_blank" rel="noopener noreferrer" className="flex-1">
                                        <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12">
                                            VIEW SOURCE CODE
                                        </Button>
                                    </a>
                                    <Link href="/post-mortems" className="flex-1">
                                        <Button
                                            variant="outline"
                                            className="w-full border-2 border-white hover:bg-white hover:text-black font-bold h-12 bg-transparent text-white"
                                        >
                                            BROWSE MORE FAILURES
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar with ad slot call-to-action */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-6">
                            <div className="border-4 border-black p-6 bg-white">
                                <div className="text-xs font-bold mb-2 text-gray-600">AD SPACE AVAILABLE</div>
                                <h3 className="text-2xl font-bold mb-4">Your ad here?</h3>
                                <p className="text-sm leading-relaxed mb-6">
                                    Want to reach builders learning from real failures? Submit your ad through a pull request.
                                </p>
                                <a
                                    href="https://github.com/VulcanWM/saasheaven"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button className="w-full bg-black text-white hover:bg-gray-800 font-bold">
                                        MAKE A PULL REQUEST
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}