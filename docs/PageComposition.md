# Page Composition & Architecture Blueprint
*Wedding Invitation Template - Botanical Blue*

Dokumen ini adalah *Single Source of Truth* untuk komposisi halaman sebelum implementasi dimulai. Segala keputusan arsitektur, dependensi, reusability, dan prioritas dicatat di sini.

---

## 1. Opening Overlay

### Purpose
Sebagai gerbang pertama masuk ke undangan. Menampilkan sapaan personal untuk tamu dan memicu inisialisasi musik latar ketika tombol ditekan (kebijakan *autoplay* modern browser).

### UX Goal
Memberikan kesan misterius dan elegan sebelum "membuka" undangan sesungguhnya, sekaligus meminta izin interaksi untuk memutar musik.

### Layout
Full screen (*fixed* 100vh), *z-index* tertinggi. Berada menutupi seluruh halaman.

### Uses UI Foundation
- Button
- MotionFade

### Animation
- Masuk: Statis.
- Keluar: Transisi lambat *fade-out* atau *slide-up* ke atas yang mengekspos Hero.

### Dependencies
- UI Components: Button, MotionFade
- Context/State: Global Audio Player State

### Responsive Notes
Konten berpusat di tengah layar. Skala teks menyesuaikan tinggi layar.

### Accessibility
- Fokus harus dikembalikan ke elemen *body* setelah overlay menghilang.
- Tombol CTA wajib memiliki `aria-label`.

### Future Extensions
- Opsi gaya animasi pembuka yang dapat dikonfigurasi (mis. gaya amplop yang terbuka).

### Reusability Score
- **Complexity**: Low
- **Reusability**: 9
- **Business Priority**: 8
- **Development Effort**: S
- **Risk Level**: Low
- **Reasoning**: Logika state UI sederhana, wajib ada di seluruh tema.

---

## 2. Hero

*(Sudah diimplementasikan secara teknis. Bagian ini menjelaskan integrasinya dengan halaman utama).*

### Purpose
Sampul utama undangan yang memuat informasi terpenting: Nama Pengantin, Tanggal, dan Ajakan.

### UX Goal
Memberi impresi *premium* visual tema "Botanical Blue".

### Layout
Full screen (`100vh`), *relative positioning*. Dibungkus `HeroAnimator`.

### Uses UI Foundation
- Button
- MotionFade (internal via HeroAnimator)

### Animation
Staggered masuk berurutan: Latar Belakang -> Ornamen -> Subjudul -> Nama -> Tanggal -> CTA.

### Dependencies
- Theme: `colors.css`, `animations.css`
- Models: `Person`, `Guest`, `EventDate`

### Responsive Notes
*Mobile-first*, tulisan membesar di tablet/desktop. 

### Accessibility
Dukungan `prefers-reduced-motion` untuk *staggering* berat.

### Future Extensions
Dukungan *Hero Video Background* atau *Parallax Cover*.

### Reusability Score
- **Complexity**: Medium
- **Reusability**: 10
- **Business Priority**: 10
- **Development Effort**: M
- **Risk Level**: Low
- **Reasoning**: Inti visual dari undangan, sangat sering dimodifikasi/dikustomisasi.

---

## 3. Quote

### Purpose
Memberikan transisi spiritual/emosional yang lembut setelah Hero.

### UX Goal
Membangun *mood* elegan, tenang, dan reflektif.

### Layout
Berada di tengah (*centered-text*), padding lapang.

### Uses UI Foundation
- SectionContainer
- MotionFade
- Ornament (Opsional)

### Animation
Teks dan sumber *quote* *fade-in slide-up* perlahan saat masuk ke area *viewport*.

### Dependencies
- Models: `invitation.json` -> `quote`
- UI Components: SectionContainer, MotionFade

### Responsive Notes
Ukuran teks proporsional. Di layar lebar, rentang lebar paragraf dibatasi (maks. 600px).

