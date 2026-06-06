-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2026 at 04:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbuas029`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buat_nomor_pesanan` (OUT `nomor` VARCHAR(30))   BEGIN
  DECLARE urutan INT;
  SELECT COUNT(*) + 1 INTO urutan
  FROM pesanan
  WHERE DATE(dibuat_pada) = CURDATE();
  
  SET nomor = CONCAT('BKR-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(urutan, 4, '0'));
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `departemen` varchar(100) DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `id_user`, `jabatan`, `departemen`, `catatan`, `dibuat_pada`) VALUES
(1, 1, 'Superadmin', 'Sistem', NULL, '2026-06-05 21:02:29'),
(2, 2, 'Manager Toko', 'Operasional', NULL, '2026-06-05 21:02:29'),
(3, 3, 'Kasir', 'Penjualan', NULL, '2026-06-05 21:02:29');

-- --------------------------------------------------------

--
-- Table structure for table `admin_log`
--

CREATE TABLE `admin_log` (
  `id_log` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `aksi` varchar(100) NOT NULL,
  `modul` varchar(50) NOT NULL,
  `id_target` int(11) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_permission`
--

CREATE TABLE `admin_permission` (
  `id_permission` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `modul` varchar(50) NOT NULL,
  `dapat_lihat` tinyint(1) DEFAULT 0,
  `dapat_tambah` tinyint(1) DEFAULT 0,
  `dapat_ubah` tinyint(1) DEFAULT 0,
  `dapat_hapus` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_permission`
--

INSERT INTO `admin_permission` (`id_permission`, `id_admin`, `modul`, `dapat_lihat`, `dapat_tambah`, `dapat_ubah`, `dapat_hapus`) VALUES
(1, 2, 'produk', 1, 1, 1, 1),
(2, 2, 'pesanan', 1, 1, 1, 0),
(3, 2, 'pelanggan', 1, 0, 1, 0),
(4, 2, 'kupon', 1, 1, 1, 1),
(5, 2, 'laporan', 1, 0, 0, 0),
(6, 2, 'pengaturan', 1, 1, 1, 0),
(7, 3, 'produk', 1, 0, 0, 0),
(8, 3, 'pesanan', 1, 1, 1, 0),
(9, 3, 'laporan', 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `alamat_pelanggan`
--

CREATE TABLE `alamat_pelanggan` (
  `id_alamat` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `label` varchar(50) DEFAULT 'Rumah',
  `nama_penerima` varchar(150) NOT NULL,
  `no_telepon` varchar(20) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `kota_kabupaten` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kode_pos` varchar(10) DEFAULT NULL,
  `alamat_detail` text NOT NULL,
  `adalah_utama` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artikel`
--

CREATE TABLE `artikel` (
  `id_artikel` int(11) NOT NULL,
  `judul` varchar(200) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `isi` longtext NOT NULL,
  `gambar_url` varchar(255) DEFAULT NULL,
  `penulis` varchar(100) DEFAULT NULL,
  `status` enum('draft','publish') DEFAULT 'draft',
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar_url` varchar(255) DEFAULT NULL,
  `urutan` int(11) DEFAULT 0,
  `aktif` tinyint(1) DEFAULT 1,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `slug`, `deskripsi`, `gambar_url`, `urutan`, `aktif`, `dibuat_pada`) VALUES
(1, 'Roti Tawar', 'roti-tawar', 'Roti tawar lembut berbagai ukuran', NULL, 1, 1, '2026-06-05 19:02:16'),
(2, 'Kue Kering', 'kue-kering', 'Kue kering untuk segala kesempatan', NULL, 2, 1, '2026-06-05 19:02:16'),
(3, 'Kue Basah', 'kue-basah', 'Kue basah & jajanan pasar tradisional', NULL, 3, 1, '2026-06-05 19:02:16'),
(4, 'Croissant', 'croissant', 'Croissant & pastri berlapis mentega', NULL, 4, 1, '2026-06-05 19:02:16'),
(5, 'Birthday Cake', 'birthday-cake', 'Kue ulang tahun custom berbagai tema', NULL, 5, 1, '2026-06-05 19:02:16'),
(6, 'Wedding Cake', 'wedding-cake', 'Kue pernikahan elegan multi-tier', NULL, 6, 1, '2026-06-05 19:02:16'),
(7, 'Minuman', 'minuman', 'Kopi, teh, dan minuman pelengkap', NULL, 7, 1, '2026-06-05 19:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id_keranjang` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL DEFAULT 1,
  `catatan` text DEFAULT NULL,
  `ditambah_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kupon`
--

CREATE TABLE `kupon` (
  `id_kupon` int(11) NOT NULL,
  `kode_kupon` varchar(30) NOT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `tipe_diskon` enum('persen','nominal') NOT NULL,
  `nilai_diskon` decimal(12,2) NOT NULL,
  `min_belanja` decimal(12,2) DEFAULT 0.00,
  `maks_diskon` decimal(12,2) DEFAULT NULL,
  `kuota` int(11) DEFAULT NULL,
  `terpakai` int(11) DEFAULT 0,
  `berlaku_mulai` date DEFAULT NULL,
  `berlaku_sampai` date DEFAULT NULL,
  `aktif` tinyint(1) DEFAULT 1,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kupon`
--

INSERT INTO `kupon` (`id_kupon`, `kode_kupon`, `deskripsi`, `tipe_diskon`, `nilai_diskon`, `min_belanja`, `maks_diskon`, `kuota`, `terpakai`, `berlaku_mulai`, `berlaku_sampai`, `aktif`, `dibuat_pada`) VALUES
(1, 'NEWMEMBER', 'Diskon 15% untuk member baru', 'persen', 15.00, 50000.00, NULL, 500, 0, NULL, NULL, 1, '2026-06-05 19:02:16'),
(2, 'ULTAH10', 'Diskon Rp10.000 untuk kue ulang tahun', 'nominal', 10000.00, 200000.00, NULL, 100, 0, NULL, NULL, 1, '2026-06-05 19:02:16'),
(3, 'GRATIS_ONG', 'Gratis ongkir min belanja 150rb', 'nominal', 15000.00, 150000.00, NULL, NULL, 0, NULL, NULL, 1, '2026-06-05 19:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama_lengkap` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `no_telepon` varchar(20) DEFAULT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('L','P','Lainnya') DEFAULT NULL,
  `poin_reward` int(11) DEFAULT 0,
  `email_verified` tinyint(1) DEFAULT 0,
  `aktif` tinyint(1) DEFAULT 1,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `metode` enum('transfer_bank','kartu_kredit','gopay','ovo','dana','qris','cod') NOT NULL,
  `jumlah` decimal(14,2) NOT NULL,
  `status` enum('menunggu','sukses','gagal','refund') DEFAULT 'menunggu',
  `kode_transaksi` varchar(100) DEFAULT NULL,
  `bukti_transfer` varchar(255) DEFAULT NULL,
  `dibayar_pada` datetime DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengaturan`
--

CREATE TABLE `pengaturan` (
  `kunci` varchar(100) NOT NULL,
  `nilai` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengaturan`
--

INSERT INTO `pengaturan` (`kunci`, `nilai`) VALUES
('alamat_toko', 'Jl. Roti Manis No. 1, Cirebon'),
('email_toko', 'hello@bakerykita.id'),
('jam_buka', '07:00 - 21:00 WIB'),
('meta_description', 'Toko roti dan kue segar terbaik di Cirebon'),
('min_order_delivery', '50000'),
('nama_toko', 'Bakery Kita'),
('ongkir_per_km', '3000'),
('radius_delivery_km', '10'),
('tagline', 'Freshly Baked with Love'),
('telepon_toko', '0812-3456-7890');

-- --------------------------------------------------------

--
-- Table structure for table `pengiriman`
--

CREATE TABLE `pengiriman` (
  `id_pengiriman` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `kurir` varchar(50) DEFAULT NULL,
  `no_resi` varchar(100) DEFAULT NULL,
  `status` enum('menunggu','dijemput','dalam_perjalanan','tiba','gagal') DEFAULT 'menunggu',
  `dikirim_pada` datetime DEFAULT NULL,
  `diterima_pada` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `nomor_pesanan` varchar(30) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `id_kupon` int(11) DEFAULT NULL,
  `subtotal` decimal(14,2) NOT NULL,
  `diskon_kupon` decimal(14,2) DEFAULT 0.00,
  `biaya_kirim` decimal(14,2) DEFAULT 0.00,
  `total_bayar` decimal(14,2) NOT NULL,
  `metode_kirim` enum('delivery','pickup') DEFAULT 'delivery',
  `nama_penerima` varchar(150) DEFAULT NULL,
  `no_telepon_kirim` varchar(20) DEFAULT NULL,
  `alamat_kirim` text DEFAULT NULL,
  `estimasi_kirim` date DEFAULT NULL,
  `tanggal_pickup` datetime DEFAULT NULL,
  `status` enum('menunggu_pembayaran','dibayar','diproses','siap_kirim','dikirim','selesai','dibatalkan') DEFAULT 'menunggu_pembayaran',
  `catatan` text DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pesanan_item`
--

CREATE TABLE `pesanan_item` (
  `id_item` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `nama_produk` varchar(150) NOT NULL,
  `harga_satuan` decimal(12,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `subtotal` decimal(14,2) NOT NULL,
  `catatan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `nama_produk` varchar(150) NOT NULL,
  `slug` varchar(170) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `harga` decimal(12,2) NOT NULL,
  `harga_coret` decimal(12,2) DEFAULT NULL,
  `stok` int(11) DEFAULT 0,
  `satuan` varchar(30) DEFAULT 'pcs',
  `berat_gram` int(11) DEFAULT NULL,
  `gambar_utama` varchar(255) DEFAULT NULL,
  `unggulan` tinyint(1) DEFAULT 0,
  `aktif` tinyint(1) DEFAULT 1,
  `total_terjual` int(11) DEFAULT 0,
  `rating` decimal(3,2) DEFAULT 0.00,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_produk`, `id_kategori`, `nama_produk`, `slug`, `deskripsi`, `harga`, `harga_coret`, `stok`, `satuan`, `berat_gram`, `gambar_utama`, `unggulan`, `aktif`, `total_terjual`, `rating`, `dibuat_pada`, `diperbarui_pada`) VALUES
(1, 1, 'Roti Tawar Putih Large', 'roti-tawar-putih-large', 'Roti tawar lembut ukuran besar, cocok untuk sarapan', 18000.00, NULL, 50, 'pcs', NULL, NULL, 1, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(2, 1, 'Roti Gandum Whole Wheat', 'roti-gandum-whole-wheat', 'Roti gandum utuh, tinggi serat & menyehatkan', 22000.00, NULL, 30, 'pcs', NULL, NULL, 1, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(3, 2, 'Nastar Keju', 'nastar-keju', 'Nastar lembut isi selai nanas topping keju', 85000.00, NULL, 20, 'toples', NULL, NULL, 1, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(4, 2, 'Kastengel Butter', 'kastengel-butter', 'Kastengel renyah dengan cita rasa mentega premium', 90000.00, NULL, 15, 'toples', NULL, NULL, 0, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(5, 3, 'Bolu Kukus Pandan', 'bolu-kukus-pandan', 'Bolu kukus pandan harum, tekstur lembut mengembang', 5000.00, NULL, 100, 'pcs', NULL, NULL, 0, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(6, 4, 'Croissant Original', 'croissant-original', 'Croissant berlapis mentega Prancis, crispy di luar', 18000.00, NULL, 40, 'pcs', NULL, NULL, 1, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(7, 5, 'Birthday Cake Coklat', 'birthday-cake-coklat', 'Kue ulang tahun coklat ganache, bisa custom tulisan', 280000.00, NULL, 5, 'loyang', NULL, NULL, 1, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(8, 6, 'Wedding Cake 3 Tier', 'wedding-cake-3-tier', 'Kue pengantin 3 tingkat fondant dekorasi bunga', 1500000.00, NULL, 2, 'set', NULL, NULL, 1, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16'),
(9, 7, 'Kopi Susu Aren', 'kopi-susu-aren', 'Kopi susu dengan gula aren asli, dingin segar', 18000.00, NULL, 99, 'cup', NULL, NULL, 0, 1, 0, 0.00, '2026-06-05 19:02:16', '2026-06-05 19:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `produk_bahan`
--

CREATE TABLE `produk_bahan` (
  `id_bahan` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `nama_bahan` varchar(100) NOT NULL,
  `adalah_alergen` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk_gambar`
--

CREATE TABLE `produk_gambar` (
  `id_gambar` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `url_gambar` varchar(255) NOT NULL,
  `urutan` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ulasan`
--

CREATE TABLE `ulasan` (
  `id_ulasan` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL CHECK (`rating` between 1 and 5),
  `judul` varchar(150) DEFAULT NULL,
  `isi_ulasan` text DEFAULT NULL,
  `gambar_url` varchar(255) DEFAULT NULL,
  `disetujui` tinyint(1) DEFAULT 0,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_lengkap` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `no_telepon` varchar(20) DEFAULT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `role` enum('pelanggan','admin','superadmin') DEFAULT 'pelanggan',
  `foto_profil` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT 0,
  `aktif` tinyint(1) DEFAULT 1,
  `terakhir_login` datetime DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  `diperbarui_pada` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_lengkap`, `email`, `no_telepon`, `kata_sandi`, `role`, `foto_profil`, `email_verified`, `aktif`, `terakhir_login`, `dibuat_pada`, `diperbarui_pada`) VALUES
(1, 'Super Admin', 'superadmin@bakerykita.id', NULL, '$2b$12$GANTI_HASH_INI', 'superadmin', NULL, 1, 1, NULL, '2026-06-05 21:02:29', '2026-06-05 21:02:29'),
(2, 'Admin Toko', 'admin@bakerykita.id', NULL, '$2b$12$GANTI_HASH_INI', 'admin', NULL, 1, 1, NULL, '2026-06-05 21:02:29', '2026-06-05 21:02:29'),
(3, 'Kasir Satu', 'kasir1@bakerykita.id', NULL, '$2b$12$GANTI_HASH_INI', 'admin', NULL, 1, 1, NULL, '2026-06-05 21:02:29', '2026-06-05 21:02:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_token`
--

CREATE TABLE `user_token` (
  `id_token` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `tipe` enum('reset_password','verifikasi_email','remember_me') NOT NULL,
  `kadaluarsa` datetime NOT NULL,
  `sudah_dipakai` tinyint(1) DEFAULT 0,
  `dibuat_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_pesanan_hari_ini`
-- (See below for the actual view)
--
CREATE TABLE `v_pesanan_hari_ini` (
`nomor_pesanan` varchar(30)
,`nama_lengkap` varchar(150)
,`no_telepon` varchar(20)
,`total_bayar` decimal(14,2)
,`metode_kirim` enum('delivery','pickup')
,`status` enum('menunggu_pembayaran','dibayar','diproses','siap_kirim','dikirim','selesai','dibatalkan')
,`dibuat_pada` datetime
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_produk_terlaris`
-- (See below for the actual view)
--
CREATE TABLE `v_produk_terlaris` (
`id_produk` int(11)
,`nama_produk` varchar(150)
,`nama_kategori` varchar(100)
,`harga` decimal(12,2)
,`total_terjual` int(11)
,`rating` decimal(3,2)
,`stok` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_ringkasan_pelanggan`
-- (See below for the actual view)
--
CREATE TABLE `v_ringkasan_pelanggan` (
`id_pelanggan` int(11)
,`nama_lengkap` varchar(150)
,`email` varchar(150)
,`total_pesanan` bigint(21)
,`total_belanja` decimal(36,2)
,`poin_reward` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id_wishlist` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `ditambah_pada` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure for view `v_pesanan_hari_ini`
--
DROP TABLE IF EXISTS `v_pesanan_hari_ini`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_pesanan_hari_ini`  AS SELECT `ps`.`nomor_pesanan` AS `nomor_pesanan`, `pl`.`nama_lengkap` AS `nama_lengkap`, `pl`.`no_telepon` AS `no_telepon`, `ps`.`total_bayar` AS `total_bayar`, `ps`.`metode_kirim` AS `metode_kirim`, `ps`.`status` AS `status`, `ps`.`dibuat_pada` AS `dibuat_pada` FROM (`pesanan` `ps` join `pelanggan` `pl` on(`ps`.`id_pelanggan` = `pl`.`id_pelanggan`)) WHERE cast(`ps`.`dibuat_pada` as date) = curdate() ORDER BY `ps`.`dibuat_pada` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `v_produk_terlaris`
--
DROP TABLE IF EXISTS `v_produk_terlaris`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_produk_terlaris`  AS SELECT `pr`.`id_produk` AS `id_produk`, `pr`.`nama_produk` AS `nama_produk`, `k`.`nama_kategori` AS `nama_kategori`, `pr`.`harga` AS `harga`, `pr`.`total_terjual` AS `total_terjual`, `pr`.`rating` AS `rating`, `pr`.`stok` AS `stok` FROM (`produk` `pr` join `kategori` `k` on(`pr`.`id_kategori` = `k`.`id_kategori`)) WHERE `pr`.`aktif` = 1 ORDER BY `pr`.`total_terjual` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `v_ringkasan_pelanggan`
--
DROP TABLE IF EXISTS `v_ringkasan_pelanggan`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_ringkasan_pelanggan`  AS SELECT `p`.`id_pelanggan` AS `id_pelanggan`, `p`.`nama_lengkap` AS `nama_lengkap`, `p`.`email` AS `email`, count(`o`.`id_pesanan`) AS `total_pesanan`, sum(`o`.`total_bayar`) AS `total_belanja`, `p`.`poin_reward` AS `poin_reward` FROM (`pelanggan` `p` left join `pesanan` `o` on(`p`.`id_pelanggan` = `o`.`id_pelanggan` and `o`.`status` = 'selesai')) GROUP BY `p`.`id_pelanggan` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- Indexes for table `admin_log`
--
ALTER TABLE `admin_log`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `idx_admin_log_admin` (`id_admin`);

--
-- Indexes for table `admin_permission`
--
ALTER TABLE `admin_permission`
  ADD PRIMARY KEY (`id_permission`),
  ADD UNIQUE KEY `uq_admin_modul` (`id_admin`,`modul`);

--
-- Indexes for table `alamat_pelanggan`
--
ALTER TABLE `alamat_pelanggan`
  ADD PRIMARY KEY (`id_alamat`),
  ADD KEY `id_pelanggan` (`id_pelanggan`);

--
-- Indexes for table `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id_artikel`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id_keranjang`),
  ADD UNIQUE KEY `uq_keranjang` (`id_pelanggan`,`id_produk`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indexes for table `kupon`
--
ALTER TABLE `kupon`
  ADD PRIMARY KEY (`id_kupon`),
  ADD UNIQUE KEY `kode_kupon` (`kode_kupon`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD UNIQUE KEY `id_pesanan` (`id_pesanan`);

--
-- Indexes for table `pengaturan`
--
ALTER TABLE `pengaturan`
  ADD PRIMARY KEY (`kunci`);

--
-- Indexes for table `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD PRIMARY KEY (`id_pengiriman`),
  ADD KEY `id_pesanan` (`id_pesanan`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD UNIQUE KEY `nomor_pesanan` (`nomor_pesanan`),
  ADD KEY `id_kupon` (`id_kupon`),
  ADD KEY `idx_pesanan_pelanggan` (`id_pelanggan`),
  ADD KEY `idx_pesanan_status` (`status`),
  ADD KEY `idx_pesanan_tanggal` (`dibuat_pada`);

--
-- Indexes for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_produk_kategori` (`id_kategori`),
  ADD KEY `idx_produk_unggulan` (`unggulan`,`aktif`);

--
-- Indexes for table `produk_bahan`
--
ALTER TABLE `produk_bahan`
  ADD PRIMARY KEY (`id_bahan`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indexes for table `produk_gambar`
--
ALTER TABLE `produk_gambar`
  ADD PRIMARY KEY (`id_gambar`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indexes for table `ulasan`
--
ALTER TABLE `ulasan`
  ADD PRIMARY KEY (`id_ulasan`),
  ADD UNIQUE KEY `uq_ulasan` (`id_produk`,`id_pelanggan`,`id_pesanan`),
  ADD KEY `id_pelanggan` (`id_pelanggan`),
  ADD KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `idx_ulasan_produk` (`id_produk`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_user_email` (`email`),
  ADD KEY `idx_user_role` (`role`);

--
-- Indexes for table `user_token`
--
ALTER TABLE `user_token`
  ADD PRIMARY KEY (`id_token`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `idx_token_user` (`id_user`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id_wishlist`),
  ADD UNIQUE KEY `uq_wishlist` (`id_pelanggan`,`id_produk`),
  ADD KEY `id_produk` (`id_produk`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin_log`
--
ALTER TABLE `admin_log`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_permission`
--
ALTER TABLE `admin_permission`
  MODIFY `id_permission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `alamat_pelanggan`
--
ALTER TABLE `alamat_pelanggan`
  MODIFY `id_alamat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id_artikel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id_keranjang` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kupon`
--
ALTER TABLE `kupon`
  MODIFY `id_kupon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengiriman`
--
ALTER TABLE `pengiriman`
  MODIFY `id_pengiriman` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `produk_bahan`
--
ALTER TABLE `produk_bahan`
  MODIFY `id_bahan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk_gambar`
--
ALTER TABLE `produk_gambar`
  MODIFY `id_gambar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ulasan`
--
ALTER TABLE `ulasan`
  MODIFY `id_ulasan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_token`
--
ALTER TABLE `user_token`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id_wishlist` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `admin_log`
--
ALTER TABLE `admin_log`
  ADD CONSTRAINT `admin_log_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Constraints for table `admin_permission`
--
ALTER TABLE `admin_permission`
  ADD CONSTRAINT `admin_permission_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE;

--
-- Constraints for table `alamat_pelanggan`
--
ALTER TABLE `alamat_pelanggan`
  ADD CONSTRAINT `alamat_pelanggan_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE;

--
-- Constraints for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `keranjang_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE,
  ADD CONSTRAINT `keranjang_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`);

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`);

--
-- Constraints for table `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD CONSTRAINT `pengiriman_ibfk_1` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`);

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`),
  ADD CONSTRAINT `pesanan_ibfk_2` FOREIGN KEY (`id_kupon`) REFERENCES `kupon` (`id_kupon`);

--
-- Constraints for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  ADD CONSTRAINT `pesanan_item_ibfk_1` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE,
  ADD CONSTRAINT `pesanan_item_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`);

--
-- Constraints for table `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`);

--
-- Constraints for table `produk_bahan`
--
ALTER TABLE `produk_bahan`
  ADD CONSTRAINT `produk_bahan_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE CASCADE;

--
-- Constraints for table `produk_gambar`
--
ALTER TABLE `produk_gambar`
  ADD CONSTRAINT `produk_gambar_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE CASCADE;

--
-- Constraints for table `ulasan`
--
ALTER TABLE `ulasan`
  ADD CONSTRAINT `ulasan_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`),
  ADD CONSTRAINT `ulasan_ibfk_2` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`),
  ADD CONSTRAINT `ulasan_ibfk_3` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`);

--
-- Constraints for table `user_token`
--
ALTER TABLE `user_token`
  ADD CONSTRAINT `user_token_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
