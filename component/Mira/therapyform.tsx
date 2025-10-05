"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { redirect} from "next/navigation" 

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import { createTherapy } from "@/lib/action/therapist.action"

// --- Constants for Onboarding ---
const VOICE_OPTIONS = {
    male: "Male",
    female: "Female",
} as const;

const STYLE_OPTIONS = {
    formal: "Formal", 
    casual: "Casual",
} as const;

const PRONOUN_OPTIONS = [
    "She/Her",
    "He/Him",
    "They/Them",
    "Prefer not to say"
]

// --- Schema (Unchanged) ---
const formSchema = z.object({
    preferredName: z.string().min(1, { message: "Your preferred name is required." }),
    pronouns: z.string().optional(),
    voice: z.enum(Object.keys(VOICE_OPTIONS) as [keyof typeof VOICE_OPTIONS, ...Array<keyof typeof VOICE_OPTIONS>]),
    style: z.enum(Object.keys(STYLE_OPTIONS) as [keyof typeof STYLE_OPTIONS, ...Array<keyof typeof STYLE_OPTIONS>]),
    struggle: z.string().min(10, { message: "Please briefly describe what you're struggling with (min 10 characters)." }),
    goal: z.string().min(10, { message: "Please state your main goal (min 10 characters)." }),
})

// --- Component ---
const UserForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            preferredName: "",
            pronouns: "",
            voice: "female", 
            style: "casual", 
            struggle: "", 
            goal: "", 
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createTherapy(values)

    if (companion) {
      redirect(`/Haven/${companion.id}`)
    } else {
      console.error("Failed to create a companion")
      redirect("/")
    }
  }

    return (
        <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

    {/* Preferred Name */}
    <FormField
      control={form.control}
      name="preferredName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Preferred Name *</FormLabel>
          <FormControl>
            <Input placeholder="e.g., Alex" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Pronouns */}
    <FormField
      control={form.control}
      name="pronouns"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pronouns</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select pronouns" />
              </SelectTrigger>
              <SelectContent>
                {PRONOUN_OPTIONS.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Voice */}
    <FormField
      control={form.control}
      name="voice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Voice Type *</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Style */}
    <FormField
      control={form.control}
      name="style"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Communication Style *</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Struggle */}
    <FormField
      control={form.control}
      name="struggle"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What are you currently struggling with? *</FormLabel>
          <FormControl>
            <Textarea
              placeholder="E.g., I often feel overwhelmed by work deadlines..."
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Goal */}
    <FormField
      control={form.control}
      name="goal"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your main goal with Mira? *</FormLabel>
          <FormControl>
            <Textarea
              placeholder="E.g., Build better time management habits..."
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Submit Button */}
    <Button type="submit" className="w-full cursor-pointer">
      Create My Mira Companion
    </Button>
  </form>
</Form>

    )
}

export default UserForm
