import { Articles } from '@/components/articles/articles'
import { Expert } from '@/components/expert/expert'
import { createFileRoute } from '@tanstack/react-router'
import {TopBar} from '@/components/category/category'
export const Route = createFileRoute('/novedades/')({
  component: NovedadesComponent,
})

function NovedadesComponent() {
  return (
    <div>
      <TopBar></TopBar>
      <Articles></Articles>
      <Expert></Expert>
    </div>
  )
}
