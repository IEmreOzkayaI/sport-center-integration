import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
    return (
        <div className='rounded-md'>
            <main className="bg-black text-white text-center py-20 rounded-b-md rounded-t-md sm:rounded-t-none">
                <div className="mx-auto flex flex-col items-center sm:items-center">
                    <h2 className="text-xl sm:text-4xl font-bold mb-4">High Converting Software and SaaS Landing Page</h2>
                    <p className="text-sm sm:text-lg mb-8 w-72 sm:w-screen">
                        Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </p>
                    <button className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full text-lg ">Get Started</button>

                </div>
                <div className="mt-12 relative">
                    <img src="/landing.png" alt="Dashboard" className="mx-auto rounded-lg shadow-lg" />
                </div>
            </main>
        </div>
    );
}
