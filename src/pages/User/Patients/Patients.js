import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Patients() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(-1);
  const [status, setStatus] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false)
  useEffect(() => {
    axios
      .get("/user/patients")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {});
  }, [status]);

  function changeBillComplete(index) {
    axios
      .post("/bill/changeBillComplete", { billId: data[index].id })
      .then((res) => {
        let stt = status + 1;
        setStatus(stt);
        setOpen(-1);
      })
      .catch((err) => {});
  }
  function handleChange(e){
    let cl = isCompleted
    setIsCompleted(!cl)
  }
  return (
    <div>
      <div
        className="overlay_background"
        style={{
          backgroundImage:
            "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)",
        }}
      >
        <div className="overlay_background1">
          <h2>Your Patients</h2>
        </div>
      </div>
      <div className="container-fluid" style={{ marginBottom: "70px" }}>
        <br/>
        <Form.Row>
          <Form.Group controlId="formGridState">
            <Form.Label>Lọc</Form.Label>
            <Form.Control as="select" onChange={handleChange}>
              <option>Chưa hoàn thành</option>
              <option>Đã hoàn thành</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <table className="listBill">
          <thead>
            <tr>
              <th width="12%">Tên dịch vụ</th>
              <th width="15%">Tên bệnh nhân</th>
              <th width="15%">Lộ trình</th>
              <th width="13%">Giá</th>
              <th width="12%">Trạng thái</th>
              <th width="5%">Action</th>
              <th width="10%">Thay đổi trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {isCompleted && data.map((dt, index) => dt.isCompleted && (
              <>
                <tr>
                  <td>{dt.dichvu.name}</td>
                  <td>{dt.patient.firstName + " " + dt.patient.lastName}</td>
                  <td>
                    {Number(dt.time) < Number(dt.dichvu.lotrinh)
                      ? dt.time + "/" + dt.dichvu.lotrinh
                      : dt.dichvu.lotrinh + "/" + dt.dichvu.lotrinh}{" "}
                    tuần
                  </td>
                  <td>{dt.price}</td>
                  {dt.isCompleted ? (
                    <td>Đã hoàn thành</td>
                  ) : (
                    <td>Chưa hoàn thành</td>
                  )}
                  <td>
                    <Button>
                      <Link
                        to={`/user/patients/${dt.id}`}
                        style={{ color: "white" }}
                      >
                        Chi tiết
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => setOpen(index)}>Thay đổi</Button>
                  </td>
                </tr>
                <Modal
                  show={open == index}
                  size="lg"
                  onHide={() => setOpen(-1)}
                  centered
                >
                  <Modal.Body>
                    <h4>Bạn có muốn thay đổi trạng thái dịch vụ ?</h4>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => changeBillComplete(index)}
                    >
                      Đồng ý
                    </Button>
                    <Button variant="info" onClick={() => setOpen(-1)}>
                      Hủy
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ))}
            {!isCompleted && data.map((dt, index) => dt.isCompleted == false && (
              <>
                <tr>
                  <td>{dt.dichvu.name}</td>
                  <td>{dt.patient.firstName + " " + dt.patient.lastName}</td>
                  <td>
                    {Number(dt.time) < Number(dt.dichvu.lotrinh)
                      ? dt.time + "/" + dt.dichvu.lotrinh
                      : dt.dichvu.lotrinh + "/" + dt.dichvu.lotrinh}{" "}
                    tuần
                  </td>
                  <td>{dt.price}</td>
                  {dt.isCompleted ? (
                    <td>Đã hoàn thành</td>
                  ) : (
                    <td>Chưa hoàn thành</td>
                  )}
                  <td>
                    <Button>
                      <Link
                        to={`/user/patients/${dt.id}`}
                        style={{ color: "white" }}
                      >
                        Chi tiết
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => setOpen(index)}>Thay đổi</Button>
                  </td>
                </tr>
                <Modal
                  show={open == index}
                  size="lg"
                  onHide={() => setOpen(-1)}
                  centered
                >
                  <Modal.Body>
                    <h4>Bạn có muốn thay đổi trạng thái dịch vụ ?</h4>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => changeBillComplete(index)}
                    >
                      Đồng ý
                    </Button>
                    <Button variant="info" onClick={() => setOpen(-1)}>
                      Hủy
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
