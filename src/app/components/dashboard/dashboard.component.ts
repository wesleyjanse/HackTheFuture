import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { BankAccount } from 'src/app/models/bankaccount.model';
import { Accounts } from 'src/app/models/accounts.model';
import { Person } from 'src/app/models/person.model';

export interface PeriodicElement {
  sender: string;
  recipient: string;
  amount: number;
  time: Date;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: Transaction[];
  optionsAccounts:Person[];
  public apiPath:string;
  constructor(private _NavbarService: NavbarService, private fb: FormBuilder, private _dashBoardService: DashboardService,public route:ActivatedRoute) {
    this._NavbarService.show();
    this.dataSource.filterPredicate = this.createFilter();
    this._dashBoardService.getBankTransacitons("/caymannationalbank/").subscribe(res => {
      this.options = res;
      // this._dashBoardService.getBankAccounts("/caymannationalbank/").subscribe(result => {
      //   this.accounts = result;
      // })
      this.dataSource.data = this.options.result;
      console.log(this.options);

    })
  }


  dataSource = new MatTableDataSource(this.options);
  accounts: Accounts[];
  transactions: Transaction[];
  filterRecipient = new FormControl('');
  filterSender = new FormControl('');
  filterAmount = new FormControl('');
  filterDate = new FormControl('');

  displayedColumns: string[] = ['Sender', 'Recipient', 'Amount', 'Time'];
  displayedColumnsUsers: string[] = ['IBAN', 'Name', 'Balance'];
  filterValues = {
    sender: '',
    recipient: '',
    amount: '',
    time: ''
  };
  dataSourceAccounts = new MatTableDataSource(this.optionsAccounts);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.apiPath = this.route.snapshot.queryParamMap.get('apiPath');
    this.filterRecipient.valueChanges
    this.apiPath = this.route.snapshot.queryParamMap.get('apiPath');
    this._dashBoardService.getBankAccounts(this.apiPath).subscribe(res => {
      this.optionsAccounts = res;
      this.dataSourceAccounts.data = this.optionsAccounts.result;
      console.log(this.optionsAccounts);

    })
    this.dataSource.sort = this.sort;
    this.filterRecipient.valueChanges
      .subscribe(
        recipient => {
          this.filterValues.recipient = recipient.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }


  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.recipient.toLowerCase().indexOf(searchTerms.recipient) !== -1
    }
    return filterFunction;
  }
}
