// Mengimpor modul-modul yang dibutuhkan
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Membuat aplikasi Express
const app = express();

// Membuat konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Membuat middleware multer
const upload = multer({ storage: storage });

// Menggunakan middleware body parser untuk JSON
app.use(bodyParser.json());

// Menggunakan middleware cors untuk semua domain
app.use(cors());

// Membuat array untuk menyimpan data sementara
let data = [
  { id: 1, name: 'JavaScript', popularity: 9.8 },
  { id: 2, name: 'Python', popularity: 9.5 },
  { id: 3, name: 'Java', popularity: 8.7 },
  { id: 4, name: 'C#', popularity: 8.2 },
  { id: 5, name: 'PHP', popularity: 7.9 }
];

// Endpoint untuk mendapatkan semua data
app.get('/data', (req, res) => {
  res.json(data);
});

// Endpoint untuk mendapatkan data berdasarkan id
app.get('/data/:id', (req, res) => {
  // Mengambil id dari parameter
  let id = req.params.id;
  // Mencari data yang sesuai dengan id
  let item = data.find(d => d.id == id);
  // Mengirimkan respons sesuai dengan hasil pencarian
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' });
  }
});

// Endpoint untuk menambahkan data baru
app.post('/data', (req, res) => {
  // Mengambil data dari body request
  let newData = req.body;
  // Menambahkan data ke array
  data.push(newData);
  // Mengirimkan respons sukses
  res.json({ message: 'Data berhasil ditambahkan' });
});

// Endpoint untuk memperbarui data berdasarkan id
app.put('/data/:id', (req, res) => {
  // Mengambil id dari parameter
  let id = req.params.id;
  // Mengambil data dari body request
  let updatedData = req.body;
  // Mencari data yang sesuai dengan id
  let index = data.findIndex(d => d.id == id);
  // Memperbarui data sesuai dengan index
  if (index >= 0) {
    data[index] = updatedData;
    // Mengirimkan respons sukses
    res.json({ message: 'Data berhasil diperbarui' });
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' });
  }
});

// Endpoint untuk menghapus data berdasarkan id
app.delete('/data/:id', (req, res) => {
  // Mengambil id dari parameter
  let id = req.params.id;
  // Mencari data yang sesuai dengan id
  let index = data.findIndex(d => d.id == id);
  // Menghapus data sesuai dengan index
  if (index >= 0) {
    data.splice(index, 1);
    // Mengirimkan respons sukses
    res.json({ message: 'Data berhasil dihapus' });
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' });
  }
});

// Endpoint untuk menerima file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  // req.file adalah objek yang berisi informasi file yang diunggah
  console.log(req.file);
  res.send('File berhasil diunggah');
});

// Menggunakan middleware express.static untuk file static
app.use(express.static('public'));

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
