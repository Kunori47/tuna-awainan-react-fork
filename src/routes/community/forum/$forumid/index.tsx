import CommentItem from "@/components/CommentItem";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { getProfileId, getSession } from "@/services/auth";
import { fetchComments, postComment } from "@/services/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import Map from "@/components/map/mapforum";

export const Route = createFileRoute("/community/forum/$forumid/")({
	loader: ({ params }) => fetchForumById(params.forumid),
	component: ForumComponent,
});

const fetchForumById = async (forumid) => {
	const { data, error } = await supabase
		.from("posts")
		.select("*, profiles(username)")
		.eq("id", forumid)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

function ForumComponent() {
	const { forumid } = Route.useParams();
	const queryClient = useQueryClient();

	const {
		data: forums,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["Foros", forumid],
		queryFn: async () => fetchForumById(forumid),
	});
	const { data: comments } = useQuery({
		queryKey: ["ComentariosForos", forumid],
		queryFn: () => fetchComments(forumid),
	});

	const { data: session } = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	});

	const { data: id_user } = useQuery({
		queryKey: ["profiles"],
		queryFn: () => getProfileId(session?.user.id),
	});

		const mutation = useMutation({
			mutationFn: async (newComment) => {
				const position = queryClient.getQueryData(["position"]);
				await postComment(forumid, newComment, id_user, position);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["ComentariosForos", forumid] });
			},
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!session) {
			toast({
				title: "Error",
				description: "Debes iniciar sesión para comentar",
			});
			//return;
		}
		const formData = new FormData(e.target);
		const content = formData.get("content");
		mutation.mutate(content);
		e.target.reset();
	};

	const handleReply = async (content: string, commentId: string) => {
	if (!session) {
		toast({
		title: "Error",
		description: "Debes iniciar sesión para responder",
		});
		return;
	}
	};	

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			<div className="mx-8 my-2 font-light text-gray-400">
				<p>Autor: {forums.profiles.username}</p>
				<p className="font-light text-gray-400">
					Fecha:{" "}
					{forums.created_at
						? new Date(forums.created_at).toLocaleDateString("es-ES", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							})
						: "Unknown Date"}
				</p>
			</div>
			<Button className="m-8 hover:bg-[#087b9b]">
				<Link to={"/community/forum"}>Atrás</Link>
			</Button>

			<div className="max-w-4xl mx-auto p-6 bg-white rounded-xl mb-8">
				<img
					src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/posts/${forums.img}`}
					alt=""
					className="w-full h-64 object-cover rounded-lg mb-6"
				/>

				<h2 className="text-3xl font-bold mb-4">{forums.title}</h2>

				<p className="text-gray-700 leading-relaxed">{forums.content}</p>
				<hr />
				<Map forumid={forumid}></Map>
				<form
					className="mb-6 flex flex-col w-full mt-5"
					onSubmit={handleSubmit}
				>
					<div className="w-full py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-white dark:border-gray-700">
						<label htmlFor="comment" className="sr-only">
							Tu comentario
						</label>
						<textarea
							id="comment"
							name="content"
							rows={6}
							className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-white"
							placeholder="Escribe tu comentario"
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="inline-flex items-center bg-[#0cc0df] ml-auto py-2.5 px-4 text-xs font-medium text-center text-white bg-[p] rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-primary-900 hover:bg-primary-800"
					>
						Enviar
					</button>
				</form>

				<div className="comments-section">
					<h3 className="mb-4">Comentarios</h3>
					<div className="grid grid-cols-1 gap-2">
						{comments?.map((comments) => (
							<CommentItem
								username={comments.profiles.username}
								created_at={comments.created_at}
								text={comments.content}
								commentId={comments.id}
								userid={id_user}
							></CommentItem>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
