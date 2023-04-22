import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Profile } from "../../core/models/profile.model";

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  profiles: Profile[] = [];
}
