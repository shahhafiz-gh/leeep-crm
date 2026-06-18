# 🏫 LEEEP CMS — Master Prompt

> **Project:** LEEEP CMS — A multi-tenant, template-driven school website CMS  
> **Purpose:** Convert two production-ready school websites (IEIskp & Kashmir-Cambridge) into fully dynamic, reusable Next.js templates that users can select and populate with their own school data.

---

## 1. PROJECT OVERVIEW

We are building a **CMS platform** where users can:
1. Choose a **template** (`template-a` — IEIskp style, or `template-b` — Kashmir-Cambridge style)
2. Populate the template with their own **school-specific data** (text, images, colors, links, etc.)
3. Get a **production-ready school website** served via **subdomain-based routing**

### Multi-Tenancy Model
- Each school gets a **subdomain**: `schoolname.leeep.com`
- The **middleware** extracts the subdomain from the `Host` header and sets `x-school-subdomain`
- Each **page** (Server Component) reads the subdomain header, fetches school data from **Frappe backend**, and selects the correct template
- Templates are `template-a` (IEIskp) and `template-b` (Kashmir-Cambridge)

### Fixed Page List (6 pages + login)
```
'home' | 'about' | 'academics' | 'updates' | 'admissions' | 'contact' | 'login'
```

The two source repos are **production-deployed websites** that serve as the design & UX reference. We will **not copy their code verbatim** — instead we will rebuild each as a dynamic template from scratch, matching their design/layout as closely as possible, using a unified modern stack.

---

## 2. TECH STACK (STRICT)

| Layer               | Technology                                                    |
| ------------------- | ------------------------------------------------------------- |
| **Framework**       | Next.js (App Router, RSC, TypeScript)                         |
| **Styling**         | Tailwind CSS v4 — **pure utility classes only, NO raw CSS**   |
| **Components**      | shadcn/ui (chad cn) + custom Next.js components               |
| **Animations**      | GSAP (GreenSock) — **replace all framer-motion / CSS anims**  |
| **Icons**           | Lucide React + @iconify/react                                 |
| **State Management**| Zustand (for UI state like menus, modals)                     |
| **Forms**           | React Hook Form + Zod validation                              |
| **HTTP Client**     | Axios                                                         |
| **Backend**         | Frappe (via `@/lib/frappe` — REST API for school data)        |
| **Utilities**       | clsx + tailwind-merge (via `cn()` helper)                     |
| **Fonts**           | Google Fonts via `next/font/google`                           |

### Critical Rules
- ❌ **NO raw CSS files** — no `globals.css` custom rules, no CSS modules, no styled-components
- ❌ **NO framer-motion** — replace with GSAP
- ❌ **NO Bootstrap, jQuery, Swiper CDN** — replace with React/GSAP equivalents
- ✅ **Pure Tailwind** — all styling via Tailwind utility classes in JSX
- ✅ **shadcn/ui components** for all standard UI primitives (Button, Card, Badge, Input, Label, Dialog, etc.)
- ✅ **GSAP** for scroll-triggered animations, hero carousels, stagger reveals, parallax effects

---

## 3. ROUTING ARCHITECTURE — SUBDOMAIN MULTI-TENANCY

### How It Works

```
Request: https://ieiskp.leeep.com/about
         ────────┬──────────────  ──┬──
                 │                   │
          subdomain = "ieiskp"    page = "about"

1. Middleware extracts subdomain → sets `x-school-subdomain` header
2. Page RSC reads header → calls `getSchoolData(subdomain)` from Frappe
3. Frappe returns SchoolData including `config.template_id` ("template-a" | "template-b")
4. Page renders the correct template component: TemplateA or TemplateB
```

### Page Pattern (EVERY page follows this exact pattern)

```tsx
// app/page.tsx — Home (same pattern for ALL pages)
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getSchoolData } from '@/lib/frappe'
import TemplateA from '@/templates/template-a/TemplateA'
import TemplateB from '@/templates/template-b/TemplateB'

export default async function HomePage() {
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain)
  if (!data) return notFound()

  if (data.config.template_id === 'template-a') return <TemplateA data={data} page="home" />
  if (data.config.template_id === 'template-b') return <TemplateB data={data} page="home" />
  return notFound()
}

export const dynamic = 'force-dynamic'
```

