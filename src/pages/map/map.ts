import { Component} from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap,GoogleMapsEvent, LatLng, GoogleMaps, MarkerOptions, Marker, GoogleMapOptions} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;
  lat:any;
  long:any;
  constructor(public googleMaps: GoogleMaps,public navCtrl: NavController, public platform: Platform , public navParams:NavParams) {
    platform.ready().then(() => {
        this.loadMap();
    });
}

   ionViewDidLoad() {}
  loadMap(){
    
	let locationOptions = {timeout: 20000, enableHighAccuracy: true};

	navigator.geolocation.getCurrentPosition(

		(position) => {

			let options = {
			  center: new google.maps.LatLng(this.navParams.get('lat'), this.navParams.get('long')),
			  zoom: 16,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			}

      this.map = new google.maps.Map(document.getElementById("map"), options);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
      let content = `<h3>${this.navParams.get('name')}</h5>`;
      this.addInfoWindow(marker, content);
		},

		(error) => {
			console.log(error);
		}, locationOptions
  );



}
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
