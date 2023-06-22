import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

export default function Home({ imgUrl }) {
  const router = useRouter();
  const [counter, setCounter] = useState(0);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const increment = () => {
    setCounter((c) => (c += 1));
  };

  return (
    <>
      <h1>{counter}</h1>
      <div>
      <button type="button" onClick={refreshData}>
        refresh
      </button>
      <button type="button" onClick={increment}>
        increment
      </button>
      </div>
      <div style={{ position: 'relative',  height: '300px' }}>
      <Image
        src={imgUrl}
        alt="dog"
        layout="fill"
        objectFit="contain"
      />
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    method: "GET",
    cache: "no-cache",
  });
  const { message: imgUrl } = await res.json();
  return { props: { imgUrl } };
}