```tsx
// app/about/page.tsx
export default async function AboutPage() {
  const headersList = await headers()
  const subdomain = headersList.get('x-school-subdomain') ?? ''
  const data = await getSchoolData(subdomain)
  if (!data) return notFound()

  if (data.config.template_id === 'template-a') return <TemplateA data={data} page="about" />
  if (data.config.template_id === 'template-b') return <TemplateB data={data} page="about" />
  return notFound()
}
export const dynamic = 'force-dynamic'
```

### Template Root Component Pattern

```tsx
// templates/template-a/TemplateA.tsx
import type { SchoolData, PageType } from '@/types/school.types'
import HomeView from './views/HomeView'
import AboutView from './views/AboutView'
import AcademicsView from './views/AcademicsView'
import AdmissionsView from './views/AdmissionsView'
import ContactView from './views/ContactView'
import UpdatesView from './views/UpdatesView'
import LoginView from './views/LoginView'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

interface TemplateProps {
  data: SchoolData
  page: PageType
}

const pageMap: Record<PageType, React.ComponentType<{ data: SchoolData }>> = {
  home: HomeView,
  about: AboutView,
  academics: AcademicsView,
  admissions: AdmissionsView,
  contact: ContactView,
  updates: UpdatesView,
  login: LoginView,
}

export default function TemplateA({ data, page }: TemplateProps) {
  const PageComponent = pageMap[page]
  return (
    <div className="template-a"> {/* Scoping class for template-specific Tailwind tokens */}
      <Header data={data} />
      <main>
        <PageComponent data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}
```

---

## 4. FOLDER STRUCTURE

