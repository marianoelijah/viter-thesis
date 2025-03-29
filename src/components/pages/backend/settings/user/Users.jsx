import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import React from "react";
import SideNavigation from "../../developer/partial/SideNavigation";
import Header from "../../developer/partial/Header";
import { Plus } from "lucide-react";
import Footer from "../../developer/partial/Footer";
import ToastSuccess from "../../developer/partial/ToastSuccess";
import ModalError from "../../developer/partial/modals/ModalError";
import ModalAddRole from "../../developer/settings/role/ModalAddRole";
import UserList from "../../developer/settings/user/UserList";

const Users = () => {
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
          <SideNavigation menu="user" />
          <main>
            <Header title="Users" subtitle="Welcome to Worldpeas!" />
            <div className="p-8">
              <div className="flex justify-between items-end">
                <div></div>
                <button
                  className="btn btn-add"
                  type="button"
                  onClick={handleAdd}
                >
                  <Plus size={16} />
                  Add New
                </button>
              </div>
              <UserList setItemEdit={setItemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>

      {store.success && <ToastSuccess />}
      {store.error && <ModalError />}
      {/* {store.isAdd && <ModalError />} */}
      {store.isAdd && <ModalAddRole itemEdit={itemEdit} />}
    </>
  );
};

export default Users;