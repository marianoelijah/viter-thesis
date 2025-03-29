import { StoreContext } from "@/components/store/storeContext";
import { ImagePlusIcon, X } from "lucide-react";
import React from "react";
import ModalWrapper from "../partials/modals/ModalWrapper";
import SpinnerButton from "../partials/spinners/SpinnerButton";

import useQueryData from "@/components/custom-hook/useQueryData";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { InputPhotoUpload, InputSelect, InputText } from "@/components/helpers/FormInputs";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import { setError, setIsAdd, setMessage, setSuccess } from "@/components/store/storeAction";
import { imgPath } from "@/components/helpers/functions-general";

const ModalAddProducts = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const {
    isFetching,
    error,
    status,
    data: categ,
  } = useQueryData(
    `/v2/category`, // endpoint
    "get", // method
    "category" // key
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/product/${itemEdit.product_aid}`
          : "/v2/product",
        itemEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["product"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Successful!"));
      }
    },
  });

  const initVal = {
    product_image: itemEdit ? itemEdit.product_image : "",
    product_title: itemEdit ? itemEdit.product_title : "",
    product_price: itemEdit ? itemEdit.product_price : "",
    product_category_id: itemEdit ? itemEdit.product_category_id : "",
  };

  const yupSchema = Yup.object({
    product_title: Yup.string().required("Required"),
    product_price: Yup.string().required("Required"),
    product_category_id: Yup.string().required("Required"),
  });



  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add product</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                product_image:
                  (itemEdit?.product_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.product_image !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.product_image || "",
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[85vh] h-full overflow-y-auto custom-scroll">
                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          type="text"
                          name="product_title"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="">Photo</label>
                        {itemEdit === null && photo === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.product_image // check db
                            }
                            alt="product photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}
                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full ${
                            mutation.isPending ? "pointer-events-none" : ""
                          }`}
                        />
                      </div>

                      <div className="input-wrap mt-8">
                        <InputText
                          label="Price"
                          type="text"
                          name="product_price"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect
                          label="Product Category"
                          name="product_category_id"
                          onChange={handleChange}
                          
                        >
                          <option value="" hidden></option>
                          {categ?.data.map((item, key) => {
                            return (
                              <>
                                {item.category_is_active === 1 && (
                                  <option key={key} value={item.category_aid}>
                                    {item.category_title}
                                  </option>
                                )}
                              </>
                            );
                          })}
                          
                        <option>Fruits</option>
                        <option>Vegetables</option>
                        <option>Herbs & Spices</option>
                        </InputSelect>
                        
                      </div>
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3">
                      <button className="btn btn-add" type="submit">
                        {mutation.isPending ? <SpinnerButton /> : "Add"}
                      </button>
                      <button
                        className="btn btn-cancel"
                        type="reset"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddProducts;