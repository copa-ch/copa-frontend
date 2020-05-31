import Vue from 'vue'
import { defaultApiConfig } from '@/config/api.config'
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'

export interface HttpResponse<T> {
  status: number
  isSuccessful: boolean
  data?: T
  error?: any
}

export interface Config {
  url?: string
}

class RequestBuilder {
  private _method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
  private _isList = false
  private _url = ''
  private _data: any = undefined
  private _config: Config = {}
  private _returnType: ClassType<any> | undefined = undefined

  constructor(config: Config = {}) {
    this._config = {
      ...defaultApiConfig,
      ...config,
    }
  }

  method(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): RequestBuilder {
    this._method = method
    return this
  }

  url(url: string): RequestBuilder {
    this._url = url
    return this
  }

  data(data: any): RequestBuilder {
    this._data = data
    return this
  }

  isList(): RequestBuilder {
    this._isList = true
    return this
  }

  returns(returnType: ClassType<any>): RequestBuilder {
    this._returnType = returnType
    return this
  }

  async fire<Body = undefined>(): Promise<HttpResponse<Body>> {
    try {
      const response = await Vue.$http.request({
        ...this._config,
        url: `${this._config.url || ''}${this._url}`,
        method: this._method || 'GET',
        data: this._data,
      })

      if (this._returnType) {
        if (this._isList) {
          response.data = response.data.map((d: any) =>
            plainToClass(this._returnType as ClassType<any>, d),
          )
        } else {
          response.data = plainToClass(this._returnType, response.data)
        }
      }

      return {
        isSuccessful: true,
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      return {
        isSuccessful: false,
        status: error.response.status,
        error: error.response.data,
      }
    }
  }
}

export const Request = (url: string) => () => {
  return new RequestBuilder({
    url: `${defaultApiConfig.url || ''}${url}`,
  })
}
