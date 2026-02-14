# Catatan Perubahan (Changelog)

Dokumen ini mencatat perubahan yang dilakukan pada proyek ShopCart beserta tujuan masing-masing.  
**File ini diperbarui setiap ada perubahan.**

---

## 1. Perbaikan `src/assets/style/globals.css`

### Yang diubah

| Perubahan | Untuk apa |
|-----------|------------|
| **Menghapus baris** `import 'react-loading-skeleton/dist/skeleton.css'` | `import` adalah syntax JavaScript, bukan CSS. File skeleton tetap diload dari `layout.tsx`, jadi tidak perlu di CSS dan bisa bikin error. |
| **Memindahkan** `@layer components { ... }` keluar dari dalam `@layer base { ... }` | Di Tailwind, `@layer` sebaiknya dipakai di tingkat atas. Nesting `@layer components` di dalam `@layer base` tidak standar dan bisa bikin class seperti `.card` tidak ter-apply dengan benar. |
| **Typo class** `.categoreis-wrapper` → `.categories-wrapper` | Penulisan "categories" yang benar agar konsisten dan mudah dibaca. |
| **Typo class** `.brand-img-wraper` → `.brand-img-wrapper` | Penulisan "wrapper" yang benar. |
| **Komentar** "Top categoreis" → "Top categories" | Komentar mengikuti typo yang diperbaiki. |
| **Class** `.discount-content`: menghapus `sm:max-w-[300px]` yang duplikat | Hanya satu yang dipakai (`sm:max-w-lg`), sehingga tidak ada duplikat dan style lebih jelas. |
| **Format** `:root{` → `:root {` dan spasi pada selector lain | Konsistensi format (spasi sebelum `{`). |

### File terkait yang disesuaikan

- **`src/components/TopCategories/page.tsx`** — `className` dari `categoreis-wrapper` menjadi `categories-wrapper`.
- **`src/components/TopBrand/page.tsx`** — `className` dari `brand-img-wraper` menjadi `brand-img-wrapper`.

---

## 2. Pengaturan workspace untuk menghilangkan warning CSS

### Yang diubah

| Perubahan | Untuk apa |
|-----------|------------|
| **Membuat** `.vscode/settings.json` dengan isi `"css.lint.unknownAtRules": "ignore"` | Linter CSS bawaan tidak mengenali at-rule Tailwind (`@tailwind`, `@apply`), sehingga muncul puluhan warning "Unknown at rule". Pengaturan ini membuat warning tersebut tidak muncul hanya di workspace ini. |

---

## 3. Code review dan referensi perbaikan

### Yang diubah

| Perubahan | Untuk apa |
|-----------|------------|
| **Membuat** `CODE_REVIEW.md` | Dokumen berisi review struktur dan kualitas kode: hal yang sudah baik, masalah kritis, masalah menengah, dan saran perbaikan berprioritas agar tim punya acuan perbaikan. |
| **Mengembalikan** `CODE_REVIEW.md` setelah sempat terhapus | Agar catatan review tetap tersedia di root proyek. |

---

## 4. Perbaikan store Redux (satu reducer per kebutuhan)

### Masalah awal

- Satu reducer (`landingPageReducer`) dipakai untuk empat key di store: `dataBrand`, `dataDiscount`, `dataRating`, `dataCategory`.
- Setiap dispatch ke salah satu aksi mengubah state yang sama untuk keempat key tersebut (state terbagi/dipakai bersama), sehingga desain membingungkan dan rawan bug.

### Yang diubah

