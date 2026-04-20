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

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.52 0 .2 5.32.2 11.86c0 2.1.55 4.15 1.6 5.95L0 24l6.38-1.67a11.78 11.78 0 0 0 5.68 1.45h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.14-3.41-8.44ZM12.07 21.77h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.88 9.88 0 0 1-1.51-5.25c0-5.46 4.45-9.91 9.92-9.91 2.64 0 5.13 1.03 6.99 2.9a9.84 9.84 0 0 1 2.91 7c0 5.47-4.45 9.92-9.9 9.92Z" fill="currentColor"/>
    <path d="M17.5 14.34c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.36.44-.54.15-.18.2-.31.3-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.66-.94-2.28-.25-.6-.51-.52-.69-.53h-.58c-.2 0-.51.08-.77.38s-1 1-.1 2.45c.9 1.46 1.29 2.86 2.77 4.11 1.48 1.24 2.06 1.57 3.52 2.14 1.46.56 1.76.47 2.08.44.31-.03 1-.41 1.14-.8.14-.38.14-.71.1-.79-.05-.08-.25-.13-.54-.28Z" fill="currentColor"/>
  </svg>
)

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
      <div className="flex h-full flex-col gap-5 p-6">
        <div className="flex flex-col gap-4">
          <div className="rounded-[1.5rem] bg-gradient-to-r from-cyan-500/20 via-sky-500/8 to-transparent px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">Project</p>
                <h3 className="mt-3 max-w-full text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl [overflow-wrap:anywhere]">
               {project.title}
                </h3>
              </div>
              <Badge variant="default" className="shrink-0 text-[11px]">{project.status}</Badge>
            </div>
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

