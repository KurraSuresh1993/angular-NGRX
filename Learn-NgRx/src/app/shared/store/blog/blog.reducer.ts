import { createReducer, on } from '@ngrx/store';
import { BlogState } from './blog.state';
import {
  addblog,
  addblogsuccess,
  deleteblog,
  loadblog,
  loadblogfail,
  loadblogsuccess,
  loadspinner,
  updateblog,
  updateblogsuccess,
} from './blog.actions';
import { BlogModel } from './blog.model';

const _blogReducer = createReducer(
  BlogState,
  on(loadblog, (state) => {
    return {
      ...state,
      IsLoaded: false,
    };
  }),
  on(loadblogsuccess, (state, action) => {
    return {
      ...state,
      blogList: [...action.bloglist],
      errorMessage: '',
      IsLoaded: false,
    };
  }),
  on(loadblogfail, (state, action) => {
    console.log(action.Errortext);
    return {
      ...state,
      blogList: [],
      errorMessage: action.Errortext.message,
      IsLoaded: false,
    };
  }),
  // on(addblog, (state, action) => {
  //   const _blog = { ...action.bloginput, id: state.blogList.length + 1 }; // Create a new blog object with the updated id
  //   return {
  //     ...state,
  //     blogList: [...state.blogList, _blog],
  //   };
  // }),
  on(addblogsuccess, (state, action) => {
    console.log('Blog added successfully:', state.blogList.length);
    const _blog = { ...action.bloginput }; // Create a new blog object with the updated id
    return {
      ...state,
      blogList: [...state.blogList, _blog],
      IsLoaded: false,
    };
  }),
  on(updateblogsuccess, (state, action) => {
    const _blog = { ...action.bloginput }; // Create a new blog object with the updated id
    const updatedblog = state.blogList.map((blog) => {
      return _blog.id === blog.id ? _blog : blog;
    });
    return {
      ...state,
      blogList: updatedblog,
      IsLoaded: false,
    };
  }),
  on(deleteblog, (state, action) => {
    const updatedblog = state.blogList.filter((data: BlogModel) => {
      return data.id !== action.id;
    });
    return {
      ...state,
      blogList: updatedblog,
      IsLoaded: false,
    };
  }),
  on(loadspinner, (state, action) => {
    return {
      ...state,
      IsLoaded: action.IsLoaded,
    };
  })
);

export function blogReducer(state: any, action: any) {
  return _blogReducer(state, action);
}
