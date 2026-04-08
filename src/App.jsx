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
    const baseStyle = 'px-8 py-3 font-medium transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border rounded-none uppercase text-xs tracking-widest'
    const variants = {
      primary: 'border border-white/20 bg-transparent text-text-main hover:bg-white hover:text-black',
      outline: 'border border-white/20 bg-transparent text-text-main hover:bg-white/10 hover:border-white/40'
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
    <div className={`bg-[#1A1A1B]/50 backdrop-blur-md border border-white/10 rounded-none p-6 hover:border-white/20 transition-all ${className}`}>
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
      <nav className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-neon-teal font-mono tracking-wider">USAMA HAIDER</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {['home', 'skills', 'services', 'projects', 'achievements', 'certifications', 'tools', 'goals'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-4 py-2 rounded-none text-xs font-medium transition-all uppercase tracking-widest border ${
                      activeSection === item 
                        ? 'text-neon-teal border-neon-teal/50 bg-white/5' 
                        : 'text-text-muted border-transparent hover:text-text-main hover:border-white/20'
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
          <div className="md:hidden bg-[#1A1A1B]/50 backdrop-blur-md border-t border-white/10">
            <div className="px-4 pt-4 pb-4 space-y-2">
              {['home', 'skills', 'services', 'projects', 'achievements', 'certifications', 'tools', 'goals'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block px-4 py-2 rounded-none text-sm font-medium w-full text-left transition-all uppercase tracking-widest border ${
                    activeSection === item 
                      ? 'text-neon-teal border-neon-teal/50 bg-white/5' 
                      : 'text-text-muted border-transparent hover:text-text-main hover:border-white/20'
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-left">
            <div className="floating-animation mb-8 w-fit">
              <Shield className="h-24 w-24 text-neon-teal" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-text-main tracking-tighter">Usama Haider</h1>
            <p className="text-2xl md:text-3xl text-neon-teal mb-6 font-mono tracking-wide">Cybersecurity Researcher & Software Developer</p>
            <p className="text-lg text-text-muted max-w-3xl mb-12 leading-relaxed">
              I am a Cybersecurity Researcher, Ethical Hacker, and Software Developer with hands-on experience in penetration testing, 
              ethical hacking, OSINT investigations, and secure software development. With a strong background in programming, 
              digital forensics, and system security, I specialize in identifying vulnerabilities, securing infrastructures, 
              and building tools that enhance cyber defense.
            </p>
            <p className="text-base text-text-muted max-w-2xl mb-12">
              Currently working at <span className="text-neon-teal font-semibold">Doart Energy</span>, where I received the <span className="text-neon-teal font-semibold">Programming Excellence Award</span> for my contributions 
              in automation, tool development, and system optimization. Recently certified as a <span className="text-neon-teal font-semibold">Certified Ethical Hacker (CEH)</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start flex-wrap">
              <Button onClick={() => window.open('https://www.linkedin.com/in/usama-haider-1968a91a1/', '_blank')}>
                <Linkedin size={16} /> LinkedIn
              </Button>
              <Button variant="outline" onClick={() => window.open('https://github.com/Haider899', '_blank')}>
                <Github size={16} /> GitHub
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('projects')}>
                Projects <ChevronDown size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-2 text-neon-teal tracking-tighter">Skills & Expertise</h2>
          <p className="text-lg text-text-muted mb-16">Comprehensive cybersecurity and development capabilities</p>

          {/* Cybersecurity Skills - Hexagonal Grid */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-text-main mb-8 uppercase tracking-widest text-sm">Cybersecurity</h3>
            <div className="hex-grid">
              {skills.cybersecurity.map((skill, index) => (
                <div key={index} className="hex-item group">
                  <div className="hex-label">{skill}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Skills - Hexagonal Grid */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-text-main mb-8 uppercase tracking-widest text-sm">Tools & Technologies</h3>
            <div className="hex-grid">
              {skills.tools.map((skill, index) => (
                <div key={index} className="hex-item group">
                  <div className="hex-label">{skill}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testing Skills - Hexagonal Grid */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-text-main mb-8 uppercase tracking-widest text-sm">Testing Expertise</h3>
            <div className="hex-grid">
              {skills.testing.map((skill, index) => (
                <div key={index} className="hex-item group">
                  <div className="hex-label">{skill}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Programming Skills - Hexagonal Grid */}
          <div>
            <h3 className="text-2xl font-bold text-text-main mb-8 uppercase tracking-widest text-sm">Programming</h3>
            <div className="hex-grid">
              {skills.programming.map((skill, index) => (
                <div key={index} className="hex-item group">
                  <div className="hex-label">{skill}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-2 text-neon-teal tracking-tighter">Services</h2>
          <p className="text-lg text-text-muted mb-16">Professional cybersecurity and development services</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-neon-teal rounded-sm mt-2 flex-none"></div>
                  <p className="text-text-main leading-relaxed">{service}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-2 text-neon-teal tracking-tighter">Projects</h2>
          <p className="text-lg text-text-muted mb-16">Real-world cybersecurity tools and security research</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="flex flex-col bg-[#1A1A1B]/40 border-white/10">
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-md px-4 py-3 border-b border-white/5 rounded-t-none -m-6 mb-0 -mx-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">root@{project.title.toLowerCase()}</span>
                  <div className="w-12"></div>
                </div>
                
                {/* Terminal Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-mono font-bold text-neon-teal mb-3">{project.title}</h3>
                  <p className="text-sm text-text-muted mb-4 leading-relaxed flex-1">{project.description}</p>
                  <div className="mb-4">
                    <div className="font-mono text-neon-teal text-xs mb-2">$ languages:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs font-mono text-text-main bg-[#1A1A1B]/60 px-2 py-1 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <Badge variant="default" className="text-xs font-mono">{project.status}</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(project.link, '_blank')}
                      className="!px-4 !py-2 text-xs"
                    >
                      <ExternalLink size={14} /> Clone
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
      <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-2 text-neon-teal tracking-tighter">Achievements</h2>
          <p className="text-lg text-text-muted mb-16">Recognition and accomplishments in cybersecurity</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <div className="flex items-start gap-4 mb-3">
                  <Award className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-text-main">{achievement.title}</h3>
                </div>
                <p className="text-text-muted leading-relaxed">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-2 text-neon-teal tracking-tighter">Certifications</h2>
          <p className="text-lg text-text-muted mb-16">Professional certifications and recognized credentials</p>

          {/* Featured CEH Certification */}
          <div className="mb-16">
            <Card className="border-2 border-neon-teal/50 bg-gradient-to-br from-[#1A1A1B]/60 to-[#0a0a0a]/40">
              <div className="text-center py-8">
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-3xl font-bold text-neon-teal mb-3 font-mono uppercase tracking-widest">Certified Ethical Hacker</h3>
                <p className="text-lg text-text-main mb-4 font-semibold">EC-Council</p>
                <div className="flex justify-center gap-4 flex-wrap mb-6">
                  <Badge variant="default" className="text-sm">March 2026</Badge>
                  <Badge variant="secondary" className="text-sm">PROFESSIONAL</Badge>
                </div>
                <div className="mt-6 p-4 bg-[#0a0a0a]/60 backdrop-blur-md rounded-none border border-white/10 text-left max-w-2xl mx-auto">
                  <p className="text-sm text-text-muted font-mono leading-relaxed">
                    ✓ Advanced Penetration Testing Expertise<br/>
                    ✓ Network & Application Security Assessment<br/>
                    ✓ Ethical Hacking & System Exploitation<br/>
                    ✓ Cryptography & Digital Forensics
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.filter(cert => cert.name !== 'Certified Ethical Hacker (CEH)').map((cert, index) => (
              <Card key={index} className="text-center flex flex-col">
                <div className="text-5xl mb-4">{cert.icon}</div>
                <h3 className="text-lg font-bold mb-2 font-mono text-text-main uppercase tracking-wider text-sm">{cert.name}</h3>
                <p className="text-text-muted mb-4 flex-1">{cert.issuer}</p>
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
      <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-2 text-neon-teal tracking-tighter">Tools & Platforms</h2>
          <p className="text-lg text-text-muted mb-16">Technologies and tools I work with</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-bold mb-6 font-mono text-text-main uppercase tracking-wider text-sm">Penetration Testing</h3>
              <div className="flex flex-wrap gap-3">
                {tools.pentesting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-6 font-mono text-text-main uppercase tracking-wider text-sm">OSINT & Forensics</h3>
              <div className="flex flex-wrap gap-3">
                {tools.osint.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-6 font-mono text-text-main uppercase tracking-wider text-sm">Scripting & Automation</h3>
              <div className="flex flex-wrap gap-3">
                {tools.scripting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-6 font-mono text-text-main uppercase tracking-wider text-sm">Environments</h3>
              <div className="flex flex-wrap gap-3">
                {tools.environments.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Goals Section */}
      <section id="goals" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-neon-teal tracking-tighter">Future Vision</h2>
          <Card className="max-w-4xl">
            <p className="text-lg text-text-main leading-relaxed text-center">
              My mission is to continuously sharpen my skills in ethical hacking, exploit development, 
              and advanced threat research, while contributing to organizations through bug bounty programs, 
              internal security audits, and secure coding practices. I aim to stay at the forefront of 
              cybersecurity innovation and help build a more secure digital world.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1A1A1B]/30 to-[#0a0a0a]/80 border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neon-teal mb-4">Connect With Me</h3>
            <p className="text-text-muted mb-8">Interested in collaborating on cybersecurity projects or need security consulting?</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button onClick={() => window.open('https://www.linkedin.com/in/usama-haider-1968a91a1/', '_blank')}>
                <Linkedin size={16} /> LinkedIn
              </Button>
              <Button variant="outline" onClick={() => window.open('https://github.com/Haider899', '_blank')}>
                <Github size={16} /> GitHub
              </Button>
              <Button variant="outline" onClick={() => window.open('mailto:haiderusama707@gmail.com', '_blank')}>
                <Mail size={16} /> Email
              </Button>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-sm text-text-muted text-center">
              © 2026 Usama Haider. Cybersecurity Researcher & Software Developer.<br/>
              <span className="text-xs">Designed for impact. Built for security.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
