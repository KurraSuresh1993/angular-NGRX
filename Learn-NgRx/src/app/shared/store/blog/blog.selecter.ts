import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogModel, Blogs } from "./blog.model";

const getblogstate=createFeatureSelector<Blogs>('blog');
export const  getblog=createSelector(getblogstate,(state)=>{
    return state.blogList;
})
