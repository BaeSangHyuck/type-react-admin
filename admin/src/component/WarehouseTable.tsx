import React, { useEffect, useState } from "react";
import WarehouseInfo from "../data/WarehouseInfo";
import { useTable } from 'react-table';
import { useNavigate } from "react-router-dom";
import warehouseFetchData, { storeFetchData } from "../function/FetchData.ts";
import Search from "./Search.tsx";
import StoreInfo from "../data/StoreInfo.ts";
import Pagenation from "./Pagenation.tsx";

export default function WarehouseTable() {
  const [warehouseList, setWarehouseList] = useState<WarehouseInfo[]>([]);
  const navigate = useNavigate();
  const [storeList, setStoreList] = useState<StoreInfo[]>();
  const [storeIdList, setStoreIdList] = useState<Number[]>();
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalPage, setTotalPage] = useState<number>(0);
  useEffect(() => {
    storeFetchData(`/store/list`, (res) => setStoreList(res));
  }, []);

  function fetchWarehouseData() {
    warehouseFetchData(
      "/warehouse/search",
      { storeIdList, search, page: page, size: size },
      (data) => {
        setTotalPage(data.totalPages);
        setWarehouseList(data.content);
      }
    );
  }

  function reSearch(): void {
    fetchWarehouseData();
  }

  useEffect(() => {
    fetchWarehouseData(); // 처음에 데이터 가져오기
  }, [page,size]);

  function selectStore(storeIdList: number[]): void {
    setStoreIdList(storeIdList);
  }
  function inputSearch(search: string): void {
    setSearch(search);
  }

  const data = React.useMemo(() => warehouseList, [warehouseList]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "이름",
        accessor: "name",
      },
      {
        Header: "위치",
        accessor: "address",
      },
      {
        Header: "비고", // 액션 열 추가
        Cell: ({ row }: any) => (
          <button onClick={() => navigate(`/warehouse/${row.original.id}`)}>
            상세보기
          </button>
        ),
      },
    ],
    [navigate]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <h1 style={{ color: "black" }}>창고 설정</h1>
      <div>
        <Search
          storeList={storeList}
          selectStore={selectStore}
          inputSearch={inputSearch}
          reSearch={reSearch}
        />
      </div>
      <button
        onClick={() => {
          navigate("/warehouse/create");
        }}
      >
        추가
      </button>
      {warehouseList && warehouseList.length > 0 ? (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>창고 정보를 불러오는 중입니다...</p>
      )}
      <Pagenation
        totalPage={totalPage}
        onPageChange={setPage}
        onSizeChange={setSize}
      ></Pagenation>
    </div>
  );
}
