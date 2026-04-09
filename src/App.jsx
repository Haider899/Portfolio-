import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
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

// --- HELPER COMPONENTS (Moved outside to fix focus issues) ---

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
  const baseStyle = 'inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-[0.24em] transition-all duration-300'
  const variants = {
    primary: 'text-white hover:bg-white/12 hover:border-white/25',
    outline: 'text-slate-300 hover:text-white hover:border-white/25 hover:bg-white/5'
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

const Badge = ({ children, variant = 'secondary', className = '' }) => {
  const variants = {
    secondary: 'bg-white/5 border border-white/10 text-slate-200',
    outline: 'bg-transparent border border-white/10 text-slate-300',
    default: 'bg-[#11181f] border border-white/10 text-white'
  }
  return (
    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

const Card = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={`glass-panel rounded-3xl p-6 border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.18)] ${className}`}
  >
    {children}
  </motion.div>
)

const AdvancedCard = ({ children, className = '' }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])

  return (
    <motion.div
      style={{ perspective: 1000, transformStyle: 'preserve-3d', rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={`relative group ${className}`}
    >
      <div className="h-full bg-[#0f1724]/90 border border-white/10 p-6 rounded-[1.75rem] transition-all duration-300 shadow-[0_18px_90px_rgba(0,0,0,0.24)] group-hover:border-neon-teal/50">
        {children}
      </div>
    </motion.div>
  )
}

const ProjectCard = ({ project }) => (
  <AdvancedCard>
    <div className="relative overflow-hidden rounded-[1.75rem]">
      {/* 1. The "Glass Box" (Gradient) - We keep this at z-0 so it stays in the back */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-cyan-500/30 via-sky-500/10 to-transparent opacity-80 pointer-events-none z-0" />
      
      {/* 2. The Content Wrapper - We set this to z-10 to pull it forward */}
      <div className="relative z-10 flex h-full flex-col gap-5 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              {/* 3. The "Project" Word - We set this to z-20 to be 100% sure it's on top */}
              <p className="relative z-20 text-xs uppercase tracking-[0.28em] text-white/90 font-semibold">Project</p>
              {/* Added break-words and leading-tight to handle long names */}
             <h3 className="mt-3 text-xl md:text-2xl font-bold text-white tracking-tight break-words whitespace-normal leading-tight">
               {project.title}
               </h3>
            </div>
            <Badge variant="default" className="text-[11px]">{project.status}</Badge>
          </div>
          <p className="text-slate-300 leading-relaxed">{project.description}</p>
        </div>
        
        {/* Rest of your card content... tags and button */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <Badge key={idx} variant="outline" className="text-[11px]">{tech}</Badge>
          ))}
        </div>
        <button
          onClick={() => window.open(project.link, '_blank')}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white/10 hover:border-white/20"
        >
          Inspect Source <ExternalLink size={14} />
        </button>
      </div>
    </div>
  </AdvancedCard>
)

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')

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
      description: 'Received at Doart Energy for contributions in automation and ERP development'
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

  const navItems = ['home', 'skills', 'services', 'projects', 'achievements', 'certifications', 'tools', 'goals']

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

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Inquiry from ${contactName || 'Portfolio Visitor'}`)
    const body = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`)
    window.location.href = `mailto:haiderusama707@gmail.com?subject=${subject}&body=${body}`
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
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

      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalScrollHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalScrollHeight) * 100)) : 0
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#070c12] text-white relative">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="fixed inset-0 bg-grid-animate pointer-events-none -z-10" />
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071018]/95 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Usama</p>
              <p className="text-lg font-semibold tracking-wide">Haider</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${activeSection === item ? 'bg-white/12 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#071018]/95 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.22em] transition ${activeSection === item ? 'bg-white/12 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

<motion.section
  id="home"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: 'easeOut' }}

  className="relative pt-32 pb-24 overflow-hidden min-h-screen"
