import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, CircleCheck } from "lucide-react";
import { ContactList, Footer, Header } from "../components/SiteChrome";
import { emailOf, sendInquiry, slugify } from "../lib/site";

const fieldClass =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-teal outline-none transition-colors text-navy font-sans";
const labelClass = "block text-[10px] uppercase tracking-widest font-bold mb-1 text-gray-500";

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

function DetailSection({ section }) {
  const position = section.imagePosition ?? "full";
  if (position === "left" || position === "right") {
    return (
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className={position === "right" ? "md:order-2" : undefined}>
          <SectionMedia section={section} />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-serif text-navy">{section.title}</h3>
          <p className="description-text text-gray-700 whitespace-pre-line">{section.description}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="space-y-5">
      <SectionMedia section={section} />
      <div className="max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-serif text-navy">{section.title}</h3>
        <p className="mt-4 description-text text-gray-700 whitespace-pre-line">{section.description}</p>
      </div>
    </section>
  );
}

function InlinePage({ page }) {
  return (
    <section className="mb-14 rounded-sm border border-gray-100 bg-gray-50 p-6 md:p-8">
      <div className="mb-8 max-w-4xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange">Service details</p>
        <h2 className="text-3xl md:text-4xl font-serif text-navy">{page.title}</h2>
        {page.description ? <p className="mt-4 description-text text-gray-700">{page.description}</p> : null}
        {page.content ? <p className="mt-6 description-text text-gray-700 whitespace-pre-line">{page.content}</p> : null}
      </div>
      {(page.sections ?? []).length > 0 ? (
        <div className="space-y-12">
          {page.sections.map((section, index) => (
            <DetailSection key={`${section.title}-${index}`} section={section} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function ServiceDetail({ cms }) {
  const { slug } = useParams();
  const service = cms.services.find((item) => slugify(item.title) === slug);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", talkToUs: "" });
  const [status, setStatus] = useState("");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Service Not Found</h1>
          <Link to="/" className="text-teal hover:underline font-bold no-underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const inlinePages = (service.details ?? [])
    .filter((detail) => detail.inlineLinkedPage && detail.linkPageSlug)
    .map((detail) => (cms.servicePages ?? []).find((page) => page.slug === detail.linkPageSlug))
    .filter(Boolean);
  const offers = (service.details ?? []).filter((detail) => !(detail.inlineLinkedPage && detail.linkPageSlug));

  const onSubmit = (event) => {
    event.preventDefault();
    sendInquiry({
      email: emailOf(cms),
      subject: `Service request for ${service.title}`,
      fields: {
        ...form,
        service: service.title,
      },
    });
    setForm({ firstName: "", lastName: "", phone: "", email: "", talkToUs: "" });
    setStatus("Thanks! We received your request.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header cms={cms} />
      <main>
        <section className="bg-navy py-16 md:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-teal/10" />
          <div className="container relative z-10">
            <nav className="flex items-center gap-2 text-xs mb-6 text-gray-400 uppercase tracking-widest font-bold">
              <a href="/" className="hover:text-white no-underline">
                Home
              </a>
              <ChevronRight className="w-4 h-4" />
              <a href="/#services" className="hover:text-white no-underline">
                Services
              </a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{service.title}</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">{service.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl font-serif leading-relaxed opacity-90">{service.description}</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-gray-700 font-sans space-y-8">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.imageAlt || service.title}
                    className="mb-12 w-full aspect-[16/8] object-cover shadow-xl"
                  />
                ) : null}
                <div className="bg-gray-50 p-8 border-l-4 border-teal mb-12">
                  <p className="description-text text-navy">{service.longDescription}</p>
                </div>
                {inlinePages.map((page) => (
                  <InlinePage key={page.slug} page={page} />
                ))}
                {offers.length > 0 ? (
                  <>
                    <h2 className="text-3xl md:text-4xl font-serif mb-8 text-navy">What We Offer</h2>
                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                      {offers.map((offer, index) => {
                        const linked = offer.linkPageSlug
                          ? (cms.servicePages ?? []).find((page) => page.slug === offer.linkPageSlug)
                          : null;
                        return (
                          <div key={`${offer.title}-${index}`} className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                            <div className="flex flex-col items-center gap-3 mb-3">
                              <CircleCheck className="w-5 h-5 text-orange flex-shrink-0" />
                              <h3 className="text-xl font-serif text-navy">{offer.title}</h3>
                            </div>
                            <p className="description-text text-gray-600">{offer.description}</p>
                            {linked ? (
                              <Link
                                to={`/services/${slug}/${linked.slug}`}
                                className="mt-5 inline-flex items-center gap-2 text-teal font-bold text-sm tracking-wide no-underline hover:underline"
                              >
                                Learn More <ChevronRight className="w-4 h-4" />
                              </Link>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : null}
                <div className="mt-16 p-8 bg-navy text-white">
                  <h3 className="text-2xl font-serif mb-4">Our Commitment</h3>
                  <p className="description-text text-gray-300">
                    At {cms.brandName}, we focus on promoting independence, dignity, and self-worth. Our qualified team works to ensure continuity of care structured to facilitate complication prevention and complete healing.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white border-t-8 border-orange shadow-2xl p-8">
                  <h3 className="text-2xl font-serif mb-6 text-navy">Start Care Now</h3>
                  <form className="space-y-4" onSubmit={onSubmit}>
                    {[
                      ["firstName", "First Name", "text", true],
                      ["lastName", "Last Name", "text", false],
                      ["phone", "Phone", "tel", false],
                    ].map(([key, label, type, required]) => (
                      <div key={key}>
                        <label className={labelClass}>{label}</label>
                        <input
                          required={required}
                          type={type}
                          value={form[key]}
                          onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                          className={fieldClass}
                        />
                      </div>
                    ))}
                    <div>
                      <label className={labelClass}>Talk to us</label>
                      <textarea
                        rows={4}
                        value={form.talkToUs}
                        onChange={(event) => setForm((current) => ({ ...current, talkToUs: event.target.value }))}
                        className={fieldClass}
                        placeholder="Tell us about your care needs"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange text-white py-4 font-bold uppercase tracking-widest hover:bg-orange/90 transition-all shadow-lg mt-4"
                    >
                      Submit Request
                    </button>
                    {status ? <p className="text-xs text-gray-500">{status}</p> : null}
                  </form>
                  <p className="text-[10px] mt-4 text-gray-400 leading-relaxed">
                    By submitting this form you are consenting to be contacted by {cms.brandName} regarding our services.
                  </p>
                </div>
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h3 className="text-xl font-serif mb-6 text-navy">Need help right now?</h3>
                  <ContactList cms={cms} tone="light" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container">
            <h2 className="text-3xl font-serif mb-12 text-center text-navy">Explore Our Other Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cms.services
                .filter((item) => item.title !== service.title)
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.title}
                    className="bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                  >
                    <div className="text-4xl mb-6">{item.icon}</div>
                    <h3 className="text-xl font-serif mb-4 text-navy">{item.title}</h3>
                    <p className="description-text text-gray-600 mb-8 line-clamp-2">{item.description}</p>
                    <Link
                      to={`/services/${slugify(item.title)}`}
                      className="mt-auto text-teal font-bold text-sm tracking-wide hover:underline no-underline inline-flex items-center gap-2"
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer cms={cms} variant="compact" />
    </div>
  );
}
