import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import "./HistoryBooking.css";

export default function HistoryBooking() {
  const [bills, setBills] = useState([]);
  const [show, setShow] = useState(-1);
  useEffect(() => {
    axios.get("/bill/billUser").then((res) => {
      setBills(res.data);
      console.log(res.data);
    });
  }, []);
  const handleShow = (index) => {
    setShow(index);
  };
  function handleClose(index) {
    setShow(-1);
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
          <h2>Lịch Sử Dịch Vụ</h2>
        </div>
      </div>
      <div className="container-fluid" style={{ marginBottom: "70px" }}>
        <table className="listBill">
          <thead>
            <tr>
              <th width="12%">Tên dịch vụ</th>
              <th width="15%">Thông tin bác sĩ</th>
              <th width="15%">Lộ trình</th>
              <th width="18%">Ngày hẹn tiếp theo</th>
              <th width="13%">Giá</th>
              <th width="10%">Trạng thái</th>
              <th width="5%">Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((dt, index) => (
              <>
                <tr>
                  <td>{dt.dichvu}</td>
                  <td>
                    <Button key={index} onClick={() => handleShow(index)}>
                      Xem
                    </Button>
                  </td>
                  <td>{dt._doc.lotrinh} tuần</td>
                  <td>{dt._doc.nextDay}</td>
                  <td>{dt._doc.price} đồng</td>
                  {dt._doc.isCompleted ? (
                    <td>Đã hoàn thành</td>
                  ) : (
                    <td>Chưa hoàn thành</td>
                  )}
                  <td>
                    <Button>
                      <Link
                        to={`/bill/billDetail/${dt._doc._id}`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Chi tiết
                      </Link>
                    </Button>
                  </td>
                </tr>
                <Modal
                  key={index}
                  show={index == show}
                  onHide={() => handleClose(index)}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Thông tin bác sĩ</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <span>
                      Tên bác sĩ: {dt.bacsi.firstName + " " + dt.bacsi.lastName}
                    </span>
                    <br />
                    <span>
                      SĐT:{" "}
                      <a href={`tel:${dt.bacsi.phone}`}>{dt.bacsi.phone}</a>
                    </span>
                    <p>{dt.bacsi.description}</p>
                  </Modal.Body>
                </Modal>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
