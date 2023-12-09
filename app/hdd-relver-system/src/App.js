import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Papa from "papaparse";

import ReliabilityTable from "./components/ReliabilityTable";
import FailureRateChart from "./components/FailureRateChart";
import SpecInputForm from "./components/SpecInputForm";

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
  const [selectedHDD, setSelectedHDD] = useState(null);
  const [smart9Raw, setSmart9Raw] = useState(null);
  const [smart241Raw, setSmart241Raw] = useState(null);
  const [smart242Raw, setSmart242Raw] = useState(null);

  const rightSectionRef = useRef(null);

  useEffect(() => {
    if (selectedHDD) {
      getFailureRate(selectedHDD.model, "smart_9_raw", (data) =>
        setSmart9Raw(data)
      );
      getFailureRate(selectedHDD.model, "smart_241_raw", (data) => {
        data.x = data.x.map((x) => Math.floor((x * 512) / 100000000000)); // convert to 100 GB unit
        setSmart241Raw(data);
      });
      getFailureRate(selectedHDD.model, "smart_242_raw", (data) => {
        data.x = data.x.map((x) => Math.floor((x * 512) / 100000000000)); // convert to 100 GB unit
        setSmart242Raw(data);
      });
    }

    return () => {
      setSmart9Raw(null);
      setSmart241Raw(null);
      setSmart242Raw(null);
    };
  }, [selectedHDD]);

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
    <Container fluid="xxl" className="p-4">
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
        <Col sm={12} md={6} lg={7}>
          <Row>
            <SpecInputForm onSubmit={(e) => console.log(e)} />
          </Row>
          <Row className="mt-3 overflow-scroll">
            <ReliabilityTable
              data={hardDiskData}
              selectedModel={selectedHDD?.model}
              onRowClick={(e) => {
                setSelectedHDD(e);
                rightSectionRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </Row>
        </Col>
        <Col ref={rightSectionRef} sm={12} md={6} lg={5}>
          <h2 className="fw-bold text-center">S.M.A.R.T.에 따른 실패율</h2>
          <div className="text-secondary text-center">
            {selectedHDD ? (
              <>
                <h3>{selectedHDD.model}</h3>
                <p>총 {selectedHDD.count.toLocaleString()}개의 데이터</p>
              </>
            ) : (
              <p>왼쪽에서 조회를 원하는 하드디스크를 클릭해주세요.</p>
            )}
          </div>
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
