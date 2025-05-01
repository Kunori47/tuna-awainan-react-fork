import { Articles } from '@/components/articles/articles'
import { Expert } from '@/components/expert/expert'
import { createFileRoute } from '@tanstack/react-router'
import { NewContent } from "@/components/newContent/newContent";
import { Map } from '@/components/map/mapposts'

export const Route = createFileRoute('/novedades/')({
  component: NovedadesComponent,
})

function NovedadesComponent() {
  return (
    <div>
      <NewContent></NewContent>
      <div id="Artículos"><Articles></Articles></div>
      <div id="Expertos"><Expert></Expert></div>
    
    </div>
  )
}
