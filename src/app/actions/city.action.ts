import { Injectable} from "@angular/core";
import { Action} from "@ngrx/store";
import { City} from "../models/city.model";

export const ADD_CITY = '[CITY] Add';
export const UPDATE_CITY = '[CITY] Update';

export class AddCity implements  Action{
  readonly type = ADD_CITY;

  constructor(public payload)  {};
}

export class UpdateCity implements Action{
  readonly type = UPDATE_CITY;

  constructor(public payload) {} ;
}

export type Actions = AddCity | UpdateCity;
