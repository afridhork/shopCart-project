# Panduan Pengembangan ShopCart

Dokumen ini mendefinisikan standar dan konvensi proyek agar kode tetap modular, scalable, maintainable, dan ramah untuk AI/editor.

---

## 1. Arsitektur Komponen

| Aturan | Keterangan |
|--------|------------|
| **Functional component** | Gunakan function + hooks; hindari class component. |
| **Pemisahan logic** | Pisahkan container logic (data, side effect) dan presentational logic (tampilan). |
| **Path alias** | Gunakan `@/` untuk import (contoh: `@/store/slices/brandSlice`, `@/part/Button/page`). |

---

## 2. Struktur Folder

| Path | Isi |
|------|-----|
| **`/src/app`** | Hanya page dan routing (file `page.tsx`, `layout.tsx`). Logika halaman boleh di sini atau di component. |
| **`/src/part`** | UI yang **reusable** (Button, Modal, SearchBar, CustomSkeleton, Cart, FormInput, dll.). |
| **`/src/components`** | Komponen yang **spesifik halaman** (Hero, TopCategories, BestDiscount, Footer, Header, dll.). |
| **`/src/store`** | Redux: `slices/`, `api/`. |
| **`/src/models`** | Interface/tipe TypeScript (product, cart, brand, category, dll.). |
| **`/src/static`** | Data statis (brand-img, dummyAddress, dummyVoucher, ctg-img). |
| **`/src/assets`** | Style global, gambar, ikon. |

---

## 3. State & Data

| Jenis state | Solusi | Contoh |
|-------------|--------|--------|
| **Data dari API** | **RTK Query** (endpoints di `store/api/`). | `useAllProductQuery()`, `useCategoryProductQuery()`, `useSingleProductQuery()`. |
| **State global UI/data turunan** | **Redux slice** (satu slice per domain). | `brandSlice`, `discountSlice`, `ratingSlice`, `categorySlice`, `searchPage`, `cartPage`, `checkoutPage`. |
| **State lokal (satu komponen)** | **React state** (`useState`). | Form input, toggle, modal open. |

- **Jangan** fetch API manual di banyak tempat; pakai satu endpoint RTK Query dan cache.
- **Jangan** simpan response API mentah di local state; simpan di Redux (via dispatch dari RTK Query result) jika dipakai banyak komponen.
- **Satu reducer per kebutuhan**: jangan gabung banyak key (mis. brand + discount + rating) dalam satu slice; buat slice terpisah (brandSlice, discountSlice, dll.).

---

## 4. Redux / Store

- **Slice**: Satu file per domain, nama `*Slice.ts` (contoh: `brandSlice.ts`, `categorySlice.ts`). Payload action gunakan tipe dari `/models` (mis. `PayloadAction<product>`).
- **API**: Definisikan di `store/api/` dengan `createApi`; nama konvensi `*Fetch` (contoh: `productFetch`, `categoryFetch`, `cartFetch`, `authSection`). Setiap API harus:
  - Diregister di `store/index.ts` sebagai reducer dan middleware.
- **Selector**: Gunakan typed selector; state root: `RootState` (dari `store.getState()`). Contoh path: `state.dataBrand.topBrand`, `state.dataDiscount.discountItems`, `state.dataCategory.categoryItems`.

---

## 5. TypeScript

| Aturan | Keterangan |
|--------|------------|
| **Props wajib typed** | Semua props komponen pakai interface/type. |
| **Model di `/models`** | Tipe bersama (product, allProduct, cart, brand, dll.) didefinisikan di sini. |
| **Hindari `any`** | Gunakan tipe eksplisit atau `unknown` + type guard. |
| **Konsisten dengan API** | Tipe response API (mis. `product.products: allProduct[]`) harus selaras dengan model dan payload slice. |

---

## 6. Styling

| Prioritas | Keterangan |
|-----------|------------|
| **Utama** | **Tailwind CSS** (utility class konsisten). |
| **Tambahan** | File `.css` per komponen (mis. `part/Button/index.css`) untuk style yang kompleks atau sulit di Tailwind. |
| **Global** | `globals.css` untuk variabel, layer base/components. |
| **Hindari** | Inline style untuk hal yang bisa diganti class; jangan nesting `@layer` tidak standar (mis. `@layer components` di dalam `@layer base`). |

---

## 7. Performance

- Gunakan **Next.js Server Component** bila memungkinkan; untuk interaktivitas pakai `'use client'`.
- **Lazy load** komponen berat (`React.lazy` + `Suspense`).
- Gunakan **skeleton loading** (mis. `CustomSkeleton`, `react-loading-skeleton`) untuk UX saat data loading.
- Minimalkan re-render: jangan simpan data besar di state global yang sering berubah; pakai selector yang spesifik.

---

## 8. Do & Don't

**Do**

- Gunakan RTK Query untuk fetch API dan cache.
- Gunakan komponen reusable dari `/part`.
- Gunakan typed selector dan typed `AppDispatch`.
- Ikuti struktur folder dan naming (slice, api, models).
- Satu slice per domain; payload action bertipe dari model.
- Usahakan lakukan kode dengan metode DRY (Dont Repeat Yourself)
- update note_update untuk setiap perubahan yang ada pada proyek ini


**Don't**

- Jangan fetch API manual di banyak tempat.
- Jangan simpan data API di local state kalau dipakai lintas komponen.
- Jangan buat komponen raksasa tanpa pemisahan logic.
- Jangan pakai `any` di TypeScript.
- Jangan gabung banyak domain dalam satu reducer (satu slice = satu concern).

---

## 9. Alur Kerja yang Disarankan

1. Definisikan **model/interface** di `/models` (sesuai response API jika ada).
2. Buat **endpoint RTK Query** di `store/api/` jika butuh data dari API.
3. Buat **slice** di `store/slices/` jika butuh state global (payload mengacu ke model).
4. Register reducer & middleware di `store/index.ts`.
5. Buat **reusable component** di `/part` bila dipakai lebih dari satu halaman.
6. Buat **komponen halaman** di `/components` dan integrasikan di `/app`.
7. Tambahkan **skeleton loading** untuk state loading.

---

## 10. Target Arsitektur

- **Modular** — slice dan API terpisah per domain; komponen kecil dan fokus.
- **Scalable** — penambahan fitur tidak mengacaukan struktur.
- **Maintainable** — naming konsisten, tipe jelas, dokumentasi (termasuk `note_update.md`).
- **AI Coding Friendly** — konvensi jelas agar prompt dan refactor konsisten.
- **High Performance** — Server Component bila bisa, lazy load, skeleton, cache RTK Query.
