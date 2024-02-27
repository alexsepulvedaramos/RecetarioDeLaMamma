import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-carrousel',
  templateUrl: './image-carrousel.component.html',
  styleUrl: './image-carrousel.component.scss'
})
export class ImageCarrouselComponent {
  @Input() images: string[] = [];

  public imageIndex: number = 0;

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
}
