import Image from "next/image";
import Link from "next/link";
import { articles } from "./data";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icons";
import { container, heading, section, textLink } from "./styles";

export function NewsSection() {
  return (
    <section className={section} id="news">
      <div className={container}>
        <div className="flex items-end justify-between gap-8 max-sm:flex-col max-sm:items-start">
          <div>
            <Eyebrow>Prevenzione e conoscenza</Eyebrow>
            <h2 className={heading}>
              Informare è già
              <br />
              <em className="font-normal text-rose">una forma di cura</em>
            </h2>
          </div>
          <Link className={textLink} href="#contatti">
            Tutti gli approfondimenti <Icon className="size-4" name="arrow" />
          </Link>
        </div>
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <article
              className={`group bg-paper transition hover:-translate-y-2 hover:shadow-soft ${
                index === articles.length - 1
                  ? "max-md:max-w-[calc(50%-14px)] max-sm:max-w-none md:max-lg:col-span-2"
                  : ""
              }`}
              key={article.title}
            >
              <div className="relative h-[235px] overflow-hidden bg-[#d9979c]">
                <Image
                  className="object-cover transition group-hover:scale-[1.035]"
                  src={article.image}
                  alt={article.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
                />
                <span className="absolute left-5 top-4 grid size-7 place-items-center rounded-full bg-wine-deep/75 font-serif text-xs text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-8">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-rose">
                  {article.category}
                </span>
                <h3 className="my-3 font-serif text-[25px] font-normal leading-tight">
                  {article.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted">{article.text}</p>
                <Link
                  className={`${textLink} mt-3 text-xs`}
                  href="#contatti"
                  aria-label={`Leggi l'articolo: ${article.title}`}
                >
                  Leggi l’articolo <Icon className="size-4" name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
