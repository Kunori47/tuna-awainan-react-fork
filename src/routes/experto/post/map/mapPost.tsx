import { createFileRoute, Link } from '@tanstack/react-router'
import Map from '@/components/map/mapAllForum'
import { supabase } from "@/lib/supabase";
import { Forun } from '@/components/map/mapAllForum';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
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

    console.log(forums);

  return (
    <>

        <header className="bg-white  flex items-center justify-center h-28">
				<div className="pb-16 border-none flex items-center justify-center h-24">
        			<h2 className='text-3xl md:text-4xl font-bold text-black mt-10'>Hablando con Expertos</h2>
      			</div>
				<Link to={'/experto/post'} >
					<div className='absolute right-10 top-6 shadow-lg rounded-full bg-[#0cc0df] size-[70px] '>
						<FontAwesomeIcon icon={faMap} className="absolute right-2 top-3 text-5xl justify-center text-gray-50"/>
						
					</div>	
				</Link>
		</header>

     
      <div className='absolute top-32'>  
                    <Map category={'experts'} forums={forums}></Map>
      </div> 
  </>) 
}