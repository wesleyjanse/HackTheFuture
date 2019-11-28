import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bank } from '../models/bank.model';
import { Transaction } from '../models/transaction.model';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>("https://htf.zinderlabs.com/banks");
  }

  getBankTransacitons(bankName: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>("https://htf.zinderlabs.com" + bankName + "transactions")
  }

  getBankAccounts(bankName: string): Observable<Person[]> {
    return this.http.get<Person[]>("https://htf.zinderlabs.com" + bankName + "accounts")
  }
}
