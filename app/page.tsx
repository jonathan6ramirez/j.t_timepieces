'use client'

// INFO: Components
// import Nav from './components/Nav';
import EmailTestButton from "./components/EmailTestBtn";
import ContactForm from "./components/ContactForm";

type EmailData = {
  message: string
  email: string
}

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

const hC = async (emailData: EmailData) => {
  try {
    console.log('this is the data passed on: ', emailData)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ name: "Test", email: "test@test.com", message: "Hello" }),
      body: JSON.stringify({ message: emailData.message, email: emailData.email }),
    });

    const data = await res.json();
    console.log("Response from API:", data);

    if (!res.ok) throw new Error(data.error || "Request failed");

    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Failed to send message");
  }
};

export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <main className="p-4 bg-slate-900 w-full h-full text-slate-300 flex flex-col items-center gap-4">
        <div className="text-xl text-center">Contact Form</div>

        <ContactForm clickFunc={hC} />
        {/* <EmailTestButton clickFunc={hC} /> */}
      </main>
    </>
  );
}
