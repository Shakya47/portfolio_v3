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
  startDate?: string;
  endDate?: string;
  includeInTotal?: boolean;
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

export function calculateTotalExperience(experiences: Experience[]): number {
  const now = new Date();
  let totalDays = 0;

  for (const exp of experiences) {
    if (exp.includeInTotal === false || !exp.startDate) continue;

    const start = new Date(exp.startDate);
    const end = exp.current ? now : (exp.endDate ? new Date(exp.endDate) : now);

    const diffTime = end.getTime() - start.getTime();
    if (diffTime > 0) {
      const days = diffTime / (1000 * 60 * 60 * 24);
      totalDays += days;
    }
  }

  const years = Math.floor((totalDays / 365.25) * 10) / 10;
  return years;
}

const enExperience: Experience[] = [
  {
    company: "Liftoff LLC",
    role: "Software Engineer",
    period: "Dec 2023 – Present",
    location: "Bengaluru, India",
    current: true,
    startDate: "2023-12-01",
    includeInTotal: true,
    highlights: [
      "Built and maintained frontend systems for our lending platform used by enterprise clients like JPMorgan Chase. Handled UI work, API design, and production debugging.",
      "Reworked a slow pricing query across Angular and Kotlin. Grouped data on the server instead of dumping 13,000 raw rows, cutting response times from 9 minutes to ~1 minute and payload size from 240MB to ~3MB.",
      "Cut bundle size by 48% with route lazy-loading and tree-shaking. Sped up table rendering by 35% with Angular OnPush change detection and trackBy.",
      "Used fractional indexing for reordering rules via drag-and-drop. This turned slow batch table rewrites into single-row updates and stopped database lock issues.",
      "Set up CI/CD test gates and SonarQube checks, keeping test coverage above 80% on core calculation logic."
    ]
  },
  {
    company: "Neetable Technologies",
    role: "Software Engineer",
    period: "Jan 2023 – Oct 2023",
    location: "Bengaluru, India",
    startDate: "2023-01-10",
    endDate: "2023-10-31",
    includeInTotal: true,
    highlights: [
      "Migrated 3 separate React repositories into a single Nx monorepo with shared UI components and common types, cutting duplicate code by ~40%.",
      "Replaced cluttered context and prop-drilling with focused Zustand stores across apps.",
      "Added service worker push notifications for real-time delivery alerts, which bumped active user engagement by 25%.",
      "Wrote a custom Node.js script to generate dynamic sitemaps and ping search indexing APIs automatically."
    ]
  },
  {
    company: "Accenture",
    role: "Application Development Associate",
    period: "Jun 2021 – Oct 2022",
    location: "Bengaluru, India",
    startDate: "2021-06-14",
    endDate: "2022-10-13",
    includeInTotal: true,
    highlights: [
      "Fixed 30+ production UI bugs, Safari alignment quirks, and keyboard focus issues across legacy apps.",
      "Set up Lighthouse audits in our workflow to catch slow render-blocking assets and improve Core Web Vitals."
    ]
  },
  {
    company: "BNP Paribas",
    role: "Intern",
    period: "Jan 2020 – Jun 2020",
    location: "Mumbai, India",
    startDate: "2020-01-01",
    endDate: "2020-06-30",
    includeInTotal: false, // Internship excluded from experience total
    highlights: [
      "Helped build onboarding walkthrough guides in React for internal tools.",
      "Wrote Jest and React Testing Library tests for UI components before releases."
    ]
  }
];

