"use client";

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useState, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Heading from "../shared/Heading";
import useRentModal from "@/hooks/useRentModal";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import TextArea from "../inputs/TextArea";
import NearTour from "../shared/NearTour";
import Facility from "../shared/Facility";
import InputPercentage from "../inputs/InputIdr";

enum STEPS {
  INFO = 1,
  IMAGES = 2,
  FASILITAS = 3,
  ADDITIONAL = 4,
  DESCRIPTION = 5,
  DISCOUNT = 6,
  PRICE = 7,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.INFO);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      img: [],
      price: 1,
      fasilitas: [],
      title: "",
      description: "",
      roomCount: 1,
      guestCount: 0,
      additional: [],
      discount: 0,
    },
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.INFO);
        rentModal.onClose();
      })
      .catch((error: any) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "create";
    }
    return "next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }
    return "back";
  }, [step]);

  const img = watch("img");
  const fasilitas = watch("fasilitas");
  const additional = watch("additional");

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Detail Ruangan"
        subtitle="Fasilitas utama apa saja yang anda punya"
      />
      <Input
        id="guestCount"
        label="Tamu"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Input
        id="roomCount"
        label="Kamar"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Input
        id="bed"
        label="Tempat tidur"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
    </div>
  );

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tambahkan foto"
          subtitle="Tunjukan pada tamu tentang tempat anda maksimal 4 foto"
        />
        <ImageUpload
          value={img}
          onChange={(value) => setCustomValue("img", value)}
        />
      </div>
    );
  }

  if (step === STEPS.FASILITAS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Fasilitas"
          subtitle="Fasilitas apa saja yang ada di dalamnya"
        />
        <Facility
          value={fasilitas}
          onChange={(value) => setCustomValue("fasilitas", value)}
        />
      </div>
    );
  }

  if (step === STEPS.ADDITIONAL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga layanan tambahan"
          subtitle="Apa saja layanan tambahan anda"
        />
        <NearTour
          value={additional}
          onChange={(value) => setCustomValue("additional", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga Anda"
          subtitle="Berapa biaya yang Anda kenakan per malam?"
        />
        <Input
          id="title"
          label="title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
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
  }

  if (step === STEPS.DISCOUNT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="discount"
          subtitle="berapa banyak discount"
        />
        <InputPercentage
          id="discount"
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga Anda"
          subtitle="Berapa biaya yang Anda kenakan per malam?"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFO ? undefined : onBack}
      title="Properti"
      disabled={isLoading}
    />
  );
};

export default RentModal;
