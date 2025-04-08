import { createFileRoute, Link } from '@tanstack/react-router'
import './category.css'
import { Category } from '@/components/category/category'
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { getSession } from "@/services/auth";
import { Articles } from '@/components/articles/articles'
import { Expert } from '@/components/expert/expert'
//import { Map } from '@/components/map/mapposts'

export const Route = createFileRoute('/articles/category/')({
  component: ArticleRouteComponent,
})

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

function ArticleRouteComponent() {
  const { data: articles, isLoading, error } = useQuery({ queryKey: ['articles'], queryFn: () => fetchArts() });
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  const session_user = session?.user?.role;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <><Category />
    
    <section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
    <div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
        <div className="flex flex-col gap-4">
        <header>
            <h2 className="text-3xl font-bold text-center my-8 mb-2">Artículos</h2>
            <p className="text-base text-gray-700 dark:text-gray-400">
                Artículos disponibles: {articles?.length}
            </p>
        </header>

        <div className="card">
            <ul className="grid grid-cols-1">
            {articles &&
                articles.slice(0, 2).map((article, index) => (
                    <li
                        key={article.id}
                        className="flex flex-row bg-white shadow-md rounded-lg overflow-hidden mb-16 xl:h-64 lg:h-72 md:h-80
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

                    {/* Contenido del artículo */}
                    <div className="w-1/2 p-6 flex flex-col justify-between">
                        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white block mb-2">
                            {/* {index === 0 ? ( */}
                                {/* // <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            // ) : null} */}
                            {article.title.substring(0, 50) + "..."}
                        </span>
                        <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
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
            </ul>
        </div>
        </div>
    </div>
    </section>

    {session_user === "specialist" || session_user === "admin" ? (
        <Button className="w-1/6 hover:bg-[#087b9b]">
            <Link to={"/experto/post/new"}>Crear un nuevo post</Link>
        </Button>
    ) : (
        <Button className="w-1/6 hover:bg-[#087b9b] min-w-fit">
            <a href="mailto:grupotunawainan@gmail.com?subject=Solicitud para crear posts&body=Coloque su usuario y escriba la razon del porque quiere crear un post en la pagina.">
                Solicitud para crear posts
            </a>
        </Button>
    )}

    <hr className="max-w-screen-lg mx-auto" />
    <footer className="bg-white h-10p border-1 p-5 text-xs text-bold max-w-screen-lg mx-auto">
        Tuna awainan no se hace responsable por la información que suban los
        usuarios a esta página.
    </footer>

    </>

  );
}
