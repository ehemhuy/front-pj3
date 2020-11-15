import Axios from "axios";
import React from "react";
import { Button } from "reactstrap";
import LayoutTableAdmin from "../Layout/LayoutTableAdmin";
import { toast, ToastContainer } from 'react-toastify'

export default function Voucher() {
  const voucher = () => {
    Axios.get("/voucher/generateVoucher")
      .then((res) => {
        toast.success('Phát mã giảm giá thành công')
      })
      .catch((err) => {
          console.log(err)
      });
  };

  return (
      <LayoutTableAdmin>
        <ToastContainer autoClose={1300}/>
        <div class="category-admin">
          <h2>MÃ GIẢM GIÁ</h2>
          <br />
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#addCategory"
            onClick={() => voucher()}
          >
            Phát mã giảm giá
          </button>
        </div>
      </LayoutTableAdmin>
  );
}
