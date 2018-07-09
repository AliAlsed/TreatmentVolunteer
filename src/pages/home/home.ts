import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
getInfo = {
  email: '',
  userPhoto:''
}
  constructor(public navCtrl: NavController,public afAuth: AngularFireAuth) {

  }
  signup(){
    this.navCtrl.push('RegisterPage')
  }
  login(){
    this.navCtrl.push('LoginPage')
  }

}