### Accessibility
Tag `<blockquote>` dan `<cite>` untuk semantik yang benar.

### Future Extensions
Rotasi quote secara *random* setiap di-*refresh*.

### Reusability Score
- **Complexity**: Low
- **Reusability**: 10
- **Business Priority**: 6
- **Development Effort**: S
- **Risk Level**: Low
- **Reasoning**: Komponen teks statis yang sangat mudah digunakan di tema apapun.

---

## 4. Couple

### Purpose
Memperkenalkan mempelai wanita dan pria beserta nama orang tua.

### UX Goal
Memberikan pengenalan visual (foto) dan tekstual yang seimbang dan anggun.

### Layout
Dua kolom di *desktop*, bersusun di *mobile*. Di tengahnya terdapat elemen *Divider* atau inisial.

### Uses UI Foundation
- SectionContainer
- SectionHeader
- Ornament
- MotionFade

### Animation
Foto memudar masuk, diikuti dengan nama, lalu detail orang tua. Mempelai dipisahkan dengan *delay* animasi singkat.

### Dependencies
- Models: `Person`
- UI Components: SectionContainer, SectionHeader, MotionFade

### Responsive Notes
Beralih dari *flex-col* (mobile) ke *flex-row* (tablet ke atas).

### Accessibility
Menyediakan atribut `alt` yang deskriptif pada foto pengantin.

### Future Extensions
Dukungan untuk pasangan sesama jenis tanpa merusak struktur kolom "Bride & Groom" yang kaku (ubah jadi "Partner 1 & Partner 2").

### Reusability Score
- **Complexity**: Medium
- **Reusability**: 10
- **Business Priority**: 10
- **Development Effort**: M
- **Risk Level**: Low
- **Reasoning**: Komponen fundamental yang butuh penyusunan CSS Grid/Flexbox rapi.

---

## 5. Countdown

### Purpose
Menciptakan urgensi dan antusiasme terhadap tanggal pernikahan.

### UX Goal
Memudahkan tamu mengetahui sisa waktu dan menambahkannya ke kalender pribadi (CTA).

### Layout
Kotak *flex* sentral dengan 4 blok angka (Hari, Jam, Menit, Detik).

### Uses UI Foundation
- SectionContainer
- Card
- Button
- MotionFade

### Animation
Efek detik berdetak halus. Kotak angka *fade-in*.

### Dependencies
- Logika Waktu (Interval/Hook Timer di Client).
- Models: `EventDate`.

### Responsive Notes
Ukuran font angka mengecil di layar kecil agar tidak bertumpuk.

### Accessibility
`aria-live="polite"` untuk memberikan pembaruan waktu jika diperlukan (meski bisa mengganggu, sehingga butuh konfigurasi khusus untuk screen reader).

### Future Extensions
Otomatis berganti teks menjadi "Acara Sedang Berlangsung" saat waktu mencapai 0.

### Reusability Score
- **Complexity**: Medium
- **Reusability**: 9
- **Business Priority**: 7
- **Development Effort**: M
- **Risk Level**: Medium
- **Reasoning**: Hook timer berisiko menyebabkan re-render berat jika tidak diisolasi pada *Client Component* terpisah.

---

## 6. Event

### Purpose
Menginformasikan rangkaian acara secara detail (Akad/Holy Matrimony & Resepsi).

### UX Goal
Menyediakan informasi faktual (waktu, lokasi) yang sangat mudah dibaca dan dieksekusi (Buka Peta).

### Layout
Grid / List dari komponen *Card*. Setiap acara adalah satu *Card* besar.

### Uses UI Foundation
- SectionContainer
- SectionHeader
- Card
- Button
- Divider
- MotionFade

### Animation
Setiap kartu *event* masuk berurutan (*staggered*) saat di-*scroll*.

### Dependencies
- Data Event dari `invitation.json`.

### Responsive Notes
*Cards* bersusun ke bawah di *mobile*. Di *desktop* bisa berdampingan (Grid 1x2).

