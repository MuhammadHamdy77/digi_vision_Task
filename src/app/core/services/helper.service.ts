import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  loader = new BehaviorSubject<any>(null);
  innerLoader = new BehaviorSubject<any>(null);
  countNotification = new BehaviorSubject<any>(null);
}
