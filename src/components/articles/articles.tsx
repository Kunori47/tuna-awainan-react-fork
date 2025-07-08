import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

const fetchArts = async () => {
    const { data, error } = await supabase
    .from("articles")
    .select("title, description, img, id")
    .order("id", { ascending: false })

    if (error) {
        throw new Error(error.message);
    }
    return data;
}


export function Articles() { 

    const { data: articles} = useQuery({ queryKey: ['articles'], queryFn: () => fetchArts() });

    return(
    
    
    <section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
        <div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
            <div className="flex flex-col gap-4">
            <header>
                <h1 className="text-3xl font-bold text-center my-8 mb-2">Artículos</h1>
            </header>

            <div className="card">
                <ul className="grid grid-cols-1">
                {articles &&
                    articles.slice(0, 2).map((article, index) => (
                    <li  className="flex flex-row bg-white shadow-md rounded-lg overflow-hidden mb-16
                        hover:shadow-xl  hover:border-1 hover:border-[#80808083] hover:cursor-pointer"                        
                    >
                        {/* Imagen del artículo */}
                        <div className="w-1/2 h-full">
                        <img
                            className="object-cover w-full h-full"
                            src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${article.img}`}
                            src= {`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/articles/${article.img}`}
                            alt={article.title}
                        />
                        </div>

                        {/* Contenido del artículo */}
                        <div className="w-1/2 p-6 flex flex-col justify-between">
                        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {article.title.substring(0, 50) + "..."}
                        </span>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {article.description.substring(0, 90) + "..."}
                        </p>

                        <p className="font-light text-gray-400">
                            Referencias: 
                        </p>
                        <p className="font-light text-gray-400">
                            Fecha: 08/04/2025
                        </p>
                        </div>
                    </li>
                    ))}
                    <hr />
                </ul>
            </div>
            </div>
        </div>
    </section>
    )
}