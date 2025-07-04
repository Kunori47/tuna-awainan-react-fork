import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { Link, useRouter } from "@tanstack/react-router"
import { useAuth } from "@/hooks/use-auth"
import { logout } from "@/services/auth"
import { useMutation } from "@tanstack/react-query"

export function AppSidebar() {
  const { session } = useAuth()
  const router = useRouter()
  const currentPath = router.state.location.pathname
  
  const lgoutMutaion = useMutation({
    mutationFn: async () => {
      await logout()
    }
  })

  // Función para determinar si una ruta está activa
  const isActiveRoute = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

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
          <Button asChild variant={isActiveRoute("/") ? "sidebarLinkActive" : "sidebarLink"} size={"sidebarLink"} className="text-2xl">
            <Link to="/">Inicio</Link>
          </Button>
          <Button asChild variant={isActiveRoute("/novedades") ? "sidebarLinkActive" : "sidebarLink"} size={"sidebarLink"} className="text-2xl">
            <Link to="/novedades">Novedades</Link>
          </Button>
          <Button asChild variant={isActiveRoute("/aquarium") ? "sidebarLinkActive" : "sidebarLink"} size={"sidebarLink"} className="text-2xl">
            <Link to="/aquarium">Acuario</Link>
          </Button>
          <Button asChild variant={isActiveRoute("/articles") ? "sidebarLinkActive" : "sidebarLink"} size={"sidebarLink"} className="text-2xl">
            <Link to="/articles/introArticles">Artículos</Link>
          </Button>
          <Button asChild variant={isActiveRoute("/experto") ? "sidebarLinkActive" : "sidebarLink"} size={"sidebarLink"} className="text-2xl">
            <Link to="/experto/introExperto">Expertos</Link>
          </Button>
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-2xl">
            <Link to="/community/introCommunity">Comunidad</Link>
          </Button>
          <Button asChild variant={isActiveRoute("/about") ? "sidebarLinkActive" : "sidebarLink"} size={"sidebarLink"} className="text-2xl">
            <Link to="/about">Sobre nosotros</Link>
          </Button>
          {
            session ? (
              <Button
                onClick={() => lgoutMutaion.mutate()}
                variant={"sidebarLink"} size={"sidebarLink"} className="text-2xl">
                Cerrar sesión
              </Button>
            ) : (
              <Button asChild variant={isActiveRoute("/auth") ? "sidebarLinkActive" : "sidebarLink"} size={"sidebarLink"} className="text-2xl">
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