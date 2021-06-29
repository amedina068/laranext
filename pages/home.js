import LayoutApp from './layouts/app'

const title = "Dashboard"

export default function Home() {
  return (
    <LayoutApp>
      <PageTitle title={title}/>
      <div className="mt-40">
        <p className="text-5xl font-thin tracking-wide text-gray-500 text-center">Dreams shape the world</p>
      </div>
    </LayoutApp>
  )
}