"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

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
      error: "An error occured while fetching book details",
    };
  }
};

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;
  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is currently not available for borrowing",
      };
    }
  } catch (error) {
    console.error("Error while borrowing book: ", error);
    return {
      success: false,
      error: "An error occured while borrowing book",
    };
  }
};
