'use client'

// INFO: Components
// import Nav from './components/Nav';
// import EmailTestButton from "./components/EmailTestBtn";
import ContactForm from "./components/ContactForm";
import { toast, Toaster } from "sonner";

type EmailData = {
  message: string
  email: string
}

const hC = async (emailData: EmailData) => {
  return toast.promise(
    (async () => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: emailData.message,
          email: emailData.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send message");

      return { success: true };
    })(),
    {
      loading: "Sending message...",
      success: "Message sent successfully!",
      error: "Failed to send message.",
    }
  );
};

export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <main className="p-4 bg-slate-900 w-full h-full text-slate-300 flex flex-col items-center gap-4">
        <div className="text-xl text-center">Contact Form</div>

        <ContactForm clickFuncAction={hC} />
        {/* <EmailTestButton clickFunc={hC} /> */}
        <Toaster richColors closeButton position="top-center" />
      </main>
    </>
  );
}
