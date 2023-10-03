import Image from "next/image";
import Head from "next/head";
import { db } from "@/settings/firebase.setting";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  //
  const onSnapShot = await getDocs(collection(db, "partners"));
  const paths = onSnapShot.docs.map((doc) => {
    return {
      params: {
        pagePath: doc.data().pagePath,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  const partner = ["hello"];

  return {
    props: {
      data: partner,
    },
  };
}

export default function partnerInfo({ data }) {
  const router = useRouter();

  let partnerDoc = [];

  const getPartnerInfo = async () => {
    const q = query(
      collection(db, "partners"),
      where("pagePath", "==", `${router.query.pagePath}`)
    );
    const onSnapShot = await getDocs(q);
    onSnapShot.docs.map((doc) => {
      let doc_ = {
        data: doc.data(),
      };
      doc_.id = doc.id;
      partnerDoc.push(doc_);
    });
  };

  getPartnerInfo();
  console.log(partnerDoc);

  const qu = query(
    collection(db, "partners"),
    where("createdAt", ">", 1690000000000)
  );
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="facepal_icon_logo.ico"
          type="image/x-icon"
        />
        <title>facepal | connect with friends</title>
        <meta
          name="description"
          content="facepal is the coolest social media platform to connect with friends and hold money"
        />
      </Head>
      <main className="px-4 py-6 sm:px-16 md:px-24"></main>
    </>
  );
}
