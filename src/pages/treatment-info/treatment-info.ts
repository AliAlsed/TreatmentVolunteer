import { Component, OnInit, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { disease } from '../../model/disease';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AddDiseaseProvider } from '../../providers/add-disease/add-disease';
import { UUID } from 'angular2-uuid';
import * as firebase from 'firebase';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the TreatmentInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-treatment-info',
  templateUrl: 'treatment-info.html',
})
export class TreatmentInfoPage implements OnInit {
  userPhoto;
  currentPhoto;
  imgSource;
  firedata = firebase.database().ref('/images');
  disease = {} as disease;
  constructor(
    public _UsersProvider: UsersProvider,
    public afireauth: AngularFireAuth,
    public _AddDiseaseProvider: AddDiseaseProvider,
    public zone: NgZone,
    private geolocation: Geolocation,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public viewCtrl: ViewController) { }
  uuid = UUID.UUID();
  data: any;
  lat: number;
  long: number;
  loader = this.loadingCtrl.create({
    content: 'Please wait'
  });

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log(this.lat + " : " + this.long);
      })

    })

  }
  chooseimage() {
    const galleryOptions: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(galleryOptions).then((imageData) => {
      this.loader.present();
      this.userPhoto = this.dataUrltoBlob('data:image/jpeg;base64,' + imageData);
      this.upload();

    }, (error) => {
      // upload failed
      let alert = this.alertCtrl.create({
        title: 'imgSource',
        subTitle: `${error}`,
        buttons: ['Dismiss']
      });
    })
  }
  dataUrltoBlob(url) {
    let binary = atob(url.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }
  upload() {
    if (this.userPhoto) {
      let userId = this.afireauth.auth.currentUser.uid;
      this.loader.dismiss();
      firebase.storage().ref().child(`/images/${this.uuid}`).put(this.userPhoto).then((snapshot) => {
        this.currentPhoto = snapshot.downloadURL;
        this.getMyUrl();
        this.loader.dismiss();
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: 'imgSource',
          subTitle: `${err}`,
          buttons: ['Dismiss']
        });
        this.loader.dismiss();

      });
    }
  }


  getMyUrl() {
    let userId = this.afireauth.auth.currentUser.uid;
    firebase.storage().ref().child(`/images/${this.uuid}`).getDownloadURL().then((url) => {
      this.imgSource = url;
      let alert = this.alertCtrl.create({
        title: 'imgSource',
        subTitle: `${url}`,
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }
  ionViewDidLoad() {

    this._UsersProvider.getUser().then((res: any) => {
      this.disease.age = res.age;
      this.disease.city = res.city;
      this.disease.Id = this.uuid;
      this.disease.name = res.Name;
      this.disease.disease = res.disease;
    })



  }

  add(f) {

    this.disease.country = f.value.country;
    this.disease.phone = f.value.phone;
    this.disease.treatment = f.value.treatment;
    this.disease.lat = this.lat;
    this.disease.long = this.long;
    this.disease.quantity = f.value.quantity;
    this.disease.photo = this.imgSource;

    console.log(this.disease);

    this._AddDiseaseProvider.addDisease(this.disease).then((res) => {
      this.viewCtrl.dismiss();
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: 'output',
        subTitle: `${error}`,
        buttons: ['Dismiss']
      });
      alert.present();
    });

  }

}
