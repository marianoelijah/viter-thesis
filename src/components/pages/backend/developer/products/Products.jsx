import { setIsAdd } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { Plus } from "lucide-react";
import React from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import ModalError from "../partials/modals/ModalError";
import SideNavigation from "../partials/SideNavigation";
import ToastSuccess from "../partials/ToastSuccess";
import ProductTable from "./ProductTable";
import ModalAddProduct from "./ModalAddProducts";

const Products = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <section className="layout-main text-body">
        <div className="layout-division">
          <SideNavigation menu="products" submenu="read" />
          <main>
            <Header title="Products" subtitle="Manage Products" />
            <div className="p-0.5">
              <div className="flex justify-between items-center ">
                <div></div>
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>
              <ProductTable setItemEdit={setItemEdit} itemEdit={itemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>

      {store.validate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.success && <ToastSuccess />}
      {store.isAdd && (
        <ModalAddProduct itemEdit={itemEdit} setItemEdit={setItemEdit} />
      )}
    </>
  );
};

export default Products;