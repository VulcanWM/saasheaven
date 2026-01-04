"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EnterPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock sending magic link
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const handleGoogleSignIn = () => {
    // Mock Google sign in
    console.log("Google sign in clicked")
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="border-b-2 border-black p-6">
        <Link href="/" className="text-2xl font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors">
          SAAS HEAVEN
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-6">
        <div className="w-full max-w-md">
          <div className="border-4 border-black p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">ENTER</h1>
              <p className="text-lg">Learn from the graveyard</p>
            </div>

            <div className="space-y-6">
              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-12 border-2 border-black hover:bg-black hover:text-white text-base font-bold bg-transparent"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                CONTINUE WITH GOOGLE
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-black"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 font-bold">OR</span>
                </div>
              </div>

              {/* Magic Link */}
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    EMAIL ADDRESS
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="border-2 border-black h-12 focus:ring-0 focus:border-black"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-black text-white hover:bg-black/90 text-base font-bold"
                  disabled={sent}
                >
                  {sent ? "MAGIC LINK SENT ✓" : "SEND MAGIC LINK"}
                </Button>
              </form>

              {sent && (
                <div className="border-2 border-black p-4 bg-black text-white">
                  <p className="text-sm font-bold">Check your email for a link to sign in</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t-2 border-black">
              <p className="text-sm">
                By continuing, you agree to learn from failures and contribute to the collective knowledge of what
                doesn't work.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-bold underline hover:no-underline">
              ← BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
