import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { setArticles } from "@/services/submit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/articles/category/new")({
	component: RouteComponent,
});

const fetchCategory = async () => {
	const { data, error } = await supabase.from("tags").select("*");

	if (error) {
		console.error(error);
	}

	return data;
};

function RouteComponent() {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { data: category } = useQuery({
		queryKey: ["category"],
		queryFn: fetchCategory,
	});

	const mutation = useMutation({
		mutationFn: ({ title, content, imageUrl, category, author }) =>
			setArticles(title, content, imageUrl, category, author),
		onSuccess: () => {
			// Invalidate and refetch
			toast({
				title: "Articulo creado correctamente 😀",
			});
			queryClient.invalidateQueries({ queryKey: ["articles"] });
		},
		onError: () => {
			toast({
				title: "Error al crear el Articulo 😞",
			});
		},
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const title = formData.get("title");
		const content = formData.get("content");
		const file = formData.get("image");
		const author = formData.get("author");
		const category = formData.get("category");

		let imageUrl = null;

		if (file) {
			const { data, error } = await supabase.storage
				.from("files")
				.upload(`articles/${title}`, file);

			if (error) {
				console.error(error);
			}

			imageUrl = data?.path;
		}
		mutation.mutate({ title, content, imageUrl, category, author });
		e.target.reset();
	};
	return (
		<section className="bg-white dark:bg-gray-900">
			<Button className="m-8 hover:bg-[#087b9b]">
				<Link to={"/articles/category"}>Atrás</Link>
			</Button>

			<div className="py-8 px-4 mx-auto max-w-2xl lg:pt-1 lg:pb-16">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					Añadir nueva publicación
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div className="sm:col-span-2">
							<label
								htmlFor="title"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Título
							</label>
							<input
								type="text"
								name="title"
								id="title"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0cc0df] focus:border-[#0cc0df] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0cc0df] dark:focus:border-[#0cc0df]"
								placeholder="Título de la publicación"
								required
							/>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="content"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Contenido
							</label>
							<textarea
								name="content"
								id="content"
								rows={8}
								className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#0cc0df] focus:border-[#0cc0df] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0cc0df] dark:focus:border-[#0cc0df]"
								placeholder="Contenido de la publicación"
								required
							></textarea>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="author"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Autor / Referencia
							</label>
							<input
								type="text"
								name="author"
								id="author"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0cc0df] focus:border-[#0cc0df] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0cc0df] dark:focus:border-[#0cc0df]"
								placeholder="Referencia o Autor de la publicación"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="category"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Categoría
							</label>
							<select name="category" id="category" className="bg-gray-50 text-sm">
								{category &&
									category.map((category) => (
										<option value={category.id}>{category.name}</option>
									))}
							</select>
						</div>

						<div>
							<label
								htmlFor="image"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Imagen
							</label>
							<input type="file" name="image" id="image" accept="articles/*"  className="text-sm text-black" />
						</div>
					</div>
					<button
						type="submit"
						className="hover:bg-[#087b9b] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#0cc0df] rounded-lg focus:ring-4 focus:ring-[#0cc0df] dark:focus:ring-[#0cc0df]"
					>
						Crear publicación
					</button>
				</form>
			</div>
		</section>
	);
}
