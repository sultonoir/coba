"use client";
import { Range } from "react-date-range";
import Calender from "../inputs/Calendar";
import Button from "../shared/Button";
import { useMemo } from "react";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  body: React.ReactElement;
  discount?: number | null;
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onSubmit,
  disabled,
  onChangeDate,
  body,
  discount,
}) => {
  console.log(discount);
  const formatter = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  });
  const priceRupiah = formatter.format(price);

  const priceDiscount = useMemo(() => {
    const formatter = new Intl.NumberFormat("us-US", {
      style: "currency",
      currency: "USD",
    });

    if (discount) {
      const d = price * (discount / 100); //
      const p = price - d;
      const formattedPrice = formatter.format(p);
      return formattedPrice;
    }
  }, [discount, price]);
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      {discount ? (
        <div className="flex flex-col lg:flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold line-through text-neutral-500">
            {priceRupiah}
          </div>
          <div className="text-2xl font-semibold">{priceDiscount}</div>
          <div className="font-light text-neutral-600 whitespace-nowrap">
            / Night
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">{priceRupiah}</div>
          <div className="font-light text-neutral-600 whitespace-nowrap">
            / Night
          </div>
        </div>
      )}

      <hr />
      <Calender
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      {body}
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reserve"
          onClick={onSubmit}
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total Price</div>
        <div>{formatter.format(totalPrice)}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
