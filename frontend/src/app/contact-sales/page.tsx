"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Users,
  Building,
  Send,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"


import { useState } from "react"

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    useCase: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto bg-white/5 border-white/10 backdrop-blur-sm text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">Submitted successfully!</h1>
              <p className="text-gray-300 mb-6">
                Thank you for your inquiry! Our sales team will contact you within 24 hours to provide you with professional solutions.
              </p>
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-white font-semibold mb-2">What happens next?</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Sales consultant to contact you within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Schedule product demos and requirements analysis</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    <span>Providing customized solutions</span>
                  </div>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={() => (window.location.href = "/")}
              >
                Back to home page
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">💼 Corporate Sales Consulting</Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Contact us {" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Sales Team</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            and our dedicated sales team will provide you with customized enterprise solutions to help you grow your business!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 联系方式 */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">contact details</CardTitle>
                <CardDescription className="text-gray-300">Multiple ways to contact our sales team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Sales Hotline</p>
                    <p className="text-gray-300 text-sm">400-888-0123</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Sales Email</p>
                    <p className="text-gray-300 text-sm">sales@sentimentai.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Online Consultation</p>
                    <p className="text-gray-300 text-sm">Weekdays 9:00-18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Why choose us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Professional Team</p>
                    <p className="text-gray-300 text-sm">Senior AI and data analytics expert</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Customized Solutions</p>
                    <p className="text-gray-300 text-sm">Tailored to business needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Full support</p>
                    <p className="text-gray-300 text-sm">Full service from deployment to operation and maintenance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Safety</p>
                    <p className="text-gray-300 text-sm">Enterprise-grade security and privacy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Book a Demo</h3>
                <p className="text-gray-300 text-sm mb-4">Schedule a one-on-one product demo to get an in-depth look at our solutions</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Make an Appointment Now</Button>
              </CardContent>
            </Card>
          </div>

          {/* 咨询表单 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Business Inquiry Form</CardTitle>
                <CardDescription className="text-gray-300">
                  Please fill out the information below and one of our sales consultants will contact you shortly!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        name and surname *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your Name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@company.com"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">
                        Company Name *
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="您的公司"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        contact number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Your cell phone number"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="employees" className="text-white">
                        Company size
                      </Label>
                      <select
                        id="employees"
                        value={formData.employees}
                        onChange={(e) => handleInputChange("employees", e.target.value)}
                        className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white"
                      >
                        <option value="">Please select company size</option>
                        <option value="1-10">1-10人</option>
                        <option value="11-50">11-50人</option>
                        <option value="51-200">51-200人</option>
                        <option value="201-1000">201-1000人</option>
                        <option value="1000+">1000人以上</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="useCase" className="text-white">
                        Usage Scenarios
                      </Label>
                      <select
                        id="useCase"
                        value={formData.useCase}
                        onChange={(e) => handleInputChange("useCase", e.target.value)}
                        className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white"
                      >
                        <option value="">Please select the usage scenario</option>
                        <option value="brand-monitoring">Brand Monitoring</option>
                        <option value="customer-feedback">Customer Feedback Analysis</option>
                        <option value="market-research">Market research</option>
                        <option value="competitor-analysis">Competitive Analysis</option>
                        <option value="crisis-management">Crisis management</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Description of Requirements
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your business needs and desired solution in detail..."
                      className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="privacy" className="rounded" required />
                    <Label htmlFor="privacy" className="text-sm text-gray-300">
                      I agree to receive product information and marketing emails and have read the
                      <a href="/privacy" className="text-purple-400 hover:text-purple-300 ml-1">
                        privacy policy
                      </a>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit an inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 客户案例 */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="text-white font-semibold">A well-known e-commerce platform</h3>
                    <p className="text-gray-400 text-sm">e-commerce industry</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  "With SentimentAI's sentiment analysis, we were able to monitor user feedback in real time, identify and resolve issues in a timely manner, and increase user satisfaction by 25%."
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-purple-400 mr-1" />
                    <span className="text-white">1000+ Employees</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">+25% Satisfaction</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="h-8 w-8 text-green-400" />
                  <div>
                    <h3 className="text-white font-semibold">A large bank</h3>
                    <p className="text-gray-400 text-sm">financial industry</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  "Using sentiment analysis technology, we were able to better understand customer needs and optimize our service processes, which resulted in a 40% drop in customer complaints."
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-purple-400 mr-1" />
                    <span className="text-white">5000+ Employees</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingDown className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">-40% Complaint rate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="h-8 w-8 text-purple-400" />
                  <div>
                    <h3 className="text-white font-semibold">Automaker</h3>
                    <p className="text-gray-400 text-sm">manufacture</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  "By monitoring brand mentions on social media, we are able to respond quickly to changes in the marketplace and our brand reputation is significantly enhanced."
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-purple-400 mr-1" />
                    <span className="text-white">10000+ Employees</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-400">Brand Enhancement</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
