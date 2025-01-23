"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occured while creating the book",
    };
  }
};

export const getBookDetails = async (id: string) => {
  try {
    const bookDetails = await db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .limit(1);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookDetails[0])),
    };
  } catch (error) {
    console.error("Error getting book details: ", error);
    return {
      success: false,
      message: "An error occured while fetching book details",
    };
  }
};
