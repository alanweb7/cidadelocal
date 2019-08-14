import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalidadePage } from './localidade';

@NgModule({
  declarations: [
    LocalidadePage,
  ],
  imports: [
    IonicPageModule.forChild(LocalidadePage),
  ],
})
export class LocalidadePageModule {}
