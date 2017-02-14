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
              <h3>Add City: </h3>
                <input
                    ngControl="location"
                    type="text"
                    id="city"
                    class="form-control input-sm"
                    (input)="onSearchLocation(input.value)"
                    required
                    placeholder="City"
                    #input>
                </div>
                  <button class="btn btn-success profile-btn" type="submit">
                       Submit
                  </button>
            </form>
            <div *ngIf="data.name">
                <h4>City found: <small>{{data.name}}</small></h4>
            </div>
        </div>
    `
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data: any = {};

    constructor(private _weatherService: WeatherService) { }

    onSubmit() {
        const weatherItem: Weather = {
            cityName: this.data.name,
            description: this.data.weather[0].description,
            temperature: this.data.main.temp
        }
        console.log(weatherItem);
        this._weatherService.addWeatherItem(weatherItem);
    }

    onSearchLocation(cityName: string) {
        this.searchStream
              .next(cityName);
    }

    ngOnInit() {
        this.searchStream
            .debounceTime(300)            // wait 300 milliseconds
            .distinctUntilChanged()        // emit when the current value is different than last.
            .switchMap((input: string) =>        // takes current observable and makes svc request
                this._weatherService.searchWeatherData(input))
            .subscribe(
              data => this.data = data,
              err => {
                  console.log(`Can't get weather. Error code: ${err.cod}, Message: ${err.message}`);
                  console.log(err);
              },
              () => console.log(`Weather is retrived`)
            );
    }
}
