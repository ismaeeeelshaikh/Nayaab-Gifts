"use client";

import { useEffect, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  disabled,
}: ImageUploadProps) {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const onUpload = (result: any) => {
    const nextValues = [...valueRef.current, result.info.secure_url];
    valueRef.current = nextValues;
    onChange(nextValues);
  };

  const onRemove = (url: string) => {
    const nextValues = valueRef.current.filter((current) => current !== url);
    valueRef.current = nextValues;
    onChange(nextValues);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Product image" src={url} />
          </div>
        ))}
      </div>

      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "nayaab-gifts"}
        options={{
          multiple: true,
          maxFiles: 5
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={onClick}
              >
                Upload an Image
              </Button>
              <p className="text-xs text-muted-foreground">
                Recommended size: 1080x1080px (1:1 aspect ratio)
              </p>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
