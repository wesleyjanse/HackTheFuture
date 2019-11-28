import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>("htf.zinderlabs.com/banks");
  }

  getBankTransacitons(bankName: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>("htf.zinderlabs.com/" + bankName + "/transactions")
  }

  getBankAccounts(bankName: string): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>("htf.zinderlabs.com/" + bankName + "/transactions")
  }
}
