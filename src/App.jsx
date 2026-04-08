import React, { useState, useEffect } from 'react'
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
  Mail,
  Star,
  GitBranch
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
      'PowerShell Automation',
      'Pen Testing',
      'SIEM',
      'Wireshark',
      'Digital Forensics'
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

  const projects = [
    {
      title: 'Sentinel-Scan',
      description: 'A powerful subdomain & asset discovery tool for security researchers. Helps identify exposed assets and potential vulnerabilities.',
      technologies: ['Python', 'OSINT', 'Reconnaissance'],
      link: 'https://github.com/Haider899/Sentinel-Scan',
      status: 'Completed'
    },
    {
      title: 'WordPress-Security-Auditor',
      description: 'WP-SEC-AUDIT: Professional WordPress Security Auditor & Vulnerability Scanner for comprehensive CMS security testing.',
      technologies: ['Python', 'WordPress', 'Security Audit'],
      link: 'https://github.com/Haider899/WordPress-Security-Auditor',
      status: 'Completed'
    },
    {
      title: 'Lazy-Dorks',
      description: 'Advanced Google & GitHub Dorking Tool for Security Researchers. Automates comprehensive dork searches for vulnerability discovery.',
      technologies: ['Python', 'Google Dorking', 'GitHub OSINT'],
      link: 'https://github.com/Haider899/Lazy-Dorks',
      status: 'Completed'
    },
    {
      title: 'Universal-Web-Scraper',
      description: 'A powerful universal web scraper that works on ANY website with interactive menus and advanced parsing capabilities.',
      technologies: ['Python', 'Web Scraping', 'BeautifulSoup'],
      link: 'https://github.com/Haider899/universal-web-scraper',
      status: 'Completed'
    },
    {
      title: 'Vanguard-X',
      description: 'Advanced threat analysis and security research toolkit with multiple exploitation and reconnaissance capabilities.',
      technologies: ['Python', 'Threat Analysis', 'Security Research'],
      link: 'https://github.com/Haider899/Vanguard-X',
      status: 'Completed'
    },
    {
      title: 'Network-Threat-Visualizer',
      description: 'A realistic network threat visualizer with server, PWA, configuration, and automated browser tests for security visualization.',
      technologies: ['JavaScript', 'React', 'Network Visualization'],
      link: 'https://github.com/Haider899/network-threat-visualizer',
      status: 'Completed'
    }
  ]

  const certifications = [
    {
      name: 'Certified Ethical Hacker (CEH)',
      issuer: 'EC-Council',
      date: '2026 (March)',
      icon: '🏆',
      level: 'Professional'
    },
    {
      name: 'Practical Network Penetration Tester',
      issuer: 'eLearnSecurity',
      date: '2024',
      icon: '🎯',
      level: 'Professional'
    },
    {
      name: 'Bug Bounty Hunter Certification',
      issuer: 'HackerOne Academy',
      date: '2024',
      icon: '🔓',
      level: 'Professional'
    },
    {
      name: 'Ethical Hacking & Penetration Testing',
      issuer: 'Cybersecurity Training Institute',
      date: '2023',
      icon: '🔐',
      level: 'Intermediate'
    },
    {
      name: 'Advanced Python for Security',
      issuer: 'Python Academy',
      date: '2023',
      icon: '🐍',
      level: 'Intermediate'
    },
    {
      name: 'OSINT Investigations Specialist',
      issuer: 'OSINT Academy',
      date: '2023',
      icon: '🔍',
      level: 'Intermediate'
    },
    {
      name: 'Digital Forensics Professional',
      issuer: 'Forensics Institute',
      date: '2022',
      icon: '🔬',
      level: 'Intermediate'
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
      const sections = ['home', 'skills', 'services', 'projects', 'achievements', 'certifications', 'tools', 'goals']
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

  // Helper components
  const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '' }) => {
    const baseStyle = 'px-6 py-2 rounded-sm font-medium transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border border-border-gray'
    const variants = {
      primary: 'bg-neon-teal hover:bg-neon-teal/80 text-midnight hover:shadow-lg hover:shadow-neon-teal/50',
      outline: 'bg-transparent text-text-main hover:bg-neon-teal/10 hover:border-neon-teal hover:shadow-lg hover:shadow-neon-teal/30'
    }
    return (
      <button 
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    )
  }

  const Card = ({ children, className = '' }) => (
    <div className={`bg-card-gray border border-border-gray rounded-sm p-6 hover:border-neon-teal/50 transition-all ${className}`}>
      {children}
    </div>
  )

  const Badge = ({ children, variant = 'secondary' }) => {
    const variants = {
      secondary: 'bg-card-gray border border-border-gray text-text-main font-mono',
      outline: 'bg-transparent border border-border-gray text-text-muted font-mono',
      default: 'bg-neon-teal text-midnight font-mono'
    }
    return (
      <span className={`inline-block px-3 py-1 rounded-sm text-sm font-medium ${variants[variant]}`}>
        {children}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-midnight text-text-main">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-midnight/80 backdrop-blur-md border-b border-border-gray z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-neon-teal">Usama Haider</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'skills', 'services', 'projects', 'achievements', 'certifications', 'tools', 'goals'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                      activeSection === item 
                        ? 'text-neon-teal bg-card-gray' 
                        : 'text-text-muted hover:text-text-main hover:bg-card-gray/50'
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
                className="p-2 rounded-sm text-text-main hover:bg-card-gray"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card-gray border-t border-border-gray">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'skills', 'services', 'projects', 'achievements', 'certifications', 'tools', 'goals'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block px-3 py-2 rounded-sm text-base font-medium w-full text-left transition-colors ${
                    activeSection === item 
                      ? 'text-neon-teal bg-midnight' 
                      : 'text-text-muted hover:text-text-main hover:bg-midnight/50'
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
      <section id="home" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left">
            <div className="floating-animation mb-6">
              <Shield className="h-20 w-20 text-neon-teal" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-text-main">Usama Haider</h1>
            <p className="text-2xl sm:text-3xl text-text-muted mb-8">Cybersecurity Researcher & Software Developer</p>
            <p className="text-lg text-text-muted max-w-4xl mb-12 leading-relaxed">
              I am a Cybersecurity Researcher, Ethical Hacker, and Software Developer with hands-on experience in penetration testing, 
              ethical hacking, OSINT investigations, and secure software development. With a strong background in programming, 
              digital forensics, and system security, I specialize in identifying vulnerabilities, securing infrastructures, 
              and building tools that enhance cyber defense.
            </p>
            <p className="text-base text-text-muted mb-8">
              Currently working at Doart Energy, where I received the Programming Excellence Award for my contributions 
              in automation, tool development, and system optimization. Recently certified as a <span className="text-neon-teal font-semibold">Certified Ethical Hacker (CEH)</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start flex-wrap">
              <Button onClick={() => window.open('https://www.linkedin.com/in/usama-haider-1968a91a1/', '_blank')}>
                <Linkedin size={20} /> Connect on LinkedIn
              </Button>
              <Button variant="outline" onClick={() => window.open('https://github.com/Haider899', '_blank')}>
                <Github size={20} /> GitHub Profile
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('projects')}>
                View Projects <ChevronDown size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-neon-teal text-center">Skills & Expertise</h2>
          <p className="text-lg text-text-muted text-center mb-16">Comprehensive cybersecurity and development capabilities</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center hover:border-neon-teal/70 transition-all">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-neon-teal" />
                <h3 className="text-lg font-bold font-mono">CYBERSECURITY</h3>
              </div>
              <div className="space-y-2">
                {skills.cybersecurity.map((skill, index) => (
                  <div key={index} className="text-sm font-mono text-text-main bg-midnight px-2 py-1 rounded-sm border border-border-gray">
                    {skill}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="text-center hover:border-neon-teal/70 transition-all">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Wrench className="h-8 w-8 text-neon-teal" />
                <h3 className="text-lg font-bold font-mono">TOOLS</h3>
              </div>
              <div className="space-y-2">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="text-sm font-mono text-text-main bg-midnight px-2 py-1 rounded-sm border border-border-gray">
                    {skill}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="text-center hover:border-neon-teal/70 transition-all">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="h-8 w-8 text-neon-teal" />
                <h3 className="text-lg font-bold font-mono">TESTING</h3>
              </div>
              <div className="space-y-2">
                {skills.testing.map((skill, index) => (
                  <div key={index} className="text-sm font-mono text-text-main bg-midnight px-2 py-1 rounded-sm border border-border-gray">
                    {skill}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="text-center hover:border-neon-teal/70 transition-all">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Code className="h-8 w-8 text-neon-teal" />
                <h3 className="text-lg font-bold font-mono">PROGRAMMING</h3>
              </div>
              <div className="space-y-2">
                {skills.programming.map((skill, index) => (
                  <div key={index} className="text-sm font-mono text-text-main bg-midnight px-2 py-1 rounded-sm border border-border-gray">
                    {skill}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-neon-teal text-center">Services I Provide</h2>
          <p className="text-lg text-text-muted text-center mb-16">Professional cybersecurity and development services</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-neon-teal rounded-sm mt-2"></div>
                  <p className="text-text-main">{service}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-neon-teal text-center">GitHub Projects</h2>
          <p className="text-lg text-text-muted text-center mb-16">Real-world cybersecurity tools and security research</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="flex flex-col bg-midnight border-2 border-border-gray">
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between bg-card-gray px-4 py-2 border-b border-border-gray rounded-t-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-mono text-text-muted">terminal-{index + 1}</span>
                  <div className="w-16"></div>
                </div>
                
                {/* Terminal Content */}
                <div className="p-4 flex-1">
                  <div className="font-mono text-neon-teal mb-2">$ cat project_info.txt</div>
                  <h3 className="text-lg font-mono font-bold text-text-main mb-2">{project.title}</h3>
                  <p className="text-sm font-mono text-text-muted mb-3 leading-relaxed">{project.description}</p>
                  <div className="mb-3">
                    <div className="font-mono text-neon-teal text-sm mb-1">$ ls technologies/</div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs font-mono text-text-main bg-card-gray px-2 py-1 rounded-sm border border-border-gray">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="text-xs font-mono">{project.status}</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(project.link, '_blank')}
                      className="text-xs font-mono"
                    >
                      <ExternalLink size={14} /> $ git clone
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-neon-teal text-center">Achievements</h2>
          <p className="text-lg text-text-muted text-center mb-16">Recognition and accomplishments in cybersecurity</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-6 w-6 text-neon-teal" />
                  <h3 className="text-lg font-bold text-text-main">{achievement.title}</h3>
                </div>
                <p className="text-text-muted">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-neon-teal text-center">Certifications & Credentials</h2>
          <p className="text-lg text-text-muted text-center mb-16">Professional certifications and recognized credentials</p>

          {/* Featured CEH Certification */}
          <div className="mb-12">
            <Card className="border-2 border-neon-teal bg-gradient-to-r from-card-gray to-midnight">
              <div className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-neon-teal mb-2 font-mono">CERTIFIED ETHICAL HACKER (CEH)</h3>
                <p className="text-lg text-text-main mb-3">EC-Council</p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Badge variant="default" className="text-sm">2026 (March)</Badge>
                  <Badge variant="secondary" className="text-sm">PROFESSIONAL</Badge>
                </div>
                <div className="mt-4 p-3 bg-midnight rounded-sm border border-border-gray">
                  <p className="text-sm text-text-muted font-mono">
                    $ ceh_status --check<br/>
                    ✓ Certified Ethical Hacker<br/>
                    ✓ Penetration Testing Professional<br/>
                    ✓ Security Assessment Expert
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.filter(cert => cert.name !== 'Certified Ethical Hacker (CEH)').map((cert, index) => (
              <Card key={index} className="text-center flex flex-col">
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="text-lg font-bold mb-2 font-mono text-text-main">{cert.name}</h3>
                <p className="text-text-muted mb-3 flex-1">{cert.issuer}</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Badge variant="outline">{cert.date}</Badge>
                  <Badge variant="secondary">{cert.level}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Tools Section */}
      <section id="tools" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-neon-teal text-center">Tools & Platforms</h2>
          <p className="text-lg text-text-muted text-center mb-16">Technologies and tools I work with</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-bold mb-4 font-mono text-text-main">Pentesting Tools</h3>
              <div className="flex flex-wrap gap-2">
                {tools.pentesting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono">{tool}</Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-4 font-mono text-text-main">OSINT & Forensics</h3>
              <div className="flex flex-wrap gap-2">
                {tools.osint.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono">{tool}</Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-4 font-mono text-text-main">Scripting & Automation</h3>
              <div className="flex flex-wrap gap-2">
                {tools.scripting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono">{tool}</Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-4 font-mono text-text-main">Environments</h3>
              <div className="flex flex-wrap gap-2">
                {tools.environments.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono">{tool}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Goals Section */}
      <section id="goals" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-neon-teal text-center">Future Goals</h2>
          <div className="bg-card-gray border border-border-gray rounded-sm p-8 max-w-4xl mx-auto">
            <p className="text-lg text-text-main leading-relaxed text-center">
              My mission is to continuously sharpen my skills in ethical hacking, exploit development, 
              and advanced threat research, while contributing to organizations through bug bounty programs, 
              internal security audits, and secure coding practices. I aim to stay at the forefront of 
              cybersecurity innovation and help build a more secure digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight border-t border-border-gray py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-neon-teal mb-4">Get In Touch</h3>
            <p className="text-text-muted mb-8">Ready to collaborate on cybersecurity projects or need security consulting?</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button onClick={() => window.open('https://www.linkedin.com/in/usama-haider-1968a91a1/', '_blank')}>
                <Linkedin size={20} /> LinkedIn
              </Button>
              <Button variant="outline" onClick={() => window.open('https://github.com/Haider899', '_blank')}>
                <Github size={20} /> GitHub
              </Button>
              <Button variant="outline" onClick={() => window.open('mailto:haiderusama707@gmail.com', '_blank')}>
                <Mail size={20} /> Email
              </Button>
            </div>
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-border-gray to-transparent"></div>
            <p className="text-sm text-text-muted">
              © 2026 Usama Haider. Cybersecurity Researcher & Software Developer.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
