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
                    type="text"
                    name="city"
                    [(ngModel)]="city.name"
                    class="form-control input-sm"
                    (input)="onSearchLocation(search.value)"
                    placeholder="City"
                    #search>
                </div>
                <pre>{{ search.value }}</pre>
                  <button class="btn btn-success profile-btn" type="submit">
                       Submit
                  </button>
            </form>
            <div *ngIf="city.name">
                <h4>City found: <small>{{city.name}}</small></h4>
            </div>
        </div>
    `
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    city: any = {};

    constructor(private _weatherService: WeatherService) { }

    onSubmit() {
        const weatherItem: Weather = {
            cityName: this.city.name,
            description: this.city.weather[0].description,
            temperature: this.city.main.temp
        }
        console.log(weatherItem);
        this._weatherService.addWeatherItem(weatherItem);
        this.city.name = '';
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
              city => this.city = city,
              err => {
                  console.log(`Can't get weather. Error code: ${err.cod}, Message: ${err.message}`);
                  console.log(err);
              },
              () => console.log(`Weather is retrived`)
            );
    }
}
