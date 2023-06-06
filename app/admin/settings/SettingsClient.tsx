"use client";
import Avatar from "@/components/shared/Avatar";
import AvatarCom from "@/components/shared/AvatarCom";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SafeAdminNotif } from "@/types";
import axios from "axios";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";

declare global {
  var cloudinary: any;
}
const uploadPreset = "ufa5bp0v";

interface admin {
  admin: SafeAdminNotif | null;
}

const SettingsClient: React.FC<admin> = ({ admin }) => {
  if (!admin || !admin?.name) {
    return <EmptyState />;
  }

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const safeAccount = () => {
    axios
      .put("/api/admin", {
        image,
        name,
        email,
        adminId: admin.id,
      })
      .then(() => {
        router.refresh();
        toast.success("Profile save");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setName("");
        setEmail("");
        setImage("");
      });
  };
  const savePassword = () => {
    axios
      .put("/api/admin", {
        password,
        adminId: admin.id,
      })
      .then(() => {
        router.refresh();
        toast.success("Profile save");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setPassword("");
      });
  };

  const handleUpload = useCallback(
    (result: any) => {
      setImage(result.info.secure_url);
    },
    [admin.image]
  );

  return (
    <Tabs
      defaultValue="account"
      className="w-full sm:w-[400px] px-2 sm:mx-auto"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="relative w-[150px] h-[150px]">
              <div className="absolute bottom-0 right-0 z-10">
                <CldUploadButton
                  uploadPreset={uploadPreset}
                  onUpload={handleUpload}
                >
                  <TbPhotoPlus
                    size={50}
                    className="bg-primary-foreground rounded-full p-2"
                  />
                </CldUploadButton>
              </div>
              <AvatarCom
                src={admin.image || image}
                width={150}
                height={150}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder={admin.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="Email"
                placeholder={admin.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={safeAccount}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input
                id="current"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input
                id="new"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={savePassword}>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsClient;
