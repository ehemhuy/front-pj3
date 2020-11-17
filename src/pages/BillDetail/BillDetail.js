import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./BillDetail.css";
export default function BillDetail(props) {
  const billId = props.match.params.id;
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get(`/bill/getBillDetail/${billId}`).then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <div
        className="overlay_background"
        style={{
          backgroundImage:
            "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)",
            maxHeight: '100px'
        }}
      >
      </div>
      <div className="billDetail">
        {data.chitiet?.map((dt) => (
          <div className="week">
            <h1>Tuần số {dt.tuan}</h1>
            <span>Tình trạng: {dt.tinhtrang}</span>
            <br /><br/>
            <table className="thuoc_table">
              <tr>
                <td>#</td>
                <td>Tên thuốc</td>
                <td>Số lượng</td>
                <td>Cách dùng</td>
              </tr>
              {dt.thuoc?.map((t, index) => 
                <tr>
                  <td>{index}</td>
                  <td>{t.tenthuoc}</td>
                  <td>{t.soluong}</td>
                  <td>{t.cachdung}</td>
                </tr>
              )}
            </table>
            <br />
            <span>Ngày khám kế tiếp: {dt.nextDay}</span>
            <br />
            <span>Hình ảnh buổi khám:</span>
            <br />
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
