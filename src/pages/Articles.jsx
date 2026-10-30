import { Link, useParams } from "react-router-dom";
import { Header } from "../components/SiteChrome";

export function Articles({ cms }) {
  return (
    <div className="min-h-screen bg-white">
      <Header cms={cms} />
      <main className="container py-12">
        <h1 className="text-4xl font-serif text-navy mb-4">Articles & Resources</h1>
        <p className="description-text text-gray-600 mb-10 max-w-3xl">
          Browse the latest articles from our care team. This content is managed in the Admin CMS Articles section.
        </p>
        {(cms.articles ?? []).length === 0 ? null : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cms.articles.map((article) => (
              <article key={article.slug} className="border border-gray-200 p-6 bg-white">
                {article.imageUrl ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full aspect-[16/9] object-cover mb-4"
                    loading="lazy"
                  />
                ) : null}
                {article.featured ? (
                  <p className="text-xs font-bold uppercase tracking-wider text-orange mb-3">Featured</p>
                ) : null}
                <h2 className="text-2xl font-serif text-navy mb-3">{article.title}</h2>
                <p className="description-text text-gray-600">{article.description}</p>
                <Link
                  to={`/articles/${article.slug}`}
                  className="inline-block mt-4 text-teal font-bold uppercase text-xs tracking-wider no-underline hover:underline"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export function ArticleDetail({ cms }) {
  const { slug } = useParams();
  const article = (cms.articles ?? []).find((item) => item.slug === slug) ?? null;
  if (!article) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-serif text-navy">Article not found</h1>
          <Link to="/articles" className="text-teal no-underline hover:underline">
            Back to articles
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <Header cms={cms} />
      <main className="container py-12 max-w-4xl">
        <p className="text-xs uppercase tracking-wider text-orange font-bold mb-3">{article.section ?? "Resources"}</p>
        <h1 className="text-4xl font-serif text-navy mb-4">{article.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{article.description}</p>
        {article.imageUrl ? <img src={article.imageUrl} alt={article.title} className="w-full aspect-[16/7] object-cover mb-8" /> : null}
        <p className="text-gray-700 leading-8 whitespace-pre-line">{article.content ?? article.description}</p>
      </main>
    </div>
  );
}
