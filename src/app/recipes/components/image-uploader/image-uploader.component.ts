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
  @Output() imagesAdded = new EventEmitter<string[]>();

  public dialogVisible: boolean = false;

  public webcamImage: WebcamImage | undefined;
  public uploadedImage: File | undefined;

  public imagesSrc: string[] = [];
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private imageStorageService: ImageStorageService
  ) {
  }

  showDialog(): void {
    this.dialogVisible = true;
  }

  // Method called when an image is captured
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    this.imagesSrc.push(webcamImage.imageAsDataUrl);

    // Update parent instructions info
    this.imagesAdded.emit(this.imagesSrc);

    // TODO Images should be named with recipeId
    // this.imageStorageService.uploadImageFromWebcam(webcamImage);
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
      this.uploadedImage = file;
      this.imagesSrc.push(file.objectURL.changingThisBreaksApplicationSecurity);
    });
  }
}
