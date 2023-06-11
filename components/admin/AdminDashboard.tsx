import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDatepick from "./AdminDatepick";
import { SafeListing } from "@/types";
import { Hero } from "@prisma/client";
import { Payment } from "@/app/admin/columns";
import PropertiClient from "./PropertiClient";
import PropertiHero from "./PropertiHero";

interface AdminDashboardProps {
  rooms: SafeListing[];
  promosi: Hero[];
  reservation: Payment[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  reservation,
  rooms,
  promosi,
}) => {
  return (
    <Tabs defaultValue="Revenue">
      <TabsList className="flex gap-2 ">
        <TabsTrigger value="Revenue">Revenue</TabsTrigger>
        <TabsTrigger value="rooms">Rooms</TabsTrigger>
        <TabsTrigger value="poster">Poster</TabsTrigger>
      </TabsList>
      <TabsContent value="Revenue">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <AdminDatepick reservation={reservation} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="rooms">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <PropertiClient listings={rooms} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="poster">
        <Card>
          <CardContent>
            <PropertiHero promosi={promosi} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboard;
