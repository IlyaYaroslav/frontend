import { Component } from '@angular/core';
import { RegisterFormComponent } from '@features/register-form';
import { RegisterLayoutComponent } from '@widgets/register-layout';

@Component({
  selector: 'app-register-page',
  imports: [
    RegisterLayoutComponent,
    RegisterFormComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {}
