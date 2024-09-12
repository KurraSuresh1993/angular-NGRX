import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BlogModel } from './store/blog/blog.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  GetAllBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>('http://localhost:3000/blogs');
  }
  CreateBlog(blogInput: BlogModel) {
    return this.http.post('http://localhost:3000/blogs', blogInput).pipe(
      tap(() => {
        this.http.get<BlogModel>(
          'http://localhost:3000/blogs?_limit=1&_sort=id&_order=desc'
        );
      })
    );
  }
}
