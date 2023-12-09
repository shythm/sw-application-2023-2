import "./App.css";
import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Papa from "papaparse";

import ReliabilityTable from "./components/ReliabilityTable";
import FailureRateChart from "./components/FailureRateChart";

function getFailureRate(model, feature, success) {
  Papa.parse(`/data/${model}-${feature}.csv`, {
    download: true,
    complete: (res) => {
      const data = res.data.slice(1);
      const ret = {};
      ret.x = data.map((row) => row[0]); // extract x
      ret.y = data.map((row) => row[1] * 100); // extract y with percentage
      success(ret); // callback
    },
  });
}

export default function App() {
  const [hardDiskData, setHardDiskData] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [smart9Raw, setSmart9Raw] = useState(null);
  const [smart241Raw, setSmart241Raw] = useState(null);
  const [smart242Raw, setSmart242Raw] = useState(null);

  useEffect(() => {
    if (selectedModel) {
      getFailureRate(selectedModel.model, "smart_9_raw", (data) =>
        setSmart9Raw(data)
      );
      getFailureRate(selectedModel.model, "smart_241_raw", (data) => {
        data.x = data.x.map((x) => Math.floor((x * 512) / 100000000000)); // convert to 100 GB unit
        setSmart241Raw(data);
      });
      getFailureRate(selectedModel.model, "smart_242_raw", (data) => {
        data.x = data.x.map((x) => Math.floor((x * 512) / 100000000000)); // convert to 100 GB unit
        setSmart242Raw(data);
      });
    }

    return () => {
      setSmart9Raw(null);
      setSmart241Raw(null);
      setSmart242Raw(null);
    };
  }, [selectedModel]);

  if (!hardDiskData) {
    // initialize hard disk data
    Papa.parse("/data/hdd-list-2022.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (res) => setHardDiskData(res.data),
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
        <Col sm={12} md={6} lg={7} className="overflow-scroll">
          <ReliabilityTable
            data={hardDiskData}
            onRowClick={(e) => setSelectedModel(e)}
          />
        </Col>
        <Col sm={12} md={6} lg={5}>
          <h2 className="fw-bold">S.M.A.R.T.에 따른 실패율</h2>
          <h3 className="text-secondary">{selectedModel?.model}</h3>
          <p className="text-secondary">
            총 {selectedModel?.count.toLocaleString()}개의 데이터
          </p>
          {smart9Raw && (
            <FailureRateChart
              dataX={smart9Raw.x}
              dataY={smart9Raw.y}
              height="150px"
              title="S.M.A.R.T. 9"
              labelX="누적 사용 시간"
            />
          )}
          {smart241Raw && (
            <FailureRateChart
              dataX={smart241Raw.x}
              dataY={smart241Raw.y}
              height="150px"
              title="S.M.A.R.T. 241"
              labelX="누적 데이터 쓰기 (100 GB unit)"
            />
          )}
          {smart242Raw && (
            <FailureRateChart
              dataX={smart242Raw.x}
              dataY={smart242Raw.y}
              height="150px"
              title="S.M.A.R.T. 242"
              labelX="누적 데이터 읽기 (100 GB unit)"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
