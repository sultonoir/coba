import { useState, useMemo, useCallback } from "react";
import Modal from "./Modal";
import useEditnModal from "@/hooks/useEditModal";
import { SafeListing } from "@/types";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Heading from "../shared/Heading";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import Facility from "../shared/Facility";
import NearTour from "../shared/NearTour";
import TextArea from "../inputs/TextArea";
import { Additional } from "@prisma/client";
import Button from "../shared/Button";
import InputIdr from "../inputs/InputIdr";

enum STEPS {
  INFO = 1,
  IMAGES = 2,
  FASILITAS = 3,
  ADDITIONAL = 4,
  DISCOUNT = 5,
  DESCRIPTION = 6,
  PRICE = 7,
}

type Props = {
  data: SafeListing;
  Addtional: Additional[];
};

const EditListingModal = ({ data, Addtional }: Props) => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.INFO);
  const [isLoading, setIsLoading] = useState(false);
  const edit = useEditnModal();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      img: data.imageSrc,
      price: data.price,
      bed: data.bed,
      fasilitas: data.fasilitas,
      title: data.title,
      description: data.description,
      roomCount: data.roomCount,
      guestCount: data.guestCount,
      additional: Addtional,
      discount: 0 || data.discount,
    },
  });

  const onStepClick = (step: number) => {
    setStep(step);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.INFO);
        edit.onClose();
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

  if (step === STEPS.DISCOUNT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Sekarang, tetapkan harga Anda"
          subtitle="Berapa biaya yang Anda kenakan per malam?"
        />
        <InputIdr
          id="discount"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
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

  let footer = (
    <div className="grid grid-cols-2 gap-2">
      <Button
        onClick={() => onStepClick(STEPS.INFO)}
        label="Info"
        outline
        small
      />
      <Button
        onClick={() => onStepClick(STEPS.IMAGES)}
        label="Images"
        outline
        small
      />
      <Button
        onClick={() => onStepClick(STEPS.FASILITAS)}
        label="fasilitas"
        outline
        small
      />
      <Button
        onClick={() => onStepClick(STEPS.ADDITIONAL)}
        label="additional"
        outline
        small
      />
      <Button
        onClick={() => onStepClick(STEPS.DISCOUNT)}
        label="Discount"
        outline
        small
      />
      <Button
        onClick={() => onStepClick(STEPS.DESCRIPTION)}
        label="Description"
        outline
        small
      />
      <Button
        onClick={() => onStepClick(STEPS.PRICE)}
        label="Price"
        outline
        small
      />
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={edit.isOpen}
      onClose={edit.onClose}
      actionLabel="Submit"
      title="Properti"
      disabled={isLoading}
      footer={footer}
    />
  );
};

export default EditListingModal;
