import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent }g from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Edit, Search } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PirateMetricsSummary from "@/components/PirateMetricsSummary";
import { showSuccess } from "@/utils/toast"; // Import toast utility
import { ThemeToggle } from "@/components/ThemeToggle"; // Import ThemeToggle
import StoreDetailsDialog from "@/components/StoreDetailsDialog"; // Import StoreDetailsDialog

interface Store {
  id: string;
  name: string;
  gmv: number; // Gross Merchandise Value
  conversionRate: string; // e.g., "2.5%"
  mrr: string; // Monthly Recurring Revenue
  subscriptionStatus: 'Free Trial' | 'Active' | 'Active Daily' | 'Churned';
  lastLogin: string; // e.g., "2 days ago"
  dailyLogins: number;
  weeklyLogins: number;
  exportsScheduled: number;
  avgLoginFrequency: string; // e.g., "3 times/week"
  staffAccounts: number;
  adminPhone: string;
  adminEmail: string;
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
    name: "D2C Brands",
    totalStores: 10,
    stores: [
      { id: "d2c-1", name: "Fashion Nova", gmv: 150000, conversionRate: "3.2%", mrr: "₹5,000", subscriptionStatus: "Active", lastLogin: "2 days ago", dailyLogins: 15, weeklyLogins: 90, exportsScheduled: 5, avgLoginFrequency: "5 times/day", staffAccounts: 10, adminPhone: "+91-9876543210", adminEmail: "fashion.admin@example.com" },
      { id: "d2c-2", name: "Beauty Bliss", gmv: 35000, conversionRate: "2.8%", mrr: "₹1,500", subscriptionStatus: "Active Daily", lastLogin: "today", dailyLogins: 20, weeklyLogins: 120, exportsScheduled: 2, avgLoginFrequency: "7 times/day", staffAccounts: 5, adminPhone: "+91-9988776655", adminEmail: "beauty.admin@example.com" },
      { id: "d2c-3", name: "Home Decor Hub", gmv: 80000, conversionRate: "4.1%", mrr: "₹3,000", subscriptionStatus: "Active", lastLogin: "5 hours ago", dailyLogins: 10, weeklyLogins: 70, exportsScheduled: 8, avgLoginFrequency: "3 times/day", staffAccounts: 8, adminPhone: "+91-9123456789", adminEmail: "homedecor.admin@example.com" },
    ],
  },
  {
    id: "omni-channel",
    name: "Omni-Channel Retailers",
    totalStores: 5,
    stores: [
      { id: "oc-1", name: "Global Gadgets", gmv: 200000, conversionRate: "1.5%", mrr: "₹8,000", subscriptionStatus: "Active", lastLogin: "1 day ago", dailyLogins: 25, weeklyLogins: 150, exportsScheduled: 10, avgLoginFrequency: "6 times/day", staffAccounts: 12, adminPhone: "+91-9000011111", adminEmail: "gadgets.admin@example.com" },
      { id: "oc-2", name: "Urban Outfitters", gmv: 75000, conversionRate: "2.0%", mrr: "₹2,500", subscriptionStatus: "Free Trial", lastLogin: "3 days ago", dailyLogins: 5, weeklyLogins: 30, exportsScheduled: 1, avgLoginFrequency: "2 times/day", staffAccounts: 3, adminPhone: "+91-9765432109", adminEmail: "urban.admin@example.com" },
    ],
  },
  {
    id: "dropshippers",
    name: "Dropshippers",
    totalStores: 5,
    stores: [
      { id: "ds-1", name: "Trendy Finds", gmv: 12000, conversionRate: "1.8%", mrr: "₹500", subscriptionStatus: "Active Daily", lastLogin: "today", dailyLogins: 8, weeklyLogins: 50, exportsScheduled: 3, avgLoginFrequency: "4 times/day", staffAccounts: 2, adminPhone: "+91-9555544444", adminEmail: "trendy.admin@example.com" },
      { id: "ds-2", name: "Niche Nook", gmv: 8000, conversionRate: "2.1%", mrr: "₹300", subscriptionStatus: "Churned", lastLogin: "10 days ago", dailyLogins: 0, weeklyLogins: 0, exportsScheduled: 0, avgLoginFrequency: "0 times/day", staffAccounts: 1, adminPhone: "+91-9333322222", adminEmail: "niche.admin@example.com" },
    ],
  },
];

