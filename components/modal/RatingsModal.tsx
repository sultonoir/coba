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

interface RatingsModalProps {
  listingId: string;
}

const RatingsModal: React.FC<RatingsModalProps> = ({ listingId }) => {
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
      message: "",
      listingId,
    },
  });

  const value = watch("value");

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
        subtitle="Kami akan sangat menghargai jika Anda memberikan rating"
        value={value}
        onChange={(value) => setCustomValue("value", value)}
        max={5}
      />
      <TextArea
        id="description"
        disabled={isLoading}
        register={register}
        errors={errors}
        label="description"
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
