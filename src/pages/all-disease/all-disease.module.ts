import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDiseasePage } from './all-disease';

@NgModule({
  declarations: [
    AllDiseasePage,
  ],
  imports: [
    IonicPageModule.forChild(AllDiseasePage),
  ],
})
export class AllDiseasePageModule {}
