import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "J.T Timepieces",
    short_name: "JTTimepieces",
    description: "Where you can shop all my current inventory and source watches.",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "./icon.png",
        type: "image/png",
      },
    ],
  }
};
