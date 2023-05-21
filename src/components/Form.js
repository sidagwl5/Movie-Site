import React, { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import * as func from "../scripts/Functions";
import store from "./Store";
import { TextInput } from "./TextInput";
import { CircularProgress, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tw } from "twind/style";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Select } from "./Select";

const Form = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      image: null,
      data: "",
      url: "",
      content: "",
      category: "sci-fi",
    },
  });

  useEffect(() => {
    func.setAuthListener();
  }, []);

  function handleClick(payload) {
    setLoading(true);
    func
      .storeImage(store.user.id, payload)
      .then(() => navigate("/moviepage"))
      .finally(() => setLoading(false));
  }

  return (
    <form onSubmit={handleSubmit(handleClick)} className="form-main">
      <h1>Movie Form</h1>

      <Controller
        name="image"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <div
              className={tw("relative cursor-pointer w-24 h-24 bg-transparent")}
            >
              {value && (
                <div
                  onClick={onChange.bind(this, null)}
                  className={tw(
                    "w-6 h-6 bg-gray-700 z-10 rounded-full flex justify-center cursor-pointer items-center absolute top-1 right-1"
                  )}
                >
                  <CloseIcon className={tw("text-white !text-lg")} />
                </div>
              )}
              <div
                onClick={() => {
                  fileRef.current?.click();
                }}
                className={tw(
                  "w-full relative bg-gray-700 h-full rounded-full overflow-hidden"
                )}
              >
                {value && (
                  <img
                    src={(() => {
                      if (!value) return "";

                      return URL.createObjectURL(value);
                    })()}
                    className={tw(
                      "flex object-cover justify-center bg-transparent! items-center rounded-full overflow-hidden w-full h-full"
                    )}
                  />
                )}
                <div
                  className={tw(
                    "w-full flex justify-center items-center h-[25px] bg-black bg-opacity-50 absolute bottom-0 left-0 right-0"
                  )}
                >
                  <CameraAltIcon className={tw("text-white !text-base")} />
                </div>
              </div>

              <input
                type="file"
                className={tw("hidden")}
                onChange={(e) => {
                  onChange(e.target.files[0]);

                  e.target.value = "";
                }}
                ref={fileRef}
              />
            </div>
          </>
        )}
      />

      <Controller
        name="data"
        control={control}
        rules={{
          required: { message: "Name Required", value: true },
        }}
        render={({
          fieldState: { error },
          field: { ref, value, onChange },
        }) => (
          <TextInput
            label="Name*"
            id="data"
            onChange={onChange}
            placeholder="Enter Name"
            errorMessage={error?.message}
            ref={ref}
            value={value}
          />
        )}
      />

      <Controller
        name="url"
        control={control}
        rules={{
          required: { message: "Url Required", value: true },
        }}
        render={({
          fieldState: { error },
          field: { ref, value, onChange },
        }) => (
          <TextInput
            label="URL*"
            id="url"
            onChange={onChange}
            placeholder="Enter Url"
            errorMessage={error?.message}
            ref={ref}
            value={value}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{
          required: { message: "Category Required", value: true },
        }}
        render={({
          fieldState: { error },
          field: { ref, value, onChange },
        }) => (
          <Select
            label="Category*"
            id="category"
            onChange={onChange}
            placeholder="Enter Category"
            errorMessage={error?.message}
            ref={ref}
            value={value}
          >
            <MenuItem value={"anime"}>Anime</MenuItem>
            <MenuItem value={"sci-fi"}>Sci-fi</MenuItem>
            <MenuItem value={"horror"}>Horror</MenuItem>
          </Select>
        )}
      />

      <Controller
        name="content"
        control={control}
        rules={{
          required: { message: "Description Required", value: true },
        }}
        render={({
          fieldState: { error },
          field: { ref, value, onChange },
        }) => (
          <TextInput
            label="Description*"
            id="content"
            onChange={onChange}
            placeholder="Enter Description"
            errorMessage={error?.message}
            ref={ref}
            value={value}
          />
        )}
      />

      <button
        className={tw("w-28 text-base! flex justify-center items-center")}
        type="submit"
      >
        {loading ? (
          <CircularProgress size={20} className={tw("text-white!")} />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default Form;
