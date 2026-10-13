<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/inkbar/.github/main/profile/header-dark.png">
  <img src="https://raw.githubusercontent.com/inkbar/.github/main/profile/header-light.png" alt="Inkbar. A full PDF editor for your web app. No licence fee. Works with TypeScript, Vue, React and Svelte." width="100%">
</picture>

Inkbar is an open-source PDF viewer and editor for the browser. It renders, annotates and edits PDFs, is written in TypeScript, and is free under the MIT licence.

## What you get

- **Viewing.** Rendering built on PDF.js, with zoom, page navigation, text selection and search.
- **Annotations.** Highlight, underline, strikeout and squiggly on text, notes with replies, freehand ink, shapes and text boxes.
- **Redaction and forms.** Mark text and regions for redaction, then review each mark before you apply it. Read and fill form fields in the viewer.
- **A default UI you can replace.** Import the theme and ship it, restyle it with your own CSS, or build your own toolbar on the same headless components.
- **Typed data.** Annotations are plain typed objects. Keep them in your own state, or let Inkbar hold them with undo and redo.

## Packages

| Package          | Purpose                                                                         |
| ---------------- | ------------------------------------------------------------------------------- |
| `@inkbar/core`   | Document model, rendering, annotations and tools, with no framework dependency. |
| `@inkbar/vue`    | Vue 3 components, composables and a default toolbar.                            |
| `@inkbar/react`  | React 19 components, hooks and a default toolbar.                               |
| `@inkbar/svelte` | Svelte 5 components and a default toolbar.                                      |
| `@inkbar/theme`  | Default stylesheet. Zero specificity, compatible with shadcn token names.       |

The packages are released together and share one version number.

## Start

Install the core, the theme and the package for your framework:

```sh
pnpm add @inkbar/react @inkbar/core @inkbar/theme
```

Swap `@inkbar/react` for `@inkbar/vue` or `@inkbar/svelte`. The [Quickstart](https://inkbar.dev/docs/quickstart/) puts a document on screen with the default toolbar.

## Where things are

- [inkbar.dev](https://inkbar.dev) has the documentation.
- [inkbar/inkbar](https://github.com/inkbar/inkbar) holds the packages.
- [inkbar/landing](https://github.com/inkbar/landing) is the source of inkbar.dev.

<sub>From the team behind [Redactr](https://redactr.io).</sub>
