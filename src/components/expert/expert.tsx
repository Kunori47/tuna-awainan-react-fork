import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const fetchPost = async () => {
    const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("id", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }
    return data;
}


export function Expert(){
    const { data: posts, error, isLoading } = useQuery({ 
        queryKey: ['posts'], 
        queryFn: fetchPost 
      });    

    return (
        <section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
        <div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
            <div className="flex flex-col gap-4">
                <header>
                    <h2 className="text-3xl font-bold text-center my-8 mb-2">Hablando con Expertos</h2>
                </header>
                <div className="card">
                  <ul className="grid grid-cols-1">
                  {posts &&
                      posts.slice(0, 2).map((post, index) => (
                      <Link to={'/experto/post/$postid'} params={{postid: post.id}}>
                      <li
                          className="flex flex-row bg-white shadow-md rounded-lg overflow-hidden mb-16  xl:h-64 lg:h-72 md:h-80
                                hover:shadow-xl  hover:border-1 hover:border-[#80808083] hover:cursor-pointer"                  
                      >
                          {/* Imagen del artículo */}
                          <div className="w-1/2 h-full">
                          <img
                              className="object-cover w-full h-full"
                              src={post.img}
                              alt={post.title}
                          />
                          </div>
    
                          {/* Contenido del artículo */}
                          <div className="w-1/2 p-6 flex flex-col justify-between">
                          <span className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {post.title}
                          </span>
                          <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
                              {post.content.substring(0, 290) + "..."}
                          </p>
    
                          <p className='font-light text-gray-400'>
                            Autor: {post.profiles.username}
                            
                          </p>
                          <p className='font-light text-gray-400'>
                            Fecha: {post.fecha}
                          </p>
                          </div>
                      </li>
                      </Link>
                      ))}
                      <hr />
                  </ul>
                </div>
            </div>
        </div>
    </section>
    
    )


}