import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Weather } from './weather';
import { WEATHER_ITEMS } from "./weather.data";

@Injectable()
export class WeatherService {
    private URL: string = 'http://api.openweathermap.org/data/2.5/weather?q='
    private KEY: string = '16b0f73c6b8a9412f74b1b56a485e456'

    constructor (private _http: Http) { }

    getWeatherItems() {
        return WEATHER_ITEMS;
    }

    addWeatherItem(weatherItem: Weather) {
        WEATHER_ITEMS.push(weatherItem);
    }

    clearWeatherItems() {
        WEATHER_ITEMS.splice(0);
    }

    searchWeatherData(cityName: string): Observable<any> {
        return this
            ._http.get(this.URL + cityName + '&APPID=' + this.KEY + '&units=imperial')
            .map(response => response.json())
            .do(response => console.log('searchWeatherData: ' + JSON.stringify(response)))
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            });
    }
}