import React from "react";
import Markdoc, { renderers } from "@markdoc/markdoc";

export function renderMarkdoc(markdown: string) {
  const ast = Markdoc.parse(markdown);
  const tree = Markdoc.transform(ast);
  const rendered = renderers.react(tree, React);

  return rendered;
}