### Accessibility
Kontras warna yang kuat untuk lokasi acara dan jam, karena ini adalah data vital.

### Future Extensions
Integrasi Google Calendar dan Apple Calendar secara *native*.

### Reusability Score
- **Complexity**: Medium
- **Reusability**: 10
- **Business Priority**: 10
- **Development Effort**: M
- **Risk Level**: Low
- **Reasoning**: Informasi krusial. Pola *Card* sangat bisa di-*reuse*.

---

## 7. Love Story

### Purpose
Menceritakan perjalanan cinta melalui format *timeline*.

### UX Goal
Bercerita secara emosional dan membawa tamu ke dalam perjalanan pengantin.

### Layout
*Vertical Timeline* dengan garis lurus di sisi kiri atau tengah.

### Uses UI Foundation
- SectionContainer
- SectionHeader
- MotionFade

### Animation
Titik *timeline* muncul secara berurutan seiring dengan arah *scroll* ke bawah.

### Dependencies
- Struktur *Array* dari *Love Story* di `invitation.json`.

### Responsive Notes
Garis *timeline* ada di kiri pada *mobile*, bisa pindah ke tengah (*center*) pada *desktop*.

### Accessibility
Urutan membaca kronologis via struktur DOM.

### Future Extensions
*Carousel* cerita alih-alih *timeline* vertikal untuk menghemat ruang.

### Reusability Score
- **Complexity**: High
- **Reusability**: 7
- **Business Priority**: 5
- **Development Effort**: L
- **Risk Level**: Low
- **Reasoning**: Membutuhkan logika CSS dan animasi *scroll-tied* yang lebih spesifik. Sering disembunyikan oleh klien.

---

## 8. Gallery

### Purpose
Menampilkan foto-foto pre-wedding.

### UX Goal
Menjadi *moodboard* visual yang interaktif (Lightbox).

### Layout
*Masonry Grid* atau *CSS Grid* reguler dengan rasio foto campuran.

### Uses UI Foundation
- SectionContainer
- SectionHeader
- MotionFade

### Animation
Foto *fade-in* (*lazy load*). Saat ditekan, *lightbox* membesar secara mulus.

### Dependencies
- Library *Lightbox* (opsional, atau buat *native* React).
- Fitur *Image Optimization* (Next.js `<Image>`).

### Responsive Notes
Kolom grid berkurang di *mobile* (menjadi 1 atau 2 kolom) dan bertambah di *desktop* (3 atau 4 kolom).

### Accessibility
Semua gambar HARUS memiliki *alt text*. Keyboard *navigation* pada *Lightbox*.

### Future Extensions
Integrasi *Instagram Feed* pengantin secara langsung.

### Reusability Score
- **Complexity**: High
- **Reusability**: 9
- **Business Priority**: 8
- **Development Effort**: L
- **Risk Level**: Medium
- **Reasoning**: Butuh penanganan optimasi gambar ekstra agar *First Load* tidak lambat.

---

## 9. Wedding Gift

### Purpose
Fasilitas pemberian kado atau amplop digital (transfer bank / QRIS).

### UX Goal
Memudahkan tamu memberikan apresiasi secara diskret, aman, dan tanpa hambatan UX (contoh: *Copy to Clipboard* sekali klik).

### Layout
*Cards* kecil untuk setiap rekening bank atau *QR Code*.

### Uses UI Foundation
- SectionContainer
- SectionHeader
- Card
- Button
- MotionFade

### Animation
Kartu masuk dari bawah. Animasi *success checkmark* saat tombol "Salin" diklik.

### Dependencies
- Data Bank di `invitation.json`.
- API / Hook *Clipboard*.

### Responsive Notes
Ukuran QR code menyesuaikan lebar layar tapi dibatasi maksimal 250px.

### Accessibility
Notifikasi *screen reader* (mis. "Nomor rekening berhasil disalin").

### Future Extensions
Opsi konfirmasi amplop langsung ke WhatsApp otomatis.

