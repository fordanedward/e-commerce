import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from './e-commerce/e-commerce.component';

@Injectable({
  providedIn: 'root'
})
export class ECommerceServiceService {

  private apiUrl = 'http://localhost/assessment-e-commerce'; // Replace with your local API URL

  constructor(private http: HttpClient) { }

    login(loginObject: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + '/login', loginObject).pipe(
        tap(() => console.log("Successfully logged in")),
        catchError(this.handleError<any>('login'))
      );
    }

    createAccount(accountObject: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + '/add-user', accountObject).pipe(
        tap(() => console.log("Successfully logged in")),
        catchError(this.handleError<any>('login'))
      );
    }

    // GET: Retrieve Products from the API
    getProducts(): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.apiUrl + '/get-all-product').pipe(
        tap(data => console.log('Fetched data from products', data)),
        catchError(this.handleError<ApiResponse>('getItems', { payload: [] }))
      );
    }

    getCart(): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(this.apiUrl + '/get-all-cart-per-user/' + localStorage.getItem('user_id')).pipe(
        tap(data => console.log('Fetched data form cart', data)),
        catchError(this.handleError<ApiResponse>('getItems', { payload: [] }))
      );
    }

    removeFromCart(data:any): Observable<void> {
      console.log("from service: " + data)
      return this.http.delete<void>(this.apiUrl + '/delete-product-from-cart/' + data, {
        responseType: 'text' as 'json' 
      });
    }

    addToCart(cartObject: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + '/add-to-cart', cartObject).pipe(
        tap(() => console.log('Added item', cartObject)),
        catchError(this.handleError<any>('addToCart'))
      );
    }

    addToOrder(orderObject: any) : Observable<any> {
      return this.http.post<any>(this.apiUrl + '/add-order', orderObject).pipe(
        tap(() => console.log('Checked out order', orderObject)),
        catchError(this.handleError<any>('addToCart'))
      );
    }

    updateCartStatus(data: any) : Observable<any> {
       return this.http.put<any>(`${this.apiUrl}/update-cart-status-per-user/${data.user_id}`, data).pipe(
        // console.log(data)
        tap(() => console.log('Updated data', data)),
        catchError(this.handleError<any>('updateCartStatus'))
      );
    }

    logout(): Observable<any> {
      return this.http.post<any>(this.apiUrl + '/logout', "LOGGEDOUT").pipe(
        tap(() => console.log("Successfully logged in")),
        catchError(this.handleError<any>('logout'))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
