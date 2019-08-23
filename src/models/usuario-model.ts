//classe para criar modelos de objetos
export class Model {
  constructor(objeto?) {
      Object.assign(this, objeto);
  }
}
//classe usuario extendendo a classe Model
export class User extends Model {
    codigo: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
}
export class mData extends Model {
    codigo: number;
    currentvCat: number;
    currentvCity: number;
    data: any[];
    categories: any[];
    topCategories: any[];
    cities: any;
}
