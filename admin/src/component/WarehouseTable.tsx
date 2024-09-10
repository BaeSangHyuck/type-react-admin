import React, { useEffect, useState } from "react";
import WarehouseInfo from "../data/WarehouseInfo";
import axios from "axios";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import fetchData from "../function/FetchData.ts";

export default function WarehouseTable() {

  const [warehouseList, setWarehouseList] = useState<WarehouseInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("/warehouse/search", { page: 0, size: 10 }, (data) => {
      setWarehouseList(data.content);
    });
  }, []);

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
          <button
            onClick={() => navigate(`/warehouse/${row.original.id}`)}>
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
      {warehouseList && warehouseList.length > 0 ? (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}>
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
                    <td
                      {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>창고 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
