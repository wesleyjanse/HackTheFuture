import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { BankAccount } from 'src/app/models/bankaccount.model';
import { Accounts } from 'src/app/models/accounts.model';
import { Person } from 'src/app/models/person.model';
import { send } from 'q';

export interface PeriodicElement {
  Sender: string;
  Recipient: string;
  Amount: number;
  Time: Date;
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
  dataSourceAccounts = new MatTableDataSource(this.optionsAccounts);
  dataSource = new MatTableDataSource(this.options);
  accounts: Accounts[];
  transactions: Transaction[];
  filterRecipient = new FormControl('');
  filterSender = new FormControl('');
  filterAmount = new FormControl('');
  filterDate = new FormControl('');
  filterName = new FormControl('');

  displayedColumns: string[] = ['Sender', 'Recipient', 'Amount', 'Time'];
  displayedColumnsUsers: string[] = ['IBAN', 'Name', 'Balance'];
  filterValues = {
    sender: '',
    recipient: '',
    amount: '',
    time: '',
    name:''
  };
  filterValuesAccount = {
    firstName:'',
    iban:''
  };
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _NavbarService: NavbarService, private fb: FormBuilder, private _dashBoardService: DashboardService,public route:ActivatedRoute) {
    this._NavbarService.show();
    this.apiPath = this.route.snapshot.queryParamMap.get('apiPath');

    this.dataSource.filterPredicate = this.createFilter();
    this.dataSourceAccounts.filterPredicate = this.createFilterAccount();

    this._dashBoardService.getBankTransacitons(this.apiPath).subscribe(res => {
      this.options = res;
      this.dataSource.data = this.options.result;
      console.log(this.options);
    })

    this._dashBoardService.getBankAccounts(this.apiPath).subscribe(res => {
      this.optionsAccounts = res;
      this.dataSourceAccounts.data= this.optionsAccounts.result;
      console.log(this.optionsAccounts);

    })
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  ngOnInit() {
    
    this.dataSource.sort = this.sort;
    this.filterRecipient.valueChanges
      .subscribe(
        recipient => {
          this.filterValues.recipient = recipient.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.dataSourceAccounts.sort = this.sort;
      this.filterName.valueChanges.subscribe(name =>{
        this.filterValuesAccount.firstName = name.toLowerCase();
        this.dataSourceAccounts.filter = JSON.stringify(this.filterValuesAccount);
      });
      
      this.filterSender.valueChanges
      .subscribe(
        sender => {
          this.filterValues.sender = sender.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.filterAmount.valueChanges
      .subscribe(
        sender => {
          console.log(sender)
          this.filterValues.amount > sender;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.recipient.toLowerCase().indexOf(searchTerms.recipient) !== -1
      && data.sender.toString().toLowerCase().indexOf(searchTerms.sender) !== -1
      && data.amount.toString().toLowerCase().indexOf(searchTerms.amount) !== -1
    }
    return filterFunction;
  }
  createFilterAccount(): (data: any, filter: string) => boolean {
    let filterFunctionAccount = function (data, filter): boolean {
      console.log(data)
      let searchTerms = JSON.parse(filter);
      return data.firstName.toLowerCase().indexOf(searchTerms.firstName) !== -1
    }
    return filterFunctionAccount;
  }
}
