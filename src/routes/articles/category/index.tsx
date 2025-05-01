import { createFileRoute, Link } from "@tanstack/react-router";
import "./category.css";
import { Category } from "@/components/category/category";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/services/auth";
import { ClipLoader } from "react-spinners"; // Importa el spinner

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

	if (isLoading) return(
		<div>
			<Category />
			<div className="flex justify-center items-center h-64">
				<ClipLoader color="#0cc0df" size={50} />
			</div>
		</div>
	);
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<Category />

			<section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
				<div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
					<div className="flex flex-col gap-4">
						<header>
							<h2 className="text-3xl font-bold text-center my-8 mb-2">
								Artículos
							</h2>
							<p className="text-base text-gray-700 dark:text-gray-400">
								Artículos disponibles: {articles?.length}
							</p>
						</header>
						{session_user === "admin" ? (
							<Button className="w-fit hover:bg-[#087b9b]">
								<Link to={"/articles/category/new"}>
									Crear un nuevo artículo
								</Link>
							</Button>
						) : (
							<div></div>
						)}

						<div className="card">
							<ul className="grid grid-cols-1">
								{articles &&
									articles.map((article, index) => (
										<a
											key={article.id}
											className="flex flex-row bg-white shadow-md rounded-lg overflow-hidden mb-16 xl:h-64 lg:h-72 md:h-80
                                hover:shadow-xl  hover:border-1 hover:border-[#80808083] hover:cursor-pointer"
											href={`/articles/category/${article.id}`}
										>
											{/* Imagen del artículo */}
											<div className="w-1/2 h-full">
												<img
													className="object-cover w-full h-full"
													src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${article.img}`}
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
													Referencias: {article.references}
												</p>
												<p className="font-light text-gray-400">
													Fecha:{" "}
													{article.created_at
														? new Date(article.created_at).toLocaleDateString(
																"es-ES",
																{
																	day: "2-digit",
																	month: "2-digit",
																	year: "numeric",
																},
															)
														: "Unknown Date"}
												</p>
											</div>
										</a>
									))}
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
