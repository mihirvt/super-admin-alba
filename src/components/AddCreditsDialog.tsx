import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";
import CreditAmountInput from './CreditAmountInput'; // Import the new component

interface AddCreditsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCredits: (storeId: string, amount: number) => void;
  storeName: string;
  storeId: string;
}

const AddCreditsDialog: React.FC<AddCreditsDialogProps> = ({ isOpen, onClose, onAddCredits, storeName, storeId }) => {
  const [amount, setAmount] = React.useState<string>('');

  const handleSubmit = () => {
    const creditAmount = parseFloat(amount);
    if (isNaN(creditAmount) || creditAmount <= 0) {
      showError("Please enter a valid positive number for credits.");
      return;
    }
    onAddCredits(storeId, creditAmount);
    setAmount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Credits to {storeName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="credits" className="text-right">
              Amount
            </Label>
            <div className="col-span-3">
              <CreditAmountInput
                value={amount}
                onChange={setAmount}
                placeholder="e.g., 100"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Credits</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditsDialog;