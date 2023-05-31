import prisma from "@/libs/prisma";

interface Iparams {
  reservationId?: string;
}

export default async function getReservationsById(params: Iparams) {
  const { reservationId } = params;
  try {
    const reservations = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        listing: true,
      },
    });
    return reservations;
  } catch (error) {
    throw new Error();
  }
}
