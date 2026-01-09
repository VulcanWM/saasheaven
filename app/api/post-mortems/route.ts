import { NextResponse } from "next/server"
import { getAllPostMortemsData } from "@/lib/github"

export async function GET() {
    const data = await getAllPostMortemsData()

    return NextResponse.json(
        {
            updated_at: new Date().toISOString(),
            count: data.length,
            post_mortems: data,
        },
        {
            headers: {
                "cache-control": "public, max-age=300",
            },
        }
    )
}