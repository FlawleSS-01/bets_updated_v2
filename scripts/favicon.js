import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import favicons from "favicons";

const source = "public/img/favicon.png";

const config = {
  path: "/favicons",
  appName: process.env.PUBLIC_BRAND,
  background: "transparent",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: true,
    yandex: false,
  },
};

if (!fs.existsSync(source)) {
  console.error(`File ${source} not found!`);
  process.exit(1);
}

(async () => {
  try {
    console.log("Start generating favicons...");

    const response = await favicons(source, config);

    fs.mkdirSync("public/favicons", { recursive: true });

    response.images.forEach((image) => {
      fs.writeFileSync(`public/favicons/${image.name}`, image.contents);
    });

    response.files.forEach((file) => {
      fs.writeFileSync(`public/favicons/${file.name}`, file.contents);
    });

    const indexPath = "src/layouts/BaseLayout.astro";
    let indexLayout = fs.readFileSync(indexPath, "utf8");

    indexLayout = indexLayout.replace(
      /<!-- FAVICONS START -->([\s\S]*?)<!-- FAVICONS END -->/g,
      "",
    );

    const tags = response.html.join("\n  ");
    const injectBlock = `<!-- FAVICONS START -->\n  ${tags}\n  <!-- FAVICONS END -->`;

    indexLayout = indexLayout.replace("</head>", `${injectBlock}\n</head>`);

    fs.writeFileSync(indexPath, indexLayout);

    console.log("Favicons generated!");
  } catch (err) {
    console.error("Error during favicon generation:", err);
  }
})();
