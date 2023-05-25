"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";

const HomeClient = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState<any>([]);
  const [price, setPrice] = useState(0);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await axios.post("api/webhooks/", formData);
    } catch (error) {
      console.error(error);
    }
  }, [name, price, images]);

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div>
      <input
        className="p-4 border-red-500"
        type="file"
        title="image"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      <input
        className="p-4 border-red-500"
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-4 border-red-500"
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default HomeClient;
