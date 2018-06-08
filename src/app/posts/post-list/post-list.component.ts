import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // Posts are passed in from the parent component
  @Input() posts: Post[] = [];

  constructor() { }

  ngOnInit() {
  }

}
