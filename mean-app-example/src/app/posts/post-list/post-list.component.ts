import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../../models/post';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

	constructor(
		private postsService: PostsService,
		private authService: AuthService
	) {}

	ngOnInit() {
	}

	onDelete(id: string) {
		this.postsService.deletePost(id);
	}

	onPage(e: PageEvent) {
		// Note that the paginator properties' binding is one-way binding,
		// ie. script --> template
		// we still need to update the properties when they are changed
		this.currentPage = e.pageIndex;
		this.pageSize = e.pageSize;
		this.postsService.getPosts();
	}

	isPostAuthorized(post: Post): boolean {
		return post.creator === this.authService.userId;
	}

	get posts(): Post[] {
		return this.postsService.posts;
	}
	get isAuthenticated(): boolean {
		return this.authService.isAuthenticated;
	}
	get currentPage(): number {
		return this.postsService.currentPage;
	}
	set currentPage(value: number) {
		this.postsService.currentPage = value;
	}
	get pageSize(): number {
		return this.postsService.pageSize;
	}
	set pageSize(value: number) {
		this.postsService.pageSize = value;
	}
	get pageSizeOptions(): number[] {
		return this.postsService.pageSizeOptions;
	}
	get totalNumPosts(): number {
		return this.postsService.totalNumPosts;
	}
	get isLoading(): boolean {
		return (
			this.postsService.isDeletingPost ||
			this.postsService.isFetchingPosts
		);
	}
}
