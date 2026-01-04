// GitHub repository details
const GITHUB_OWNER = "VulcanWM"
const GITHUB_REPO = "saasheaven"
const GITHUB_BRANCH = "master"
const POST_MORTEMS_PATH = "post-mortems"

// Type for the data.json structure
export interface PostMortemData {
    slug: string
    name: string
    tagline: string
    snapshot: {
        peak_mrr: number
        total_users: number
        raised: number
        duration: {
            start: string
            end: string
        }
    }
    author: {
        name: string
        bio: string
    }
    death: {
        reason: string
    }
    tech_stack: string[]
    links: {
        source_code: string
    }
    story: {
        idea: string
        what_went_wrong: string
        lessons_learned: string[]
        whats_next: string
    }
}

// Fetch all post-mortem slugs from GitHub
export async function getAllPostMortemSlugs(): Promise<string[]> {
    try {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${POST_MORTEMS_PATH}?ref=${GITHUB_BRANCH}`

        const response = await fetch(url, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 300 }, // Cache for 5 minutes
        })

        if (!response.ok) {
            console.error("Failed to fetch post-mortem directories:", response.status)
            return []
        }

        const contents = await response.json()

        // Filter for directories only
        const slugs = contents.filter((item: any) => item.type === "dir").map((item: any) => item.name)

        return slugs
    } catch (error) {
        console.error("Error fetching post-mortem slugs:", error)
        return []
    }
}

// Fetch a single post-mortem data.json file
export async function getPostMortemData(slug: string): Promise<PostMortemData | null> {
    try {
        const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${POST_MORTEMS_PATH}/${slug}/data.json`

        const response = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        })

        if (!response.ok) {
            console.error("Failed to fetch post-mortem data for slug:", slug, response.status)
            return null
        }

        const text = await response.text()
        // Remove trailing commas before closing brackets/braces
        const cleanedText = text.replace(/,(\s*[\]}])/g, "$1")
        const data = JSON.parse(cleanedText)
        return data
    } catch (error) {
        console.error("Error fetching post-mortem data for slug:", slug, error)
        return null
    }
}

// Fetch all post-mortems data
export async function getAllPostMortemsData(): Promise<PostMortemData[]> {
    const slugs = await getAllPostMortemSlugs()

    // Fetch all data.json files in parallel
    const dataPromises = slugs.map((slug) => getPostMortemData(slug))
    const allData = await Promise.all(dataPromises)

    // Filter out null values (failed fetches)
    return allData.filter((data): data is PostMortemData => data !== null)
}
