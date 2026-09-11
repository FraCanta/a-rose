import Link from "next/link";

export function AboutBreadcrumbs({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm leading-relaxed text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link className="underline-offset-4 hover:underline" href="/">Home</Link></li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          {current ? <Link className="underline-offset-4 hover:underline" href="/chi-siamo">Chi siamo</Link> : <span aria-current="page" className="text-ink">Chi siamo</span>}
        </li>
        {current ? <li className="flex items-center gap-2"><span aria-hidden="true">/</span><span aria-current="page" className="text-ink">{current}</span></li> : null}
      </ol>
    </nav>
  );
}
