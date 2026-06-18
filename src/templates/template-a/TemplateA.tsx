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

/**
 * Template A — IEIskp Style
 * Material Design 3 / Green Nature aesthetic.
 * Root component that routes to the correct page view.
 */
export default function TemplateA({ data, page }: TemplateProps) {
  const PageComponent = pageMap[page]

  return (
    <div className="template-a bg-ta-background text-ta-on-background font-(family-name:--font-dm-sans) min-h-screen flex flex-col">
      <Header data={data} />
      <main className="grow">
        <PageComponent data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}