const DashboardPage: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<Store | null>(null);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setIsDetailsDialogOpen(true);
  };

  const handleEditClick = () => {
    showSuccess("Edit action triggered!");
  };

  const handleBanUser = (storeName: string) => {
    showSuccess(`Banning user for ${storeName}...`);
  };

  const handleGiveCredits = (storeName: string) => {
    showSuccess(`Giving free credits to ${storeName}...`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">Super Admin Dashboard</h1>
        <div className="flex items-center gap-4">
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
          <ThemeToggle /> {/* Dark mode toggle */}
        </div>
      </div>

      {/* Navigation and Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <Tabs defaultValue="all" className="w-full lg:w-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-2 h-auto">
              <TabsTrigger value="all">All</TabsTrigger>
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

      {/* Pirate Metrics Summary */}
      <PirateMetricsSummary />

      {/* Category Section */}
      <Card className="bg-card border-border shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-2xl font-semibold">Store Categories</CardTitle>
            <CardDescription className="text-muted-foreground">
              Overview of onboarded stores by category and their key metrics.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1" onClick={handleEditClick}>
              <Edit className="h-4 w-4" /> Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Store Category / Store</TableHead>
                <TableHead>Total Stores</TableHead>
                <TableHead>GMV</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>Subscription Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Daily Logins</TableHead>
                <TableHead>Weekly Logins</TableHead>
                <TableHead>Exports Scheduled</TableHead>
                <TableHead>Avg. Login Freq.</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyStoreCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <Collapsible
                    open={openCategories[category.id]}
                    onOpenChange={() => toggleCategory(category.id)}
                    className="contents" // This makes the Collapsible not render an extra div, allowing TableRow to be direct child of TableBody
                  >
                    <TableRow className="hover:bg-muted/50 cursor-pointer">
                      <TableCell className="font-medium">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="flex items-center gap-2 w-full justify-start text-left py-2 px-0">
                            <ChevronDown className={cn("h-4 w-4 transition-transform", openCategories[category.id] && "rotate-180")} />
                            {category.name}
                          </Button>
                        </CollapsibleTrigger>
                      </TableCell>
                      <TableCell>{category.totalStores}</TableCell>
                      <TableCell>₹{category.stores.reduce((sum, store) => sum + store.gmv, 0).toLocaleString()}</TableCell>
                      <TableCell>N/A</TableCell> {/* Aggregated value not directly from image, so N/A for category */}
                      <TableCell>₹{category.stores.reduce((sum, store) => sum + parseFloat(store.mrr.replace('₹', '').replace(',', '')), 0).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Total {category.totalStores}</Badge>
                      </TableCell>
                      <TableCell>N/A</TableCell> {/* For Last Login */}
                      <TableCell>N/A</TableCell> {/* For Daily Logins */}
                      <TableCell>N/A</TableCell> {/* For Weekly Logins */}
                      <TableCell>N/A</TableCell> {/* For Exports Scheduled */}
                      <TableCell>N/A</TableCell> {/* For Avg. Login Freq. */}
                      <TableCell className="text-right"></TableCell> {/* Empty for Actions */}
                    </TableRow>
                    <CollapsibleContent asChild>
                      <TableRow>
                        <TableCell colSpan={12} className="p-0"> {/* colSpan should match total columns */}
                          <Table className="w-full">
                            <TableBody>
                              {category.stores.map((store) => (
                                <TableRow key={store.id} className="bg-muted/20">
                                  <TableCell className="pl-8">
                                    <Button variant="link" onClick={() => handleStoreClick(store)} className="p-0 h-auto text-left">
                                      {store.name}
                                    </Button>
                                  </TableCell>
                                  <TableCell></TableCell> {/* Empty for Total Stores */}
                                  <TableCell>₹{store.gmv.toLocaleString()}</TableCell>
                                  <TableCell>{store.conversionRate}</TableCell>
                                  <TableCell>{store.mrr}</TableCell>
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
                                        store.subscriptionStatus === "Free Trial" && "bg-gray-500 text-white hover:bg-gray-600",
                                        store.subscriptionStatus === "Churned" && "bg-red-600 text-white hover:bg-red-700"
                                      )}
                                    >
                                      {store.subscriptionStatus}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{store.lastLogin}</TableCell>
                                  <TableCell>{store.dailyLogins}</TableCell>
                                  <TableCell>{store.weeklyLogins}</TableCell>
                                  <TableCell>{store.exportsScheduled}</TableCell>
                                  <TableCell>{store.avgLoginFrequency}</TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleBanUser(store.name)}>Ban</Button>
                                    <Button size="sm" onClick={() => handleGiveCredits(store.name)}>Credits</Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </Collapsible>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Store Details Dialog */}
      <StoreDetailsDialog
        store={selectedStore}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;