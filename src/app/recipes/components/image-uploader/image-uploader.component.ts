import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';

import { ImageStorageService } from '../../services/image-storage.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {
  @ViewChild('fileUploader', { static: false }) fileUploader?: FileUpload;

  public dialogVisible: boolean = false;

  public imagesSrc: string[] = [];
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private imageStorageService: ImageStorageService
  ) {
    this.imageStorageService.getLocalImageSources().subscribe(imageSources => {
      this.imagesSrc = imageSources;
    })
  }

  showDialog(): void {
    this.dialogVisible = true;
  }

  // Method called when an image is captured
  handleImage(webcamImage: WebcamImage): void {
    const dataURI = webcamImage.imageAsDataUrl;
    const file = this.imageStorageService.dataURItoFile(dataURI);

    this.imageStorageService.addLocalImageSource(dataURI);
    this.imageStorageService.addImageFile(file);
  }

  // Method called if there is an error initializing the webcam
  handleInitError(error: WebcamInitError): void {
    console.error('Error initializing webcam:', error);
  }

  // Method called when the webcam is triggered
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  // Method to capture an image
  capture(): void {
    this.trigger.next();
    this.dialogVisible = false;
  }

  get videoOptions(): MediaTrackConstraints {
    //you can set ideal,min,max for width and height
    const result: MediaTrackConstraints = {
      width: { min: 640, ideal: 1920 },
      height: { min: 480, ideal: 1080 },
      aspectRatio: 1.5
    };

    return result;
  }

  onImageUpload(filesHandler: any): void {
    filesHandler.files.forEach((file: any) => {
      const localFileUrl = file.objectURL.changingThisBreaksApplicationSecurity;

      this.imageStorageService.addLocalImageSource(localFileUrl);
      this.imageStorageService.addImageFile(file);
    });

    if (this.fileUploader) {
      this.fileUploader.clear();
    }
  }
}
