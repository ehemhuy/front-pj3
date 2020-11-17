import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Col, Button, InputGroup, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./PatientDetail.css";
import download from "downloadjs";

export default function PatientDetail(props) {
  const billId = props.match.params.id;
  const [numThuoc, setNumThuoc] = useState([
    { tenthuoc: "", soluong: "", cachdung: "" },
  ]);
  const [data, setData] = useState({});
  const [tuan, setTuan] = useState([]);
  const [thuoc, setThuoc] = useState([]);
  const [info, setInfo] = useState(null);
  const [postSuccessed, setPostSuccessed] = useState(0);
  const [displayGetBill, setDisplayGetBill] = useState("none");
  useEffect(() => {
    Axios.get(`/user/patients/${billId}`)
      .then((res) => {
        for (let i = 1; i <= res.data.data.lotrinh; i++) tuan.push(i);
        setData(res.data.data);
        setThuoc(res.data.data.chitiet);
        console.log(res.data.data);
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
    formData.append("thuoc", JSON.stringify(numThuoc));
    formData.append("nextday", info.nextday);
    formData.append("id", billId);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post("/user/postInfoPatient", formData, config).then((res) => {
      toast.success("Thành công");
      let c = postSuccessed + 1;
      setPostSuccessed(c);
      setDisplayGetBill("block");
    });
  }

  function handleChange(e) {
    const { name } = e.target;
    const value = e.target.files ? e.target.files : e.target.value;
    let clone = { ...info };
    clone[name] = value;
    setInfo(clone);
  }
  function getHoaDon() {
    Axios.get(`/service/getDocx/${billId}`)
      .then((res) => {
        const blob = res.blob();
        download(blob, "hoadon.docx");
      })
      .catch((err) => {});
  }

  const handleRemoveClick = (index) => {
    const list = [...numThuoc];
    list.splice(index, 1);
    setNumThuoc(list);
  };

  const handleAddClick = () => {
    setNumThuoc([...numThuoc, { tenthuoc: "", soluong: "", cachdung: "" }]);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...numThuoc];
    list[index][name] = value;
    setNumThuoc(list);
  };
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
              <br />
              <input
                type="date"
                name="nextday"
                onChange={handleChange}
                value={info?.nextday}
                required
              />
            </Form.Group>
          </Form.Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Cách dùng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {numThuoc.map((n, index) => (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        name="tenthuoc"
                        onChange={(e) => handleInputChange(e, index)}
                        value={n.tenthuoc}
                        required
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="soluong"
                        onChange={(e) => handleInputChange(e, index)}
                        value={n.soluong}
                        required
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        name="cachdung"
                        onChange={(e) => handleInputChange(e, index)}
                        value={n.cachdung}
                        required
                      />
                    </td>
                    <td>
                      {numThuoc.length !== 1 && (
                        <Button variant="warning" onClick={() => handleRemoveClick(index)}>
                          Remove
                        </Button>
                      )}
                    </td>
                  </tr>
                  <div className="btn-box">
                    {numThuoc.length - 1 === index && (
                      <Button onClick={handleAddClick}>Add</Button>
                    )}
                  </div>
                </>
              ))}
            </tbody>
          </Table>

          <Form.Group>
            <Form.Label>Ảnh bệnh nhân :</Form.Label>
            <br></br>
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
          <Button
            variant="info"
            style={{ display: `${displayGetBill}` }}
            onClick={getHoaDon}
          >
            Xuất hóa đơn
          </Button>
        </Form>
        {data.chitiet?.map((dt) => (
          <div className="week">
            <h1>Tuần số {dt.tuan}</h1>
            <span>Tình trạng: {dt.tinhtrang}</span>
            <br />
            <table className="thuoc_table">
              <tr>
                <td>#</td>
                <td>Tên thuốc</td>
                <td>Số lượng</td>
                <td>Cách dùng</td>
              </tr>
              {dt.thuoc?.map((t, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{t.tenthuoc}</td>
                  <td>{t.soluong}</td>
                  <td>{t.cachdung}</td>
                </tr>
              ))}
            </table>
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
