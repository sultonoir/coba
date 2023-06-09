"use client";
import { Range } from "react-date-range";
import Calender from "../inputs/Calendar";
import Button from "../shared/Button";

interface AdminReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  body: React.ReactElement;
}
const AdminReservation: React.FC<AdminReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onSubmit,
  disabled,
  onChangeDate,
  body,
}) => {
  const formatter = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  });
  const priceRupiah = formatter.format(price);
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">{priceRupiah}</div>
        <div className="font-light text-neutral-600 whitespace-nowrap">
          / Night
        </div>
      </div>
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

export default AdminReservation;
