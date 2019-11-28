import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bank } from '../models/bank.model';
import { Transaction } from '../models/transaction.model';
import { BankAccount } from '../models/bankaccount.model';
import { Accounts } from '../models/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getBanks(): Observable<Bank[]> {
<<<<<<< HEAD
    return this.http.get<Bank[]>("https://htf.zinderlabs.com/banks");
=======
    return this.http.get<Bank[]>("https://htf.zinderlabs.com/banks", {
      headers: new HttpHeaders().set("Authorization","8ccf6ebac6ea70f7be596b481db11255")
      });
>>>>>>> choosebank
  }

  getBankTransacitons(bankName: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>("https://htf.zinderlabs.com" + bankName + "transactions")
  }

  getBankAccounts(bankName: string): Observable<Accounts[]> {
    return this.http.get<Accounts[]>("https://htf.zinderlabs.com" + bankName + "accounts")
  }
}
