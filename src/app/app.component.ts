import { Component, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'learnangular15';

  ismenurequried = false;
  isadminuser = false;
  constructor(private router: Router, private service: AuthService){

  }
  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl == '/login' || currenturl == '/register'){
      this.ismenurequried = false;
    }else{
      this.ismenurequried = true;
    }
    if(this.service.GetUserrole() === 'admin'){
      this.isadminuser = true;
    }else{
      this.isadminuser = false;
    }
  }
}
