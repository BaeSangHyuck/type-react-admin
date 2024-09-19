import React from "react";

interface PaginationProps {
  totalPage: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
}

const Pagenation: React.FC<PaginationProps> = ({
  totalPage,
  onPageChange,
  onSizeChange,
}) => {
  // 페이지 배열 생성
  const pages = Array.from({ length: totalPage }, (_, index) => index);
  const handleSelect = (e) => {
    console.log(e.target.value)
    onSizeChange(e.target.value);
  };
  return (
    <div>
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)}>
          {page + 1}
        </button>
      ))}
      <select onChange={handleSelect}>
        <option value="5">5개</option>
        <option value="10">10개</option>
      </select>
    </div>
  );
};

export default Pagenation;
