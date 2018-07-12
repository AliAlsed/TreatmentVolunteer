import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';

/**
 * Generated class for the AlldiseaseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-alldisease-detail',
  templateUrl: 'alldisease-detail.html',
})
export class AlldiseaseDetailPage {
  item = {
    image: '',
    phone: '',
    age: '',
    city: '',
    country: '',
    disease: '',
    lat: 0,
    long: 0,
    name: '',
    quantity: '',
    treatment: '',
  }
  constructor(public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item.image = this.navParams.data.disease.photo;
    this.item.age = this.navParams.data.disease.age;
    this.item.city = this.navParams.data.disease.city;
    this.item.country = this.navParams.data.disease.country;
    this.item.disease = this.navParams.data.disease.disease;
    this.item.name = this.navParams.data.disease.name;
    this.item.phone = this.navParams.data.disease.phone;
    this.item.quantity = this.navParams.data.disease.quantity;
    this.item.treatment = this.navParams.data.disease.treatment;
  }

}
