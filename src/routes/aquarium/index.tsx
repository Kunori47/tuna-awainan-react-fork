import { Button } from "@/components/ui/button";
import { LayoutAquarium } from "@/components/aquarium/LayoutAquarium";
import { supabase } from "@/lib/supabase";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/services/auth";

export const Route = createFileRoute("/aquarium/")({
	component: AquariumComponent,
});

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
function AquariumComponent() {
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

	return (
		<div className="min-h-screen flex flex-col">
			<LayoutAquarium></LayoutAquarium>
			<section className="flex-grow flex flex-col justify-center items-center bg-white text-gray-800 p-4 md:p-8">
				<div className="text-center max-w-3xl space-y-4 md:space-y-8">
					<h1 className="text-3xl md:text-4xl font-normal mb-4 text-[#047A8F]">
						¿Ya viste el Acuario?
					</h1>
					<p className="text-md md:text-lg text-gray-800 mb-32">
						&emsp;&emsp;"Un pedacito de Venezuela en tu salón. <br />
						Descubre la increíble biodiversidad de la cuenca del Orinoco a
						través de nuestro acuario. Cada pez cuenta una historia sobre la
						importancia de preservar nuestros ecosistemas. ¡Acompáñanos en este
						viaje educativo y contribuye a la conservación de esta joya
						natural!"
					</p>
				</div>
				{session_user === "admin" ? (
					<Button className="w-fit hover:bg-[#047A8F] mt-5">
						<Link to={"/aquarium/letter/new"}>Publicar nuevo especimen</Link>
					</Button>
				) : (
					<div></div>
				)}
			</section>
		</div>
	);
}
