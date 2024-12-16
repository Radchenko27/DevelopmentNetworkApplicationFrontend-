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

export interface Driver {
  /** ID */
  id?: number;
  /**
   * ФИО
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * Серия и номер водительского удостоверения
   * @minLength 1
   * @maxLength 12
   * @pattern ^\d{2} \d{2} \d{6}$
   */
  certificate_number: string;
  /**
   * Категории
   * @minLength 1
   * @maxLength 30
   * @pattern ^(A|B|C|D|E)(, (A|B|C|D|E)){0,4}$
   */
  license: string;
  /**
   * Опыт работы
   * @min 0
   * @max 2147483647
   */
  experience: number;
  /**
   * Аватар
   * @format uri
   * @maxLength 200
   */
  image_url?: string | null;
  /**
   * Характеристика
   * @minLength 1
   */
  characteristics: string;
  /** Статус */
  status?: "active" | "deleted";
}

export interface DriverInsuranceSerializers {
  /** ID */
  id?: number;
  driver: Driver;
  /** Страховка */
  insurance: number;
  /** Владелец */
  owner?: boolean;
}

export interface Insurance {
  /** ID */
  id?: number;
  /** Тип */
  type?: "ОСАГО" | "КАСКО";
  /**
   * Серия
   * @minLength 1
   * @maxLength 4
   * @pattern ^\d{4}$
   */
  certificate_number: string;
  /**
   * Номер
   * @minLength 1
   * @maxLength 6
   * @pattern ^\d{6}$
   */
  certificate_series: string;
  /**
   * Date creation
   * @format date-time
   */
  date_creation?: string | null;
  /**
   * Date begin
   * @format date
   */
  date_begin?: string | null;
  /**
   * Date end
   * @format date
   */
  date_end?: string | null;
  /**
   * Date formation
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения оформления
   * @format date-time
   */
  date_completion?: string | null;
  /**
   * Марка
   * @minLength 1
   * @maxLength 50
   */
  car_brand: string;
  /**
   * Модель
   * @minLength 1
   * @maxLength 50
   */
  car_model: string;
  /**
   * Регион
   * @minLength 1
   * @maxLength 3
   * @pattern ^\d{2,3}$
   */
  car_region: string;
  /** Статус */
  status?: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /** Creator */
  creator: number;
  /** Moderator */
  moderator?: number | null;
  /**
   * Среднее значение опыта вождения
   * @min 0
   * @max 2147483647
   */
  average_experience?: number | null;
  drivers: DriverInsuranceSerializers[];
}

