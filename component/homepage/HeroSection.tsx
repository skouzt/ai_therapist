import { Button } from "@/components/ui/button";
import Link from "next/link";

const VoiceIcon = () => (
  <svg
    className="w-48 h-48 text-black/70"
    fill="none"
    height="200"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1"
    viewBox="0 0 24 24"
    width="200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path>
    <path
      d="M12 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
      fill="currentColor"
      opacity="0.1"
    ></path>
    <path d="M12 12a10 10 0 0 0 -10 10"></path>
    <path d="M12 12a6 6 0 0 1 6 6"></path>
    <path
      className="animate-spin-slow"
      d="M5.636 5.636a9 9 0 1 0 12.728 12.728A9 9 0 0 0 5.636 5.636z"
      strokeDasharray="2 2"
    ></path>
  </svg>
);

export const HeroSection = () => {
  return (
    <section
      className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-20 
                 text-center md:text-left overflow-hidden"
    >
      {/* Left Gradient Effect */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -z-10 
                      w-[30rem] h-[30rem] 
                      bg-gradient-to-tr from-orange-200 via-pink-200 to-rose-300 
                      opacity-40 blur-3xl rounded-full">
      </div>

      {/* Right Gradient Effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 
                      w-[30rem] h-[30rem] 
                      bg-gradient-to-bl from-blue-200 via-indigo-200 to-purple-300 
                      opacity-40 blur-3xl rounded-full">
      </div>

      {/* Left Content */}
      <div className="relative">
        {/* Pulsating Circle Effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl 
                       animate-pulse"
          ></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Your Voice, Your Therapy.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg text-black/70">
          Discover the power of voice therapy with Mira. Our AI-driven approach
          offers personalized exercises and feedback to help you achieve
          emotional well-being.
        </p>
        <Link href="/Haven/new" passHref>
       <Button
          className="md-10 mt-10 bg-primary text-white font-bold py-4 px-8 rounded-full 
                    shadow-lg shadow-gray-700/30 hover:scale-105 transition-all 
                    duration-300"
        >
          Start Your Journey
        </Button>
        </Link>
      </div>

      {/* Right Visualization */}
      <div className="relative w-full h-96 md:h-full flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square">
          {/* Animated SVG Shapes */}
          <svg
            className="absolute inset-0 w-full h-full text-primary/30 
                       opacity-50 animate-spin-slow"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44,-53.4C57.6,-45.3,70,-31.6,74,-16.1C78, -0.6, 73.7,16.7, 64.9,31.2C56.1,45.7,42.8,57.5,27.6,64.2C12.4,70.9,-4.8,72.6,-20.9,68.2C-37,63.8,-52.1,53.2,-62.4,39.2C-72.7,25.2,-78.3,7.9,-75.4,-8.1C-72.5,-24.1,-61.2,-38.8,-48.1,-46.8C-35,-54.8,-20.2,-56.1,-6,-56.5C8.1,-56.9,20.4,-61.5,44,-53.4Z"
              fill="currentColor"
              transform="translate(100 100)"
            ></path>
          </svg>

          <svg
            className="absolute inset-0 w-full h-full text-pink-300/30 
                       opacity-60 animate-spin-slow-reverse"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.7,-59.5C61.8,-51.2,73.2,-37.2,78.2,-21.2C83.2,-5.1,81.8,12.9,73.6,28.6C65.5,44.2,50.6,57.5,34.5,65.8C18.4,74.1,1.1,77.3,-15.8,74.2C-32.8,71.1,-49.4,61.7,-61.2,48.6C-73,35.4,-79.9,18.5,-79.9,1.8C-79.8,-14.9,-72.7,-31.4,-61.3,-43.8C-49.8,-56.2,-34,-64.5,-18.7,-68.8C-3.4,-73.1,11.3,-73.4,26.5,-69.5C41.7,-65.6,57.4,-57.5,47.7,-59.5Z"
              fill="currentColor"
              transform="translate(100 100) scale(0.8)"
            ></path>
          </svg>

          {/* Central Voice Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <VoiceIcon />
          </div>
        </div>
      </div>
    </section>
  );
};
