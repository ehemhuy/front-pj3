import React, { Component } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutTableAdmin from "../Layout/LayoutTableAdmin";

export default class ServicesAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      isOpenModal: false,
      isOpenModal1: false,

      select: null,
      tmp: null,

      service: "",
      price: "",
      lotrinh: "",
      description: "",
      img: "",

      newService: "",
      newPrice: "",
      newLotrinh: "",
      newDescription: "",
      newImg: "",
    };
  }
  componentDidMount() {
    axios.get("/service").then((res) => {
      this.setState({
        services: res.data,
      });
    });
  }
  toggle = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  toggle1 = () => {
    this.setState({
      isOpenModal1: !this.state.isOpenModal1,
    });
  };

  handleShowEdit = async (e, index) => {
    await this.setState({
      isOpenModal: !this.state.isOpenModal,
      tmp: index,
      select: this.state.services[index],
      service: this.state.services[index].name,
      price: this.state.services[index].price,
      lotrinh: this.state.services[index].lotrinh,
      description: this.state.services[index].description,
    });
  };

  handleDelete = (e, index) => {
    var arr = this.state.services;
    axios.delete(`/service/deleteService/${arr[index]._id}`).then((res) => {
      toast.success("Successfully");
    });
    arr.splice(index, 1);
    this.setState({
      services: arr,
    });
  };
  handleChangeEdit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleEditImg = async (e) => {
    e.preventDefault();
    await this.setState({
      img: e.target.files[0],
    });
  };
  handleSubmitEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", this.state.img);
    formData.append("service", this.state.service);
    formData.append("price", this.state.price);
    formData.append("lotrinh", this.state.lotrinh);
    formData.append("description", this.state.description);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .put(`/service/updateService/${this.state.select._id}`, formData, config)
      .then((res) => {
        let arr = this.state.services;
        arr[this.state.tmp].name = this.state.service;
        arr[this.state.tmp].description = this.state.description;
        arr[this.state.tmp].price = this.state.price;
        arr[this.state.tmp].lotrinh = this.state.lotrinh;
        arr[this.state.tmp].img = res.data.img;

        this.setState({
          isOpenModal: !this.state.isOpenModal,
          services: arr,
        });
        toast.success("Successfully edited");
      });
  };

  handleChangeNew = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleChangeNewImg = async (e) => {
    e.preventDefault();
    await this.setState({
      newImg: e.target.files[0],
    });
  };
  handleSubmitNewService = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", this.state.newImg);
    formData.append("name", this.state.newService);
    formData.append("price", this.state.newPrice);
    formData.append("lotrinh", this.state.newLotrinh);
    formData.append("description", this.state.newDescription);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post("/service/serviceCreate", formData, config).then((res) => {
      let arr = this.state.services;
      console.log(res.data);
      arr.push(res.data);
      this.setState({
        isOpenModal1: !this.state.isOpenModal1,
        services: arr,
      });
      toast.success("Successfully");
    });
  };

  render() {
    const { services, select } = this.state;
    return (
      <LayoutTableAdmin>
        <div>
          <ToastContainer />
          <div className="container-fluid" style={{ marginBottom: "70px" }}>
            <h2>Các dịch vụ</h2>
            <br />
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#addCategory"
              onClick={this.toggle1}
            >
              <i class="fas fa-plus"></i>&ensp;Thêm dịch vụ
            </button>
            <table className="listBill">
              <thead>
                <tr>
                  <th width="20%">Img</th>
                  <th width="15%">Tên dịch vụ</th>
                  <th width="15%">Lộ trình</th>
                  <th width="20%">Mô tả</th>
                  <th width="10%">Giá</th>
                  <th width="20%">Action</th>
                </tr>
              </thead>
            </table>
            {services.map((item, index) => (
              <div key={index} className="bill">
                <table className="listBill">
                  <tbody>
                    <tr>
                      <td width="20%">
                        <img
                          src={item.img}
                          style={{ width: "70%", paddingBottom: "10px" }}
                        ></img>
                      </td>
                      <td width="15%">{item.name}</td>
                      <td width="15%">{item.lotrinh}</td>
                      <td width="20%" style={{ paddingRight: "8px" }}>
                        {item.description}
                      </td>
                      <td
                        width="10%"
                        style={{ color: "#eda84a", fontWeight: "700" }}
                      >
                        ${item.price}
                      </td>
                      <td width="20%">
                        
                        <a href>
                          <Button
                            onClick={(e) => this.handleShowEdit(e, index)}
                            style={{
                              backgroundColor: "rgb(69, 189, 62)",
                              border: "none",
                              textAlign: "center",
                              marginBottom: "10px",
                              width: "90px",
                            }}
                          >
                            <i className="fas fa-edit"></i> Sửa
                          </Button>
                        </a>
                        <a href>
                          <Button
                            onClick={(e) => this.handleDelete(e, index)}
                            style={{
                              backgroundColor: "rgb(194, 12, 36)",
                              border: "none",
                              textAlign: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <i className="fas fa-trash-alt"></i> Xóa
                          </Button>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              <p className="modalHeader">Sửa</p>
            </ModalHeader>
            <ModalBody>
              <form noValidate autoComplete="off">
                {this.state.select && (
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    defaultValue={select.name}
                    name="service"
                    onChange={this.handleChangeEdit}
                    label="Tên dịch vụ"
                    variant="filled"
                  />
                )}
                {this.state.select && (
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    defaultValue={select.price}
                    name="price"
                    onChange={this.handleChangeEdit}
                    label="Giá"
                    variant="filled"
                  />
                )}
                {this.state.select && (
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    defaultValue={select.lotrinh}
                    name="lotrinh"
                    onChange={this.handleChangeEdit}
                    label="Lộ trình( Tuần )"
                    variant="filled"
                  />
                )}
                {this.state.select && (
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    defaultValue={select.description}
                    name="description"
                    onChange={this.handleChangeEdit}
                    label="Mô tả"
                    variant="filled"
                  />
                )}
                <input
                  type="file"
                  name="img"
                  style={{ marginTop: "12px" }}
                  onChange={this.handleEditImg}
                ></input>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.handleSubmitEdit}>
                Xác nhận
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Hủy
              </Button>
            </ModalFooter>
          </Modal>

          {/* modal new service */}
          <Modal isOpen={this.state.isOpenModal1} toggle={this.toggle1}>
            <ModalHeader toggle={this.toggle1}>
              <p className="modalHeader">Thêm dịch vụ</p>
            </ModalHeader>
            <ModalBody>
              <form noValidate autoComplete="off">
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  name="newService"
                  onChange={this.handleChangeNew}
                  label="Tên dịch vụ"
                  variant="filled"
                />
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  name="newPrice"
                  onChange={this.handleChangeNew}
                  label="Giá"
                  variant="filled"
                />
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  name="newLotrinh"
                  onChange={this.handleChangeNew}
                  label="Lộ trình( Tuần )"
                  variant="filled"
                />
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  name="newDescription"
                  onChange={this.handleChangeNew}
                  label="Mô tả"
                  variant="filled"
                />
                <input
                  type="file"
                  name="newImg"
                  onChange={this.handleChangeNewImg}
                  style={{ marginTop: "12px" }}
                ></input>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.handleSubmitNewService}>
                Submit
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle1}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </LayoutTableAdmin>
    );
  }
}
