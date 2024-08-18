import Image from 'next/image';

export default function Home() {
    return (
        <div className='rounded-md'>
            <main className="bg-black text-white text-center py-20 rounded-b-md rounded-t-md sm:rounded-t-none">
                <div className="flex flex-col items-center sm:items-center">
                    <h2 className="text-xl sm:text-4xl font-bold mb-4">Spor Salonları ve Diyetisyenler Arası Köprü</h2>
                    <p className="text-sm text-center sm:text-lg">
                        Üyelerinizi ve diyetisyenlerinizi bir araya getirerek, üyelerinizi diyetisyenlerinize yönlendirin ve üyelerinizin diyetisyenlerine kolayca ulaşmasını sağlayın.
                    </p>
                    <p className='mb-8'>
                        Kazançlarınızı da rahatlıkla takip edin.
                    </p>
                    <button disabled={true} className="text-center bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-md text-lg">
                        Neler Yapabilirsiniz?
                    </button>
                </div>
                <div className="mt-3 relative">
                    <Image
                        src="/landing.png"
                        alt="Dashboard"
                        className="mx-auto rounded-lg shadow-lg"
                        width={1920}
                        height={1080}
                    />
                </div>
            </main>
        </div>
    );
}
