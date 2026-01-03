import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";
import { highlight } from "sugar-high";

// Type aliases
type TitleProps = ComponentPropsWithoutRef<"title">;
type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export const components = {
  title: (props: TitleProps) => <title {...props} />,

  h1: (props: HeadingProps) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-2xl font-semibold mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-lg font-medium mt-4 mb-2" {...props} />
  ),

  p: (props: ParagraphProps) => (
    <p className="leading-7 my-4 text-gray-800" {...props} />
  ),

  ol: (props: ListProps) => (
    <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc pl-6 space-y-1 my-4" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,

  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-black" {...props} />
  ),

  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "text-blue-600 underline underline-offset-4 decoration-blue-300  transition-colors";

    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }

    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },

  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },

  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-gray-200 pl-4 my-6 italic text-gray-700"
      {...props}
    />
  ),

  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {data.headers.map((header, index) => (
              <th key={index} className="text-left font-semibold py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index} className="border-b last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export type MDXProvidedComponents = typeof components;

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
