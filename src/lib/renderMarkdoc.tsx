import React from "react";
import Markdoc, { renderers } from "@markdoc/markdoc";

export function renderMarkdoc(markdown: string) {
  const ast = Markdoc.parse(markdown);
  const tree = Markdoc.transform(ast);
  const rendered = renderers.react(tree, React);

  return rendered;
}

export function Prose({ children }: { children: string }) {
  return (
    <div className="prose prose-gray prose-invert prose-code:rounded prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:font-medium prose-code:before:hidden prose-code:after:hidden prose-hr:my-[1.25em]">
      {renderMarkdoc(children)}
    </div>
  );
}
