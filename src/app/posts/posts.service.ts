import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {Post} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  /**
   * Return a copy of the posts array
   * @returns {post[]} - an array of posts
   */
  getPosts() {
    this.http
      .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      // Pipe posts and transform them to match the Post model
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  /**
   * Listen for new posts added to array
   * @returns {Observable<Post[]>}
   */
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  /**
   * Add new posts
   * @param {string} title - the post title
   * @param {string} content - the post content
   */
  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        // Listen for updated posts
        this.postsUpdated.next([...this.posts]);
      });
  }
}
