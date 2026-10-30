import { Link, useParams } from "react-router-dom";
import { Header } from "../components/SiteChrome";

export default function CustomPage({ cms }) {
  const { slug } = useParams();
  const page = (cms.customPages ?? []).find((item) => item.slug === slug);
  if (!page) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-serif text-navy">Page not found</h1>
          <Link to="/" className="text-teal no-underline hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <Header cms={cms} />
      <main className="container py-12 max-w-4xl">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-orange font-bold">{page.title}</p>
            <h1 className="text-4xl font-serif text-navy mt-4">{page.title}</h1>
            <p className="mt-4 description-text text-gray-600">{page.description}</p>
          </div>
          {page.imageUrl ? (
            <img src={page.imageUrl} alt={page.imageAlt || page.title} className="w-full aspect-[16/8] object-cover shadow-xl" />
          ) : null}
          <div className="max-w-none description-text text-gray-700 whitespace-pre-line">{page.content}</div>
        </div>
      </main>
    </div>
  );
}
