import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Y học lành mạnh",
    short_name: "Y học lành mạnh",
    description: "Nội dung về dinh dưỡng thực vật, y học dự phòng và khoa học có đạo đức.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f5c73",
    lang: "vi",
  };
}
