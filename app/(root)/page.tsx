import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <BookOverview />
      <BookList />
    </>
  );
};
export default Home;
