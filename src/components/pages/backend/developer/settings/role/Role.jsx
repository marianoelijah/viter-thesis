import { setIsAdd } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import React from "react";
import SideNavigation from "../../../partials/SideNavigation";
import Header from "../../../partials/Header";
import { Plus } from "lucide-react";
import RoleList from "../../../settings/role/RoleList";
import Footer from "@/components/partials/Footer";
import ToastSuccess from "../../../partials/ToastSuccess";
import ModalError from "@/components/partials/modal/ModalError";
import ModalAddRole from "../../../settings/role/ModalAddRole";


const Role = () => {
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
          <SideNavigation menu="role" />
          <main>
            <Header title="Role" subtitle="Welcome to Worldpeas!" />
            <div className="p-5">
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
              <RoleList setItemEdit={setItemEdit} />
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

export default Role;