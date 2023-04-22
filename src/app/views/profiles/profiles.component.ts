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
    name: ['']
  });
  profiles$: Observable<Profile[]> = this.getProfiles();

  constructor(private profilesGateway: ProfilesGateway, private fb: FormBuilder) {
  }

  private getProfiles(): Observable<Profile[]> {
    const profiles$ = this.profilesGateway.fetchProfiles();
    const searchName$ = this.search.controls.name.valueChanges.pipe(startWith(''));
    return combineLatest([profiles$, searchName$])
      .pipe(
        map(([profiles, name]) => profiles.filter(profile => profile.name.toLowerCase().includes(name.toLowerCase())))
      )
  }
}
