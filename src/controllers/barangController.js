const { db } = require("../services/db");

const barangSelectFields = [
  "id",
  "kode",
  "barcode",
  "nama",
  "kategori",
  "satuan",
  "harga_beli",
  "harga_jual",
  "tipe",
  "supplier_id",
  "is_taxable",
  "created_at",
  "updated_at"
];

const listBarang = async (req, res) => {
  const { q, kategori } = req.query || {};
  const query = db("barang").select(barangSelectFields).orderBy("created_at", "desc");

  if (kategori) {
    query.where({ kategori });
  }

  if (q) {
    query.andWhere((builder) => {
      builder
        .where("nama", "like", `%${q}%`)
        .orWhere("kode", "like", `%${q}%`)
        .orWhere("barcode", "like", `%${q}%`);
    });
  }

  const rows = await query;
  return res.json({ data: rows });
};

const getBarangById = async (req, res) => {
  const { id } = req.params || {};
  const row = await db("barang").select(barangSelectFields).where({ id }).first();

  if (!row) {
    return res.status(404).json({ message: "Barang not found" });
  }

  return res.json({ data: row });
};

const createBarang = async (req, res) => {
  const {
    id,
    kode,
    barcode,
    nama,
    kategori,
    satuan,
    harga_beli,
    harga_jual,
    tipe,
    supplier_id,
    is_taxable
  } = req.body || {};

  if (!id || !kode || !nama) {
    return res.status(400).json({ message: "id, kode, and nama are required" });
  }

  const exists = await db("barang").where({ id }).first();
  if (exists) {
    return res.status(409).json({ message: "Barang id already exists" });
  }

  const kodeExists = await db("barang").where({ kode }).first();
  if (kodeExists) {
    return res.status(409).json({ message: "Barang kode already exists" });
  }

  const payload = {
    id,
    kode,
    barcode: barcode || null,
    nama,
    kategori: kategori || null,
    satuan: satuan || "pcs",
    harga_beli: harga_beli || 0,
    harga_jual: harga_jual || 0,
    tipe: tipe || "regular",
    supplier_id: supplier_id || null,
    is_taxable: is_taxable ? 1 : 0
  };

  await db("barang").insert(payload);

  return res.status(201).json({ id: payload.id, kode: payload.kode, nama: payload.nama });
};

module.exports = { listBarang, getBarangById, createBarang };
