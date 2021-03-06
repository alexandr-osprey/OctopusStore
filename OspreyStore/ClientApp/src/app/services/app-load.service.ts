import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_SETTINGS } from '../app-settings';
import { Category } from '../category/category';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  public getRootCategory(): Promise<any> {
    console.log("Before loading root category");
    const promise = this.httpClient.get<Category>('/api/categories/root').toPromise().then(data => {
      console.log("from api: " + data);
      APP_SETTINGS.rootCategory = data;
      return data;
    });
    return promise;
  }
}
