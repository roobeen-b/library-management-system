import dummyBooks from "../dummyBooks.json";
import ImageKit from "imagekit";
import { books } from "./schema";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (
  url: string,
  filename: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName: filename,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.log("Error uploading image to imagekit: ", error);
  }
};

const seed = async () => {
  console.log("Seeding start...");
  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.jpg`,
        "/books/videos"
      )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    console.log("Seeding successful...");
  } catch (error) {
    console.log("Error seeding database: ", error);
  }
};

seed();
