import { Button } from "@radix-ui/themes";
import { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ImageUpload({ Icon, name }) {
  const fileRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  async function upload(ev) {
    const input = ev.target;
    if (input && input.files && input.files.length > 0) {
      setIsUploading(true);
      const file = input.files[0];
      const data = new FormData();
      data.set("file", file);
      const response = await axios.post("/api/upload", data);
      if (response.data.url) {
        setUrl(response.data.url);
        setIsUploading(false);
        setIsImageLoading(true);
      }
    }
  }

  const imgLoading = isUploading || isImageLoading;

  return (
    <>
      <div className="bg-gray-200 rounded-md border size-24 inline-flex items-center content-center justify-center">
        {imgLoading && (
          <AiOutlineLoading3Quarters
            size={24}
            className="animate-spin  text-gray-400"
          />
        )}
        {!isUploading && url && (
          <Image
            src={url}
            alt="image"
            width={1024}
            height={1024}
            onLoadingComplete={() => setIsImageLoading(false)}
            className="w-auto h-auto max-w-24 max-h-24"
          />
        )}
        {!imgLoading && !url && <Icon size={24} className="text-gray-400" />}
      </div>
      <input type="hidden" value={url} name={name} />
      <div className="mt-2">
        <input onChange={upload} ref={fileRef} type="file" className="hidden" />
        <Button
          type="button"
          onClick={() => fileRef.current.click()}
          variant="soft"
        >
          Select File
        </Button>
      </div>
    </>
  );
}