>
  <div className="absolute inset-x-0 top-20 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(110,158,198,0.18),_transparent_36%)] pointer-events-none" />
  
  <div className="absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_65%)] blur-3xl pointer-events-none" />
  
  <div className="mx-auto max-w-6xl px-6">
    <div className="flex flex-col gap-12">
      <div className="space-y-8">
        {/* This tag should now be fully visible below your navbar */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.26em] text-slate-300">
          Cybersecurity Professional | Certified Ethical Hacker (CEH) | Software Developer
        </div>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
          USAMA <span className="text-white">HAIDER</span>
        </h1>
        
                <div className="text-xl font-mono text-slate-400 mt-4 h-8">
                  <TypeAnimation
                    sequence={['// Penetration Tester', 1000, '// Certified Ethical Hacker', 1000, '// Security Researcher', 1000, '// Software Developer', 1000]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                  />
                </div>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl mt-4">
                  I am a Cybersecurity Researcher, Ethical Hacker, and Software Developer with hands-on penetration testing, OSINT investigations, and secure software development. I specialize in identifying vulnerabilities, securing infrastructures, and building tools that enhance cyber defense.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => scrollToSection('projects')} className="bg-white/10 hover:bg-white/15">Explore Projects</Button>
                  <Button variant="outline" onClick={() => scrollToSection('contact')}>Request Assessment</Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ y: -6, scale: 1.06, rotateX: 4, rotateY: -4 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    onClick={() => window.open('https://www.linkedin.com/in/usama-haider-1968a91a1/', '_blank')}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={22} />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ y: -6, scale: 1.06, rotateX: 4, rotateY: -4 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    onClick={() => window.open('https://github.com/Haider899', '_blank')}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github size={22} />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ y: -6, scale: 1.06, rotateX: 4, rotateY: -4 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    onClick={() => window.open('mailto:haiderusama707@gmail.com', '_blank')}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300"
                    aria-label="Email"
                  >
                    <Mail size={22} />
                  </motion.button>
                </div>
              </div>

              <div className="relative">
                <div className="glass-panel rounded-[2.5rem] p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Capabilities</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">Professional Edge</h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-slate-300">
                      CEH
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <div className="hex-cell">
                      <div className="icon-wrap"><Shield className="h-5 w-5" /></div>
                      <p className="mt-4 text-sm font-semibold text-white text-center">Security Research</p>
                    </div>
                    <div className="hex-cell">
                      <div className="icon-wrap"><Code className="h-5 w-5" /></div>
                      <p className="mt-4 text-sm font-semibold text-white text-center">Secure Development</p>
                    </div>
                    <div className="hex-cell">
                      <div className="icon-wrap"><Search className="h-5 w-5" /></div>
                      <p className="mt-4 text-sm font-semibold text-white text-center">OSINT Intelligence</p>
                    </div>
                    <div className="hex-cell">
                      <div className="icon-wrap"><Target className="h-5 w-5" /></div>
                      <p className="mt-4 text-sm font-semibold text-white text-center">Penetration Testing</p>
                    </div>
                    <div className="hex-cell">
                      <div className="icon-wrap"><GitBranch className="h-5 w-5" /></div>
                      <p className="mt-4 text-sm font-semibold text-white text-center">Version Control</p>
                    </div>
                    <div className="hex-cell">
                      <div className="icon-wrap"><Wrench className="h-5 w-5" /></div>
                      <p className="mt-4 text-sm font-semibold text-white text-center">Automation</p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-white/10 bg-[#06111f]/85 p-6 text-slate-300 shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Mission Control</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">Live attack simulation</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">Recon</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">Automation</span>
                      </div>
                    </div>
                    <div className="terminal-panel space-y-3 text-[13px] leading-6">
                      <div className="terminal-line"><span className="terminal-prompt">root@haider</span><span>Initializing multi-vector scan... <span className="text-slate-400">[OK]</span></span></div>
                      <div className="terminal-line"><span className="terminal-prompt">system</span><span>Loading threat modules & Kali payloads... <span className="text-slate-400">[READY]</span></span></div>
                      <div className="terminal-line"><span className="terminal-prompt">scanner</span><span>Running Sentinel-Scan against target assets...</span></div>
                      <div className="terminal-line"><span className="terminal-prompt">report</span><span>Output encrypted logs & risk summary to dashboard</span></div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Detection</p>
                        <p className="mt-2 text-2xl font-semibold text-white">99%</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Tools</p>
                        <p className="mt-2 text-2xl font-semibold text-white">70+</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Response</p>
                        <p className="mt-2 text-2xl font-semibold text-white">24h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </motion.section>
<motion.section
  id="skills"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="py-20"
>
  <div className="mx-auto max-w-[1400px] px-6 w-full">
    {/* Main "Sentinel" Glass Panel */}
    <div className="bg-[#060b13]/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
      
      <div className="mb-12 border-l-2 border-neon-teal pl-6">
        <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Expertise_Matrix</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Skills & Expertise</h2>
        <p className="mt-4 max-w-3xl text-base text-slate-300">A modern security profile with hands-on expertise in cybersecurity, tooling, automation, and programming.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* We keep these cards dark/transparent to let the main panel theme shine through */}
        <AdvancedCard className="bg-white/5 border-white/5 space-y-5 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-white">Offensive Security</h3>
          <ul className="space-y-3 text-slate-300">
            {skills.cybersecurity.map((skill, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-neon-teal shadow-[0_0_8px_rgba(20,255,255,0.5)]" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </AdvancedCard>

        <AdvancedCard className="bg-white/5 border-white/5 space-y-5 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-white">Development & Automation</h3>
          <ul className="space-y-3 text-slate-300">
            {skills.programming.map((skill, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-neon-teal shadow-[0_0_8px_rgba(20,255,255,0.5)]" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </AdvancedCard>
      </div>
    </div>
  </div>
</motion.section>

      <div className="section-divider"></div>

      {/* Services Section */}
      <motion.section
          id="services"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
        <div className="mx-auto max-w-[1400px] px-6 w-full">
<div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Service_Pipeline</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Professional Services</h2>
            <p className="mt-4 text-sm text-slate-400 font-light">Professional cybersecurity and development services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-slate-500 rounded-sm mt-2 flex-none"></div>
                  <p className="text-slate-300 leading-relaxed font-light">{service}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="section-divider"></div>

<motion.section
  id="projects"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="py-20"
>
  {/* Expanded width to 1400px to match other sections */}
  <div className="mx-auto max-w-[1400px] px-6 w-full">
    
    {/* Main Glass Panel Wrapper - Matches Sentinel-Scan theme */}
    <div className="bg-[#060b13]/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12">
      
      <div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
        <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Portfolio_Hub</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Projects</h2>
        <p className="mt-4 max-w-3xl text-base text-slate-300">Selected security tools and research projects with public GitHub repositories.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  </div>
</motion.section>

      <div className="section-divider"></div>

<motion.section
          id="achievements"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-20"
        >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Credential_Stack</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Achievements</h2>
            <p className="mt-4 max-w-3xl text-base text-slate-300">Proven accomplishments in security research, automation, and professional development.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {achievements.map((achievement, index) => (
              <AdvancedCard key={index} className="group transition hover:border-neon-teal/40">
                <div className="mb-4 flex items-center gap-3 group">
                  <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-800 text-slate-500 transition-colors group-hover:text-neon-teal">
                    <Award className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                </div>
                <div className="border-b border-dashed border-white/10 pb-5 mb-5" />
                <p className="text-slate-300 leading-relaxed font-mono">{achievement.description}</p>
              </AdvancedCard>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="section-divider"></div>

      {/* Certifications Section */}
      <motion.section
          id="certifications"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
        <div className="max-w-6xl mx-auto px-6">
<div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Certification_Roster</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Certifications</h2>
            <p className="mt-4 text-sm text-slate-400 font-light">Professional certifications and recognized credentials</p>
          </div>

          {/* Featured CEH Certification */}
          <div className="mb-16">
            <AdvancedCard className="border border-slate-500/40 shadow-[0_0_20px_rgba(0,163,204,0.15)]">
              <div className="text-center py-8">
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-3xl font-bold text-slate-200 mb-3 font-medium uppercase tracking-wide">Certified Ethical Hacker</h3>
                <p className="text-base text-slate-400 mb-4 font-light">EC-Council</p>
                <div className="flex justify-center gap-4 flex-wrap mb-6">
                  <Badge variant="default" className="text-xs">March 2026</Badge>
                  <Badge variant="secondary" className="text-xs">PROFESSIONAL</Badge>
                </div>
                <div className="mt-6 p-4 bg-[#0a0a0a]/40 backdrop-blur-md rounded-none border border-white/5 text-left max-w-2xl mx-auto">
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    ✓ Advanced Penetration Testing Expertise<br/>
                    ✓ Network & Application Security Assessment<br/>
                    ✓ Ethical Hacking & System Exploitation<br/>
                    ✓ Cryptography & Digital Forensics
                  </p>
                </div>
              </div>
            </AdvancedCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.filter(cert => cert.name !== 'Certified Ethical Hacker (CEH)').map((cert, index) => (
              <AdvancedCard key={index} className="text-center flex flex-col">
                <div className="text-5xl mb-4">{cert.icon}</div>
                <h3 className="text-lg font-bold mb-2 font-mono text-white uppercase tracking-wider text-sm">{cert.name}</h3>
                <p className="text-slate-300 mb-4 flex-1">{cert.issuer}</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Badge variant="outline">{cert.date}</Badge>
                  <Badge variant="secondary">{cert.level}</Badge>
                </div>
              </AdvancedCard>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="section-divider"></div>

      {/* Tools Section */}
      <motion.section
          id="tools"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 border-l-2 border-neon-teal pl-6">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Tools_Network</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Tools & Platforms</h2>
            <p className="mt-4 text-sm text-slate-400 font-light">Technologies and tools I work with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdvancedCard>
              <h3 className="text-lg font-bold mb-6 font-mono text-white uppercase tracking-wider text-sm">Penetration Testing</h3>
              <div className="flex flex-wrap gap-3">
                {tools.pentesting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </AdvancedCard>

            <AdvancedCard>
              <h3 className="text-lg font-bold mb-6 font-mono text-white uppercase tracking-wider text-sm">OSINT & Forensics</h3>
              <div className="flex flex-wrap gap-3">
                {tools.osint.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </AdvancedCard>

            <AdvancedCard>
              <h3 className="text-lg font-bold mb-6 font-mono text-white uppercase tracking-wider text-sm">Scripting & Automation</h3>
              <div className="flex flex-wrap gap-3">
                {tools.scripting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </AdvancedCard>

            <AdvancedCard>
              <h3 className="text-lg font-bold mb-6 font-mono text-white uppercase tracking-wider text-sm">Environments</h3>
              <div className="flex flex-wrap gap-3">
                {tools.environments.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </AdvancedCard>
          </div>
        </div>
      </motion.section>

      <div className="section-divider"></div>

      {/* Contact Section */}
      <motion.section
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Contact_Protocol</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Get in Touch</h2>
            <p className="mt-4 text-sm text-slate-400 font-light">I’m available for consulting, collaboration, and security research opportunities.</p>
          </div>

          <Card className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Location</p>
                <p className="text-lg text-white">Remote / Worldwide</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Email</p>
                <p className="text-lg text-white">haiderusama707@gmail.com</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Connect</p>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    onClick={() => window.open('https://www.linkedin.com/in/usama-haider-1968a91a1/', '_blank')}
                    aria-label="LinkedIn"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
                  >
                    <Linkedin size={20} />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    onClick={() => window.open('https://github.com/Haider899', '_blank')}
                    aria-label="GitHub"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
                  >
                    <Github size={20} />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    onClick={() => window.open('mailto:haiderusama707@gmail.com', '_blank')}
                    aria-label="Email"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
                  >
                    <Mail size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#06111f]/75 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Fast response</p>
                <p className="mt-3 text-lg text-white">Share a quick brief and I’ll reply with next steps, pricing, and availability.</p>
                <Button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6">Start Your Request</Button>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-slate-300 text-base">Ready to collaborate on a security assessment, automation project, or research engagement? Send your requirements below.</p>
              <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm uppercase tracking-[0.22em] text-slate-400">Name</span>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="contact-input mt-2 w-full"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm uppercase tracking-[0.22em] text-slate-400">Email</span>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="contact-input mt-2 w-full"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm uppercase tracking-[0.22em] text-slate-400">Message</span>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="contact-input mt-2 min-h-[160px] w-full resize-none"
                    placeholder="Tell me about your project or collaboration request..."
                    required
                  />
                </label>
                <Button type="submit" variant="primary" className="w-full justify-center">Send Message</Button>
              </form>
            </div>
          </Card>
        </div>
      </motion.section>

      <footer className="border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-300">© 2026 Usama Haider.</p>
              <p className="text-xs text-slate-500">Designed for impact. Built for security.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-400">
              <button onClick={() => scrollToSection('home')} className="transition hover:text-white">Home</button>
              <button onClick={() => scrollToSection('projects')} className="transition hover:text-white">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="transition hover:text-white">Contact</button>
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
