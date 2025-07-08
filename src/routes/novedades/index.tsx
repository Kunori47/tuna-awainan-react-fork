import { Articles } from '@/components/articles/articles'
import { Expert } from '@/components/expert/expert'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/novedades/')({
  component: NovedadesComponent,
})

function NovedadesComponent() {
  return (
    <div className="min-h-screen flex flex-col">      
      <Articles></Articles>
      <Expert></Expert>
    
    </div>
  )
}
