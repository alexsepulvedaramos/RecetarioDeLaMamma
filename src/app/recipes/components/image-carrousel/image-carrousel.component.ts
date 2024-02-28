import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageStorageService } from '../../services/image-storage.service';

@Component({
  selector: 'app-image-carrousel',
  templateUrl: './image-carrousel.component.html',
  styleUrl: './image-carrousel.component.scss'
})
export class ImageCarrouselComponent {
  @Input() editingControls: boolean = false;

  public images: string[] = [];
  public imageIndex: number = 0;

  constructor(
    private imageStorageService: ImageStorageService
  ) {
    this.imageStorageService.getLocalImageSources().subscribe(imageSources => {
      this.images = imageSources;
    })
  }

  getCurrentImage(): string {
    if (this.images && this.images.length > 0) {
      if (this.images[this.imageIndex]) {
        return this.images[this.imageIndex];
      }
    }

    return '';
  }

  prevImage() {
    if (this.images) {
      this.imageIndex = (this.imageIndex - 1 + this.images.length) % this.images.length;
    }
  }

  nextImage() {
    if (this.images) {
      this.imageIndex = (this.imageIndex + 1) % this.images.length;
    }
  }

  deleteImage() {
    const deleteIndex = this.imageIndex;

    if (deleteIndex === this.images.length - 1) {
      this.prevImage();
    }

    this.imageStorageService.removeLocalImageSource(deleteIndex);
    this.imageStorageService.removeImageFile(deleteIndex);
  }
}
