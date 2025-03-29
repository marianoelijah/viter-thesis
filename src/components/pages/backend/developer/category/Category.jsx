import { setIsAdd } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { Plus } from "lucide-react";
import React from "react";






import CategoryTable from "./CategoryTable";
import ModalAddCategory from "./ModalAddCategory";
import Header from "../../partials/Header";
import Footer from "@/components/partials/Footer";
import ModalError from "@/components/partials/modal/ModalError";
import ModalValidation from "../../partials/modals/ModalValidation";
import SideNavigation from "../../partials/SideNavigation";
import ToastSuccess from "../../partials/ToastSuccess";

const Category = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [isCategoryEdit, setIsCategoryEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(null);
  };

  return (
    <>
      <section className="layout-main text-body">
        <div className="layout-division">
          <SideNavigation menu="category" submenu="read" />
          <main>
            <Header title="Category" subtitle="Manage Category" />
            <div className="p-8">
              <div className="flex justify-between items-center ">
              <div></div>
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>
              <CategoryTable
                isCategoryEdit={isCategoryEdit}
                setIsCategoryEdit={setIsCategoryEdit}
              />
            </div>
            <Footer />
          </main>
        </div>
      </section>

      {store.validate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.success && <ToastSuccess />}
      {/* <SpinnerWindow /> */}

      {store.isAdd && (
        <ModalAddCategory
          isCategoryEdit={isCategoryEdit}
          setIsCategoryEdit={setIsCategoryEdit}
        />
      )}
    </>
  );
};

export default Category;