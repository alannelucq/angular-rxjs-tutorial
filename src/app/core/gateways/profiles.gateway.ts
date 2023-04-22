import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "../models/profile.model";

@Injectable({
  providedIn: "root"
})
export class ProfilesGateway {

  constructor(private http: HttpClient) {
  }

  fetchProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>("http://localhost:3000/profiles");
  }
}
