import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notImage',
})
export class NotImagePipe implements PipeTransform {
  transform(images: any[]): string {
    if (images.length > 0) {
      return images[0].url;
    }

    return 'assets/img/noimage.png';
  }
}
