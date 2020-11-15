import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src="/adminlte/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: "0.8" }}
        />
        <span className="brand-text font-weight-light">Spa</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a className="nav-link">
                <i className="nav-icon fab fa-product-hunt"></i>
                <p>
                  <Link to="/admin/product">Sản phẩm</Link>
                </p>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <i className="nav-icon fas fa-home"></i>
                <p>
                  <Link to="/admin/category">Lọai sản phẩm</Link>
                </p>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <i className="nav-icon fa fa-cart-plus"></i>
                <p>
                  <Link to="/admin/order">Thông tin đơn mua</Link>
                </p>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <i className="nav-icon fa fa-user"></i>
                <p>
                  <Link to="/admin/user">Người dùng</Link>
                </p>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <i className="nav-icon fas fa-file-invoice-dollar"></i>
                <p>
                  <Link to="/admin/bill">Thông tin đơn dịch vụ</Link>
                </p>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                <i className="nav-icon fas fa-spa"></i>
                <p>
                  <Link to="/admin/services">Các dịch vụ</Link>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="nav-icon fa fa-cart-plus"></i>
                <p>
                  <Link to="/admin/voucher">Mã giảm giá</Link>
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
