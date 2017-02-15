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
    weatherData: any = {};
    newProfile: Profile = { profileName: '', cities: '' }

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
        this.newProfile.profileName = '';
        this.newProfile.cities = '';
    }

    onLoadProfile(profile: Profile) {
        this._weatherService.searchWeatherData(profile.cities)
                .subscribe(
                    data => this.weatherItem = data
                );
        }

    onDeleteProfile(event: Event, profile: Profile) {
        event.stopPropagation();
        this._profileService.deleteProfile(profile);
    }

}