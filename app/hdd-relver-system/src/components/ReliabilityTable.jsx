import React from "react";
import { Table } from "react-bootstrap";

const ReliabilityTable = (props) => {
  const { data, onRowClick } = props;

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  // sort by errorRate
  let sortedData = data.slice();
  sortedData.sort((a, b) => a.errorRate - b.errorRate);

  return (
    <Table striped hover bordered>
      <thead>
        <tr>
          <th>번호</th>
          <th>제조회사</th>
          <th>모델명</th>
          <th>용량(TB)</th>
          <th>RPM</th>
          <th>가격(₩)</th>
          <th>에러율</th>
          <th>구매</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, idx) => (
          <tr key={item.id} onClick={() => onRowClick(item)}>
            <td>{idx + 1}</td>
            <td>{item.manufacturer}</td>
            <td>{item.model}</td>
            <td>{item.capacity}</td>
            <td>{item.rpm}</td>
            <td>{item.price?.toLocaleString()}</td>
            <td>{item.errorRate?.toFixed(8)}</td>
            <td>
              <a href={item.purchaseLink}>구매</a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReliabilityTable;
