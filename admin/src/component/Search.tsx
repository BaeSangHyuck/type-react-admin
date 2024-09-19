import React, { ChangeEvent, useState } from "react";
import StoreInfo from "../data/StoreInfo";

interface SearchComponentProps {
  storeList?: StoreInfo[]; // 부모로부터 전달받는 storeList
  selectStore;
  inputSearch: (search: string) => void;
  reSearch:React.MouseEventHandler<HTMLButtonElement>;
}

const Search: React.FC<SearchComponentProps> = ({
  storeList,
  selectStore,
  inputSearch,
  reSearch
}) => {
  const setStoreIdList = (event: React.ChangeEvent<HTMLSelectElement>)=>{
    const value = event.target.value;
    selectStore(value === "none" ? null : value);
  }
  const setSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    inputSearch(event.target.value);
  }
  return (
    <div>
      {storeList ? (
        <select
          name="storeList"
          id="storeList"
          onChange={setStoreIdList}
          style={{
            width: "100px",
            height: "20px",
            color: "black",
          }}
        >
          <option value={'none'}>선택안함</option>
          {storeList.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
      <input type="text" placeholder="검색어 입력" onChange={setSearch}/>
      <button onClick={reSearch}>검색</button>
    </div>
  );
};

export default Search;
