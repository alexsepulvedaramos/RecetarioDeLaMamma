import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-instructions',
  templateUrl: './add-instructions.component.html',
  styleUrl: './add-instructions.component.scss'
})
export class AddInstructionsComponent {
  @Output() instructionsAdded = new EventEmitter<string[]>();

  public instructions: string[] = [];

  // Variables for controlling editing mode
  public editIndex: number = 0;
  public editing: boolean = false;

  public instructionsForm = this.formBuilder.group({
    step: new FormControl<string>('', {
      validators: [Validators.required, Validators.pattern(/\S/)],
      nonNullable: true,
    })
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  get currentInstruction(): string {
    const instruction = this.instructionsForm.get('step')?.value;
    return instruction ? instruction : '';
  }

  saveInstruction(): void {
    if (this.instructionsForm.invalid) return;

    if (this.editing) {
      this.instructions.splice(this.editIndex, 1, this.currentInstruction);
      this.editing = false;
    } else {
      this.instructions.push(this.currentInstruction);
    }

    // Update parent instructions info
    this.instructionsAdded.emit(this.instructions);

    this.instructionsForm.reset();
  }

  editInstruction(instruction: string): void {
    this.editing = true;
    this.editIndex = this.instructions.indexOf(instruction);

    this.instructionsForm.patchValue({
      step: instruction
    });
  }

  cancelEditing(): void {
    this.editing = false;
    this.instructionsForm.reset();
  }

  deleteInstruction(instruction: string): void {
    this.instructions = this.instructions.filter(i => i !== instruction);

    // Update parent instructions info
    this.instructionsAdded.emit(this.instructions);
  }

  resetForm(): void {
    this.instructionsForm.reset();
    this.instructionsForm.markAsPristine();
  }
}
