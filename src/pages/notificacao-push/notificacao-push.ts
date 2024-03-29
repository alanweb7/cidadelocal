import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { CodeProvider } from './../../providers/code/code';
import { FormBuilder, Validators } from '@angular/forms';
import { NetworkProvider } from '../../providers/network/network';
import { UtilService } from '../../providers/util/util.service';
@IonicPage({
  priority : 'off',
  segment  : 'NotificacaoPush/:token/:codeNumber/:campo_1/:campo_2/:texto/:load_aguarde/:msg_servidor/:btn_cancelar/:btn_enviar',
  defaultHistory:['HomePage']
})
@Component({
  selector: 'page-notificacao-push',
  templateUrl: 'notificacao-push.html',
})
export class NotificacaoPushPage {
  model            : Push;
  messageTitulo     = "";
  messageMessagem   = "";
  errorTitulo       = false;
  errorMessagem     = false;
  token            : any;
  btn_enviar;
  campo_1 ;
  campo_2;
  texto_push;
  code             : any;
  id_code: any;
  campo_obrigatorio;
  btn_cancelar;
  load_aguarde;
  msg_servidor;

  //validação de formulario
  public pushForm : any;
  lang: any;
  constructor(
              public navCtrl          : NavController,
              public  viewCtrl        : ViewController,
              public navParams        : NavParams,
              formBuilder             : FormBuilder,
              public toast            : ToastController,
              public  net             : NetworkProvider,
              private codeProvider    : CodeProvider,
              public util             : UtilService
            ) {
                //instanica do model login
              this.model = new Push();
              //instancia do formulario builder para validar os campos
              this.pushForm = formBuilder.group({
                titulo       : ['', Validators.required],
                mensagem     : ['', Validators.required],
              });
  }

  ionViewDidLoad() {
    this.token   = String;
    this.token   = "";
    this.token   = this.navParams.get('token');
    this.code   = String;
    this.code   = "";
    this.load_aguarde   = this.navParams.get('load_aguarde');
    this.msg_servidor   = this.navParams.get('msg_servidor');
    this.btn_cancelar   = this.navParams.get('btn_cancelar');
    this.btn_enviar     = this.navParams.get('btn_enviar');
    this.campo_1        = this.navParams.get('campo_1');
    this.campo_2        = this.navParams.get('campo_2');
    this.texto_push     = this.navParams.get('texto_push');
    this.campo_obrigatorio     = this.navParams.get('campo_obrigatorio');
    this.code           = this.navParams.get('codeNumber');
    this.id_code        = this.navParams.get('id_code');;
    this.lang           = this.navParams.get('lang');
    console.log(this.campo_1,this.campo_2);
  }
  createPusg(){

    let { titulo, mensagem} = this.pushForm.controls;
    if (!this.pushForm.valid) {
              if (!titulo.valid) {
                this.errorTitulo = true;
                this.messageTitulo =this.campo_obrigatorio;
              } else {
                this.messageTitulo = "";
              }
              if (!mensagem.valid) {
                this.errorMessagem = true;
                this.messageMessagem =this.campo_obrigatorio;
              } else {
                this.messageMessagem = "";
              }
    }
        else {

            this.util.showLoading(this.load_aguarde);
            console.log('Code na entrada da funcao: ', this.id_code);
            this.codeProvider.create_push(this.code,this.id_code,this.model.titulo,this.model.mensagem,this.token,this.lang)
            .subscribe(
                  (result: any) =>{
                    this.util.loading.dismissAll();
                    if(result.status == 200){
                      this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                      this.viewCtrl.dismiss();
                    } else if(result.status == 402){
                      this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                      this.navCtrl.push('LoginPage',{lang:this.lang});
                    } else if(result.status == 403){
                      console.log('code recebido normal: ',this.id_code,' - Code retornado do servidor: ',this.id_code);
                      this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                      this.navCtrl.push('MenuCodePage',{lang:this.lang, token:this.token, code:this.id_code});
                    }
                  },(error:any) => {
                    this.toast.create({ message:this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                      this.util.loading.dismissAll();
                      this.navCtrl.setRoot('HomePage');
                  });

      }
  }
  fecharAvaliacao(){

    this.viewCtrl.dismiss();
 }
}
export class Push{
  titulo  : String;
  mensagem : String;
}