```
leeep-cms/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (minimal, fonts, GSAP provider)
│   │   ├── page.tsx                      # Home page (subdomain → template resolution)
│   │   ├── about/page.tsx                # About page
│   │   ├── academics/page.tsx            # Academics page
│   │   ├── admissions/page.tsx           # Admissions page
│   │   ├── contact/page.tsx              # Contact page
│   │   ├── updates/page.tsx              # Updates / News page
│   │   ├── updates/[id]/page.tsx         # Single update detail
│   │   ├── login/page.tsx                # Login page
│   │   └── globals.css                   # Minimal: @import "tailwindcss" + @theme tokens only
│   │
│   ├── templates/
│   │   ├── template-a/                   # IEIskp-style template
│   │   │   ├── TemplateA.tsx             # Root template component (page router)
│   │   │   ├── config/
│   │   │   │   └── tokens.ts             # Template A design tokens (green MD3 palette)
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   └── Footer.tsx
│   │   │   │   ├── home/
│   │   │   │   │   ├── HeroSection.tsx
│   │   │   │   │   ├── AnnouncementsSection.tsx
│   │   │   │   │   ├── EventsGallerySection.tsx
│   │   │   │   │   ├── WhyChooseUsSection.tsx
│   │   │   │   │   ├── StatsSection.tsx
│   │   │   │   │   ├── AboutSection.tsx
│   │   │   │   │   ├── ProgramsSection.tsx
│   │   │   │   │   ├── GallerySection.tsx
│   │   │   │   │   ├── AlumniSection.tsx
│   │   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   │   └── AdmissionsSection.tsx
│   │   │   │   ├── about/
│   │   │   │   │   ├── AboutHero.tsx
│   │   │   │   │   ├── MissionSection.tsx
│   │   │   │   │   └── RecognitionSection.tsx
│   │   │   │   ├── academics/
│   │   │   │   │   ├── AcademicsHero.tsx
│   │   │   │   │   ├── CurriculumSection.tsx
│   │   │   │   │   ├── StreamsSection.tsx
│   │   │   │   │   ├── MethodologySection.tsx
│   │   │   │   │   ├── ClubsSection.tsx
│   │   │   │   │   └── ResultsSection.tsx
│   │   │   │   ├── admissions/
│   │   │   │   │   ├── AdmissionsHero.tsx
│   │   │   │   │   ├── ApplicationForm.tsx
│   │   │   │   │   ├── FeeStructure.tsx
│   │   │   │   │   ├── FAQsSection.tsx
│   │   │   │   │   └── WhyChooseSection.tsx
│   │   │   │   ├── contact/
│   │   │   │   │   ├── ContactHero.tsx
│   │   │   │   │   └── FindUsSection.tsx
│   │   │   │   └── updates/
│   │   │   │       ├── UpdatesHero.tsx
│   │   │   │       ├── PinnedUpdates.tsx
│   │   │   │       ├── EventsList.tsx
│   │   │   │       ├── UpdateFilters.tsx
│   │   │   │       └── UpdateDetail.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── home/
│   │   │   │   │   ├── useHeroCarousel.ts
│   │   │   │   │   ├── useStatsCounter.ts
│   │   │   │   │   └── useTestimonials.ts
│   │   │   │   ├── about/
│   │   │   │   │   └── useMissionTabs.ts
│   │   │   │   ├── academics/
│   │   │   │   │   └── useStreamFilter.ts
│   │   │   │   ├── admissions/
│   │   │   │   │   ├── useApplicationForm.ts
│   │   │   │   │   └── useFAQAccordion.ts
│   │   │   │   ├── contact/
│   │   │   │   │   └── useContactForm.ts
│   │   │   │   ├── updates/
│   │   │   │   │   ├── useUpdateFilters.ts
│   │   │   │   │   └── useUpdateDetail.ts
│   │   │   │   └── layout/
│   │   │   │       ├── useMobileMenu.ts
│   │   │   │       └── useScrollHeader.ts
│   │   │   └── views/
│   │   │       ├── HomeView.tsx
│   │   │       ├── AboutView.tsx
│   │   │       ├── AcademicsView.tsx
│   │   │       ├── AdmissionsView.tsx
│   │   │       ├── ContactView.tsx
│   │   │       ├── UpdatesView.tsx
│   │   │       └── LoginView.tsx
│   │   │
│   │   └── template-b/                   # Kashmir-Cambridge-style template
│   │       ├── TemplateB.tsx             # Root template component (page router)
│   │       ├── config/
│   │       │   └── tokens.ts             # Template B design tokens (gold/navy palette)
│   │       ├── components/
│   │       │   ├── layout/
│   │       │   │   ├── Header.tsx
│   │       │   │   ├── MobileMenu.tsx
│   │       │   │   ├── Footer.tsx
│   │       │   │   └── Breadcrumb.tsx
│   │       │   ├── home/
│   │       │   │   ├── HeroSection.tsx
│   │       │   │   ├── AboutSection.tsx
│   │       │   │   ├── NewsSection.tsx
│   │       │   │   ├── EventsSection.tsx
│   │       │   │   ├── FacilitiesGrid.tsx
│   │       │   │   └── TestimonialsSection.tsx
│   │       │   ├── about/
│   │       │   │   ├── AboutHero.tsx
│   │       │   │   ├── OurStory.tsx
│   │       │   │   ├── MissionVision.tsx
│   │       │   │   ├── Achievements.tsx
│   │       │   │   └── WhyChooseUs.tsx
│   │       │   ├── academics/
│   │       │   │   ├── AcademicsHero.tsx
│   │       │   │   ├── CoursesSection.tsx
│   │       │   │   └── FacultySection.tsx
│   │       │   ├── admissions/
│   │       │   │   ├── AdmissionHero.tsx
│   │       │   │   ├── AdmissionProcess.tsx
│   │       │   │   └── AdmissionForm.tsx
│   │       │   ├── contact/
│   │       │   │   ├── ContactHero.tsx
│   │       │   │   ├── ContactForm.tsx
│   │       │   │   └── MapSection.tsx
│   │       │   └── updates/
│   │       │       ├── BlogList.tsx
│   │       │       └── BlogDetail.tsx
│   │       ├── hooks/
│   │       │   ├── home/
│   │       │   │   ├── useHeroSlider.ts
│   │       │   │   └── useNewsCarousel.ts
│   │       │   ├── about/
│   │       │   │   └── useAchievementCounter.ts
│   │       │   ├── academics/
│   │       │   │   └── useFacultyFilter.ts
│   │       │   ├── admissions/
│   │       │   │   └── useAdmissionForm.ts
│   │       │   ├── contact/
│   │       │   │   └── useContactForm.ts
│   │       │   └── layout/
│   │       │       ├── useMobileMenu.ts
│   │       │       ├── useNavbar.ts
│   │       │       └── useScroll.ts
│   │       └── views/
│   │           ├── HomeView.tsx
│   │           ├── AboutView.tsx
│   │           ├── AcademicsView.tsx
│   │           ├── AdmissionsView.tsx
│   │           ├── ContactView.tsx
│   │           ├── UpdatesView.tsx
│   │           └── LoginView.tsx
│   │
│   ├── shared/                           # Shared across ALL templates
│   │   ├── ui/                           # shadcn/ui components (Button, Card, etc.)
│   │   ├── animations/
│   │   │   ├── gsap-provider.tsx         # GSAP context provider
│   │   │   ├── scroll-reveal.tsx         # ScrollTrigger wrapper
│   │   │   ├── fade-in.tsx
│   │   │   ├── slide-in.tsx
│   │   │   ├── stagger-children.tsx
│   │   │   └── parallax.tsx
│   │   ├── hooks/
│   │   │   ├── useGSAP.ts               # GSAP initialization hook
│   │   │   └── useScrollTrigger.ts
│   │   └── utils/
│   │       └── cn.ts                     # clsx + tailwind-merge helper
│   │
│   ├── lib/
│   │   ├── frappe.ts                     # Frappe API client — getSchoolData(), etc.
│   │   ├── metadata.ts                   # SEO metadata builder
│   │   └── utils.ts                      # General utilities
│   │
│   ├── store/
│   │   └── ui-store.ts                   # Mobile menu, modals (Zustand)
│   │
│   ├── types/
│   │   ├── school.types.ts               # SchoolData, PageType, TemplateConfig
│   │   ├── hero.types.ts
│   │   ├── faculty.types.ts
│   │   ├── event.types.ts
│   │   ├── blog.types.ts
│   │   ├── course.types.ts
│   │   └── testimonial.types.ts
│   │
│   └── middleware.ts                     # Subdomain extraction → x-school-subdomain header
│
├── public/
│   ├── templates/
│   │   ├── template-a/                   # IEIskp assets (images, logos)
│   │   └── template-b/                   # Kashmir-Cambridge assets
│   └── fonts/
│
├── tailwind.config.ts                    # Base tailwind config
├── components.json                       # shadcn/ui config
├── next.config.ts
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

---

## 5. MIDDLEWARE — SUBDOMAIN EXTRACTION

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  
  // Extract subdomain: "ieiskp.leeep.com" → "ieiskp"
  // Local dev: "ieiskp.localhost:3000" → "ieiskp"
  const parts = host.split('.')
  const subdomain = parts.length > 1 ? parts[0] : ''
  
  const response = NextResponse.next()
  response.headers.set('x-school-subdomain', subdomain)
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
```

