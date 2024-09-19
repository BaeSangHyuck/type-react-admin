import React, { useState } from "react";
import WarehouseInfo from "../data/WarehouseInfo";
import { useNavigate } from "react-router-dom";
import { createWarehoue } from "../function/FetchData.ts";

export default function WarehouseCreate() {
  const [warehouse, setWarehouse] = useState<WarehouseInfo>({
    name: "", // 빈 문자열로 초기화
    address: "", // 빈 문자열로 초기화
    storeId: 0, // 기본값으로 숫자 0 설정
  });
  const navigator = useNavigate();
  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    createWarehoue("/warehouse", warehouse, (id: number) =>
      alert(`${id}번 창고 생성이 완료되었습니다.`)
    );
    navigator("/warehouse");
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setWarehouse((warehouse) => ({
      ...warehouse,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>창고 추가</h1>
      <form onSubmit={onSubmit} style={{ height: "200px" }}>
        <div
          style={{
            display: "flex",
            height: "30px",
            margin: "30px 30px 30px 0px",
          }}
        >
          <h2>창고 이름</h2>
          <input type="text" onChange={handleInputChange} name="name" />
        </div>
        <div
          style={{
            display: "flex",
            height: "30px",
            margin: "30px 30px 30px 0px",
          }}
        >
          <h2>창고 주소</h2>
          <input type="text" onChange={handleInputChange} name="address" />
        </div>
        <div
          style={{
            display: "flex",
            height: "30px",
            margin: "30px 30px 30px 0px",
          }}
        >
          <h2>매장 번호</h2>
          <input type="text" onChange={handleInputChange} name="storeId" />
        </div>
        <div
          style={{
            display: "flex",
            height: "30px",
            margin: "30px 30px 30px 0px",
          }}
        >
          <button type="submit">추가</button>
          <button
            onClick={() => {
              navigator("/warehouse");
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
