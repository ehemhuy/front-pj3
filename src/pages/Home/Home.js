import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardService: [],
      numberItems: 3,
    };
  }
  componentDidMount() {
    axios.get("/service/").then((res) => {
      this.setState({
        cardService: res.data,
      });
    });
  }
  componentWillMount() {
    if (window.innerWidth < 900) this.setState({ numberItems: 2 });
    if (window.innerWidth < 750) this.setState({ numberItems: 1 });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1000) this.setState({ numberItems: 3 });
      if (window.innerWidth < 1000) this.setState({ numberItems: 2 });
      if (window.innerWidth < 750) this.setState({ numberItems: 1 });
    });
  }
  render() {
    const { cardService, numberItems } = this.state;
    return (
      <div className="ContentHome">
        <Container>
          <h2 className="serviceTitle">Our spa</h2>
          <div className="tagLine">
            COME EXPERIENCE THE SECRETS OF RELAXATION.
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "80px",
            }}
          >
            <div className="divider"></div>
            <i className="fa fa-leaf iconLeaf"></i>
            <div className="divider"></div>
          </div>

          <Row style={{ marginBottom: "30px" }}>
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
                    <div className="cardService" style={{maxHeight: '800px'}}>
                      <img src={item.img} alt="our service" style={{maxHeight: '200px'}}></img>
                      <div className="serviceContent">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </OwlCarousel>
            )}
          </Row>

          <Row>
              <h3
                style={{
                  fontSize: "25px",
                  fontWeight: "300",
                  color: "#333333",
                  fontFamily: "Rubik, Helvetica, Arial, sans-serif",
                  marginLeft: "10px",
                  padding: "55px 0px 55px 0px",
                  textAlign: 'center'
                }}
              >
                “Không có người phụ nữ nào xấu, chỉ có người phụ nữ không biết làm cho mình trở thành quyến rũ mà thôi” – Christian Dior
              </h3>
          </Row>
        </Container>
        <div className="overlay_background">
          <div className="overlay_background1">
            <h2>The Infinity of Beauty & Indulgence</h2>
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
                <Link to="/services">VIEW OUR SERVICES</Link>
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
                <Link to="/services">VIEW OUR SERVICES</Link>
              </div>
            </Col>
          </Row>
        </Container>
        <div
          className="overlay_background"
          style={{
            marginTop: "60px",
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
