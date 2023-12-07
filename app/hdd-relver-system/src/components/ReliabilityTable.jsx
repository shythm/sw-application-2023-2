import React from "react";
import { Table } from "react-bootstrap";

const ReliabilityTable = ({ data, onRowClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>번호</th>
          <th>제조 회사</th>
          <th>모델명</th>
          <th>용량</th>
          <th>RPM</th>
          <th>가격</th>
          <th>에러율</th>
          <th>구매 링크</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} onClick={() => onRowClick(item)}>
            <td>{item.id}</td>
            <td>{item.manufacturer}</td>
            <td>{item.model}</td>
            <td>{item.capacity}</td>
            <td>{item.rpm}</td>
            <td>{item.price}</td>
            <td>{item.errorRate}</td>
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
