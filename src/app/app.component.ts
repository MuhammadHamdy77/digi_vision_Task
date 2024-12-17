import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { RippleModule } from 'primeng/ripple';
import { HelperService } from './core/services/helper.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,RouterOutlet, LoadingScreenComponent, RippleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'digi_vision_Task ';
  loader: any; 

  constructor(
    private _helperService: HelperService,
  ) {}
  
  ngOnInit(): void {
    this._helperService.loader
    .subscribe((res) => {
      this.loader = res;
    });
  }

}
