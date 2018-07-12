import { Component} from '@angular/core';
import { IonicPage, LoadingController, App, ModalController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';
import { UpdateProfilePage } from '../update-profile/update-profile';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage{
  User={
    Name:'',
    age:'',
    city:'',
    disease:''
  }
  constructor(private fr:FirebaseProvider,
    public UserProvider:UsersProvider,
    private loadingCtrl:LoadingController,
    private app:App,
     private modal:ModalController,
     public storage:Storage) {
    this.loader.present();
    }
    loader = this.loadingCtrl.create({
      content: 'Please wait'
    });

  ionViewDidLoad() {
    this.loader.present();
        this.UserProvider.getUser().then((res:any)=>{
          this.User.Name=res.name;
          this.User.age=res.age;
          this.User.city=res.city;
          this.User.disease=res.disease;
        }).then(()=>{
          this.loader.dismiss();
        })
  }

  update(){
    let mdl=this.modal.create(UpdateProfilePage,{user:this.User});
    mdl.present();
  }

  logout(){
    this.fr.logoutUser();
    this.app.getRootNav().setRoot(HomePage)
  }
  doRefresh(refresher) {
    this.UserProvider.getUser().then((res:any)=>{
      console.log(res)
      this.User.Name=res.name;
      this.User.age=res.age;
      this.User.city=res.city;
      this.User.disease=res.disease;
    })

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
