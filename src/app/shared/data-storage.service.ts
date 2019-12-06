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
// import { Observable } from 'rxjs';
import { Registration } from '../registration/registration.model';
import { Observable} from 'rxjs/Observable';
// import { Map } from '@'
import { of } from 'rxjs/observable/of';

@Injectable()
export class DataStorageService{

res : any ='';
public responseCache = new Map();

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

  // public getCacheList(): Observable<any>{
  //   const listFromCache = this.responseCache.get(this.url_val);
  //   if (listFromCache) {
  //     return of(listFromCache);
  //   }
  //   const response = this.http.get<any>(this.url_val);
  //   response.subscribe(beers => this.responseCache.set(this.url_val, beers));
  //   return response;
  // }
  


 ondummyPastWeek(symbol : string):Observable<any>{
  let url_val ='http://ec2-18-222-112-169.us-east-2.compute.amazonaws.com/companyStockHistory/currentWeek/'+symbol;
     const listFromCache = this.responseCache.get(url_val);
    if (listFromCache) {
      return of(listFromCache);
    }
    const response = this.http.get<any>(url_val);
    response.subscribe(beers => this.responseCache.set(url_val, beers));
    return response;

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
// this.http.post('',details).subscribe(response =>{

// })
}





}
