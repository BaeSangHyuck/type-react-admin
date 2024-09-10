// FetchData.ts
import axios from "axios";

const url: string = "http://localhost:8080";
const token: string =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJhdXRoIjoiQURNSU5fQ09NTUFORF9ST0xFLEFETUlOX1FVRVJZX1JPTEUiLCJleHAiOjE5OTM1MDI2OTV9.tj6Tj3vWpO7hZf8a9pwzy458Lma4x-L0QisUE4_QZulB1FWtmYKhrjh0MZbZyEcFrsRMnZT94yT0KnZh5LSOdw";

function fetchData(endpoint: string, params: object, callback: Function) {
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

function putData(endpoint: string, data: object, callback: Function) {
  // 공통 데이터 fetch 함수
  
  return axios
    .put(`${url}${endpoint}`,data, {
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
export default fetchData;
export { putData };
