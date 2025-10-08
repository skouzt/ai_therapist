# Mira - Your Personal AI Voice Companion

Mira is a conversational AI therapist designed to provide a safe and supportive space for users to explore their thoughts and feelings. Leveraging cutting-edge voice technology, Mira offers an empathetic and interactive experience for emotional well-being.

![Mira AI Therapist Homepage Screenshot](https://i.postimg.cc/MHGnCV27/Screenshot-2025-10-09-035104.png)


## 🚀 Project Overview

This application provides a seamless and engaging platform for users to interact with an AI companion. It features a comprehensive user onboarding process, allowing for the creation and customization of AI therapists, and a dynamic chat interface for real-time voice conversations.

### The Problem

In a fast-paced world, finding accessible and immediate emotional support can be challenging. Traditional therapy can be expensive and time-consuming, leaving many without the help they need.

### The Solution

Mira offers an AI-driven voice therapy solution that is available anytime, anywhere. It provides a non-judgmental space for users to talk, reflect, and receive supportive feedback, helping to improve mental and emotional resilience.

## ✨ Features

- **User Authentication:** Secure sign-up and sign-in functionality powered by Clerk.
- **Companion Creation:** An intuitive form for users to create and customize their personal AI therapist, choosing from different voices and styles.
- **Dynamic Voice Chat:** A real-time, interactive chat interface where users can speak with their AI companion.
- **Session Management:** Users can create new therapy sessions and view their history in the "Haven" dashboard.
- **Responsive Design:** A modern and clean UI that works seamlessly across all devices.
- **Dynamic Theming:** Supports both light and dark modes, with a theming system built on CSS variables.

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Form Management:** React Hook Form, Zod
- **Authentication:** Clerk
- **Database:** Supabase
- **AI Voice Service:** Vapi AI

## ⚙️ Setup & Installation

Follow these steps to get the project up and running on your local machine.

### 1. Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

### 2. Clone the Repository

```bash
git clone https://github.com/skouzt/ai_therapist.git
cd ai_therapist
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following variables. You can find the necessary keys from the respective service dashboards.

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk Auth URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vapi AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=
```

### 5. Run the Development Server

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## 📂 Code Structure & Conventions

The project follows a feature-oriented structure to keep the codebase organized and maintainable.

- **`app/`**: Contains all the routes and pages, following the Next.js App Router conventions.
- **`component/`**: Houses higher-level, feature-specific components (e.g., `component/homepage`, `component/Mira`).
- **`components/ui/`**: Includes reusable, low-level UI components from `shadcn/ui` (e.g., Button, Card, Input).
- **`lib/`**: Handles business logic, server-side actions (`lib/action`), and client/SDK initializations (Supabase, Vapi).
- **`constants/`**: Stores static data, such as configuration arrays and JSON files.

## 🎨 Styling & Theming

The project uses **Tailwind CSS** for utility-first styling. The theming system is built with CSS variables, allowing for easy customization and dynamic switching between light and dark modes.

- **`globals.css`**: Defines the base styles and CSS variables for colors, borders, and other theme-related properties.
- **`tailwind.config.js`**: Configures Tailwind CSS, extending the default theme with custom colors and properties that are mapped to the CSS variables. This setup, combined with `shadcn/ui`, provides a robust and flexible styling foundation.
