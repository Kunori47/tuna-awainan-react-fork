import { createFileRoute, Link } from "@tanstack/react-router";
import "./category.css";
import { Category } from "@/components/category/category";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/services/auth";

export const Route = createFileRoute("/articles/category/")({
	component: ArticleRouteComponent,
});

const fetchArts = async (nameQueryToSearch: string | null) => {
	let query = supabase
		.from("articles")
		.select("title, description, img, tag!inner(*) ,id, references, created_at")
		.order("id", { ascending: false });

	if (nameQueryToSearch) {
		query = query.ilike("tag.name", `%${nameQueryToSearch}%`);
	}

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}
	return data;
};

const getRole = async (id: string) => {
	const { data: role, error } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", id)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return role;
};

function ArticleRouteComponent() {
	const querySearch = new URLSearchParams(window.location.search);
	const nameQueryToSearch = querySearch.get("name");
	const {
		data: articles,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["articles", nameQueryToSearch],
		queryFn: () => fetchArts(nameQueryToSearch),
	});
	const { data: session } = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	});

	const { data: user } = useQuery({
		queryKey: ["profiles", session?.user?.id],
		queryFn: () =>
			session?.user?.id ? getRole(session.user.id) : Promise.resolve(undefined),
		enabled: !!session, // Only run query if session exists
	});

	const session_user = user?.role;

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<Category />

			<section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
            <div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
                <div className="flex flex-col gap-4">
                    <header>
                        <h2 className="text-3xl font-bold text-center my-8 mb-2">Artículos</h2>
                    
                        <div className=" my-8 flex justify-between ">
                            <p className="text-base text-gray-500 dark:text-gray-400">
                                Artículos publicados: {articles?.length}
                            </p>
                            {session_user === "admin" ? (
                                <Button 
                                    asChild
                                    variant="ghost" 
                                    className="text-[#0cc0df] hover:bg-transparent hover:text-[#087b9b] px-0 text-base"
                                >
                                    <Link to={"/articles/category/new"} className="flex items-center gap-2">
                                        Crear artículo
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" className="w-10 h-10">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                </Button>
                            ) : (
                                <div></div>
                            )}
                        </div>
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

			<hr className="max-w-screen-lg mx-auto" />
			<footer className="bg-white h-10p border-1 p-5 text-xs text-bold max-w-screen-lg mx-auto">
				Tuna awainan no se hace responsable por la información que suban los
				usuarios a esta página.
			</footer>
		</>
	);
}
