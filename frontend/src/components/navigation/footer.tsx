import { Brain, Github, Twitter, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  product: [
    { name: "功能特性", href: "/features" },
    { name: "定价方案", href: "/pricing" },
    { name: "在线演示", href: "/demo" },
    { name: "API文档", href: "/docs" },
  ],
  solutions: [
    { name: "品牌监控", href: "/solutions/brand-monitoring" },
    { name: "舆情分析", href: "/solutions/sentiment-analysis" },
    { name: "竞品分析", href: "/solutions/competitor-analysis" },
    { name: "危机预警", href: "/solutions/crisis-alert" },
  ],
  support: [
    { name: "技术支持", href: "/support" },
    { name: "使用文档", href: "/docs" },
    { name: "视频教程", href: "/tutorials" },
    { name: "社区论坛", href: "/community" },
  ],
  company: [
    { name: "关于我们", href: "/about" },
    { name: "联系我们", href: "/contact" },
    { name: "隐私政策", href: "/privacy" },
    { name: "服务条款", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SentimentAI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              专业的社交媒体情感分析平台，助力企业洞察用户心声，优化品牌策略。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">产品功能</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">解决方案</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">支持服务</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">公司信息</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">地址</p>
                <p className="text-gray-400 text-sm">北京市朝阳区科技园区</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">电话</p>
                <p className="text-gray-400 text-sm">400-888-0123</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">邮箱</p>
                <p className="text-gray-400 text-sm">contact@sentimentai.com</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2024 SentimentAI. 保留所有权利。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                服务条款
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie政策
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
