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

## Catatan
- Ganti kredensial `.env` untuk environment production.
