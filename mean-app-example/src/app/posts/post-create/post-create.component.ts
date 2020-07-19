import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../models/post';
import { mimeType } from './mime-type.validator';

/**
 * The form used in this component is Angular reactive form,
 * where we manipulate the FormGroup object in the script,
 * this gives more flexibility to control and validate the form.
 */
@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
	enteredTitle = '';
	enteredContent = '';
	form: FormGroup;
	imagePreview: string;
	post: Post = null;
	private mode = 'create';
	private postId: string;

	constructor(
		public postsService: PostsService,
		private router: Router,
		public route: ActivatedRoute
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			content: new FormControl(null, { validators: [Validators.required] }),
			image: new FormControl(null, {
				validators: [Validators.required],
				asyncValidators: [mimeType]
			})
		});

		this.postsService.postUpdated.subscribe((post: Post) => {
			this.post = post;
			this.form.setValue({
				title: this.post.title,
				content: this.post.content,
				image: this.post.imagePath
			});
		});

		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			if (paramMap.has('postId')) {
				this.mode = 'edit';
				this.postId = paramMap.get('postId');
				this.postsService.getPost(this.postId);
			} else {
				this.mode = 'create';
				this.postId = null;
			}
		});
	}

	onImagePicked(event: Event) {
		const file = (event.target as HTMLInputElement).files[0];
		this.form.patchValue({ image: file });
		this.form.get('image').updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = <string>reader.result;
		};
		reader.readAsDataURL(file);
	}

	onSavePost() {
		if (this.form.invalid) {
			return;
		}
		if (this.mode === 'create') {
			this.postsService.addPost(
				this.form.value.title,
				this.form.value.content,
				this.form.value.image
			);
		} else {
			this.postsService.updatePost(
				this.postId,
				this.form.value.title,
				this.form.value.content,
				this.form.value.image
			);
		}
		this.form.reset();
	}

	get isLoading(): boolean {
		return (
			this.postsService.isFetchingPost ||
			this.postsService.isAddingPost ||
			this.postsService.isUpdatingPost
		);
	}
}
