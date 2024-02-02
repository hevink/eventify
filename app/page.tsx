"use client";

import React, { FC, useCallback, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function Home() {
  return (
    <div>
      <CldUploadWidget uploadPreset="jloy1x1e">
        {({ open }) => {
          return <button onClick={() => open?.()}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </div>
  );
}
