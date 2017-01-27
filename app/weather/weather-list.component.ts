import { Component, OnInit } from "@angular/core";
import { WeatherItemComponent } from "./weather-item.component";
import { Weather } from "./weather";
import { WeatherService } from "./weather.service";

@Component({
    selector: 'we-list',
    template: `
        <div class="weather-list">
            <we-item *ngFor="let weatherItem of weatherItems"
                [item]="weatherItem">
           </we-item>
        </div>
    `
})

export class WeatherListComponent implements OnInit {
    weatherItems: Weather[];

    constructor(private _weatherService: WeatherService) {}

    ngOnInit():void {
        this.weatherItems = this._weatherService.getWeatherItems();
    }
}