import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BlogModel } from './store/blog/blog.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private URL = 'https://localhost:44371/api/Blogs';
  constructor(private http: HttpClient) {}

  GetAllBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(this.URL);
  }
  CreateBlog(blogInput: BlogModel) {
    return this.http.post(this.URL, blogInput).pipe(
      tap(() => {
        this.http.get<BlogModel>(this.URL + '/' + blogInput.id);
      })
    );
  }
  UpdateBlog(blogInput: BlogModel) {
    return this.http.put(this.URL + '/' + blogInput.id, blogInput);
  }
  DeleteBlog(blogId: number) {
    return this.http.delete(this.URL + '/' + blogId);
  }
}
