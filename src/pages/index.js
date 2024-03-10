import { useState, useEffect } from "react";
import BeforeAfter from "@/components/BeforeAfter";
import Link from "next/link";

const Home = () => {
  const wordlist = ["space", "work", "order", "style"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === wordlist.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-5 flex flex-col md:flex-row gap-2 md:items-center">
      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-5xl">
          Maximize{" "}
          <b key={wordlist[index]} className="gradient-text popIn">
            {wordlist[index]}
          </b>
          <br />
          in your room.
        </h1>
        <Link href="/room-organizer">
          <div className="text-center mt-5 bg-main hover:bg-secondary p-2 rounded text-white px-4 w-full md:w-1/2">Get Started</div>
        </Link>
      </div>
      <div className="md:w-1/2 mt-5 md:mt-0">
        <BeforeAfter
          beforeImage="/img/messy.png"
          afterImage="/img/tidy.png"
        />
      </div>
    </div>
  );
};

export default Home;
