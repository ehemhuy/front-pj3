import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./PatientDetail.css";
import download from 'downloadjs'

export default function PatientDetail(props) {
  const billId = props.match.params.id;
  const [data, setData] = useState({});
  const [tuan, setTuan] = useState([]);
  const [info, setInfo] = useState(null);
  const [postSuccessed, setPostSuccessed] = useState(0);
  const [displayGetBill, setDisplayGetBill] = useState('none')
  useEffect(() => {
    Axios.get(`/user/patients/${billId}`)
      .then((res) => {
        for (let i = 1; i <= res.data.data.lotrinh; i++) tuan.push(i);
        setData(res.data.data);
      })
      .catch((err) => {});
  }, [postSuccessed]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    info.imgs.forEach((i) => {
      formData.append("imgs", i);
    });
    formData.append("tuan", info.tuan);
    formData.append("tinhtrang", info.tinhtrang);
    formData.append("thuoc", info.thuoc);
    formData.append("nextday", info.nextday);
    formData.append("id", billId);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post("/user/postInfoPatient", formData, config).then((res) => {
      toast.success("Thành công");
      let c = postSuccessed + 1
      setPostSuccessed(c);
      setDisplayGetBill('block')
    });
  }

  function handleChange(e) {
    const { name } = e.target;
    const value = e.target.files ? e.target.files : e.target.value;
    let clone = { ...info };
    clone[name] = value;
    setInfo(clone);
  }
  function getHoaDon(){
    Axios.get(`/service/getDocx/${billId}`)
    .then( res  => {
      const blob = res.blob()
      download(blob, 'hoadon.docx')
    })
    .catch(err => {})
  }
  return (
    <div>
      <div
        className="overlay_background"
        style={{
          backgroundImage:
            "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)",
          maxHeight: "100px",
        }}
      ></div>
      <div className="patient_detail">
        <ToastContainer autoClose={1300} />
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group xs={1} controlId="formGridState">
              <Form.Label>Tuần</Form.Label>
              <Form.Control
                as="select"
                name="tuan"
                onChange={handleChange}
                value={info?.tuan}
              >
                <option>Chọn tuần</option>
                {tuan.map((t) => (
                  <option>{t}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Tình trạng bệnh nhân</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="tinhtrang"
                onChange={handleChange}
                value={info?.tinhtrang}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Ngày hẹn tiếp</Form.Label>
              <br/>
              <input
                type="date"
                name="nextday"
                onChange={handleChange}
                value={info?.nextday}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Thuốc</Form.Label>
              <Form.Control
                xs={2}
                name="thuoc"
                onChange={handleChange}
                value={info?.thuoc}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <input
              type="file"
              name="imgs"
              multiple
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="info" style={{display: `${displayGetBill}`}} onClick={getHoaDon}>Xuất hóa đơn</Button>
        </Form>
        {data.chitiet?.map((dt) => (
          <div className="week">
            <h1>Tuần số {dt.tuan}</h1>
            <span>Tình trạng: {dt.tinhtrang}</span>
            <br />
            <span>Thuốc: {dt.thuoc}</span>
            <br />
            <span>Ngày khám kế tiếp: {dt.nextDay}</span>
            <br />
            <span>Hình ảnh buổi khám:</span> <br />
            <div className="billDetail_img">
              {dt.img.map((image) => (
                <img src={image} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
