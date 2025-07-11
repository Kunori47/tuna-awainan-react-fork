import { supabase } from "@/lib/supabase";

export const postComment = async (postId, content, userId, position) => {
	const { data, error } = await supabase.from("commentpost").insert([
		{
			id_post: postId,
			content,
			id_user: userId,
			longitud: position.lng,
			latitud: position.lat,
		},
	]);
	if (error) {
		console.error(error);
	}
	return data;
};

export const fetchComments = async (postId) => {
	const { data, error } = await supabase
		.from("commentpost")
		.select("*, profiles(username)")
		.eq("id_post", postId);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const ReplyComment = async (commentId, content, userId) => {
	const { data, error } = await supabase.from("answerpost").insert([
		{
			id_comment: commentId,
			content,
			id_user: userId,
		},
	]);
	if (error) {
		console.error(error);
	}
	return data;
}