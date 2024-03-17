import React, { useState } from 'react';

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
  isOpen: boolean;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormData{
    title:string,
    description: string,
}
// Define GeneralDialog component
const CreateProjectDialog: React.FC<GeneralDialogProps> = ({isOpen, setisOpen }) => {
    const [formData, setFormData] = useState<FormData>({
        title:"",
        description:""
    })
  return (
    <Dialog  open={isOpen}>
    
      <DialogContent className="sm:max-w-[425px]" >
        {/* <DialogHeader >
          <DialogTitle className='text-white'>{formData.title}</DialogTitle>
          <DialogDescription className='text-white'>{formData.description}</DialogDescription>
        </DialogHeader> */}
        <div className=" text-white grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Project Name
              </Label>
              <Input id="title" value={formData.title}  onChange={(e)=> setFormData((prev)=>({...prev,title:e.target.value}))} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" onChange={(e)=> setFormData((prev)=>({...prev,description:e.target.value}))} value={formData.description} className="col-span-3" />
            </div>

        </div >
        <DialogFooter>
          <Button type="submit" className='text-white' onClick={()=>setisOpen((prev)=>(!prev))}>Close</Button>
          <Button type="submit" className='text-white' onClick={()=>{}}>Save changes</Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;







// Default props
CreateProjectDialog.defaultProps = {
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
