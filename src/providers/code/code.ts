import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class CodeProvider {
  public myGlobalVar: string;
  private API_URL = 'https://cidadelocal.com.br/api19/wp-json/code/search/';
  private API_IMG_URL = 'https://cidadelocal.com.br/api19/wp-content/uploads/formidable/';
  private APP_URL = 'https://cidadelocal.com.br/api19/wp-json/code/search/?code_number=pesquisa777';
  private APP_URL_CODE ='https://cidadelocal.com.br/api19/wp-json/admin/v1/users/codes';
  private APP_URL_ENQ  = 'https://cidadelocal.com.br/api19/wp-json/admin/v1/ask';
  private baseUrl  = 'https://cidadelocal.com.br/api19';


  constructor(
    public http      : Http,
    public httpn     : HTTP,
   ) { }

// getAll(code: any,phoneNumber:String,latitude:String,longitude:String) : Observable<any>{
//    /*  let code = page.code;
//     let phoneNumber = page.telephone;
//     let latitude = page.position.latitude;
//     let longitude = page.position.longitude;

//    */    let url = this.API_URL + '?code_number='+ code +'&phone='+ phoneNumber +'&latitude='+latitude+'&longitude='+ longitude;

//       return this.http.get(url).map((resp:Response)=> resp.json());
// }

async getAll(code: any,phoneNumber:String,latitude:String,longitude:String){

  let url = this.API_URL + '?code_number='+ code +'&phone='+ phoneNumber +'&latitude='+latitude+'&longitude='+ longitude;
  let result = await this.httpn.get(url, {}, {}).then((res)=>{
    let response = JSON.parse(res.data);
    return response;
  }).catch((err:any)=>{
    let erroStatus = err.status;
    let response = {
      'error':'ocorreu_um_erro',
      'status': erroStatus,
    };
    console.log('Erro em getAll:: ',err);
    console.log('result em getAll:: ',result);
    return response;
  });
  return result;
}
    async setlinkimage(token,setData,lang){

      console.log('setData original em setlinkimage em codeProvider:: ',setData);

      let url = this.APP_URL_CODE;
      let id_code = setData.id;
      console.log('id_code original em setlinkimage em codeProvider:: ',id_code);
      let data = {
        'id'        : id_code,
        'token'     : token,
        'setData'   : JSON.stringify(setData),
        'lang'      : lang,
        'bloco'     : 11
      };

      let result = await this.httpn.post(url, data, {}).then((res)=>{
        let response = JSON.parse(res.data);
        console.log('response em setlinkimage:: ',response);
        return response;
      }).catch((err:any)=>{
        let erroStatus = err.status;
        let response = {
          'error':'ocorreu_um_erro',
          'status': erroStatus,
        };
        console.log('Erro em setlinkimage:: ',err);
        console.log('result em setlinkimage:: ',result);
        return response;
      });
      return result;
    }

code_remove(token:String,id_code:Number,lang:String): Observable<any>{
  let url = this.APP_URL_CODE+'?token='+token+'&bloco=1&id='+id_code+'&lang='+lang;
  return this.http.delete(url).map((resp:Response)=> resp.json());
}
code_create(token:String,name_code:String,link:String,t_conteudo:String,lang:String): Observable<any>{
  var data = {
    code: name_code,
    link : link,
    t_conteudo : t_conteudo,
    token:token,
    lang              :lang
  };
  let url = this.APP_URL_CODE;
  return this.http.post(url,data).map((resp:Response)=> resp.json());
}
get_API_IMG_URL(): String{
  return this.API_IMG_URL;
}
//edição de code
getAllCode(token:String): Observable<any>{
   let url = this.APP_URL_CODE+'?token='+token;
   return this.http.get(url).map((resp:Response)=> resp.json());
}
getShowCode(code:String): Observable<any>{
   let url = this.API_URL+"?code="+code;
    return this.http.get(url).map((resp:Response)=> resp.json());
}
getLinks(page:any): Observable<any>{
    let url = this.APP_URL;
    return this.http.get(url).map((resp:Response)=> resp.json());
  }
  getCodePassword(password:String,id:Number,lang:String){
    var data ={
      password : password,
      id : id,
      bloco :1,
      lang              :lang
    }
   let url = this.APP_URL_CODE;
   return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  code_Edit(token:String,id_code:Number,name_code:String,titulo?:String,descricao?:String,link?:String,isLink?:String,password?:String,isprivate?:Boolean,lang?:String): Observable<any>{
    var data = {
      id: id_code,
      bloco :1,
      token:token,
      code: name_code,
      titulo:titulo,
      descricao:descricao,
      link:link,
      t_conteudo:isLink,
      password   :password,
      isprivate  :isprivate,
      lang              :lang

    };
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  contato(id_code:String,token:String,setor:String,tipo:String,calling_code:String,pais:String,conteudo:String,titulo:String,action:String,sector_id:String,lang:String){
    console.log(id_code,token,pais,setor,tipo,pais,conteudo,titulo,action,sector_id);
    var data = {
      id: id_code,
      bloco :2,
      token:token,
      pais  :pais,
      setor :setor,
      tipo :tipo,
      conteudo :conteudo,
      titulo:titulo,
      calling_code:calling_code,
      action:action,
      sector_id :sector_id,
      lang              :lang

    };
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  contato_Edit(id_code:Number,token:String,pais?:String,tel_whatsapp?:String,tel_contato?:String,email?:String,website?:String,facebookUser?:String,instagramUser?:String,linkedin?:String): Observable<any>{
   console.log(id_code,token,pais,tel_whatsapp,tel_contato,email);
    var data = {
      id: id_code,
      bloco :1,
      token:token     ,
      pais  :pais,
      tel_whatsapp :tel_whatsapp,
      tel_contato :tel_contato,
      email :email,
      website:website,
      facebookUser:facebookUser,
      instagramUser :instagramUser,
      linkedin:linkedin,
    };
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  ///mídias
  imagen_create(id_code:Number,token:String,files:any[],lang:String): Observable<any>{
    var data ={
       id : id_code,
       bloco :3,
       token :token,
       lang              :lang,
       files:JSON.stringify(files)
    }
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  imagen_delete(token:String,id_code:Number,lang:String): Observable<any>{
    let url = this.APP_URL_CODE+'?token='+token+'&bloco=3&id='+id_code+'&lang='+lang;
    return this.http.delete(url).map((resp:Response)=> resp.json());
  }

  doc_create(id_code:Number,token:String,files:any[],lang:String): Observable<any>{
    var data ={
       id : id_code,
       bloco :4,
       token :token,
       lang  : lang,
       files:JSON.stringify(files)
    }
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  doc_delete(token:String,id_code:Number,lang:String): Observable<any>{
    let url = this.APP_URL_CODE+'?token='+token+'&bloco=4&id='+id_code+'&lang='+lang;
    return this.http.delete(url).map((resp:Response)=> resp.json());
  }

  video_create(id_code:Number,token:String,files:any[],lang:String): Observable<any>{
    var data ={
       id : id_code,
       bloco :5,
       token :token,
       lang:lang,
       files:JSON.stringify(files)
    }
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }

  video_create_ftp(id_code:Number,token:String,files:String): Observable<any>{
    var data ={
       id : id_code,
       bloco :8,
       token :token,
       files:files
    }
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  video_link_create(id_code:Number,token:String,files:String,origem:String,lang:String): Observable<any>{
    var data ={
       id : id_code,
       bloco :6,
       token :token,
       files:files,
       origem:origem,
       lang              :lang
    }
    let url = this.APP_URL_CODE;
    return this.http.post(url,data).map((resp:Response)=> resp.json());
  }
  ///delete video
   video_delete(token:String,id_code:Number,lang:String): Observable<any>{
    let url = this.APP_URL_CODE+'?token='+token+'&bloco=5&id='+id_code+'&lang='+lang;
    return this.http.delete(url).map((resp:Response)=> resp.json());
  }
  ///delete audio
   audio_delete(token:String,id_code:Number,lang:String): Observable<any>{
    let url = this.APP_URL_CODE+'?token='+token+'&bloco=5&media=audio&id='+id_code+'&lang='+lang;
    return this.http.delete(url).map((resp:Response)=> resp.json());
  }

  create_push(codeNumber:String,id_code,titulo:String,mensagem:String,token:String,lang:String): Observable<any>{
    console.log(codeNumber,titulo,mensagem,token);
        var data ={
          codeNumber : codeNumber,
          titulo     : titulo,
          mensagem   : mensagem,
          token      : token,
          password   : "@spot2020",
          lang              :lang

        }
        console.log(data);
      let url = 'https://cidadelocal.com.br/api19/wp-json/admin/v1/dashboard/';
      return this.http.post(url,data).map((resp:Response)=> resp.json());
  }

  /////Aqui fica a parte da enquete do code /////////////////////////////////
  getEnqALL(token:String,code_id:String) : Observable<any>{
      let url = this.APP_URL_ENQ + '?token='+ token +'&bloco=1'+'&code_id='+code_id;
      return this.http.get(url).map((resp:Response)=> resp.json());
  }
  createEnq(code_id:String,id:String,question:String,option1:String,option2:String,data_enc:String,automatic:Boolean,ask_active:Boolean,token:String,files:any[]) : Observable<any>{
    console.log(code_id,id,question,option1,option2,data_enc,automatic,token,files);
   // JSON.stringify(files);
    var data ={
      token        : token,
      code_id      : code_id,
      ask_id       : id,
      question     : question,
      option1      : option1,
      option2      : option2,
      data_enc     : data_enc,
      automatic    : automatic,
      bloco        : 3,
      //send_postman : 1,
      ask_active   : ask_active,
      files        : JSON.stringify(files)

    }
    console.log(data);

    return this.http.post(this.APP_URL_ENQ,data).map((resp:Response)=> resp.json());
  }
  getEnq(code_id:String,ask_id:String){
    let url = this.APP_URL_ENQ +'?bloco=2'+'&code_id='+code_id+'&ask_id='+ask_id;
    return this.http.get(url).map((resp:Response)=> resp.json());
  }
  votarEnq(vote:Number,ask_id:String,code_id:String){
      var data ={

        ask_id       : ask_id,
        bloco        : 7,
        vote         :vote,
        code_id      :code_id

      }
      console.log(data);

      return this.http.post(this.APP_URL_ENQ,data).map((resp:Response)=> resp.json());
  }
  deleteImgEnq(code_id:String,ask_id:String,midia_id:String,token:String){
    var data ={
      token        : token,
      ask_id       : ask_id,
      bloco        : 6,
      midia_id     : midia_id,
      code_id      : code_id

    }
    console.log(data);

    return this.http.post(this.APP_URL_ENQ,data).map((resp:Response)=> resp.json());
  }
  deleteEnq(code_id:String,ask_id:String,token:String){
    var data ={
      token        : token,
      ask_id       : ask_id,
      bloco        : 6,
      code_id      : code_id

    }
    console.log(data);

    let url = this.APP_URL_ENQ +'?bloco=6'+'&code_id='+code_id+'&ask_id='+ask_id+'&token='+token;
    return this.http.get(url).map((resp:Response)=> resp.json());
  }
  forgotpass(email:String,lang:String){
    var data ={
      lost_pass    : true,
      user_login        : email,
      lang              :lang

    }
    console.log(data);

    return this.http.post(this.APP_URL_CODE,data).map((resp:Response)=> resp.json());
  }
  search(terms: Observable<string>) {
    return terms.debounceTime(800)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term): Observable<any[]>{

    let url = 'https://cidadelocal.com.br/api19/wp-json/code/search/?search=search&code_number='+term;
    return this.http.get(url).map((resp:Response)=> resp.json());
  }

  async getInfo(mode){
          /**
       * Sistema de retorno de informações diversas
       * Param: mode (exemplo: getCats)
       * Options: any info (ex: all, name, etc...)
       */
      let token = '39<(G+xI16HyoK8$IKh>xID.Db]<zX6T:3CEp';
      let url = this.baseUrl+"/wp-json/admin/v1/conn/getinfo";
      let data = {
        id: '1',
        mode: mode,
        // mode: 'cats>citys>version',
      };
      let header = {Mytoken: 'Bearer '+ token};
      let response = await this.httpn.get(url, data, header)
    .then(data => {

      let resp = JSON.parse(data.data);
      console.log('Response: ',response);

      return resp;

    })
    .catch(error => {

      console.log('Acionou o catch!');
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });

    return response;
  }
  //funcao multi uso
  async setMultiData(data){

    let url = data.url;
    let token = data.token;

              /**
       * Sistema de retorno de informações diversas
       * Param: mode (exemplo: getCats)
       * Options: any info (ex: all, name, etc...)
       */
      if(!data.header){
        data.header = {Auth: 'Bearer '+ token};
      }

      let header = data.header;
      let httpMethod:any = '';

      switch(data.method){
        case 'post':
            httpMethod = this.httpn.post(url, data.data, header);
        break;
        case 'get':
            httpMethod = this.httpn.get(url, {}, header);
        break;

      }

      let response = await httpMethod.then(data => {

      let resp = JSON.parse(data.data);
      console.log('Response: ',response);

      return resp;

    })
    .catch(error => {

      console.log('Acionou o catch!');
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });

    return response;



  }
}
