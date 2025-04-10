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

export const setArticles = async (
	title: string,
	description: string,
	img,
	tag,
	references,
) => {
	const { data, error } = await supabase.from("articles").insert([
		{
			title,
			description,
			img,
			tag,
			references,
		},
	]);
	if (error) {
		console.error(error);
	}
	return data;
};

export const setSpecimens = async (
	name: string,
	scientific_name: string,
	description: string,
	img,
) => {
	const { data, error } = await supabase.from("specimens").insert([
		{
			name,
			scientific_name,
			description,
			img,
		},
	]);
	if (error) {
		console.error(error);
	}
	return data;
};
