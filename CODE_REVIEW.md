# Code Review: ShopCart Project

Review struktur dan kualitas kode — **Next.js 13 (App Router) + React 18 + TypeScript + Redux Toolkit**.

**Status perbarui:** Setelah penyelarasan dengan `skills.md` dan perbaikan lanjutan, status tiap poin dicantumkan di bawah (✅ teratasi / ⚠️ sebagian / ❌ belum).

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

### 1. Redux: Satu reducer dipakai untuk banyak state key — ✅ Teratasi

**File:** `src/store/index.ts`

Satu reducer (`landingPageReducer`) dulu dipasang ke empat key; sekarang setiap key punya reducer sendiri: `brandSlice`, `discountSlice`, `ratingSlice`, `categorySlice` (plus `searchSlice`, `cartSlice`, `checkoutSlice`). Satu slice per domain, payload bertipe dari `/models`.

---

### 2. Crash saat cart kosong — ✅ Teratasi

**File:** `src/app/cart/page.tsx`

Akses aman: `data?.carts?.[0]?.products ?? []`, `useUserCartQuery(userID, { skip: userID === 0 })`. Tampilan: pesan "Silakan login..." bila `userID === 0`, "Keranjang kosong" bila carts kosong, else `CartList` dengan `cartProducts`.

---

### 3. Layout: `async` tanpa `await` — ✅ Teratasi

**File:** `src/app/layout.tsx`

Kata kunci `async` sudah dihapus dari `RootLayout`; layout tetap server component (tanpa `'use client'`), dengan `Provider` di dalam.

---

### 4. Typo & nama komponen — ✅ Sebagian

- **CartList:** typo `isCheckClidked` → `isCheckClicked` sudah diperbaiki.
- **Nama komponen:** default export `page`, `categoryDetailProductPage`, dll. masih camelCase; mengubah ke PascalCase (mis. `Page`, `CategoryDetailProductPage`) opsional untuk konsistensi konvensi React.

---

## Masalah Menengah

### 5. Tipe data (TypeScript) — ✅ Teratasi

- **`src/models/product.ts`:** `products: allProduct[]` sudah benar.
- **API:** Auth dan cart API memakai tipe dari `models/auth` dan `models/cart`; mutation tidak lagi `any, any`.
- **`any`:** Berkurang signifikan: util `@/lib/storage` (localStorage bertipe), props/ref bertipe (productCart, allProduct, useRef<HTMLDivElement | null>), tipe payload slice dari model.

---

### 6. Duplikasi API "all products" — ✅ Teratasi

Satu sumber: "all products" dipakai dari **product API** (`useAllProductQuery` dari `@/store/api/product`). Footer dan halaman lain memakai product API; category API fokus ke `categoryList`.

---

### 7. Slice landing: nama reducer vs state key — ✅ Teratasi

`landingPage.ts` sudah dihapus. Slice terpisah per domain (`brandSlice`, `discountSlice`, dll.) dengan nama file `*Slice.ts`, state key dan aksi konsisten (mis. `dataBrand.topBrand`, `setTopBrand`).

---

### 8. Keamanan & error handling — ✅ Sebagian

- **localStorage:** ✅ `@/lib/storage` membungkus baca/tulis dengan try/catch dan mengembalikan `null` / default; tidak lagi `JSON.parse(... as any)` di banyak tempat.
- **Auth:** Token tetap di localStorage; refresh token / session expiry belum diimplementasi (bisa prioritas berikutnya).
- **RTK Query:** ⚠️ `isError` / `error` dari hook belum ditampilkan secara global di UI (toast atau pesan per halaman); disarankan ditambah agar pengguna dapat feedback saat API gagal.

---

### 9. Kode mati dan console — ✅ Teratasi

- **`src/app/page.tsx`:** Blok komentar panjang sudah dihapus.
- **Console:** `console.log` yang tidak perlu sudah dihapus (category/[...slug], BookingPage); Header tidak lagi memakai console di alur kategori.

---

### 10. Sinkronisasi state dengan props — ✅ Teratasi

**File:** `src/components/CartList/page.tsx`

`useEffect` dengan dependency `[data]` men-set `itemList` dari `data` ketika props `data` berubah (mis. setelah refetch), sehingga state ikut sinkron dengan data terbaru.

---

## Saran Perbaikan Berprioritas

| Prioritas | Aksi | Status |
|-----------|------|--------|
| Tinggi    | Perbaiki store: satu reducer per key (bukan satu reducer untuk dataBrand/dataDiscount/dataRating/dataCategory). | ✅ |
| Tinggi    | Amankan akses cart: cek `data?.carts?.[0]` dan handle user belum login. | ✅ |
| Tinggi    | Hapus `async` dari root layout. | ✅ |
| Sedang    | Perbaiki tipe Product/API dan kurangi `any` (auth, cart, props, ref). | ✅ |
| Sedang    | Satu sumber untuk "all products" (product API). | ✅ |
| Sedang    | Safe parse localStorage (try/catch + default); tampilkan error dari RTK Query. | ✅ / ⚠️ (error UI belum global) |
| Rendah    | Hapus komentar panjang dan `console.log`, perbaiki typo; nama komponen PascalCase. | ✅ / ⚠️ (PascalCase opsional) |

---

## Ringkasan

- **Struktur proyek dan pilihan teknologi** sudah bagus dan konsisten.
- **Masalah kritis dan menengah** dari review awal pada dasarnya **sudah teratasi**: Redux per-slice, cart aman, layout tanpa async, tipe & API rapi, satu sumber all products, localStorage lewat util, CartList sync dengan props, typo diperbaiki, kode mati dan console dibersihkan.
- **Opsional ke depan:** tampilkan `isError`/`error` RTK Query di UI (toast/pesan), konsistenkan nama komponen ke PascalCase, dan (jika perlu) penanganan session/refresh token untuk auth.

Dengan perbaikan yang sudah dilakukan, maintainability dan keandalan aplikasi sudah jauh lebih baik.
