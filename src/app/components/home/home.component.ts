import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myVideo', { static: true }) myVideo: ElementRef;
  constructor(private router: Router, private _NavBarService: NavbarService) { }

  clicked: boolean = false;

  ngOnInit() {
    this._NavBarService.hide();
  }

  playVideo() {
    this.clicked = true;
    this.myVideo.nativeElement.play();
    setTimeout( () => { this.router.navigate(['dashboard']); }, 4500 );

    
  }
}
