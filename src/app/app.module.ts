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
import { AddDiseaseProvider } from '../providers/add-disease/add-disease';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { TreatmentInfoPage } from '../pages/treatment-info/treatment-info';
import { TreatmentDetailPage } from '../pages/treatment-detail/treatment-detail';
import { AlldiseaseDetailPage } from '../pages/alldisease-detail/alldisease-detail';
import { LoginPage } from '../pages/login/login';
import { FormsModule } from '@angular/forms';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TreatmentInfoPage,
    TreatmentDetailPage,
    AlldiseaseDetailPage,
    LoginPage,
    ResetPasswordPage,
    UpdateProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fireconfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TreatmentInfoPage,
    UpdateProfilePage,
    TreatmentDetailPage,
    AlldiseaseDetailPage,
    ResetPasswordPage,
    UpdateProfilePage
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
    AddDiseaseProvider,

  ]
})
export class AppModule {}
