import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  email
  password ;

  constructor(private route: Router, private formbuilder: FormBuilder, private auth:AuthentificationService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

get f() {

  return this.loginForm.controls;
}

login() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }
  
  this.auth.loginUser(this.loginForm.value).subscribe((res:any) => {
    if (res !== null) {
       localStorage.setItem("state", "0")
      
      //localStorage.setItem('token', JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res)).data.token)));
       localStorage.setItem("secretkey", JSON.stringify(res.data.accesstoken));
       
       localStorage.setItem("currentuser", JSON.stringify(res.data.user)); 
       this.route.navigate(['/home'])
      Swal.fire({
        title: 'success',
        icon: 'success',
        
        text: 'Authentification Successufly' ,
        footer: '<a href>Why do I have this issue?</a>'
      })
      console.log(res)
      // const jwt = res['access_token']
       // var decoded :any= jwt_decode(jwt); 
      //   console.log('decoded',decoded)
      //  if (decoded['sub']=='admin'){
      //       console.log("admin")
      //       console.log("roles",decoded['roles'])   
       }
      //  else { 
      //     if(decoded['sub']=='candidat')
      //         {
      //          console.log("candiat")                    
      //         }
      //      }
    // }
    err=> {
      {console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Authentification Failed',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    }
  }
   
  )
}
   
}



