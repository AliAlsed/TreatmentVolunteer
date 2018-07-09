import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  user={
    key:firebase.auth().currentUser.uid,
    name:'',
    gender:'',
    age:'',
    city:'',
    email:firebase.auth().currentUser.email,
    disease:''
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams ,
    private fb:FirebaseProvider,
   private store:Storage) {
  }

  ionViewDidLoad() {
    //image
  }
  add(){
   console.log(this.user);
   this.store.set('myPerson',this.user);

   this.fb.adduser(this.user).then((userinfo)=>{
     this.navCtrl.push('TabsPage')
   })
  }

}
