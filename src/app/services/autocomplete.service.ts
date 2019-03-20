import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Autocomplete {
    private _url: string;

    constructor(
        private _http: HttpClient
    ) {
        this._url = environment.API_ENDPOINT;
    }

    getAirports(query: string, departure?: string): Observable<any> {
        const search = !departure ? `?query=${query}` : `?query=${query}&departure=${departure}`;
        return this._http.get(this._url + search);
    }
}
