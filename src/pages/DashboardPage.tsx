import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Edit } from "lucide-react"; // Removed Search
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PirateMetricsSummary from "@/components/PirateMetricsSummary";
import { showSuccess } from "@/utils/toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import StoreDetailsDialog from "@/components/StoreDetailsDialog";
import ActivationFunnelChart from "@/components/ActivationFunnelChart";
import AddCreditsDialog from "@/components/AddCreditsDialog";
import { DateRange } from "react-day-picker";

interface Store {
  id: string;
  name: string;
  gmv: number; // Gross Merchandise Value
  conversionRate: string; // e.g., "2.5%"
  mrr: string; // Monthly Recurring Revenue
  subscriptionStatus: 'Free Trial' | 'Active' | 'Active Daily' | 'Churned' | 'Banned'; // Added 'Banned' status
  lastLogin: string; // e.g., "2 days ago"
  dailyLogins: number;
  weeklyLogins: number;
  exportsScheduled: number;
  avgLoginFrequency: string; // e.g., "3 times/week"
  staffAccounts: number;
  adminPhone: string;
  adminEmail: string;
  creditsInWallet: number; // New field for credits
}

interface StoreCategory {
  id: string;
  name: string;
  totalStores: number;
  stores: Store[];
}

const initialDummyStoreCategories: StoreCategory[] = [
  {
    id: "d2c",
    name: "D2C Brands",
    totalStores: 10,
    stores: [
      { id: "d2c-1", name: "Fashion Nova", gmv: 150000, conversionRate: "3.2%", mrr: "₹5,000", subscriptionStatus: "Active", lastLogin: "2 days ago", dailyLogins: 15, weeklyLogins: 90, exportsScheduled: 5, avgLoginFrequency: "5 times/day", staffAccounts: 10, adminPhone: "+91-9876543210", adminEmail: "fashion.admin@example.com", creditsInWallet: 500 },
      { id: "d2c-2", name: "Beauty Bliss", gmv: 35000, conversionRate: "2.8%", mrr: "₹1,500", subscriptionStatus: "Active Daily", lastLogin: "today", dailyLogins: 20, weeklyLogins: 120, exportsScheduled: 2, avgLoginFrequency: "7 times/day", staffAccounts: 5, adminPhone: "+91-9988776655", adminEmail: "beauty.admin@example.com", creditsInWallet: 200 },
      { id: "d2c-3", name: "Home Decor Hub", gmv: 80000, conversionRate: "4.1%", mrr: "₹3,000", subscriptionStatus: "Active", lastLogin: "5 hours ago", dailyLogins: 10, weeklyLogins: 70, exportsScheduled: 8, avgLoginFrequency: "3 times/day", staffAccounts: 8, adminPhone: "+91-9123456789", adminEmail: "homedecor.admin@example.com", creditsInWallet: 1000 },
    ],
  },
  {
    id: "omni-channel",
    name: "Omni-Channel Retailers",
    totalStores: 5,
    stores: [
      { id: "oc-1", name: "Global Gadgets", gmv: 200000, conversionRate: "1.5%", mrr: "₹8,000", subscriptionStatus: "Active", lastLogin: "1 day ago", dailyLogins: 25, weeklyLogins: 150, exportsScheduled: 10, avgLoginFrequency: "6 times/day", staffAccounts: 12, adminPhone: "+91-9000011111", adminEmail: "gadgets.admin@example.com", creditsInWallet: 750 },
      { id: "oc-2", name: "Urban Outfitters", gmv: 75000, conversionRate: "2.0%", mrr: "₹2,500", subscriptionStatus: "Free Trial", lastLogin: "3 days ago", dailyLogins: 5, weeklyLogins: 30, exportsScheduled: 1, avgLoginFrequency: "2 times/day", staffAccounts: 3, adminPhone: "+91-9765432109", adminEmail: "urban.admin@example.com", creditsInWallet: 50 },
    ],
  },
  {
    id: "dropshippers",
    name: "Dropshippers",
    totalStores: 5,
    stores: [
      { id: "ds-1", name: "Trendy Finds", gmv: 12000, conversionRate: "1.8%", mrr: "₹500", subscriptionStatus: "Active Daily", lastLogin: "today", dailyLogins: 8, weeklyLogins: 50, exportsScheduled: 3, avgLoginFrequency: "4 times/day", staffAccounts: 2, adminPhone: "+91-9555544444", adminEmail: "trendy.admin@example.com", creditsInWallet: 150 },
      { id: "ds-2", name: "Niche Nook", gmv: 8000, conversionRate: "2.1%", mrr: "₹300", subscriptionStatus: "Churned", lastLogin: "10 days ago", dailyLogins: 0, weeklyLogins: 0, exportsScheduled: 0, avgLoginFrequency: "0 times/day", staffAccounts: 1, adminPhone: "+91-9333322222", adminEmail: "niche.admin@example.com", creditsInWallet: 0 },
    ],
  },
];

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });
  const [compareDateRange, setCompareDateRange] = React.useState<DateRange | undefined>(undefined);
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<Store | null>(null);
  const [isAddCreditsDialogOpen, setIsAddCreditsDialogOpen] = React.useState(false);
  const [storeToCredit, setStoreToCredit] = React.useState<{ id: string; name: string } | null>(null);
  const [storeCategories, setStoreCategories] = React.useState<StoreCategory[]>(initialDummyStoreCategories);

  const [isPrimaryCalendarOpen, setIsPrimaryCalendarOpen] = React.useState(false);
  const [isCompareCalendarOpen, setIsCompareCalendarOpen] = React.useState(false);

  // Dummy data for Pirate Metrics (now passed as prop)
  const pirateMetrics = {
    acquisition: { value: "1,250 New Stores", description: "+20.1% from last month" },
    retention: { value: "92% Retained", description: "-1.2% from last month" },
    revenue: { value: "₹450,000 MRR", description: "+15% from last month" },
    dailyLogins: { value: "1,200", description: "Avg. 1.5 logins/store" },
    weeklyLogins: { value: "7,500", description: "Avg. 9.3 logins/store" },
    exportsScheduled: { value: "350", description: "+5% from last month" },
    avgLoginFrequency: { value: "3 times/week", description: "Consistent engagement" },
  };

  // Dummy data for Activation Funnel (now passed as prop)
  const primaryFunnelData = [
    { name: 'Signed Up', value: 1500 },
    { name: 'Shopify Integrated', value: 1100 },
    { name: 'Meta Ads Integrated', value: 900 },
    { name: 'Shiprocket Integrated', value: 700 },
  ];

  const compareFunnelData = [
    { name: 'Signed Up', value: 1300 },
    { name: 'Shopify Integrated', value: 950 },
    { name: 'Meta Ads Integrated', value: 750 },
    { name: 'Shiprocket Integrated', value: 600 },
  ];


  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleStoreClick = (store: Store) => {
    setSelectedStore({
      id: store.id,
      name: store.name,
      adminPhone: store.adminPhone,
      adminEmail: store.adminEmail,
      gmv: 0, // Dummy values to satisfy interface, not used in dialog
      conversionRate: '',
      mrr: '',
      subscriptionStatus: 'Active',
      lastLogin: '',
      dailyLogins: 0,
      weeklyLogins: 0,
      exportsScheduled: 0,
      avgLoginFrequency: '',
      staffAccounts: 0,
      creditsInWallet: 0,
    });
    setIsDetailsDialogOpen(true);
  };

  const handleToggleBan = (storeId: string) => {
    setStoreCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        stores: category.stores.map(store => {
          if (store.id === storeId) {
            const newStatus = store.subscriptionStatus === 'Banned' ? 'Active' : 'Banned'; // Toggle between Banned and Active
            showSuccess(`${store.name} has been ${newStatus === 'Banned' ? 'banned' : 'unbanned'}.`);
            return { ...store, subscriptionStatus: newStatus };
          }
          return store;
        }),
      }))
    );
  };

  const handleOpenAddCreditsDialog = (storeId: string, storeName: string) => {
    setStoreToCredit({ id: storeId, name: storeName });
    setIsAddCreditsDialogOpen(true);
  };

  const handleAddCredits = (storeId: string, amount: number) => {
    setStoreCategories(prevCategories =>
      prevCategories.map(category => ({
        ...category,
        stores: category.stores.map(store => {
          if (store.id === storeId) {
            return { ...store, creditsInWallet: store.creditsInWallet + amount };
          }
          return store;
        }),
      }))
    );
    showSuccess(`Successfully added ${amount} credits to ${storeToCredit?.name}'s wallet!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">Super Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle /> {/* Dark mode toggle */}
        </div>
      </div>

      {/* Navigation and Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
          <Popover open={isPrimaryCalendarOpen} onOpenChange={setIsPrimaryCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[280px] justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  if (range?.from && range?.to) {
                    setIsPrimaryCalendarOpen(false);
                  }
                }}
                initialFocus
                toDate={new Date()} // Restrict to current date
              />
            </PopoverContent>
          </Popover>
          <Popover open={isCompareCalendarOpen} onOpenChange={setIsCompareCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {compareDateRange?.from ? (
                  compareDateRange.to ? (
                    <>
                      {format(compareDateRange.from, "LLL dd, y")} -{" "}
                      {format(compareDateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(compareDateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Add compare</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={compareDateRange}
                onSelect={(range) => {
                  setCompareDateRange(range);
                  if (range?.from && range?.to) {
                    setIsCompareCalendarOpen(false);
                  }
                }}
                initialFocus
                toDate={dateRange?.from || new Date()} // Restrict to primary date range start or current date
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Pirate Metrics Summary */}
      <PirateMetricsSummary dateRange={dateRange} compareDateRange={compareDateRange} metrics={pirateMetrics} />

      {/* Activation Funnel Chart */}
      <ActivationFunnelChart dateRange={dateRange} compareDateRange={compareDateRange} primaryData={primaryFunnelData} compareData={compareFunnelData} />

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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" /> Edit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit Store Categories</AlertDialogTitle>
                  <AlertDialogDescription>
                    This feature is under development. You will be able to edit store categories here soon.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction onClick={() => showSuccess("Edit functionality will be available soon!")}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Store Category / Store</TableHead>
                <TableHead className="w-[100px]">Total Stores</TableHead>
                <TableHead className="w-[100px]">GMV</TableHead>
                <TableHead className="w-[120px]">Conversion Rate</TableHead>
                <TableHead className="w-[100px]">MRR</TableHead>
                <TableHead className="w-[150px]">Subscription Status</TableHead>
                <TableHead className="w-[120px]">Last Login</TableHead>
                <TableHead className="w-[100px]">Daily Logins</TableHead>
                <TableHead className="w-[100px]">Weekly Logins</TableHead>
                <TableHead className="w-[120px]">Exports Scheduled</TableHead>
                <TableHead className="w-[120px]">Avg. Login Freq.</TableHead>
                <TableHead className="w-[100px]">Credits</TableHead> {/* New Credits column */}
                <TableHead className="text-right w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <Collapsible
                    open={openCategories[category.id]}
                    onOpenChange={() => toggleCategory(category.id)}
                    className="contents"
                  >
                    <TableRow className="hover:bg-muted/50 cursor-pointer">
                      <TableCell className="font-medium w-[150px]">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="flex items-center gap-2 w-full justify-start text-left py-2 px-0">
                            <ChevronDown className={cn("h-4 w-4 transition-transform", openCategories[category.id] && "rotate-180")} />
                            {category.name}
                          </Button>
                        </CollapsibleTrigger>
                      </TableCell>
                      <TableCell className="w-[100px]">{category.totalStores}</TableCell>
                      <TableCell className="w-[100px]">₹{category.stores.reduce((sum, store) => sum + store.gmv, 0).toLocaleString()}</TableCell>
                      <TableCell className="w-[120px]">N/A</TableCell>
                      <TableCell className="w-[100px]">₹{category.stores.reduce((sum, store) => sum + parseFloat(store.mrr.replace('₹', '').replace(',', '')), 0).toLocaleString()}</TableCell>
                      <TableCell className="w-[150px]">
                        <Badge variant="secondary">Total {category.totalStores}</Badge>
                      </TableCell>
                      <TableCell className="w-[120px]">N/A</TableCell>
                      <TableCell className="w-[100px]">N/A</TableCell>
                      <TableCell className="w-[100px]">N/A</TableCell>
                      <TableCell className="w-[120px]">N/A</TableCell>
                      <TableCell className="w-[120px]">N/A</TableCell>
                      <TableCell className="w-[100px]">N/A</TableCell> {/* N/A for category total credits */}
                      <TableCell className="text-right w-[150px]"></TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <TableRow>
                        <TableCell colSpan={13} className="p-0">
                          <Table className="w-full">
                            <TableBody>
                              {category.stores.map((store) => (
                                <TableRow key={store.id} className="bg-muted/20">
                                  <TableCell className="pl-8 w-[150px]"> {/* Aligned with 'Store Category / Store' */}
                                    <Button variant="link" onClick={() => handleStoreClick(store)} className="p-0 h-auto text-left">
                                      {store.name}
                                    </Button>
                                  </TableCell>
                                  <TableCell className="w-[100px]"></TableCell> {/* Empty cell to align with 'Total Stores' */}
                                  <TableCell className="w-[100px]">₹{store.gmv.toLocaleString()}</TableCell>
                                  <TableCell className="w-[120px]">{store.conversionRate}</TableCell>
                                  <TableCell className="w-[100px]">{store.mrr}</TableCell>
                                  <TableCell className="w-[150px]">
                                    <Badge
                                      variant={
                                        store.subscriptionStatus === "Active"
                                          ? "default"
                                          : store.subscriptionStatus === "Active Daily"
                                          ? "secondary"
                                          : store.subscriptionStatus === "Banned"
                                          ? "destructive"
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
                                  <TableCell className="w-[120px]">{store.lastLogin}</TableCell>
                                  <TableCell className="w-[100px]">{store.dailyLogins}</TableCell>
                                  <TableCell className="w-[100px]">{store.weeklyLogins}</TableCell>
                                  <TableCell className="w-[120px]">{store.exportsScheduled}</TableCell>
                                  <TableCell className="w-[120px]">{store.avgLoginFrequency}</TableCell>
                                  <TableCell className="w-[100px]">{store.creditsInWallet}</TableCell>
                                  <TableCell className="text-right w-[150px] flex justify-end items-center gap-2">
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          {store.subscriptionStatus === 'Banned' ? 'Unban' : 'Ban'}
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action will {store.subscriptionStatus === 'Banned' ? 'unban' : 'permanently ban'} {store.name} from accessing the platform.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleToggleBan(store.id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <Button size="sm" onClick={() => handleOpenAddCreditsDialog(store.id, store.name)}>Credits</Button>
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

      {/* Add Credits Dialog */}
      {storeToCredit && (
        <AddCreditsDialog
          isOpen={isAddCreditsDialogOpen}
          onClose={() => setIsAddCreditsDialogOpen(false)}
          onAddCredits={handleAddCredits}
          storeName={storeToCredit.name}
          storeId={storeToCredit.id}
        />
      )}
    </div>
  );
};

export default DashboardPage;