import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';
import { BackendPost } from '../models/backend-post';
import { PostUtil } from '../models/post.util';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts';

@Injectable({ providedIn: 'root' })
export class PostsService {
	// flags indicating ongoing calls
	private _isAddingPost = false;
	private _isUpdatingPost = false;
	private _isDeletingPost = false;
	private _isFetchingPosts = false;
	private _isFetchingPost = false;
	// subject for informing post updates
	private _postUpdated: Subject<Post> = new Subject<Post>();
	private _posts: Post[] = [];
	// configuration for the pagination of posts
	private _totalNumPosts = 0;
	private _currentPage = 0;
	private _pageSize = 2;
	private _pageSizeOptions = [1, 2, 5, 10];

	constructor(private http: HttpClient, private router: Router) {
		// router.events.subscribe((event: NavigationEnd) => {
		// 	if(event instanceof NavigationEnd && event.url === '/') {
		// 		this.getPosts();
		// 	}
		// })
		this.getTotalNumberOfPosts();
	}

	private getTotalNumberOfPosts() {
		this.http
			.get<{ count: number }>(BACKEND_URL + '/totalCount')
			.pipe(
				map((response: { count: number }) => {
					return response.count;
				})
			)
			.subscribe(count => {
				this._totalNumPosts = count;
				const numPages = Math.ceil(count / this.pageSize);
				this._currentPage =
					this._currentPage + 1 > numPages
						? this._currentPage - 1
						: this._currentPage;
				this.getPosts();
			});
	}

	getPosts() {
		this._isFetchingPosts = true;
		// Note that the currentPage index is zero-based,
		// whereas the backend call current page is one-based
		const queryParams = `?pageSize=${this.pageSize}&page=${this.currentPage +
			1}`;
		this.http
			.get<BackendPost[]>(BACKEND_URL + queryParams)
			.pipe(
				map((backendPosts: BackendPost[]) => {
					return PostUtil.BackToFrontPosts(backendPosts);
				})
			)
			.subscribe(
				(posts: Post[]) => {
					this._isFetchingPosts = false;
					this._posts = posts;
				},
				err => {
					this._isFetchingPosts = false;
				}
			);
	}

	getPost(id: string) {
		this._isFetchingPost = true;
		this.http
			.get(BACKEND_URL + '/' + id)
			.pipe(
				map((backendPost: BackendPost) => {
					return PostUtil.BackToFrontPost(backendPost);
				})
			)
			.subscribe(
				(post: Post) => {
					this._isFetchingPost = false;
					this._postUpdated.next(post);
				},
				err => {
					this._isFetchingPost = false;
				}
			);
	}

	addPost(title: string, content: string, image: File) {
		this._isAddingPost = true;
		const postData = new FormData();
		postData.append('title', title);
		postData.append('content', content);
		postData.append('image', image, title);
		this.http
			.post<BackendPost>(BACKEND_URL, postData)
			.pipe(
				map((backendPost: BackendPost) => {
					return PostUtil.BackToFrontPost(backendPost);
				})
			)
			.subscribe(
				res => {
					this._isAddingPost = false;
					this.getTotalNumberOfPosts();
					this.router.navigate(['/']);
				},
				err => {
					this._isAddingPost = false;
				}
			);
	}

	deletePost(id: string) {
		this._isDeletingPost = true;
		this.http.delete(BACKEND_URL + '/' + id).subscribe(
			res => {
				this._isDeletingPost = false;
				this.getTotalNumberOfPosts();
				this.router.navigate(['/']);
			},
			err => {
				this._isDeletingPost = false;
			}
		);
	}

	updatePost(id: string, title: string, content: string, image: File | string) {
		this._isUpdatingPost = true;
		let postData;
		if (typeof image === 'object') {
			postData = new FormData();
			postData.append('id', id);
			postData.append('title', title);
			postData.append('content', content);
			postData.append('image', image, title);
		} else {
			postData = {
				id: id,
				title: title,
				content: content,
				imagePath: image
			};
		}
		this.http.patch(BACKEND_URL + '/' + id, postData).subscribe(
			res => {
				this._isUpdatingPost = false;
				this.getPosts();
				this.router.navigate(['/']);
			},
			err => {
				this._isUpdatingPost = false;
			}
		);
	}

	get posts(): Post[] {
		return this._posts;
	}
	get postUpdated(): Observable<Post> {
		return this._postUpdated.asObservable();
	}
	get totalNumPosts(): number {
		return this._totalNumPosts;
	}
	get isAddingPost(): boolean {
		return this._isAddingPost;
	}
	get isUpdatingPost(): boolean {
		return this._isAddingPost;
	}
	get isDeletingPost(): boolean {
		return this._isDeletingPost;
	}
	get isFetchingPosts(): boolean {
		return this._isFetchingPosts;
	}
	get isFetchingPost(): boolean {
		return this._isFetchingPost;
	}
	get pageSize(): number {
		return this._pageSize;
	}
	set pageSize(value: number) {
		this._pageSize = value;
	}
	get currentPage(): number {
		return this._currentPage;
	}
	set currentPage(value: number) {
		this._currentPage = value;
	}
	get pageSizeOptions(): number[] {
		return this._pageSizeOptions;
	}
}
