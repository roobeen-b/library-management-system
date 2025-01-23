import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { getBookDetails } from "@/lib/actions/book";
import { redirect } from "next/navigation";

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();

  const id = (await params).id;

  const bookDetails = await getBookDetails(id);

  if (!bookDetails.success) redirect("/404");

  return (
    <>
      <BookOverview
        {...bookDetails.data}
        userId={session?.user?.id as string}
      />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>

            <div className="w-1/2">
              <BookVideo videoUrl={bookDetails.data.videoUrl} />
            </div>
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.data.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;