---

## 6. DATA LAYER — FRAPPE BACKEND

```typescript
// src/lib/frappe.ts
import axios from 'axios'
import type { SchoolData } from '@/types/school.types'

const frappeClient = axios.create({
  baseURL: process.env.FRAPPE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getSchoolData(subdomain: string): Promise<SchoolData | null> {
  try {
    const res = await frappeClient.get(`/api/method/leeep.get_school_data`, {
      params: { subdomain },
    })
    return res.data.message as SchoolData
  } catch {
    return null
  }
}
```

---

## 7. DESIGN TOKENS — TEMPLATE SEPARATION

Each template has a **completely different** design language. They must NEVER share colors, fonts, or sizing tokens.

### Template A — IEIskp (Material Design 3 / Green Nature)

| Token Category | Values |
|---|---|
| **Primary Palette** | `#006b20` (primary), `#00872b` (container), `#84fc89` (fixed), `#67df70` (fixed-dim) |
| **Secondary** | `#006e24`, containers: `#8afb91` |
| **Tertiary** | `#4f6051`, containers: `#677969` |
| **Surfaces** | `#f4fcef` (background), `#171d16` (on-surface), `#e9f0e3` (container) |
| **Error** | `#ba1a1a`, container: `#ffdad6` |
| **Heading Font** | `Nunito` (700, 800 weight) |
| **Body Font** | `DM Sans` (400, 500) |
| **Font Sizes** | h1: 48px, h2: 36px, h3: 28px, body: 16–18px, label: 14px, caption: 12px |
| **Border Radius** | 8px brand radius |
| **Overall Aesthetic** | Clean, nature-inspired, Islamic education feel, soft greens, MD3 elevation |

