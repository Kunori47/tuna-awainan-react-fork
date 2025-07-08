import CommentItem from "@/components/CommentItem";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { getProfileId, getSession } from "@/services/auth";
import { fetchComments, postComment } from "@/services/comments";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import Map from "@/components/map/mapforum";

export const Route = createFileRoute("/experto/post/$postid/")({
	loader: ({ params }) => fetchPostById(params.postid),
	component: PostComponent,
});

const fetchPostById = async (postid) => {
	const { data, error } = await supabase
		.from("posts")
		.select("*, profiles(username)")
		.eq("id", postid)
		.single();

	if (error) {
		throw new Error(error.message);
	}
	return data;
};

function PostComponent() {
	const { postid } = Route.useParams();
	const queryClient = useQueryClient();

	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts", postid], // Key única para esta consulta
		queryFn: () => fetchPostById(postid), // Función para obtener datos
	});
	const { data: comments } = useQuery({
		queryKey: ["ComentsPost", postid], // Key única para esta consulta
		queryFn: () => fetchComments(postid), // Función para obtener datos
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
			await postComment(postid, newComment, id_user, position);
		},
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["comments", postid] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!session) {
			toast({
				title: "Error",
				description: "Debes estar registrado para poder comentar",
			});
		}
		const formData = new FormData(e.target);
		const content = formData.get("content");
		mutation.mutate(content);
		e.target.reset();
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="bg-white min-h-screen">
			{/* boton de regresar*/}
			<div className="ml-10 mt-10">
				<Button 
					asChild
					variant="ghost" 
					className="text-[#0cc0df] hover:bg-transparent hover:text-[#087b9b] px-0"
				>
					<Link to={"/experto/post"} className="flex items-center gap-2">
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					Volver a expertos
					</Link>
				</Button>
			</div>

		  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Header */}
			<div className="mb-8">			  
			  <div className="mb-8">
				<h1 className="text-4xl font-bold mb-4 tracking-tight">{posts.title.charAt(0).toUpperCase() + posts.title.slice(1)}</h1>
				<div className="flex items-center gap-3 text-sm text-gray-500">
				  <span className="font-medium text-gray-500">{posts.profiles.username.charAt(0).toUpperCase() + posts.profiles.username.slice(1) }</span>
				  <span className="text-gray-500">·</span>
				  <time dateTime={posts.created_at} className="font-medium text-gray-500">
					{new Date(posts.created_at).toLocaleDateString("es-ES", {
					  day: "2-digit",
					  month: "long",
					  year: "numeric"
					})}
				  </time>
				</div>
			  </div>
			</div>
	
			{/* contenido  */}
			<article className="prose lg:prose-xl max-w-none mb-12">
			  {posts.img && (
				<img
				//   src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${posts.img}`}
				src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${posts.img}`}
				  alt=""
				  className="w-full h-auto rounded-lg mb-8 object-cover"
				/>
			  )}
			  <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
				{posts.content}
			  </div>
			</article>
	
			{/* Mapa */}
			<div className="my-12">
			  {/* <Map forumid={postid} className="rounded-lg shadow-lg" /> */}
			  <Map center={{lat: posts.latitud, lng: posts.longitud}} forumid={posts.id} zone={{lat: posts.latitud, lng: posts.longitud, ratio: posts.ratio}}></Map>
			</div>
	
			{/* comentarios */}
			<div className=" pt-6">
			  <div className="mb-8">
				<h3 className="text-2xl  mb-6">Comentarios ({comments?.length || 0})</h3>
				
				<form onSubmit={handleSubmit} className="mb-8">
				  <textarea
					id="comment"
					name="content"
					rows={4}
					className="bg-white w-full px-4 py-3 border rounded-lg focus:border-transparent resize-none"
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

				<div className="my-4 border-b border-gray-200 dark:border-gray-700" />

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
