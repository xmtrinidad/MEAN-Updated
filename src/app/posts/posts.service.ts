import { Injectable } from '@angular/core';
import {Post} from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor() { }

  /**
   * Return a copy of the posts array
   * @returns {post[]} - an array of posts
   */
  getPosts() {
    return [...this.posts];
  }

  /**
   * Listen for new posts added to array
   * @returns {Observable<Post[]>}
   */
  getPostupdateListener() {
    return this.postsUpdated.asObservable();
  }

  /**
   * Add new posts
   * @param {string} title - the post title
   * @param {string} content - the post content
   */
  addPost(title: string, content: string) {
    const post: Post = {title, content};
    this.posts.push(post);
    // Listen for updated posts
    this.postsUpdated.next([...this.posts]);
  }
}
