import React, { useState } from "react";

// Example import statements for UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Button from "../ui/button";
import { Input } from "../ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadFileResponse } from "@xixixao/uploadstuff";
import { UploadDropzone } from "@xixixao/uploadstuff/react";
import { useRouter } from "next/navigation";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { useuserDetailsContext } from "@/contexts/user-details";
import { Id } from "../../../convex/_generated/dataModel";

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
interface FormData {
  title: string;
  description: string;
}
// Define GeneralDialog component
const CreateProjectDialog: React.FC<GeneralDialogProps> = ({
  isOpen,
  setisOpen,
}) => {
  const [s, setS] = useState("");
  const [showSave, setShowSave] = useState(true);
  const generateUploadUrl = useMutation(api.website.generateUploadUrl);

  const getImageUrl = useMutation(api.website.generateServeUrl);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    // await saveStorageId({ storageId: (uploaded[0].response as any).storageId });
    const ss = await getImageUrl({
      storageId: (uploaded[0].response as any).storageId as string,
    });
    setS(ss as string);
    setShowSave(false);
  };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  const router = useRouter();
  const user1 = useStoreUserEffect();
  const createWebsite = useMutation(api.website.createWebsite);
  const updateWebsite = useMutation(api.website.updateWebsite);
  const createWebpage = useMutation(api.webpage.createWebpage);
  let UserDetailsState = useuserDetailsContext();

  const createNewWebsite = async () => {
    try {
      if (formData.title.length < 1) {
        alert("Website name can not be blank");
        return;
      }
      if (formData.title.length < 5) {
        alert("Website name should have atleast 6 characters.");
        return;
      }
      if (formData.description.length < 1) {
        alert("Description can not be blank");
        return;
      }

      let __webName = formData.title;

      //remove special chars
      __webName = __webName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");

      try {
        const websiteId = await createWebsite({
          user: user1?._id as Id<"users">,
          name: __webName,
          bannerImage: s,
          description: formData.description,
        });
        UserDetailsState.setEditorState((prev) => ({
          ...prev,
          websiteId: websiteId,
        }));
        const indexPageId = await createWebpage({
          faviconUri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFf_7kDwWnZhDhBoJfNqdCXtceqDMhh5yzMQ&usqp=CAU",
          description: "",
          socialImage: "",
          title: "index",
          author: user1?._id as Id<"users">,
          url: "index",
          isPublished: false,
          isDropEnabled: true,
          settingMode: BigInt(-1),
          analyticsId: "",
          fonts: [],
          websiteId: websiteId as Id<"website">,
          elements: [],
          prevImageUri: "",
        });

        // create a default web page
        router.push(`/design/${websiteId}/${indexPageId}`);
      } catch (error) {
        // closeModal();
        console.error(error);
      }
    } catch (err) {}
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl mx-auto">
            Create a new Website
          </DialogTitle>
          {/* <DialogDescription className='text-white'>{formData.description}</DialogDescription> */}
        </DialogHeader>

        <div className=" text-white grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-center">
              Project Name
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-center">
              Description
            </Label>
            <Input
              id="description"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={formData.description}
              className="col-span-3"
            />
          </div>
          <div className="px-4 -mr-4">
            <UploadDropzone
              uploadUrl={generateUploadUrl}
              fileTypes={{
                "application/pdf": [".pdf"],
                "image/*": [".png", ".gif", ".jpeg", ".jpg"],
              }}
              onUploadComplete={saveAfterUpload}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant={"outline"}
            className="flex items-center gap-2 text-lg"
            onClick={() => setisOpen((prev) => !prev)}
          >
            Close
          </Button>
          <Button
            disabled={showSave}
            type="submit"
            variant={"outline"}
            className="flex items-center gap-2 text-lg"
            onClick={() => {
              createNewWebsite();
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;

// Default props
// CreateProjectDialog.defaultProps = {};

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
