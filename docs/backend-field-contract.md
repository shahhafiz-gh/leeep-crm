# LEEEP CMS — Backend Field Contract

Both **Template A** and **Template B** consume the **same** `SchoolData` contract
(`src/types/school.types.ts`). The Frappe backend returns **one `SchoolData` object
per school** from:

```
GET /api/method/education.education.api.get_school_data?subdomain={subdomain}
→ { "message": SchoolData }
```

The two **Updates detail** endpoints are the only per-item endpoints:

```
GET /api/method/education.education.api.get_website_announcement?name={id}
GET /api/method/education.education.api.get_website_event?name={id}
```

**Legend:** **required** = no `?` in the type · *optional* = may be omitted.
Field paths are relative to the root `SchoolData` object.

---

## 0. Global / Site-wide (every page — Header & Footer)

**Identity (root level)**

| Field | Req | Notes |
|---|---|---|
| `name` | required | School name |
| `tagline` | required | |
| `logo` | required | Image URL/path |
| `config.template_id` | required | `'template-a'` \| `'template-b'` — decides which template renders |

**Header → Navigation** (`navigation[]`)

| Field | Req | Notes |
|---|---|---|
| `label` | required | |
| `href` | required | |
| `children[]` | optional | Same shape — for dropdown menus |

**Footer** (`footer`)

| Field | Req | Notes |
|---|---|---|
| `description` | optional | |
| `copyright` | optional | |
| `columns[]` | required | Each: `title` (required), `links[]` (required) → `{ label, href }` |

**Social links** (`socialLinks[]`)

| Field | Req | Notes |
|---|---|---|
| `platform` | required | `facebook` \| `twitter` \| `instagram` \| `youtube` \| `linkedin` \| string |
| `url` | required | |
| `icon` | optional | iconify name |

---

## 1. Home Page

**Hero section** (`hero.slides[]`)

| Field | Req | Notes |
|---|---|---|
| `title` | required | |
| `image` | required | |
| `subtitle` | optional | |
| `description` | optional | |
| `video` | optional | When set, renders a video hero background |
| `cta.label`, `cta.href` | optional | CTA button |

**Stats section** (`stats[]`)

| Field | Req | Notes |
|---|---|---|
| `label` | required | |
| `value` | required | string \| number |
| `suffix` | optional | |
| `icon` | optional | |

**About / Why-Choose-Us teaser** — pulls from `about`: `about.description`, `about.image`, `about.badges[]`, `about.whyChooseUs[]` (see About page).

**Programs section** (`programs[]`) *(optional array)*

| Field | Req | Notes |
|---|---|---|
| `id`, `name`, `description` | required | |
| `image`, `grade_range`, `features[]` | optional | |

**Announcements teaser** — `updates.announcements[]` (see Updates page).

**Events teaser** — `updates.events[]` (see Updates page).

**Alumni section** (`alumni[]`) *(optional)*

| Field | Req | Notes |
|---|---|---|
| `name`, `batch`, `achievement` | required | |
| `image`, `testimonial` | optional | |

**Testimonials section** (`testimonials[]`)

| Field | Req | Notes |
|---|---|---|
| `id`, `name`, `role`, `content` | required | |
| `avatar`, `rating` | optional | |

---

## 2. About Page (`about`)

**Hero / intro**

| Field | Req | Notes |
|---|---|---|
| `title`, `description` | required | |
| `subtitle`, `image` | optional | |

**Floating trust badges** (`about.badges[]`) *(optional)* — `label` (required); `icon`, `sublabel` (optional)

**Mission section** (`about.mission[]`) *(optional)* — per item: `title`, `description` (required); `icon`, `image` (optional)
- `about.missionStatement` *(optional, single statement)*

**Vision & Values**
- `about.vision` *(optional, string)*
- `about.values[]` *(optional, string array)*

**Why Choose Us** (`about.whyChooseUs[]`) *(optional)* — `title`, `description` (required); `icon` (optional)

**Achievements section** (`about.achievements[]`) *(optional)* — `title`, `description` (required); `year`, `image`, `icon` (optional)

**Story / Recognition** *(Template B)*
- `about.story` *(optional, string)*
- `about.recognition.{title, description, items[]}` — items: `{ title, description, image? }`

---

## 3. Academics Page (`academics`)

**Hero / intro**

| Field | Req | Notes |
|---|---|---|
| `title`, `description` | required | |
| `subtitle`, `image` | optional | |

**Streams section** (`academics.streams[]`) *(optional)* — `name`, `description` (required); `subjects[]`, `image` (optional)

