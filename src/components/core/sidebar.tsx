import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { Link, useLocation } from "@tanstack/react-router"
import { useAuth } from "@/hooks/use-auth"
import { logout } from "@/services/auth"
import { useMutation } from "@tanstack/react-query"

export function AppSidebar() {
  const { session } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname
  
  const lgoutMutaion = useMutation({
    mutationFn: async () => {
      await logout()
    }
  })

  // Debug: Mostrar información de la ruta actual
  console.log('Current path:', currentPath)
  console.log('Location object:', location)

  // Implementación usando useLocation y pathname
  const getActiveSection = () => {
    // Normalizar el pathname (remover trailing slash)
    const normalizedPath = currentPath.replace(/\/$/, '')
    
    console.log('Normalized path:', normalizedPath)
    
    // Casos específicos para cada sección
    if (normalizedPath === '') {
      return 'home'
    }
    
    if (normalizedPath === '/novedades') {
      return 'novedades'
    }
    
    if (normalizedPath === '/about') {
      return 'about'
    }
    
    if (normalizedPath.startsWith('/aquarium')) {
      return 'aquarium'
    }
    
    if (normalizedPath.startsWith('/articles')) {
      return 'articles'
    }
    
    if (normalizedPath.startsWith('/experto')) {
      return 'experto'
    }
    
    if (normalizedPath.startsWith('/community')) {
      return 'community'
    }
    
    if (normalizedPath.startsWith('/auth')) {
      return 'auth'
    }
    
    return 'home'
  }

  const activeSection = getActiveSection()
  console.log('Active section determined:', activeSection)

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full py-0">
        <SidebarGroup className="px-4 pt-10">
          <img src="https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/sign/files/logo/TUNA-awainan.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9sb2dvL1RVTkEtYXdhaW5hbi5wbmciLCJpYXQiOjE3NDM1NjYwNTUsImV4cCI6NDg5NzE2NjA1NX0.tRWlx0VtwQWAB7mZ6AckSbxDk-9mq70fF-HYaWi-PkY" alt="" className="w-28 h-28 mx-auto"/>
          <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight text-center first:mt-0">
            TUNA
          </h2>
          <h2 className="scroll-m-20 pb-2 text-4xl
          text-primary font-semibold tracking-tight text-center first:mt-0">
            AWAINAN
          </h2>
        </SidebarGroup>
        <SidebarGroup className="flex flex-col gap-1 flex-1 pt-0 justify-center items-start start-5">
          <Button 
            asChild 
            variant={activeSection === 'home' ? "sidebarLinkActive" : "sidebarLink"} 
            size={"sidebarLink"} 
            className="text-2xl"
          >
            <Link to="/">Inicio</Link>
          </Button>
          <Button 
            asChild 
            variant={activeSection === 'novedades' ? "sidebarLinkActive" : "sidebarLink"} 
            size={"sidebarLink"} 
            className="text-2xl"
          >
            <Link to="/novedades">Novedades</Link>
          </Button>
          <Button 
            asChild 
            variant={activeSection === 'aquarium' ? "sidebarLinkActive" : "sidebarLink"} 
            size={"sidebarLink"} 
            className="text-2xl"
          >
            <Link to="/aquarium">Acuario</Link>
          </Button>
          <Button 
            asChild 
            variant={activeSection === 'articles' ? "sidebarLinkActive" : "sidebarLink"} 
            size={"sidebarLink"} 
            className="text-2xl"
          >
            <Link to="/articles/introArticles">Artículos</Link>
          </Button>
          <Button 
            asChild 
            variant={activeSection === 'experto' ? "sidebarLinkActive" : "sidebarLink"} 
            size={"sidebarLink"} 
            className="text-2xl"
          >
            <Link to="/experto/introExperto">Expertos</Link>
          </Button>
          <Button 
            asChild 
            variant={activeSection === 'community' ? "sidebarLinkActive" : "sidebarLink"} 
            size={"sidebarLink"} 
            className="text-2xl"
          >
            <Link to="/community/introCommunity">Comunidad</Link>
          </Button>
          <Button 
            asChild 
            variant={activeSection === 'about' ? "sidebarLinkActive" : "sidebarLink"} 
            size={"sidebarLink"} 
            className="text-2xl"
          >
            <Link to="/about">Sobre nosotros</Link>
          </Button>
          {
            session ? (
              <Button
                onClick={() => lgoutMutaion.mutate()}
                variant={"sidebarLink"} 
                size={"sidebarLink"} 
                className="text-2xl"
              >
                Cerrar sesión
              </Button>
            ) : (
              <Button 
                asChild 
                variant={activeSection === 'auth' ? "sidebarLinkActive" : "sidebarLink"} 
                size={"sidebarLink"} 
                className="text-2xl"
              >
                <Link to="/auth/login">Iniciar sesión</Link>
              </Button>
            )
          }
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}