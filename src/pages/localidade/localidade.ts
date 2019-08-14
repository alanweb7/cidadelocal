import { UtilService } from './../../providers/util/util.service';
import { CodeProvider } from './../../providers/code/code';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LocalidadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-localidade',
  templateUrl: 'localidade.html',
})
export class LocalidadePage {
  detalhesLocal:any = {}
  public cities;
  public categories;
  public estados;
  public forCities;
  public id_ads;
  public token;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public codeProvider: CodeProvider,
    public util: UtilService

    ) {

      this.id_ads = this.navParams.get('id_ads');
      this.token = this.navParams.get('token');
      this.getinfoManager();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalidadePage');
  }
  locationData() {
    // var data_EXEMPLO = {
    //   id: id_code,
    //   bloco :1,
    //   token:token,
    //   code: name_code,
    //   titulo:titulo,
    //   descricao:descricao,
    //   link:link,
    //   t_conteudo:isLink,
    //   password   :password,
    //   isprivate  :isprivate,
    //   lang              :lang

    // };

    let sendData = {
      token: this.token,
      id: this.id_ads,
      bloco: 1,
      id_ads: this.id_ads,
      categoria:this.detalhesLocal.categoria,
      estado:this.detalhesLocal.estado,
      cidade:this.detalhesLocal.cidade,
      bairro:this.detalhesLocal.bairro,
      endereco:this.detalhesLocal.endereco,
    }
    let data = {
      url: 'https://cidadelocal.com.br/api19/wp-json/admin/v1/users/codes',
      token: this.token,
      method: 'post',
      data: sendData
    }

    console.log(this.detalhesLocal);

    this.codeProvider.setMultiData(data)
    .then((result) =>{

      console.log('Response do servidor em locationData::', result);

    })
    .catch(error =>{ return error;});
  }

  getinfoManager(){
    this.util.showLoading('Carregando Cidades...');
    let mode = 'cats>estadosCidades:null:estado=PA>version';
    this.codeProvider.getInfo(mode).then( async (result)=>{

      console.log('Retorno do getInfo:: ', result);
      this.cities = result.data.estadosCidades.cidades;
      this.categories = result.data.cats.categories;

      this.forCities = [];
      let ic = 1;
      let citList:any = [];
      await this.cities.forEach(function (value) {

        let myCity:any = {};
        myCity.id = ic++;
        myCity.name = value;
        citList.push(myCity);

      });
      this.cities = await citList;
      console.log('Cidades opens:: ', this.cities);
      this.util.loading.dismissAll();

    }).catch(error => {
      this.util.loading.dismissAll();
      console.log(error);
    });

  }

}
