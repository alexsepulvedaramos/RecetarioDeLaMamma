import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from, forkJoin, map } from 'rxjs';
import { FirebaseStorage, StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseApp, initializeApp } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {

  public app: FirebaseApp;
  public storage: FirebaseStorage;
  public storageRef: StorageReference;

  // Local image sources before uploading to Firebase Storage.
  private localImageSources: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  // Image Files for uploading to Firebase Storage.
  private imageFiles: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);

  // Definitive image sources uploaded to Firebase Storage.
  private serverImageSources: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBbEu6Xmj7uqCUvg7KiSuczU0DXvOm8YRI",
      authDomain: "recetario-de-la-mama.firebaseapp.com",
      projectId: "recetario-de-la-mama",
      storageBucket: "recetario-de-la-mama.appspot.com",
      messagingSenderId: "674687883908",
      appId: "1:674687883908:web:f8fed4b9131bdf823a40d1",
      measurementId: "G-82Y1H8QSXQ"
    };

    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
    this.storageRef = ref(this.storage);
  }

  public uploadImageFiles(): Observable<string[]> {
    const currentFiles = this.imageFiles.value;

    // Empty all the images arrays
    this.setImageFiles([]);
    this.setServerImageSource([]);

    if (currentFiles && currentFiles.length > 0) {
      const uploadObservables: Observable<void>[] = currentFiles.map(file => this.uploadImageFromFile(file));

      return forkJoin(uploadObservables).pipe(
        map(() => this.serverImageSources.value)
      );
    } else {
      return from([]);
    }
  }

  // Method for uploading an image into Firebase Storage from File.
  private uploadImageFromFile(file: File): Observable<void> {
    return new Observable<void>((observer) => {
      if (file) {
        const storageRef = ref(this.storage, file.name);

        uploadBytes(storageRef, file).then(() => {

          getDownloadURL(storageRef).then((downloadURL) => {
            this.addServerImageSource(downloadURL);
            observer.next();
            observer.complete();
          }).catch(error => observer.error(error));

        }).catch(error => observer.error(error));

      } else {
        observer.complete();
      }
    });
  }

  // Method for turning URI data into Blob
  public dataURItoFile(dataURI: string): File {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], `image_${new Date().getTime()}.png`, { type: 'image/png' });

    return file;
  }

  // Local image sources handling methods ------------------------------------------------------------------
  public setLocalImageSource(srcs: string[]): void {
    this.localImageSources.next(srcs);
  }

  public getLocalImageSources(): Observable<string[]> {
    return this.localImageSources.asObservable();
  }

  public addLocalImageSource(src: string): void {
    const currentImages = this.localImageSources.value;
    const updatedImages = [...currentImages, src];

    this.localImageSources.next(updatedImages);
  }

  public removeLocalImageSource(index: number): void {
    const currentImages = this.localImageSources.value;

    if (index >= 0 && index < currentImages.length) {
      const updatedImages = currentImages.filter((_, i) => i !== index);

      this.localImageSources.next(updatedImages);
    }
  }

  // Server image sources handling methods ------------------------------------------------------------------
  public setServerImageSource(srcs: string[]): void {
    this.serverImageSources.next(srcs);
  }

  public getServerImageSource(): Observable<string[]> {
    return this.serverImageSources.asObservable();
  }

  public addServerImageSource(src: string): void {
    const currentImages = this.serverImageSources.value;
    const updatedImages = [...currentImages, src];

    this.serverImageSources.next(updatedImages);
  }

  // Image Files handling methods ---------------------------------------------------------------------------
  public setImageFiles(files: File[]): void {
    this.imageFiles.next(files);
  }

  public addImageFile(file: File): void {
    const currentFiles = this.imageFiles.value;
    const updatedFiles = [...currentFiles, file];

    this.imageFiles.next(updatedFiles);
  }

  public removeImageFile(index: number): void {
    const currentFiles = this.imageFiles.value;

    if (index >= 0 && index < currentFiles.length) {
      const updatedFiles = currentFiles.filter((_, i) => i !== index);

      this.imageFiles.next(updatedFiles);
    }
  }
}
