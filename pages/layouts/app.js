import cookie from 'js-cookie'
import Router from 'next/router'
import { AuthProvider } from '../../libs/auth'
import PageTitle from '../../components/PageTitle'
import PageHeader from '../../components/PageHeader'
import PageMainContent from '../../components/PageMainContent'

export default function LayoutApp({ children }) {
  if (process.browser && ! cookie.get('next-auth')) {
      Router.push('/login')
  }
  return (
    <div className="min-h-screen bg-white">
        <PageHeader />
        <div className="py-10">
          <PageMainContent>
            {children}
          </PageMainContent>
        </div>
      </div>
  )
}
