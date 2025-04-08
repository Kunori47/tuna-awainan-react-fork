import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { Link } from "@tanstack/react-router"
import { useAuth } from "@/hooks/use-auth"
import { logout } from "@/services/auth"
import { useMutation } from "@tanstack/react-query"

export function AppSidebar() {
  const { session } = useAuth()
  const lgoutMutaion = useMutation({
    mutationFn: async () => {
      await logout()
    }
  })

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full py-0 justify-center">
        <SidebarGroup className="px-4 pt-12">
          <img src="https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/sign/files/logo/TUNA-awainan.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJmaWxlcy9sb2dvL1RVTkEtYXdhaW5hbi5wbmciLCJpYXQiOjE3NDM1NjYwNTUsImV4cCI6NDg5NzE2NjA1NX0.tRWlx0VtwQWAB7mZ6AckSbxDk-9mq70fF-HYaWi-PkY" alt="" className="w-20 h-20 mx-auto"/>
          <h2 className="text-2xl font-semibold tracking-tight text-center pb-0 mt-0">
            TUNA
          </h2>
          <h2 className="text-2xl text-primary font-semibold tracking-tight text-center pb-0 mt-0">
            AWAINAN
          </h2>
        </SidebarGroup>
        <SidebarGroup className="flex flex-col gap-1 flex-0 pt-0 justify-center items-start start-10">
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
            <Link to="/">Inicio</Link>
          </Button>
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
            <Link to="/novedades">Novedades</Link>
          </Button>
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
            <Link to="/aquarium">Acuario</Link>
          </Button>
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
            <Link to="/articles/introArticles">Artículos</Link>
          </Button>
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
            <Link to="/experto/introExperto">Expertos</Link>
          </Button>
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
            <Link to="/community/introCommunity">Comunidad</Link>
          </Button>
          <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
            <Link to="/about">Sobre nosotros</Link>
          </Button>
          {
            session ? (
              <Button
                onClick={() => lgoutMutaion.mutate()}
                variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
                Logout
              </Button>
            ) : (
              <Button asChild variant={"sidebarLink"} size={"sidebarLink"} className="text-lg">
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