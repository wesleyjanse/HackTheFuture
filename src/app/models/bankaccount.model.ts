import { Transaction } from './transaction.model';

export class BankAccount {
    constructor(  
        public id:string,
        public iban:string,
        public created:Date,
        public balance:number,
        public currency:string,
        public transaction:Transaction){}
    }