### Template B — Kashmir-Cambridge (Premium Academic / Gold-Navy)

| Token Category | Values |
|---|---|
| **Primary Palette** | `#cba73d` (gold), scale 50–800 from `#f7efd2` to `#5a4716` |
| **Secondary** | `#110C2D` (deep navy) |
| **Accent** | `#cba73d`, hover: `#C9A227` |
| **Text** | heading: `#262626`, body: `#737477`, border: `#D9D9D9` |
| **Footer** | `#181818` |
| **Heading Font** | `Geist Sans` (system default) + `Canela Trial` (display), `Rufina` (serif) |
| **Body Font** | `Hind`, `Geist Sans` |
| **Font Sizes** | h1: 64px, h2: 48px, h3: 40px, h4: 36px, h5: 24px, h6: 20px |
| **Border Radius** | `0.625rem` base, scaled sm/md/lg/xl |
| **Overall Aesthetic** | Premium, elegant, gold accents on white, serif display fonts, Cambridge university feel |

### Template Token Scoping Strategy

Templates apply design tokens via a scoping class on their root wrapper:
```tsx
// Template A wraps everything in:
<div className="template-a">...</div>

// Template B wraps everything in:
<div className="template-b">...</div>
```

In `globals.css`, we use Tailwind v4 `@theme` blocks scoped to each class:
```css
@import "tailwindcss";

.template-a {
  /* Template A tokens applied via Tailwind theme override */
}
.template-b {
  /* Template B tokens applied via Tailwind theme override */
}
```

---

## 8. COMPONENT ARCHITECTURE RULES

### 8.1 — Separation of Concerns (Hooks + Components)

```
❌ WRONG — Logic inside component:
const HeroSection = () => {
  const [slide, setSlide] = useState(0);
  useEffect(() => { /* GSAP animation */ }, []);
  return <div>...</div>;
}

✅ CORRECT — Logic extracted to hook:
// hooks/home/useHeroCarousel.ts
export const useHeroCarousel = (slides: HeroSlide[]) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  // GSAP logic here
  return { currentSlide, next, prev, containerRef };
};

// components/home/HeroSection.tsx
const HeroSection = ({ slides }: HeroProps) => {
  const { currentSlide, next, prev, containerRef } = useHeroCarousel(slides);
  return <div ref={containerRef}>...</div>;
};
```

### 8.2 — Component Rules
- **All JSX components are PURE presentational** — zero React logic (no useState, useEffect, useRef, useCallback)
- **All logic lives in hooks** — organized by page (home/, about/, academics/, etc.)
- **All data is received via props** — components never fetch data themselves
- **All styling is Tailwind utility classes** — no `className={styles.something}`, no CSS modules
- **All UI primitives come from shadcn/ui** — Button, Card, Badge, Input, etc. from `@/shared/ui/`
- **"use client"** only on components/hooks that need interactivity

### 8.3 — Views
Each page has a corresponding **View** component that composes all section components:
```tsx
// templates/template-a/views/HomeView.tsx
const HomeView = ({ data }: { data: SchoolData }) => (
  <>
    <HeroSection slides={data.hero.slides} />
    <AnnouncementsSection announcements={data.updates.announcements} />
    <WhyChooseUsSection reasons={data.about.whyChooseUs} />
    <StatsSection stats={data.stats} />
    {/* ... */}
  </>
);
```

---

