import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { getProfileId, getSession } from "@/services/auth";
import { setPost } from "@/services/submit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/experto/post/new")({
	component: NewPostingComponent,
});

function NewPostingComponent() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const formRef = React.useRef<HTMLFormElement>(null);

	const { data: session } = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	});

	const { data: id_user } = useQuery({
		queryKey: ["profiles"],
		queryFn: () => getProfileId(session?.user.id),
	});

	type PostPayload = {
		title: string;
		content: string;
		imageUrl: string | null;
	};

	const mutation = useMutation({
		mutationFn: async ({ title, content, imageUrl }: PostPayload) =>
			setPost(title, content, id_user, imageUrl),
		onSuccess: () => {
			toast({ title: "Post creado correctamente 😀" });
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			if (formRef.current) {
				formRef.current.reset();
			}
		},
		onError: () => {
			toast({ title: "Error al crear el post 😞" });
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const title = String(formData.get("title") || "");
		const content = String(formData.get("content") || "");
		const file = formData.get("image") as File | null;

		let imageUrl: string | null = null;

		if (file && file instanceof File && file.size > 0) {
			const uniqueName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
			const { data, error } = await supabase.storage
				.from("files")
				.upload(`posts/${uniqueName}`, file);

			if (error || !data) {
				toast({ title: "Error al subir la imagen 😞" });
				return;
			}

			imageUrl = data.path;
		}

		mutation.mutate({ title, content, imageUrl });
	};

	return (
		<section className="bg-white dark:bg-gray-900">
			<Button className="m-8 hover:bg-[#087b9b]">
				<Link to={"/experto/post"}>Atrás</Link>
			</Button>

			<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					Añadir nueva publicación
				</h2>
				<form onSubmit={handleSubmit} ref={formRef}>
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

						<div>
							<label
								htmlFor="image"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Imagen
							</label>
							<input type="file" name="image" id="image" accept="posts/*" />
						</div>
						<div className="sm:col-span-2">
						<label
								htmlFor="content"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Tamaño de la zona (kilometros):
							</label>
							<input type='number' 
							name='ratio' 
							id='ratio' 
							min='1' 
							className='block p-2.5 w-[250px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#0cc0df] focus:border-[#0cc0df] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0cc0df] dark:focus:border-[#0cc0df] mt-6'/>
						</div>
					</div>
					<button
						type="submit"
						className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#0cc0df] rounded-lg focus:ring-4 focus:ring-[#0cc0df] dark:focus:ring-[#0cc0df] hover:bg-[#0cc0df]"
					>
						Crear publicación
					</button>
				</form>
			</div>
		</section>
	);
}
