import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NewsletterAd() {
    return (
        <div className="border-4 border-black bg-gradient-to-br from-yellow-300 to-yellow-400 p-6">
            <div className="mb-2 inline-block border-2 border-black bg-white px-2 py-1">
                <span className="font-mono text-xs font-bold uppercase">NEWSLETTER</span>
            </div>
            <h4 className="mb-3 font-sans text-2xl font-black uppercase leading-tight tracking-tight">100K BEFORE UNI</h4>
            <p className="mb-4 font-mono text-sm leading-relaxed">
                Follow my weekly journey as I work towards hitting £100k before university starts. Raw updates, real progress,
                no lies.
            </p>
            <Link
                href="https://100k-before-uni.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-2 border-black bg-black px-4 py-2 font-mono text-sm font-bold uppercase text-white transition-colors hover:bg-neutral-800"
            >
                READ UPDATES
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
    )
}
