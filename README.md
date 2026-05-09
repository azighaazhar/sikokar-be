# Sikokar Backend

Backend API untuk Sikokar menggunakan Express + MySQL.

## Prasyarat
- Node.js 18+ (disarankan 20+)
- Docker Desktop (opsional, untuk DB via container)

## Menjalankan Lokal (tanpa Docker)
1. Salin `.env.example` menjadi `.env` lalu sesuaikan jika perlu (untuk lokal tanpa Docker, set `DB_HOST=localhost`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan server:
   ```bash
   npm run dev
   ```
4. Cek health endpoint:
   ```
   GET http://localhost:3000/health
   ```

## Menjalankan dengan Docker Compose
1. Salin `.env.example` menjadi `.env`.
2. Jalankan:
   ```bash
   docker compose up --build
   ```
3. API akan tersedia di `http://localhost:3000/health`.

## Database
- Dump SQL disimpan di `db/init.sql` dan akan di-load otomatis saat container DB pertama kali dibuat.
- Nama database: `db_sikokar`
- User/Pass default: `sikokar` / `sikokar`

## Auth
- Login: `POST /auth/login`
- Buat user (admin only): `POST /users`
   - Role yang diterima: `admin`, `pengurus`, `kasir`, `accounting`, `simpin`
- List user (admin only): `GET /users`
- Detail user (admin only): `GET /users/:id`

## Anggota
- List anggota (admin/pengurus): `GET /anggota`
   - Query opsional: `?q=search&status=1`
- Detail anggota (admin/pengurus): `GET /anggota/:id`
- Buat anggota (admin/pengurus): `POST /anggota`

## Barang
- List barang (admin/pengurus/kasir): `GET /barang`
   - Query opsional: `?q=search&kategori=xxx`
- Detail barang (admin/pengurus/kasir): `GET /barang/:id`
- Buat barang (admin/pengurus): `POST /barang`

## Supplier
- List supplier (admin/pengurus): `GET /supplier`
   - Query opsional: `?q=search&jenis=regular&aktif=1`
- Detail supplier (admin/pengurus): `GET /supplier/:id`
- Buat supplier (admin/pengurus): `POST /supplier`

## Stok
- List stok (admin/pengurus/kasir): `GET /stok`
   - Query opsional: `?barang_id=...&lokasi_id=...`
- Detail stok (admin/pengurus/kasir): `GET /stok/:id`
- Buat stok (admin/pengurus): `POST /stok`

## Lokasi
- List lokasi (admin/pengurus): `GET /lokasi`
   - Query opsional: `?q=search&aktif=1`
- Detail lokasi (admin/pengurus): `GET /lokasi/:id`
- Buat lokasi (admin/pengurus): `POST /lokasi`

## Penjualan
- List penjualan (admin/pengurus/kasir): `GET /penjualan`
   - Query opsional: `?jenis=cash&lokasi_id=...&kasir_id=...&anggota_id=...`
- Detail penjualan (admin/pengurus/kasir): `GET /penjualan/:id`
- Buat penjualan (admin/pengurus/kasir): `POST /penjualan`

## Pinjaman
- List pinjaman (admin/pengurus/simpin): `GET /pinjaman`
   - Query opsional: `?status=aktif&anggota_id=...&user_id=...`
- Detail pinjaman (admin/pengurus/simpin): `GET /pinjaman/:id`
- Buat pinjaman (admin/pengurus/simpin): `POST /pinjaman`

## Pinjaman Bayar
- List pinjaman bayar (admin/pengurus/simpin): `GET /pinjaman-bayar`
   - Query opsional: `?pinjaman_id=...`
- Detail pinjaman bayar (admin/pengurus/simpin): `GET /pinjaman-bayar/:id`
- Buat pinjaman bayar (admin/pengurus/simpin): `POST /pinjaman-bayar`

## Simpanan
- List simpanan (admin/pengurus/simpin): `GET /simpanan`
   - Query opsional: `?anggota_id=...&jenis=pokok`
- Detail simpanan (admin/pengurus/simpin): `GET /simpanan/:id`
- Buat simpanan (admin/pengurus/simpin): `POST /simpanan`

## Approval
- List approval (admin/pengurus/accounting): `GET /approval`
   - Query opsional: `?status=pending&modul=...&approver_id=...`
- Detail approval (admin/pengurus/accounting): `GET /approval/:id`
- Buat approval (admin/pengurus/accounting): `POST /approval`

## Jurnal
- List jurnal (admin/pengurus/accounting): `GET /jurnal`
   - Query opsional: `?modul=...&user_id=...&tgl=YYYY-MM-DD`
- Detail jurnal (admin/pengurus/accounting): `GET /jurnal/:id`
- Buat jurnal (admin/pengurus/accounting): `POST /jurnal`

## COA
- List COA (admin/pengurus/accounting): `GET /coa`
   - Query opsional: `?tipe=aset&aktif=1&parent_id=...`
- Detail COA (admin/pengurus/accounting): `GET /coa/:id`
- Buat COA (admin/pengurus/accounting): `POST /coa`

## Setting
- List setting (admin): `GET /setting`
   - Query opsional: `?q=search`
- Detail setting (admin): `GET /setting/:key`
- Upsert setting (admin): `PUT /setting/:key`

Env tambahan:
- `JWT_SECRET`
- `JWT_EXPIRES_IN` (contoh `1d`)

## Catatan
- Ganti kredensial `.env` untuk environment production.
