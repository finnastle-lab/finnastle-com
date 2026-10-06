/**
 * Wrap every authored line of a poem in its own block element.
 *
 * Poems are written in the markdown with real line breaks, which markdown
 * collapses into a single paragraph. `white-space: pre-wrap` brings the breaks
 * back visually, but it can't give a wrapped line a hanging indent — CSS
 * `text-indent` only ever applies to the first line of a block. The result is
 * that a line too long for the measure looks exactly like a break the poet
 * wrote, which is the one thing a poetry layout must never do.
 *
 * So each line becomes its own block, and the hanging indent lands per line.
 * Inline nodes (emphasis, links) are passed through untouched — only text
 * nodes get split, so a line can still carry markup.
 *
 * Scoped to src/content/poems/ so nothing else on the site changes.
 */
const POEM_DIR = '/src/content/poems/';
const OPEN = { type: 'html', value: '<span class="poem-line">' };
const CLOSE = { type: 'html', value: '</span>' };

function splitParagraph(node) {
  // A paragraph with no internal break is a single line; still wrap it so the
  // indent rule applies uniformly.
  const out = [OPEN];
  for (const child of node.children) {
    if (child.type === 'text' && child.value.includes('\n')) {
      child.value.split('\n').forEach((part, i) => {
        if (i > 0) out.push(CLOSE, OPEN);
        if (part) out.push({ type: 'text', value: part });
      });
    } else {
      out.push(child);
    }
  }
  out.push(CLOSE);
  node.children = out;
}

function walk(node) {
  if (!node.children) return;
  for (const child of node.children) {
    if (child.type === 'paragraph') splitParagraph(child);
    else walk(child);
  }
}

export function remarkPoemLines() {
  return (tree, file) => {
    const path = (file?.history?.[0] ?? file?.path ?? '').replace(/\\/g, '/');
    if (!path.includes(POEM_DIR)) return;
    walk(tree);
  };
}
