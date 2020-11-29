import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { Col, Container, Row, Input } from "reactstrap";
import "./Services.css";

export default class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardService: [],
      numberItems: 3,
      searchValue: "",
      searchData: [],
      displaySearch: "none",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.target.value === ""
      ? this.setState({ displaySearch: "none" })
      : this.setState({ displaySearch: "flex" });
    this.setState({ searchValue: e.target.value });
    axios
      .post("/service/searchService", { searchValue: e.target.value })
      .then((res) => {
        console.log(res.data);
        this.setState({ searchData: res.data });
      })
      .catch((err) => {});
  }

  componentDidMount() {
    axios.get("/service/").then((res) => {
      this.setState({
        cardService: res.data,
      });
      console.log(res.data);
    });
  }
  componentWillMount() {
    if (window.innerWidth < 900) this.setState({ numberItems: 2 });
    if (window.innerWidth < 750) this.setState({ numberItems: 1 });
    window.addEventListener("resize", () => {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
      if (window.innerWidth >= 1000) this.setState({ numberItems: 3 });
      if (window.innerWidth < 1000) this.setState({ numberItems: 2 });
      if (window.innerWidth < 750) this.setState({ numberItems: 1 });
    });
  }
  render() {
    const { cardService, numberItems, searchBox } = this.state;
    return (
      <div>
        <div
          className="overlay_background"
          style={{
            backgroundImage:
              "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/azure-spa2.jpg)",
          }}
        >
          <div className="overlay_background1">
            <h2>Our Services</h2>
          </div>
        </div>
        <Container className="service_search" style={{ marginTop: "40px" }}>
          <div className="service_searchBox">
            <Input
              className="inputSearch"
              type="text"
              placeholder="Tìm kiếm"
              value={searchBox}
              onChange={this.handleSearch}
            />
            <div
              className="service_searchResult"
              style={{ display: this.state.displaySearch }}
            >
              {this.state.searchData.map((result, index) => (
                <Link to={`/service/${result._id}`}>
                  <i className="fas fa-arrow-right"></i>
                  <span> &nbsp;{result.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
        <Container>
          <Row style={{ marginBottom: "30px", marginTop: "40px" }}>
            {cardService.length && (
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
                items={numberItems}
              >
                {cardService.map((item, index) => (
                  <Col key={index}>
                    <div className="cardService">
                      <img
                        src={item.img}
                        alt="our service"
                        className="cardService-img"
                      ></img>
                      <div className="serviceContent">
                        <h3>{item.name}</h3>
                        <p
                          style={{
                            width: "250px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.description}
                        </p>
                        <Link to={`/service/${item._id}`} className="readmore">
                          Xem thêm ..
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </OwlCarousel>
            )}
          </Row>
        </Container>

        <div
          className="overlay_background"
          style={{
            marginTop: "40px",
            backgroundImage:
              "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/05/p1270064.jpg)",
          }}
        >
          <div className="overlay_background1">
            <h2>Come experience the secrets of relaxation.</h2>
            <div className="comex">
              COME EXPERIENCE THE SECRETS OF RELAXATION.
            </div>
          </div>
        </div>

        <Container style={{ marginTop: "50px" }}>
          <Row>
            <Col lg="6">
              <div className="secret_text">
                <h2>Secrets of relaxation</h2>
                <p>
                  Drinking vinegar stumptown yr pop-up artisan sunt. Deep v
                  cliche lomo biodiesel Neutra selfies. Shorts fixie consequat
                  flexitarian four loko tempor duis single-origin coffee.
                  Banksy, elit small batch freegan sed. Aenean massa. Cum sociis
                  natoque penatibus eur ridiculus mus
                </p>
                <a href="ok"></a>
              </div>
            </Col>
            <Col lg="6">
              <div className="secret_img"></div>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col lg="6">
              <div className="secret_img_second"></div>
            </Col>
            <Col lg="6">
              <div className="secret_text">
                <h2>Satisfying our clients</h2>
                <p>
                  Drinking vinegar stumptown yr pop-up artisan sunt. Deep v
                  cliche lomo biodiesel Neutra selfies. Shorts fixie consequat
                  flexitarian four loko tempor duis single-origin coffee.
                  Banksy, elit small batch freegan sed. Aenean massa. Cum sociis
                  natoque penatibus eur ridiculus mus
                </p>
                <a href="ok"></a>
              </div>
            </Col>
          </Row>
        </Container>
        <div
          className="overlay_background"
          style={{
            marginTop: "60px",
            marginBottom: "1px",
            backgroundImage:
              "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/eforea-Relaxation-Room.jpg",
          }}
        >
          <div className="overlay_background1">
            <h2>Relaxation. No longer beyond your budget</h2>
            <div className="comex">
              COME EXPERIENCE THE SECRETS OF RELAXATION.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
