import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

export default function Home({ imgUrl, defaultBreed }) {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [breed, setBreed] = useState(defaultBreed);

  const refreshData = () => {
    const url = new URL(location.href);
    if (breed !== "all") {
      url.searchParams.set("breed", breed);
    } else {
      url.searchParams.delete("breed");
    }
    router.replace(url);
  };

  const increment = () => {
    setCounter((c) => (c += 1));
  };

  return (
    <>
      <div>
        <h1>{counter}</h1>
        <button type="button" onClick={increment}>
          increment
        </button>
      </div>

      <div>
        <select
          name="breed"
          defaultValue={defaultBreed}
          onChange={(e) => setBreed(e.target.value)}
        >
          <option value="all">All</option>
          <option value="cotondetulear">Coton de Tulear</option>
          <option value="dalmatian">Dalmatian</option>
          <option value="shiba">Shiba</option>
        </select>
        <button type="button" onClick={refreshData}>
          refresh
        </button>
        <div style={{ position: "relative", height: "300px" }}>
          <Image src={imgUrl} alt="dog" layout="fill" objectFit="contain" />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  let url = "https://dog.ceo/api/breeds/image/random";
  const breed = context?.query?.breed;
  if (breed && breed !== "all") {
    url = `https://dog.ceo/api/breed/${breed}/images/random`;
  }
  const res = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });
  const { message: imgUrl } = await res.json();
  return { props: { imgUrl, defaultBreed: breed ? breed : 'all' } };
}
