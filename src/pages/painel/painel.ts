import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the PainelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-painel',
  templateUrl: 'painel.html',
})
export class PainelPage {
  private admForm:FormGroup;
  public token;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public http: HTTP,
    ) {
      this.admForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: [''],
      });
      this.token = this.navParams.get('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PainelPage');
  }

  setNewUser(){
    console.log('Meus dados: ', this.admForm);

    let url = 'https://cidadelocal.com.br/api19/wp-json/admin/v1/users/painel/';
    let header = {

      Auth: 'Bearer '+this.token,

    }
    this.http.post(url, this.admForm, header).then((data)=>{

      console.log(data.data);

    }).catch((error)=>{

      console.log('Entrou  no cath: ',error);

    });
  }

}
