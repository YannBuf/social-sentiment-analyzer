"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Brain, Menu, Bell, Settings, User, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
  name: string
  href: string
  description?: string
}

const publicNavItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features", description: "Explore product features" },
  { name: "Pricing", href: "/pricing", description: "Choose a suitable plan" },
  { name: "Live Demo", href: "/demo", description: "Experience AI-powered analysis" },
  { name: "Support", href: "/support", description: "Get help and assistance" },
]

// { name: "Monitoring Center", href: "/dashboard/monitoring" },
const dashboardNavItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Smart Search", href: "/search-analysis", description: "AI-powered content analysis" },
  { name: "Analytics Reports", href: "/dashboard/analytics" },
]

interface NavbarProps {
  isAuthenticated?: boolean
  user?: {
    name: string
    email: string
    avatar?: string
  }
  forceMode?: "public" | "dashboard" // Added: force specify navigation mode
  onLogout?: () => void
}

export function Navbar({ isAuthenticated = false, user, forceMode, onLogout }: NavbarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Fix navigation logic
  const getDashboardMode = () => {
    if (forceMode) return forceMode === "dashboard"

    // Check if URL params contain source info
    const from = searchParams.get("from")
    if (from === "dashboard") return true
    if (from === "home") return false

    // Default logic: show dashboard nav under /dashboard paths
    // For /search-analysis page, if no 'from' param and user is authenticated, show dashboard nav by default
    if (pathname.startsWith("/dashboard")) return true
    if (pathname === "/search-analysis" && isAuthenticated && !from) return true

    return false
  }

  const isDashboard = getDashboardMode()
  const navItems = isDashboard ? dashboardNavItems : publicNavItems

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"

    // Exact match or path starts with href + '/' counts as active
    // But exclude certain subpages
    if (pathname === href) return true
    if (pathname.startsWith(href + "/")) {
      // For example, for /dashboard, only activate on /dashboard and some /dashboard/* pages
      // Here exclude some subpaths like analytics
      if (href === "/dashboard") {
        // If current page is /dashboard/analytics, do not activate /dashboard nav item
        // You can customize this logic as needed, e.g., exclude paths starting with /dashboard/analytics
        if (pathname.startsWith("/dashboard/analytics")) return false
      }
      return true
    }
    return false
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href={isDashboard ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">SentimentAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive(item.href) ? "text-white border-b-2 border-purple-400 pb-1" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>


                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-white/10">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-500 text-white">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">{user?.name || "User"}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-400">{user?.email || "user@example.com"}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-slate-700">
                      <Link href="/dashboard/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-slate-700">
                      <Link href="/dashboard/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:text-red-300 hover:bg-slate-700">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="hidden sm:flex bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  asChild
                >
                  <Link href="/signup">Free Trial</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-slate-900 border-slate-800">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Logo */}
                  <Link
                    href={isDashboard ? "/dashboard" : "/"}
                    className="flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Brain className="h-6 w-6 text-purple-400" />
                    <span className="text-xl font-bold text-white">SentimentAI</span>
                  </Link>

                  {/* Mobile Navigation Items */}
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex flex-col space-y-1 p-3 rounded-lg transition-colors ${
                          isActive(item.href)
                            ? "bg-purple-500/20 text-white border border-purple-500/30"
                            : "text-gray-300 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span className="font-medium">{item.name}</span>
                        {item.description && <span className="text-xs text-gray-400">{item.description}</span>}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Auth Actions */}
                  {!isAuthenticated && (
                    <div className="flex flex-col space-y-3 pt-6 border-t border-slate-700">
                      <Button
                        variant="outline"
                        className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/signup">Free Trial</Link>
                      </Button>
                    </div>
                  )}

                  {/* Mobile User Menu */}
                  {isAuthenticated && (
                    <div className="flex flex-col space-y-3 pt-6 border-t border-slate-700">
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-purple-500 text-white">
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{user?.name || "User"}</p>
                          <p className="text-gray-400 text-sm">{user?.email || "user@example.com"}</p>
                        </div>
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center space-x-2 p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          onLogout?.()
                          setMobileMenuOpen(false)
                        }}
                        className="flex items-center space-x-2 p-3 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
