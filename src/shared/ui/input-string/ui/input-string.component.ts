import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { IconComponent } from '@shared/ui/icon';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-input-string',
  imports: [
    FloatLabel,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    FormField,
    IconField,
    InputIcon,
    IconFieldModule,
    IconComponent,
    Message,
  ],
  templateUrl: './input-string.component.html',
  styleUrl: './input-string.component.scss',
})
export class InputStringComponent {
  readonly field = input.required<FieldTree<string>>();
  protected readonly fieldState = computed(()=> this.field()());
  
  readonly id = input.required<string>();
  readonly label = input<string>();
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly autocomplete = input<string>('');
  readonly submitted = input<boolean>(false);
  readonly clear = input<boolean>(false);
  readonly size = input<'small' | 'large' | undefined>('small');
  
  protected readonly value = computed(()=> this.fieldState().value());
  
  protected readonly showError = computed(() => {
    const field = this.fieldState();
    
    return field.invalid() && (field.touched() || this.submitted());
  })
  
  protected readonly errorMessage = computed(()=> {
    const error = this.fieldState().errors()[0];
    
    return error?.message ?? 'Поле заполнено некорректно';
  })
  
  protected mask = signal<boolean>(true);
  
  protected clearValue(): void {
    this.fieldState().value.set('');
  }
  
  protected passwordInputType = computed(()=> this.mask() ? 'password' : 'text');

  protected toggleMask(): void {
    this.mask.update((value)=> !value);
  }
}
