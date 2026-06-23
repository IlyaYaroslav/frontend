import { Component, computed, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals'
import { IconComponent } from '@shared/ui/icon'

@Component({
  selector: 'app-input-string',
  imports: [
    FormField,
    IconComponent,
  ],
  templateUrl: './input-string.component.html',
  styleUrl: './input-string.component.scss',
})
export class InputStringComponent {
  readonly field = input.required<FieldTree<string>>();

  readonly id = input.required<string>();
  readonly label = input<string>();
  readonly placeholder = input<string>('Введите значение');
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly autocomplete = input<string>('');
  readonly submitted = input<boolean>(false);
  readonly passwordShowControl = input<boolean>(false);
  
  protected readonly isShowedPassword = signal<boolean>(false);

  protected readonly state = computed(() => this.field()());
  
  protected readonly inputType = computed(()=> {
    if (this.type() !== 'password') {
      return this.type();
    }
    
    return this.isShowedPassword() ? 'text' : 'password';
  })

  protected readonly errorMessage = computed(() => {
    const state = this.state();

    if (!this.submitted() && !state.touched() && !state.dirty()) {
      return null;
    }

    return state.errors()[0]?.message ?? null;
  })

  protected togglePasswordVisibility(): void {
    this.isShowedPassword.update((current) => !current);
  }
}
