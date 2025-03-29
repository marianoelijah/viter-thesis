import React from "react";
import UserList from "./UserList";
import SideNavigation from "../../partials/SideNavigation";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import ModalError from "../../partials/Modals/ModalError";
import ToastSuccess from "../../partials/ToastSuccess";
import ModalAddUser from "./ModalAddUser";
import { StoreContext } from "@/components/store/storeContext";
import { Plus } from "lucide-react";

const User = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-div">
          <SideNavigation menu="settings" />
          <main>
            <Header title="User" subtitle="Welcome to WorldPeas" />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>
                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} /> Add New
                </button>
              </div>
              <div className="flex items-end"></div>
              <UserList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.error && <ModalError />}
      {store.success && <ToastSuccess />}
      {store.isAdd && <ModalAddUser itemEdit={itemEdit} />}
    </>
  );
};

export default User;