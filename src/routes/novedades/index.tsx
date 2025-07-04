import { Articles } from '@/components/articles/articles'
import { Expert } from '@/components/expert/expert'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/novedades/')({
  component: NovedadesComponent,
})

function NovedadesComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar Azul */}
      <div className="bg-[#0aaccb] pb-16 border-none flex items-center justify-center h-24">
        <h2 className='text-3xl md:text-4xl font-bold text-white mt-10'>Novedades</h2>
      </div>
      
      <Articles></Articles>
      <Expert></Expert>
    </div>
  )
}