| Perubahan | Untuk apa |
|-----------|------------|
| **Membuat** `src/store/slices/brandSlice.ts` | Reducer khusus untuk data **top brand**: state `topBrand`, action `setTopBrand`. Logika diambil dari slice lama, dengan typing yang lebih jelas dan pengecekan indeks. |
| **Membuat** `src/store/slices/discountSlice.ts` | Reducer khusus untuk **produk diskon tertinggi**: state `discountItems`, action `setDiscountItems`. Hanya mengurus 8 produk dengan diskon terbesar. |
| **Membuat** `src/store/slices/ratingSlice.ts` | Reducer khusus untuk **produk rating tertinggi**: state `ratingItems`, action `setRatingItems`. Hanya mengurus 8 produk dengan rating tertinggi. |
| **Membuat** `src/store/slices/categorySlice.ts` | Reducer khusus untuk **daftar kategori**: state `categoryItems`, action `setCategoryItems`. Kategori unik dengan flag `active` (mis. smartphones). |
| **Mengubah** `src/store/index.ts` | Mengganti satu `landingPageReducer` dengan empat reducer terpisah: `dataBrand: brandReducer`, `dataDiscount: discountReducer`, `dataRating: ratingReducer`, `dataCategory: categoryReducer`. |
| **Mengubah** `src/app/page.tsx` | Mengganti dispatch `topBrand`, `listItem`, `categoryItem` menjadi `setTopBrand`, `setDiscountItems`, `setRatingItems`, `setCategoryItems` dari slice baru; menambah dependency array yang benar di `useEffect`. |
| **Mengubah** `src/components/Footer/page.tsx` | Mengganti import dan dispatch dari `categoryItem` (landingPage) menjadi `setCategoryItems` (categorySlice). |
| **Menghapus** `src/store/slices/landingPage.ts` | File lama tidak dipakai lagi setelah logika dipindah ke empat slice terpisah. |

### Yang tidak diubah (agar tidak break)

- **Selector di komponen** tetap sama: `state.dataBrand.topBrand`, `state.dataDiscount.discountItems`, `state.dataRating.ratingItems`, `state.dataCategory.categoryItems`. Jadi komponen TopBrand, BestDiscount, BestRating, ProductChoice, dan Footer tidak perlu ubah path selector.

---

## 5. Perbaikan tipe TypeScript (error di `page.tsx` dan slice)

### Masalah

- Di **`src/app/page.tsx`** (useEffect baris 26–33): error saat `dispatch(setTopBrand(data))` dll. — tipe `product` dari API tidak cocok dengan payload slice.
- Di **model** `product`: `products` dideklarasikan sebagai `allProduct` (satu objek), padahal API mengembalikan **array** (`products: allProduct[]`).

### Yang diubah

| Perubahan | Untuk apa |
|-----------|------------|
| **`src/models/product.ts`** — `products: allProduct` → `products: allProduct[]` | Response API memang array; tipe model disesuaikan agar TypeScript tidak salah infer. |
| **Slice (brand, discount, rating, category)** — payload action dari `ProductListPayload` kustom → `PayloadAction<product>` | Agar payload sama dengan tipe response API; dispatch dari `page.tsx` jadi type-safe. |
| **`src/store/slices/discountSlice.ts`** — `category: item.category ?? ''`, `id: item.id ?? 0` | Field opsional di `allProduct`; beri nilai default agar tidak `undefined`. |

---

## 6. Perbaikan error di Footer (`setCategoryItems(data)`)

### Masalah

- Footer memakai `useAllProductQuery()` dari **category API**, yang dideklarasikan mengembalikan `allProduct[]` (array).
- `setCategoryItems` mengharapkan payload tipe **`product`** (objek dengan `products`, `total`, `skip`, `limit`).
- Error: *"Argument of type 'allProduct[]' is not assignable to parameter of type 'product'"*.

### Yang diubah

| Perubahan | Untuk apa |
|-----------|------------|
| **`src/components/Footer/page.tsx`** — import `useAllProductQuery` dari `@/store/api/category` → `@/store/api/product` | Data dari product API bertipe `product`, sehingga `dispatch(setCategoryItems(data))` tipe-nya cocok. Satu sumber data (product API) dan cache RTK Query dipakai bersama dengan home page. |

---

## 7. Penyelarasan dengan `skills.md` (konvensi proyek)

Perubahan berikut dilakukan agar kode mengikuti panduan di **skills.md**: konvensi slice, typed hooks, tipe API, DRY, dan pengurangan `any`.

### 7.1 Rename slice ke konvensi `*Slice.ts` dan payload bertipe

