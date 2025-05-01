import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getProfileId, getSession } from "@/services/auth";
import { setSpecimens } from "@/services/submit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/aquarium/letter/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { data: session } = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	});

	const { data: id_user } = useQuery({
		queryKey: ["profiles"],
		queryFn: () => getProfileId(session?.user.id),
	});

	const mutation = useMutation({
		mutationFn: ({ name, scientific_name, description, imageUrl }) =>
			setSpecimens(name, scientific_name, description, imageUrl),
		onSuccess: () => {
			toast({
				title: "Especimen agregado correctamente 😀",
			});
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: () => {
			toast({
				title: "Error al agregar el especimen 😞",
			});
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const value_nombre = formData.get("nombre");
		const value_scientific = formData.get("scientific_name");
		const description = formData.get("description");
		const file = formData.get("image");

		let scientific_name = value_scientific;

		let name = value_nombre;

		name =
			value_nombre.charAt(0).toUpperCase() +
			value_nombre.slice(1).toLowerCase();

		scientific_name =
			value_scientific.charAt(0).toUpperCase() +
			value_scientific.slice(1).toLowerCase();

		let imageUrl = null;

		if (file) {
			const { data, error } = await supabase.storage
				.from("files")
				.upload(`specimens/${name}`, file);

			if (error) {
				console.error(error);
			}

			imageUrl = data?.path;
		}
		mutation.mutate({ name, scientific_name, description, imageUrl });
		e.target.reset();
	};

	return (
		<section className="bg-white dark:bg-gray-900">
			<Button className="m-8 hover:bg-[#047A8F]">
				<Link to={"/aquarium"}>Atrás</Link>
			</Button>

			<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
				<h2 className="mb-4 text-xl font-bold text-gray-900">
					Añadir nuevo especimen
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div className="sm:col-span-2">
							<label
								htmlFor="nombre"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Nombre
							</label>
							<input
								type="text"
								name="nombre"
								id="nombre"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#047A8F] focus:border-[#047A8F] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#047A8F] dark:focus:border-[#047A8F]"
								placeholder="Nombre del especimen"
								required
							/>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="scientific_name"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Nombre cientifico
							</label>
							<input
								type="text"
								name="scientific_name"
								id="scientific_name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#047A8F] focus:border-[#047A8F] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#047A8F] dark:focus:border-[#047A8F]"
								placeholder="Nombre cientifico del especimen"
								required
							/>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Descripcion
							</label>
							<textarea
								name="description"
								id="description"
								rows={8}
								className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#047A8F] focus:border-[#047A8F] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#047A8F] dark:focus:border-[#047A8F]"
								placeholder="Descripcion del especimen"
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
					</div>
					<button
						type="submit"
						className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#047A8F] rounded-lg focus:ring-4 focus:ring-[#047A8F] dark:focus:ring-[#047A8F] hover:bg-[#047A8F]"
					>
						Agregar especimen
					</button>
				</form>
			</div>
		</section>
	);
}
