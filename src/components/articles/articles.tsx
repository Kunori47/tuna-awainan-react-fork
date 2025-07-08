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

    return (
        <>
            <section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
                <div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
                    <div className="flex flex-col gap-4">
                        <header>
                            <h2 className="text-3xl font-bold text-center my-8 mb-2">Artículos</h2>
                            
                            <div className="my-8 flex justify-between">
                                <p className="text-base text-gray-500 dark:text-gray-400">
                                    Artículos publicados: {articles?.length}
                                </p>
                            </div>
                        </header>


                        <div className="card">
                            <ul className="grid grid-cols-1 gap-8">
                                {articles &&
                                    articles.slice(0, 5).map((article) => (
                                        <Link 
                                            key={article.id}
                                            to={"/articles/category/$articleid"} 
                                            params={{ articleid: article.id }}
                                            className="block hover:scale-[1.01] transition-transform"
                                        >
                                            <li className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden mb-16 hover:shadow-xl hover:border hover:border-gray-200 md:flex-row md:h-72">
                                                {/* Imagen del artículo */}
                                                <div className="w-full h-64 md:w-1/2 md:h-auto">
                                                    <img
                                                        className="object-cover w-full h-full"
                                                        // src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${article.img}`}
                                                        src= {`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${article.img}`}
                                                        alt={article.title}
                                                    />
                                                </div>

                                                {/* Contenido del artículo */}
                                                <div className="w-full p-6 flex flex-col justify-between md:w-1/2">
                                                    <div>
                                                        <h3 className="mb-2 text-2xl font-bold text-gray-900 line-clamp-3">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-600 line-clamp-4">
                                                            {article.description}
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                                                        <span className="font-normal text-gray-500">
                                                            {article.references?.substring(0, 30) || "Desconocido"}
                                                        </span>
                                                        <span className="text-gray-400">·</span>
                                                        <time dateTime={article.created_at}>
                                                            {new Date(article.created_at).toLocaleDateString("es-ES", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            })}
                                                        </time>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="max-w-screen-lg mx-auto" />
        </>
    );
}