import { BackendPost } from './backend-post';
import { Post } from './post';

export class PostUtil {
	public static BackToFrontPost(backendPost: BackendPost): Post {
		const post = {
			id: backendPost._id,
			title: backendPost.title,
			content: backendPost.content,
			imagePath: backendPost.imagePath,
			creator: backendPost.creator
		};
		return post;
	}

	public static BackToFrontPosts(backendPosts: BackendPost[]): Post[] {
		return backendPosts.map((backendPost: BackendPost) => {
			return PostUtil.BackToFrontPost(backendPost);
		});
	}
}
