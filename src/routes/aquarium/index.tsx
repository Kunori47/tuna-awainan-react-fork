import { ButtonLetter } from '@/components/aquarium/ButtonLetter'
import { LayoutAquarium } from '@/components/aquarium/LayoutAquarium'
import { supabase } from '@/lib/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/aquarium/')({
  component: AquariumComponent,
})
function AquariumComponent() {
  return (
    <div className='min-h-screen flex flex-col'>
        <LayoutAquarium></LayoutAquarium>
        <section className='flex-grow flex flex-col justify-center items-center bg-white text-gray-800 p-4 md:p-8'>
          <div className='text-center max-w-3xl space-y-4 md:space-y-8'>
            <h1 className="text-3xl md:text-4xl font-normal mb-4 text-[#0aaccb]">¿Ya viste el Acuario?</h1>  
              <p className='text-md md:text-lg text-gray-800 mb-32'>
                &emsp;&emsp;"Un pedacito de Venezuela en tu salón. <br />
                  Descubre la increíble biodiversidad de la cuenca
                  del Orinoco a través de nuestro acuario.
                  Cada pez cuenta una historia sobre la importancia de preservar 
                  nuestros ecosistemas. ¡Acompáñanos en este viaje educativo y 
                  contribuye a la conservación de esta joya natural!"
              </p>  
          </div>
        </section>
    </div>
  )
}
