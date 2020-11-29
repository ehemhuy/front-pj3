import { Slider, Typography } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import "./Shop.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      value: [0, 10000000],
      start: 0,
      end: 10000000,
      count: null,
      category: "Tất cả",
      country: "Tất cả",
      listCate: [],
      listCountry: [
        "Việt Nam",
        "Trung Quốc",
        "Nhật Bản",
        "Hàn Quốc",
        "Mỹ",
        "Nước khác",
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleFilterCountry = this.handleFilterCountry.bind(this);
  }

  componentDidMount = async () => {
    axios
      .get("/product")
      .then((res) => {
        console.log(res.data);
        this.setState({
          products: res.data.listProduct,
          listCate: res.data.cate,
          count: res.data.listProduct.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange(e, newValue) {
    this.setState({
      value: newValue,
    });
  }
  handleFilter(event) {
    this.setState({ category: event.target.value });
  }
  handleFilterCountry(event) {
    this.setState({ country: event.target.value });
  }
  handleClick(e) {
    this.setState({
      start: this.state.value[0],
      end: this.state.value[1],
      count: this.state.dem,
    });
    let tmp = 0;
    this.state.products.forEach((item) => {
      if (
        item.price >= this.state.value[0] &&
        item.price <= this.state.value[1]
      ) {
        tmp++;
      }
    });
    this.setState({
      count: tmp,
    });
  }
  render() {
    const { products, category, country } = this.state;
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
            <h2>Cửa hàng</h2>
          </div>
        </div>
        <Container fluid>
          <Row>
            <Col md="4">
              <div style={{ marginLeft: "6%" }}>
                <Typography
                  id="range-slider"
                  gutterBottom
                  style={{ marginTop: "40px", fontWeight: "700" }}
                >
                  Lọc theo giá
                </Typography>
                <Slider
                  value={this.state.value}
                  max={10000000}
                  min={0}
                  onChange={this.handleChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  style={{ width: "100%", color: "#444", display: "block" }}
                />
                <Button
                  type="submit"
                  onClick={this.handleClick}
                  style={{
                    display: "inline-block",
                    color: "#515151",
                    backgroundColor: "#ebe9eb",
                    fontSize: "15px",
                    borderColor: "#ebe9eb",
                  }}
                >
                  Lọc
                </Button>
                <b
                  style={{
                    display: "inline-block",
                    float: "right",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginTop: "10px",
                  }}
                >
                  Giá: {this.state.value[0]}-{this.state.value[1]} đồng
                </b>
              </div>
            </Col>
            <Col md="3">
              <div style={{ marginTop: "45px" }}>
                <FormControl style={{ margin: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-label">
                    Lọc theo danh mục
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.category}
                    onChange={this.handleFilter}
                  >
                    <MenuItem value="Tất cả">Tất cả</MenuItem>
                    {this.state.listCate.map((c) => (
                      <MenuItem value={c.name}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Col>
            <Col md="3">
              <div style={{ marginTop: "45px" }}>
                <FormControl style={{ margin: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-label">
                    Lọc theo quốc gia
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.country}
                    onChange={this.handleFilterCountry}
                  >
                    <MenuItem value="Tất cả">Tất cả</MenuItem>
                    {this.state.listCountry.map((c) => (
                      <MenuItem value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Col>
            <Col md="2">
              {/* <div style={{ marginTop: "70px" }}>
                Hiển thị {this.state.count} kết quả
              </div> */}
            </Col>
          </Row>

          <Row>
            {category === "Tất cả" &&
              country === "Tất cả" &&
              products.map(
                (product, index) =>
                  product.price >= this.state.start &&
                  product.price <= this.state.end && (
                    <Col className="product-item" md="3" style={{ marginTop: "20px" }} key={index}>
                      <Link to={`/product/${product._id}`} className="product">
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            className="shop_product-img"
                            src={product.imgUrl}
                            alt="product"
                          ></img>
                        </div>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                      </Link>
                    </Col>
                  )
              )}
            {country !== "Tất cả" &&
              category === "Tất cả" &&
              products.map(
                (product, index) =>
                  product.price >= this.state.start &&
                  product.price <= this.state.end &&
                  product.country == country && (
                    <Col className="product-item" md="3" style={{ marginTop: "20px" }} key={index}>
                      <Link to={`/product/${product._id}`} className="product">
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            className="shop_product-img"
                            src={product.imgUrl}
                            alt="product"
                          ></img>
                        </div>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                      </Link>
                    </Col>
                  )
              )}
            {category !== "Tất cả" &&
              country === "Tất cả" &&
              products.map(
                (product, index) =>
                  product.price >= this.state.start &&
                  product.price <= this.state.end &&
                  product.category.name == category && (
                    <Col className="product-item" md="3" style={{ marginTop: "20px" }} key={index}>
                      <Link to={`/product/${product._id}`} className="product">
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            className="shop_product-img"
                            src={product.imgUrl}
                            alt="product"
                          ></img>
                        </div>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                      </Link>
                    </Col>
                  )
              )}
            {category !== "Tất cả" &&
              country !== "Tất cả" &&
              products.map(
                (product, index) =>
                  product.price >= this.state.start &&
                  product.price <= this.state.end &&
                  product.category.name == category &&
                  product.country == country && (
                    <Col className="product-item" md="3" style={{ marginTop: "20px" }} key={index}>
                      <Link to={`/product/${product._id}`} className="product">
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            className="shop_product-img"
                            src={product.imgUrl}
                            alt="product"
                          ></img>
                        </div>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                      </Link>
                    </Col>
                  )
              )}
          </Row>
          <hr></hr>
        </Container>
      </div>
    );
  }
}

export default Shop;
