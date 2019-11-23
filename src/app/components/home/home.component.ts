import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('myVideo', { static: true }) myVideo: ElementRef;
  constructor(private router: Router) { }

  clicked: boolean = false;

  ngOnInit() {
  }

  playVideo() {
    this.clicked = true;
    this.myVideo.nativeElement.play();
    setTimeout( () => { this.router.navigate(['dashboard']); }, 4500 );

    
  }
}
