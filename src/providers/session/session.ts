import { Storage } from "@ionic/storage";

//pacote para transformar nossa classe em injetável
import { Injectable } from '@angular/core';

//import do nosso model usuario.ts
import { User, mData } from '../../models/usuario-model';

@Injectable()
export class Session {

    constructor(public storage: Storage){

    }
    // setando uma seção e passando o tipo de usuário
    create(usuario: User) {
        this.storage.set('usuario', usuario);
    }

    get(): Promise<any> {
        return this.storage.get('usuario');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('usuario');
    }

    exist() {
        this.get().then(res => {
            console.log('resultado >>> ', res);
            if(res) {
                console.log('resultado IF');
                return true;
            } else {
                console.log('resultado else');
                return false;
            }
        });
    }
}
@Injectable()
export class Multidata {

    constructor(public storage: Storage){

    }

    // setando uma seção e passando o tipo de usuário
    create(multidata: mData) {
        this.storage.set('multidata', multidata);
    }

    get(): Promise<any> {
        return this.storage.get('multidata');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('multidata');
    }

    exist() {
        this.get().then(res => {
            console.log('resultado >>> ', res);
            if(res) {
                console.log('resultado IF');
                return true;
            } else {
                console.log('resultado else');
                return false;
            }
        });
    }
}
