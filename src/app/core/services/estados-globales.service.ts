import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EstadosGlobalesService {

  private objSpinner = new BehaviorSubject<boolean>(false);
  public customSpinner = this.objSpinner.asObservable();

  public setSpinner(value: boolean) {
    this.objSpinner.next(value);
  } 
}
