import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./Voucher.css";

export default function Voucher() {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Đã sao chép");
  }

  const [voucher, setVoucher] = useState([]);
  useEffect(() => {
    Axios.get("/user/seeVoucher")
      .then((res) => {
        setVoucher(res.data.voucher);
        console.log(voucher);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div
        className="overlay_background"
        style={{
          backgroundImage:
            "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)",
          maxHeight: "300px",
        }}
      >
        <div
          className="overlay_background1"
          style={{
            maxHeight: "300px",
          }}
        >
          <h2
            style={{
              fontFamily: "Lucida Sans Unicode, Courier, monospace",
              maxHeight: "300px",
            }}
          >
            Mã giảm giá
          </h2>
        </div>
      </div>
      <Container className="voucher">
        {voucher.length == 0 && (
          <div className="userVoucher">
            <h1>Bạn không có mã giảm giá</h1>
          </div>
        )}
        {voucher.length != 0 && (
          <div className="userVoucher">
            <h1>Mã giảm giá của bạn</h1>
            <div>
              {voucher &&
                voucher.map((v) => (
                  <Form.Control type="text" ref={textAreaRef} value={v} />
                ))}
            </div>
            <div>
              <Button onClick={copyToClipboard} className="btnCopy">
                Sao chép
              </Button>
              <span className="copied">{copySuccess}</span>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
