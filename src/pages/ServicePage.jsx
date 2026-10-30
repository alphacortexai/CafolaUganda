import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Header } from "../components/SiteChrome";
import { slugify } from "../lib/site";

function SectionMedia({ section }) {
  if (!section.imageUrl) return null;
  if (section.mediaType === "video") {
    return <video src={section.imageUrl} className="w-full aspect-[16/10] object-cover" controls />;
  }
  return (
    <img
      src={section.imageUrl}
      alt={section.imageAlt || section.title}
      className="w-full aspect-[16/10] object-cover"
      loading="lazy"
    />
  );
}

function PageSection({ section }) {
  const position = section.imagePosition ?? "full";
  if (position === "left" || position === "right") {
    return (
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className={position === "right" ? "md:order-2" : undefined}>
          <SectionMedia section={section} />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-navy">{section.title}</h2>
          <p className="description-text text-gray-700 whitespace-pre-line">{section.description}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="space-y-5">
      <SectionMedia section={section} />
      <div className="max-w-3xl">
        <h2 className="text-3xl font-serif text-navy">{section.title}</h2>
        <p className="mt-4 description-text text-gray-700 whitespace-pre-line">{section.description}</p>
      </div>
    </section>
  );
}

export default function ServicePage({ cms }) {
  const { serviceSlug, pageSlug } = useParams();
  const page = (cms.servicePages ?? []).find((item) => item.slug === pageSlug) ?? null;
  const parent =
    page == null
      ? null
      : (cms.services.find((service) => (service.details ?? []).some((detail) => detail.linkPageSlug === page.slug)) ??
        cms.services.find((service) => slugify(service.title) === serviceSlug) ??
        null);

  if (!page) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-serif text-navy">Service page not found</h1>
          <Link to="/" className="text-teal no-underline hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const image = page.heroImageUrl || cms.servicePageDefaultImageUrl;

  return (
    <div className="min-h-screen bg-white">
      <Header cms={cms} />
      <main>
        <section className="bg-navy py-16 md:py-24 text-white">
          <div className="container">
            <nav className="flex flex-wrap items-center gap-2 text-xs mb-6 text-gray-400 uppercase tracking-widest font-bold">
              <Link to="/" className="hover:text-white no-underline">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/#services" className="hover:text-white no-underline">
                Services
              </Link>
              {parent ? (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <Link to={`/services/${slugify(parent.title)}`} className="hover:text-white no-underline">
                    {parent.title}
                  </Link>
                </>
              ) : null}
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{page.title}</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">{page.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl font-serif leading-relaxed opacity-90">{page.description}</p>
          </div>
        </section>
        <section className="container py-12 md:py-16 max-w-5xl">
          {page.heroMediaType === "video" && page.heroImageUrl ? (
            <video src={page.heroImageUrl} className="w-full aspect-[16/7] object-cover mb-10" controls />
          ) : (
            <img src={image} alt={page.title} className="w-full aspect-[16/7] object-cover mb-10" />
          )}
          {page.content ? (
            <p className="description-text text-gray-700 whitespace-pre-line max-w-4xl">{page.content}</p>
          ) : null}
          <div className="mt-14 space-y-16">
            {(page.sections ?? []).map((section, index) => (
              <PageSection key={`${section.title}-${index}`} section={section} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
