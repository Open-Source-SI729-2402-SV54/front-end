import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.entity';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<Profile> {
  constructor() {
    super();
    this.resourceEndPoint = '/users';
  }
  public getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.resourcePath(), this.httpOptions);
  }

  public updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.resourcePath()}/${profile.id}`, profile, this.httpOptions);
  }
}
