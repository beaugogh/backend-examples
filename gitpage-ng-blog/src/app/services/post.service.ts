import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { OrderEnum } from '../models/order-enum';

@Injectable()
export class PostService {
	private _posts: Array<Post>;
	private _visiblePosts: Array<Post>;
	private numPostsToLoad = 20;
	private postIndex = 0;

	constructor() {
		// initialize
		this.posts = [];
		this.visiblePosts = [];
		// insert posts
		this.posts.push(new Post('Style Transfer', '20180825'));
		this.posts.push(new Post('说话的准则', '20180701'));
		this.posts.push(new Post('剑即人生·浪客掠影', '20180608'));
		this.posts.push(new Post('荷兰如何养活了世界', '20180312'));
		this.posts.push(new Post('各国哈利波特封面', '20171105'));

		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20171105'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180310'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180312'));
		// this.posts.push(new Post('--fafaaf-fafaerewrw-wrwrwrwrwr-wrwwre  wwrwerfwff', '20180311'));

		// sort and load
		this.sortPostsByStamps(OrderEnum.DESC);
		this.loadNextPosts();
	}

	public loadNextPosts() {
		if (this.postIndex < this.posts.length) {
			for (
				let i = this.postIndex;
				i < this.postIndex + this.numPostsToLoad;
				i++
			) {
				if (this.posts[i]) {
					this.visiblePosts.push(this.posts[i]);
				}
			}
			this.postIndex += this.numPostsToLoad;
		}
	}

	public getPostByStamp(stamp: string): Post {
		const result = this.posts.filter((p: Post) => {
			return p.stamp === stamp;
		});
		return result && result.length > 0 ? result[0] : null;
	}

	public sortPostsByTitle(whichOrder: OrderEnum) {
		this.posts.sort((p1, p2) => {
			if (p1.title > p2.title) {
				if (whichOrder === OrderEnum.ASC) {
					return 1;
				} else {
					return -1;
				}
			} else if (p1.title < p2.title) {
				if (whichOrder === OrderEnum.ASC) {
					return -1;
				} else {
					return 1;
				}
			} else {
				return 0;
			}
		});
	}

	public sortPostsByStamps(whichOrder: OrderEnum) {
		this.posts.sort((p1, p2) => {
			if (p1.stamp > p2.stamp) {
				if (whichOrder === OrderEnum.ASC) {
					return 1;
				} else {
					return -1;
				}
			} else if (p1.stamp < p2.stamp) {
				if (whichOrder === OrderEnum.ASC) {
					return -1;
				} else {
					return 1;
				}
			} else {
				return 0;
			}
		});
	}

	get posts(): Array<Post> {
		return this._posts;
	}

	set posts(value: Array<Post>) {
		this._posts = value;
	}

	get visiblePosts(): Array<Post> {
		return this._visiblePosts;
	}

	set visiblePosts(value: Array<Post>) {
		this._visiblePosts = value;
	}

	public setIcon(iconHref: string) {
		let iconLink = document.head.querySelector('link');
		if (!iconLink) {
			iconLink = document.createElement('link');
			iconLink.setAttribute('rel', 'icon');
			iconLink.setAttribute('type', 'image/x-icon');
			document.head.appendChild(iconLink);
		}
		iconLink.setAttribute('href', iconHref);
	}
}
