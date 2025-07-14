import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface StoreDetails {
  id: string;
  name: string;
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
            Key administrative details for {store.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="adminEmail" className="text-right">Admin Email:</Label>
            <span id="adminEmail" className="col-span-1">{store.adminEmail}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="adminPhone" className="text-right">Admin Phone:</Label>
            <span id="adminPhone" className="col-span-1">{store.adminPhone}</span>
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