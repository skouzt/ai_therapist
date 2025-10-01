import Image from "next/image";
import React from "react";
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const MiraLogo = () => (
    <Image src="/logo.png" alt="Mira Logo" width={30} height={30} />
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a className="hover:text-primary transition-colors" href={href}>
        {children}
    </a>
);

export const Header = () => {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Exercise", href: "/exercise" },
        { name: "About", href: "about" },
        { name: "Subscription", href: "#" },
    ];

    return (
        // 1. Add max-width (e.g., max-w-4xl) to control the size.
        // 2. Add mx-auto to center the element horizontally.
        // 3. Keep 'sticky' but adjust 'top' and 'mt' for placement.
        <header className="sticky top-4 z-50 mt-4 max-w-4xl mx-auto">
            {/* The nav bar content remains the same size relative to the header */}
            <nav className="flex items-center justify-between whitespace-nowrap rounded-full p-2 px-6 liquid-glass shadow-lg">
                <div className="flex items-center gap-2 text-inherit">
                    <MiraLogo />
                    <h2 className="text-lg font-bold">Mira</h2>
                </div>
                <div className="hidden md:flex items-center gap-6 font-medium">
                    {navItems.map((item) => (
                        <NavLink key={item.name} href={item.href}>
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                 <div className='flex items-center gap-8'>
            
            <SignedOut>
                <SignInButton>
                  <button className="btn-signin">
                  Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            
        </div>
            </nav>
        </header>
    );
};