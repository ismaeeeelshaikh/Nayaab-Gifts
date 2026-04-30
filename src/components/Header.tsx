"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CartIcon from "@/components/CartIcon";
import SearchBar from "@/components/SearchBar";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm transition-all supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Image
              src="/placeholder.png"
              alt="Nayaab Gifts"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-primary">Nayaab Gifts</span>
          </Link>
          <nav className="hidden md:flex gap-2">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10 rounded-md px-3 py-2"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10 rounded-md px-3 py-2"
            >
              Products
            </Link>
            <Link
              href="/customize"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10 rounded-md px-3 py-2"
            >
              Corporate Gifts
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10 rounded-md px-3 py-2"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <ThemeToggle />
          <CartIcon />

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback>
                      {session.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                {session.user.role === "ADMIN" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background"
          >
            <div className="container flex flex-col gap-4 py-4 pb-6 px-6">
              <Link
                href="/"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                Products
              </Link>
              <Link
                href="/customize"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                Corporate Gifts
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                About
              </Link>

              {!session && (
                <div className="flex flex-col gap-2 mt-2">
                  <Button className="w-full" asChild onClick={closeMenu}>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </div>
              )}

              <div className="mt-2">
                <SearchBar />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