| Perubahan | Untuk apa |
|-----------|------------|
| **Membuat** `src/store/slices/searchSlice.ts` | Slice pencarian dengan `PayloadAction<product>`, action `setSearchData`. Menggantikan `searchPage.ts`. |
| **Membuat** `src/store/slices/cartSlice.ts` | Slice keranjang dengan `PayloadAction<productCart[]>`, action `CartData`. Menggantikan `cartPage.ts`. |
| **Membuat** `src/store/slices/checkoutSlice.ts` | Slice checkout dengan `PayloadAction<allProduct[]>`, action `setCheckoutData`. Menggantikan `checkoutPage.ts`. |
| **Mengubah** `src/store/index.ts` | Import reducer dari `searchSlice`, `cartSlice`, `checkoutSlice` (bukan lagi `searchPage`, `cartPage`, `checkoutPage`). |
| **Mengubah** `src/components/CartList/page.tsx` | Import `CartData` dari `@/store/slices/cartSlice`. |
| **Menghapus** `searchPage.ts`, `checkoutPage.ts`, `cartPage.ts` | File lama diganti oleh slice dengan nama konvensi dan payload bertipe. |

### 7.2 Typed hooks Redux

| Perubahan | Untuk apa |
|-----------|------------|
| **Membuat** `src/store/hooks.ts` | Ekspor `useAppDispatch` dan `useAppSelector` (typed dengan `AppDispatch` dan `RootState`). |
| **Mengubah** `src/app/page.tsx`, `src/components/CartList/page.tsx`, `src/components/Footer/page.tsx`, `src/components/OrderSummaryCart/page.tsx` | Mengganti `useDispatch`/`useSelector` dengan `useAppDispatch`/`useAppSelector` agar selector dan dispatch ter-type. |

### 7.3 Tipe API (auth & cart) — hindari `any`

| Perubahan | Untuk apa |
|-----------|------------|
| **Membuat** `src/models/auth.ts` | Interface `AuthSigninRequest` dan `AuthSigninResponse` untuk endpoint signin. |
| **Menambah** `AddCartRequest` di `src/models/cart.ts` | Tipe request untuk mutation tambah keranjang. |
| **Mengubah** `src/store/api/auth.ts` | `signin: builder.mutation<AuthSigninResponse, AuthSigninRequest>` (menggantikan `any, any`). |
| **Mengubah** `src/store/api/cart.ts` | `addCart: builder.mutation<userCart, AddCartRequest>` (menggantikan `any, any`). |

### 7.4 DRY & util localStorage bertipe

| Perubahan | Untuk apa |
|-----------|------------|
| **Membuat** `src/lib/storage.ts` | Util: `getStoredAuth()`, `getStoredDeliveryInfo()`, `getStoredCheckout()`, `setStoredAuth()`, `setStoredDeliveryInfo()`, `setStoredCheckout()`, `removeStoredAuth()`. Satu tempat baca/tulis localStorage dengan tipe jelas, menghindari `JSON.parse(... as any)` di banyak file. |
| **Mengubah** `src/part/Cart/page.tsx`, `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`, `src/components/Header/page.tsx`, `src/components/DeliveryInformation/page.tsx`, `src/components/PriceDetail/page.tsx`, `src/components/BookingPage/page.tsx` | Mengganti akses langsung `localStorage.getItem('auth data')` / `'delivery info'` / `'checkout data'` dan `JSON.parse(... as any)` dengan pemanggilan fungsi di `@/lib/storage`. |

### 7.5 Pengurangan `any` di komponen

| Perubahan | Untuk apa |
|-----------|------------|
| **Header** | `categoryPack` bertipe `product[] \| ''`; loop kategori memakai `for (const item of data)`; auth pakai `getStoredAuth`/`setStoredAuth`/`removeStoredAuth`. |
| **PriceDetail** | Props `data: productCart[]`, `voucher: number`; `getStoredDeliveryInfo()`; reduce tanpa `any`. |
| **OrderSummary, OrderSummaryCart** | Props dan variabel lokal bertipe `productCart[]` / `allProduct[]`; `priceOrder`, `discountOrder` bertipe `number`. |
| **ReviewProduct** | Props `data?: allProduct[]`; `item: allProduct`, `index: number` di map. |
| **BookingPage** | Props `data: allProduct`; auth dari `getStoredAuth()`; `image: string`, `index: number` di map. |
| **TopBrand, BestDiscount, BestRating, TopCategories** | `useRef<HTMLDivElement \| null>(null)` menggantikan `useRef<any>(null)`. |
| **Breadcrumb** | Iterasi `name` dengan `for (const n of name)` (tanpa `as any`). |

### File yang dibuat / diubah / dihapus (section 7)

