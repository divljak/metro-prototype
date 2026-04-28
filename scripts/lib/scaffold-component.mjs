// Pure scaffolder: takes a candidate JSON and the repo root, returns a
// scaffolded TSX source string + slug + componentName. The output is meant
// to be the *starting point* for the design-system owner — they rename,
// tighten the prop API, add variants, and then promote to components/ui/.

import { readFileSync, existsSync, readdirSync } from "node:fs"
import { join, relative, sep } from "node:path"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const ts = require("typescript")

function kebabCase(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "")
}

function pascalCase(s) {
  return s
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase())
}

function getNameFromTagName(tagName) {
  if (ts.isIdentifier(tagName)) return tagName.text
  if (ts.isPropertyAccessExpression(tagName)) {
    return getNameFromTagName(tagName.expression)
  }
  return null
}

function collectIdentifiers(src) {
  const sf = ts.createSourceFile("sample.tsx", src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const tags = new Set()
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const name = getNameFromTagName(node.tagName)
      if (name && /^[A-Z]/.test(name)) tags.add(name)
    }
    if (ts.isIdentifier(node) && /^[A-Z]/.test(node.text)) {
      tags.add(node.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return tags
}

function parseImports(src) {
  const sf = ts.createSourceFile("file.tsx", src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const imports = []
  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt)) continue
    if (!stmt.moduleSpecifier || !ts.isStringLiteral(stmt.moduleSpecifier)) continue
    const from = stmt.moduleSpecifier.text
    const specifiers = []
    const clause = stmt.importClause
    if (!clause) continue
    if (clause.name) specifiers.push({ kind: "default", name: clause.name.text })
    if (clause.namedBindings) {
      if (ts.isNamedImports(clause.namedBindings)) {
        for (const el of clause.namedBindings.elements) {
          specifiers.push({ kind: "named", name: el.name.text, propertyName: el.propertyName?.text })
        }
      } else if (ts.isNamespaceImport(clause.namedBindings)) {
        specifiers.push({ kind: "namespace", name: clause.namedBindings.name.text })
      }
    }
    imports.push({ from, specifiers, isTypeOnly: !!clause.isTypeOnly })
  }
  return imports
}

function formatImports(imports) {
  return imports
    .map((imp) => {
      const named = imp.specifiers
        .filter((s) => s.kind === "named")
        .map((s) => (s.propertyName ? `${s.propertyName} as ${s.name}` : s.name))
      const def = imp.specifiers.find((s) => s.kind === "default")
      const ns = imp.specifiers.find((s) => s.kind === "namespace")
      const parts = []
      if (def) parts.push(def.name)
      if (ns) parts.push(`* as ${ns.name}`)
      if (named.length > 0) parts.push(`{ ${named.join(", ")} }`)
      const typeKw = imp.isTypeOnly ? "type " : ""
      return `import ${typeKw}${parts.join(", ")} from "${imp.from}"`
    })
    .join("\n")
}

function indentSample(sample, indent = "    ") {
  return sample
    .split("\n")
    .map((line, i) => (i === 0 ? line : indent + line))
    .join("\n")
}

export function scaffoldFromCandidate(candidate, repoRoot) {
  const componentName = pascalCase(candidate.suggestedName)
  const slug = kebabCase(candidate.suggestedName)

  let neededImports = []
  const firstOcc = candidate.occurrences[0]
  if (firstOcc) {
    const sourceFilePath = join(repoRoot, firstOcc.file)
    if (existsSync(sourceFilePath)) {
      const sourceFile = readFileSync(sourceFilePath, "utf8")
      const used = collectIdentifiers(candidate.sample)
      const allImports = parseImports(sourceFile)
      neededImports = allImports
        .map((imp) => ({
          ...imp,
          specifiers: imp.specifiers.filter(
            (s) => s.kind === "namespace" || used.has(s.name)
          ),
        }))
        .filter((imp) => imp.specifiers.length > 0)
    }
  }

  const importBlock =
    neededImports.length > 0 ? formatImports(neededImports) + "\n" : ""

  const source = `// Auto-scaffolded from candidate ${candidate.hash}.
// This is a starting point. Before promoting to components/ui/:
//   - Rename the component to something semantic
//   - Replace literal text/values with a real prop API
//   - Add variants via CVA where needed
//   - Verify a11y, responsiveness, and token compliance
//   - Wire up className passthrough where appropriate

${importBlock}import type { ReactNode } from "react"

export type ${componentName}Props = {
  className?: string
  children?: ReactNode
}

export function ${componentName}({ className: _className, children: _children }: ${componentName}Props) {
  return (
    ${indentSample(candidate.sample, "    ")}
  )
}
`

  return { slug, componentName, source }
}

export function regenerateDraftsIndex(draftsDir) {
  if (!existsSync(draftsDir)) return ""
  const files = readdirSync(draftsDir)
    .filter((f) => f.endsWith(".tsx") && f !== "_index.tsx")
    .sort()

  const header = `// Auto-generated by scripts/lib/scaffold-component.mjs.
// Do not edit by hand — regenerated on every approve/discard action.

import type { ComponentType } from "react"

export type Draft = { slug: string; componentName: string; component: ComponentType }
`

  if (files.length === 0) {
    return `${header}
export const drafts: Draft[] = []
`
  }

  const lines = [header]
  for (const f of files) {
    const slug = f.replace(/\.tsx$/, "")
    const id = pascalCase(slug)
    lines.push(`import { ${id} } from "./${slug}"`)
  }
  lines.push("")
  lines.push("export const drafts: Draft[] = [")
  for (const f of files) {
    const slug = f.replace(/\.tsx$/, "")
    const id = pascalCase(slug)
    lines.push(`  { slug: "${slug}", componentName: "${id}", component: ${id} },`)
  }
  lines.push("]")
  lines.push("")
  return lines.join("\n")
}
