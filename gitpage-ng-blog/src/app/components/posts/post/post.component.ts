import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	public post: Post;

	constructor(
		public titleService: Title,
		public postService: PostService,
		public route: ActivatedRoute,
		public router: Router
	) {
		const stamp = this.route.snapshot.url[0].path;
		this.post = this.postService.getPostByStamp(stamp);
		if (this.post) {
			this.titleService.setTitle(this.post.title);
		}
	}

	ngOnInit() {}

	backToHomePage() {
		this.router.navigate(['/']);
	}
}
