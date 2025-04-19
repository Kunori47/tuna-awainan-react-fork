import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

const fetchArts = async () => {
    const { data, error } = await supabase
    .from("articles")
    .select("title, description, img, id, references, created_at")
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
                        <h2 className="text-3xl font-bold text-center my-8 mb-2">Artículos</h2>
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
                                    src={article.img}
                                    alt={article.title}
                                />
                                </div>

                                {/* Contenido del articulo */}
                                <div className="w-1/2 p-6 flex flex-col justify-between">
                                    <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                                        {article.title.substring(0, 85)}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                                        {article.description.substring(0, 150) + "..."}
                                    </p>

                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="font-normal text-gray-400">{
                                                article.references ?
                                                article.references.substring(0, 30)
                                                : "Desconocido"
                                            }</span>
                                        <span className="text-gray-500">·</span>
                                        <time dateTime={article.created_at} className="font-normal text-gray-400">
                                            {new Date(article.created_at).toLocaleDateString("es-ES", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric"
                                            })}
                                        </time>
                                    </div>													
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