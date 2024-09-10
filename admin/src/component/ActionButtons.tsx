import React from 'react'
import { ButtonProps } from './WarehouseDetail';

const ActionButtons: React.FC<{ props: ButtonProps }> = ({ props }) => {
    return (
      <>
        {props.isEdit ? (
          <>
            <button onClick={props.submit}>완료</button>
            <button onClick={props.cancel}>취소</button>
          </>
        ) : (
          <>
            <button onClick={props.edit}>편집</button>
            <button onClick={props.delete}>삭제</button>
          </>
        )}
      </>
    );
  };
export default ActionButtons
