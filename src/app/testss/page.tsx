"use client";
import { useMutation } from "convex/react";
import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import Image from "next/image";

export default function App() {
  const [ s, setS ] = useState("");
  const generateUploadUrl = useMutation(api.website.generateUploadUrl);

  const getImageUrl = useMutation(api.website.generateServeUrl)
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    // await saveStorageId({ storageId: (uploaded[0].response as any).storageId });
    const ss= await getImageUrl({
      storageId:(uploaded[0].response as any).storageId  as string
    })
    setS(ss as string)
  };

  return (
    <>
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
      {s && <Image alt="" src={s} fill/>}
    </>
  );
}
