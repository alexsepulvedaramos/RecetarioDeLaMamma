import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foods, Language } from '../interfaces/foods';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  private _foods: Foods[] = [];

  constructor(
    private http: HttpClient
  ) {
    const foodsUrl = 'https://app.fitia.app/api/get-foods/';

    this.http.post<Foods[]>(foodsUrl, null).subscribe(result => {
      this._foods = result;
    });
  }

  get foods() {
    return this._foods;
  }

  set foods(value: Foods[]) {
    if (!value) {
      throw new Error('Could not retrieve the information.');
    }
    this._foods = value;
  }

  // Returns the icon URL filtering by id
  getFoodIconById(id: string): string | undefined {
    return this._foods.find(food => food.id === id)?.iconURL;
  }

  // Returns the icon URL filtering by name
  getFoodIconByName(name: string, language: Language): string | undefined {
    const normalizedName = name.toLocaleUpperCase(); // Normalize search name

    return this._foods.find(food => {
      const foodName = food.name.find(n => n.language === language)?.name;
      return foodName && foodName.toLocaleUpperCase().includes(normalizedName);
    })?.iconURL;
  }
}
