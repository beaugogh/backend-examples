import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
	selector: 'app-post20180608',
	templateUrl: './post20180608.component.html',
	styleUrls: ['./post20180608.component.css']
})
export class Post20180608Component extends PostComponent implements OnInit {
	ngOnInit() {
		this.postService.setIcon('assets/20180608/icon.png');
	}
}
