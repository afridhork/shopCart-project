# Code Review: ShopCart Project

Review struktur dan kualitas kode — **Next.js 13 (App Router) + React 18 + TypeScript + Redux Toolkit**.

---

## Yang Sudah Baik

- **Struktur folder** jelas: `app/` (routing), `components/` (section), `part/` (UI kecil), `store/`, `models/`, `assets/`.
- **Pemilihan stack** cocok: RTK Query untuk data, Redux untuk state UI, Tailwind + SASS.
- **Path alias** `@/` konsisten di seluruh proyek.
- **TypeScript** dipakai di hampir semua file; `tsconfig` dengan `strict: true`.
- **Loading state** ditangani (skeleton, `isLoading`) di banyak halaman/komponen.
- **Komponen part** (Button, CatalogItem, Modal, SearchBar, dll.) cukup reusable.

---

## Masalah Kritis

### 1. Redux: Satu reducer dipakai untuk banyak state key

**File:** `src/store/index.ts`

```ts
dataBrand: landingPageReducer,
dataDiscount: landingPageReducer,
dataRating: landingPageReducer,
dataCategory: landingPageReducer,
```

Satu reducer (`landingPageReducer`) dipasang ke empat key. Setiap dispatch ke salah satu aksi (mis. `topBrand`, `listItem`, `categoryItem`) akan mengubah **semua** key tersebut karena state-nya satu. Ini bug logika: data brand, discount, rating, dan category saling timpa.

**Rekomendasi:** Satu key saja untuk landing page, mis. `landingPage: landingPageReducer`, lalu di komponen pakai `state.landingPage.topBrand`, `state.landingPage.discountItems`, dll.

---

### 2. Crash saat cart kosong

**File:** `src/app/cart/page.tsx`

```tsx
isSuccess && (<CartList ... data={data.carts[0].products}/>)
```

Jika `data.carts` kosong atau `carts` undefined, akses `data.carts[0]` akan error.

**Rekomendasi:** Cek dulu sebelum akses, mis. `data?.carts?.[0]?.products` dan tampilkan state kosong (mis. "Keranjang kosong") atau jangan panggil cart API saat user belum login (`userID === 0`).

---

### 3. Layout: `async` tanpa `await` + `'use client'`

**File:** `src/app/layout.tsx`

- Root layout dideklarasikan `async function` tapi tidak ada `await`.
- Layout memakai `'use client'` (karena `Provider`, dll.) — di Next.js 13, komponen client tidak boleh async.

**Rekomendasi:** Hapus kata kunci `async` dari `RootLayout`.

---

### 4. Typo & nama komponen

- **CartList:** state `isCheckClidked` → sebaiknya `isCheckClicked`.
- **Halaman:** banyak default export bernama `page` atau `categoryDetailProductPage` (camelCase). Untuk komponen React lebih lazim PascalCase, mis. `Page` / `CategoryDetailProductPage`, agar konsisten dengan konvensi React.

---

## Masalah Menengah

### 5. Tipe data (TypeScript)

- **`src/models/product.ts`:** `products: allProduct` — response API DummyJSON adalah array, seharusnya `products: allProduct[]`.
- **`src/store/api/category.ts`:** endpoint `allProduct` dideklarasikan mengembalikan `allProduct[]`, padahal API mengembalikan objek `{ products, total, skip, limit }` — tipe response tidak sesuai.
- **Pemakaian `any`:** banyak sekali (localStorage, event handler, props, ref). Contoh:
  - `localStorage.getItem('auth data') as any`
  - `(e: any) => void`, `data: any`, `useRef<any>`
  - Mutation RTK: `builder.mutation<any, any>`

**Rekomendasi:**  
- Perbaiki tipe response API (product list vs single product vs cart) di `models/` dan di RTK Query.  
- Buat tipe untuk auth (simpan di `models/`) dan gunakan untuk payload + localStorage.  
- Ganti `any` bertahap: `ChangeEvent<HTMLInputElement>`, tipe payload cart/auth, dan jenis ref yang dipakai.

