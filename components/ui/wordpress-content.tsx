type WordPressContentProps = {
  html: string;
};

export function WordPressContent({ html }: WordPressContentProps) {
  return (
    <div
      className="w-full max-w-[820px] text-base leading-[1.85] text-muted sm:text-lg sm:leading-[1.9]
        [&_a]:font-bold [&_a]:text-wine [&_a]:underline [&_a]:decoration-wine/25 [&_a]:underline-offset-4
        [&_blockquote]:my-10 [&_blockquote]:border-l-2 [&_blockquote]:border-rose [&_blockquote]:bg-ivory [&_blockquote]:py-6 [&_blockquote]:pl-7 [&_blockquote]:pr-6
        [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:font-serif [&_h2]:text-[clamp(32px,4vw,48px)] [&_h2]:font-normal [&_h2]:leading-tight [&_h2]:tracking-[-0.035em] [&_h2]:text-ink
        [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:font-serif [&_h3]:text-3xl [&_h3]:font-normal [&_h3]:text-ink
        [&_img]:my-8 [&_img]:h-auto [&_img]:max-h-[720px] [&_img]:w-full [&_img]:object-contain
        [&_li]:pl-1 [&_ol]:my-7 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6
        [&_p]:my-6 [&_strong]:font-bold [&_strong]:text-ink
        [&_ul]:my-7 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
