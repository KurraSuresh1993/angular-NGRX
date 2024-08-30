import { createReducer, on } from '@ngrx/store';
import { BlogState } from './blog.state';
import { addblog, loadblog } from './blog.actions';



const _blogReducer = createReducer(
  BlogState,
  on(loadblog, (state) => {
    return {
      ...state,
      
    
    };
  }),
  on(addblog, (state, action) => {
    const _blog = { ...action.bloginput, id: state.blogList.length + 1 }; // Create a new blog object with the updated id
    return {
      ...state,
      blogList: [...state.blogList, _blog]
    };
  })

);
export function blogReducer(state: any, action: any) {
  return _blogReducer(state, action);
}
