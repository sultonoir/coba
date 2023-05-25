import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useProfile from "@/hooks/UseProfile";
import Modal from "./Modal";
import ProfileUpload from "../inputs/ProfileUpload";
import { useRouter } from "next/navigation";

const ChangeProfileModal = () => {
  const profileModal = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/user", {
        name,
        image,
        description,
      });
      toast.success("Profil berhasil diedit");
      router.refresh();
      profileModal.onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [name, image, description]);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (value: any) => {
    setImage(value);
  };

  const body = (
    <div className="flex flex-col gap-5">
      <ProfileUpload
        value={image}
        onChange={handleImageChange}
      />
      <input
        id="name"
        type="text"
        placeholder="Nama anda"
        value={name}
        onChange={handleNameChange}
        className="peer
          w-full
          p-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed"
      />
      <textarea
        id="description"
        maxLength={500}
        placeholder="Deskripsi profil"
        value={description}
        onChange={handleDescriptionChange}
        className="peer
          w-full
          p-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed"
      />
    </div>
  );

  return (
    <Modal
      isOpen={profileModal.isOpen}
      onSubmit={handleSubmit}
      onClose={profileModal.onClose}
      actionLabel="Submit"
      body={body}
      title="Edit profil"
      disabled={isLoading}
    />
  );
};

export default ChangeProfileModal;
