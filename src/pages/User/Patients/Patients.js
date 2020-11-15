import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import axios from "axios";
export default function Patients() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    axios
      .get("/user/patients")
      .then((res) => {
        setData(res.data);
        console.log(res.data)
      })
      .catch((err) => {});
  }, []);

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
        <table className="listBill">
          <thead>
            <tr>
              <th width="12%">Tên dịch vụ</th>
              <th width="15%">Tên bệnh nhân</th>
              <th width="15%">Lộ trình</th>
              <th width="13%">Giá</th>
              <th width="12%">Trạng thái</th>
              <th width="15%">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt) => (
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
                {Number(dt.time) < Number(dt.dichvu.lotrinh) ? (
                  <td>Chưa hoàn thành</td>
                ) : (
                  <td>Đã hoàn thành</td>
                )}
                <td>
                  <Button>
                    <Link to={`/user/patients/${dt.id}`} style={{color: 'white'}}>Chi tiết</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
