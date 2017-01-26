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
    weatherItem: Weather[];
    // profileName: string;
    // cities: any[];
    weatherData: any = {};
    newProfile = { profileName: '', cities: [''] }

    constructor (private _profileService: ProfileService,
                          private _weatherService: WeatherService) {}

    ngOnInit() {
        this.profiles = this.getProfiles();
    }

    getProfiles() {
        return this._profileService.getProfiles();
    }

    onSaveNew() {
        const profileItem: Profile = {
            profileName: this.newProfile.profileName,
            cities: this.newProfile.cities
        }
        console.log(profileItem);
        this._profileService.saveNewProfile(profileItem);
        this.getProfiles();
    }

    onLoadProfile(profile: Profile) {
        this._weatherService.clearWeatherItems();
        for (let i = 0; i < profile.cities.length; i++) {
            this._weatherService.searchWeatherData(profile.cities[i])
                .retry()
                .subscribe(
                    data => {
                               const weatherItem: Weather = {
                                    cityName: this.weatherData.name,
                                    description: this.weatherData.weather[0].description,
                                    temperature: this.weatherData.main.temp
                                }
                        console.log(weatherItem);
                        this._weatherService.addWeatherItem(weatherItem);
                    }
                );
        }
    }

    // onLoadProfile(profile: Profile) {
    //     this._weatherService.clearWeatherItems();
    //       for (let i = 0; i < profile.cities.length; i++) {
    //         this._weatherService.searchWeatherData(profile)
    //             .retry()
    //             .subscribe(
    //                   data => {
    //                      const weatherItem: Weather = {
    //                         cityName: this.data.name,
    //                         // description: this.data.weather[0].description,
    //                         description: this.data.wind.speed,
    //                         temperature: this.data.main.temp
    //                     }
    //                     console.log(data);
    //                     // this.data = data
    //                     // const weatherItem = new Weather(data.name, data.weather[0].description, data.main.temp);
    //                     this._weatherService.addWeatherItem(weatherItem);
    //                 }
    //             );
    //   //  }
    // }

    onDeleteProfile(event: Event, profile: Profile) {
        event.stopPropagation();
        this._profileService.deleteProfile(profile);
    }

}