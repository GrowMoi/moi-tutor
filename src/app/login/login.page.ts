import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { LOGIN } from '../actions';
import { NgRedux } from '@angular-redux/store';
import { MoiTutorState } from '../store';

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
    private navCtrl: NavController,
    private ngRedux: NgRedux<MoiTutorState>
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
    const loginUser$ = this.authService.loginUser(credentials);

    loginUser$.subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.ngRedux.dispatch({type: LOGIN});
        this.navCtrl.navigateForward('/home');
      },
      error: (errMessage) => {
        this.errorMessage = errMessage;
      },
    });
  }

  redirectToProducts() {
    window.open('https://growmoi.com/en/productos', '_system');
  }

}
