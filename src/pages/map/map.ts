import { Component} from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap,GoogleMapsEvent, LatLng, GoogleMaps, MarkerOptions, Marker, GoogleMapOptions} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  lat:any;
  long:any;
  constructor(public googleMaps: GoogleMaps,public navCtrl: NavController, public platform: Platform , public navParams:NavParams) {
}

  async  ionViewDidLoad() {
    this.lat=this.navParams.data.lat;
    this.long=this.navParams.data.long;
    await this.platform.ready();
    await this.loadMap();
  }
  loadMap(){
    this.map = GoogleMaps.create('map' , {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
}

}
