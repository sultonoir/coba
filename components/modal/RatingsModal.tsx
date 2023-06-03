"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../inputs/TextArea";
import Counter from "../inputs/Counter";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useRatingsModal from "@/hooks/useRatings";
import CountrySelect from "../inputs/CountrySelect";

const RatingsModal = () => {
  const ratingModal = useRatingsModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      value: 1,
      type: null,
    },
  });

  const value = watch("value");
  const type = watch("type");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/ratings", data)
      .then(() => {
        toast.success("ratings dibuat");
        ratingModal.onClose();
        reset();
      })
      .catch((errors) => {
        toast.error(errors.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let body = (
    <div className="flex flex-col gap-3">
      <Counter
        title="Ratings"
        subtitle="We would really appreciate it if you give a ratings"
        value={value}
        onChange={(value) => setCustomValue("value", value)}
        max={5}
      />
      <CountrySelect
        value={type}
        onChange={(type) => setCustomValue("type", type)}
      />
      <TextArea
        id="message"
        disabled={isLoading}
        register={register}
        errors={errors}
        label="message"
      />
    </div>
  );
  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      onClose={ratingModal.onClose}
      isOpen={ratingModal.isOpen}
      actionLabel="Submit"
      disabled={isLoading}
      body={body}
      title="Ratings"
    />
  );
};

export default RatingsModal;
