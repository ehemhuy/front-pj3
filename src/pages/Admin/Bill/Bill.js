import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "reactstrap";
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';

export default class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: []
        }
    }
    componentDidMount() {
        axios.get("/bill/getAllBills").then(res => {
            this.setState({
                bills: res.data
            });
            console.log(res.data)
        });
    }

    handleDelete = (e, index) => {
        var arr = this.state.bills;
        axios.delete(`/bill/deleteBill/${arr[index]._id}`).then(res => {
            toast.success('Successfully');
        });
        arr.splice(index, 1);
        this.setState({
            bills: arr
        });
    }
    handleEdit = (e, index) => {
        var arr = this.state.bills;
        axios.put(`/bill/updateStatus/${arr[index]._id}`).then(res => {
            console.log("ok")
        });
        arr[index].status = 1;
        this.setState({
            bills: arr
        });
    }
    render() {
        const { bills } = this.state
        return (
            <LayoutTableAdmin>
                <div>
                    <ToastContainer />
                    <div className="container-fluid" style={{ marginBottom: "70px" }}>
                        <h2>Thông tin đơn dịch vụ</h2>
                        <br />
                        <table className="listBill">
                            <thead>
                                <tr>
                                    <th width="10%">Tên dịch vụ</th>
                                    <th width="15%">Tên khách hàng</th>
                                    <th width="15%">Tên bác sĩ</th>
                                    <th width="10%">Lộ trình</th>
                                    <th width="10%">Giá</th>
                                    <th width="20%">Ngày tạo</th>
                                    {/* <th width="15%">Action</th> */}
                                </tr>
                            </thead>
                        </table>
                        {bills.map((bill, index) => (
                            <div key={index} className="bill" >
                                <table className="listBill">
                                    <tbody>
                                        <tr>
                                            <td width="10%">{bill.dichvu.name}</td>
                                            <td width="15%">{bill.user.firstName+" "+bill.user.lastName}</td>
                                            <td width="15%">{bill.bacsi.firstName+" "+bill.bacsi.lastName}</td>
                                            <td width="10%">{bill.dichvu.lotrinh} tuần</td>
                                            <td width="10%" style={{ color: '#eda84a', fontWeight: '700' }}>{bill.dichvu.price} đồng</td>
                                            <td width="20%">{bill._doc.createAt}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </LayoutTableAdmin>
        )
    }
}
