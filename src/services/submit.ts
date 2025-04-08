import { Category } from "@/components/category/category";
import { supabase } from "@/lib/supabase";

export const setPost = async (title: string, content: string, userId, img) => {
	const { data, error } = await supabase.from("posts").insert([
		{
			title,
			content,
			img,
			id_user: userId,
			category: "expert",
		},
	]);
	if (error) {
		console.error(error);
	}

	return data;
};

export const setForum = async (title: string, content: string, userId, img) => {
	const { data, error } = await supabase.from("posts").insert([
		{
			title,
			content,
			img,
			id_user: userId,
			category: "community",
		},
	]);
	if (error) {
		console.error(error);
	}
	return data;
};
