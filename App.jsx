import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Shield, 
  Code, 
  Search, 
  Target, 
  Award, 
  Wrench, 
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Github,
  Linkedin,
  Mail
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const skills = {
    cybersecurity: [
      'Web Application Penetration Testing',
      'Network Security Testing',
      'Bug Bounty Hunting',
      'Exploit Research',
      'Social Engineering',
      'OSINT Investigations'
    ],
    tools: [
      'Custom Security Toolkits',
      'Python Recon Scripts',
      'Network Scanners',
      'Mobile Security Automation',
      'PowerShell Automation'
    ],
    testing: [
      'WordPress Security Testing',
      'API Pentesting',
      'HTTP Header Manipulation',
      'Firewall Bypass Testing'
    ],
    programming: [
      'Python',
      'PowerShell',
      'Bash Scripting',
      'Web Scraping',
      'Windows & Linux Development'
    ]
  }

  const services = [
    'Web & Mobile Application Penetration Testing',
    'Bug Bounty Hunting Support',
    'Custom Ethical Hacking Toolkit Development',
    'OSINT Investigations & Digital Forensics',
    'Network Security Audits',
    'Automation Scripts Development',
    'Secure Software Development Consulting'
  ]

  const achievements = [
    {
      title: 'Programming Excellence Award',
      description: 'Received at Doart Energy for contributions in automation and tool development'
    },
    {
      title: 'Penetration Testing Success',
      description: 'Successfully conducted penetration tests on multiple domains including WordPress, APIs, and e-commerce platforms'
    },
    {
      title: 'Bug Bounty Participation',
      description: 'Active participant in Bug Bounty Programs (HackerOne, inDrive, OPPO Security Event)'
    },
    {
      title: 'Custom Toolkit Development',
      description: 'Built a custom USB-based Ethical Hacking Toolkit for research and internal testing'
    }
  ]

  const tools = {
    pentesting: ['Burp Suite', 'Nmap', 'Bettercap', 'Hydra', 'SQLmap', 'Wireshark'],
    osint: ['Maltego', 'crt.sh', 'Recon-ng', 'Custom Python Scrapers'],
    scripting: ['Python', 'PowerShell', 'Bash'],
    environments: ['Kali Linux', 'Windows', 'Docker']
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'services', 'achievements', 'tools', 'goals']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold gradient-text">Usama Haider</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'skills', 'services', 'achievements', 'tools', 'goals'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item 
                        ? 'text-primary bg-primary/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-foreground hover:bg-accent"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'skills', 'services', 'achievements', 'tools', 'goals'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === item 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="floating-animation">
              <Shield className="mx-auto h-16 w-16 text-primary mb-6" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="gradient-text">Usama Haider</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
              Cybersecurity Researcher & Software Developer
            </p>
            <p className="text-lg text-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              I am a Cybersecurity Researcher, Ethical Hacker, and Software Developer with hands-on experience in penetration testing, 
              ethical hacking, OSINT investigations, and secure software development. With a strong background in programming, 
              digital forensics, and system security, I specialize in identifying vulnerabilities, securing infrastructures, 
              and building tools that enhance cyber defense.
            </p>
            <p className="text-md text-muted-foreground mb-8">
              Currently working at Doart Energy, where I received the Programming Excellence Award for my contributions 
              in automation, tool development, and system optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="glow-effect hover-glow"
                onClick={() => window.open('https://linkedin.com', '_blank')}
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('skills')}
              >
                View My Skills
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground">Comprehensive cybersecurity and development capabilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Cybersecurity & Ethical Hacking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.cybersecurity.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="skill-tag">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-6 w-6 text-primary" />
                  Custom Security Tool Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="skill-tag">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Web & API Testing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.testing.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="skill-tag">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  Programming & Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.programming.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="skill-tag">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Services I Provide</h2>
            <p className="text-lg text-muted-foreground">Professional cybersecurity and development services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-foreground">{service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Achievements</h2>
            <p className="text-lg text-muted-foreground">Recognition and accomplishments in cybersecurity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Tools Section */}
      <section id="tools" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Tools & Platforms</h2>
            <p className="text-lg text-muted-foreground">Technologies and tools I work with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Pentesting Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tools.pentesting.map((tool, index) => (
                    <Badge key={index} variant="outline" className="skill-tag">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>OSINT & Forensics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tools.osint.map((tool, index) => (
                    <Badge key={index} variant="outline" className="skill-tag">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Scripting & Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tools.scripting.map((tool, index) => (
                    <Badge key={index} variant="outline" className="skill-tag">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Development Environments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tools.environments.map((tool, index) => (
                    <Badge key={index} variant="outline" className="skill-tag">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Future Goals Section */}
      <section id="goals" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Future Goals</h2>
            <p className="text-lg text-muted-foreground">Vision for continuous growth and contribution</p>
          </div>

          <Card className="max-w-4xl mx-auto hover-glow pulse-glow">
            <CardContent className="p-8">
              <p className="text-lg text-foreground leading-relaxed text-center">
                My mission is to continuously sharpen my skills in ethical hacking, exploit development, 
                and advanced threat research, while contributing to organizations through bug bounty programs, 
                internal security audits, and secure coding practices. I aim to stay at the forefront of 
                cybersecurity innovation and help build a more secure digital world.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text mb-4">Get In Touch</h3>
            <p className="text-muted-foreground mb-8">
              Ready to collaborate on cybersecurity projects or need security consulting?
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="glow-effect hover-glow"
                onClick={() => window.open('https://linkedin.com', '_blank')}
              >
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:contact@example.com', '_blank')}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </div>
            <Separator className="my-8" />
            <p className="text-sm text-muted-foreground">
              © 2024 Usama Haider. Cybersecurity Researcher & Software Developer.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

