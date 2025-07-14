import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface StoreDetails {
  id: string;
  name: string;
  gmv: number;
  conversionRate: string;
  mrr: string;
  subscriptionStatus: 'Free Trial' | 'Active' | 'Active Daily' | 'Churned';
  lastLogin: string;
  dailyLogins: number;
  weeklyLogins: number;
  exportsScheduled: number;
  avgLoginFrequency: string;
  staffAccounts: number;
  adminPhone: string;
  adminEmail: string;
}

interface StoreDetailsDialogProps {
  store: StoreDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const StoreDetailsDialog: React.FC<StoreDetailsDialogProps> = ({ store, isOpen, onClose }) => {
  if (!store) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{store.name} Details</DialogTitle>
          <DialogDescription>
            Comprehensive information about {store.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="gmv" className="text-right">GMV:</Label>
            <span id="gmv" className="col-span-1">₹{store.gmv.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="mrr" className="text-right">MRR:</Label>
            <span id="mrr" className="col-span-1">{store.mrr}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="status" className="text-right">Subscription Status:</Label>
            <span id="status" className="col-span-1">{store.subscriptionStatus}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="lastLogin" className="text-right">Last Login:</Label>
            <span id="lastLogin" className="col-span-1">{store.lastLogin}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="dailyLogins" className="text-right">Daily Logins:</Label>
            <span id="dailyLogins" className="col-span-1">{store.dailyLogins}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="weeklyLogins" className="text-right">Weekly Logins:</Label>
            <span id="weeklyLogins" className="col-span-1">{store.weeklyLogins}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="avgLoginFrequency" className="text-right">Avg. Login Freq.:</Label>
            <span id="avgLoginFrequency" className="col-span-1">{store.avgLoginFrequency}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="staffAccounts" className="text-right">Staff Accounts:</Label>
            <span id="staffAccounts" className="col-span-1">{store.staffAccounts}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="adminPhone" className="text-right">Admin Phone:</Label>
            <span id="adminPhone" className="col-span-1">{store.adminPhone}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="adminEmail" className="text-right">Admin Email:</Label>
            <span id="adminEmail" className="col-span-1">{store.adminEmail}</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetailsDialog;