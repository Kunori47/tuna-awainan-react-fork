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

                            <div className="flex flex-col justify-between my-8 sm:flex-row ">
                                <p className="text-base text-gray-700 dark:text-gray-400">
                                    Foros publicados: {forum?.length}
                                </p>
                                {session ? (
                                    <Button className="w-1/6 hover:bg-[#087b9b] min-w-fit">
                                        <Link to={"/community/forum/new"}>Crear un nuevo foro</Link>
                                    </Button>
                                ) : null}
                            </div>
						</header>
						
                        <div className="card">
                            <ul className="grid grid-cols-1 gap-8">
                                {forum &&
                                    forum.map((foro) => (
                                        <Link 
                                            key={foro.id}
                                            to={"/community/forum/$forumid"}
                                            params={{ forumid: foro.id }}
                                            className="block hover:scale-[1.01] transition-transform"
                                        >
                                            <li className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:border hover:border-gray-200 md:flex-row md:h-72">
                                                {/* Imagen del articulo */}
                                                <div className="w-full h-64 md:w-1/2 md:h-auto">
                                                    <img
                                                        className="object-cover w-full h-full"
                                                        // src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${foro.img}`}
                                                        src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/posts/${foro.img}`}
                                                        alt={foro.title}
                                                    />
                                                </div>

                                                {/* Contenido del articulo */}
                                                <div className="w-full p-6 flex flex-col justify-between md:w-1/2">
                                                    <div>
                                                        <h3 className="mb-2 text-2xl font-bold text-gray-900 line-clamp-3">
                                                            {foro.title}
                                                        </h3>
                                                        <p className="text-gray-600 line-clamp-4">
                                                            {foro.content}
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                                                        <span className="font-normal text-gray-500">
                                                            {foro.profiles.username.charAt(0).toUpperCase() + foro.profiles.username.slice(1)}
                                                        </span>
                                                        <span className="text-gray-400">·</span>
                                                        <time dateTime={foro.created_at}>
                                                            {new Date(foro.created_at).toLocaleDateString("es-ES", {
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
		</>
    );
}