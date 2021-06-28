import cookie from 'js-cookie'
import Router from 'next/router'
import { AuthProvider } from '../../libs/auth'
import PageTitle from '../../components/PageTitle'
import PageHeader from '../../components/PageHeader'
import PageMainContent from '../../components/PageMainContent'

export default function LayoutApp({ children }) {
  if (process.browser && ! cookie.get('laranext-auth')) {
      Router.push('/login')
  }
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <PageHeader />
        <div className="py-10">
          <PageTitle title="Dashboard"/>
          <PageMainContent>
            {children}
          </PageMainContent>
        </div>
      </div>
    </AuthProvider>
  )
}
