import { useState, useEffect } from "react";

export default function Countdown() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const waktuSekarang = new Date().getTime();
    const waktuHitungMundur = waktuSekarang - 2 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const sekarang = new Date().getTime();
      const selisih = waktuHitungMundur - sekarang;

      if (selisih <= 0) {
        clearInterval(timer);
        setCountdown("Waktu Hitung Mundur Habis");
      } else {
        const jam = Math.floor(selisih / (1000 * 60 * 60));
        const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisih % (1000 * 60)) / 1000);

        setCountdown(
          `Waktu Hitung Mundur: ${jam} jam, ${menit} menit, ${detik} detik`
        );
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{countdown}</div>;
}
