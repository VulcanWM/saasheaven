import Link from "next/link"
import { Button } from "@/components/ui/button"

// Mock data - same as directory
const mockProjects = [
  {
    id: "taskflow-ai",
    name: "TaskFlow AI",
    tagline: "AI-powered project management that nobody wanted",
    author: "Sarah Chen",
    authorBio: "Full-stack dev, 3rd failed startup, still optimistic",
    stack: ["Next.js", "OpenAI", "Postgres"],
    reason: "No market fit",
    peakMRR: 420,
    launchedDate: "Jan 2024",
    shutdownDate: "Aug 2024",
    totalRaised: 0,
    totalUsers: 127,
    githubUrl: "https://github.com/example/taskflow-ai",
    postMortem: {
      idea: "I was convinced project managers needed AI to organize their tasks. Turns out, they just needed simpler tools, not smarter ones. I spent 6 months building ML models when I should've been talking to users.",
      whatWentWrong:
        "Classic case of building for a problem I didn't have. I'm a developer who hates project management, so I assumed everyone else did too. Wrong. PMs actually like their tools. They don't want AI making decisions for them. By the time I realized this, I'd burned through my runway and had maybe 3 active users.",
      lessons: [
        "Talk to your target users BEFORE writing a single line of code",
        "If you're building a tool for a job you've never done, you're probably doing it wrong",
        "AI is not a feature. It's a tool. Use it when it makes sense, not because it's trendy",
        "Revenue is a better signal than sign-ups. We had 127 users, 3 paid",
      ],
      whatNext:
        "Taking a break from startups to work on my indie hacking skills. Next time, I'm validating with payments before building. Open-sourcing this so others can learn from my mistakes (and maybe repurpose the codebase).",
    },
  },
  {
    id: "devops-dashboard",
    name: "DevOps Dashboard",
    tagline: "Kubernetes monitoring for teams that just used Heroku",
    author: "Marcus Liu",
    authorBio: "DevOps engineer turned failed founder",
    stack: ["React", "Node.js", "MongoDB"],
    reason: "Wrong target audience",
    peakMRR: 1200,
    launchedDate: "Mar 2023",
    shutdownDate: "Dec 2023",
    totalRaised: 0,
    totalUsers: 89,
    githubUrl: "https://github.com/example/devops-dashboard",
    postMortem: {
      idea: "Build a beautiful, simple Kubernetes monitoring dashboard for small teams. Make it so easy that non-DevOps people could use it.",
      whatWentWrong:
        "I targeted the wrong audience. Small teams don't use Kubernetes - they use Heroku, Vercel, or Railway because they DON'T want to deal with infrastructure. The teams that do use K8s? They have DevOps engineers who already use Datadog or Grafana and aren't switching. I was solving a problem for a market segment that essentially doesn't exist.",
      lessons: [
        "Market size matters. I was targeting maybe 100 companies worldwide",
        "If you're simplifying something complex, make sure people want the complex thing first",
        "Competition from free tools (Grafana) is brutal",
        "Actually got to $1.2K MRR which felt good until I realized it would take 10 years to be sustainable",
      ],
      whatNext:
        "Back to being a DevOps engineer. Learned a ton about building SaaS infrastructure though. The monitoring pipeline I built is solid - might be useful to someone.",
    },
  },
]

export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    slug: project.id,
  }))
}

export default async function PostMortemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = mockProjects.find((p) => p.id === slug)

  if (!project) {
    return (
      <main className="min-h-screen bg-white text-black">
        {/* Header */}
        <div className="border-b-2 border-black p-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
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

      <div className="max-w-5xl mx-auto p-6 lg:p-12">
        {/* Back Link */}
        <Link
          href="/post-mortems"
          className="inline-block mb-8 text-sm font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          ← BACK TO GRAVEYARD
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <div className="border-4 border-black p-8">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">{project.name}</h1>
            <p className="text-xl lg:text-2xl mb-8">{project.tagline}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="border-2 border-black p-4">
                <div className="text-xs font-bold mb-1">PEAK MRR</div>
                <div className="text-2xl font-bold">${project.peakMRR.toLocaleString()}</div>
              </div>
              <div className="border-2 border-black p-4">
                <div className="text-xs font-bold mb-1">TOTAL USERS</div>
                <div className="text-2xl font-bold">{project.totalUsers}</div>
              </div>
              <div className="border-2 border-black p-4">
                <div className="text-xs font-bold mb-1">RAISED</div>
                <div className="text-2xl font-bold">${project.totalRaised.toLocaleString()}</div>
              </div>
              <div className="border-2 border-black p-4">
                <div className="text-xs font-bold mb-1">DURATION</div>
                <div className="text-sm font-bold">
                  {project.launchedDate}
                  <br />→ {project.shutdownDate}
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="space-y-4 text-sm border-t-2 border-black pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-bold min-w-32">AUTHOR</span>
                <span>
                  {project.author} — {project.authorBio}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-bold min-w-32">REASON FOR DEATH</span>
                <span>{project.reason}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-start gap-2">
                <span className="font-bold min-w-32">TECH STACK</span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2 py-1 border-2 border-black text-xs font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-bold min-w-32">SOURCE CODE</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:bg-black hover:text-white px-1 transition-colors"
                >
                  {project.githubUrl}
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
            <p className="text-lg leading-relaxed">{project.postMortem.idea}</p>
          </section>

          {/* What Went Wrong */}
          <section>
            <h2 className="text-3xl font-bold mb-4 pb-2 border-b-4 border-black">WHAT WENT WRONG</h2>
            <p className="text-lg leading-relaxed whitespace-pre-line">{project.postMortem.whatWentWrong}</p>
          </section>

          {/* Lessons Learned */}
          <section>
            <h2 className="text-3xl font-bold mb-4 pb-2 border-b-4 border-black">LESSONS LEARNED</h2>
            <div className="space-y-4">
              {project.postMortem.lessons.map((lesson, index) => (
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
            <p className="text-lg leading-relaxed">{project.postMortem.whatNext}</p>
          </section>

          {/* CTA Box */}
          <div className="border-4 border-black p-8 bg-black text-white">
            <h3 className="text-2xl font-bold mb-4">LEARN FROM THIS FAILURE</h3>
            <p className="mb-6">
              Fork the code, read through the mistakes, and build something better. That's what this is all about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
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
    </main>
  )
}
