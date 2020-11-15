import TextField from "@material-ui/core/TextField";
import axios from "axios";
import CKEditor from "ckeditor4-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FormGroup,

    Input, Label
} from "reactstrap";
import LayoutTableAdmin from "../Layout/LayoutTableAdmin";


function convertStringLong(string) {
  console.log("độ dài là ", string.length);
  if (string.length > 93) {
    let clone = string.slice(0, 93);
    return clone.concat("...");
  } else return string;
}

function Product(props) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios.get("/product").then((res) => {
      console.table(res.data);
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/category").then((res) => {
      console.table(res.data);
      setCategories(res.data);
    });
  }, []);

  function handleNew(e) {
    let { name } = e.target;
    let value = e.target.files ? e.target.files[0] : e.target.value;
    let add = { ...newProduct };
    add[name] = value;
    console.log(add)
    setNewProduct(add);
  }

  function handleAddDescription(e) {
    let add = { ...newProduct };
    add.description = e.editor.getData();
    setNewProduct(add);
  }

  function convertFormData(data) {
    let formDataNew = new FormData();
    Object.keys(data).forEach((key) => {
      formDataNew.append(key, data[key]);
      // console.log(key + "=" + data[key])
    });

    return formDataNew;
  }

  function preAdd() {
    setNewProduct(null);
    if (categories && categories.length > 0)
      setNewProduct({ category: categories[0]._id });
  }

  function addProduct() {
    console.table(newProduct);
    let preForm = convertFormData(newProduct);
    axios
      .post("/product", preForm)
      .then((res) => {
        let productsNew = [...products];
        productsNew.push(res.data);
        setProducts(productsNew);
        toast.success("Thêm sản phẩm thành công");
      })
      .catch((err) => {
        toast.error("thêm sản phẩm thất bại");
      });

    console.table(newProduct);
  }

  function deleteProduct(index, product) {
    axios
      .delete(`/product/${product._id}`)
      .then((res) => {
        let productsNew = [...products];
        productsNew.splice(index, 1);
        setProducts(productsNew);
        toast.success("xoá thành công");
      })
      .catch((err) => {
        toast.error("xoá sản phẩm thất bại");
      });
  }

  function handleEditDescription(e) {
    let add = { ...newProduct };
    add.description = e.editor.getData();
    setNewProduct(add);
  }

  function handleEdit(e) {
    let { name } = e.target;
    let value = e.target.files ? e.target.files[0] : e.target.value;
    let edit = { ...editProduct };
    edit[name] = value;
    setEditProduct(edit);
  }

  function preEdit(index) {
    let currentProduct = { ...products[index] };
    if (currentProduct.category._id)
      currentProduct.category = currentProduct.category._id;
    setEditProduct(currentProduct);
  }

  function onEditProduct() {
    let cloneEditProduct = { ...editProduct };
    const index = products.findIndex(
      (product) => product._id === editProduct._id
    );
    console.log("index", index);
    let preForm = convertFormData(cloneEditProduct);
    axios
      .patch(`/product/${cloneEditProduct._id}`, preForm)
      .then((res) => {
        let productsNew = [...products];
        productsNew.splice(index, 1, res.data);
        setProducts(productsNew);
        toast.success("sửa sản phẩm thành công");
      })
      .catch((err) => {
        toast.error("sửa sản phẩm thất bại");
      });

    console.table(cloneEditProduct);
    console.log(
      "category hiện tại",
      categories.find((e) => e._id == cloneEditProduct.category)
    );
  }

  return (
    <>
      <LayoutTableAdmin>
        <ToastContainer autoClose={1300}/>

        <div class="product-admin">
          <h2>Các sản phẩm</h2>
          <br />
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#addProduct"
            onClick={(e) => preAdd()}
          >
            <i class="fas fa-plus"></i>&ensp;Thêm sản phẩm
          </button>

          <div className="card">
            <table class="table table-hover " id="">
              <thead>
                <tr className="">
                  <th>ID</th>
                  <th>Image</th>
                  <th>Tên sản phẩm</th>
                  {/* <th>Description</th> */}
                  <th>Tổng quan</th>
                  <th>Giá</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr className="row-table-custom">
                      <td>{index}</td>
                      <td>
                        <Link to={`/product/${product._id}`}>
                          <img src={product.imgUrl} width={64} height={64} />
                        </Link>
                      </td>
                      <td>{product.name}</td>
                      {/* <td><a href="">Detail</a></td> */}
                      <td width={400}>{convertStringLong(product.summary)}</td>

                      <td>{product.price}</td>
                      <td>
                        <form class="form-group">
                          <button
                            type="button"
                            class="btn btn-success mr-2"
                            data-toggle="modal"
                            data-target="#editProduct"
                            onClick={(e) => preEdit(index)}
                          >
                            <i class="far fa-edit"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={(e) => deleteProduct(index, product)}
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </LayoutTableAdmin>

      <div class="modal fade" id="addProduct">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thêm sản phẩm</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <form>
                <TextField
                  id="name"
                  label="Tên sản phẩm"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={newProduct?.name || ""}
                  onChange={handleNew}
                  autoFocus
                  margin="normal"
                />

                <TextField
                  id="price"
                  label="Giá"
                  name="price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={newProduct?.price || ""}
                  onChange={handleNew}
                  margin="normal"
                />

                <TextField
                  id="summary"
                  label="Tổng quan"
                  name="summary"
                  multiline
                  rowsMax={4}
                  variant="outlined"
                  fullWidth
                  value={newProduct?.summary || ""}
                  onChange={handleNew}
                  margin="normal"
                />

                <div class="form-group">
                  <label for="category">Danh mục</label>
                  <select
                    class="form-control"
                    id="category"
                    name="category"
                    onChange={handleNew}
                    value={newProduct?.category}
                  >
                    {categories.map((category, index) => (
                      <option value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <FormGroup>
                  <Label for="imgUrl">Chọn ảnh</Label>
                  <Input
                    onChange={handleNew}
                    type="file"
                    name="imgUrl"
                    placeholder="chọn ảnh"
                  />
                </FormGroup>

                <label htmlFor="contained-button-file">
                  Mô tả
                  <CKEditor
                    data={newProduct?.description || ""}
                    name="description"
                    onChange={handleAddDescription}
                  />
                </label>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={addProduct}
                data-dismiss="modal"
              >
                Thêm
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="editProduct">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Sửa</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              {editProduct && (
                <form>
                  <TextField
                    id="name"
                    label="Tên sản phẩm"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={editProduct.name}
                    onChange={handleEdit}
                    autoFocus
                    margin="normal"
                  />

                  <TextField
                    id="price"
                    label="Giá"
                    name="price"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={editProduct.price}
                    onChange={handleEdit}
                    margin="normal"
                  />

                  <TextField
                    id="summary"
                    label="Tổng quan"
                    name="summary"
                    multiline
                    rowsMax={4}
                    variant="outlined"
                    fullWidth
                    value={editProduct.summary}
                    onChange={handleEdit}
                    margin="normal"
                  />

                  <div class="form-group">
                    <label for="category">Danh mục</label>
                    <select
                      class="form-control"
                      id="category"
                      name="category"
                      onChange={handleEdit}
                      value={editProduct?.category || editProduct?.category._id}
                    >
                      {categories.map((category, index) => (
                        <option value={category._id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <FormGroup>
                    <Label for="imgUrl">Chọn ảnh</Label>
                    <Input
                      onChange={handleEdit}
                      type="file"
                      name="imgUrl"
                      placeholder="chọn ảnh"
                    />
                  </FormGroup>
                  <label htmlFor="contained-button-file">
                    Mô tả
                    <CKEditor
                      name="description"
                      data={editProduct?.description || null}
                      onChange={handleEditDescription}
                    />
                  </label>
                </form>
              )}
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={onEditProduct}
                data-dismiss="modal"
              >
                <i class="far fa-save"></i>&ensp;Lưu
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
