import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Footer, Header } from "../components/SiteChrome";
import { emailOf, heroImage, sendInquiry, shorten, slugify } from "../lib/site";

const fieldClass =
  "w-full px-4 py-3 bg-white border border-gray-200 focus:border-teal outline-none transition-colors text-navy font-sans";
const labelClass = "block text-xs uppercase tracking-widest font-bold mb-2 text-gray-500";

export default function Home({ cms }) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletter, setNewsletter] = useState({ firstName: "", lastName: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [inquiry, setInquiry] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    talkToUs: "",
  });
  const [inquiryStatus, setInquiryStatus] = useState("");

  const visibility = {
    newsletter: false,
    careTeam: false,
    articles: false,
    ...(cms.homeSectionVisibility ?? {}),
  };
  const hero = heroImage(cms.homeImages?.hero);
  const testimonials = cms.testimonials ?? [];
  const active = testimonials[testimonialIndex];

  const submitNewsletter = (event) => {
    event.preventDefault();
    if (!consent) {
      setNewsletterStatus("Please accept consent before submitting.");
      return;
    }
    sendInquiry({
      email: emailOf(cms),
      subject: "Newsletter signup request",
      fields: newsletter,
    });
    setNewsletter({ firstName: "", lastName: "", email: "" });
    setConsent(false);
    setNewsletterStatus("Thanks! You are on the list.");
  };

  const submitInquiry = (event) => {
    event.preventDefault();
    sendInquiry({
      email: emailOf(cms),
      subject: "Care request",
      fields: inquiry,
    });
    setInquiry({ firstName: "", lastName: "", phone: "", email: "", talkToUs: "" });
    setInquiryStatus("Thanks! We received your request.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header cms={cms} showTopBar />
      <section className="relative -mt-[72px] h-[500px] overflow-hidden bg-[#8d8a8b] md:-mt-[104px] md:h-[600px]">
        <img
          src={hero.src}
          srcSet={hero.srcSet}
          sizes={hero.srcSet ? "100vw" : undefined}
          alt="Caregiver sitting with an older man at home"
          width={1536}
          height={864}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="relative container h-full" />
      </section>

      <section className="relative -mt-16 z-10 pb-8 md:pb-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-teal shadow-2xl px-8 py-8 md:px-14 md:py-12 text-center">
            <p className="text-2xl md:text-4xl font-serif text-white leading-tight">{cms.heroSubheading}</p>
          </div>
        </div>
      </section>

      <section id="services" className="pt-12 pb-12 md:pt-20 md:pb-16 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-6 text-navy">{cms.servicesHeading}</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto font-sans text-lg">{cms.servicesIntro}</p>
          <div className="flex flex-wrap justify-center gap-5">
            {cms.services.map((service) => (
              <div
                key={service.title}
                className="group flex w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc((100%-2.5rem)/3)] flex-col rounded-2xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 bg-gray-100 items-center text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-xl font-serif mb-3 text-navy group-hover:text-teal transition-colors">{service.title}</h3>
                <p className="description-text text-gray-600 mb-5 flex-grow text-center">{shorten(service.description, 8)}</p>
                <Link
                  to={`/services/${slugify(service.title)}`}
                  className="font-bold text-sm tracking-wide text-teal hover:underline no-underline inline-flex items-center gap-2"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10 pb-20 md:pt-14 md:pb-32 bg-white border-t border-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-orange text-xs font-bold uppercase tracking-widest">About CAFOLA</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-navy mt-2">Professional Care with a Personal Touch</h2>
              <p className="description-text text-gray-700 mb-6">{cms.aboutUs.headline}</p>
              <p className="description-text text-gray-600 mb-8">{cms.aboutUs.description}</p>
              <Link
                to="/about"
                className="inline-block border-2 border-teal text-teal px-10 py-4 font-bold tracking-wide hover:bg-teal hover:text-white transition-all duration-300 no-underline"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-teal/20 to-navy/20 p-12 rounded-none aspect-square flex flex-col items-center justify-center text-center">
                <Award className="w-16 h-16 text-teal mb-6" />
                <h3 className="text-3xl font-serif text-navy mb-4">10+ Years</h3>
                <p className="text-gray-700 font-sans text-lg">of Professional Nursing Care Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-teal p-12 text-white flex flex-col items-center text-center">
            <h3 className="text-3xl font-serif mb-6">Already know which services you need?</h3>
            <Link
              to="/#contact"
              className="mt-auto bg-white text-teal px-10 py-4 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors no-underline"
            >
              Connect with us
            </Link>
          </div>
          <div className="bg-navy p-12 text-white flex flex-col items-center text-center">
            <h3 className="text-3xl font-serif mb-6">Not sure what types of care you need?</h3>
            <Link
              to="/#contact"
              className="mt-auto bg-orange text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-orange/90 transition-colors no-underline"
            >
              Let's find out
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-navy">Hear What Others Are Saying</h2>
          {testimonials.length && active ? (
            <div className="max-w-4xl mx-auto relative">
              <div className="bg-white p-10 md:p-20 shadow-xl border-t-8 border-orange">
                <div className="flex gap-1 mb-8 justify-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="w-6 h-6 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-2xl md:text-3xl font-serif text-navy mb-10 italic text-center leading-relaxed">
                  "{active.quote}"
                </p>
                <div className="text-center">
                  <p className="font-serif font-bold text-xl text-navy">{active.author}</p>
                  <p className="text-gray-500 font-sans text-sm uppercase tracking-widest mt-2">
                    {active.role} • {active.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-12">
                <button
                  type="button"
                  aria-label="Previous review"
                  onClick={() =>
                    setTestimonialIndex((index) => (index - 1 + testimonials.length) % testimonials.length)
                  }
                  className="bg-teal text-white p-4 hover:bg-teal-dark transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-3">
                  {testimonials.map((item, index) => (
                    <button
                      key={`${item.author}-${index}`}
                      type="button"
                      aria-label={`Show review ${index + 1}`}
                      onClick={() => setTestimonialIndex(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${index === testimonialIndex ? "bg-teal w-8" : "bg-gray-300 w-3"}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next review"
                  onClick={() => setTestimonialIndex((index) => (index + 1) % testimonials.length)}
                  className="bg-teal text-white p-4 hover:bg-teal-dark transition-colors shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Reviews are coming soon.</p>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-navy">{cms.storyHeading}</h2>
            <div className="space-y-6">
              {cms.storyParagraphs.map((paragraph) => (
                <p key={paragraph} className="description-text text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              to="/about"
              className="inline-block mt-10 border-2 border-teal text-teal px-10 py-4 font-bold tracking-wide hover:bg-teal hover:text-white transition-all duration-300 no-underline"
            >
              Learn More
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div
              className="aspect-[4/3] bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: `url("${cms.homeImages?.story}")` }}
              role="img"
              aria-label="CAFOLA care"
            />
            <div className="absolute -bottom-8 -left-8 bg-orange p-8 text-white hidden md:block shadow-xl">
              <p className="text-4xl font-serif font-bold">10yrs</p>
              <p className="text-sm uppercase tracking-widest font-bold">Years of Care</p>
            </div>
          </div>
        </div>
      </section>

      {visibility.careTeam ? (
        <section className="py-20 md:py-32 bg-white">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-navy">{cms.caregiversHeading}</h2>
            <p className="description-text text-gray-600 max-w-3xl mx-auto mb-12">{(cms.caregiversCopy ?? []).join(" ")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {(cms.homeImages?.caregivers ?? []).map((src, index) => (
                <div key={src + index} className="bg-gray-50 aspect-square overflow-hidden border border-gray-100 shadow-md">
                  <img
                    src={src}
                    alt={`Caregiver ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="inline-block bg-teal text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-teal-dark transition-colors no-underline"
            >
              {cms.caregiversButtonText}
            </Link>
          </div>
        </section>
      ) : null}

      {visibility.articles ? (
        <section className="py-20 md:py-32 bg-white border-t border-gray-100">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-serif text-navy mb-4">{cms.resourcesHeading}</h2>
                <p className="description-text text-gray-600">{cms.resourcesIntro}</p>
              </div>
              <Link
                to="/articles"
                className="text-teal font-bold uppercase tracking-widest hover:underline no-underline flex items-center gap-2"
              >
                Latest articles <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {(cms.articles ?? []).map((article) => (
                <div
                  key={article.slug}
                  className={`group flex flex-col bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${article.featured ? "lg:col-span-2 lg:flex-row" : ""}`}
                >
                  <div className={`relative overflow-hidden ${article.featured ? "lg:w-1/2 aspect-video lg:aspect-auto" : "aspect-video"}`}>
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-navy/20 opacity-40" />
                  </div>
                  <div className={`p-8 flex flex-col ${article.featured ? "lg:w-1/2" : ""}`}>
                    {article.featured ? (
                      <span className="text-orange text-xs font-bold uppercase tracking-widest mb-4 block">Featured Article</span>
                    ) : null}
                    <h3 className={`font-serif text-navy mb-4 group-hover:text-teal transition-colors ${article.featured ? "text-3xl" : "text-xl"}`}>
                      {article.title}
                    </h3>
                    <p className="description-text text-gray-600 mb-8 line-clamp-3">{article.description}</p>
                    <Link
                      to={`/articles/${article.slug}`}
                      className="mt-auto text-teal font-bold text-sm uppercase tracking-widest hover:underline no-underline inline-flex items-center gap-2"
                    >
                      Read more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="contact" className="py-20 bg-white border-t border-gray-100">
        <div className="container max-w-4xl">
          <div className="bg-gray-50 border-t-8 border-orange shadow-xl p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-navy text-center">Start Care Now</h2>
            <form className="space-y-6" onSubmit={submitInquiry}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>First name</label>
                  <input
                    required
                    type="text"
                    value={inquiry.firstName}
                    onChange={(event) => setInquiry((current) => ({ ...current, firstName: event.target.value }))}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last name</label>
                  <input
                    type="text"
                    value={inquiry.lastName}
                    onChange={(event) => setInquiry((current) => ({ ...current, lastName: event.target.value }))}
                    className={fieldClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    value={inquiry.phone}
                    onChange={(event) => setInquiry((current) => ({ ...current, phone: event.target.value }))}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    required
                    type="email"
                    value={inquiry.email}
                    onChange={(event) => setInquiry((current) => ({ ...current, email: event.target.value }))}
                    className={fieldClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Talk to us</label>
                <textarea
                  rows={5}
                  value={inquiry.talkToUs}
                  onChange={(event) => setInquiry((current) => ({ ...current, talkToUs: event.target.value }))}
                  className={fieldClass}
                  placeholder="Tell us about your care needs"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-orange text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-orange/90 transition-all shadow-lg"
              >
                Submit request
              </button>
              {inquiryStatus ? <p className="text-sm text-gray-600">{inquiryStatus}</p> : null}
            </form>
          </div>
        </div>
      </section>

      {visibility.newsletter ? (
        <section className="py-20 md:py-32 bg-navy text-white">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">{cms.newsletterHeading}</h2>
            <p className="text-gray-300 text-lg mb-12">
              Stay informed with the latest senior care news and resources delivered to your inbox.
            </p>
            <form className="space-y-6" onSubmit={submitNewsletter}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">First name</label>
                  <input
                    required
                    type="text"
                    value={newsletter.firstName}
                    onChange={(event) => setNewsletter((current) => ({ ...current, firstName: event.target.value }))}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 focus:border-orange outline-none transition-colors text-white font-sans"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">Last name</label>
                  <input
                    type="text"
                    value={newsletter.lastName}
                    onChange={(event) => setNewsletter((current) => ({ ...current, lastName: event.target.value }))}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 focus:border-orange outline-none transition-colors text-white font-sans"
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-400">Email Address</label>
                <input
                  required
                  type="email"
                  value={newsletter.email}
                  onChange={(event) => setNewsletter((current) => ({ ...current, email: event.target.value }))}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 focus:border-orange outline-none transition-colors text-white font-sans"
                />
              </div>
              <div className="flex items-start gap-3 text-left">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 w-4 h-4 accent-orange"
                />
                <label htmlFor="consent" className="text-sm text-gray-400 leading-relaxed">
                  By checking this box and submitting this form, you are consenting to receive marketing emails from {cms.brandName}. You can revoke your consent at any time.
                </label>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-orange text-white px-16 py-5 font-sans font-bold uppercase tracking-widest hover:bg-orange/90 transition-all shadow-lg"
              >
                Sign up
              </button>
              {newsletterStatus ? <p className="text-sm text-gray-300">{newsletterStatus}</p> : null}
            </form>
          </div>
        </section>
      ) : null}

      <Footer cms={cms} />
    </div>
  );
}
