# Hero Component Specification

## 1. Tujuan Komponen
Hero Component berfungsi sebagai sampul (cover) pertama yang dilihat tamu saat membuka undangan digital. Tujuan utamanya adalah menyajikan kesan pertama yang memukau (premium, elegant, dan soft) sekaligus memberikan informasi dasar secara jelas (Siapa yang menikah, kapan, dan untuk siapa undangan ini ditujukan).

## 2. Non Goals
- Komponen ini tidak akan mengelola state global atau data fetching secara langsung (hanya menerima data via props).
- Tidak menyertakan musik latar (background music akan ditangani oleh komponen layout/wrapper khusus).
- Tidak menggunakan elemen video/animasi berat (WebGL/Three.js) yang dapat mengganggu performa dan waktu muat awal (*Initial Load*).

## 3. Wireframe (Text Representation)
```text
+--------------------------------------------------+
|                                                  |
|  [Decorative Top Glow & Soft Floral Hint]        |
|                                                  |
|                THE WEDDING OF                    |
|                                                  |
|              AURELIA & JULIAN                    |
|                                                  |
|                24 October 2026                   |
|                                                  |
|                                                  |
|              Dear [Guest Name],                  |
|          You are joyfully invited.               |
|                                                  |
|                                                  |
|             [CTA Button: Open]                   |
|                                                  |
|  [Decorative Bottom Glow & Soft Floral Hint]     |
|                                                  |
+--------------------------------------------------+
```

## 4. Layer Hierarchy
1. **Z-0: Background Layer**
   - Background utama dengan `var(--color-surface)`.
   - Animasi lambat (*pulse* atau *fade*) pada gradien bercahaya (*glow*).
2. **Z-10: Decorative Layer**
   - Aset floral yang diabstraksi dari tema (berbasis CSS mask atau SVG transparan) yang melayang (*floating*) atau diam di sudut.
3. **Z-20: Animation Wrapper (Client Component)**
   - Komponen klien `HeroAnimator` yang mengatur sekuens animasi masuk untuk konten di dalamnya.
4. **Z-30: Content Layer (Server Component)**
   - Teks "The Wedding Of".
   - Nama Pengantin (`Aurelia & Julian`).
   - Tanggal (`24 October 2026`).
   - Sapaan Tamu (`Dear [Guest Name]`).
   - CTA (`Open Invitation` button).

## 5. Props Interface
```typescript
// types/models.ts (Global Models)
export interface Person {
  firstName: string;
  lastName: string;
  fullName: string;
  parents?: string;
  instagram?: string;
}

export interface Guest {
  id?: string;
  name: string;
  category?: string; // VIP, Regular, Family
}

export interface EventDate {
  day: string;
  fullDate: string;
  timestamp: string; // ISO String
}

// components/Hero/types.ts
import { Person, Guest, EventDate } from '@/types/models';

export interface HeroProps {
  bride: Person;
  groom: Person;
  date: EventDate;
  guest?: Guest; 
  coverImage?: string; // Jika tema butuh background gambar
  quote?: string; 
  onOpen?: () => void; // Aksi saat CTA di-klik
}
```

## 6. Animation Timeline (HeroAnimator)
*Semua durasi menggunakan tokens dari `animations.css`.*

- **0ms**: Komponen di-mount.
- **300ms**: `Background & Glow Layer` perlahan memudar (*fade-in*, durasi 1000ms).
- **800ms**: `Decorative Layer` muncul (*soft scale & fade-in*).
- **Content Staggering**:
  - **1200ms**: Teks "The Wedding Of" (Slide up + Fade).
  - **1500ms**: Nama Pengantin (Slide up + Fade).
  - **1800ms**: Sapaan Tamu & Tanggal (Slide up + Fade).
  - **2200ms**: Tombol CTA "Open Invitation" muncul perlahan.

## 7. Responsive Behavior
- **Mobile (320px - 425px)**: Nama pengantin akan berukuran `var(--text-4xl)` (36px). Teks di-*center*. CTA berukuran penuh (*full-width* dengan padding).
- **Tablet (768px)**: Nama pengantin menggunakan `var(--text-5xl)` (48px). Latar belakang dan elemen dekoratif memiliki jarak (*padding*) yang lebih lapang.
- **Desktop (1024px - 1440px)**: Meskipun jarang dibuka di desktop, komponen akan membatasi lebar maksimal konten (maksimal 600px di tengah) agar tipografi tetap elegan dan tidak melar ke pinggir layar.

## 8. Accessibility Checklist
- [ ] Menggunakan `@media (prefers-reduced-motion: reduce)` pada semua CSS Modules untuk mematikan sekuens animasi panjang bagi pengguna yang rentan.
- [ ] Memastikan kontras warna antara teks (ex: `var(--color-text-primary)`) dan *soft glow background* memenuhi standar WCAG (minimal AA).
- [ ] Menyediakan `aria-label` pada tombol CTA "Open Invitation".
- [ ] Menggunakan tag semantik (misal: `<header>` atau `<section>`).

## 9. Acceptance Criteria
- [ ] Komponen utama `Hero.tsx` merupakan React Server Component.
- [ ] `HeroAnimator.tsx` berfungsi sebagai Client Component yang menangani logika *stagger*.
- [ ] Terdapat properti untuk personalisasi nama tamu dengan model `Guest`.
- [ ] Terdapat lapisan desain (*layers*) yang terpisah rapi dengan index-z.
- [ ] *Overlay* bukan *grain*, melainkan *soft gradient glow*.
- [ ] Tidak ada referensi eksplisit ke `invitation.json` di dalam komponen `Hero`. Data hanya dimasukkan via *props* menggunakan entitas model yang kuat.
