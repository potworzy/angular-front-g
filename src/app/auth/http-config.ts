import { InjectionToken } from "@angular/core";

export class HttpConfig {
  constructor(public loginUrl: string) { }
}

export const HTTP_CONFIG_TOKEN = new InjectionToken<HttpConfig>('http.config')
export const HTTP_CONFIG_VALUE: HttpConfig = new HttpConfig('login')
export const httpConfigProvider = {
  provide: HTTP_CONFIG_TOKEN,
  useValue: HTTP_CONFIG_VALUE
}


