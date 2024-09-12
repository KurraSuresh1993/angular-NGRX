import { createReducer, on } from '@ngrx/store';
import { BlogState } from './blog.state';
import {
  addblog,
  addblogsuccess,
  deleteblog,
  loadblog,
  loadblogfail,
  loadblogsuccess,
  updateblog,
} from './blog.actions';
import { BlogModel } from './blog.model';

const _blogReducer = createReducer(
  BlogState,
  on(loadblog, (state) => {
    return {
      ...state,
    };
  }),
  on(loadblogsuccess, (state, action) => {
    return {
      ...state,
      blogList: [...action.bloglist],
      errorMessage: '',
    };
  }),
  on(loadblogfail, (state, action) => {
    console.log(action.Errortext);
    return {
      ...state,
      blogList: [],
      errorMessage: action.Errortext.message,
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
    const _blog = { ...action.bloginput }; // Create a new blog object with the updated id
    return {
      ...state,
      blogList: [...state.blogList, _blog],
    };
  }),
  on(updateblog, (state, action) => {
    const _blog = { ...action.bloginput }; // Create a new blog object with the updated id
    const updatedblog = state.blogList.map((blog) => {
      return _blog.id === blog.id ? _blog : blog;
    });
    return {
      ...state,
      blogList: updatedblog,
    };
  }),
  on(deleteblog, (state, action) => {
    const updatedblog = state.blogList.filter((data: BlogModel) => {
      return data.id !== action.id;
    });
    return {
      ...state,
      blogList: updatedblog,
    };
  })
);
export function blogReducer(state: any, action: any) {
  return _blogReducer(state, action);
}
