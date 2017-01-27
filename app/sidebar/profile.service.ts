import { Profile } from './profile';

export class ProfileService {
    private profiles: Profile[] = [
        { profileName: '1', cities: 'New York' },
        { profileName: '2', cities: 'London' },
        { profileName: '3', cities: 'Berlin' }
    ];

    saveNewProfile(profile: Profile) {
        return this.profiles.push(profile);
    }

    getProfiles() {
        return this.profiles;
    }

    deleteProfile(profile: Profile) {
        this.profiles.splice(this.profiles.indexOf(profile), 1);
    }
}