import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import "./About.css";

class About extends Component {
    render() {
        return (
            <div>
                <div className="overlay_background" style={{ backgroundImage: "url(./about.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>About Us</h2>
                        <div className="comex">COME EXPERIENCE THE SECRETS OF RELAXATION.</div>
                    </div>
                </div>
                <Container>
                    <h2 className="commitment">Châm ngôn của chúng tôi</h2>
                    <h3 className="commitment_content">“Hãy đợi hoàng hôn để thấy cái đẹp của buổi bình minh và hãy đợi tuổi già để hiểu thế nào là một người phụ nữ đẹp.”</h3>
                    <div style={{ textAlign: "center", marginTop: '40px', marginBottom: '80px' }}>
                        <div className="divider"></div>
                        <i className="fa fa-leaf iconLeaf"></i>
                        <div className="divider"></div>
                    </div>
                </Container>
                <Container fluid>
                    <Row style={{ marginRight: '30px', marginLeft: '30px' }}>
                        <Col md="6">
                            <div className="cardAbout" >
                                <h2>PACKAGE & PRICING</h2>
                                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/how-can-make-sure-prenatal-massage-safe-2160X1200-1024x569.jpg"></img>
                                <p>Nơi người phụ nữ quyến rũ lòng người nhất không phải là cái đẹp mà là sự cao quý.</p>
                                <a href="/">VIEW PRICING</a>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="cardAbout" >
                                <h2>OUR SPA</h2>
                                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/slice-1-1024x569.jpg"></img>
                                <p>Hạnh phúc là bí mật làm nên mọi nét đẹp. Không nhan sắc nào có thể thu hút mà không song hành cùng hạnh phúc.</p>
                                <a href="/">VIEW PRICING</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="overlay_background" style={{ marginTop: '40px', backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/05/p1270064.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>Our Team</h2>
                        <div className="comex">COME EXPERIENCE THE SECRETS OF RELAXATION.</div>
                    </div>
                </div>
                <Container fluid>
                    <Row style={{ margin: '30px' }}>
                        <Col md="4">
                            <div className="member">
                                <div className="bao_chu_anh" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                    <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/05/team-9-2-610x610.jpg"></img>
                                    <ul>
                                        <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="/"><i className="fab fa-facebook"></i></a></li>
                                        <li><a href="/"><i className="fab fa-google"></i></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </div>

                                <h4>Nguyễn Tâm Anh</h4>
                                <div className="major">MASSAGE SPECIALIST</div>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                natoque penatibus eur ridiculus mus.</p>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="member">
                                <div className="bao_chu_anh" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                    <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/team-11-2-610x610.jpg"></img>
                                    <ul>
                                        <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="/"><i className="fab fa-facebook"></i></a></li>
                                        <li><a href="/"><i className="fab fa-google"></i></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </div>
                                <h4>Lê Minh Tâm</h4>
                                <div className="major">SKIN SPECIALIST</div>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                natoque penatibus eur ridiculus mus.</p>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="member">
                                <div className="bao_chu_anh" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                    <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/team-12-2-610x610.jpg"></img>
                                    <ul>
                                        <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="/"><i className="fab fa-facebook"></i></a></li>
                                        <li><a href="/"><i className="fab fa-google"></i></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </div>
                                <h4>Phan Trường Sơn</h4>
                                <div className="major">THERAPEUTIC SPECIALIT</div>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                natoque penatibus eur ridiculus mus.</p>
                            </div>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center", marginTop: '40px', marginBottom: '80px' }}>
                        <div className="divider"></div>
                        <i className="fa fa-leaf iconLeaf"></i>
                        <div className="divider"></div>
                    </div>
                    <Row style={{ marginRight: '30px', marginLeft: '30px' }}>
                        <Col md="6">
                            <div className="cardAbout" >
                                <h2>OUR PHILOSOPHY</h2>
                                <h5>"Những bộ quần áo mà bạn mặc không bao giờ làm cho bạn đẹp lên. Chính bạn đã làm cho chúng trở nên đẹp hơn."</h5>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="cardAbout" >
                                <h2>BEST QUALITY</h2>
                                <h5>"Cá tính. Sự thông minh. Sức mạnh. Phong cách. Đó là những điều làm nên vẻ đẹp"</h5>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default About;
