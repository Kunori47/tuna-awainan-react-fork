import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/experto/post/")({
	component: ExpertComponent,
});

const fetchPost = async () => {
	const { data, error } = await supabase
		.from("posts")
		.select("*, profiles(username)")
		.eq("category", "expert");

	if (error) {
		throw new Error(error.message);
	}
	console.log(data);
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

function ExpertComponent() {
	const {
		data: posts,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPost,
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
        <section className="w-full px-24 sm:px-5 grid grid-cols-1 mx-auto">
            <div className="font-custom max-w-screen-lg mx-auto gap-8 lg:px-[6rem] md:px-[6rem]">
                <div className="flex flex-col gap-4">
                    <header>
                        <h2 className="text-3xl font-bold text-center my-8 mb-2">Hablando con Expertos</h2>
                    
                        <div className=" my-8 flex justify-between ">
                            <p className="text-base text-gray-500 dark:text-gray-400">
                                Foros publicados: {posts?.length}
                            </p>
                            {session_user === "specialist" || session_user === "admin" ? (
                                <Button 
                                    asChild
                                    variant="ghost" 
                                    className="text-[#0cc0df] hover:bg-transparent hover:text-[#087b9b] px-0 text-base"
                                >
                                    <Link to={"/experto/post/new"} className="flex items-center gap-2">
                                        Crear post
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" className="w-10 h-10">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                </Button>
                            ) : (
                                <Button className="w-1/6 hover:bg-[#087b9b]">
                                    <a href="mailto:grupotunawainan@gmail.com?subject=Solicitud para crear posts&body=Coloque su usuario y escriba la razón del porqué quiere crear un post en la página.">
                                        Solicitud para crear posts
                                    </a>
                                </Button>
                            )}		
                        </div>
                    </header>

                    <div className="card">
                        <ul className="grid grid-cols-1 gap-8">
                        {posts &&
                            posts.map((post) => (
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
		
			<hr />
			<footer className="bg-white h-10p border-1 p-5 text-xs text-bold">
				Tuna awainan no se hace responsable por la información que suban los
				usuarios a esta página.
			</footer>
		</>
	);
}
