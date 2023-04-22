import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Profile } from "../../core/models/profile.model";
import { ProfilesGateway } from "../../core/gateways/profiles.gateway";
import { Observable } from "rxjs";

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  profiles$: Observable<Profile[]> = this.profilesGateway.fetchProfiles();

  constructor(private profilesGateway: ProfilesGateway) {
  }
}
