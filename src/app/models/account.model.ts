import { BankAccount } from './bankaccount.model';
import { Login } from './login.model';
import { Transaction } from './transaction.model';

export class Account {
    constructor(  
        public account:BankAccount,
        public birthday:number,
        public id: number,
        public login:Login,
        public nationality:string,
        public transactions:Transaction[],
        public lastname?: string,
        public firstName?:string,
        public name?: string){}
    }