import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TreatmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-treatment-detail',
  templateUrl: 'treatment-detail.html',
})
export class TreatmentDetailPage {
  item={
    image:'',
    country:'',
    quantity:'',
    treatment:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item.image=this.navParams.data.treatment.image;
    this.item.country=this.navParams.data.treatment.country;
    this.item.quantity=this.navParams.data.treatment.quantity;
    this.item.treatment=this.navParams.data.treatment.treatment;
    console.log(this.navParams.get('treatment'));
    console.log(this.navParams.data)
  }

}
