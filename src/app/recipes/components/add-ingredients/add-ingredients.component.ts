import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Ingredient } from '../../interfaces/recipe';
import { MESUREMENT_UNITS } from '../../interfaces/measurement-units.enum';
import { FoodsService } from '../../services/foods.service';
import { Foods } from '../../interfaces/foods';

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
  public foods: Foods[] = [];
  public selectedIcon: string | undefined = undefined;

  public mesurementUnits: dropdownOption[] = [
    { label: this.translateService.instant('MESUREMENT_UNITS.GRAMS'), value: MESUREMENT_UNITS.Grams },
    { label: this.translateService.instant('MESUREMENT_UNITS.KILOGRAMS'), value: MESUREMENT_UNITS.Kilograms },
    { label: this.translateService.instant('MESUREMENT_UNITS.MILLIGRAMS'), value: MESUREMENT_UNITS.Milligrams },
    { label: this.translateService.instant('MESUREMENT_UNITS.LITERS'), value: MESUREMENT_UNITS.Liters },
    { label: this.translateService.instant('MESUREMENT_UNITS.MILLILITERS'), value: MESUREMENT_UNITS.Milliliters },
    { label: this.translateService.instant('MESUREMENT_UNITS.CENTILITERS'), value: MESUREMENT_UNITS.Centiliters },
    { label: this.translateService.instant('MESUREMENT_UNITS.TEASPOONS'), value: MESUREMENT_UNITS.Teaspoons },
    { label: this.translateService.instant('MESUREMENT_UNITS.TABLESPOONS'), value: MESUREMENT_UNITS.Tablespoons },
    { label: this.translateService.instant('MESUREMENT_UNITS.CUPS'), value: MESUREMENT_UNITS.Cups },
    { label: this.translateService.instant('MESUREMENT_UNITS.OUNCES'), value: MESUREMENT_UNITS.Ounces },
    { label: this.translateService.instant('MESUREMENT_UNITS.POUNDS'), value: MESUREMENT_UNITS.Pounds },
    { label: this.translateService.instant('MESUREMENT_UNITS.UNITS'), value: MESUREMENT_UNITS.Units },
    { label: this.translateService.instant('MESUREMENT_UNITS.PIECES'), value: MESUREMENT_UNITS.Pieces },
    { label: this.translateService.instant('MESUREMENT_UNITS.PINCHES'), value: MESUREMENT_UNITS.Pinches },
    { label: this.translateService.instant('MESUREMENT_UNITS.LEAVES'), value: MESUREMENT_UNITS.Leaves },
    { label: this.translateService.instant('MESUREMENT_UNITS.SLICES'), value: MESUREMENT_UNITS.Slices },
    { label: this.translateService.instant('MESUREMENT_UNITS.CLOVES'), value: MESUREMENT_UNITS.Cloves },
    { label: this.translateService.instant('MESUREMENT_UNITS.DROPS'), value: MESUREMENT_UNITS.Drops }
  ];

  constructor(
    private foodsService: FoodsService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.mesurementUnits = [
        { label: this.translateService.instant('MESUREMENT_UNITS.GRAMS'), value: MESUREMENT_UNITS.Grams },
        { label: this.translateService.instant('MESUREMENT_UNITS.KILOGRAMS'), value: MESUREMENT_UNITS.Kilograms },
        { label: this.translateService.instant('MESUREMENT_UNITS.MILLIGRAMS'), value: MESUREMENT_UNITS.Milligrams },
        { label: this.translateService.instant('MESUREMENT_UNITS.LITERS'), value: MESUREMENT_UNITS.Liters },
        { label: this.translateService.instant('MESUREMENT_UNITS.MILLILITERS'), value: MESUREMENT_UNITS.Milliliters },
        { label: this.translateService.instant('MESUREMENT_UNITS.CENTILITERS'), value: MESUREMENT_UNITS.Centiliters },
        { label: this.translateService.instant('MESUREMENT_UNITS.TEASPOONS'), value: MESUREMENT_UNITS.Teaspoons },
        { label: this.translateService.instant('MESUREMENT_UNITS.TABLESPOONS'), value: MESUREMENT_UNITS.Tablespoons },
        { label: this.translateService.instant('MESUREMENT_UNITS.CUPS'), value: MESUREMENT_UNITS.Cups },
        { label: this.translateService.instant('MESUREMENT_UNITS.OUNCES'), value: MESUREMENT_UNITS.Ounces },
        { label: this.translateService.instant('MESUREMENT_UNITS.POUNDS'), value: MESUREMENT_UNITS.Pounds },
        { label: this.translateService.instant('MESUREMENT_UNITS.UNITS'), value: MESUREMENT_UNITS.Units },
        { label: this.translateService.instant('MESUREMENT_UNITS.PIECES'), value: MESUREMENT_UNITS.Pieces },
        { label: this.translateService.instant('MESUREMENT_UNITS.PINCHES'), value: MESUREMENT_UNITS.Pinches },
        { label: this.translateService.instant('MESUREMENT_UNITS.LEAVES'), value: MESUREMENT_UNITS.Leaves },
        { label: this.translateService.instant('MESUREMENT_UNITS.SLICES'), value: MESUREMENT_UNITS.Slices },
        { label: this.translateService.instant('MESUREMENT_UNITS.CLOVES'), value: MESUREMENT_UNITS.Cloves },
        { label: this.translateService.instant('MESUREMENT_UNITS.DROPS'), value: MESUREMENT_UNITS.Drops }
      ];

      this.ingredientIcons = this.updateIngredientIcon();
    });

    this.foodsService.getFoods().subscribe((foods) => {
      this.foods = foods;

      this.ingredientIcons = this.updateIngredientIcon();
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

  updateIngredientIcon(): dropdownOption[] {
    return this.foods.map(food => {
      const languageCode = this.translateService.currentLang.toLocaleUpperCase();

      return {
        label: food.iconURL,
        value: food.name.find(name => name.language === languageCode)?.name ?? ''
      }
    })
  }
}
