import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>YAGA</title>
        <meta name="description" content="Yet Another Github App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">YAGA - Yet Another Github App</h1>
        </div>
      </header>
      <main className="py-10">
        <div className="container mx-auto">
          <form className="rounded-lg bg-white p-10 shadow-lg">
            <div className="mb-4 flex items-center">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 p-2"
                placeholder="tonik/theme"
              />
              <button className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">
                Search
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
