import { Slider, Typography } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      // popular: [
      //   {
      //     name: "Body Lotion",
      //     price: "59.00",
      //     img:
      //       "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-10-600x600.jpg",
      //   },
      //   {
      //     name: "Organic Bath",
      //     price: "99.00",
      //     img:
      //       "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-4-600x600.jpg",
      //   },
      //   {
      //     name: "Organic Scrub",
      //     price: "69.00",
      //     img:
      //       "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-2-600x600.jpg",
      //   },
      // ],
      value: [0, 10000000],
      start: 0,
      end: 10000000,
      count: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount = async () => {
    axios
      .get("/product")
      .then((res) => {
        console.log(res.data.length);
        this.setState({
          products: res.data,
          count: res.data.length,
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
    const { products, popular } = this.state;
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
                  // getAriaValueText={}
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
            <Col md="5"></Col>
            <Col md="3">
              <div style={{ marginTop: "70px" }}>
                Hiển thị {this.state.count} kết quả
              </div>
            </Col>
          </Row>

          <Row>
            {products.map(
              (product, index) =>
                product.price >= this.state.start &&
                product.price <= this.state.end && (
                  <Col md="3" style={{ marginTop: "20px" }} key={index}>
                    <Link to={`/product/${product._id}`} className="product">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img className="shop_product-img" src={product.imgUrl} alt="product"></img>
                      </div>
                      <h3>{product.name}</h3>
                      <p>${product.price}</p>
                    </Link>
                  </Col>
                )
            )}
          </Row>
          <hr></hr>
          {/* <h4
            style={{ textAlign: "center", marginTop: "40px", color: "#333333" }}
          >
            Popular
          </h4>
          <Row>
            {popular.map((item, index) => (
              <Col md="3" style={{ marginTop: "20px" }} key={index}>
                <Link to={`/product/${item._id}`} className="product">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={item.img} alt="product"></img>
                  </div>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </Link>
              </Col>
            ))}
          </Row> */}
        </Container>
      </div>
    );
  }
}

export default Shop;
