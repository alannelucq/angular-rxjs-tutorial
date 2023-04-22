import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Profile } from "../../core/models/profile.model";
import { ProfilesGateway } from "../../core/gateways/profiles.gateway";
import { combineLatest, map, Observable, startWith } from "rxjs";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  search = this.fb.nonNullable.group({
    name: [''],
    job: [''],
    location: [''],
    available: [false]
  });
  profiles$: Observable<Profile[]> = this.getProfiles();

  constructor(private profilesGateway: ProfilesGateway, private fb: FormBuilder) {
  }

  private getProfiles(): Observable<Profile[]> {
    const profiles$ = this.profilesGateway.fetchProfiles();
    const search$ = combineLatest([
      this.search.controls.name.valueChanges.pipe(startWith('')),
      this.search.controls.job.valueChanges.pipe(startWith('')),
      this.search.controls.location.valueChanges.pipe(startWith('')),
      this.search.controls.available.valueChanges.pipe(startWith(false))
    ]);

    return combineLatest([profiles$, search$])
      .pipe(
        map(([profiles, [name, job, location, availability]]) => profiles.filter(profile => {
          const isNameMatching = profile.name.toLowerCase().includes(name.toLowerCase());
          const isJobMatching = profile.job.toLowerCase().includes(job.toLowerCase());
          const isLocationMatching = profile.location.toLowerCase().includes(location.toLowerCase());
          const isAvailabilityMatching = availability ? profile.available : true;
          return isNameMatching && isJobMatching && isLocationMatching && isAvailabilityMatching;
        }))
      )
  }
}
