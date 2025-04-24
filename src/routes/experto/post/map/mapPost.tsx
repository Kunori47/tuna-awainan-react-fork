import { createFileRoute, Link } from '@tanstack/react-router'
import Map from '@/components/map/mapAllForum'

export const Route = createFileRoute('/experto/post/map/mapPost')({
  component: RouteComponent,
})

//get all post 

function RouteComponent() {
  return (<>

      <section className="w-full px-24 sm:px-5 grid grid-cols-1">
            <div className="font-custom max-w-screen-lg gap-8">
                <div className="flex flex-col">

                <h2 className="text-5xl font-bold text-center my-8 mb-2">
								Hablando con Expertos
							</h2>
                  <Link to={'/experto/post'} >
                        <div className='absolute right-10 top-6 shadow-lg rounded-full bg-[#0cc0df] size-[70px]'>
                      
                        </div>
                    </Link>
                  
                  
                  
                </div>
            </div>

      </section>
      <div className='absolute top-32'>  
                    <Map category={'experts'}></Map>
      </div> 
  </>) 
}