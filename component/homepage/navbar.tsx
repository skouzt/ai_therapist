import Image from "next/image";
import React from "react";

const MiraLogo = () => (
    <Image src="/logo.png" alt="Mira Logo" width={36} height={36} />
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="hover:text-primary transition-colors" href={href}>
    {children}
  </a>
);

export const Header = () => {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Exercise", href: "#" },
    { name: "Subscription", href: "#" },
    { name: "Profile", href: "#" },
  ];

  return (
    <header className="sticky top-4 z-50 mt-4">
      <nav className="flex items-center justify-between whitespace-nowrap rounded-full p-3 px-8 glassmorphism shadow-lg">
        <div className="flex items-center gap-3 text-inherit">
          <MiraLogo />
          <h2 className="text-xl font-bold">Mira</h2>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>
        <a
          className="bg-primary/20 hover:bg-primary/30 text-primary font-bold py-2 px-6 rounded-full transition-all"
          href="#"
        >
          Login
        </a>
      </nav>
    </header>
  );
};
