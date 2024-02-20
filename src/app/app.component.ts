import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './recipes/services/firestore.service';
import { Ingredient, Recipe } from './recipes/interfaces/recipe';
import { FoodsService } from './recipes/services/foods.service';
import { Language } from './recipes/interfaces/foods';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private firestoreService: FirestoreService,
    private foodsService: FoodsService
  ) {
  }

  ngOnInit(): void {
    // let data: Recipe[] = [];

    // this.firestoreService.getAllRecipes()
    //   .subscribe(recipes => {
    //     data = recipes.map((recipe: Recipe) => {
    //       recipe.ingredients = recipe.ingredients.map((ing: Ingrediente) => {
    //         const foodIcon = this.foodsService.getFoodIconByName(ing.nombre, Language.Es);

    //         if (foodIcon)
    //           ing.icono = foodIcon;

    //         return ing;
    //       });

    //       return recipe;
    //     });

    //     console.log(data);

    //     data.forEach(d => {
    //       this.firestoreService.updateRecipe(d);
    //     })
    //   });
    // this.firestoreService.getAllRecipes().subscribe(recipe => {
    //   console.log(recipe);

    //   this.firestoreService.addRecipe(recipe[0]).subscribe(x => { console.log(x) });
    // });

    // const chocolateCakeRecipe: Recipe = {
    //   id: '1',
    //   images: ["https://content-cocina.lecturas.com/medio/2023/03/23/el-mejor-pastel-de-chocolate_24bd9cda_1200x1200.jpg"], // Suponiendo que tienes una imagen llamada "chocolate_cake_image.jpg"
    //   ingredients: [
    //     { unit: "grams", amount: 200, name: "Chocolate" },
    //     { unit: "grams", amount: 150, name: "Harina" },
    //     { unit: "grams", amount: 150, name: "Azúcar" },
    //     { unit: "grams", amount: 150, name: "Mantequilla" },
    //     { unit: "units", amount: 3, name: "Huevos" },
    //     { unit: "teaspoon", amount: 1, name: "Polvo de hornear" },
    //     { unit: "tablespoon", amount: 2, name: "Cacao en polvo" },
    //     // Añade más ingredientes si es necesario
    //   ],
    //   instructions: [
    //     "Precalienta el horno a 180°C.",
    //     "Derrite el chocolate y la mantequilla juntos en una cacerola a fuego lento.",
    //     "En un bol grande, bate los huevos y el azúcar hasta que estén pálidos y espumosos.",
    //     "Agrega la mezcla de chocolate derretido y mantequilla a los huevos batidos y mezcla bien.",
    //     "Tamiza la harina, el polvo de hornear y el cacao en polvo en la mezcla de huevo y chocolate. Mezcla hasta que esté suave.",
    //     "Vierte la mezcla en un molde para pastel engrasado.",
    //     "Hornea en el horno precalentado durante 25-30 minutos o hasta que un palillo insertado en el centro salga limpio.",
    //     "Deja enfriar en el molde antes de desmoldar y decorar al gusto.",
    //     // Añade más pasos de instrucciones si es necesario
    //   ],
    //   minutes: 60, // Tiempo total estimado en minutos
    //   name: "Tarta de chocolate", // Nombre de la receta
    // };


    // this.firestoreService.addRecipe(chocolateCakeRecipe).subscribe(recipe => { console.log(recipe) });

    // const cheesecakeRecipe: Recipe = {
    //   id: "2",
    //   images: ["https://www.hogarmania.com/archivos/202312/tarta-de-queso-la-vina-1280x720x80xX.jpg"], // Suponiendo que tienes una imagen llamada "cheesecake_image.jpg"
    //   ingredients: [
    //     { unit: "grams", amount: 250, name: "Galletas digestive" },
    //     { unit: "grams", amount: 100, name: "Mantequilla" },
    //     { unit: "grams", amount: 500, name: "Queso crema" },
    //     { unit: "grams", amount: 200, name: "Azúcar" },
    //     { unit: "units", amount: 4, name: "Huevos" },
    //     { unit: "teaspoon", amount: 1, name: "Extracto de vainilla" },
    //     { unit: "cup", amount: 1, name: "Nata líquida" },
    //     // Añade más ingredientes si es necesario
    //   ],
    //   instructions: [
    //     "Precalienta el horno a 160°C.",
    //     "Tritura las galletas digestive en un procesador de alimentos o metiéndolas en una bolsa y golpeándolas con un rodillo hasta que estén finamente molidas.",
    //     "Derrite la mantequilla y mézclala con las galletas trituradas.",
    //     "Presiona la mezcla de galletas en la base de un molde para pastel desmontable y refrigera mientras preparas el relleno.",
    //     "En un bol grande, bate el queso crema y el azúcar hasta que estén suaves y cremosos.",
    //     "Agrega los huevos uno a uno, batiendo bien después de cada adición.",
    //     "Incorpora el extracto de vainilla y la nata líquida y mezcla hasta que esté suave.",
    //     "Vierte la mezcla sobre la base de galletas en el molde.",
    //     "Hornea en el horno precalentado durante 60-70 minutos o hasta que el centro esté casi firme.",
    //     "Deja enfriar a temperatura ambiente y luego refrigera durante al menos 4 horas o durante toda la noche antes de servir.",
    //     // Añade más pasos de instrucciones si es necesario
    //   ],
    //   minutes: 90, // Tiempo total estimado en minutos
    //   name: "Tarta de Queso", // Nombre de la receta
    // };

    // this.firestoreService.addRecipe(cheesecakeRecipe).subscribe(recipe => { console.log(recipe) });

    // if (data.length > 0) {
    //   data[0].pasos.push('Dorar la cebolla durante unos 10 minutos.');
    //   console.log((await this.firestoreService.updateRecipe(data[0].id, data[0])))
    //   console.log((await this.firestoreService.addRecipe(data[0])).id);
    //   console.log((await this.firestoreService.getRecipeById(data[0].id)))
    // }

    // setTimeout(() => {
    //   data.forEach(recipe => {
    //     this.firestoreService.deleteRecipe(recipe.id);
    //   });
    // }, 10000);
  }
}
