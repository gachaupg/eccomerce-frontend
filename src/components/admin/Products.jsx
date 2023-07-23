import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ProductList from "../List/ProductTable";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdminHeaders>
        <h2>Products</h2>
        <PrimaryButton
          onClick={() => navigate("/admin/products/create-product")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
      <ProductList/>
    </>
  );
};

export default Products;


