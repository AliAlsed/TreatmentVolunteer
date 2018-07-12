import { FirebaseProvider } from '../../providers/firebase/firebase';
import { credientials } from '../../model/credeintials';
import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Storage } from '@ionic/storage';
import { ResetPasswordPage } from '../reset-password/reset-password';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credeintials = {} as credientials;


  constructor(private fb: FirebaseProvider,
    private gu: UsersProvider,
    public loadingCtrl: LoadingController,
    public nav: NavController
    , private store: Storage) { }

  onSignin() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });

    this.fb.signin(this.credeintials).then((res) => {
      loader.present();
      console.log(res);
      console.log('run')
      this.gu.getUser().then((res) => {
        let user = res;
        if (user == null) {
          loader.dismiss();
          this.nav.push('UserInfoPage')
        } else {
          this.store.set('myPerson', user);
          loader.dismiss()
          this.nav.push('TabsPage');

        }
      })
    })
  }
  reset() {
    this.nav.push(ResetPasswordPage);
  }

}
