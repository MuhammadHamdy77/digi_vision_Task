import { Component, NgZone, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HelperService } from '../../../core/services/helper.service';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent implements OnInit {

  animation! : any;

  _unsubscribeAll = new Subject();

  loader: any;
  
  constructor(
    private ngZone : NgZone,
    private _helperService: HelperService
  ) { }

  ngOnInit(): void {
    this._helperService.loader
    .subscribe(res=>{
      this.loader = res;
    })
  }
}