"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  name: string
  href: string
}

const routeNames: Record<string, string> = {
  "": "Home",
  dashboard: "Dashboard",
  analytics: "Analytics Reports",
  monitoring: "Monitoring Center",
  alerts: "Alert Management",
  settings: "Settings",
  profile: "Profile",
  features: "Features",
  pricing: "Pricing",
  demo: "Live Demo",
  support: "Support",
  login: "Login",
  signup: "Sign Up",
}

export function Breadcrumb() {
  const pathname = usePathname()

  if (!pathname || pathname === "/") return null

  // 不在首页显示面包屑
  //if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbItems: BreadcrumbItem[] = [{ name: "Home", href: "/" }]

  let currentPath = ""
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const name = routeNames[segment] || segment
    breadcrumbItems.push({
      name,
      href: currentPath,
    })
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          {index === 0 && <Home className="h-4 w-4" />}
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-white font-medium">{item.name}</span>
          ) : (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.name}
            </Link>
          )}
          {index < breadcrumbItems.length - 1 && <ChevronRight className="h-4 w-4" />}
        </div>
      ))}
    </nav>
  )
}
