import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Papa from "papaparse";

import ReliabilityTable from "./components/ReliabilityTable";
import FailureRateChart from "./components/FailureRateChart";

export default function App() {
  const [hardDiskData, setHardDiskData] = useState(null);
  const [data, setData] = useState(null);

  if (!hardDiskData) {
    Papa.parse("/data/hdd-list-2022.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (res) => setHardDiskData(res.data),
    });
  }
  console.log(hardDiskData);

  if (!data) {
    Papa.parse("/data/ST14000NM001G-smart_9_raw.csv", {
      download: true,
      complete: function (results) {
        setData(results.data.slice(1));
      },
    });
  }

  return (
    <Container fluid className="p-4">
      <Row className="mt-4">
        <Col sm={6} md={3}>
          <Image
            className="w-50"
            src="/hdd-main.png"
            alt="HDD Main Image"
            rounded
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <h1>
            <strong>
              <span className="fw-bold">실사용 데이터 기반</span>
              <br />
              <span className="display-4 fw-bold">HDD 신뢰도 검증 시스템</span>
            </strong>
          </h1>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={12} md={8} className="overflow-scroll">
          <ReliabilityTable
            data={hardDiskData}
            onRowClick={(e) => console.log(e)}
          />
        </Col>
        <Col sm={12} md={4}>
          <FailureRateChart
            dataX={data?.map((row) => row[0])}
            dataY={data?.map((row) => row[1] * 100)}
          />
          <FailureRateChart
            dataX={data?.map((row) => row[0])}
            dataY={data?.map((row) => row[1] * 100)}
          />
          <FailureRateChart
            dataX={data?.map((row) => row[0])}
            dataY={data?.map((row) => row[1] * 100)}
          />
        </Col>
      </Row>
    </Container>
  );
}
