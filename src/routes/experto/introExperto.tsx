import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/experto/introExperto')({
  component: introExpertComponent,
})

function introExpertComponent() {
  const navigate = useNavigate();
  return (<div className='min-h-screen flex flex-col'>
    <section className='flex-grow flex flex-col justify-center items-center bg-white text-gray-800 p-4 md:p-8'>
      <div className='text-center max-w-3xl space-y-4 md:space-y-8'>

        <h1 className='text-3xl md:text-4xl font-bold mb-4 text-[#0aaccb]'>
          Hablando con Expertos
        </h1>

        <p className='text-md md:text-lg text-gray-800 mb-32'>
        En esta sección, encontrarás artículos escritos por expertos en áreas relacionadas con el agua, seleccionados cuidadosamente para brindarte información confiable y actual. 
          <br /> Al ser usuario registrado, podrás interactuar y enriquecer el contenido compartiendo tus opiniones a través de los comentarios.
      
        </p>

        
        <Button
            className='hover:bg-white hover:text-[#0cc0df] text-lg md:text-xl shadow-xl font-extrabold '
            onClick={() => navigate({to:'/experto/post'})} // Navegación programática
          >
            Ver posts
          </Button>

      </div>

    </section>

  </div>)
}
