import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Edit, Search, Upload } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Store {
  id: string;
  name: string;
  orderVolume: number;
  deliveredRevenue: string;
  walletBalance: string;
  subscriptionStatus: 'Free Trial' | 'Active' | 'Active Daily';
}

interface StoreCategory {
  id: string;
  name: string;
  totalStores: number;
  stores: Store[];
}

const dummyStoreCategories: StoreCategory[] = [
  {
    id: "d2c",
    name: "D2C brand",
    totalStores: 10,
    stores: [
      { id: "d2c-1", name: "D2C Store A", orderVolume: 1500, deliveredRevenue: "85.2%", walletBalance: "₹5,000", subscriptionStatus: "Active" },
      { id: "d2c-2", name: "D2C Store B", orderVolume: 3500, deliveredRevenue: "92.1%", walletBalance: "₹15,245", subscriptionStatus: "Active Daily" },
    ],
  },
  {
    id: "children-toys",
    name: "Children toys",
    totalStores: 5,
    stores: [
      { id: "ct-1", name: "Toy Store X", orderVolume: 1200, deliveredRevenue: "96.65%", walletBalance: "₹10,000", subscriptionStatus: "Active" },
      { id: "ct-2", name: "Kids Play Y", orderVolume: 1200, deliveredRevenue: "90.0%", walletBalance: "₹10,245", subscriptionStatus: "Free Trial" },
    ],
  },
  {
    id: "baby-niche",
    name: "Baby niche",
    totalStores: 5,
    stores: [
      { id: "bn-1", name: "Baby Essentials", orderVolume: 1300, deliveredRevenue: "12.85%", walletBalance: "₹10,000", subscriptionStatus: "Active Daily" },
      { id: "bn-2", name: "Infant Care", orderVolume: 1300, deliveredRevenue: "75.0%", walletBalance: "₹10,245", subscriptionStatus: "Active" },
    ],
  },
];

const DashboardPage: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">Acquisition & Attribution</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 px-4 py-2 rounded-full">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
              Bitcheer Store
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Store 1</DropdownMenuItem>
            <DropdownMenuItem>Store 2</DropdownMenuItem>
            <DropdownMenuItem>Store 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation and Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <Tabs defaultValue="all" className="w-full lg:w-auto">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-4 h-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
              <TabsTrigger value="search">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search anything
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="w-full sm:w-auto">
            <span className="mr-1">+</span> Add compare
          </Button>
        </div>
      </div>

      {/* Category Section */}
      <Card className="bg-card border-border shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-semibold">Category</CardTitle>
            <CardDescription className="text-muted-foreground">
              See your active workforce and make changes
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Edit className="h-4 w-4" /> Edit
            </Button>
            <Button className="flex items-center gap-1">
              <Upload className="h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Company & Stores</TableHead>
                <TableHead>Total Store</TableHead>
                <TableHead>Order Volume</TableHead>
                <TableHead>% Delivered Revenue</TableHead>
                <TableHead>Wallet Balance</TableHead>
                <TableHead>Subscription Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyStoreCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <TableRow className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="font-medium">
                      <Collapsible
                        open={openCategories[category.id]}
                        onOpenChange={() => toggleCategory(category.id)}
                        className="w-full"
                      >
                        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left py-2">
                          <ChevronDown className={cn("h-4 w-4 transition-transform", openCategories[category.id] && "rotate-180")} />
                          {category.name}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                          <div className="pl-8">
                            <Table>
                              <TableBody>
                                {category.stores.map((store) => (
                                  <TableRow key={store.id} className="bg-muted/20">
                                    <TableCell className="pl-0">{store.name}</TableCell>
                                    <TableCell></TableCell> {/* Empty for individual store */}
                                    <TableCell>{store.orderVolume}</TableCell>
                                    <TableCell>{store.deliveredRevenue}</TableCell>
                                    <TableCell>{store.walletBalance}</TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          store.subscriptionStatus === "Active"
                                            ? "default"
                                            : store.subscriptionStatus === "Active Daily"
                                            ? "secondary"
                                            : "outline"
                                        }
                                        className={cn(
                                          store.subscriptionStatus === "Active Daily" && "bg-yellow-600 text-white hover:bg-yellow-700",
                                          store.subscriptionStatus === "Free Trial" && "bg-gray-500 text-white hover:bg-gray-600"
                                        )}
                                      >
                                        {store.subscriptionStatus}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </TableCell>
                    <TableCell>{category.totalStores}</TableCell>
                    <TableCell>{category.stores.reduce((sum, store) => sum + store.orderVolume, 0)}</TableCell>
                    <TableCell>N/A</TableCell> {/* Aggregated value not directly from image, so N/A for category */}
                    <TableCell>N/A</TableCell> {/* Aggregated value not directly from image, so N/A for category */}
                    <TableCell>
                      <Badge variant="secondary">Total {category.totalStores}</Badge>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;