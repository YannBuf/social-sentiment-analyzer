import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">💰 Flexible Pricing Plans</Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Choose the
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Right Plan for You</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            From individual developers to large enterprises, we offer flexible pricing options to suit various needs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Starter</CardTitle>
                <CardDescription className="text-gray-300">For individual developers and small projects</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">Free</span>
                  <span className="text-gray-400 ml-2">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    1,000 analyses per month
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Basic sentiment analysis
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    3 monitored keywords
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Basic report templates
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Email support
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-2xl">Professional</CardTitle>
                <CardDescription className="text-gray-300">For SMEs and marketing teams</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$19</span>
                  <span className="text-gray-400 ml-2">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    50,000 analyses per month
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Advanced sentiment + trend forecasting
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    50 monitored keywords
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Custom reports + data export
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Public opinion alert system
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    API access
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Priority tech support
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Link href="/signup">Subscribe Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-gray-300">For large organizations</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$39</span>
                  <span className="text-gray-400 ml-2">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Unlimited data analysis
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Full-featured AI suite
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Unlimited monitored keywords
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    White-label custom solutions
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    Private deployment options
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-green-400 mr-3" />
                    24/7 technical support
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Link href="/contact-sales">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Feature Comparison */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white/5 backdrop-blur-sm rounded-lg">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white font-semibold">Feature</th>
                    <th className="text-center p-4 text-white font-semibold">Starter</th>
                    <th className="text-center p-4 text-white font-semibold">Professional</th>
                    <th className="text-center p-4 text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                    <td className="p-4">Analyses per Month</td>
                    <td className="text-center p-4">1,000</td>
                    <td className="text-center p-4">50,000</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Monitored Keywords</td>
                    <td className="text-center p-4">3</td>
                    <td className="text-center p-4">50</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">API Calls / Month</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">10,000</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Data Retention</td>
                    <td className="text-center p-4">30 days</td>
                    <td className="text-center p-4">1 year</td>
                    <td className="text-center p-4">Permanent</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Technical Support</td>
                    <td className="text-center p-4">Email</td>
                    <td className="text-center p-4">Email + Chat</td>
                    <td className="text-center p-4">24/7 Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Can I upgrade or downgrade my plan at any time?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes, you can upgrade or downgrade your plan anytime in your account settings. Upgrades take effect immediately, while downgrades take effect at the end of the current billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">What payment methods are supported?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We support credit cards, debit cards, Alipay, WeChat Pay, and more. Enterprise clients may also use bank transfers and invoices.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  The Starter plan is free forever. Professional and Enterprise plans come with a 7-day free trial, no credit card required.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">How is my data secured?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We use bank-level encryption and security practices, certified by ISO 27001, to ensure your data is safe. Enterprise plans also support private deployment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to start your sentiment analysis journey?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Choose the plan that fits you best and experience AI-powered social sentiment insights today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Zap className="mr-2 h-5 w-5" />
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/contact-sales">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