export const portfolioData: Record<string, LocalizedPortfolio> = {
  en: {
    profile: {
      name: "Saurabh Shakya",
      title: "Software Engineer",
      experienceYears: calculateTotalExperience(enExperience),
      pitch: "I build fast, clean web apps with React and TypeScript. I care a lot about good UX, small bundle sizes, and building things that actually feel nice to use. Creator of pip-it-up.",
      location: "Bengaluru, India",
      relocationStatus: "Open to relocation",
      ctas: [
        { label: "View Work", url: "#work", type: "primary" },
        { label: "Resume", url: "/Saurabh_Shakya_Resume.pdf", type: "secondary", download: true }
      ]
    },
    skills: [
      { name: "React & Next.js", icon: Layers, desc: "Server components, App Router, hydration, static pages" },
      { name: "Angular", icon: Cpu, desc: "OnPush change detection, lazy routing, RxJS" },
      { name: "Kotlin & Spring Boot", icon: Server, desc: "Writing REST APIs, JVM backends, debugging full-stack issues" },
      { name: "Monorepos (Nx)", icon: FolderGit2, desc: "Shared UI libraries, fast CI builds, dependency boundaries" },
      { name: "Web Performance", icon: Zap, desc: "Cutting bundle sizes, fixing slow renders, Core Web Vitals" },
      { name: "API Design", icon: RefreshCw, desc: "Clean REST endpoints, smart queries, no wasted data" },
      { name: "State Management", icon: Database, desc: "Zustand, NgRx, Redux, clean state boundaries" },
      { name: "Service Workers & PWAs", icon: Radio, desc: "Offline caching, web push notifications, background workers" },
      { name: "Design Systems & A11y", icon: Eye, desc: "Keyboard navigation, screen readers, WCAG, design tokens" },
      { name: "Testing & DevOps", icon: Settings, desc: "Unit testing with Jest, GitHub Actions, CI checks" }
    ],
    projects: [
      {
        title: "LENDER PRICE ENGINE",
        desc: "Fixed massive data bottlenecks on a mortgage pricing engine. Cut response times from 9 minutes down to ~1 minute and added fractional indexing so drag-and-drop updates save instantly.",
        tags: ["Angular", "Kotlin", "Spring Boot", "Fractional Indexing"],
        url: "/work/lender-price",
        imageClass: "bg-gradient-to-tr from-blue-900 to-indigo-950",
        ctas: [
          { label: "Read Case Study", url: "/work/lender-price", type: "primary" }
        ]
      },
      {
        title: "PHOX HEALTH LOGISTICS",
        desc: "Merged 3 separate React codebases into one clean Nx monorepo, swapped heavy state for simple Zustand stores, and added background push notifications for couriers.",
        tags: ["React", "Nx Monorepo", "Zustand", "Service Worker"],
        url: "/work/phox-health",
        imageClass: "bg-gradient-to-tr from-emerald-900 to-teal-950",
        ctas: [
          { label: "Read Case Study", url: "/work/phox-health", type: "primary" }
        ]
      },
      {
        title: "UNFOLD-MDX EXPLANATIONS",
        desc: "A React library for step-by-step technical explanations. It diffs sentences and code lines smoothly as readers drill deeper, without annoying accordions or scroll jumps.",
        tags: ["React", "MDX", "Shiki", "DiffMatchPatch"],
        url: "/work/unfold-mdx",
        imageClass: "bg-gradient-to-tr from-violet-900 to-fuchsia-950",
        ctas: [
          { label: "Read Case Study", url: "/work/unfold-mdx", type: "primary" }
        ]
      },
      {
        title: "CULTURENOW PORTAL",
        desc: "Squashed 30+ legacy bugs, cleaned up slow render-blocking assets, and made an interactive city art map fully accessible with screen readers.",
        tags: ["HTML/CSS", "JavaScript", "A11y", "Web Vitals"],
        url: "/work/culturenow",
        imageClass: "bg-gradient-to-tr from-rose-900 to-purple-950",
        ctas: [
          { label: "Read Case Study", url: "/work/culturenow", type: "primary" }
        ]
      },
      {
        title: "NOTE-IT-DOWN EDITOR",
        desc: "A floating notepad Chrome extension using Document Picture-in-Picture. Encrypts your notes client-side and syncs across computers without needing an account.",
        tags: ["React", "Nx Monorepo", "Zustand", "Service Worker"],
        url: "/work/note-it-down",
        imageClass: "bg-gradient-to-tr from-amber-900 to-orange-950",
        ctas: [
          { label: "Read Case Study", url: "/work/note-it-down", type: "primary" }
        ]
      }
    ],
    experience: enExperience,
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
        tags: ["OSS", "npm", "Project"],
        url: "/work/pip-it-up"
      },
      {
        date: "OCT 2023",
        title: "note-it-down - Floating always-on-top text editor Chrome Extension powered by Document PiP",
        tags: ["OSS", "Project"],
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
      desc: "I'm looking for software engineering roles with teams building great products. If you care about fast load times, clean code, and solid UX, let's chat.",
      email: "saurabhsh47g@gmail.com",
      linkedin: "https://linkedin.com/in/shakya47",
      github: "https://github.com/shakya47",
      responseRate: "Usually reply within a day",
      ctas: [
        { label: "EMAIL ME", url: "mailto:saurabhsh47g@gmail.com", type: "primary" },
        { label: "LINKEDIN", url: "https://linkedin.com/in/shakya47", type: "secondary", external: true },
        { label: "GITHUB", url: "https://github.com/shakya47", type: "secondary", external: true }
      ]
    }
  }
};

export function getPortfolio(locale = 'en'): LocalizedPortfolio {
  const data = portfolioData[locale] || portfolioData['en'];
  return {
    ...data,
    profile: {
      ...data.profile,
      experienceYears: calculateTotalExperience(data.experience)
    }
  };
}