const UnifiedCard = ({ eyebrow, title, badge, icon, children, footer, center = false }) => (
  <AdvancedCard className="h-full">
    <div className={`flex h-full flex-col gap-5 ${center ? 'text-center' : ''}`}>
      <div className="rounded-[1.5rem] bg-gradient-to-r from-cyan-500/20 via-sky-500/8 to-transparent px-5 py-5">
        <div className={`flex gap-3 ${center ? 'flex-col items-center text-center' : 'items-start justify-between'}`}>
          <div className={`${center ? 'w-full' : 'min-w-0 flex-1'}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">{eyebrow}</p>
            <div className={`mt-3 flex gap-3 ${center ? 'flex-col items-center' : 'items-start'}`}>
              {icon ? (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-200">
                  {icon}
                </span>
              ) : null}
              <h3 className="min-w-0 max-w-full text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl [overflow-wrap:anywhere]">
                {title}
              </h3>
            </div>
          </div>
          {badge ? <Badge variant="default" className="shrink-0 text-[11px]">{badge}</Badge> : null}
        </div>
      </div>
      <div className={`flex flex-1 flex-col gap-5 ${center ? 'items-center' : ''}`}>
        {children}
        {footer ? <div className={`mt-auto ${center ? 'flex justify-center' : ''}`}>{footer}</div> : null}
      </div>
    </div>
  </AdvancedCard>
)

function App() {
  const [isBooting, setIsBooting] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeConsoleMode, setActiveConsoleMode] = useState('recon')
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
      'Web Application Security Testing'
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

  const capabilityItems = [
    { title: 'Security Research', icon: Shield, accent: 'Threat Intel' },
    { title: 'Secure Development', icon: Code, accent: 'AppSec' },
    { title: 'OSINT Intelligence', icon: Search, accent: 'Discovery' },
    { title: 'Penetration Testing', icon: Target, accent: 'Offensive' },
    { title: 'Version Control', icon: GitBranch, accent: 'Workflow' },
    { title: 'Automation', icon: Wrench, accent: 'Scale' }
  ]

  const consoleModes = {
    recon: {
      title: 'Recon sweep',
      description: 'Enumerating surface area, indexing public assets, and correlating findings into a clean attack map.',
      tags: ['Recon', 'Surface Map'],
      lines: [
        { label: 'root@haider', text: 'Booting Sentinel-Scan workspace', status: '[OK]' },
        { label: 'enum', text: 'Resolving subdomains and exposed services', status: '[42 HOSTS]' },
        { label: 'osint', text: 'Cross-linking GitHub, crt.sh, and passive DNS', status: '[LIVE]' },
        { label: 'report', text: 'Building prioritized recon bundle for manual review', status: '[READY]' }
      ],
      stats: [
        { label: 'Targets', value: '42' },
        { label: 'Signals', value: '186' },
        { label: 'Noise Cut', value: '71%' }
      ]
    },
    exploit: {
      title: 'Exploit lab',
      description: 'Validating findings in a controlled workflow with repeatable checks and safer reproduction notes.',
      tags: ['Exploit', 'Validation'],
      lines: [
        { label: 'payload', text: 'Staging proof-of-concept vectors in isolated lab', status: '[SAFE]' },
        { label: 'proxy', text: 'Replaying requests through instrumented intercept stack', status: '[TRACE]' },
        { label: 'scanner', text: 'Verifying auth, headers, and input handling regressions', status: '[RUNNING]' },
        { label: 'result', text: 'Capturing exploit path with remediation markers', status: '[LOGGED]' }
      ],
      stats: [
        { label: 'Vectors', value: '09' },
        { label: 'Confirmed', value: '03' },
        { label: 'Risk', value: 'High' }
      ]
    },
    automate: {
      title: 'Automation pipeline',
      description: 'Chaining scripts, parsers, and response actions into a faster operator workflow.',
      tags: ['Automation', 'Response'],
      lines: [
        { label: 'queue', text: 'Dispatching Python and PowerShell job set', status: '[SYNCED]' },
        { label: 'parser', text: 'Normalizing outputs into dashboard-ready JSON', status: '[CLEAN]' },
        { label: 'watcher', text: 'Triggering alert hooks for critical findings', status: '[ARMED]' },
        { label: 'export', text: 'Shipping encrypted evidence pack and summary', status: '[DONE]' }
      ],
      stats: [
        { label: 'Tools', value: '70+' },
        { label: 'Turnaround', value: '24h' },
        { label: 'Coverage', value: '99%' }
      ]
    }
  }

  const heroHexItems = [
    { title: 'CEH', subtitle: 'Certified' },
    { title: 'Python', subtitle: 'Automation' },
    { title: '</>', subtitle: 'Secure Code' },
    { title: 'OSINT', subtitle: 'Intel' },
    { title: 'CLI', subtitle: 'Terminal' },
    { title: 'React', subtitle: 'UI Systems' }
  ]

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
    const bootTimer = window.setTimeout(() => setIsBooting(false), 2400)
    return () => window.clearTimeout(bootTimer)
  }, [])

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
      <div className={`boot-sequence ${isBooting ? 'boot-sequence--active' : 'boot-sequence--hidden'}`}>
        <div className="boot-sequence__panel">
          <p className="boot-sequence__eyebrow">Initializing</p>
          <div className="boot-sequence__bar">
            <span className="boot-sequence__bar-fill" />
          </div>
          <div className="boot-sequence__lines">
            <p>Loading operator profile...</p>
            <p>Mounting secure interface...</p>
            <p>Synchronizing mission modules...</p>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="fixed inset-0 bg-grid-animate pointer-events-none -z-10" />
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071018]/95 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
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
            <div className="mx-auto max-w-[1600px] px-6 py-4 space-y-2">
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
  className="hero-shell relative pt-32 pb-24 overflow-hidden min-h-screen"
>
  <div className="hero-shell__mist pointer-events-none" />
  <div className="hero-shell__mesh pointer-events-none" />
  <div className="hero-shell__beam pointer-events-none" />

  <div className="mx-auto max-w-[1600px] px-6">
    <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
      <div className="space-y-7">
        <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-300 sm:rounded-full sm:text-xs sm:tracking-[0.26em]">
          Cybersecurity Professional | Certified Ethical Hacker (CEH) | Software Engineer
        </div>
        <div className="space-y-4">
          <p className="hero-shell__kicker">Operator Identity</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            USAMA <span className="text-slate-300">HAIDER</span>
          </h1>
        </div>
        <div className="mt-2 h-12 text-base font-mono text-slate-300 sm:h-8 sm:text-xl">
          <TypeAnimation
            sequence={['// Penetration Tester', 1000, '// Certified Ethical Hacker', 1000, '// Security Researcher', 1000, '// Software Developer', 1000]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-xl">
          I am a Cybersecurity Researcher, Ethical Hacker, and Software Developer with hands-on penetration testing, ethical hacking, OSINT investigations, and secure software development. I specialize in identifying vulnerabilities, securing infrastructures, and building tools that enhance cyber defense.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button onClick={() => scrollToSection('projects')} className="hero-shell__button w-full justify-center bg-white/10 hover:bg-white/15 sm:w-auto">Explore Projects</Button>
          <Button variant="outline" onClick={() => scrollToSection('contact')} className="hero-shell__button w-full justify-center sm:w-auto">Request Assessment</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
          <motion.button
            type="button"
            whileHover={{ y: -6, scale: 1.06, rotateX: 4, rotateY: -4 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            onClick={() => window.open('https://www.linkedin.com/in/usama-haider-1968a91a1/', '_blank')}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 sm:h-14 sm:w-14"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 sm:h-14 sm:w-14"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 sm:h-14 sm:w-14"
            aria-label="Email"
          >
            <Mail size={22} />
          </motion.button>
        </div>
        <div className="hero-ops-panel">
          <div className="hero-ops-panel__header">
            <span className="hero-ops-panel__eyebrow">Operator Snapshot</span>
            <span className="hero-ops-panel__status">Active</span>
          </div>
          <div className="hero-ops-panel__grid">
            <div className="hero-ops-stat">
              <span className="hero-ops-stat__label">Focus</span>
              <span className="hero-ops-stat__value">AppSec</span>
            </div>
            <div className="hero-ops-stat">
              <span className="hero-ops-stat__label">Mode</span>
              <span className="hero-ops-stat__value">Research</span>
            </div>
            <div className="hero-ops-stat">
              <span className="hero-ops-stat__label">Stack</span>
              <span className="hero-ops-stat__value">Python / React</span>
            </div>
          </div>
          <div className="hero-ops-panel__terminal">
            <span className="terminal-prompt">live</span>
            <span className="terminal-command">$</span>
            <span className="text-slate-300">tracking signals, building tools, shipping secure systems</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-visual__brand">
          <div className="hero-visual__brand-mark">
            <Shield className="h-8 w-8" />
          </div>
        </div>
        <div className="hero-visual__grid">
          {heroHexItems.map((item, index) => (
            <div key={item.title} className={`hero-hex hero-hex--${index + 1}`}>
              <div className="hero-hex__inner">
                <span className="hero-hex__title">{item.title}</span>
                <span className="hero-hex__subtitle">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="terminal-shell hero-visual__terminal rounded-[1.5rem] border border-white/10 bg-[#0a1117]/80 p-4 text-slate-300 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:rounded-[2rem] sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Mission Control</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{consoleModes[activeConsoleMode].title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{consoleModes[activeConsoleMode].description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(consoleModes).map(([mode, config]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveConsoleMode(mode)}
                  className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.28em] transition ${
                    activeConsoleMode === mode
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {config.tags[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {consoleModes[activeConsoleMode].tags.map((tag) => (
              <span key={tag} className="rounded-full border border-cyan-400/15 bg-cyan-400/8 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-100">
                {tag}
              </span>
            ))}
          </div>
          <div className="terminal-panel space-y-3 text-[13px] leading-6">
            <div className="terminal-toolbar">
              <span className="terminal-dot terminal-dot--red" />
              <span className="terminal-dot terminal-dot--amber" />
              <span className="terminal-dot terminal-dot--green" />
              <span className="terminal-toolbar__title">operator@portfolio:~/{activeConsoleMode}</span>
            </div>
            {consoleModes[activeConsoleMode].lines.map((line) => (
              <div key={`${activeConsoleMode}-${line.label}-${line.text}`} className="terminal-line">
                <span className="terminal-prompt">{line.label}</span>
                <span className="terminal-command">$</span>
                <span className="flex-1">{line.text}</span>
                <span className="text-slate-500">{line.status}</span>
              </div>
            ))}
            <div className="terminal-line terminal-line--cursor">
              <span className="terminal-prompt">shell</span>
              <span className="terminal-command">$</span>
              <span className="text-slate-400">awaiting operator input</span>
              <span className="terminal-cursor" />
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {consoleModes[activeConsoleMode].stats.map((stat) => (
              <div key={`${activeConsoleMode}-${stat.label}`} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
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
  <div className="mx-auto max-w-[1600px] px-6 w-full">
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
        <div className="mx-auto max-w-[1600px] px-6 w-full">
<div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Service_Pipeline</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Professional Services</h2>
            <p className="mt-4 text-sm text-slate-400 font-light">Professional cybersecurity and development services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <UnifiedCard
                key={index}
                eyebrow="Service"
                title={service}
                badge="Available"
                icon={<Wrench className="h-5 w-5" />}
              >
                <p className="text-slate-300 leading-relaxed">
                  Focused delivery for security, automation, and software engagements with a project-first workflow.
                </p>
              </UnifiedCard>
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
  <div className="mx-auto max-w-[1600px] px-6 w-full">
    
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
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Credential_Stack</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Achievements</h2>
            <p className="mt-4 max-w-3xl text-base text-slate-300">Proven accomplishments in security research, automation, and professional development.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {achievements.map((achievement, index) => (
              <UnifiedCard
                key={index}
                eyebrow="Achievement"
                title={achievement.title}
                badge="Highlighted"
                icon={<Award className="h-5 w-5" />}
              >
                <p className="text-slate-300 leading-relaxed">{achievement.description}</p>
              </UnifiedCard>
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
        <div className="max-w-[1600px] mx-auto px-6">
<div className="mb-12 border-l-2 border-neon-teal pl-6 section-heading">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Certification_Roster</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Certifications</h2>
            <p className="mt-4 text-sm text-slate-400 font-light">Professional certifications and recognized credentials</p>
          </div>

          {/* Featured CEH Certification */}
          <div className="mb-16">
            <UnifiedCard
              eyebrow="Certification"
              title="Certified Ethical Hacker"
              badge="Professional"
              icon={<Award className="h-5 w-5" />}
            >
              <p className="text-slate-300 leading-relaxed">EC-Council credential issued in March 2026.</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline">Advanced Penetration Testing</Badge>
                <Badge variant="outline">Application Security</Badge>
                <Badge variant="outline">System Exploitation</Badge>
                <Badge variant="outline">Digital Forensics</Badge>
              </div>
            </UnifiedCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.filter(cert => cert.name !== 'Certified Ethical Hacker (CEH)').map((cert, index) => (
              <UnifiedCard
                key={index}
                eyebrow="Certification"
                title={cert.name}
                badge={cert.level}
                center={true}
              >
                <div className="text-5xl">{cert.icon}</div>
                <p className="text-slate-300">{cert.issuer}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">{cert.date}</Badge>
                </div>
              </UnifiedCard>
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
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="mb-12 border-l-2 border-neon-teal pl-6">
            <span className="text-neon-teal font-mono text-xs tracking-[0.3em] uppercase">Tools_Network</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mt-2">Tools & Platforms</h2>
            <p className="mt-4 text-sm text-slate-400 font-light">Technologies and tools I work with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UnifiedCard eyebrow="Toolkit" title="Penetration Testing" badge="Core" icon={<Shield className="h-5 w-5" />}>
              <div className="flex flex-wrap gap-3">
                {tools.pentesting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </UnifiedCard>

            <UnifiedCard eyebrow="Toolkit" title="OSINT & Forensics" badge="Research" icon={<Search className="h-5 w-5" />}>
              <div className="flex flex-wrap gap-3">
                {tools.osint.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </UnifiedCard>

            <UnifiedCard eyebrow="Toolkit" title="Scripting & Automation" badge="Build" icon={<Code className="h-5 w-5" />}>
              <div className="flex flex-wrap gap-3">
                {tools.scripting.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </UnifiedCard>

            <UnifiedCard eyebrow="Toolkit" title="Environments" badge="Runtime" icon={<Target className="h-5 w-5" />}>
              <div className="flex flex-wrap gap-3">
                {tools.environments.map((tool, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">{tool}</Badge>
                ))}
              </div>
            </UnifiedCard>
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
        <div className="max-w-[1600px] mx-auto px-6">
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
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">WhatsApp</p>
                <p className="text-lg text-white">+92 349 6000899</p>
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
                  <motion.button
                    type="button"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    onClick={() => window.open('https://wa.me/923496000899', '_blank')}
                    aria-label="WhatsApp"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
                  >
                    <WhatsAppIcon size={20} />
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
        <div className="max-w-[1600px] mx-auto px-6">
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
