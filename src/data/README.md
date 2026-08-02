# Tourism data model

The data layer separates the shape consumed by the UI from the place where content comes from. Components should import from `@/data`; they should not import `singapaduData.ts` directly.

## Files

- `schema.ts` defines source-independent entities and shared enumerations.
- `destinations.ts` contains the current destination inventory and bilingual destination copy.
- `singapaduData.ts` contains the remaining local events, translations, and contact content.
- `localSource.ts` adapts that local content to `TourismContentSource` and checks it at compile time.
- `index.ts` is the public application boundary and retains the existing convenience exports.
- `siteMetadata.ts` resolves deployment metadata that is not tourism content.

## Entity relationships

```text
TourismContentSource
├── destinations[]
│   ├── key <──────── heroSlides[].key
│   ├── slug ──────── /destinations/[slug]
│   ├── shared fields (category, images, map query)
│   └── localized fields
│       ├── en: DestinationContent
│       └── id: DestinationContent
├── events[]
│   ├── shared fields (key, category)
│   └── localized fields
├── heroSlides[]
├── translations
└── contact
```

`key` is the stable internal identifier and relationship key. `slug` is the stable public URL identifier. Neither should be generated from a translated title.

`contentStatus` distinguishes records with verified visitor information (`ready`) from name-only inventory entries (`draft`). Draft records remain routable and filterable, but their generated copy explicitly says that hours, admission, and access still require confirmation.

The current localized shape stores languages beside each record (`destination.en`, `destination.id`). This makes local data easy to inspect and guarantees that every supported language is present through `Localized<T>`.

## Replacing local data

An API or CMS does not need to use this storage shape internally. Add an adapter that validates and converts its response to `TourismContentSource`, then change `TOURISM_CONTENT` in `index.ts` to consume that adapter. This keeps provider-specific IDs, nullable fields, asset formats, and localization conventions out of UI components.

When external data becomes asynchronous, expose query functions such as `getDestinations()` and `getDestinationBySlug()` from the data boundary instead of making components call the provider directly. Keep normalization, validation, caching, and error handling in that layer.

## Change guidelines

- Add a language to `LANGUAGES`; TypeScript will then report every record missing that translation.
- Add a category to `DESTINATION_CATEGORIES`; update any category-specific presentation rules as needed.
- Keep `All` as a filter-only value; never persist it as a destination category.
- Keep an empty `gallery` and omit `img` until real destination photography is supplied; the UI will render the branded placeholder.
- Move a destination from `draft` to `ready` only after its visitor information has been checked.
- Keep display-ready text such as dates, prices, and opening hours localized until structured filtering or calculations are required.
- Keep destination facilities localized because the labels are rendered directly on the public detail page.
- If dates, prices, coordinates, or opening hours become functional data, introduce structured source fields and format them for each locale at the presentation boundary.
- Preserve destination keys and slugs after publication so hero relationships and inbound URLs remain valid.
