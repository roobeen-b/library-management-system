import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NewBook = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <BookForm />
    </>
  );
};

export default NewBook;
