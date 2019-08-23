import { AppVersion } from '@ionic-native/app-version';
import { HTTP } from '@ionic-native/http';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../../providers/network/network';
import { Component, Version } from '@angular/core';
import { NavController, IonicPage, NavParams, Platform, Loading, LoadingController, Events, AlertController, ModalController, ToastController } from 'ionic-angular';
//Import Native
import { OneSignal } from '@ionic-native/onesignal';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
//import Provider
import { CodeProvider } from '../../providers/code/code';
import { UsuarioService } from '../../providers/movie/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Keyboard } from '@ionic-native/keyboard';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { SqliteHelperService } from '../../providers/sqlite-helper/sqlite-helper.service';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilService } from '../../providers/util/util.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

// importando arquivos da session
//importação do arquivo criado a cima
import { Session, Multidata } from '../../providers/session/session';

//importação do arquivo usuario criado a cima
import { User, mData } from '../../models/usuario-model';

@IonicPage({
  priority : 'high'
})@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
// novas funcoes da home

user: User;

private categories: any;
private atualVCat: number;
private vCatAPI: number;
private show_part: any;
private topCategories: any;
private currentStyles: any;
private canSave: any;
private hasError: any;
private showed_cat: boolean;
private showed_result: boolean;
private hiddeButton: boolean = false;

public todo:any = {};
public ads:any;