### Reusability Score
- **Complexity**: Medium
- **Reusability**: 10
- **Business Priority**: 10
- **Development Effort**: M
- **Risk Level**: Medium
- **Reasoning**: Kritis. Kesalahan *Copy-Paste* atau UX *Bank* bisa fatal secara bisnis.

---

## 10. RSVP

### Purpose
Formulir konfirmasi kehadiran tamu.

### UX Goal
Minimalis, langkah yang jelas, *input* yang mudah diketik di *mobile*.

### Layout
*Form Container* dalam satu *Card* raksasa.

### Uses UI Foundation
- SectionContainer
- SectionHeader
- Card
- Button
- MotionFade

### Animation
Transisi form-*submit* yang menunjukkan indikator *loading* hingga "Terima Kasih".

### Dependencies
- Integrasi ke *Backend* atau layanan pihak ketiga (mis. *Supabase*, *Firebase*, *Google Sheets*).

### Responsive Notes
*Input fields* memiliki ukuran *touch target* yang nyaman (min. 44px tinggi).

### Accessibility
*Label* yang terhubung dengan baik ke *input*. Indikator *error* berbasis teks, bukan hanya warna merah.

### Future Extensions
Validasi langsung (*real-time*) kode undangan tamu (VIP *Guest list*).

### Reusability Score
- **Complexity**: High
- **Reusability**: 10
- **Business Priority**: 10
- **Development Effort**: L
- **Risk Level**: High
- **Reasoning**: Butuh koneksi jaringan dan *state management* yang rumit (*Loading*, *Success*, *Error*).

---

## 11. Wedding Wishes

### Purpose
Buku tamu digital agar bisa saling memberi ucapan.

### UX Goal
Menciptakan kesan interaktif dan ramah antar tamu.

### Layout
Daftar bergulir vertikal di dalam kotak (*scrollable box*) dengan tinggi maksimum.

### Uses UI Foundation
- SectionContainer
- Card (sebagai wadah pesan individual)
- MotionFade

### Animation
Pesan baru muncul di urutan teratas secara *real-time* atau transisi daftar bergulir.

### Dependencies
- Komponen Form
- Integrasi Database Realtime (*Backend*).

### Responsive Notes
Ketinggian *scrollable list* di *mobile* harus dikunci agar tidak membajak (*hijack*) seluruh guliran halaman.

### Accessibility
`aria-live` pada area buku tamu jika pesan baru masuk.

### Future Extensions
Fitur balasan atau "*Like*" ucapan oleh pengantin.

### Reusability Score
- **Complexity**: High
- **Reusability**: 10
- **Business Priority**: 9
- **Development Effort**: L
- **Risk Level**: Medium
- **Reasoning**: Seperti RSVP, fitur ini membutuhkan *backend*. Harus dirancang dengan "Mock Mode" untuk saat ini.

---

## 12. Footer

### Purpose
Ucapan terima kasih dan kredit pembuat undangan.

### UX Goal
Memberi titik henti (*endpoint*) yang lembut di dasar halaman.

### Layout
Elemen tengah (logo/inisial), Teks penutup.

### Uses UI Foundation
- SectionContainer (dengan *padding* kecil)
- Ornament (minimal)

### Animation
Sederhana, *fade-in*.

### Dependencies
- Tidak ada yang berat.

### Responsive Notes
*Font size* relatif kecil.

### Accessibility
Kontras teks dengan *background* paling bawah.

### Future Extensions
Tombol "*Back to Top*" mengambang jika di-_scroll_ ke bawah.

### Reusability Score
- **Complexity**: Low
- **Reusability**: 10
- **Business Priority**: 5
- **Development Effort**: S
- **Risk Level**: Low
- **Reasoning**: Komponen pelengkap yang standar di semua desain.

---

# Dependency Matrix

