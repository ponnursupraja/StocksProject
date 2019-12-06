import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Stock } from '../stocks/stock.model';
import { StockService } from '../stocks/stocks.service';
import {DateModel} from './date.model';
import { PriceHistorySerivce } from '../stocks/price-history.service';
import { ShoppingCartService}  from '../shopping-cart/shopping-cart.service';
import { SummaryService } from '../summary/summary.service';
import { Summary } from '../summary/summary.model';
import { SellCartService } from '../sell-cart/sell-cart.service';
import { Observable } from 'rxjs';
import { Registration } from '../registration/registration.model';

@Injectable()
export class DataStorageService{

res : any ='';


  constructor(private http: HttpClient,private stockservice : StockService,private phService : PriceHistorySerivce,
    private scService : ShoppingCartService,private summaryservice : SummaryService,private sellcartService : SellCartService){
  }

  onFetchData(){
    this.http.get<Stock[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/allStocks')
    .subscribe(stocks =>
      {
        this.stockservice.setStocks(stocks);
      })
  }


  onClickCurrentDay(symbol:string){
    this.http.get<DateModel[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/companyStockHistory/currentDay/symbol')
    .subscribe(response =>
      {
        this.phService.setDates(response);
      }
      )
  }

  onClickCurrentWeek(symbol:string){
    console.log(symbol);
    this.http.get<DateModel[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/companyStockHistory/currentWeek/symbol',{
      params : new HttpParams().set('symbol',symbol)
    })
    .subscribe(response =>
      {
        this.phService.setDates(response);
      }
      )
  }


  onClickpastWeek(symbol : string){

    this.http.get<DateModel[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/companyStockHistory/currentWeek/'+symbol)
    .subscribe(response =>
      {
        this.phService.setDates(response);
      }
      )

  }


  OnclickMonthTodate(value : any, symbol : string){
    this.http.get<DateModel[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/companyStockHistory/currentWeek/symbol',{
      params : new HttpParams().set('month',value)
    })
    .subscribe(response =>
      {
        this.phService.setDates(response);
      }
      )
  }


  OnClickYearTodate(value : any){
    this.http.get<DateModel[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/companyStockHistory/currentWeek/symbol',{
      params : new HttpParams().set('month',value)
    })
    .subscribe(response =>
      {
        this.phService.setDates(response);
      }
      )

  }


  onClickPast5years(value: any){
    this.http.get<DateModel[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/companyStockHistory/currentWeek/symbol',{
      params : new HttpParams().set('month',value)
    })
    .subscribe(response =>
      {
        this.phService.setDates(response);
      }
      )
  }


  BuyProcess(){
    const list = this.scService.getBuyList();

    this.http.post('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com:8080/buyStock/thanksgiving',list).subscribe(response =>
      {
        console.log(response);
        this.res=response;
      }
    );

    if(this.res ==="success"){
      this.sellcartService.setList(list);
    }
  }

  onSummary(){
    this.http.get<Summary[]>('http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com:8080/findUserTransaction/thanksgiving').subscribe(summaryl =>
      {
        this.summaryservice.setSummarylist(summaryl);
      });
  }


register(details : Registration){
this.http.post('',details).subscribe(response =>{

})
}





}
