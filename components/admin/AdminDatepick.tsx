"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Payment } from "@/app/admin/columns";
import React, { useState } from "react";
import Heading from "../shared/Heading";

interface reservations {
  reservation: Payment[];
}

const FormSchema = z.object({
  dob: z.date({
    required_error: "Masukan tanggal",
  }),
});

const AdminDatepick: React.FC<reservations> = ({ reservation }) => {
  const [item, setItem] = useState(reservation);
  const [show, setShow] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function totalAllPrice(value: any) {
    let totalPrice = 0;

    for (let i = 0; i < value.length; i++) {
      totalPrice += value[i].amount;
    }
    return totalPrice;
  }

  const dateNow = new Date();

  const allPriceDatePick = totalAllPrice(item);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const revenueDatePick = formatter.format(allPriceDatePick);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const tanggalFilter = format(data.dob, "PPP");
    const reservationFilter = reservation.filter((item) => {
      const date = new Date(item.created);
      const formatDate = format(date, "PPP");
      return formatDate === tanggalFilter;
    });
    setItem(reservationFilter);
    setShow(true);
  }

  const reservationNow = reservation.filter((e) => {
    const dateNow = new Date();
    const formatDateNow = format(dateNow, "PPP");
    const createdNow = new Date(e.created);
    const formatCreatedNow = format(createdNow, "PPP");
    return formatDateNow === formatCreatedNow;
  });

  const allPrice = totalAllPrice(reservationNow);
  const revenueNow = formatter.format(allPrice);

  const [datePick] = item.map((i) => {
    const newDate = new Date(i.created);
    const formatDate = format(newDate, "PPP");
    return formatDate;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Heading title="Dashboard" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4"
          >
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-5 mt-6">
        <div className="sm:col-span-4 xl:col-span-2 group relative shadow-sm border rounded-xl overflow-hidden">
          <div className="p-5 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Total Revenue</p>
              <p>RP.</p>
            </div>
            <p className="text-xl font-bold">{revenueNow}</p>
            <p className="text-muted-foreground">{format(dateNow, "PPP")}</p>
          </div>
        </div>
        {show && (
          <div className="sm:col-span-4 xl:col-span-2 group relative shadow-sm border rounded-xl overflow-hidden">
            <div className="p-5 flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Total Revenue</p>
                <p>RP.</p>
              </div>
              <p className="text-xl font-bold">{revenueDatePick}</p>
              <p className="text-muted-foreground">{datePick}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDatepick;
