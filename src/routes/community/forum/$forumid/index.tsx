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
	<div className="bg-white min-h-screen">
		{/* Botón de regreso */}
		<div className="ml-10 mt-10">
			<Button 
				asChild
				variant="ghost" 
				className="text-[#0cc0df] hover:bg-transparent hover:text-[#087b9b] px-0"
			>
				<Link to={"/community/forum"} className="flex items-center gap-2">
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
						Volver a comunidad
				</Link>
			</Button>
		</div>

			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

			{/* Header */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-4 tracking-tight">
				{forums.title.charAt(0).toUpperCase() + forums.title.slice(1)}
				</h1>
				<div className="flex items-center gap-3 text-sm text-gray-500">
					<span className="font-medium text-gray-600">
						{forums.profiles.username.charAt(0).toUpperCase() + forums.profiles.username.slice(1)}
					</span>
					<span className="text-gray-400">·</span>
					<time dateTime={forums.created_at}>
						{new Date(forums.created_at).toLocaleDateString("es-ES", {
						day: "2-digit",
						month: "long",
						year: "numeric"
						})}
					</time>
				</div>
			</div>

			{/* Contenido principal */}
			<article className="prose lg:prose-xl max-w-none mb-12">
				{forums.img && (
				<img
					src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/posts/${forums.img}`}
					alt=""
					className="w-full h-auto rounded-lg mb-8 object-cover shadow-md"
				/>
				)}
				<div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
				{forums.content}
				</div>
			</article>

			{/* Mapa */}
			<div className="my-12">
				<Map forumid={forumid} className="rounded-lg shadow-lg" />
			</div>

			{/* Sección de comentarios */}
			<div className="border-t pt-12">
				<div className="mb-8">
					<h3 className="text-2xl font-semibold mb-6">
						Comentarios ({comments?.length || 0})
					</h3>

					<form onSubmit={handleSubmit} className="mb-8">
						<textarea
						id="comment"
						name="content"
						rows={4}
						className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#087b9b] focus:border-transparent resize-none bg-white"
						placeholder="Escribe tu comentario..."
						required
						/>
						<div className="mt-4 flex justify-end">
						<button
							type="submit"
							className="bg-[#0cc0df] hover:bg-[#087b9b] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
						>
							Publicar comentario
						</button>
						</div>
					</form>

					<div className="space-y-8">
						{comments?.map((comment) => (
						<CommentItem
							key={comment.id}
							username={comment.profiles.username}
							created_at={comment.created_at}
							text={comment.content}
							commentId={comment.id}
							userid={id_user}
						/>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
	);
}
