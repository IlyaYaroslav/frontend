import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-input-file',
  imports: [],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent {
  readonly accept = input<string>();
  readonly disabled = input<boolean>(false);

  readonly fileSelected = output<File>();

  private readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('input');

  open(): void {
    const input: HTMLInputElement = this.inputRef().nativeElement;

    this.resetInputFile(input);

    input.click();
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    const file = input.files?.item(0);
    
    if (file) {
      this.fileSelected.emit(file);
    }
  }
  
  private resetInputFile(input: HTMLInputElement): void {
    input.value = '';
  }
}
