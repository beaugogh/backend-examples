import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
	selector: 'app-post20180825',
	templateUrl: './post20180825.component.html',
	styleUrls: ['./post20180825.component.css']
})
export class Post20180825Component extends PostComponent implements OnInit {
	ngOnInit() {
		this.postService.setIcon('assets/20180825/icon.png');
	}
}
