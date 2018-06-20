import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {
  public translated: any = null;

  constructor(private translateSer: TranslateService) { }

  transform(value: any, src: any, target:any) {
    // read values
    console.log(value + " " + src + " " + target);

    return this.translateSer.translate(value, src, target)
      .pipe(map(x => { return x['data'].translations[0].translatedText; }));
  }
}
