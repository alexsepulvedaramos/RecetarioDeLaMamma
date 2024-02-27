import { Injectable } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { FirebaseStorage, StorageReference, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseApp, initializeApp } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {

  public app: FirebaseApp;
  public storage: FirebaseStorage;
  public storageRef: StorageReference;

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

  // Method for uploading Firebase Storage images
  public uploadImageFromWebcam(webcamImage: WebcamImage): void {
    if (webcamImage) {
      const blob = this.dataURItoBlob(webcamImage.imageAsDataUrl);
      const file = new File([blob], `image_${new Date().getTime()}.png`, { type: 'image/png' });

      this.storageRef = ref(this.storage, `image_${new Date().getTime()}.png`);

      uploadBytes(this.storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
  }

  // Method for turning URI data into Blob
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
