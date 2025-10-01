"use client"; // Required for using CSS animations

import React from 'react';

const AboutPage = () => {
    return (
        // The outermost container now handles the relative positioning for the full-page gradients
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            
            {/* NEW: AMBIENT ANIMATED GRADIENT CONTAINER */}
            {/* This container sits at z-0, spanning the whole viewport, providing the color flow */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Blob 1: Warm Tones (Requires 'animate-color-flow' in global.css) */}
                <div 
                    className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full 
                               bg-gradient-to-tr from-orange-200/50 via-pink-300/50 to-rose-400/50 
                               blur-[100px] opacity-60 animate-color-flow" 
                    style={{ animationDuration: '25s' }}
                ></div>

                {/* Blob 2: Cool Tones (Requires 'animate-color-flow' in global.css, reversed direction) */}
                <div 
                    className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full 
                               bg-gradient-to-bl from-blue-300/50 via-indigo-300/50 to-purple-400/50 
                               blur-[100px] opacity-60 animate-color-flow"
                    style={{ animationDuration: '35s', animationDirection: 'reverse' }}
                ></div>
            </div>
            
            {/* Content Wrapper: Set to z-10 to sit above the animated gradients */}
            <div className="layout-container relative z-10 flex h-full grow flex-col">
                {/* Header */}
             
                {/* Main Content */}
                <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
                    
                    <div className="w-full max-w-5xl space-y-16">
                        {/* Hero Section */}
                        <section className="relative min-h-[480px] flex flex-col items-center justify-center text-center p-8 rounded-xl overflow-hidden">
                            
                            {/* Original Gradient Effect code (Duplicate) - Kept as requested */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 w-[30rem] h-[30rem] bg-gradient-to-tr from-orange-200 via-pink-200 to-rose-300 opacity-40 blur-3xl rounded-full"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 w-[30rem] h-[30rem] bg-gradient-to-bl from-blue-200 via-indigo-200 to-purple-300 opacity-40 blur-3xl rounded-full"></div>

                            {/* Original Background Image and Overlay (Kept as requested) */}
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWrjx8bM8ml33y9N1wAWfS93on4PUNER1qEMl0TSZLke6njAUgOyPPKIyyAhqVhtfoGeGs1c-MICZ4vqmyyc8MQZNFTyX1uhY7VHCuZfYg0d-V-4d7Dg66W06gFlr_6F-SHx10kABru36yIdqpSuFY9NM3PupafMbe8eouBObAZADUkx0L2ff0P3SI1j-BK3ZU02PFsR2DVI1p2jm8DntVhpFIEyG3KAKDxdXaSUhit0rQDlu8SB15CRv4Sy1j8FUNtLcHBVJ2czE")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20"></div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-white">The Future of Emotional Well-being</h1>
                                <p className="text-base md:text-lg text-white/90">
                                    At Mira, we're pioneering a new era of mental health support. By harnessing the power of AI and voice analysis, we provide personalized insights and guidance to help you understand and manage your emotional landscape.
                                </p>
                                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90">
                                    <span className="truncate">Start Your Journey</span>
                                </button>
                            </div>
                        </section>

                        {/* How Mira Works */}
                        <section className="space-y-8">
                            {/* Original Gradient Effect code (Duplicate) - Kept as requested */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 w-[30rem] h-[30rem] bg-gradient-to-tr from-orange-200 via-pink-200 to-rose-300 opacity-40 blur-3xl rounded-full"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 w-[30rem] h-[30rem] bg-gradient-to-bl from-blue-200 via-indigo-200 to-purple-300 opacity-40 blur-3xl rounded-full"></div>
                            
                            <h2 className="text-3xl font-bold text-center">How Mira Works</h2>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-background-light dark:bg-subtle-dark/50 rounded-xl backdrop-blur-lg border border-subtle-light/50 dark:border-subtle-dark/50 shadow-lg">
                                <div className="flex flex-col gap-4 flex-1">
                                    <h3 className="text-xl font-bold text-primary">AI Voice Analysis</h3>
                                    <p className="text-muted-light dark:text-muted-dark">
                                        Mira uses advanced AI algorithms to analyze subtle nuances in your voice, identifying patterns and indicators related to your emotional state. This analysis is combined with established therapeutic frameworks to provide personalized insights and support.
                                    </p>
                                </div>
                                {/* Original Background Image (Kept as requested) */}
                                <div className="w-full md:w-1/2 flex-1 aspect-video bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCoBzxmIR8zEvcAcRE7vm3GiVg0_-oCH3gSGcq7iXhFL8psmd1uiwcDm48e0fsn5cK9kYgdLqbsL6ucU0nFNsr3lgWLKinjo-4J_lyEy4gh5zbNsw5wWAPQkc6MZb4Z_cAAVWozzFj7CJvlrnnyR0hGoTLYAEjlNKFt2w_TCYZJ-GC1alLuznxMUjWJQvDZsDjju41vTNHNj6Lny5TJCyBYPYLP617IYGGgZfolRsFXHgsa5kZbTnV9TVbZo_7gW4TZs1mRRKSlS4")' }}></div>
                            </div>
                        </section>

                        {/* Values Section: RESTORED CONTENT */}
                        <section className="space-y-8">
                            <h2 className="text-3xl font-bold text-center">Values That Guide Us</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Card 1: Empathy (Original content) */}
                                <div className="flex flex-col gap-4 p-6 bg-background-light dark:bg-subtle-dark/50 rounded-xl backdrop-blur-lg border border-subtle-light/50 dark:border-subtle-dark/50 shadow-lg">
                                    <div className="text-primary w-10 h-10">
                                        <svg fill="currentColor" height="100%" viewBox="0 0 256 256" width="100%" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M128,216S28,160,28,92a52,52,0,0,1,52-52,51.48,51.48,0,0,1,48,27.15A51.48,51.48,0,0,1,176,40a52,52,0,0,1,52,52C228,160,128,216,128,216Zm0-184a36,36,0,0,0-36,36c0,32.51,71.27,93.22,72,94,0,0,0,0,0,0,.74-.79,72-61.5,72-94A36,36,0,0,0,128,32Z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold">Empathy</h3>
                                        <p className="text-sm text-muted-light dark:text-muted-dark">We approach every interaction with compassion and understanding, creating a safe space for your emotional journey.</p>
                                    </div>
                                </div>
                                
                                {/* Card 2: Community (RESTORED content) */}
                                <div className="flex flex-col gap-4 p-6 bg-background-light dark:bg-subtle-dark/50 rounded-xl backdrop-blur-lg border border-subtle-light/50 dark:border-subtle-dark/50 shadow-lg">
                                    <div className="text-primary w-10 h-10">
                                        <svg fill="currentColor" height="100%" viewBox="0 0 256 256" width="100%" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M240,108a32,32,0,1,1-42.33-29.83,32.33,32.33,0,0,1,10.33,2.83,8,8,0,1,0,5.88-14.93,48.24,48.24,0,0,0-15.88-4.22,48,48,0,1,0,0,96,48.24,48.24,0,0,0,15.88-4.22,8,8,0,1,0-5.88-14.93,32.33,32.33,0,0,1-10.33,2.83A32,32,0,0,1,240,108ZM128,72a40,40,0,1,0,40,40A40,40,0,0,0,128,72Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,136Zm-8.3-101.45a48,48,0,1,0-45.4,45.4,8,8,0,0,0,14.93,5.88,32.19,32.19,0,0,1,4.21-15.88,32,32,0,1,1,29.82-29.82,32.19,32.19,0,0,1,15.88-4.21A8,8,0,0,0,119.7,34.55Z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold">Community</h3>
                                        <p className="text-sm text-muted-light dark:text-muted-dark">We believe in the power of shared experiences and foster a supportive community for our users.</p>
                                    </div>
                                </div>
                                
                                {/* Card 3: Privacy (RESTORED content) */}
                                <div className="flex flex-col gap-4 p-6 bg-background-light dark:bg-subtle-dark/50 rounded-xl backdrop-blur-lg border border-subtle-light/50 dark:border-subtle-dark/50 shadow-lg">
                                    <div className="text-primary w-10 h-10">
                                        <svg fill="currentColor" height="100%" viewBox="0 0 256 256" width="100%" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M164.49,105.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L100,154.06l47.51-47.52A12,12,0,0,1,164.49,105.51ZM224,56v58.77c0,82.4-65.23,109.83-88.35,116.63a19.46,19.46,0,0,1-15.3,0C97.23,224.6,32,197.17,32,114.77V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Zm-16,0H48v58.77c0,64.31,48.29,88.16,64,93.12,15.75-5,64-28.82,64-93.12Z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold">Privacy</h3>
                                        <p className="text-sm text-muted-light dark:text-muted-dark">Your privacy is paramount. We employ robust security measures to protect your data and ensure confidentiality.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Team Section */}
                        <section className="space-y-8">
                            <h2 className="text-3xl font-bold text-center">Meet the Minds Behind Mira</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {/* Team Cards (Original structure maintained) */}
                                <div className="flex flex-col items-center text-center gap-4 p-6 bg-background-light dark:bg-subtle-dark/50 rounded-xl backdrop-blur-lg border border-subtle-light/50 dark:border-subtle-dark/50 shadow-lg">
                                    <div className="w-24 h-24 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZyS8tybDiuBtdF0fHk54XOBt0ECcGO9roV6af_ZIOAtSzKcqFIBPOvm7izEOJyjDT2wH41H_xTEZ33eQoe_-vhLnrftUhIHDlVHOi6EvcUdjx1dz1reBv9f-86eqVBSrhmd7TQZHl3hwqvodpzXIz5h6sYMyqfzFM2e4D1iA_89tR-uszJ2Cs0Jh3S5tT8CuAXLWzHKIIuilSAZrqWb-MNexByHclGYp_b3tEsl3fXmWILmYOfBle7br2jDOGEsB7ivffKrrAVJI")' }}></div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold">Sarah Chen</h3>
                                        <p className="text-sm text-muted-light dark:text-muted-dark">Lead Therapist</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center gap-4 p-6 bg-background-light dark:bg-subtle-dark/50 rounded-xl backdrop-blur-lg border border-subtle-light/50 dark:border-subtle-dark/50 shadow-lg">
                                    <div className="w-24 h-24 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4sso4GNLnc6gCwuwPC7IENAc0VWegrAG2xNdVkzHeSTnN0ZArKM5hN44u6BlqcZPErjB5QPFe56ZXNIDbg696paF1GcgmR9aVykWyyJzRdOk5yvkDku3nKR6KoDA3o7awALkZdDoMBXk0d1LnloOv7ntaN-6lRRJQZ__GvLPcso0lAf5CdZs6UnJnsCbD13K62DlhAKSIeqKaoF8JcJGIiYxSprE9Sh6nlvlgO5qzgqPCo3HXcOe9QcVcYtbCwMv5yvagJNXCcLY")' }}></div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold">Rashid Kamar</h3>
                                        <p className="text-sm text-muted-light dark:text-muted-dark">AI Research Lead</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center gap-4 p-6 bg-background-light dark:bg-subtle-dark/50 rounded-xl backdrop-blur-lg border border-subtle-light/50 dark:border-subtle-dark/50 shadow-lg">
                                    <div className="w-24 h-24 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3LQ7yL6R68m72_j117dbpzFfKxhA29nboDKR4ece718dGJd-MAiZQxpReXcI2TYBmpQ_McpA3iMDPutNo-9YiYPpegeXYGSZaMNCKLf1e7FO-rJc1FTWZBPVBPuhfzOVBehKWKHGc08YvujDVcwwXzftmdkeceg20bSHlCsLk5OQgF94EC22nlVW7IFYl0KNPux7TCaxvg4rzfEaEy4bEiXwIEjQjTE0j7trGz75yHPWTgp1R0BR7O0DLWIIXLtr_WZevLnS0MaY")' }}></div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold">Mohd Shahrukh</h3>
                                        <p className="text-sm text-muted-light dark:text-muted-dark">Product Manager</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="relative text-center py-20 my-20 rounded-xl overflow-hidden">
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-blue-200 -z-10"></div>

                            <h2 className="text-4xl font-bold max-w-2xl mx-auto">
                                Ready to Hear Your Progress?
                            </h2>
                            <button
                                className="mt-8 bg-primary text-white font-bold py-4 px-8 
                                            rounded-full shadow-lg shadow-primary/30 hover:scale-105 
                                            transition-all duration-300"
                            >
                                <span className="truncate">Start Your Journey</span>
                            </button>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AboutPage;