"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/hooks/useSearchModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import Heading from "../shared/Heading";
import Calendar from "../inputs/Calendar";
import CountrySelect, { safeDist } from "../inputs/CountrySelect";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
interface SearchModalProps {
  districts: any;
}

const SearchModal = ({ districts }: SearchModalProps) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<safeDist>();
  const [kids, setKids] = useState(0);
  const [adult, setAdult] = useState(0);
  const [baby, setBaby] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../shared/Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount: adult + kids + baby,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    adult,
    kids,
    baby,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Kemana kamu mau pergi?"
        subtitle="Temukan lokasi yang sempurna!"
      />
      <CountrySelect
        districts={districts}
        value={location}
        onChange={(value) => setLocation(value as safeDist)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Kapan Anda berencana untuk pergi?"
          subtitle="Tentukan waktu untuk pergi"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Informasi lebih lanjut"
          subtitle="Temukan tempat sempurna Anda!"
        />
        <Counter
          onChange={(value) => setAdult(value)}
          value={adult}
          title="Orang dewasa"
          subtitle="Umur 12 tahun keatas"
        />
        <Counter
          onChange={(value) => setKids(value)}
          value={kids}
          title="Anak-anak"
          subtitle="Umur 2-12 tahun"
        />
        <Counter
          onChange={(value) => setBaby(value)}
          value={baby}
          title="Balita"
          subtitle="Dibawah 2 tahun"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Kamar"
          subtitle="Berapa banyak kamar yang Anda butuhkan?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="Kamar mandi"
          subtitle="Berapa banyak kamar mandi yang Anda butuhkan?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
