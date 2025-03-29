import { setError, setIsAdd, setMessage } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import React from "react";
import DeveloperList from "./DeveloperList";
import ModalAddDeveloper from "./ModalAddDeveloper";
import Role from "../role/Role";
import useQueryData from "@/components/custom-hook/useQueryData";



import { Plus } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import SideNavigation from "../../partial/SideNavigation";
import Header from "../../../partials/Header";
import Footer from "@/components/partials/Footer";
import ToastSuccess from "../../../partials/ToastSuccess";
import ModalError from "../../../partials/modals/ModalError";

const Developer = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const { isLoading, data: role } = useQueryData(
    `/v2/role`, //endpoint
    "get", //method
    "role" //key
  );

  const developerRole = role?.data.filter(
    (item) => item.role_is_developer == 1
  );

  const handleAdd = () => {
    if (developerRole?.length === 0) {
      dispatch(setError(true));
      dispatch(setMessage("Developer role is required."));
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <section className="layout-main">
        <div className="layout-div">
          <SideNavigation menu="settings" />
          <main>
            <Header title="Developer" subtitle="Welcome to WorldPeas" />
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div></div>
                {/* {isFetching ? (
                  "Loading..."
                ) : ( */}
                  <button
                  type="button"
                  className="btn btn-add"
                  onClick={handleAdd}
                >
                    <Plus size={16} /> Add New
                  </button>
                {/* )} */}
              </div>
              <div className="flex items-end"></div>
              <DeveloperList setItemEdit={setItemEdit} />
            </div>

            <Footer />
          </main>
        </div>
      </section>
      {store.error && <ModalError />}
      {store.success && <ToastSuccess />}
      {store.isAdd && <ModalAddDeveloper itemEdit={itemEdit} developerRole={developerRole} />}
    </>
  );
};

export default Developer;