export interface CustomUser {
  /**
   * Email-адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
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
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
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
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  drivers = {
    /**
     * @description Возвращает список водителей с поиском по ФИО.
     *
     * @tags drivers
     * @name DriversList
     * @summary Получить список водителей
     * @request GET:/drivers/
     * @secure
     */
    driversList: (
      query?: {
        /** ФИО водителя */
        driver_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Driver[],
        {
          /** Описание ошибки */
          error?: string;
        }
      >({
        path: `/drivers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет активного водителя.
     *
     * @tags drivers
     * @name DriversAddCreate
     * @summary Добавить водителя
     * @request POST:/drivers/add
     * @secure
     */
    driversAddCreate: (data: Driver, params: RequestParams = {}) =>
      this.request<Driver, void>({
        path: `/drivers/add`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получает все данные о водителе по id.
     *
     * @tags drivers
     * @name DriversRead
     * @summary Получить водителя
     * @request GET:/drivers/{id_driver}/
     * @secure
     */
    driversRead: (idDriver: string, params: RequestParams = {}) =>
      this.request<Driver, any>({
        path: `/drivers/${idDriver}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет аватар активному водителю.
     *
     * @tags drivers
     * @name DriversAddImageCreate
     * @summary Добавить аватар водителю
     * @request POST:/drivers/{id_driver}/add-image/
     * @secure
     */
    driversAddImageCreate: (
      idDriver: string,
      data: {
        /**
         * Изображение для добавления
         * @format binary
         */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Driver, void>({
        path: `/drivers/${idDriver}/add-image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет активного водителя в страховку.
     *
     * @tags drivers
     * @name DriversAddToDraftCreate
     * @summary Добавить водителя в страховку
     * @request POST:/drivers/{id_driver}/add-to-draft/
     * @secure
     */
    driversAddToDraftCreate: (idDriver: string, params: RequestParams = {}) =>
      this.request<Insurance, void>({
        path: `/drivers/${idDriver}/add-to-draft/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Помечает водителя как удалённый.
     *
     * @tags drivers
     * @name DriversDeleteDelete
     * @summary Удалить водителя
     * @request DELETE:/drivers/{id_driver}/delete/
     * @secure
     */
    driversDeleteDelete: (idDriver: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/drivers/${idDriver}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Обновляет данные о водителе по id.
     *
     * @tags drivers
     * @name DriversUpdateUpdate
     * @summary Обновить водителя
     * @request PUT:/drivers/{id_driver}/update/
     * @secure
     */
    driversUpdateUpdate: (idDriver: string, data: Driver, params: RequestParams = {}) =>
      this.request<Driver, void>({
        path: `/drivers/${idDriver}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  insurances = {
    /**
     * @description Возвращает список страховок с фильтрацией по статусу и дате создания.
     *
     * @tags insurances
     * @name InsurancesList
     * @summary Получить список страховок
     * @request GET:/insurances/
     * @secure
     */
    insurancesList: (
      query?: {
        /** Фильтр по статусу страховки */
        insurance_status?: string;
        /** Начальная дата */
        start_date?: string;
        /** Конечная дата */
        end_date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Insurance[], void>({
        path: `/insurances/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает информацию о конкретной страховке по её ID.
     *
     * @tags insurances
     * @name InsurancesRead
     * @summary Получить страховку
     * @request GET:/insurances/{id_insurance}/
     * @secure
     */
    insurancesRead: (idInsurance: string, params: RequestParams = {}) =>
      this.request<Insurance, void>({
        path: `/insurances/${idInsurance}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Помечает страховку как удалённую.
     *
     * @tags insurances
     * @name InsurancesDeleteDelete
     * @summary Удалить страховку
     * @request DELETE:/insurances/{id_insurance}/delete/
     * @secure
     */
    insurancesDeleteDelete: (idInsurance: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/insurances/${idInsurance}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Удаление водителя из страховки.
     *
     * @tags insurances
     * @name InsurancesDriversDeleteDelete
     * @summary Удалить водителя из страховки
     * @request DELETE:/insurances/{id_insurance}/drivers/{id_driver}/delete/
     * @secure
     */
    insurancesDriversDeleteDelete: (idInsurance: string, idDriver: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/insurances/${idInsurance}/drivers/${idDriver}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменение владельца страховки
     *
     * @tags insurances
     * @name InsurancesDriversUpdateUpdate
     * @summary Изменить владельца страховки
     * @request PUT:/insurances/{id_insurance}/drivers/{id_driver}/update/
     * @secure
     */
    insurancesDriversUpdateUpdate: (
      idInsurance: string,
      idDriver: string,
      data: {
        /** Новый владелец */
        owner: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/insurances/${idInsurance}/drivers/${idDriver}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Завершает или отклоняет страховку по его ID.
     *
     * @tags insurances
     * @name InsurancesFinalizeUpdate
     * @summary Завершить или отклонить страховку
     * @request PUT:/insurances/{id_insurance}/finalize/
     * @secure
     */
    insurancesFinalizeUpdate: (
      idInsurance: string,
      data: {
        /** Действие: completed или rejected */
        action: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/insurances/${idInsurance}/finalize/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Подтверждает страховку по его ID.
     *
     * @tags insurances
     * @name InsurancesSubmitUpdate
     * @summary Подтвердить страховку
     * @request PUT:/insurances/{id_insurance}/submit/
     * @secure
     */
    insurancesSubmitUpdate: (idInsurance: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/insurances/${idInsurance}/submit/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Обновляет данные страховки по его ID.
     *
     * @tags insurances
     * @name InsurancesUpdateUpdate
     * @summary Изменить страховку
     * @request PUT:/insurances/{id_insurance}/update/
     * @secure
     */
    insurancesUpdateUpdate: (idInsurance: string, data: Insurance, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/insurances/${idInsurance}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  users = {
    /**
     * @description Аутентификация пользователя по email и паролю.
     *
     * @tags users
     * @name UsersLoginCreate
     * @summary Вход пользователя
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (
      data: {
        /** Email пользователя */
        email: string;
        /** Пароль пользователя */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Идентификатор сессии пользователя, сохранённый в Redis */
          session_id?: string;
        },
        void
      >({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Разлогинивает пользователя.
     *
     * @tags users
     * @name UsersLogoutCreate
     * @summary Выход пользователя
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Создает нового пользователя с указанными данными.
     *
     * @tags users
     * @name UsersRegisterCreate
     * @summary Регистрация пользователя
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: CustomUser, params: RequestParams = {}) =>
      this.request<
        {
          /** Email пользователя */
          email?: string;
        },
        void
      >({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Частично обновляет данные пользователя.
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @summary Обновление информации о пользователе
     * @request PUT:/users/update/{id_user}/
     * @secure
     */
    usersUpdateUpdate: (idUser: string, data: CustomUser, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/update/${idUser}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),
  };
}
