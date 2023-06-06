"use client";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../inputs/TextArea";
import Counter from "../inputs/Counter";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import CountrySelect from "../inputs/CountrySelect";
type Props = {
  ratingModalid: string;
  ratingModal: boolean;
  onClose: () => void;
};

const RatingsModal = ({ ratingModalid, ratingModal, onClose }: Props) => {
  const router = useRouter();
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
      reservationId: ratingModalid,
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

  useEffect(() => {
    setValue("reservationId", ratingModalid);
  }, [ratingModalid, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/ratings", data)
      .then(() => {
        toast.success("ratings created");
        router.refresh();
        onClose();
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
      isOpen={ratingModal}
      onClose={onClose}
      actionLabel="Submit"
      disabled={isLoading}
      body={body}
      title="Ratings"
    />
  );
};

export default RatingsModal;
