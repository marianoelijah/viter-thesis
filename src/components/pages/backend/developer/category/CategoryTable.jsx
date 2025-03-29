import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "@/components/store/storeContext";
import { setIsAdd, setIsArchive, setIsDelete, setIsRestore } from "@/components/store/storeAction";
import { FaArchive, FaEdit, FaTrash, FaTrashRestoreAlt, FaInfoCircle } from "react-icons/fa";
import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
import Loadmore from "@/components/partials/LoadMore";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import useQueryData from "@/components/custom-hook/useQueryData";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalDetails from "../../partials/modals/ModalDetails";


const CategoryTable = ({ setIsCategoryEdit }) => {
  const { store, dispatch } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState("Buy");
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [onSearch, setOnSearch] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [details, setDetails] = useState(null);
  const search = React.useRef({ value: "" });

  const { data: result, error, fetchNextPage, hasNextPage, isFetching, status } = useQueryData(
    `/v2/category/${selectedCategory.toLowerCase()}`,
    page,
    { searchValue: search?.current.value, statusFilter }
  );

  useEffect(() => {
    setPage(1); // Reset page on category change
  }, [selectedCategory]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setIsCategoryEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.category_aid);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.category_aid);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setId(item.category_aid);
  };

  const handleDetails = (item) => {
    setDetails(item);
  };

  return (
    <>
      <div className="mt-5 flex justify-between">
        <SearchBarWithFilterStatus
          search={search}
          store={store}
          setOnSearch={setOnSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setPage={setPage}
        />
        <div>
          {["Buy", "Trade", "Donate"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 mx-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-secondary rounded-md mt-10 border border-line relative">
        <div className="table-wrapper custom-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {status === "pending" || result?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center">No Data Available</td>
                </tr>
              ) : (
                result?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.category_is_active ? "Active" : "Inactive"}</td>
                    <td>{item.category_title}</td>
                    <td className="flex gap-3">
                      <button onClick={() => handleDetails(item)}><FaInfoCircle /></button>
                      {item.category_is_active ? (
                        <>
                          <button onClick={() => handleEdit(item)}><FaEdit /></button>
                          <button onClick={() => handleArchive(item)}><FaArchive /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleRestore(item)}><FaTrashRestoreAlt /></button>
                          <button onClick={() => handleDelete(item)}><FaTrash /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {hasNextPage && <Loadmore fetchNextPage={fetchNextPage} isFetching={isFetching} />}
        </div>
      </div>

      {details && <ModalDetails item={details} onClose={() => setDetails(null)} />}
      {store.isDelete && <ModalDelete setIsDelete={setIsDelete} mysqlApiDelete={`/v2/category/${id}`} queryKey="category" />}
      {store.isArchive && <ModalArchive setIsArchive={setIsArchive} mysqlEndpoint={`/v2/category/active/${id}`} queryKey="category" />}
      {store.isRestore && <ModalRestore setIsRestore={setIsRestore} mysqlEndpoint={`/v2/category/active/${id}`} queryKey="category" />}
    </>
  );
};

export default CategoryTable;
