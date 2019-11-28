import { Transaction } from './transaction.model';

export class BankAccount {
    constructor(  
        public id:string,
        public created:Date,
        public balance:number,
        public currency:string,
        public transaction:Transaction[],
        public iban?:string,
        public account?:string,
        public card?: string){}
    }