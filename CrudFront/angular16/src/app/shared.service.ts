import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://127.0.0.1:8000/";
  constructor(private http:HttpClient) { }

  getProductos():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/productos/');
  }

  addProducto(val:any){
    return this.http.post(this.APIUrl + '/prodcutos/', val);
  }

  updateProducto(val:any){
    return this.http.put(this.APIUrl + '/productos/', val);
  }

  deleteProducto(val:any){
    return this.http.delete(this.APIUrl + '/productos/' + val);
  }
}