private cities: any;
private baseUrl: string = 'https://cidadelocal.com.br/api19';

  public signupform: FormGroup;
  codeNumber         : any;
  endLat             : any;
  endLong            : any;
  myfone             : any;
  movies             : Usuario[] = [];
  token              : any;
  id                 : any ;
  id_serv            : Number;
  footerIsHidden     : Boolean = true;
  public myGlobalVar : string;
  public title : string;
  public description : string;
  public language : string ="pt";
  button:String ="";
  pesquisa:String="";
  adquira:String="";
  data = {
    id_serv     :Number,
    name        :String,
    sobrenome   :String,
    email       :String,
    photo       :String,
    logado      :String,
    token       :String,
    usuario     :String,
    lang        :String,
    cnpj        :String,
    tp_pessoa   :String

}
trans={
  login 		: String,
  home      : String,
  favoritos : String,
  pesquisa  : String,
  codes     : String,
  sair      : String,
  page_pesquisa :String,
  msg_servidor:String,
  load_aguarde:String,
  nome:String,
  sobrenome:String,
    email:String,
    empresa:String,
    segmento:String,
    cep:String,
    cidade:String,
    estado:String,
    page:String,
    btn_salvar:String,
    page_login: String,
    load_enviando: String,
    campo_obrigatorio: String,
    frase: String,
    senha: String,
    esqueceu: String,
    ou: String,
    conta: String,
    page_senha: String,
    texto_1: String,
    texto_2: String,
    usuario:String,
    page_conta:String
}
  campo;
  load_aguarde: any;
  msg_erro: any;
  selecione: any;
  btn_cancelar: any;
  btn_continuar: any;
  code_existe: any;
  btn_ircode: any;
  btn_fechar: any;
  page_pesquisa: any;
  page_consulta:any;
  msg_servidor: any;
  isPT:boolean = false;
  isDE:boolean = false;
  isEN:boolean = false;
  isES:boolean = false;
  isFR:boolean = false;
  isIT:boolean = false;
  page_login: any;
  load_enviando: any;
  campo_obrigatorio: any;
  frase: any;
  page: any;
  senha: any;
  esqueceu: any;
  ou: any;
  conta: any;
  page_senha: any;
  texto_1: any;
  texto_2: any;
  email ;
  texto: any;
  msg_code: any;
  statusConn:any;
  home_Message;

  constructor(
    public loadingCtrl     : LoadingController,
    public navCtrl         : NavController,
    public alertCtrl       : AlertController,

    public navParams       : NavParams,
    private global         : CodeProvider,
    private geoProv        : GeolocationProvider,
    private platform       : Platform,
    private events         : Events,
    private socialSharing  : SocialSharing,
    private browserTab     : BrowserTab,
    private oneSignal      : OneSignal,

    public  net            : NetworkProvider,
    public network : Network,
    private deeplinks      : Deeplinks,
    private usuario        : UsuarioService,
    public session: Session,
    public multidata: Multidata,
    private cli_Provider    : ClienteProvider ,
    private keyboard       : Keyboard,
    public modalCtrl       : ModalController,
    public sqliteHelperService: SqliteHelperService,
    private translate 	  : TranslateService,
    private formBuilder: FormBuilder,
    public util           : UtilService,
    public toast          : ToastController,
    public networkProvider : NetworkProvider,
    public http: HTTP,
    private appVersion: AppVersion

  ) {

    // novas funcoes da home
    this.verCat();
    this.getVersion();

    this.cities = [
      {
        id: 10,
        name: 'Ananindeua'
      },
      {
        id: 19,
        name: 'Belém'
      }
    ];

    // this.signupform = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   codeNumber: [''],
    // });
    let error = this.navParams.get('error');
    console.log('erro recebido na HOME:: ', error);
    if( error && error.status == -3){

      this.netFail();

    }
    this.signupform = new FormGroup({

      codeNumber: new FormControl('', [Validators.required, Validators.minLength(1)]),

    });

    if (this.platform.is('ios')){
      this.sqliteHelperService.getDb()
      .then((movies:any) => {
          //alert("alert deu certo");
      }).catch((erro)=>{
         // alert("deu errado"+erro);
      });
     }

    }

    ngOnInit() {

    }
    ionViewDidLoad(){

     // this._initialiseTranslation();

        //CHAMDA DO BANCO DE DADOS
                  this.usuario.getAll()
                      .then((movies:any) => {
                        console.log(movies);
                        if(movies.length == 1){
                             this.data.name       = movies[0].name;
                              this.data.sobrenome = movies[0].sobrenome;
                              this.data.email     = movies[0].email;
                              this.data.token     = movies[0].token;
                              this.token          = movies[0].token;
                              this.data.logado    = movies[0].logado;
                              this.data.id_serv   = movies[0].id_serv;
                              this.data.photo     = movies[0].photo;
                              this.data.usuario   = movies[0].usuario;
                              this.data.lang      = movies[0].cpf;
                              this.language       = movies[0].cpf;
                              this.id_serv        = movies[0].id_serv;
                              this.data.cnpj      = movies[0].cnpj;
                              this.data.tp_pessoa = movies[0].tp_pessoa;

                              if(this.language ==  "" || this.language == undefined || this.language == null){
                                    this.language = "pt";
                              }
                              this.update_cupom();
                              this.trogle_idiome_onesignal();
                            //  this.events.publish('trans',this.language);
                              this.events.publish('dados',this.data);

                         }else{
                          this.language= "pt";
                          console.log("minha lang",this.language);

                           console.log("entrei no else");

                            /* this.usuario.update_lang(this.language,this.id_serv)
                           .then((data: any) => {
                                 console.log(data);

                           });  */
                             this.isPT  =  true;
                             this.trogle_idiome_onesignal();
                         }
                        // this.language= "pt";
                        // this.isPT  =  true;
                         this.pushGeoinfo();
                         this.trogle_idiome(this.language);
                         this._translateLanguage();
                         this.oneSignalApp();

          }).catch((error)=>{
                alert("sqlite Erro "+error);
                this.language= "pt";
                this.isPT  =  true;
                this.pushGeoinfo();
                this.trogle_idiome(this.language);
                this._translateLanguage();
                this.oneSignalApp();
          });


      this.keyboard.onKeyboardShow().subscribe(() => {
          this.footerIsHidden= false;
      });
      this.keyboard.onKeyboardHide().subscribe(() => {
          this.footerIsHidden= true;
      });


    }
    // novas funcoes da home page
    getVersion(){

      let token = '39<(G+xI16HyoK8$IKh>xID.Db]<zX6T:3CEp';
      let url = this.baseUrl+"/wp-json/admin/v1/conn/getinfo";
      let data = {
        id: '1',
        mode: 'version',
      };
      let header = {Mytoken: 'Bearer '+ token};

      this.http.get(url, data, header)
      .then(data => {

          // console.log(data.status);
          // console.log('Retorno das versoes do app::>>',data.data); // data received by server
          // console.log(data.headers);

          let response = JSON.parse(data.data);
          this.vCatAPI = response.data.version.cat_version;

          if(this.vCatAPI != this.atualVCat){

            this.getAllCat();

          }

          let versionToApi = response.data.version.version;

          if(versionToApi){

            this.appVersion.getVersionNumber().then((Version)=>{
              console.log(Version);
              if(versionToApi > Version){
                console.log('A versão da loja é maior');
              }
              if(versionToApi < Version){
                console.log('A versão da loja é menor');
              }
              if(versionToApi !== Version){

                this.updateApp();

              }
            });

          }


      }).catch(error =>{
        console.log('Entrou no cath: ', error);
      });

    }
    getAllCat(){
      /**
       * Sistema de retorno de informações diversas
       * Param: mode (exemplo: getCats)
       * Options: any info (ex: all, name, etc...)
       */
      this.util.showLoading('Carregando categorias...');
        let token = '39<(G+xI16HyoK8$IKh>xID.Db]<zX6T:3CEp';
          let url = this.baseUrl+"/wp-json/admin/v1/conn/getinfo";
          let data = {
            id: '1',
            mode: 'cats>citys>version',
          };
          let header = {Mytoken: 'Bearer '+ token};

        this.http.get(url, data, header)
        .then(data => {

          // console.log(data.status);
          // console.log(data.data); // data received by server
          // console.log(data.headers);

          this.util.loading.dismissAll();
          let response = JSON.parse(data.data);
          this.showed_cat = true;

          console.log('Response: ',response);
          this.categories = response.data.cats.categories;
          this.show_part = response.data.cats.top_categories;
          this.topCategories = response.data.cats.top_categories;
          this.cities = response.data.citys.cidades;
          //verificar a versao do app

          this.cities = response.data.citys.cidades;

          this.setCategories();

          console.log('Lista de Categorias: ',this.categories);
          console.log('Lista de Cidades: ',this.cities);

        })
        .catch(error => {

          this.util.loading.dismissAll();
          console.log('Acionou o catch!');
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
      }

      openCategorie(id){
        console.log('ID da categoria buscada: ', id);
        this.todo.cat = id;
        this.search_ads();
      }
      pushDetailPage(){
        alert('Ir para o Anunciante');
      }

    search_ads(){
      console.log('saerch ads ID da categoria recebida: ', this.todo.cat);

      this.keyboard.hide();
      this.util.showLoading('Aguarde...');
      console.log('Informações do form (todo): ',this.todo);
      let term = this.todo.term;
      let cat = this.todo.cat;
      let city = this.todo.cat;
      // if(this.todo.term !== ''){ term = this.todo.term; }else{}
      // if(this.todo.cat !== ''){ cat = this.todo.cat;}
      // if(this.todo.city !== ''){ city = this.todo.city;}

      let token = '39<(G+xI16HyoK8$IKh>xID.Db]<zX6T:3CEp';
      let url = 'https://cidadelocal.com.br/api19/wp-json/code/search/?search=search&code_number='+term+'&cat='+ cat +'&city=' + city;
          let data = {
            id: '1',
            mode: 'cats>citys',
          };
          let header = {Mytoken: 'Bearer '+ token};
          this.http.get(url, data, header)
        .then(data => {

          // console.log(data.status);
          // console.log(data.data); // data received by server
          // console.log(data.headers);

          this.util.loading.dismissAll();
          this.ads = JSON.parse(data.data);
          this.showed_result = true;


          console.log('Lista de Anunciantes: ',this.ads);

        })
        .catch(error => {

          console.log('Acionou o catch!');
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
    }

    openAds(ads){

      this.navCtrl.push('DetalheCodePage', {code:ads});

    }
    update_cupom(){

        this.cli_Provider.getinfConta(this.token)
        .subscribe((result: any) =>{

          if(result.status == 200){
            this.usuario.update_cupom("",result.cupom_id,result.user_id)
            .then((data: any) => {
                  console.log("atualizei o cupom",data);

            });
          }
        });


    }
  trogle_idiome(id){
    console.log("lang",id);
      if(id=='pt'){
        this.isDE = false;
        this.isPT = true;
        this.isES = false;
        this.isFR = false;
        this.isEN = false;
        this.isIT = false;
      }else if(id=='de'){
          this.isDE = true;
          this.isPT = false;
          this.isES = false;
          this.isFR = false;
          this.isEN = false;
          this.isIT = false;
        }else if(id=='en'){
          this.isDE = false;
          this.isPT = false;
          this.isES = false;
          this.isFR = false;
          this.isEN = true;
          this.isIT = false;
      }else if(id=='it'){
        this.isDE = false;
        this.isPT = false;
        this.isES = false;
        this.isFR = false;
        this.isEN = false;
        this.isIT = true;
      }else if(id=='fr'){
        this.isDE = false;
        this.isPT = false;
        this.isES = false;
        this.isFR = true;
        this.isEN = false;
        this.isIT = false;
      }else if(id=='es'){
        this.isDE = false;
        this.isPT = false;
        this.isES = true;
        this.isFR = false;
        this.isEN = false;
        this.isIT = false;
      }else{
        this.isDE = false;
        this.isPT = true;
        this.isES = false;
        this.isFR = false;
        this.isEN = false;
        this.isIT = false;
      }
  }
  pushPage(){
    let latitude = this.endLat;
        let longitude = this.endLong;
        console.log('home codes com gps');
        this.navCtrl.push('DetalheCodePage', {liberado :false,origem:1,token:this.token,lang:this.language,
            code: this.codeNumber,
            latitude: latitude, longitude: longitude,
            telephone: this.global.myGlobalVar
        });


    // this.util.showLoading('Aguarde...');
    // this.networkProvider.verifyConn().then((res)=>{
    //   this.util.loading.dismissAll();
    //   this.statusConn = res.status;
    //   console.log('Return :::',res.status);
    //   if(this.statusConn === -3){
    //     this.netFail();
    //   }else{
    //     let latitude = this.endLat;
    //     let longitude = this.endLong;
    //     console.log('home codes com gps');
    //     this.navCtrl.push('DetalheCodePage', {liberado :false,origem:1,token:this.token,lang:this.language,
    //         code: this.codeNumber,
    //         latitude: latitude, longitude: longitude,
    //         telephone: this.global.myGlobalVar
    //     });

    //   }
    // });
  }
pushGeoinfo(){
  this.platform.ready().then(() => {
    this.geoProv.getGeolocation().then((resp:String[])=>{
      console.log('home',resp);

        this.endLat = resp["latitude"];
        this.endLong = resp["longitude"];
        console.log('home',this.endLat,this.endLong );
     });
  });
}
pushPageCode(){
  this.navCtrl.push('DetalheCodePage', {liberado :false,origem:1,token:this.token,lang:this.language,  code: 'CL',
  latitude: this.endLat, longitude: this.endLong,
  telephone: this.global.myGlobalVar
  });
}

pushPagePesquisa(){

  let myModal =this.modalCtrl.create('CodePesquisaPage',{texto:this.texto,campo:this.campo,page_pesquisa:this.page_consulta,msg_servidor:this.msg_servidor,load_aguarde:this.load_aguarde,token:this.token,lang:this.language});
  myModal.present();
}
showCheckbox() {

  let alert = this.alertCtrl.create();
  alert.setTitle(this.selecione);
 //ingles, espanhol, italiano, frances e alemão
  alert.addInput({
    type: 'radio',
    label:"Português",
    value: "pt",
    checked: this.isPT
  });
  alert.addInput({
    type: 'radio',
    label:"Inglês",
    value: "en",
    checked: this.isEN
  });
  alert.addInput({
    type: 'radio',
    label:"Espanhol",
    value: "es",
    checked: this.isES
  });
  alert.addInput({
    type: 'radio',
    label:"Italiano",
    value: "it",
    checked: this.isIT
  });
  alert.addInput({
    type: 'radio',
    label:"Frânces",
    value: "fr",
    checked: this.isFR
  });
  alert.addInput({
    type: 'radio',
    label:"Alemão",
    value: "de",
    checked: this.isDE
  });
   alert.addButton(this.btn_cancelar);
   alert.addButton({
     text: this.btn_continuar,
     handler: data => {
       console.log('radio data:', data);
          this.language = data;
          this.usuario.update_lang(this.language,this.id_serv)
          .then((data: any) => {
                console.log(data);

          });
          this.trogle_idiome(this.language);
          this.changeLanguage();


     }
   });
   alert.present();
}
// compartilhar social share
shareSheetShare() {
  this.socialSharing.share("CIDADE LOCAL - Tudo ao alcance das suas mãos! ->", "Share subject", "", "https://play.google.com/store/apps/details?id=br.com.cidadelocal").then(() => {

  }).catch(() => {});
}

shopcode() {
  var url = 'https://cidadelocal.com.br/pacotes/';
   this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      }
    });
}
// push notification onesignal
 oneSignalApp(){
   console.log(this.btn_fechar,this.btn_ircode);
  this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');
  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  this.oneSignal.handleNotificationReceived().subscribe( notification => {
    console.log(notification);
    //var notificationData       = notification.notification.payload;
   /*  var notificationAdditional = notificationData.additionalData;
    var notificationCode       = notificationAdditional.code; */
   // this.redirectPush(notification);
   const confirm              = this.alertCtrl.create({
    title: notification.payload.title,
    message: notification.payload.body,
    buttons: [
      {
        text: this.btn_fechar,
        handler: () => {

        }
      },
      {
        text: this.btn_ircode,
        handler: () => {
          this.redirectPush(notification.payload.additionalData.code);
        }
      }
    ]
  });
  confirm.present();
  });
  this.oneSignal.handleNotificationOpened().subscribe( notification => {
    var notificationData       = notification.notification.payload;
    var notificationAdditional = notificationData.additionalData;
    var notificationCode       = notificationAdditional.code;
    this.redirectPush(notificationCode);
  });

  this.oneSignal.endInit();
}
public changeLanguage() : void
{
   this._translateLanguage();
}


private _translateLanguage() : void
{
   this.translate.use(this.language);
   this.trogle_idiome(this.language);
   console.log("linguagem",this.language);
   this._initialiseTranslation();
}
private _initialiseTranslation() : void
{
   setTimeout(() =>
   {
      this.title 			            = this.translate.instant("home.heading");
      this.button               	= this.translate.instant("home.button");
      this.pesquisa               = this.translate.instant("home.pesquisa");
      this.adquira              	= this.translate.instant("home.adquira");
      this.trans.login 			      = this.translate.instant("menu.login");
      this.trans.home         	  = this.translate.instant("menu.home");
      this.trans.favoritos        = this.translate.instant("menu.favoritos");
      this.trans.pesquisa         = this.translate.instant("menu.pesquisa");
      this.trans.codes           	= this.translate.instant("menu.codes");
      this.trans.sair           	= this.translate.instant("menu.sair");
      this.trans.page_pesquisa   	= this.translate.instant("default.page_pesquisa");
      this.trans.load_aguarde    	= this.translate.instant("default.load_aguarde");
      this.trans.msg_servidor    	= this.translate.instant("default.msg_servidor");
      this.trans.btn_salvar    	  = this.translate.instant("default.btn_salvar");
      this.trans.nome             = this.translate.instant("minha_conta.nome");
      this.trans.sobrenome        = this.translate.instant("minha_conta.sobrenome");
      this.trans.email            = this.translate.instant("minha_conta.email");
      this.trans.empresa          = this.translate.instant("minha_conta.empresa");
      this.trans.segmento         = this.translate.instant("minha_conta.segmento");
      this.trans.cep              = this.translate.instant("minha_conta.cep");
      this.trans.cidade           = this.translate.instant("minha_conta.cidade");
      this.trans.estado           = this.translate.instant("minha_conta.estado");
      this.trans.page_conta       = this.translate.instant("minha_conta.page");

      this.load_aguarde           = this.translate.instant("default.load_aguarde");
      this.msg_erro               = this.translate.instant("default.msg_erro");
       this.selecione             = this.translate.instant("videos.selecione");
      this.btn_cancelar           = this.translate.instant("default.btn_cancelar");
      this.btn_continuar          =this.translate.instant("default.btn_continuar");
      this.code_existe            =this.translate.instant("home.code_existe");
      this.btn_ircode             =this.translate.instant("default.btn_ircode");
      this.btn_fechar             =this.translate.instant("default.btn_fechar");

      console.log(this.btn_cancelar,this.btn_continuar,this.btn_fechar,this.btn_ircode);
      this.page_pesquisa          = this.translate.instant("default.page_pesquisa");
     // this.load_aguarde           = this.translate.instant("default.btn_fechar");
      this.msg_servidor           =  this.translate.instant("default.msg_servidor");
      this.page_consulta           =  this.translate.instant("default.page_pesquisa");
      this.campo           =  this.translate.instant("meus_codes.campo");
      this.texto           =  this.translate.instant("default.pesquisa");

      this.trans.page_login             = this.translate.instant("login.page");
      this.trans.load_enviando          = this.translate.instant("default.load_enviando");
      this.trans.campo_obrigatorio      = this.translate.instant("default.campo_obrigatorio");
      this.trans.frase                  = this.translate.instant("login.frase");
      this.trans.page                   = this.translate.instant("login.page");
      this.trans.usuario                = this.translate.instant("login.usuario");
      this.trans.senha                  = this.translate.instant("login.senha");
      this.trans.esqueceu               = this.translate.instant("login.esqueceu");
      this.trans.ou                     = this.translate.instant("login.ou");
      this.trans.conta                  = this.translate.instant("login.conta");
      this.trans.page_senha             = this.translate.instant("recupera_senha.page");
      this.trans.texto_1                = this.translate.instant("recupera_senha.texto_1");
      this.trans.texto_2                = this.translate.instant("recupera_senha.texto_2");
     // this.trans.email                  = this.translate.instant("recupera_senha.texto_2");
      //this.trans.lang       = this.language;

     //this.events.publish('dados',this.data);
      this.events.publish('trans',this.trans);
      this.events.publish('lang',this.language);
    // this.events.publish('dados',this.data);
   }, 250);

}
// redirect push enter
redirectPush(notificationCode){
  console.log(notificationCode);

  this.navCtrl.push('DetalheCodePage', {liberado :false,origem:1,token:this.token,lang:this.language,
    code: notificationCode,
    latitude: this.endLat, longitude: this.endLong,
    telephone: this.global.myGlobalVar

  });
  console.log('notifcaca codes com gps');

 }

// redirect links
openDeeplinks(){
  this.deeplinks.routeWithNavController(this.navCtrl, {
    '/card': {'card':'DetalheCodePage',},
    '/about-us': {'card':'DetalheCodePage'},
  }).subscribe((match) => {
    console.log(match);
    var code = match.$link.queryString.substring(5,50);
    if(code){
        this.redirectPush(code);
    }

  }, (nomatch) => {});

}
    trogle_idiome_onesignal(){
      console.log("langsdfds",this.language);
        if(this.language =='pt'){
          this.btn_fechar           =  "Fechar";
          this.btn_ircode             = "Ir para Code";

        }else if(this.language =='de'){
              this.btn_fechar           =  "Schliessen";
              this.btn_ircode             = "Gehe zu CODE";
          }else if(this.language =='en'){
            this.btn_fechar           =  "Close";
            this.btn_ircode             = "Go to CODE";
        }else if(this.language =='it'){
          this.btn_fechar           =  "Vicino";
          this.btn_ircode             = "Vai al  CODE";
        }else if(this.language =='fr'){

          this.btn_fechar           =  "Proche";
          this.btn_ircode             = "Aller à CODE";
        }else if(this.language =='es'){
          this.btn_fechar           =  "Cerca";
          this.btn_ircode             = "Ir a CODE";
        }
    }

    netFail(){
      let result:any = [];
      result.message = "Sem conexão com a internet."
      this.toast.create({ message: result.message, position: 'botton', duration: 14400 ,closeButtonText: 'Ok!', cssClass: 'error' }).present();
    }

    updateApp() {
      let alert = this.alertCtrl.create({
        title: 'Nova atualição',
        message: 'Para uma melhor experiência, mantenha o Cidade Local sempre atualizado',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Atualizar',
            handler: () => {
              let url = 'https://play.google.com/store/apps/details?id=br.com.cidadelocal';
              this.openThisPage(url);
            }
          }
        ]
      });
      alert.present();
    }

    openThisPage(url) {
       this.browserTab.isAvailable()
        .then(isAvailable => {
          if (isAvailable) {
            this.browserTab.openUrl(url);
          }
        });
    }

    goPage(){}
    showPart(part){
      // this.showAllCats = true;
      switch(part){
        case 'categories':
          this.show_part = this.categories;
          this.hiddeButton = true;
        break;
      }
    }
    criarSession() {

      let usuariologago = new User();
      usuariologago.nome = 'Alan Silva';

      //disparando a sessão
      this.session.create(usuariologago);

    }

    setCategories(){

      let categories = new mData();
      categories.currentvCat = this.vCatAPI;
      categories.categories = this.categories;
      categories.topCategories = this.topCategories;
      categories.cities = this.cities;
      //disparando a sessão
      this.multidata.create(categories);

    }
    verCat(){

      this.multidata.get()
      .then(res => {
          let categories = new mData(res);
          let objectCat:any = categories;
          console.log('Categorias Regsitradas  >>> ', categories);
          this.atualVCat = categories.currentvCat;

          // setar categorias registradas
          console.log('Contagem das categorias existentes: ', categories.categories.length);
          if(categories.categories.length > 0){
            this.platform.ready().then(()=>{

            this.showed_cat = true;
            this.categories = categories.categories;
            this.show_part = categories.topCategories;
            this.topCategories = categories.topCategories;
            this.cities = categories.cities;

            })



          }
      });

    }


}
