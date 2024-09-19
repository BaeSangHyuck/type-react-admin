// FetchData.ts
import axios, { AxiosResponse } from "axios";
import WarehouseInfo from "../data/WarehouseInfo";
import { log } from "console";

const url: string = "http://localhost:8080";
const token: string =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJhdXRoIjoiQURNSU5fQ09NTUFORF9ST0xFLEFETUlOX1FVRVJZX1JPTEUiLCJleHAiOjE5OTM1MDI2OTV9.tj6Tj3vWpO7hZf8a9pwzy458Lma4x-L0QisUE4_QZulB1FWtmYKhrjh0MZbZyEcFrsRMnZT94yT0KnZh5LSOdw";

function warehouseFetchData(endpoint: string, params: object, callback: Function) {
  // 공통 데이터 fetch 함수
  return axios
    .get(`${url}${endpoint}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      callback(res.data.body);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function warehousePutData(
  endpoint: string, 
  data: WarehouseInfo, 
  callback?: (data: any) => void // callback이 선택적인 매개변수로 설정됨
): Promise<void> {
  return axios
    .put(`${url}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: AxiosResponse) => {
      // Callback이 있는 경우 실행, 없으면 무시
      if (callback) {
        callback(res.data.body);
      } else {
        console.log('Data successfully updated:', res.data.body);
      }
    })
    .catch((error) => {
      // 구체적인 오류 메시지 출력
      console.error("Error fetching data:", error.response?.data || error.message);
    });
}

function warehouseDeleteData(endpoint: string, params: number|undefined, callback: Function) {
  if(params===undefined) return;
  return axios
    .delete(`${url}${endpoint}?warehouseId=${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.error('삭제 중 오류 발생:', error.response?.data || error.message);
    });
}

function warehouseCreate(endpoint: string, data: WarehouseInfo, callback: Function){
  axios
    .post<WarehouseInfo>(`${url}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res=>{
      console.log(res.data.name);
      callback(res.data.name);
    })
    .catch((e)=> alert(`${e} 에러 발생`))
}

function storeFetchData(endpoint: string, callback: Function) {
  // 공통 데이터 fetch 함수
  return axios
    .get(`${url}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      callback(res.data.body);
    })
    .catch((error) => console.error("Error fetching data:", error));
}


// export default fetchData로 수정
export default warehouseFetchData;
export { warehousePutData as putData, warehouseCreate as createWarehoue, warehouseDeleteData as deleteData ,storeFetchData};
