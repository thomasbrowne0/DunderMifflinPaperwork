/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Customer {
  /** @format int32 */
  id?: number;
  /** @minLength 1 */
  name: string;
  address?: string | null;
  /** @format tel */
  phone?: string | null;
  /** @format email */
  email?: string | null;
  orders?: Order[] | null;
}

export interface Order {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate: string;
  /** @format date-time */
  deliveryDate?: string | null;
  /** @minLength 1 */
  status: string;
  /**
   * @format double
   * @min 0
   */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number;
  customer?: Customer;
  orderEntries?: OrderEntry[] | null;
}

export interface OrderEntry {
  /** @format int32 */
  id?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  quantity?: number;
  /** @format int32 */
  productId?: number;
  product?: Paper;
  /** @format int32 */
  orderId?: number;
  order?: Order;
}

export interface Paper {
  /** @format int32 */
  id?: number;
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  paperProperties?: PaperProperty[] | null;
}

export interface PaperProperty {
  /** @format int32 */
  paperId?: number;
  paper?: Paper;
  /** @format int32 */
  propertyId?: number;
  property?: Property;
}

export interface PostCustomerDTO {
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface PostOrderDTO {
  /** @format date-time */
  orderDate?: string;
  /** @format date-time */
  deliveryDate?: string | null;
  status?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number;
}

export interface Property {
  /** @format int32 */
  id?: number;
  propertyName?: string | null;
  paperProperties?: PaperProperty[] | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title DunderMifflinPaperworkBackend
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customer
     * @name CustomerList
     * @request GET:/api/Customer
     */
    customerList: (params: RequestParams = {}) =>
      this.request<Customer[], any>({
        path: `/api/Customer`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerCreate
     * @request POST:/api/Customer
     */
    customerCreate: (data: PostCustomerDTO, params: RequestParams = {}) =>
      this.request<Customer, any>({
        path: `/api/Customer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerDetail
     * @request GET:/api/Customer/{id}
     */
    customerDetail: (id: number, params: RequestParams = {}) =>
      this.request<Customer, any>({
        path: `/api/Customer/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerUpdate
     * @request PUT:/api/Customer/{id}
     */
    customerUpdate: (id: number, data: PostCustomerDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Customer/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerDelete
     * @request DELETE:/api/Customer/{id}
     */
    customerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Customer/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersList
     * @request GET:/api/Orders
     */
    ordersList: (params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/Orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersCreate
     * @request POST:/api/Orders
     */
    ordersCreate: (data: PostOrderDTO, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/Orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersUpdate
     * @request PUT:/api/Orders/{id}
     */
    ordersUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Orders/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsList
     * @request GET:/api/Products
     */
    productsList: (params: RequestParams = {}) =>
      this.request<Paper[], any>({
        path: `/api/Products`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  url: string;
}