| Aksi | File |
|------|------|
| Dibuat | `src/store/slices/searchSlice.ts`, `src/store/slices/cartSlice.ts`, `src/store/slices/checkoutSlice.ts`, `src/store/hooks.ts`, `src/models/auth.ts`, `src/lib/storage.ts` |
| Diubah | `src/store/index.ts`, `src/components/CartList/page.tsx`, `src/app/page.tsx`, `src/components/Footer/page.tsx`, `src/components/OrderSummaryCart/page.tsx`, `src/store/api/auth.ts`, `src/store/api/cart.ts`, `src/models/cart.ts`, `src/part/Cart/page.tsx`, `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`, `src/components/Header/page.tsx`, `src/components/DeliveryInformation/page.tsx`, `src/components/PriceDetail/page.tsx`, `src/components/BookingPage/page.tsx`, `src/components/OrderSummary/page.tsx`, `src/components/ReviewProduct/page.tsx`, `src/components/TopBrand/page.tsx`, `src/components/BestDiscount/page.tsx`, `src/components/BestRating/page.tsx`, `src/components/TopCategories/page.tsx`, `src/part/Breadcrumb/page.tsx` |
| Dihapus | `src/store/slices/searchPage.ts`, `src/store/slices/cartPage.ts`, `src/store/slices/checkoutPage.ts` |

---

## Ringkasan file yang dibuat / diubah / dihapus

| Aksi | File |
|------|------|
| Dibuat | `CODE_REVIEW.md`, `note_update.md`, `.vscode/settings.json`, `src/store/slices/brandSlice.ts`, `src/store/slices/discountSlice.ts`, `src/store/slices/ratingSlice.ts`, `src/store/slices/categorySlice.ts`, `src/store/slices/searchSlice.ts`, `src/store/slices/cartSlice.ts`, `src/store/slices/checkoutSlice.ts`, `src/store/hooks.ts`, `src/models/auth.ts`, `src/lib/storage.ts` |
| Diubah | `src/assets/style/globals.css`, `src/components/TopCategories/page.tsx`, `src/components/TopBrand/page.tsx`, `src/store/index.ts`, `src/app/page.tsx`, `src/components/Footer/page.tsx`, `src/models/product.ts`, `src/models/cart.ts`, `src/store/slices/*`, `src/store/api/auth.ts`, `src/store/api/cart.ts`, `src/part/Cart/page.tsx`, `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`, `src/components/Header/page.tsx`, `src/components/DeliveryInformation/page.tsx`, `src/components/PriceDetail/page.tsx`, `src/components/BookingPage/page.tsx`, `src/components/OrderSummary/page.tsx`, `src/components/ReviewProduct/page.tsx`, `src/components/OrderSummaryCart/page.tsx`, `src/components/TopBrand/page.tsx`, `src/components/BestDiscount/page.tsx`, `src/components/BestRating/page.tsx`, `src/components/TopCategories/page.tsx`, `src/part/Breadcrumb/page.tsx` |
| Dihapus | `src/store/slices/landingPage.ts`, `src/store/slices/searchPage.ts`, `src/store/slices/cartPage.ts`, `src/store/slices/checkoutPage.ts`, `CATATAN_PERUBAHAN.md` (diganti oleh `note_update.md`) |

---

## 8. Penutupan poin CODE_REVIEW.md

Agar semua poin di **CODE_REVIEW.md** teratasi atau tercatat statusnya:

| Perubahan | Untuk apa |
|-----------|------------|
| **`src/app/cart/page.tsx`** | Akses aman: `data?.carts?.[0]?.products ?? []`, `skip: userID === 0`; tampilan "Silakan login...", "Keranjang kosong", atau CartList. |
| **`src/app/layout.tsx`** | Hapus `async` dari `RootLayout`. |
| **`src/components/CartList/page.tsx`** | Typo `isCheckClidked` → `isCheckClicked`; `useEffect([data])` untuk sinkron `itemList` dengan props `data`. |
| **`src/app/page.tsx`** | Hapus blok komentar panjang dan import yang tidak terpakai. |
| **`src/app/category/[...slug]/page.tsx`**, **`src/components/BookingPage/page.tsx`** | Hapus `console.log`. |
| **`CODE_REVIEW.md`** | Tambah status per poin (✅/⚠️) dan tabel saran berprioritas dengan kolom Status. |

---

*Terakhir diperbarui: penyelarasan dengan skills.md; penutupan poin CODE_REVIEW (cart aman, layout, typo, sync CartList, bersihkan kode mati & console, update status review).*
