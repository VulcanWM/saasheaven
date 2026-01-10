import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllPostMortemsData } from "@/lib/github"
import PostMortemsClient from "./post-mortems-client"
import {SiGithub} from "react-icons/si";

export default async function PostMortemsPage() {
    const postMortemsData = await getAllPostMortemsData()

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <div className="border-b-2 border-black p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
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

            {/* Pass data to client component for filtering */}
            <PostMortemsClient postMortemsData={postMortemsData} />
        </main>
    )
}