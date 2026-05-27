# vCard Repair Tool

This app repairs uploaded `.vcf` vCard files by normalizing their URL fields and exporting a cleaned vCard for download.

## Features

- Upload `.vcf` files by file picker or drag and drop
- Validate basic vCard file type, size, and version
- Parse and regenerate vCard 3.0 files
- Download repaired files as `*_repariert.vcf`

## Tech stack

- Vue 3
- Vue CLI 5
- Tailwind CSS 4
- ESLint 10
- Cypress 15

## Project setup

```sh
npm install
```

## Development

```sh
npm run serve
```

## Production build

```sh
npm run build
```

## Linting

```sh
npm run lint
```

## End-to-end tests

```sh
npm run test:e2e:run
```

If Cypress is started from an environment where `ELECTRON_RUN_AS_NODE=1` is set, unset it for the test command:

```sh
env -u ELECTRON_RUN_AS_NODE npm run test:e2e:run
```