---

### 6. Duplikasi API "all products"

- **Product API** (`store/api/product.ts`): `allProduct` → `useAllProductQuery()`.
- **Category API** (`store/api/category.ts`): juga `allProduct` → `useAllProductQuery()`.

Dua endpoint sama (`/products?limit=0`) di dua API slice berbeda bisa membingungkan dan duplikasi cache/key.

**Rekomendasi:** Satu sumber saja (mis. hanya dari `product` API) untuk "all products", dan hapus dari category API. Category API fokus ke `categoryList` (daftar kategori).

---

### 7. Slice landing: nama reducer vs state key

**File:** `src/store/slices/landingPage.ts`

Reducer bernama `topBrand` dan state key juga `topBrand`. Di Redux Toolkit ini valid, tapi bersama pola "satu reducer banyak key" di store (poin 1) memperparah kebingungan. Setelah konsolidasi ke satu key `landingPage`, pastikan nama aksi dan state key konsisten dan jelas.

---

### 8. Keamanan & error handling

- **localStorage:** `JSON.parse(localStorage.getItem('auth data') as any)` dan serupa untuk `checkout data`, `delivery info` — jika key tidak ada atau nilai invalid, bisa throw.
- **Auth:** Credential dan token disimpan di localStorage; tidak ada refresh token atau penanganan session expiry (kondisional).
- **RTK Query:** Tidak terlihat penanganan error global (mis. `isError`, `error` dari hook) di UI; pengguna bisa tidak dapat feedback saat network/API gagal.

**Rekomendasi:**  
- Bungkus `JSON.parse` dengan try/catch dan beri nilai default (null/[]).  
- Tampilkan error state dari RTK Query (toast atau pesan di halaman) dan, jika perlu, redirect ke login saat 401.

---

### 9. Kode mati dan console

- **`src/app/page.tsx`:** Blok komentar panjang (~40 baris) — lebih baik dihapus atau dipindah ke doc/notes jika masih perlu referensi.
- **`src/components/Header/page.tsx`:** Ada `console.log('cek', ...)` — sebaiknya dihapus untuk production.

---

### 10. Sinkronisasi state dengan props

**File:** `src/components/CartList/page.tsx`

`itemList` di-initialize dari `data` (props) dan di-update lewat checkbox. Jika `data` berubah dari luar (mis. refetch), `itemList` tidak ikut update karena hanya di-set lewat `useState(data)` sekali.

**Rekomendasi:** Sync dengan props, mis. `useEffect` yang set `itemList(data)` ketika `data` berubah, atau turunkan "selected" sebagai controlled state dari parent agar single source of truth.

---

## Saran Perbaikan Berprioritas

| Prioritas | Aksi |
|-----------|------|
| Tinggi    | Perbaiki store: satu key untuk landing page, jangan satu reducer untuk dataBrand/dataDiscount/dataRating/dataCategory. |
| Tinggi    | Amankan akses cart: cek `data?.carts?.[0]` dan handle user belum login. |
| Tinggi    | Hapus `async` dari root layout. |
| Sedang    | Perbaiki tipe Product/API (products array, response shape) dan kurangi `any` (terutama auth dan cart). |
| Sedang    | Satu sumber untuk "all products" (hapus duplikasi di category API). |
| Sedang    | Safe parse localStorage (try/catch + default) dan tampilkan error dari RTK Query. |
| Rendah    | Hapus komentar panjang dan `console.log`, perbaiki typo, konsistenkan nama komponen (PascalCase). |

---

## Ringkasan

- **Struktur proyek dan pilihan teknologi** sudah bagus dan konsisten.
- **Masalah paling riskan:** konfigurasi Redux (satu reducer banyak key) dan akses `data.carts[0]` tanpa pengecekan.
- **Peningkatan terbesar berikutnya:** perbaikan tipe TypeScript (model + API), satu sumber data "all products", dan penanganan error serta localStorage yang aman.

Dengan perbaikan di atas, maintainability dan keandalan aplikasi akan jauh lebih baik.
