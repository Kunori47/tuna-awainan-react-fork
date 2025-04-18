import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/articles/category/$categoryid/")({
	loader: ({ params }) => fetchArticleById(params.categoryid),
	component: ArticleComponent,
});

const fetchArticleById = async (categoryid: string) => {
	const { data, error } = await supabase
		.from("articles")
		.select("title, description, img, references, tag, created_at, tags(name)")
		.eq("id", categoryid)
		.single();

	if (error) {
		throw new Error(error.message);
	}
	return data;
};


function ArticleComponent() {
	const { categoryid } = Route.useParams();
	const {
		data: article,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["article", categoryid], // Key única para esta consulta
		queryFn: () => fetchArticleById(categoryid), // Función para obtener datos
	});
	//const article = articles && articles[0];

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
			  <Link to={"/articles/category"} className="flex items-center gap-2">
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				Volver a artículos
			  </Link>
			</Button>
		  </div>
	
		  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Header */}
			<div className="mb-8">
			  <div className="flex items-center gap-2 mb-4">
				{article.tag && (
				  <span className="bg-[#0cc0df] text-white px-3 py-1 rounded-full text-sm font-medium">
					{article?.tags.name}
				  </span>
				)}
				<time 
				  className="text-sm text-gray-500"
				  dateTime={article.created_at}
				>
				  {new Date(article.created_at).toLocaleDateString("es-ES", {
					day: "2-digit",
					month: "long",
					year: "numeric"
				  })}
				</time>
			  </div>
			  
			  <h1 className="text-4xl font-bold mb-6 tracking-tight">
				{article.title}
			  </h1>
			</div>
	
			{/* Imagen destacada */}
			{article.img && (
			  <img
				src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/${article.img}`}
				alt=""
				className="w-full h-auto rounded-xl mb-8 object-cover shadow-lg"
			  />
			)}
	
			{/* Contenido del artículo */}
			<article className="prose lg:prose-xl max-w-none mb-12">
			  <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
				{article.description}
			  </div>
			</article>
	
			{/* Referencias */}
			{article.references && (
			  <div className="mt-12 pt-8 border-t border-gray-200">
				<h3 className="text-xl font-semibold mb-4">Referencias</h3>
				<div className="prose lg:prose-lg text-gray-600">
				  {article.references.split('\n').map((line, index) => (
					<p key={index} className="mb-2">{line}</p>
				  ))}
				</div>
			  </div>
			)}
		  </div>
		</div>
	  );
}
