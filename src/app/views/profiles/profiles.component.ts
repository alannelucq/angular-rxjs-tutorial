import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from "../../core/models/profile.model";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {

  profiles: Profile[] = [
    {
      name: 'James Wellington',
      job: 'Développeur',
      location: 'Bordeaux',
      available: true
    },
    {
      name: 'Julien Costa',
      job: 'Testeur',
      location: 'Paris',
      available: false
    },
    {
      name: 'Émilie Dubois',
      job: 'Designer',
      location: 'Bordeaux',
      available: true
    },
    {
      name: 'Martin Bartolo',
      job: 'Product Owner',
      location: 'Marseille',
      available: false
    },
    {
      name: 'Lucy Scott',
      job: 'Product Owner',
      location: 'Toulouse',
      available: true
    }
  ]
}
