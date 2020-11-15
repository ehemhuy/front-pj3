import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  PrivateRoute,
  PublicRouter,
} from "./components/CustomRouter/CustomRouter";
import Footer from "./components/footer/Footer";
import Layout from "./components/Layout/Layout";
import Slidebar from "./components/slidebar/Slidebar";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import About from "./pages/About/About";
import Admin from "./pages/Admin/AdminIndex";
import Voucher from "./pages/User/Voucher/Voucher";
import Booking from "./pages/Booking/Booking";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Flow from "./pages/Gallery/Flow/Flow";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MembershipCards from "./pages/MembershipCards/MembershipCards";
import Register from "./pages/Register/Register";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import Services from "./pages/Services/Services";
import Shop from "./pages/Shop/Shop";
import Success from "./pages/Success/Success";
import ChangePass from "./pages/User/ChangePass/ChangePass";
import HistoryBooking from "./pages/User/HistoryBooking/HistoryBooking";
import Order from "./pages/User/Order/Oder";
import Profile from "./pages/User/Profile/Profile";
import ScrollToTop from "./scrollToTop";
import Patients from "./pages/User/Patients/Patients";
import PatientDetail from "./pages/PatientDetail/PatientDetail";
import BillDetail from "./pages/BillDetail/BillDetail";
function App() {
  return (
    <CartProvider>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <Switch>
            <PublicRouter path="/admin">
              <Admin />
              <Footer />
            </PublicRouter>

            <Layout>
              <Switch>
                <PublicRouter exact path="/">
                  <Slidebar />
                  <Home />
                </PublicRouter>

                <PublicRouter exact path="/gallery">
                  <Slidebar />
                  <Flow />
                </PublicRouter>

                <PublicRouter exact path="/services">
                  <Services />
                </PublicRouter>

                <PublicRouter exact path="/contact">
                  <Contact />
                </PublicRouter>

                <PublicRouter exact path="/about">
                  <About />
                </PublicRouter>
{/* 
                <PrivateRoute path="/booking">
                  <Booking />
                </PrivateRoute> */}

                <PublicRouter exact path="/shop">
                  <Shop />
                </PublicRouter>

                <PublicRouter exact path="/membershipcards">
                  <MembershipCards />
                </PublicRouter>

                <PublicRouter path="/product/:id" exact component={Detail} />
                <PublicRouter path="/user/patients/:id" exact component={PatientDetail} />
                <PublicRouter path="/bill/billDetail/:id" exact component={BillDetail} />
                <Route path="/service/:id" exact component={ServiceDetail} />
                <PrivateRoute path="/cart">
                  <Cart />
                </PrivateRoute>

                <PrivateRoute exact path="/user/profile">
                  <Profile />
                </PrivateRoute>

                <PrivateRoute exact path="/user/order">
                  <Order />
                </PrivateRoute>

                <PrivateRoute exact path="/success">
                  <Success />
                </PrivateRoute>

                <PrivateRoute exact path="/user/historyBooking">
                  <HistoryBooking />
                </PrivateRoute>

                <PrivateRoute exact path="/user/changepass">
                  <ChangePass />
                </PrivateRoute>
                <PrivateRoute exact path="/user/patients">
                  <Patients />
                </PrivateRoute>
                <PrivateRoute exact path="/user/seeVoucher">
                  <Voucher />
                </PrivateRoute>

                <PublicRouter
                  restricted={true}
                  path="/login"
                  component={Login}
                />
                <PublicRouter
                  restricted={true}
                  path="/register"
                  component={Register}
                />
              </Switch>
            </Layout>
          </Switch>
        </Router>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
