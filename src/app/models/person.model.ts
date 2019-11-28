import { Login } from './login.model';

export class Person {
    constructor(  
        public id:number,
        public firstname:string,
        public lastname:string,
        public gender:string,
        public nationality: string,
        public birthday:Date,
        public login:Login,
        public account:Account){}
    }