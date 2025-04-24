import { createFileRoute, Link } from '@tanstack/react-router'
import Map from '@/components/map/mapAllForum'
import { supabase } from "@/lib/supabase";
import { Forun } from '@/components/map/mapAllForum';
import { useQuery } from '@tanstack/react-query';
export const Route = createFileRoute('/experto/post/map/mapPost')({
  component: RouteComponent,
})

//get all post 
const fetchPost = async () => {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", "expert");

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

function RouteComponent() {

    const { data: forums, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPost,
    });
    

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {    
        return <div>Error: {error.message}</div>;
    }

    console.log(forums)



  return (<>

      <section className="w-4/5 px-24 sm:px-5 grid grid-cols-1">
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
                    <Map category={'experts'} forums={forums}></Map>
      </div> 
  </>) 
}