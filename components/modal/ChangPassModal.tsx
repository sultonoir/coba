import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Heading from "../shared/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import usePassordModal from "@/hooks/usePassword";
import Modal from "./Modal";

const ChangPassModal = () => {
  const passowrdModal = usePassordModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/user", data)
      .then((res) => {
        toast.success("Password berhasil diganti");
        passowrdModal.onOpen();
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        passowrdModal.onClose();
      });
  };

  const body = (
    <div className="flex flex-col gap-5">
      <Heading
        title="Chane Password"
        subtitle="Buat password baru anda"
      />
      <Input
        id="password"
        type="password"
        label="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={passowrdModal.isOpen}
      onClose={passowrdModal.onClose}
      actionLabel="Submit"
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      title="Change password"
      body={body}
    />
  );
};

export default ChangPassModal;
