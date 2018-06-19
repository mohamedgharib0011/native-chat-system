import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../Services/translation/translate.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'translationPipe'
})

export class TranslationPipe implements PipeTransform {
  public translated: any = null;

  constructor(private translateSer: TranslateService) { }

  transform(value: string, src: string, target: string) {
    // read values
    console.log(value + " " + src + " " + target);

    return this.translateSer.translate(value, src, target)
      .pipe(map(x => { return x.data.translations[0].translatedText; }));
  }
}
