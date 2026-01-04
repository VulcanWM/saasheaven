import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import Link from "next/link"
import { getAllPostMortemsData } from "@/lib/github"

export default async function Page() {
    const allProjects = await getAllPostMortemsData()
    const recentProjects = allProjects.slice(0, 6)

    const totalMRR = allProjects.reduce((sum, p) => sum + (p.snapshot.peak_mrr || 0), 0)

    return (
        <div className="min-h-screen bg-white text-black">
            <header className="border-b-4 border-black bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-start justify-between">
                        <Link href="/">
                            <div>
                                <h1 className="font-mono text-2xl font-bold uppercase leading-none tracking-tight">
                                    SAAS
                                    <br />
                                    HEAVEN
                                </h1>
                                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-neutral-600">EST. 2026</p>
                            </div>
                        </Link>
                        <Link href="https://github.com/VulcanWM/saasheaven" target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-2 border-black font-mono text-xs font-bold uppercase bg-transparent"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GITHUB
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="border-b-4 border-black bg-white">
                <div className="container mx-auto px-4 py-20 md:py-32">
                    <div className="mb-12 border-l-8 border-black pl-6">
                        <div className="mb-4 inline-block border-2 border-black bg-yellow-300 px-3 py-1">
                            <span className="font-mono text-xs font-bold uppercase tracking-wide">LEARN FROM WHAT DIDN'T WORK</span>
                        </div>
                    </div>

                    <h2 className="mb-8 max-w-5xl font-sans text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl">
                        FAILED
                        <br />
                        SAAS
                        <br />
                        PROJECTS,
                        <br />
                        <span className="inline-block border-8 border-black bg-black px-4 text-white">NOW</span>
                        <br />
                        OPEN SOURCE
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="border-4 border-black bg-white p-6">
                            <p className="mb-4 font-mono text-sm leading-relaxed">
                                Real founders. Real failures. Real code. Indie makers share their projects that didn't make it—with
                                honest post-mortems and full source code so you can learn from their mistakes.
                            </p>
                            <Link href="/post-mortems">
                                <Button
                                    size="lg"
                                    className="h-14 w-full border-2 border-black bg-black font-mono text-sm font-bold uppercase text-white hover:bg-neutral-900"
                                >
                                    READ POST-MORTEMS
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="border-4 border-black bg-black p-6 text-white">
                            <div className="mb-2 font-mono text-5xl font-bold">{allProjects.length}</div>
                            <div className="font-mono text-xs uppercase tracking-wider">Failed Projects Shared</div>
                        </div>

                        <div className="border-4 border-black bg-neutral-100 p-6">
                            <div className="mb-2 font-mono text-5xl font-bold">${(totalMRR / 1000).toFixed(1)}K</div>
                            <div className="font-mono text-xs uppercase tracking-wider">Total Peak MRR</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b-4 border-black bg-neutral-50">
                <div className="container mx-auto px-4 py-20">
                    <div className="mb-12 flex items-end justify-between border-b-4 border-black pb-4">
                        <h3 className="font-sans text-5xl font-black uppercase tracking-tighter md:text-6xl">
                            RECENT
                            <br />
                            FAILURES
                        </h3>
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
              {allProjects.length} PROJECTS
            </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="mb-4 grid grid-cols-12 gap-4 border-b-2 border-black pb-2 font-mono text-xs font-bold uppercase tracking-wider">
                            <div className="col-span-3">Project</div>
                            <div className="col-span-2">Founder</div>
                            <div className="col-span-2">Reason</div>
                            <div className="col-span-2">Peak MRR</div>
                            <div className="col-span-3">Tech Stack</div>
                        </div>

                        {recentProjects.map((project) => (
                            <Link key={project.slug} href={`/post-mortems/${project.slug}`}>
                                <div className="group grid grid-cols-12 gap-4 border-b border-black py-6 transition-colors hover:bg-yellow-300 cursor-pointer">
                                    <div className="col-span-3">
                                        <h4 className="font-sans text-2xl font-bold uppercase leading-tight tracking-tight">
                                            {project.name}
                                        </h4>
                                    </div>
                                    <div className="col-span-2 flex items-center font-mono text-sm">{project.author.name}</div>
                                    <div className="col-span-2 flex items-center">
                    <span className="border-2 border-black bg-red-400 px-2 py-1 font-mono text-xs font-bold uppercase">
                      {project.death.reason}
                    </span>
                                    </div>
                                    <div className="col-span-2 flex items-center font-mono text-sm font-bold">
                                        ${project.snapshot.peak_mrr}
                                    </div>
                                    <div className="col-span-3 flex items-center font-mono text-sm">
                                        {project.tech_stack.slice(0, 2).join(", ")}
                                        {project.tech_stack.length > 2 && ` +${project.tech_stack.length - 2}`}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile card view */}
                    <div className="space-y-4 md:hidden">
                        {recentProjects.map((project) => (
                            <Link key={project.slug} href={`/post-mortems/${project.slug}`}>
                                <div className="border-4 border-black bg-white p-4 cursor-pointer hover:bg-yellow-300 transition-colors">
                                    <div className="mb-3 flex items-start justify-between">
                                        <h4 className="font-sans text-xl font-bold uppercase leading-tight tracking-tight">
                                            {project.name}
                                        </h4>
                                        <span className="border-2 border-black bg-red-400 px-2 py-1 font-mono text-xs font-bold uppercase whitespace-nowrap ml-2">
                      {project.death.reason}
                    </span>
                                    </div>
                                    <div className="mb-3 font-mono text-xs">
                                        <div className="text-neutral-600">BY</div>
                                        <div className="font-bold">{project.author.name}</div>
                                    </div>
                                    <div className="flex gap-4 font-mono text-xs">
                                        <div>
                                            <div className="text-neutral-600">PEAK MRR</div>
                                            <div className="font-bold">${project.snapshot.peak_mrr}</div>
                                        </div>
                                        <div>
                                            <div className="text-neutral-600">STACK</div>
                                            <div className="font-bold">
                                                {project.tech_stack.slice(0, 2).join(", ")}
                                                {project.tech_stack.length > 2 && ` +${project.tech_stack.length - 2}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b-4 border-black bg-white">
                <div className="container mx-auto px-4 py-20">
                    <h3 className="mb-16 border-l-8 border-black pl-6 font-sans text-5xl font-black uppercase tracking-tighter md:text-7xl">
                        HOW IT
                        <br />
                        WORKS
                    </h3>

                    <div className="space-y-8">
                        {[
                            {
                                number: "01",
                                title: "SUBMIT A PULL REQUEST",
                                description:
                                    "Fork the GitHub repo, add your project folder with data.json containing your post-mortem, and submit a PR. We'll review and merge it to share your story with the community.",
                            },
                            {
                                number: "02",
                                title: "OPEN SOURCE THE CODE",
                                description:
                                    "Include your GitHub repo link in the submission. Share the full source code so others can learn from both the implementation and the mistakes.",
                            },
                            {
                                number: "03",
                                title: "COMMUNITY LEARNS",
                                description:
                                    "Other founders read your post-mortem, study the code, and learn valuable lessons without making the same mistakes you did.",
                            },
                        ].map((step) => (
                            <div key={step.number} className="border-4 border-black bg-neutral-50 p-8 md:p-12">
                                <div className="grid gap-8 md:grid-cols-12">
                                    <div className="md:col-span-3">
                                        <div className="inline-block border-4 border-black bg-black px-6 py-2">
                                            <span className="font-mono text-5xl font-bold text-white md:text-6xl">{step.number}</span>
                                        </div>
                                    </div>
                                    <div className="md:col-span-9">
                                        <h4 className="mb-4 font-sans text-3xl font-black uppercase tracking-tight md:text-4xl">
                                            {step.title}
                                        </h4>
                                        <p className="max-w-2xl font-mono text-base leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-black text-white">
                <div className="container mx-auto px-4 py-32">
                    <div className="mx-auto max-w-4xl text-center">
                        <h3 className="mb-8 font-sans text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl">
                            FAILED?
                            <br />
                            <span className="inline-block bg-yellow-300 px-4 text-black">SHARE IT</span>
                        </h3>
                        <p className="mx-auto mb-12 max-w-2xl font-mono text-base leading-relaxed text-neutral-300">
                            Your failure is someone else's lesson. Submit a pull request with your post-mortem, open source your code,
                            and help the next generation of indie makers avoid your mistakes.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="https://github.com/VulcanWM/saasheaven"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    size="lg"
                                    className="h-16 w-full border-4 border-white bg-white px-8 font-mono text-base font-bold uppercase text-black hover:bg-neutral-200"
                                >
                                    SUBMIT PULL REQUEST
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/post-mortems" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-16 w-full border-4 border-white bg-black px-8 font-mono text-base font-bold uppercase text-white hover:bg-neutral-900"
                                >
                                    <Github className="mr-2 h-5 w-5" />
                                    BROWSE PROJECTS
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t-4 border-black bg-neutral-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-12 grid gap-8 border-b-2 border-black pb-12 md:grid-cols-4">
                        <div>
                            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider">PROJECTS</h4>
                            <ul className="space-y-2 font-mono text-sm">
                                <li>
                                    <Link href="/post-mortems" className="underline hover:no-underline">
                                        Browse All
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider">COMMUNITY</h4>
                            <ul className="space-y-2 font-mono text-sm">
                                <li>
                                    <Link
                                        href="https://github.com/VulcanWM/saasheaven"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:no-underline"
                                    >
                                        GitHub
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/VulcanWM/saasheaven"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:no-underline"
                                    >
                                        Submit Project
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider">ABOUT</h4>
                            <ul className="space-y-2 font-mono text-sm">
                                <li>
                                    <Link
                                        href="https://github.com/VulcanWM/saasheaven#readme"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:no-underline"
                                    >
                                        Our Mission
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider">SAAS HEAVEN</h4>
                            <p className="font-mono text-sm leading-relaxed">
                                Where failed SaaS projects become valuable lessons for the indie maker community.
                            </p>
                        </div>
                    </div>
                    <div className="text-center font-mono text-xs uppercase tracking-wider text-neutral-600">
                        © 2026 SAAS HEAVEN · LEARN FROM FAILURE
                    </div>
                </div>
            </footer>
        </div>
    )
}