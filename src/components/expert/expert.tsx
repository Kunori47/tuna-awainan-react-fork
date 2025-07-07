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
                        <ul className="grid grid-cols-1 gap-8">
                        {posts &&
                            posts.slice(0, 5).map((post) => (
                            <Link 
                                key={post.id}
                                to={'/experto/post/$postid'} 
                                params={{postid: post.id}}
                                className="block hover:scale-[1.01] transition-transform"
                            >
                                <li className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:border hover:border-gray-200 md:flex-row md:h-72">
                                    {/* Imagen del artículo */}
                                    <div className="w-full h-64 md:w-1/2 md:h-auto">
                                        <img
                                            className="object-cover w-full h-full"
                                            src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${post.img}`}
                                            alt={post.title}
                                        />
                                    </div>

                                    {/* Contenido del artículo */}
                                    <div className="w-full p-6 flex flex-col justify-between md:w-1/2">
                                        <div>
                                            <h3 className="mb-2 text-2xl font-bold text-gray-900 line-clamp-3">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 line-clamp-4">
                                                {post.content}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                                            <span className="font-normal text-gray-500">
                                                {post.profiles.username}
                                            </span>
                                            <span className="text-gray-400">·</span>
                                            <time dateTime={post.created_at}>
                                                {new Date(post.created_at).toLocaleDateString("es-ES", {
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
            
            <footer className="mt-12 px-5 py-6 text-center text-sm text-gray-500 border-t max-w-screen-lg mx-auto">
                Tuna awainan no se hace responsable por la información que suban los
                usuarios a esta página.
            </footer>
        </section>
    )
}