| Section | Uses Card | Uses Button | Uses MotionFade | Uses Ornament | Uses SectionHeader |
|---|---|---|---|---|---|
| Opening | No | Yes | Yes | No | No |
| Hero | No | Yes | Yes | Yes | No |
| Quote | No | No | Yes | Yes | No |
| Couple | No | No | Yes | Yes | Yes |
| Countdown | Yes | Yes | Yes | No | Yes |
| Event | Yes | Yes | Yes | Yes | Yes |
| Love Story | No | No | Yes | No | Yes |
| Gallery | No | No | Yes | No | Yes |
| Gift | Yes | Yes | Yes | No | Yes |
| RSVP | Yes | Yes | Yes | No | Yes |
| Wishes | Yes | Yes | Yes | No | Yes |
| Footer | No | No | Yes | Yes | No |

*Matriks ini menunjukkan bahwa **MotionFade** adalah utilitas terpenting, disusul oleh **SectionHeader** dan **Card**.*

---

# Visual Rhythm Matrix

| Section | Density | Background | Divider / Separation | Estimated Height |
|---|---|---|---|---|
| Opening | Low | Surface | None | 100vh |
| Hero | Low | Surface / Image | None | 100vh |
| Quote | Low | Background | Top / Bottom Gap | 40vh |
| Couple | Medium | Surface | Divider Ornaments | 80vh |
| Countdown | Low | Background | None | 50vh |
| Event | High | Surface | Divider Between Cards| 100vh |
| Love Story | Medium | Background | Vertical Line | 120vh |
| Gallery | High | Surface | Margin Grid | 150vh |
| Gift | Medium | Background | None | 60vh |
| RSVP | High | Surface | Shadowed Form | 80vh |
| Wishes | High | Background | Box Border | 80vh |
| Footer | Low | Surface | Small Divider | 30vh |

*Matriks ini membuktikan adanya pola keseimbangan:*
- **Background vs Surface** dirancang saling bergantian (selang-seling) untuk menjaga mata agar tidak lelah (*Visual Fatigue*).
- **Density** (kepadatan info) diatur agar bernapas: *Low -> Medium -> Low -> High*.

---

# Final Architectural Review

**1. Are there duplicated patterns?**
Ya, *Event*, *Gift*, *RSVP*, dan *Wishes* semuanya menggunakan bentuk pengelompokan yang identik: `SectionContainer` -> `SectionHeader` -> Konten di dalam `Card`.

**2. Should any repeated layout become another UI component?**
Berdasarkan temuan di atas, pola (*SectionContainer + SectionHeader + Content in Card*) sangat repetitif. Ke depannya, kita dapat menggabungkannya ke dalam komponen tingkat lanjut seperti `CardSectionLayout` jika diperlukan. Namun, untuk menjaga fleksibilitas form dan galeri, memisahkan *Container*, *Header*, dan *Card* saat ini adalah langkah yang lebih bijak.

**3. Which sections share the same architecture?**
- *Event*, *Gift*, dan *RSVP* (Arsitektur *Card Grid* dan Tombol Interaksi).
- *Gallery* dan *Love Story* (Arsitektur Penampil Visual Statis).

**4. Can any section become configurable?**
Hampir semuanya bergantung pada `invitation.json`. Khususnya:
- *Gallery* (Jumlah kolom dan gambar diatur dari json).
- *Love Story* (Dapat diaktifkan/dinonaktifkan jika array kosong di json).
- *Gift* (Bisa menambah opsi bank dari json).

**5. What components are still missing from UI Foundation?**
- Komponen form dasar (`Input.tsx`, `TextArea.tsx`, `Label.tsx`) untuk keperluan RSVP.
- Modal / Lightbox (untuk galeri).
- Toast / Snackbar Notification (untuk notifikasi "*Teks berhasil disalin*").
Kebutuhan-kebutuhan ini akan diimplementasikan saat mengerjakan masing-masing *section* tersebut, namun akan diabstraksi dan diletakkan ke `components/ui/` agar dapat di-*reuse*.
