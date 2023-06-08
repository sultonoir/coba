"use client";

import useReservModal from "@/hooks/useReservModal";
import { SafeListing } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Range } from "react-date-range";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../shared/Heading";
import CategoryInput from "../inputs/CategoryInput";
import Calendar from "../inputs/Calendar";
import Input from "../inputs/Input";
import Modal from "./Modal";

interface ReservationModalProps {
  listings: SafeListing[];
}

enum STEPS {
  CATEGORY = 1,
  DAYS = 2,
  ROOMS = 3,
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ReservationModal: React.FC<ReservationModalProps> = ({ listings }) => {
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const reserv = useReservModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      listing: [],
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      status: "success",
      roomCount: 1,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.ROOMS) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/reservAdmin", data)
      .then(() => {
        toast.success("Reservations Created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        reserv.onClose();
      })
      .catch((error: any) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChangeDate = (value: any) => {
    setDateRange(value);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.ROOMS) {
      return "create";
    }
    return "next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  const listing = watch("listing");

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Pilih kategory "
        subtitle="kategory kamar hotel"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {listings.map((item) => (
          <div
            key={item.id}
            className="col-span-1"
          >
            <CategoryInput
              onClick={(listing) => setCustomValue("listing", listing)}
              selected={listing.id === item.id}
              label={item.title}
              item={item}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.DAYS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="hari"
          subtitle="pilih hari unutk menginap"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => onChangeDate(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.ROOMS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="kamar & tamu"
          subtitle="berapa bayak kamar dan nama tamu"
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
          id="guestName"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="text"
        />
      </div>
    );
  }

  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      onClose={reserv.onClose}
      isOpen={reserv.isOpen}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      disabled={isLoading}
      title="Reservations"
    />
  );
};

export default ReservationModal;
