// import { Pipe, PipeTransform } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { log as parentLog } from 'app/core/log';

// const log = parentLog.subLog('pipe-cttranslate');

// @Pipe({
//   name: 'attributeTranslate'
// })
// export class AttributeTranslate implements PipeTransform {
//   constructor(private translate: TranslateService) {
//   }

//   transform(list: any[], attribute: string): any {
//     if (list && attribute) {
//       list.forEach(ct => {
//         ct[attribute] = this.translate.instant(ct[attribute]);
//       });
//     }
//     return list;
//   }

// }
