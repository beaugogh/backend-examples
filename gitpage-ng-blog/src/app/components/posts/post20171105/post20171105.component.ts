import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
	selector: 'app-post20171105',
	templateUrl: './post20171105.component.html',
	styleUrls: ['./post20171105.component.css']
})
export class Post20171105Component extends PostComponent implements OnInit {
	ngOnInit() {
		this.postService.setIcon('assets/icons/harrypotter.png');
	}
}
