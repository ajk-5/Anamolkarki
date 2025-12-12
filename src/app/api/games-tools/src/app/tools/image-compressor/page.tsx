import type { Metadata } from "next";
import ImageCompressorCanvasApp from "./ImageCompressorCanvasApp";

export const metadata: Metadata = {
  title: "Canvas Image Compressor & Converter | AVIF, WebP, JPEG, PNG",
  description:
    "Compress and convert images directly in your browser with AVIF, WebP, JPEG and PNG outputs. Includes auto optimization with PSNR, resizing and background fill controls.",
  keywords: [
    "image compressor",
    "webp converter",
    "avif encoder",
    "png to jpg",
    "browser image optimizer",
    "client side image compression",
  ],
  openGraph: {
    title: "Canvas Image Compressor & Converter | AVIF, WebP, JPEG, PNG",
    description:
      "Shrink images in the browser with auto-optimization, resize controls, and AVIF/WebP/JPEG/PNG export. No uploads.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Image Compressor & Converter (AVIF/WebP/JPEG/PNG)",
    description:
      "Compress and convert images locally with auto-optimization and PSNR guidance. 100% client-side.",
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressorCanvasApp />;
}
