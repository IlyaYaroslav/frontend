import { Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals'

@Component({
  selector: 'app-input-string',
  imports: [
    FormField,
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
  
  readonly state = computed(()=> this.field()());
  
  readonly errorMessage = computed(()=> {
    const state = this.state();
    
    if (!this.submitted() && !state.touched() && !state.dirty()) {
      return null;
    }
    
    return state.errors()[0]?.message ?? null;
  })
}
