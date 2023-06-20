import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "../models/profile.model";
import { ProfileSearch } from "../models/profile-search.model";

@Injectable({
  providedIn: "root"
})
export class ProfilesGateway {

  constructor(private http: HttpClient) {
  }

  fetchProfiles(search: ProfileSearch): Observable<Profile[]> {
    let params = new HttpParams();
    if (search.name) params = params.append("name_like", search.name);
    if (search.job) params = params.append("job_like", search.job);
    if (search.location) params = params.append("location_like", search.location);
    if (search.availableOnly) params = params.append("available", true);
    return this.http.get<Profile[]>("http://localhost:3000/profiles", {params});
  }
}
