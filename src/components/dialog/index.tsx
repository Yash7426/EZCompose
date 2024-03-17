import React from 'react';

// Example import statements for UI components
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Button from '../ui/button';
import { Input } from '../ui/input';

// Define interface for dialog field
interface DialogField {
  id: string;
  label: string;
  value: string;
}

// Define props interface for GeneralDialog component
interface GeneralDialogProps {
  title: string;
  description: string;
  fields: DialogField[];
  onSubmit: () => void;
  isOpen: boolean;
  setisOpen: () => void;
}

// Define GeneralDialog component
const GeneralDialog: React.FC<GeneralDialogProps> = ({isOpen, title, description, fields, onSubmit,setisOpen }) => {
  return (
    <Dialog  open={isOpen}>
    
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader >
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field: DialogField) => (
            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.id} className="text-right">
                {field.label}
              </Label>
              <Input id={field.id} value={field.value} className="col-span-3" />
            </div>
          ))}
        </div >
        <DialogFooter>
          <Button type="submit" onClick={setisOpen}>Close</Button>
          <Button type="submit" onClick={onSubmit}>Save changes</Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralDialog;







// Default props
GeneralDialog.defaultProps = {
  title: 'Dialog Title',
  description: 'Dialog Description',
  fields: [],
  onSubmit: () => {}
};

// Usage Example:
// <GeneralDialog
//   triggerText="Edit Profile"
//   title="Edit Profile"
//   description="Make changes to your profile here. Click save when you're done."
//   fields={[
//     { id: "name", label: "Name", value: "Pedro Duarte" },
//     { id: "username", label: "Username", value: "@peduarte" }
//   ]}
//   onSubmit={() => console.log("Submitted")}
// />
