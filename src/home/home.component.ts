import { Component, DoCheck} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck{

  ismenurequried = false;

  constructor(private router: Router){

  }
  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl == '/login' || currenturl == '/register'){
      this.ismenurequried = false;
    }else{
      this.ismenurequried = true;
    }
  }

}