## 9. ANIMATION STRATEGY — GSAP

**Replace ALL framer-motion and CSS animations with GSAP.**

### Shared Animation Components (`shared/animations/`)
```tsx
// gsap-provider.tsx — wraps app with GSAP context
// scroll-reveal.tsx — ScrollTrigger-based reveal on scroll
// fade-in.tsx — opacity 0→1 with configurable duration/delay
// slide-in.tsx — translate + opacity with configurable direction
// stagger-children.tsx — sequential child animation
// parallax.tsx — parallax scrolling effect
```

### Animation Hooks
```tsx
// shared/hooks/useGSAP.ts
// Initializes GSAP + ScrollTrigger plugin, returns gsap context
// All template-specific animation hooks call this internally

// Template hook example:
// templates/template-a/hooks/home/useHeroCarousel.ts
// Uses GSAP timeline for slide transitions, auto-play, parallax bg
```

### GSAP Usage Patterns
1. **Hero Carousels** — GSAP timeline with crossfade/slide transitions
2. **Scroll Reveals** — ScrollTrigger with `start: "top 80%"`, fade+slide up
3. **Counter Animations** — GSAP `to()` for counting up stats numbers
4. **Staggered Grids** — `stagger: 0.1` on card/grid entries
5. **Parallax Backgrounds** — ScrollTrigger y-axis translation on hero images
6. **Menu Animations** — GSAP timeline for mobile menu open/close
7. **Page Transitions** — Subtle fade between route changes

---

## 10. PAGE-BY-PAGE COMPONENT MAP

### Template A — IEIskp Pages & Components

| Page | Route | Components (from repo reference) |
|---|---|---|
| **Home** | `/` | HeroSection → AnnouncementsSection → EventsGallerySection → WhyChooseUsSection → StatsSection → AboutSection → ProgramsSection → GallerySection → AlumniSection → TestimonialsSection → AdmissionsSection |
| **About** | `/about` | AboutHero → MissionSection → RecognitionSection |
| **Academics** | `/academics` | AcademicsHero → CurriculumSection → StreamsSection → MethodologySection → ClubsSection → ResultsSection |
| **Admissions** | `/admissions` | AdmissionsHero → WhyChooseSection → FeeStructure → ApplicationForm → FAQsSection |
| **Contact** | `/contact` | ContactHero → FindUsSection |
| **Updates** | `/updates` | UpdatesHero → PinnedUpdates → UpdateFilters → EventsList |
| **Update Detail** | `/updates/[id]` | UpdateDetail |
| **Login** | `/login` | LoginForm |

### Template B — Kashmir-Cambridge Pages & Components

| Page | Route | Components (from repo reference) |
|---|---|---|
| **Home** | `/` | HeroSection → AboutSection → NewsSection → EventsSection → FacilitiesGrid → TestimonialsSection |
| **About** | `/about` | AboutHero → OurStory → MissionVision → Achievements → WhyChooseUs |
| **Academics** | `/academics` | AcademicsHero → CoursesSection → FacultySection |
| **Admissions** | `/admissions` | AdmissionHero → AdmissionProcess → AdmissionForm |
| **Contact** | `/contact` | ContactHero → ContactForm → MapSection |
| **Updates** | `/updates` | BlogList |
| **Update Detail** | `/updates/[id]` | BlogDetail |
| **Login** | `/login` | LoginForm |

---

## 11. DATA CONTRACTS — TYPES

```typescript
// types/school.types.ts

export type PageType = 'home' | 'about' | 'academics' | 'admissions' | 'contact' | 'updates' | 'login'
export type TemplateId = 'template-a' | 'template-b'

export interface TemplateConfig {
  template_id: TemplateId
  // Future: custom color overrides, feature flags, etc.
}

export interface SchoolData {
  name: string
  tagline: string
  logo: string
  config: TemplateConfig

  hero: HeroData
  about: AboutData
  academics: AcademicsData
  admissions: AdmissionsData
  contact: ContactData
  updates: UpdatesData
  testimonials: TestimonialData[]
  stats: StatData[]
  gallery: GalleryData
  faculty: FacultyMember[]
  navigation: NavigationItem[]
  socialLinks: SocialLink[]
  footer: FooterData
}
```

