import matter from "gray-matter";

// Parses a case study markdown file (format: content/drafts/case-study-template.md)
// into frontmatter plus sections. This file only finds the layout structure
// (sections, rows, media, ::: blocks); body text stays markdown and is
// rendered by react-markdown.

const EYEBROW_MARKER = "\u0000eyebrow:";

const SPECIAL_SECTIONS = ["overview", "showcase", "impact", "transition"];

const MEDIA_LINE = /^(?:!\[[^\]]*\]\([^)]*\)\s*)+$/;
const MEDIA_ITEM = /!\[([^\]]*)\]\(\s*([^)\s]*)(?:\s+"([^"]*)")?\s*\)/g;

export function parseCaseStudy(source) {
  const { data, content } = matter(source.replace(/\r\n?/g, "\n"));
  return { frontmatter: data, sections: parseSections(content) };
}

function parseScalar(raw) {
  const value = raw.trim();
  const quoted = value.match(/^"([^"]*)"$|^'([^']*)'$/);
  if (quoted) return quoted[1] ?? quoted[2];
  return value;
}

function parseSections(body) {
  // Drop HTML comments, keeping only `eyebrow:` overrides as marker lines.
  const cleaned = body.replace(/<!--([\s\S]*?)-->/g, (_, inner) => {
    const eyebrow = inner.match(/^\s*eyebrow:\s*(.+?)\s*$/m);
    return eyebrow ? `${EYEBROW_MARKER}${eyebrow[1]}` : "";
  });

  const sections = [];
  let current = null;
  for (const line of cleaned.split("\n")) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      current = { name: heading[1], lines: [] };
      sections.push(current);
    } else if (current) {
      current.lines.push(line);
    }
  }

  const usedIds = new Set();
  return sections.map(({ name, lines }) =>
    buildSection(name, tokenize(lines), uniqueId(name, usedIds)),
  );
}

function uniqueId(name, usedIds) {
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
  let id = base;
  for (let n = 2; usedIds.has(id); n += 1) id = `${base}-${n}`;
  usedIds.add(id);
  return id;
}

function buildSection(name, tokens, id) {
  const kind = SPECIAL_SECTIONS.includes(name.toLowerCase())
    ? name.toLowerCase()
    : "content";
  const section = {
    id,
    name,
    kind,
    eyebrow: name,
    hasCustomEyebrow: false,
    title: null,
    locked: false,
    intro: [],
    rows: [],
    stats: [],
    outcomes: [],
  };

  let row = null;
  let sub = null;
  for (const token of tokens) {
    if (token.type === "eyebrow") {
      section.eyebrow = token.text;
      section.hasCustomEyebrow = true;
    } else if (token.type === "locked") {
      section.locked = token.value;
    } else if (token.type === "stats" || token.type === "outcomes") {
      section[token.type] = token.items;
    } else if (token.type === "heading" && token.level === 1 && !section.title) {
      section.title = token.text;
    } else if (token.type === "heading" && token.level === 3) {
      row = { label: token.text, blocks: [], subs: [] };
      sub = null;
      section.rows.push(row);
    } else if (token.type === "heading" && token.level === 4) {
      sub = { title: token.text, blocks: [] };
      if (row) {
        row.subs.push(sub);
      } else {
        row = { label: "", blocks: [], subs: [sub] };
        section.rows.push(row);
      }
    } else {
      const block =
        token.type === "heading"
          ? { type: "markdown", source: `**${token.text}**` }
          : token;
      (sub?.blocks ?? row?.blocks ?? section.intro).push(block);
    }
  }
  return section;
}

