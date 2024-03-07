import Link from "next/link"


export default function Home() {
  return (
    <main className="max-w-screen min-w-max flex flex-col">
      <div className="fixed top-0 p-5 px-10 flex ">
        <Link href="/login" className="p-1 px-10 text-sm rounded-lg bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-gray-700 text-gray-500 mr-5">
          Login
        </Link>
      </div>
      <div className="relative flex flex-col gap-2 items-center justify-center h-screen before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <span className="text-sm text-slate-500 ">
          Bem-vindo ao
        </span>
        <h1 className="text-[5rem] font-black">Workdeal</h1>
      </div>
    </main>
  );
}
