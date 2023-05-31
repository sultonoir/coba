"use client";
import useHeroModal from "@/hooks/useHeroModal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../shared/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import ProfileUpload from "../inputs/ProfileUpload";

const HeroModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const hero = useHeroModal();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      img: [],
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const img = watch("img");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/promosi", data)
      .then(() => {
        toast.success("Poster promosi Created");
        router.refresh();
        reset();
        hero.onClose();
      })
      .catch((error: any) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Poseter promosi"
        subtitle="tambahkan poster promosi"
      />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <ProfileUpload
        value={img}
        onChange={(value) => setCustomValue("img", value)}
      />
    </div>
  );
  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      isOpen={hero.isOpen}
      onClose={hero.onClose}
      actionLabel="Submit"
      body={body}
      disabled={isLoading}
    />
  );
};

export default HeroModal;
