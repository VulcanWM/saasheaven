import { NextResponse } from "next/server"
import { getPostMortemData } from "@/lib/github"

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params  // await here

    const data = await getPostMortemData(slug)

    if (!data) {
        return NextResponse.json({ error: "not found" }, { status: 404 })
    }

    return NextResponse.json(data, {
        headers: {
            "cache-control": "public, max-age=300",
        },
    })
}
