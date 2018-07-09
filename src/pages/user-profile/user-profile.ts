import { Component, NgZone, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { UsersProvider } from '../../providers/users/users';
import { User } from '../../model/users';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage implements OnInit{
  Name;
  age;
  city
  disease;
  constructor(private fr:FirebaseProvider,private para:NavParams,public navCtrl: NavController,private storage:Storage,public UserProvider:UsersProvider,public zone:NgZone,private loadingCtrl:LoadingController) {
    this.loader.present();
    }
    loader = this.loadingCtrl.create({
      content: 'Please wait'
    });

  ionViewDidLoad() {
        this.UserProvider.getUser().then((res:any)=>{
          this.Name=res.Name;
          this.age=res.age;
          this.city=res.city;
          this.disease=res.disease;
        })
    this.loader.dismiss();
  }
  ngOnInit() {


  }

  logout(){
    this.fr.logoutUser();
  }

}
