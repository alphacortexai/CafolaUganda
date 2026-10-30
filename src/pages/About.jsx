import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, ChevronRight, Heart, MapPin, Users } from "lucide-react";
import { ContactList, Footer, Header } from "../components/SiteChrome";
import { emailOf, phonesOf, sendInquiry, slugify, telHref } from "../lib/site";

const fieldClass =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-teal outline-none transition-colors text-navy font-sans";
const labelClass = "block text-[10px] uppercase tracking-widest font-bold mb-1 text-gray-500";

const reasons = [
  "10+ years of experience",
  "24/7 nursing support",
  "Personalized care plans",
  "Multilingual staff",
  "Family-centered approach",
];

export default function About({ cms }) {
  const about = cms.aboutUs;
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const phone = phonesOf(cms)[0];

  const onSubmit = (event) => {
    event.preventDefault();
    sendInquiry({
      email: emailOf(cms),
      subject: "Message from the about page",
      fields: form,
    });
    setForm({ firstName: "", lastName: "", email: "", message: "" });
    setStatus("Thanks! We received your message.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header cms={cms} />
      <main>
        <section className="bg-navy py-16 md:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-teal/10" />
          <div className="container relative z-10">
            <nav className="flex items-center gap-2 text-xs mb-6 text-gray-400 uppercase tracking-widest font-bold">
              <Link to="/" className="hover:text-white no-underline">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">About Us</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">About {cms.brandName}</h1>
            <p className="text-xl md:text-2xl max-w-3xl font-serif leading-relaxed opacity-90">{about.headline}</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              {about.imageUrl ? (
                <img
                  src={about.imageUrl}
                  alt={about.imageAlt || `About ${cms.brandName}`}
                  className="w-full aspect-[16/8] object-cover shadow-xl"
                />
              ) : null}
              <div className="bg-gray-50 p-8 border-l-4 border-teal">
                <p className="description-text text-navy">{about.description}</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-orange flex-shrink-0" />
                  <h2 className="text-3xl font-serif text-navy">Our Experience</h2>
                </div>
                <p className="description-text text-gray-700">{about.experience}</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-orange flex-shrink-0" />
                  <h2 className="text-3xl font-serif text-navy">Scope of Service</h2>
                </div>
                <p className="description-text text-gray-700">{about.scopeOfService}</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-orange flex-shrink-0" />
                  <h2 className="text-3xl font-serif text-navy">Our Staff</h2>
                </div>
                <p className="description-text text-gray-700 mb-6">{about.staffDescription}</p>
              </div>
              <div className="bg-white border-l-4 border-orange p-8">
                <h3 className="text-2xl font-serif text-navy mb-4">Culture & Family Connections</h3>
                <p className="description-text text-gray-700 mb-4">{about.cultureAndFamily}</p>
                <p className="description-text text-gray-700">{about.staffMatching}</p>
              </div>
              <div>
                <h2 className="text-3xl font-serif text-navy mb-8">Our Locations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {about.locations.map((location) => (
                    <div key={location} className="bg-gray-50 p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-6 h-6 text-teal flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-serif text-lg text-navy font-bold">{location}</p>
                          <p className="text-gray-600 font-sans text-sm mt-2">Kampala, Uganda</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-navy text-white p-8 mt-12">
                <h3 className="text-2xl font-serif mb-4">Ready to learn more?</h3>
                <p className="description-text text-gray-300 mb-6">
                  Contact us today to discuss how {cms.brandName} can provide the care and support your loved one deserves.
                </p>
                <a
                  href={telHref(phone)}
                  className="inline-block bg-orange text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-orange/90 transition-all no-underline"
                >
                  Call Us Today
                </a>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white border-t-8 border-orange shadow-2xl p-8">
                  <h3 className="text-2xl font-serif mb-6 text-navy">Get in Touch</h3>
                  <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input
                        required
                        type="text"
                        value={form.firstName}
                        onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                        className={fieldClass}
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
                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange text-white py-4 font-bold uppercase tracking-widest hover:bg-orange/90 transition-all shadow-lg mt-4"
                    >
                      Send Message
                    </button>
                    {status ? <p className="text-xs text-gray-500">{status}</p> : null}
                  </form>
                </div>
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h3 className="text-xl font-serif mb-6 text-navy">Contact Info</h3>
                  <ContactList cms={cms} tone="light" />
                </div>
                <div className="bg-teal text-white p-8">
                  <h3 className="text-lg font-serif mb-6">Why Choose CAFOLA</h3>
                  <ul className="space-y-4">
                    {reasons.map((reason) => (
                      <li key={reason} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 flex-shrink-0 mt-1" />
                        <span className="font-sans text-sm">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container">
            <h2 className="text-3xl font-serif mb-12 text-center text-navy">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cms.services.map((service) => (
                <Link key={service.title} to={`/services/${slugify(service.title)}`} className="no-underline">
                  <div className="bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer h-full flex flex-col">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-lg font-serif mb-3 text-navy hover:text-teal transition-colors">{service.title}</h3>
                    <p className="description-text text-gray-600 mb-6 line-clamp-2 flex-grow">{service.description}</p>
                    <span className="text-teal font-bold text-sm tracking-wide inline-flex items-center gap-2">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer cms={cms} variant="compact" />
    </div>
  );
}
