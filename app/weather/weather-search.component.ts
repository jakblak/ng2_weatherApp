import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./weather.service";
import { Weather } from "./weather";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'we-search',
    template: `
        <section class="weather-search">
            <form (ngSubmit)="onSubmit()">
                <label for="city">City</label>
                <input ngControl="location" type="text" id="city" (input)="onSearchLocation(input.value)" required #input>
                <button class="btn btn-success" type="submit">Add City</button>
            </form>
            <div>
                <span class="info">City found:</span> {{data.name}}
            </div>
        </section>
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
