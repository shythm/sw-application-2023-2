import React from "react";
import { Table } from "react-bootstrap";

const ReliabilityTable = (props) => {
  const { data, selectedModel, onRowClick } = props;

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <Table striped hover bordered>
      <thead>
        <tr>
          <th className="text-nowrap">번호</th>
          <th className="text-nowrap">제조회사</th>
          <th className="text-nowrap">모델명</th>
          <th className="text-nowrap">용량(TB)</th>
          <th className="text-nowrap">RPM</th>
          <th className="text-nowrap">가격(₩)</th>
          <th className="text-nowrap">에러율</th>
          <th className="text-nowrap">구매</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr
            key={item.model}
            onClick={() => onRowClick(item)}
            className={item.model === selectedModel ? "table-primary" : ""}
          >
            <td role="button" className="text-nowrap">
              {idx + 1}
            </td>
            <td role="button" className="text-nowrap">
              {item.manufacturer}
            </td>
            <td role="button" className="text-nowrap">
              {item.model}
            </td>
            <td role="button" className="text-nowrap">
              {item.capacity}
            </td>
            <td role="button" className="text-nowrap">
              {item.rpm}
            </td>
            <td role="button" className="text-nowrap">
              {item.price?.toLocaleString()}
            </td>
            <td role="button" className="text-nowrap">
              {item.errorRate?.toFixed(8)}
            </td>
            <td role="button" className="text-nowrap">
              <a href={item.purchaseLink}>구매</a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReliabilityTable;
