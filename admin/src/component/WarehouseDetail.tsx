import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WarehouseInfo from "../data/WarehouseInfo";
import styles from "../style/Warehouse.module.css";
import fetchData ,{putData } from "../function/FetchData.ts";
import ActionButtons from "./ActionButtons.tsx";

export interface ButtonProps {
  isEdit: boolean;
  submit(): void;
  delete(): void;
  cancel(): void;
  edit(): void;
}

export default function WarehouseDetail() {
  const { id } = useParams<{ id: string }>();
  const idNum = Number(id);
  const [warehouse, setWarehouse] = useState<WarehouseInfo>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    fetchData(`/warehouse?warehouseId=${idNum}`, {}, setWarehouse);
  }, []);

  function submit() {
    setIsDisabled(true);
    setIsEdit(false);
    putData(`/warehouse`, {warehouse}, (res)=>console.log(res));
  }
  function edit() {
    setIsDisabled(false);
    setIsEdit(true);
  }
  function cancel() {
    setIsDisabled(true);
    setIsEdit(false);
  }
  function deleteF() {
    console.log("삭제되었습니다.");
  }

  const buttonProps: ButtonProps = {
    isEdit: isEdit, // boolean 타입으로 수정
    submit: submit, // 함수 이름만 지정
    delete: deleteF, // 함수 이름만 지정
    cancel: cancel, // 함수 이름만 지정
    edit: edit, // 함수 이름만 지정
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setWarehouse((warehouse) => ({
      ...warehouse,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <h1>{id}번 창고 상세정보</h1>
      </div>
      <div>
        <div>
          {/* <form> */}
          <div className={styles.info_box}>
            <h2>창고 번호</h2>
            <input type="text" value={warehouse?.id} disabled />
          </div>
          <div className={styles.info_box}>
            <h2>창고 이름</h2>
            <input
              type="text"
              value={warehouse?.name}
              disabled={isDisabled}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.info_box}>
            <h2>창고 주소</h2>
            <input
              type="text"
              value={warehouse?.address}
              disabled={isDisabled}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.info_box}>
            <h2>창고 매장번호</h2>
            <input
              type="text"
              value={warehouse?.storeId}
              disabled={isDisabled}
              onChange={handleInputChange}
            />
          </div>
          <ActionButtons props={buttonProps} />
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
