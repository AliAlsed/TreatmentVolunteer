import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { fireconfig } from './firebase.config';
import { UsersProvider } from '../providers/users/users';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AddDiseaseProvider } from '../providers/add-disease/add-disease';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { TreatmentInfoPage } from '../pages/treatment-info/treatment-info';
import { TreatmentDetailPage } from '../pages/treatment-detail/treatment-detail';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TreatmentInfoPage,
    TreatmentDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fireconfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TreatmentInfoPage,
    TreatmentDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    Camera,
    Storage,
    Geolocation,
    AddDiseaseProvider,

  ]
})
export class AppModule {}