---

## 12. DEVELOPMENT WORKFLOW

### Phase 1 — Project Setup
1. Initialize Next.js project with App Router + TypeScript
2. Install dependencies: `tailwindcss`, `gsap`, `shadcn`, `zustand`, `axios`, `zod`, `lucide-react`, `@iconify/react`, `clsx`, `tailwind-merge`
3. Configure `tailwind.config.ts` with base tokens
4. Set up `shadcn/ui` with `components.json`
5. Create middleware for subdomain extraction
6. Create `lib/frappe.ts` for Frappe API client
7. Set up GSAP provider component
8. Create all 7 page routes (home, about, academics, admissions, contact, updates, login) with the subdomain → template pattern

### Phase 2 — Shared Infrastructure
1. Build `shared/ui/` — shadcn/ui components
2. Build `shared/animations/` — GSAP wrapper components
3. Build `shared/hooks/` — GSAP utility hooks
4. Define all TypeScript types in `types/`
5. Create Zustand store
6. Create `cn()` utility, metadata builder

### Phase 3 — Template A (IEIskp)
1. Create `templates/template-a/config/tokens.ts` — green MD3 palette, Nunito/DM Sans fonts
2. Create `TemplateA.tsx` root component with page routing
3. Build layout components (Header, Footer) — match IEIskp design exactly
4. Build page components top-down: Home → About → Academics → Admissions → Contact → Updates
5. Extract ALL logic into `hooks/` per page
6. Wire up Views to compose page components

### Phase 4 — Template B (Kashmir-Cambridge)
1. Create `templates/template-b/config/tokens.ts` — gold/navy palette, Canela/Hind fonts
2. Create `TemplateB.tsx` root component with page routing
3. Build layout components (Header, MobileMenu, Footer, Breadcrumb) — match Kashmir-Cambridge design exactly
4. Build page components: Home → About → Academics → Admissions → Contact → Updates
5. Extract ALL logic into `hooks/` per page
6. Wire up Views

### Phase 5 — Integration & Polish
1. Test both templates via subdomain switching
2. GSAP performance audit (kill contexts on unmount)
3. Responsive testing (mobile, tablet, desktop)
4. SEO metadata for all pages
5. Accessibility pass (ARIA labels, keyboard nav)

---

## 13. REFERENCE FILE MAP

### IEIskp Source → Template A Target

| Source File | Reference For |
|---|---|
| `IEIskp/tailwind.config.js` + `app/globals.css` | Design tokens (colors, fonts, spacing) |
| `IEIskp/shared/layout/hadder.tsx` | Header component design |
| `IEIskp/shared/layout/footer.tsx` | Footer component design |
| `IEIskp/shared/ui/*` | UI component patterns (Badge, Button, Carousel, StatCard) |
| `IEIskp/shared/animations/index.tsx` | Animation patterns → convert to GSAP |
| `IEIskp/features/home/view/home-view.tsx` | Home page section composition |
| `IEIskp/features/home/hero/` | Hero section design |
| `IEIskp/features/home/*/` | All home page section designs |
| `IEIskp/features/about/*/` | About page sections |
| `IEIskp/features/academics/*/` | Academics page sections |
| `IEIskp/features/admissions/*/` | Admissions page sections |
| `IEIskp/features/contact/*/` | Contact page sections |
| `IEIskp/features/announcements/*/` | Updates page sections |
| `IEIskp/store/index.ts` | Zustand store pattern |
| `IEIskp/middleware.ts` | Middleware pattern |

### Kashmir-Cambridge Source → Template B Target

