import { LoginData } from "sn-login";

export interface ICreateRecordOptions {
  withDisplayValue?: boolean
  fields?: string
}

export default async function createRecord(
  login: LoginData, table: string, data: any, options?: ICreateRecordOptions
): Promise<any> {
  let url = `/api/now/table/${table}`;
  let urlParmObj: any = {};
  if (options) {
    if (options.fields) urlParmObj.sysparm_fields = options.fields;
    if (options.withDisplayValue) urlParmObj.sysparm_display_value = "all";
  }
  var response = await login.wclient.post(url, data, {
    headers: {
      "X-UserToken": login.token,
      "Accept": "application/json"
    },
    "params": urlParmObj
  });
  return response.data.result;
}