import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/community/forum/")({
	component: CommunityComponent,
});

const fetchForum = async () => {
	const { data, error } = await supabase
		.from("posts")
		.select("*, profiles(username)")
		.eq("category", "community");

	if (error) {
		throw new Error(error.message);
	}
	return data;
};

function CommunityComponent() {
	const {
		data: forum,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["forum"],
		queryFn: fetchForum,
	});

	const { data: session } = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
				<div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
					<div className="flex flex-col gap-4">
						<header>
							<h2 className="text-3xl font-bold text-center my-8 mb-2">
								Sección Comunidad
							</h2>
							<p className="text-base text-gray-700 dark:text-gray-400">
								Foros publicados: {forum?.length}
							</p>
						</header>
						{session ? (
							<Button className="w-1/6 hover:bg-[#087b9b] min-w-fit">
								<Link to={"/community/forum/new"}>Crear un nuevo foro</Link>
							</Button>
						) : null}

						<div className="card">
							<ul className="grid grid-cols-1">
								{forum &&
									forum.map((foro) => (
										<Link
											to={"/community/forum/$forumid"}
											params={{ forumid: foro.id }}
										>
											<li
												className="flex flex-row bg-white shadow-md rounded-lg overflow-hidden mb-16  xl:h-64 lg:h-72 md:h-80
												hover:shadow-xl  hover:border-1 hover:border-[#80808083] hover:cursor-pointer
											"
											>
												{/* Imagen del artículo */}
												<div className="w-1/2 h-full">
													<img
														className="object-cover w-full h-full"
														src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${foro.img}`}
														alt={foro.title}
													/>
												</div>

												{/* Contenido del artículo */}
												<div className="w-1/2 p-6 flex flex-col justify-between">
													<h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
														{foro.title}
													</h5>
													<p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
														{foro.content.substring(0, 150) + "..."}
													</p>

													<p className="font-light text-gray-400">
														Autor: {foro.profiles.username}
													</p>
													<p className="font-light text-gray-400">
														Fecha:{" "}
														{foro.created_at
															? new Date(foro.created_at).toLocaleDateString(
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
											</li>
										</Link>
									))}
							</ul>
						</div>
					</div>
				</div>
			</section>
			<hr />
			<footer className="bg-white h-10p border-1 p-5 text-xs text-bold">
				Tuna awainan no se hace responsable por la información que suban los
				usuarios a esta página.
			</footer>
		</>
	);
}
