import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./ServiceDetail.css";

export default function ServiceDetail(props) {
  const [data, setdata] = useState({});
  const serviceId = props.match.params.id;
  const [show, setShow] = useState(false);
  const [dsbs, setDsbs] = useState([]);
  const [bs, setBs] = useState('');
  const [voucher, setVoucher] = useState('')
  const [descPrice, setDescPrice] = useState(0)
  const [message, setmessage] = useState('')
  const handleOpen = () => {
    setBs(dsbs[0]._id);
    setShow(true);
  };
  function handleClose() {
    setShow(false);
    setmessage('')
    setDescPrice(data.price)
  }
  function submitService(e) {
    e.preventDefault();
    const dataDangky = { service: serviceId, bacsi: bs, price: descPrice };
    axios
      .post("/service/dangkydichvu", dataDangky)
      .then((res) => {
        toast.success("Đăng ký thành công dịch vụ");
        setShow(false);
      })
      .catch((err) => {});
  }
  function handleForm(e) {
    setBs(e.target.value);
  }
  function handleVoucher(e) {
    setVoucher(e.target.value)
  }
  function checkVoucher(){
    axios.post('/voucher/checkVoucher', {voucher: voucher})
    .then(res => {
      setmessage(res.data.mess)
      setDescPrice(data.price * (1 - res.data.discount))
    })
    .catch(res => {
      
    })
  }
  useEffect(() => {
    axios.get(`/service/${serviceId}`).then((res) => {
      setdata(res.data);
      setDescPrice(res.data.price)
    });
    axios
      .get("/user/dsbs")
      .then((res) => {
        console.log(res.data.dsbs);
        setDsbs(res.data.dsbs);
        setBs(res.data.dsbs[0].firstName + " " + res.data.dsbs[0].lastName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="serviceDetail">
      <ToastContainer autoClose={1300} />
      <div
        className="overlay_background"
        style={{
          backgroundImage:
            "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/azure-spa2.jpg)",
        }}
      >
        <div className="overlay_background1">
          <h2>Our Services</h2>
        </div>
      </div>
      <Container>
        <Row>
          <Col>
            <img className="serviceImg" src={data.img} />
          </Col>
          <Col>
            <div className="serviceDetail_right">
              <div className="serviceDetail_right-name">
                <strong>Tên dịch vụ: </strong> <span>{data.name}</span>
                <br />
                <span>Giá: {data.price} $</span> <br />
                <span>Lộ trình: {data.lotrinh} tuần</span>
              </div>
            </div>
            <Button onClick={handleOpen}>Đăng ký dịch vụ</Button>

            <Modal show={show} onHide={handleClose} centered>
              <Form onSubmit={submitService}>
                <Modal.Header closeButton>
                  <Modal.Title>Đăng ký dịch vụ {data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Giá: {descPrice}</Form.Label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Chọn bác sĩ</Form.Label>
                      <Form.Control as="select" onChange={handleForm}>
                        {dsbs.map((bs, index) => (
                          <option value={bs._id}>
                            {bs.firstName} {bs.lastName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Nhập mã giảm giá</Form.Label>
                      <Form.Control type="text" value={voucher} onChange={handleVoucher} />
                      <Button onClick={checkVoucher}>Áp dụng</Button>
                      <span>{message}</span>
                    </Form.Group>
                  </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Button type="submit">Đăng ký</Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
