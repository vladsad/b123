import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import *  as CityActions from './../actions/city.action';
import {CityWeather} from "../services/cityWeather";
import {State} from "@ngrx/store";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CityWeather]
})
export class CreateComponent implements OnInit {

  constructor(private store: Store<AppState>, private cityService: CityWeather, private state: State<AppState>) {
  };

  addCity(name) {

    if(!name)
      return;

    let state = this.state.getValue().city;

    function isAlreadyExistsInState(state) {
      return state.name.toUpperCase() === name.toUpperCase();
    }

    if (state.length > 0) {
      if (!state.some(isAlreadyExistsInState)) {
        this.citySearchWeatherData(name);
      }
    }
    else
      this.citySearchWeatherData(name);
  }

  citySearchWeatherData(name) {
    this.cityService.searchWeatherData(name).subscribe(
      data => {

        let result = {
          name: data['location']['name'],
          temp: data['current']['temp_c'],
          icon: data['current']['condition']['icon'],
          text: data['current']['condition']['text'],
          region: data['location']['region'],
          country: data['location']['country'],
          lat: data['location']['lat'],
          lon: data['location']['lon'],
          tz_id: data['location']['tz_id']
        };

        function isAlreadyExistsInStateAfterSearchWeatherData(state) {
          return (
            state.region === result.region &&
            state.lat === result.lat &&
            state.lon === result.lon &&
            state.tz_id === result.tz_id
          );
        }

        if (!(this.state.getValue().city.some(isAlreadyExistsInStateAfterSearchWeatherData))) {
          this.store.dispatch(new CityActions.AddCity(result));
        }
      }
    );
  }

  ngOnInit() {
  }
}
