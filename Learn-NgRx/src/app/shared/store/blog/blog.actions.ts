import { createAction, props } from "@ngrx/store";
import { BlogModel } from "./blog.model";

export const loadblog=createAction('loadblog');

export const addblog=createAction('addblog',props<{bloginput:BlogModel}>());