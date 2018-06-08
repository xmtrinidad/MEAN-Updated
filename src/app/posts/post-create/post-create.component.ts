import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(private postsService: PostsService) {}

  onAddPost(form: NgForm) {
    // Don't submit post if inputs are invalid
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
  }
}
