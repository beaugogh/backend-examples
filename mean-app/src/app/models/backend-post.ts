/**
 * This model should be identical to that of
 * 'server/api/models/post.js'
 */
export interface BackendPost {
	_id: string;
	title: string;
	content: string;
	imagePath: string;
	creator: string;
}
