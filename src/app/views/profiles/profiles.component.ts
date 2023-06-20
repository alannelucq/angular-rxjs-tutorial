import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ProfilesGateway } from "../../core/gateways/profiles.gateway";
import { debounceTime, switchMap } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  profilesGateway = inject(ProfilesGateway);

  name = signal('');
  job = signal('');
  location = signal('');
  available = signal(false);
  search = computed(() => ({
    name: this.name(),
    job: this.job(),
    location: this.location(),
    availableOnly: this.available()
  }));
  profiles = toSignal(
    toObservable(this.search).pipe(
      debounceTime(200),
      switchMap(search => this.profilesGateway.fetchProfiles(search))
    )
  );
}
