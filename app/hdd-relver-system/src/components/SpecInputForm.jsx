import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SpecInputForm = (props) => {
  const { onSubmit, ...restProps } = props;
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [rpm, setRpm] = useState("");

  const handleSubmit = () => {
    // check if all fields are filled
    if (!price || !capacity || !rpm) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // check if all fields are numbers
    if (isNaN(price) || isNaN(capacity) || isNaN(rpm)) {
      alert("숫자만 입력해주세요.");
      return;
    }

    // convert to numbers and callback
    const data = {
      price: parseInt(price),
      capacity: parseInt(capacity),
      rpm: parseInt(rpm),
    };
    onSubmit && onSubmit(data);
  };

  return (
    <Card {...restProps}>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Label className="fw-bold" htmlFor="inputSpecPrice">
                💵 가격
              </Form.Label>
              <Form.Control
                type="text"
                id="inputSpecPrice"
                aria-describedby="priceHelpBlock"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Text id="priceHelpBlock" muted>
                원하는 가격(₩)을 입력해주세요.
              </Form.Text>
            </Col>
            <Col>
              <Form.Label className="fw-bold" htmlFor="inputSpecCapacity">
                💾 용량
              </Form.Label>
              <Form.Control
                type="text"
                id="inputSpecCapacity"
                aria-describedby="capacityHelpBlock"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <Form.Text id="capacityHelpBlock" muted>
                원하는 용량(TB)을 입력해주세요.
              </Form.Text>
            </Col>
            <Col>
              <Form.Label className="fw-bold" htmlFor="inputSpecRPM">
                🏎️ RPM
              </Form.Label>
              <Form.Control
                type="text"
                id="inputSpecRPM"
                aria-describedby="rpmHelpBlock"
                value={rpm}
                onChange={(e) => setRpm(e.target.value)}
              />
              <Form.Text id="rpmHelpBlock" muted>
                원하는 RPM을 입력해주세요.
              </Form.Text>
            </Col>
          </Row>
          <div className="text-end mt-3">
            <Button
              type="submit"
              variant="outline-primary"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              비슷한 HDD 검색
            </Button>{" "}
            <Button
              variant="outline-secondary"
              onClick={() => {
                setPrice("");
                setCapacity("");
                setRpm("");
              }}
            >
              재설정
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SpecInputForm;
