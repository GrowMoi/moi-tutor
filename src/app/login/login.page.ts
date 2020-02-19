import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validationMessages = {
    login: [
      {type: 'required', message: 'Este campo es requerido'}
    ],
    password: [
      {type: 'required', message: 'Este campo es requerido'}
    ]
  };

  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then((res) => {
      this.errorMessage = '';
      this.navCtrl.navigateForward('/home');
    });
  }

  redirectToProducts() {
    window.open('https://growmoi.com/en/productos', '_system');
  }

}
