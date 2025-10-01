import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    // 1. Recreate the full-page gradient background used in your MiraExercises component.
    // This gives the SignIn box a proper context.
    <div className="min-h-screen text-slate-900 relative">
      
      {/* Background Gradient (Linear) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-cyan-50 to-indigo-50"></div>
      
      {/* Background Gradient (Radial Overlay for depth) */}
      <div className="absolute inset-0 z-10 opacity-30 bg-[radial-gradient(circle_500px_at_50%_200px,#A5F3FC,transparent),radial-gradient(circle_500px_at_50%_800px,#93C5FD,transparent)]"></div>
      
      {/* 2. Center the content both horizontally (justify-center) and 
           vertically (items-center) within the container. 
        3. Use a padding of py-20 to ensure it doesn't hug the very top/bottom edge 
           on smaller screens, but still centers well.
      */}
      <main className='flex items-center justify-center min-h-screen w-full relative z-20 py-20'>
        {/* Optional: You can add appearance props to SignIn to customize the colors 
          of the buttons, links, etc., to match the cyan/blue theme exactly if needed.
        */}
        <SignIn 
            // Optional styling to make it fully centered and slightly responsive
            path="/sign-in" 
            routing="path"
            signUpUrl="/sign-up"
        />
      </main>
    </div>
  )
}