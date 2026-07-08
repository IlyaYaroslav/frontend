import { Component } from '@angular/core';
import { UpdateAvatarComponent } from '@features/update-avatar';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-profile-page',
  imports: [
    Divider,
    UpdateAvatarComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {

}
