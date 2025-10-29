'use client'
// import Nav from './components/Nav';
const handleClick = async (e: any) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData.entries());

  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  alert("Message sent!");
};

const hC = async (e: any) => {
  // e.preventDefault();
  console.info('Button clicked!')
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  console.log('this is the response from the fetch: ', res)
}

export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <main className="p-4 bg-slate-800 w-full h-full text-white flex flex-col justify-center items-center gap-4">
        <div className="text-3xl font-bold black text-center">J.T Timepieces is under maintenance.</div>

        <div className="">
          <button
            className="p-2 rounded roundeds-sm bg-blue-500 text-white transition-transform
            hover:scale-105 active:scale-90"
            onClick={() => hC()}
          >
            <span>
              Test Email Send
            </span>
          </button>
        </div>
      </main>
    </>
  );
}
