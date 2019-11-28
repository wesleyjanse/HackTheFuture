import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-bank',
  templateUrl: './choose-bank.component.html',
  styleUrls: ['./choose-bank.component.scss']
})
export class ChooseBankComponent implements OnInit {
allBanks:Array<Bank>;
  constructor(public _dashboardService : DashboardService,public router:Router) { }

  ngOnInit() {
    this._dashboardService.getBanks().subscribe(result =>{
    this.allBanks = result;
    });
  }
  toBank(apiPath:String){
    console.log(apiPath)
    this.router.navigate([
     "/dashboard"
    ],{queryParams: {apiPath:apiPath}})
   
  }
}
