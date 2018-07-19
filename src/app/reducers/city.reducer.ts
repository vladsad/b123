import { Action } from "@ngrx/store";
import { City} from "../models/city.model";
import * as CityActions from './../actions/city.action';

let initialState: City[] = [
  {
    name: 'Kazan',
    temp: 23,
    icon: 'test'
  },
  {
    name: 'Moscow',
    temp: 24,
    icon: 'test'
  }
];

let keys = Object.keys(localStorage),
  i = keys.length;

while ( i-- ) {
  initialState.push( {
    name:  localStorage.key( i ) ,
    temp: JSON.parse(localStorage.getItem(keys[i]))['temp'] ,
    icon: JSON.parse(localStorage.getItem(keys[i]))['icon'] })
}

export function reducer(state: City[] = initialState, action: CityActions.Actions) {
  switch (action.type) {
    case CityActions.ADD_CITY:
      return [...state,action.payload];
    case CityActions.UPDATE_CITY: {


      const t =[];

      const f = (previousValue, currentValue, currentIndex, t) => {
        if(currentValue.name !== action.payload.name)
          t.push(currentValue);
        else
          t.push({...action.payload, temp: action.payload.temp, icon: action.payload.icon});
      };

      const re = state.reduce(f,t);

      console.log(re);

      return state;
      // return re;

      // console.log('v');
      // const c = state.find((t1,i) => (t1.name === action.payload) );
      //
      // const reducer = (accumulator, currentValue) => accumulator + currentValue;
      //
      //
      // console.log(c);
      //
      // return state;
    }
    default:
      return state;
  }
}
