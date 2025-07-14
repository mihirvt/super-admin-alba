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
        <div className="grid grid-cols-3 items-center gap-4 py-4"> {/* Changed to 3 columns for better label/value alignment */}
          <Label htmlFor="adminEmail" className="col-span-1 text-right">Admin Email:</Label>
          <span id="adminEmail" className="col-span-2 text-left">{store.adminEmail}</span>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="adminPhone" className="col-span-1 text-right">Admin Phone:</Label>
          <span id="adminPhone" className="col-span-2 text-left">{store.adminPhone}</span>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetailsDialog;