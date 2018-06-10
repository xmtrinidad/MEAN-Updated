# MEAN - Updated

This is an updated version of the MEAN Stack Course from Maximilian Schwarzmüller

Link to course: <https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/>

## Outline

* Angular Frontend
* Node.js + Express Backend
* Handling data with MongoDB
* Enhancing the App
* Image uploading
* Data pagination
* Authentication
* Authorization
* Error handling
* Optimizations
* Deployment

## New Things

### Learned about [:host](https://developer.mozilla.org/en-US/docs/Web/CSS/:host()), which lets you apply CSS to an entire component.

```css
:host {
  display: block;
  margin-top: 1rem;
}
```

Rather than having a wrapper element within the component, *:host* will target the entire component and apply any defind CSS to it.  The default display of a component is **inline**, which is why, for this example, display is set to block.  Without being set to block, the margin will not be applied.

### Using the formsModule to get input data without using two-way data binding

Below is an example of an input element set-up with ngModel
```html
<input
  type="text"
  name="title"
  ngModel
  #title="ngModel">
```

an *ngModel* and *reference* property (#title) are needed on the input.  When a form is submitted, the input field/s is referenced based on its *name* attribute.

The **form** element looks something like this:
```html
<form (submit)="onAddPost(postForm)" #postForm="ngForm">
  <!-- inputs and buttons -->
</form>
```

The *postForm* is referenced and passed into the method that runs when the form is submitted:
```javascript
onAddPost(form: NgForm) {
  if (form.invalid) {
    return;
  }
  const post: Post = { title: form.value.title, content: form.value.content };
  this.postCreated.emit(post);
}
```
By referencing the form, I can access the form inputs by their name.  I can also prevent an invalid form submission by checking if the form is valid or not.

---

## Referencing inputs to display errors

Using Angular Material, the process for showing error messages based on valid form fields is straight forward.  The first thing is to ensure that the input fields have references:
```html
<textarea
  required
  matInput
  type="text"
  name="content"
  ngModel
  #content="ngModel"></textarea>
```

In the example above, **#content** is the input reference.  This is used with the Angular Material error element:

```html
<mat-error *ngIf="content.invalid">Please enter a post title</mat-error>
```

In the example above, the *content* is referenced and, because it's of type *ngModel*, it has an *invalid* property which can be accessed.  Depending on if the content is valid or not, an error message is displayed.

---

### Better understanding of Rxjs Subjects

Using rxjs *Subjects* changes can be detected on data and, in the example of the posts in this example, can be re-rendered to show updated data.

Subjects are *Observables* that emit a *next()* value as shown below with *this.postsUpdated.next()*

```javascript
addPost(title: string, content: string) {
    const post: Post = {title, content};
    this.posts.push(post);
    // Listen for updated posts
    this.postsUpdated.next([...this.posts]);
  }
```

Although a *Subject* can be directly subscribed to, a best practice is to set it as private and return it as an Observable using the *asObservable()* method:

```javascript
// No longer can be directly described to due to being private
private postsUpdated = new Subject<Post[]>();

/**
 * Listen for new posts added to array
 * @returns {Observable<Post[]>}
 */
getPostupdateListener() {
  return this.postsUpdated.asObservable();
}
```

Then, in the component that is listening for changes, the method can be subscribed to:

```typescript
ngOnInit() {
  this.posts = this.postsService.getPosts();
  // Listening here
  this.postsSub = this.postsService.getPostupdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
}
```

In order to avoid a memory leak, any subscriptions should unsubscribe when the component is destroyed:

```typescript
ngOnDestroy() {
  this.postsSub.unsubscribe();
}
```

---



