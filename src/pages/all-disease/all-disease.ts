import { Component } from '@angular/core';
import { IonicPage, LoadingController, App } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AddDiseaseProvider } from '../../providers/add-disease/add-disease';
import { AlldiseaseDetailPage } from '../alldisease-detail/alldisease-detail';

/**
 * Generated class for the AllDiseasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-disease',
  templateUrl: 'all-disease.html',
})
export class AllDiseasePage {
  city;
  alldisease: Array<any>;
  loading = this.loadCtrl.create({
    content: "loading"
  });
  constructor(public _UsersProvider: UsersProvider,
    private loadCtrl: LoadingController
    , private diseaseProvider: AddDiseaseProvider,
    public app: App) {
    this.loading.present();
  }

  ionViewDidLoad() {
    this._UsersProvider.getUser().then((res: any) => {
      this.alldisease = [];
      this.city = res.city;
      this.diseaseProvider.getAllDisease(res.city).on("value", snapshot => {
        snapshot.forEach(snap => {
          console.log(snap.val());
          this.alldisease.push({
            age: snap.val().age,
            city: snap.val().city,
            country: snap.val().country,
            disease: snap.val().disease,
            name: snap.val().name,
            phone: snap.val().phone,
            photo: snap.val().photo,
            quantity: snap.val().quantity,
            treatment: snap.val().treatment,

          })
        })
      })
    })
    this.loading.dismiss();

  }
  detail(disease) {
    this.app.getRootNav().push(AlldiseaseDetailPage, { disease })
  }
  doRefresh(refresher) {
    this._UsersProvider.getUser().then((res: any) => {
      this.alldisease = [];
      this.city = res.city;
      this.diseaseProvider.getAllDisease(res.city).on("value", snapshot => {
        snapshot.forEach(snap => {
          console.log(snap.val());
          this.alldisease.push({
            age: snap.val().age,
            city: snap.val().city,
            country: snap.val().country,
            disease: snap.val().disease,
            name: snap.val().name,
            phone: snap.val().phone,
            photo: snap.val().photo,
            quantity: snap.val().quantity,
            treatment: snap.val().treatment,

          })
        })
      })
    })


    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
