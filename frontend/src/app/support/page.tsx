import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Phone, Clock, HelpCircle, Book, Video, Send } from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">🎧 Support Center</Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            We are always here to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">help you</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            No matter the issue, our expert support team is ready to provide fast and professional assistance.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">Live Chat</h3>
                <p className="text-gray-300 mb-4">Instant answers through real-time chat</p>
                <Badge className="bg-green-500/20 text-green-400 mb-4">Online</Badge>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <Mail className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">Email Support</h3>
                <p className="text-gray-300 mb-4">Send detailed issues for expert replies</p>
                <p className="text-gray-400 text-sm mb-4">support@sentimentai.com</p>
                <Button variant="outline" className="w-full bg-transparent border-white/20 text-white">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">Phone Support</h3>
                <p className="text-gray-300 mb-4">Call us for urgent issues</p>
                <p className="text-gray-400 text-sm mb-4">400-888-0123</p>
                <Button variant="outline" className="w-full bg-transparent border-white/20 text-white">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Support Hours */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center">
                <Clock className="mr-2 h-5 w-5" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-white font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-300">Monday – Sunday</p>
                  <p className="text-gray-300">9:00 - 22:00</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-300">24/7</p>
                  <p className="text-gray-300">Replies within 24h</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-300">Monday – Friday</p>
                  <p className="text-gray-300">9:00 - 18:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Submit a Request</CardTitle>
                <CardDescription className="text-gray-300">Describe your issue in detail and we’ll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">
                    Issue Type
                  </Label>
                  <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-gray-400">
                    <option value="">Select an issue type</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Issue</option>
                    <option value="feature">Feature Inquiry</option>
                    <option value="api">API Related</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue in detail..."
                    className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  FAQ
                </CardTitle>
                <CardDescription className="text-gray-300">Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">How to start using SentimentAI?</h4>
                    <p className="text-gray-300 text-sm">
                      After registering an account, you can start using the sentiment analysis service immediately. The Starter plan is free with basic features.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Are there API limits?</h4>
                    <p className="text-gray-300 text-sm">
                      Different plans offer different API limits. The Pro plan offers 10,000 calls/month, and the Enterprise plan offers unlimited usage.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">What languages are supported?</h4>
                    <p className="text-gray-300 text-sm">
                      Currently, Chinese sentiment analysis is supported. English and other languages are in development.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">How is my data secured?</h4>
                    <p className="text-gray-300 text-sm">
                      We use bank-level encryption and are ISO 27001 certified to ensure your data security.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  View More FAQ
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resources */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Helpful Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <Book className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Documentation</h3>
                  <p className="text-gray-300 text-sm mb-4">Comprehensive guides and best practices</p>
                  <Button variant="outline" className="bg-transparent border-white/20 text-white">
                    View Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <Video className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-gray-300 text-sm mb-4">Learn features quickly through videos</p>
                  <Button variant="outline" className="bg-transparent border-white/20 text-white">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Community Forum</h3>
                  <p className="text-gray-300 text-sm mb-4">Exchange tips and experiences with other users</p>
                  <Button variant="outline" className="bg-transparent border-white/20 text-white">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
