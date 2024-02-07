import { DocumentData, DocumentSnapshot, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";

export interface Recipe {
  id: string;
  pasos: string[];
  nombre: string;
  ingredientes: Ingrediente[];
  imagenes: string[];
}

export interface Ingrediente {
  unidad: string;
  cantidad: number;
  nombre: string;
  icono: string;
}

// Firestore data converter
export const recipeConverter: FirestoreDataConverter<Recipe> = {
  toFirestore: (recipe: Recipe) => {
    return {
      pasos: recipe.pasos,
      nombre: recipe.nombre,
      ingredientes: recipe.ingredientes.map((ingrediente) => ({
        unidad: ingrediente.unidad,
        cantidad: ingrediente.cantidad,
        nombre: ingrediente.nombre,
        icono: ingrediente.icono,
      })),
      imagenes: recipe.imagenes,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>): Recipe => {
    const data: DocumentData | undefined = snapshot.data();

    return {
      id: snapshot.id,
      pasos: data['pasos'],
      nombre: data['nombre'],
      ingredientes: data['ingredientes'].map((ingrediente: Ingrediente) => ({
        unidad: ingrediente.unidad,
        cantidad: ingrediente.cantidad,
        nombre: ingrediente.nombre,
        icono: ingrediente.icono,
      })),
      imagenes: data['imagenes'],
    };
  }
};
