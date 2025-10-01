export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  // Replace the action URL with your Formspree endpoint or similar
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
      <p className="text-gray-600">I welcome collaboration, student supervision, and industry pilots.</p>
      <form
        action="https://formspree.io/f/your-endpoint"
        method="POST"
        className="card max-w-xl"
      >
        <div className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm text-gray-700">Name</span>
            <input className="border rounded-lg px-3 py-2" name="name" required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-gray-700">Email</span>
            <input type="email" className="border rounded-lg px-3 py-2" name="email" required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-gray-700">Message</span>
            <textarea className="border rounded-lg px-3 py-2" name="message" rows={5} required />
          </label>
          <button className="badge w-fit" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
