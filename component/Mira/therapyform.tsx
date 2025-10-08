"use client"

import React, { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription, // Added FormDescription (though we'll use <p> for consistency)
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createUserProfile } from "@/lib/action/therapist.action"

// --- Constants ---
const VOICE_OPTIONS = {
  male: "Male",
  female: "Female",
} as const

const STYLE_OPTIONS = {
  formal: "Formal",
  casual: "Casual",
} as const

const PRONOUN_OPTIONS = [
  "She/Her",
  "He/Him",
  "They/Them",
  "Prefer not to say",
]

// --- Schema (cleaner) ---
const formSchema = z.object({
  preferred_name: z.string().min(1, { message: "Your preferred name is required." }),
  pronouns: z.string().optional(),
  voice: z.enum(["male", "female"]),
  style: z.enum(["formal", "casual"]),
  struggle: z.string().min(10, { message: "Please briefly describe what you're struggling with (min 10 characters)." }),
  goal: z.string().min(10, { message: "Please state your main goal (min 10 characters)." }),
})

type FormValues = z.infer<typeof formSchema>

export default function ImprovedUserForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferred_name: "",
      pronouns: "",
      voice: "female",
      style: "casual",
      struggle: "",
      goal: "",
    },
  })

  const { watch } = form
  const struggleValue = watch("struggle") || ""
  const goalValue = watch("goal") || ""

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    setIsSubmitting(true)
    try {
      // createTherapy should be an API/client-call that returns the created companion
      const companion = await createUserProfile(values)

      if (companion && companion.id) {
        // client-side navigation
        router.push(`/Haven/${companion.id}`)
      } else {
        setServerError("Failed to create a companion. Please try again.")
      }
    } catch (err) {
      console.error(err)
      setServerError("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="rounded-2xl bg-white/60 p-6 shadow-md backdrop-blur-md dark:bg-slate-900/60">
        <h2 className="mb-2 text-2xl font-semibold">Create your Mira companion</h2>
        <p className="mb-6 text-sm text-muted-foreground">Quick onboarding — tell Mira a little about you so she can respond better.</p>

        {serverError && (
          <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Preferred Name - FIXED FOR ALIGNMENT */}
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  {/* Keep label simple, move description below for consistent spacing */}
                  <FormLabel>Preferred Name *</FormLabel>
                  <FormControl>
                    <Input aria-required value={field.value} onChange={field.onChange} placeholder="e.g., Alex" />
                  </FormControl>
                  <p className="mt-1 text-xs text-muted-foreground">How Mira will call you</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pronouns - FIXED FOR ALIGNMENT */}
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger aria-label="Select pronouns">
                        <SelectValue placeholder="Select pronouns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prefer_not_to_disclose">Prefer not to disclose</SelectItem>
                        {PRONOUN_OPTIONS.map((p) => ( 
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {/* Standardize the description to match the spacing of the Preferred Name field */}
                  <p className="mt-1 text-xs text-muted-foreground">Optional — helps Mira use correct pronouns.</p> 
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Voice (md:col-span-1 removed as it's the default behavior) */}
            <div>
              <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice Type *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger aria-label="Select voice">
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(VOICE_OPTIONS).map((key) => (
                            <SelectItem key={key} value={key}>
                              {VOICE_OPTIONS[key as keyof typeof VOICE_OPTIONS]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Style (md:col-span-1 removed as it's the default behavior) */}
            <div>
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Communication Style *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger aria-label="Select style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(STYLE_OPTIONS).map((key) => (
                            <SelectItem key={key} value={key}>
                              {STYLE_OPTIONS[key as keyof typeof STYLE_OPTIONS]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Struggle (span full width) */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="struggle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you currently struggling with? *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="E.g., I often feel overwhelmed by work deadlines..."
                        className="min-h-[120px] resize-vertical"
                        maxLength={800}
                        aria-required
                      />
                    </FormControl>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <FormMessage />
                      <div>{struggleValue.length}/800</div>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Goal (span full width) */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your main goal with Mira? *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="E.g., Build better time management habits..."
                        className="min-h-[120px] resize-vertical"
                        maxLength={500}
                        aria-required
                      />
                    </FormControl>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <FormMessage />
                      <div>{goalValue.length}/500</div>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <Button 
              type="submit" 
              className="w-full border border-blue-600 bg-white text-gray-900 hover:bg-blue-50" 
              disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="3" stroke="currentColor" strokeOpacity="0.25"></circle>
                      <path d="M22 12A10 10 0 0012 2" strokeWidth="3" stroke="currentColor"></path>
                    </svg>
                    Creating your companion...
                  </span>
                ) : (
                  "Create My Mira Companion"
                )}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  )
}