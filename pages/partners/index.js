import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import { db } from "@/settings/firebase.setting";
import { getDocs,collection,orderBy,query } from "firebase/firestore";
import React, { useState } from 'react';

// export async function getStaticProps() {
//     const partners = [];
//     const q = query(collection(db,'partners'), orderBy('createdAt', 'desc'));
//     const onSnapShot = await getDocs(q);
    
//     onSnapShot.forEach((doc) => {
        
//         partners.push({
//             id: doc.id,
//             data: doc.data(),

//         });
//     }) catch (error) {
//         console.error('Error fetching data from Firestore:', error);
//     }
 
//     return {
//         props: {
//             allPartners: partners//prop:data
//         }
//     }
// }

export async function getStaticProps() {
    const partners = [];

    // Create a Firestore query to get documents from the 'partners' collection, ordered by 'createdAt' in descending order
    const q = query(collection(db, 'partners'), orderBy('createdAt', 'desc'));

    try {
        // Use 'await' with 'getDocs' to fetch the data from Firestore
        const snapshot = await getDocs(q);

        // Iterate through the documents in the snapshot and transform them into the desired format
        snapshot.forEach((doc) => {
            partners.push({
                id:doc.id,
                data:doc.data(),

            });
            console.log("It worked oooo");

        });

        console.log("It worked");
    } catch (error) {
        console.error('Error fetching data from Firestore:', error);
    }

    return {
        props: {
            allPartners: partners,
        },
    };
}
export default function Partners(allPartners ) {
    console.log("////Yes", allPartners);
    return (
        <>
            <Head>
                <link rel='shortcut icon' href='facepal_icon_logo.ico' type='image/x-icon' />
                <title>facepal | connect with friends</title>
                <meta name='description' content='facepal is the coolest social media platform to connect with friends and hold money' />
            </Head>
            <main className="px-4 py-6 sm:px-16 md:px-24">
                <h1 className="text-4xl text-gray-700">
                    Choose from our list of partners to access financial services
                </h1>

                <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
                    {
                        '1 2 3 4 5 6 7 8 9'.split(' ').map(partner => (
                            <article className="shadow-md p-4 border border-gray-200 rounded-lg">
                                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                                    <blockquote>
                                        <span className="text-2xl">Company Name</span>
                                        <span>+23412345678</span>
                                    </blockquote>
                                    <Image
                                        width={120}
                                        height={120}
                                        src={`https://images.pexels.com/photos/3762927/pexels-photo-3762927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                                    alt="Company"/>
                                </div>

                                <Link href='#' className="flex flex-row justify-center gap-2 bg-violet-950 rounded-lg p-4 text-white">
                                    <span>View Profile</span>
                                </Link>
                            </article>
                        ))
                    }
                </section>
            </main>
        </>
    )
}