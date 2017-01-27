import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./weather.service";
import { Weather } from "./weather";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'we-search',
    template: `
        <div class="weather-search">
           <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label class="col-md-1 control-label" for="city">City:</label>
              <div class="col-md-9">
              <input ngControl="location" type="text" id="city"
                    class="form-control input-sm"
                    (input)="onSearchLocation(input.value)"
                    required
                    placeholder="Enter city"
                    #input>
              </div>
               <div class="col-md-2">
               <button class="btn btn-success" type="submit">
                       Add City
                  </button>
               </div>
            </div>
          </form>
         </div>
            <div class="col-md-12">
                <h4>City found: <small>{{data.name}}</small></h4>
            </div>
    `
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data: any = {};

    constructor(private _weatherService:WeatherService) { }

    onSubmit() {
        const weatherItem: Weather = {
            cityName: this.data.name,
            description: this.data.weather[0].description,
            temperature: this.data.main.temp
        }
        console.log(weatherItem);
        this.city.cityName = '';
        this._weatherService.addWeatherItem(weatherItem);
    }

    onSearchLocation(cityName:string) {
        this.searchStream
              .next(cityName);
    }

    ngOnInit() {
        this.searchStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((input:string) =>
                this._weatherService.searchWeatherData(input))
            .subscribe(
              data => this.data = data
            );
    }
}
