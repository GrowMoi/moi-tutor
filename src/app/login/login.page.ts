import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController, LoadingController } from '@ionic/angular';
import { LOGIN } from '../actions';
import { NgRedux, select } from '@angular-redux/store';
import { MoiTutorState } from '../store';
import { LoginState } from '../reducers/login';
import { Observable } from 'rxjs';

@Component({
  selector: 'moi-login',
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

  @select() login$: Observable<LoginState>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private ngRedux: NgRedux<MoiTutorState>,
    public loadingController: LoadingController
  ) {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    // this.login$.subscribe((newState) => {
    // });

  }

  ngOnInit() {
  }

  async loginUser(credentials) {
    const loginUser$ = this.authService.loginUser(credentials);
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles'
    });
    await loading.present();
    loginUser$.subscribe({
      next: async (response) => {
        this.errorMessage = '';
        this.ngRedux.dispatch({type: LOGIN});
        this.navCtrl.navigateForward('/home');
        await loading.dismiss();
      },
      error: async (errMessage) => {
        this.errorMessage = errMessage;
        await loading.dismiss();
      },
    });
  }

  redirectToProducts() {
    window.open('https://growmoi.com/en/productos', '_system');
  }

}
