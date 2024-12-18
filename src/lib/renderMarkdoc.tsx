import React from "react";
import Markdoc, { renderers } from "@markdoc/markdoc";
import Alert from "~/components/Alert";

const config = {
  tags: {
    alert: {
      render: "Alert",
      children: ["paragraph", "tag", "list"],
    },
  },
};

export function renderMarkdoc(markdown: string) {
  const ast = Markdoc.parse(markdown);
  const tree = Markdoc.transform(ast, config);
  const rendered = renderers.react(tree, React, { components: { Alert } });

  return rendered;
}

export function Prose({ children }: { children: string }) {
  return (
    <div className="prose prose-gray prose-invert prose-code:rounded prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:font-medium prose-code:before:hidden prose-code:after:hidden prose-hr:my-[1.25em]">
      {renderMarkdoc(children)}
    </div>
  );
}
