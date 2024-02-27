import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Ingredient } from '../../interfaces/recipe';
import { MESUREMENT_UNITS } from '../../interfaces/measurement-units.enum';
import { FoodsService } from '../../services/foods.service';

// Interface for Dropdown options
interface dropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrl: './add-ingredients.component.scss'
})
export class AddIngredientsComponent {
  @Output() ingredientsAdded = new EventEmitter<Ingredient[]>();

  public ingredients: Ingredient[] = [];

  // Variables for controlling editing mode
  public editIndex: number = 0;
  public editing: boolean = false;

  public ingredientForm = this.formBuilder.group({
    unit: new FormControl<MESUREMENT_UNITS>(MESUREMENT_UNITS.Grams, { nonNullable: true }),
    amount: new FormControl<number | null>(null, { validators: Validators.required, nonNullable: true }),
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.pattern(/\S/)],
      nonNullable: true,
    }),
    icon: new FormControl<string | null>(null)
  });

  public ingredientIcons: dropdownOption[] = [];
  public selectedIcon: string | undefined = undefined;

  public mesurementUnits: dropdownOption[] = [
    { label: 'Grams (g)', value: MESUREMENT_UNITS.Grams },
    { label: 'Kilograms (kg)', value: MESUREMENT_UNITS.Kilograms },
    { label: 'Milligrams (mg)', value: MESUREMENT_UNITS.Milligrams },
    { label: 'Liters (L)', value: MESUREMENT_UNITS.Liters },
    { label: 'Milliliters (mL)', value: MESUREMENT_UNITS.Milliliters },
    { label: 'Centiliters (cL)', value: MESUREMENT_UNITS.Centiliters },
    { label: 'Teaspoons (tsp)', value: MESUREMENT_UNITS.Teaspoons },
    { label: 'Tablespoons (tbsp)', value: MESUREMENT_UNITS.Tablespoons },
    { label: 'Cups (cup)', value: MESUREMENT_UNITS.Cups },
    { label: 'Ounces (oz)', value: MESUREMENT_UNITS.Ounces },
    { label: 'Pounds (lb)', value: MESUREMENT_UNITS.Pounds },
    { label: 'Units (unit)', value: MESUREMENT_UNITS.Units },
    { label: 'Pieces (pc)', value: MESUREMENT_UNITS.Pieces },
    { label: 'Pinches (pinch)', value: MESUREMENT_UNITS.Pinches },
    { label: 'Zests (zest)', value: MESUREMENT_UNITS.Zests },
    { label: 'Leaves (leaves)', value: MESUREMENT_UNITS.Leaves },
    { label: 'Slices (slices)', value: MESUREMENT_UNITS.Slices },
    { label: 'Stalks (stalks)', value: MESUREMENT_UNITS.Stalks },
    { label: 'Cloves (cloves)', value: MESUREMENT_UNITS.Cloves },
    { label: 'Drops (drops)', value: MESUREMENT_UNITS.Drops }
  ];

  constructor(
    private foodsService: FoodsService,
    private formBuilder: FormBuilder,
  ) {
    this.foodsService.getFoods().subscribe((foods) => {
      this.ingredientIcons = foods.map(food => {
        return {
          label: food.iconURL,
          value: food.name.find(name => name.language === 'EN')?.name ?? ''
        }
      })
    }
    );
  }

  get currentIngredient(): Ingredient {
    const ingredient = this.ingredientForm.value as Ingredient;
    return ingredient;
  }

  saveIngredient(): void {
    if (this.ingredientForm.invalid) return;

    if (this.editing) {
      this.ingredients.splice(this.editIndex, 1, this.currentIngredient);
      this.editing = false;
    } else {
      this.ingredients.push(this.currentIngredient);
    }

    // Update parent ingredients info
    this.ingredientsAdded.emit(this.ingredients);

    this.ingredientForm.reset();
  }

  editIngredient(ingredient: Ingredient): void {
    this.editing = true;
    this.editIndex = this.ingredients.indexOf(ingredient);

    this.ingredientForm.reset(ingredient);
  }

  cancelEditing(): void {
    this.editing = false;
    this.ingredientForm.reset();
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.ingredients = this.ingredients.filter(i => i !== ingredient);

    // Update parent ingredients info
    this.ingredientsAdded.emit(this.ingredients);
  }

  resetForm(): void {
    this.ingredientForm.reset();
    this.ingredientForm.markAsPristine();
  }
}
