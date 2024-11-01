const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(process.cwd(), "public/images");
const OUTPUT_DIR = path.join(process.cwd(), "public");

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function generateImages() {
  try {
    console.log("🎨 Starting image generation...");

    // Favicon generations
    const faviconSizes = [16, 32, 192, 512];
    console.log("📐 Generating favicons...");
    for (const size of faviconSizes) {
      await sharp(path.join(IMAGES_DIR, "favicon.svg"))
        .resize(size, size)
        .png()
        .toFile(path.join(OUTPUT_DIR, `favicon-${size}x${size}.png`));
      console.log(`✅ Generated favicon-${size}x${size}.png`);
    }

    // Special favicon for root
    await sharp(path.join(IMAGES_DIR, "favicon.svg"))
      .resize(32, 32)
      .png()
      .toFile(path.join(OUTPUT_DIR, "favicon.ico"));
    console.log("✅ Generated favicon.ico");

    // Apple Touch Icon
    await sharp(path.join(IMAGES_DIR, "favicon.svg"))
      .resize(180, 180)
      .png()
      .toFile(path.join(OUTPUT_DIR, "apple-touch-icon.png"));
    console.log("✅ Generated apple-touch-icon.png");

    // OG Image
    console.log("📐 Generating OG image...");
    await sharp(path.join(IMAGES_DIR, "og-image.svg"))
      .resize(1200, 630)
      .png()
      .toFile(path.join(OUTPUT_DIR, "og-image.png"));
    console.log("✅ Generated og-image.png");

    // Logo
    console.log("📐 Generating logo...");
    await sharp(path.join(IMAGES_DIR, "logo.svg"))
      .resize(200, 200)
      .png()
      .toFile(path.join(OUTPUT_DIR, "logo.png"));
    console.log("✅ Generated logo.png");

    // Android Chrome Icons
    console.log("📐 Generating Android Chrome icons...");
    await sharp(path.join(IMAGES_DIR, "favicon.svg"))
      .resize(192, 192)
      .png()
      .toFile(path.join(OUTPUT_DIR, "android-chrome-192x192.png"));
    console.log("✅ Generated android-chrome-192x192.png");

    await sharp(path.join(IMAGES_DIR, "favicon.svg"))
      .resize(512, 512)
      .png()
      .toFile(path.join(OUTPUT_DIR, "android-chrome-512x512.png"));
    console.log("✅ Generated android-chrome-512x512.png");

    console.log("🎉 All images generated successfully!");
  } catch (error) {
    console.error("❌ Error generating images:", error);
    process.exit(1);
  }
}

generateImages();