function tokenize(lines) {
  const tokens = [];
  let i = 0;

  const isBlank = (line) => line === undefined || line.trim() === "";
  const isStructural = (line) => {
    const trimmed = line.trim();
    return (
      trimmed.startsWith(EYEBROW_MARKER) ||
      trimmed.startsWith(":::") ||
      /^#{1,4}\s/.test(trimmed) ||
      /^locked:\s*(true|false)$/i.test(trimmed) ||
      /^(stats|outcomes):\s*$/.test(trimmed) ||
      MEDIA_LINE.test(trimmed)
    );
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i += 1;
      continue;
    }

    if (trimmed.startsWith(EYEBROW_MARKER)) {
      tokens.push({ type: "eyebrow", text: trimmed.slice(EYEBROW_MARKER.length) });
      i += 1;
      continue;
    }

    if (trimmed.startsWith(":::")) {
      const header = trimmed.slice(3).trim();
      const body = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== ":::") {
        body.push(lines[i].trim());
        i += 1;
      }
      i += 1;
      const directive = parseDirective(header, body.filter(Boolean));
      if (directive) tokens.push(directive);
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+?)\s*$/);
    if (heading) {
      tokens.push({ type: "heading", level: heading[1].length, text: heading[2] });
      i += 1;
      continue;
    }

    const locked = trimmed.match(/^locked:\s*(true|false)$/i);
    if (locked) {
      tokens.push({ type: "locked", value: locked[1].toLowerCase() === "true" });
      i += 1;
      continue;
    }

    const keyedList = trimmed.match(/^(stats|outcomes):\s*$/);
    if (keyedList) {
      const body = [];
      i += 1;
      while (i < lines.length && /^(\s+|[-*]\s)/.test(lines[i]) && !isBlank(lines[i])) {
        body.push(lines[i]);
        i += 1;
      }
      tokens.push({
        type: keyedList[1],
        items: keyedList[1] === "stats" ? parseStats(body) : parseOutcomes(body),
      });
      continue;
    }

    if (MEDIA_LINE.test(trimmed)) {
      const items = [...trimmed.matchAll(MEDIA_ITEM)].map((match) => ({
        alt: match[1].trim(),
        src: match[2],
        options: (match[3] ?? "").split(/\s+/).filter(Boolean),
      }));
      tokens.push({ type: "media", items });
      i += 1;
      continue;
    }

    // Everything else is prose: paragraphs, lists, quotes, tables, and so on.
    const prose = [line];
    i += 1;
    while (i < lines.length && !isStructural(lines[i])) {
      prose.push(lines[i]);
      i += 1;
    }
    tokens.push({ type: "markdown", source: prose.join("\n").trim() });
  }

  return tokens;
}

function parseStats(lines) {
  const stats = [];
  for (const line of lines) {
    const match = line.match(/^\s*(?:[-*]\s+)?(\w+):\s*(.*)$/);
    if (!match) continue;
    if (/^\s*[-*]\s/.test(line)) stats.push({});
    if (stats.length) stats[stats.length - 1][match[1]] = parseScalar(match[2]);
  }
  return stats.filter((stat) => stat.value);
}

function parseOutcomes(lines) {
  const outcomes = [];
  for (const line of lines) {
    const item = line.match(/^\s*[-*]\s+(.*)$/);
    if (item) outcomes.push(item[1].trim());
    else if (outcomes.length) outcomes[outcomes.length - 1] += ` ${line.trim()}`;
  }
  return outcomes;
}

function parseDirective(header, lines) {
  const [name, ...args] = header.split(/\s+/);
  const cells = (line) => line.split("|").map((cell) => cell.trim());

  if (name === "swatches") {
    const colors = lines.map((line) => {
      const [first, second] = cells(line);
      return second ? { name: first, hex: second } : { name: "", hex: first };
    });
    return { type: "swatches", colors };
  }

  if (name === "type") {
    let sample = null;
    const rows = [];
    for (const line of lines) {
      const sampleMatch = line.match(/^sample:\s*(.+)$/);
      if (sampleMatch) {
        sample = sampleMatch[1];
        continue;
      }
      const [size, label, weight] = cells(line);
      const px = parseFloat(size);
      if (Number.isFinite(px)) {
        rows.push({ size: px, label: label || "", weight: Number(weight) || 400 });
      }
    }
    return { type: "typeSpecimen", family: args.join(" ") || "Inter", sample, rows };
  }

  return null;
}
