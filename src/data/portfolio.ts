import {
  Layers,
  Cpu,
  Server,
  FolderGit2,
  Zap,
  RefreshCw,
  Database,
  Radio,
  Eye,
  Settings
} from 'lucide-react';

export interface CTA {
  label: string;
  url: string;
  type: 'primary' | 'secondary';
  download?: boolean;
  external?: boolean;
}

export interface Profile {
  name: string;
  title: string;
  experienceYears: number;
  pitch: string;
  location: string;
  relocationStatus: string;
  ctas: CTA[];
}

export interface Skill {
  name: string;
  icon: any;
  desc: string;
}

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  url: string;
  imageClass: string;
  ctas: CTA[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
}

export interface Contribution {
  date: string;
  title: string;
  tags: string[];
  url: string;
}

export interface Contact {
  headline: string;
  desc: string;
  email: string;
  linkedin: string;
  github: string;
  responseRate: string;
  ctas: CTA[];
}

export interface LocalizedPortfolio {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  contributions: Contribution[];
  contact: Contact;
}

export const portfolioData: Record<string, LocalizedPortfolio> = {
  en: {
    profile: {
      name: "Saurabh Shakya",
      title: "Frontend Engineer",
      experienceYears: 4.5,
      pitch: "Frontend Engineer specializing in building robust, accessible, and highly-optimized user interfaces using React & TypeScript. Creator of the pip-it-up library.",
      location: "Bengaluru, India",
      relocationStatus: "Available for relocation",
      ctas: [
        { label: "View Work", url: "#work", type: "primary" },
        { label: "Resume", url: "/Saurabh_Shakya_Resume.pdf", type: "secondary", download: true }
      ]
    },
    skills: [
      { name: "React & Next.js", icon: Layers, desc: "SSR, App Router, Hydration, static generation" },
      { name: "Angular", icon: Cpu, desc: "Change detection tuning, memoization, lazy loading" },
      { name: "Kotlin & Spring Boot", icon: Server, desc: "Cross-stack debugging, JVM backends, REST API design" },
      { name: "Monorepos (Nx)", icon: FolderGit2, desc: "Modular architecture, shared libraries, boundary gates" },
      { name: "Web Performance", icon: Zap, desc: "Core Web Vitals, payload size reduction, bundle tuning" },
      { name: "API Design", icon: RefreshCw, desc: "REST contracts, database queries, reducing over-fetching" },
      { name: "State Management", icon: Database, desc: "Zustand, NgRx, Redux stores, custom reactive boundaries" },
      { name: "Service Workers & PWAs", icon: Radio, desc: "Push notification worker logic, site indexing API automation" },
      { name: "Design Systems & A11y", icon: Eye, desc: "Accessible component libraries, WCAG criteria, tokens" },
      { name: "Testing & DevOps", icon: Settings, desc: "Jest, automated quality gates, CI/CD Actions" }
    ],
    projects: [
      {
        title: "LENDER PRICE ENGINE",
        desc: "Automated mortgage product eligibility, lock workflows, and margins. Optimizing pricing pipeline from 9 min to ~1 min and using fractional indexing for O(1) drag-and-drop.",
        tags: ["Angular", "Kotlin", "Spring Boot", "Fractional Indexing"],
        url: "/work/lender-price",
        imageClass: "bg-gradient-to-tr from-blue-900 to-indigo-950",
        ctas: [
          { label: "Explore Case Study", url: "/work/lender-price", type: "primary" }
        ]
      },
      {
        title: "PHOX HEALTH LOGISTICS",
        desc: "Migrated 3 legacy React apps into a unified Nx monorepo, integrated global Zustand state stores, and implemented offline service worker push notifications.",
        tags: ["React", "Nx Monorepo", "Zustand", "Service Worker"],
        url: "/work/phox-health",
        imageClass: "bg-gradient-to-tr from-emerald-900 to-teal-950",
        ctas: [
          { label: "Explore Case Study", url: "/work/phox-health", type: "primary" }
        ]
      },
      {
        title: "UNFOLD-MDX EXPLANATIONS",
        desc: "A progressive-depth prose & code explanation library for React & MDX, with sentence-level prose diffing and line-level code token diffing.",
        tags: ["React", "MDX", "Shiki", "DiffMatchPatch"],
        url: "/work/unfold-mdx",
        imageClass: "bg-gradient-to-tr from-violet-900 to-fuchsia-950",
        ctas: [
          { label: "Explore Case Study", url: "/work/unfold-mdx", type: "primary" }
        ]
      },
      {
        title: "CULTURENOW PORTAL",
        desc: "Optimized stability and accessibility for an interactive cultural mapping guide. Established Core Web Vitals audits and eliminated render-blocking dependencies.",
        tags: ["HTML/CSS", "JavaScript", "A11y", "Web Vitals"],
        url: "/work/culturenow",
        imageClass: "bg-gradient-to-tr from-rose-900 to-purple-950",
        ctas: [
          { label: "Explore Case Study", url: "/work/culturenow", type: "primary" }
        ]
      },
      {
        title: "NOTE-IT-DOWN EDITOR",
        desc: "A folder-organized hierarchical Markdown note editor with nested directories, reactive Zustand state boundaries, and sitemap build pipeline automation.",
        tags: ["React", "Nx Monorepo", "Zustand", "Service Worker"],
        url: "/work/note-it-down",
        imageClass: "bg-gradient-to-tr from-amber-900 to-orange-950",
        ctas: [
          { label: "Explore Case Study", url: "/work/note-it-down", type: "primary" }
        ]
      }
    ],
    experience: [
      {
        company: "Liftoff LLC",
        role: "Senior Software Engineer",
        period: "Dec 2023 – Present",
        location: "Bengaluru, India",
        highlights: [
          "Led frontend architecture and performance optimization for a cloud-native lending platform serving enterprise clients including JPMorgan Chase, owning end-to-end delivery across UI, API design, and production debugging.",
          "Re-architected a critical pricing engine pipeline across Angular + Kotlin APIs, reducing response time from 9 minutes to ~1 minute (89% improvement) and shrinking payload size from 240MB to ~3MB, eliminating UI freezes and enabling real-time data exploration.",
          "Reduced bundle size by 48% and loan pricing workflow performance by 35% using OnPush detection, Webpack analysis, lazy loading, and trackBy loops.",
          "Implemented O(1) Fractional Indexing for drag-and-drop rule ordering, eliminating write conflicts and database locks.",
          "Built scalable frontend architecture patterns and enforced code quality, leveraging CI/CD pipelines and unit test quality gates (SonarQube) with >80% coverage on critical modules."
        ]
      },
      {
        company: "Neetable Technologies",
        role: "Software Engineer",
        period: "Jan 2023 – Oct 2023",
        location: "Bengaluru, India",
        highlights: [
          "Led migration of 3 React repositories into a unified Nx monorepo, designing shared libraries, TypeScript boundaries, and hooks to improve dev velocity.",
          "Integrated Zustand to manage global state slices across micro-frontend boundaries, removing nested prop-drilling trees.",
          "Attained a 25% increase in user interactions by establishing a push notification service via background service workers.",
          "Created automated dynamic sitemap.xml Node.js build scripts connected to indexing APIs, growing search traffic by 20%."
        ]
      },
      {
        company: "Accenture",
        role: "Application Development Associate",
        period: "Jun 2021 – Oct 2022",
        location: "Bengaluru, India",
        highlights: [
          "Resolved 30+ high-priority production bugs, layout regressions, and focus styling issues in legacy enterprise codebases.",
          "Introduced Lighthouse-based Core Web Vitals (LCP, CLS, INP) auditing, identifying and removing render-blocking resources."
        ]
      },
      {
        company: "BNP Paribas",
        role: "Intern",
        period: "Jan 2020 – Jun 2020",
        location: "Mumbai, India",
        highlights: [
          "Contributed to a React-based Digital Adoption Platform, improving context-sensitive UI guides.",
          "Wrote component unit tests using Jest and React Testing Library, boosting safety metrics for new features."
        ]
      }
    ],
    contributions: [
      {
        date: "JUN 2026",
        title: "unfold-mdx (@unfold-mdx/react) - Progressive-depth prose & code explanations for React & MDX",
        tags: ["OSS", "npm", "Project"],
        url: "/work/unfold-mdx"
      },
      {
        date: "NOV 2023",
        title: "pip-it-up (@pip-it-up/core & @pip-it-up/react) - Document Picture-in-Picture library",
        tags: ["OSS", "npm"],
        url: "/work/pip-it-up"
      },
      {
        date: "OCT 2023",
        title: "note-it-down - Floating always-on-top text editor Chrome Extension powered by Document PiP",
        tags: ["Project"],
        url: "/work/note-it-down"
      },
      {
        date: "AUG 2023",
        title: "Building a Framework-Agnostic PiP Core with ResizeObserver & MutationObserver",
        tags: ["Article"],
        url: "/work/pip-it-up#technical-deep-dive"
      },
      {
        date: "JUL 2023",
        title: "Designing a Server-Blind sync layer using WebCrypto APIs (HKDF & HMAC-SHA256)",
        tags: ["Article"],
        url: "/work/zero-knowledge-sync"
      },
      {
        date: "JUN 2023",
        title: "Migrating Enterprise React Repositories into an Nx Monorepo",
        tags: ["Article"],
        url: "/work/phox-health"
      }
    ],
    contact: {
      headline: "LET'S WORK TOGETHER",
      desc: "I am open to Frontend and Full-Stack opportunities at top-tier product engineering teams. If you need an engineer focused on performance, accessibility, and clean user experiences, feel free to reach out!",
      email: "saurabhsh47g@gmail.com",
      linkedin: "https://linkedin.com/in/shakya47",
      github: "https://github.com/shakya47",
      responseRate: "Fast Response: Within 24 Hours",
      ctas: [
        { label: "EMAIL ME", url: "mailto:saurabhsh47g@gmail.com", type: "primary" },
        { label: "LINKEDIN", url: "https://linkedin.com/in/shakya47", type: "secondary", external: true },
        { label: "GITHUB", url: "https://github.com/shakya47", type: "secondary", external: true }
      ]
    }
  }
};

export function getPortfolio(locale = 'en'): LocalizedPortfolio {
  return portfolioData[locale] || portfolioData['en'];
}
