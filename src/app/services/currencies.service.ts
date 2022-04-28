import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  
  constructor(private http: HttpClient) { 
    
  }

  getMonedas(){
    return new Promise(resolve=>{
      this.http.get("https://api.frankfurter.app/currencies").subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }
  getConversion(From:string,To:string,Cant:number){
    var url="https://api.frankfurter.app/latest?from="+From+"&to="+To+"&amount="+Cant;
    console.log(url);
    return new Promise(resolve=>{
      this.http.get(url).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }
}