**Methodology section** (`academics.methodology`) *(optional)* — `title`, `description` (required); `steps[]` → `{ title, description, icon? }`

**Results section** (`academics.results`) *(optional)* — `title`, `description` (required); `stats[]` → `{ label, value }`; `image` (optional)

**Clubs section** (`academics.clubs[]`) *(optional)* — `name`, `description` (required); `image` (optional)

**Curriculum** *(optional)* — `academics.curriculum.{title, description, items[]}` → items `{ title, description }`

**Courses** *(optional)* — `academics.courses[]` → `{ id, name, description, duration?, image?, subjects?[] }`

---

## 4. Admissions Page (`admissions`)

**Hero / intro**

| Field | Req | Notes |
|---|---|---|
| `title`, `description` | required | |
| `subtitle`, `image` | optional | |

**Hero highlight badges** (`admissions.highlights[]`) *(optional)* — `{ label, icon?, sublabel? }`

**Callout card** (`admissions.callout`) *(optional)* — single `{ label, icon?, sublabel? }`

**Process / How to Apply** (`admissions.process`) *(optional)* — `title` (required); `steps[]` → `{ step (number), title, description }`

**Why Choose** (`admissions.whyChoose[]`) *(optional)* — `{ title, description, icon? }`

**Fee structure** (`admissions.feeStructure[]`) *(optional)* — `{ grade, tuition, total, details? }`

**FAQs** (`admissions.faqs[]`) *(optional)* — `{ question, answer }`

**Application form** — `admissions.formEnabled` *(optional boolean — toggles the form)*

---

## 5. Contact Page (`contact`)

**Hero / intro**

| Field | Req | Notes |
|---|---|---|
| `title` | required | |
| `address` | required | |
| `phone[]` | required | Array — multiple numbers supported |
| `email[]` | required | Array — multiple addresses supported |
| `subtitle`, `workingHours` | optional | |

**Hero highlight badges** (`contact.highlights[]`) *(optional)* — `{ label, icon?, sublabel? }`

**Map section** — `mapEmbedUrl`, `mapUrl`, `coordinates.{lat,lng}` *(all optional)*

**Find Us section**
- `contact.landmarks[]` *(optional)* — `{ label, icon? }`
- `contact.transport[]` *(optional)* — `{ type, detail }`
- `contact.visitingHours[]` *(optional)* — `{ label, time }`

---

## 6. Updates Page (`updates`)

**Announcements list** (`updates.announcements[]`)

| Field | Req | Notes |
|---|---|---|
| `id`, `title` | required | |
| `short_description` | optional | Card summary |
| `content` | optional | Full body (detail page) |
| `thumbnail` | optional | |
| `published_date` | optional | |
| `author` | optional | |
| `category` | optional | |
| `is_pinned` | optional | boolean |

**Events list** (`updates.events[]`)

| Field | Req | Notes |
|---|---|---|
| `id`, `title`, `date` | required | |
| `description` | optional | Full body (detail page) |
| `end_date`, `location`, `image`, `category` | optional | |

**Update Detail page** — uses the same item shapes; `content` (announcement) / `description` (event) carry the full body. Served by `get_website_announcement` / `get_website_event`.

---

## 7. Login Page

| Field | Req | Notes |
|---|---|---|
| `portalLinks[]` | optional | `{ label, url, variant?: 'primary' \| 'dark' }` |

Also uses global `name` / `logo`.

---

## Defined in the contract but not yet bound to a page section

The backend may populate these; no dedicated section renders them in the current views.

- `gallery.{title?, images[]}` → `images[]` = `{ src, alt, category? }`
- `faculty[]` → `{ id, name, designation, department?, image?, bio?, qualifications?[], email? }`

---

## Notes for the backend team

1. **One endpoint, one object.** `get_school_data?subdomain=...` returns the entire `SchoolData` tree above. The only per-item endpoints are the two Updates-detail ones.
2. **Image fields** (`logo`, `*.image`, `thumbnail`, `gallery.images[].src`, slide `image`/`video`) are returned as Frappe file paths like `/files/x.webp` and resolved client-side via `resolveFrappeMediaUrl()`. Return either a path or a full URL.
3. **`config.template_id`** must always be present — it decides whether Template A or Template B renders.
4. **`phone` and `email` are arrays** (multiple values supported).
5. **`badges` / `highlights` / `callout`** are editable icon+label chips — nothing is hardcoded in the components, so these need explicit Frappe field support.
