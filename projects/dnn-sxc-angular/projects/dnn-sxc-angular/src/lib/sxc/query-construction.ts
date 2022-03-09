import { HttpParams } from '@angular/common/http';

export interface QueryConstruction {
  name: string;
  params?: HttpParams;
  streams?: string | string[];
}