| Source File | Reference For |
|---|---|
| `kashmir-cambridge/src/app/globals.css` | Design tokens (gold palette, radii, shadcn vars) |
| `kashmir-cambridge/components.json` | shadcn/ui configuration |
| `kashmir-cambridge/src/components/layout/Header.tsx` | Header design |
| `kashmir-cambridge/src/components/layout/MobileMenu.tsx` | Mobile menu design |
| `kashmir-cambridge/src/components/layout/Footer.tsx` | Footer design |
| `kashmir-cambridge/src/components/layout/Breadcrumb.tsx` | Breadcrumb pattern |
| `kashmir-cambridge/src/components/ui/*` | UI components (Button, BlogCard, FacultyCard, Input) |
| `kashmir-cambridge/src/components/sections/Hero/` | Hero section design |
| `kashmir-cambridge/src/components/sections/About/` | About sections |
| `kashmir-cambridge/src/components/sections/Academics/` | Academics sections |
| `kashmir-cambridge/src/components/sections/*/` | All other sections |
| `kashmir-cambridge/src/hooks/*` | Hook patterns (useCarousel, useMobileMenu, useNavbar, useScroll, useTabs) |
| `kashmir-cambridge/src/data/*` | Data structure patterns |
| `kashmir-cambridge/src/types/*` | Type definitions reference |
| `kashmir-cambridge/src/app/page.tsx` | Home page composition |
| `kashmir-cambridge/src/app/about/page.tsx` | About page composition |

---

## 14. KEY DESIGN MATCHING INSTRUCTIONS

When building each template component, you MUST:

1. **Open the corresponding source component** from the reference repo
2. **Match the layout structure** exactly (grid columns, flex directions, section order)
3. **Match the visual design** (colors, spacing, typography, border-radius, shadows)
4. **Convert all CSS to Tailwind** — if source uses raw CSS, translate each property to Tailwind utility
5. **Convert CSS animations to GSAP** — identify animation type and recreate with GSAP
6. **Replace jQuery/Bootstrap/Swiper patterns** with React + GSAP equivalents
7. **Use shadcn/ui** where source uses custom buttons, cards, inputs, badges, modals
8. **Extract state/effects to hooks** — never leave logic in the JSX component file
9. **Make data dynamic** — all hardcoded text/images become props from `SchoolData`

---

## 15. NAMING CONVENTIONS

| Element | Convention | Example |
|---|---|---|
| Templates | kebab-case with `template-` prefix | `template-a/`, `template-b/` |
| Template roots | PascalCase | `TemplateA.tsx`, `TemplateB.tsx` |
| Components | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase with `use` prefix | `useHeroCarousel.ts` |
| Types | PascalCase with suffix | `HeroData`, `SchoolData` |
| Stores | camelCase with `-store` suffix | `ui-store.ts` |
| Directories | kebab-case | `template-a/`, `why-choose-us/` |
| CSS class composition | Via `cn()` helper | `cn("flex items-center", isActive && "bg-primary")` |
| Page types | lowercase string union | `'home' \| 'about' \| 'academics'` |

---

## 16. CRITICAL REMINDERS

> ⚠️ **Subdomain-based routing** — no `[template]` URL param, template resolved via `x-school-subdomain` header  
> ⚠️ **Frappe backend** — all school data comes from `getSchoolData()` in `lib/frappe.ts`  
> ⚠️ **`force-dynamic`** — all pages export `export const dynamic = 'force-dynamic'`  
> ⚠️ **Every component is presentational** — hooks hold ALL logic  
> ⚠️ **Zero raw CSS** — pure Tailwind utility classes only  
> ⚠️ **GSAP for ALL animations** — no framer-motion, no CSS @keyframes  
> ⚠️ **shadcn/ui for ALL UI primitives** — don't rebuild Button/Card/Input from scratch  
> ⚠️ **Match designs exactly** — reference the source repos for pixel-level accuracy  
> ⚠️ **Separate design tokens** — templates must never share color/font tokens  
> ⚠️ **Dynamic data** — nothing hardcoded, everything comes from SchoolData props  
> ⚠️ **Type everything** — strict TypeScript, no `any`  
> ⚠️ **GSAP cleanup** — always kill GSAP context/ScrollTrigger on component unmount  
> ⚠️ **Mobile-first responsive** — all components must be fully responsive  
> ⚠️ **Only 7 pages** — home, about, academics, admissions, contact, updates, login (NO campus-life)  

---

*This master prompt serves as the single source of truth for building the LEEEP CMS project. Every coding session should reference this document before writing any code.*
