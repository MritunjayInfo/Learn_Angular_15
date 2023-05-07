import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userdata: any;

  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {

  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    this.service.Getbycode(this.loginform.value.username).subscribe(res => {
      this.userdata = res;
      console.log(this.userdata);
      if (this.userdata.password === this.loginform.value.password) {
        if (this.userdata.isactive) {
          sessionStorage.setItem('username', this.userdata.id)
          sessionStorage.setItem('userrole', this.userdata.role)
          this.router.navigate(['home']);

        } else {
          this.toastr.error('Please contact admin', 'In Active User')
        }
      } else {
        this.toastr.error('Invalid credential');
      }
    });
  }

}
