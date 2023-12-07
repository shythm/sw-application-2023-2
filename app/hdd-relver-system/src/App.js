import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Papa from "papaparse";

import ReliabilityTable from "./components/ReliabilityTable";
import FailureRateChart from "./components/FailureRateChart";

export default function App() {
  const sampleData = [
    {
      id: 1,
      manufacturer: "Manufacturer A",
      model: "Model A",
      capacity: "1TB",
      rpm: "7200",
      price: "$100",
      errorRate: "0.2%",
      purchaseLink: "http://example.com",
    },
    {
      id: 2,
      manufacturer: "Manufacturer B",
      model: "Model B",
      capacity: "2TB",
      rpm: "5400",
      price: "$200",
      errorRate: "0.1%",
      purchaseLink: "http://example.com",
    },
    {
      id: 3,
      manufacturer: "Manufacturer C",
      model: "Model C",
      capacity: "500GB",
      rpm: "7200",
      price: "$150",
      errorRate: "0.3%",
      purchaseLink: "http://example.com",
    },
    {
      id: 4,
      manufacturer: "Manufacturer D",
      model: "Model D",
      capacity: "1TB",
      rpm: "5400",
      price: "$120",
      errorRate: "0.4%",
      purchaseLink: "http://example.com",
    },
    {
      id: 5,
      manufacturer: "Manufacturer E",
      model: "Model E",
      capacity: "2TB",
      rpm: "7200",
      price: "$220",
      errorRate: "0.5%",
      purchaseLink: "http://example.com",
    },
    {
      id: 6,
      manufacturer: "Manufacturer F",
      model: "Model F",
      capacity: "500GB",
      rpm: "5400",
      price: "$110",
      errorRate: "0.6%",
      purchaseLink: "http://example.com",
    },
    {
      id: 7,
      manufacturer: "Manufacturer G",
      model: "Model G",
      capacity: "1TB",
      rpm: "7200",
      price: "$130",
      errorRate: "0.7%",
      purchaseLink: "http://example.com",
    },
    {
      id: 8,
      manufacturer: "Manufacturer H",
      model: "Model H",
      capacity: "2TB",
      rpm: "5400",
      price: "$210",
      errorRate: "0.8%",
      purchaseLink: "http://example.com",
    },
    {
      id: 9,
      manufacturer: "Manufacturer I",
      model: "Model I",
      capacity: "500GB",
      rpm: "7200",
      price: "$140",
      errorRate: "0.9%",
      purchaseLink: "http://example.com",
    },
    {
      id: 10,
      manufacturer: "Manufacturer J",
      model: "Model J",
      capacity: "1TB",
      rpm: "5400",
      price: "$120",
      errorRate: "1.0%",
      purchaseLink: "http://example.com",
    },
  ];

  const [data, setData] = useState(null);

  if (!data) {
    Papa.parse("/data/ST14000NM001G-smart_9_raw.csv", {
      download: true,
      header: false,
      complete: function (results) {
        setData(results.data.slice(1));
      },
    });
  }

  console.log(data);

  return (
    <Container fluid="lg" className="p-4">
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
          <h1 className="display-4 fw-bold">
            <strong>
              실사용 데이터 기반
              <br />
              HDD 신뢰도 검증 시스템
            </strong>
          </h1>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={12} md={7}>
          <ReliabilityTable
            data={sampleData}
            onRowClick={(e) => console.log(e)}
          />
        </Col>
        <Col sm={12} md={5}>
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
