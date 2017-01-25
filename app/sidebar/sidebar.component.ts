import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { WeatherService } from '../weather/weather.service';
import { ProfileService } from './profile.service';
import { Weather } from '../weather/weather';

@Component({
  moduleId: module.id,
  selector: 'we-sidebar',
  styleUrls: ['sidebar.styles.css'],
  templateUrl: 'sidebar.template.html'
})

export class SidebarComponent implements OnInit {
    profiles: Profile[];

    constructor (private _profileService: ProfileService,
                          private _weatherService: WeatherService) {}

    ngOnInit() {
        this.profiles = this.getProfiles();
    }

    getProfiles() {
        return this._profileService.getProfiles();
    }

    // onSaveNew() {
    //     const cities = this._weatherService.getWeatherItems().map(function (element: Weather) {
    //         return element.cityName;
    //     });
    //     this._profileService.saveNewProfile(cities);
    // }

    onLoadProfile(profile: Profile) {
        this._weatherService.clearWeatherItems();
        for (let i = 0; i < profile.cities.length; i++) {
            this._weatherService.searchWeatherData(profile.cities[i])
                .retry()
                .subscribe(
                    data => {
                        // const weatherItem = new Weather(data.name, data.weather[0].description, data.main.temp);
                        this._weatherService.addWeatherItem(data);
                    }
                );
        }
    }

    onDeleteProfile(event: Event, profile: Profile) {
        event.stopPropagation();
        this._profileService.deleteProfile(profile);
    }

}