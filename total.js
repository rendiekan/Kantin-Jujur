// script.js

// Fungsi untuk menghitung total pembelian
function hitungTotal() {
    // Ambil semua input makanan
    let makananRows = document.querySelectorAll('#warung2 table tbody tr');
    let totalMakanan = 0;

    makananRows.forEach(function(row) {
        let harga = parseFloat(row.cells[1].textContent); // Ambil harga dari kolom kedua
        let jumlah = parseInt(row.cells[2].querySelector('input').value); // Ambil jumlah dari input

        if (!isNaN(jumlah)) {
            totalMakanan += harga * jumlah;
        }
    });

    // Ambil semua input minuman
    let minumanRows = document.querySelectorAll('#minuman2 table tbody tr');
    let totalMinuman = 0;

    minumanRows.forEach(function(row) {
        let harga = parseFloat(row.cells[1].textContent); // Ambil harga dari kolom kedua
        let jumlah = parseInt(row.cells[2].querySelector('input').value); // Ambil jumlah dari input

        if (!isNaN(jumlah)) {
            totalMinuman += harga * jumlah;
        }
    });

    // Total
    let totalBelanja = totalMakanan + totalMinuman;

    // Simpan di localStorage
    let purchase = {
        nama: '', // Tambahkan nama pemesan jika ada
        makanan: [], // Simpan data makanan yang dipilih
        minuman: [], // Simpan data minuman yang dipilih
        total: totalBelanja, // Simpan total pembelian
        notes: { // Simpan catatan untuk makanan dan minuman
            makanan: document.querySelector('#warung2 textarea').value,
            minuman: document.querySelector('#minuman2 textarea').value
        }
    };

    // Simpan makanan
    makananRows.forEach(function(row) {
        let namaMakanan = row.cells[0].textContent;
        let jumlah = parseInt(row.cells[2].querySelector('input').value);

        if (!isNaN(jumlah) && jumlah > 0) {
            purchase.makanan.push({
                nama: namaMakanan,
                jumlah: jumlah
            });
        }
    });

    // Simpan minuman
    minumanRows.forEach(function(row) {
        let namaMinuman = row.cells[0].textContent;
        let jumlah = parseInt(row.cells[2].querySelector('input').value);

        if (!isNaN(jumlah) && jumlah > 0) {
            purchase.minuman.push({
                nama: namaMinuman,
                jumlah: jumlah
            });
        }
    });

    // Simpan data ke localStorage
    let purchaseHistory = localStorage.getItem('purchaseHistory');
    if (!purchaseHistory) {
        purchaseHistory = [];
    } else {
        purchaseHistory = JSON.parse(purchaseHistory);
    }
    purchaseHistory.push(purchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    // Reset input setelah disimpan
    let inputFields = document.querySelectorAll('#warung2 table tbody input, #minuman table tbody input');
    inputFields.forEach(function(input) {
        input.value = '';
    });

    document.querySelector('#warung2 textarea').value = '';
    document.querySelector('#minuman2 textarea').value = '';

    // Tampilkan data dalam tabel di halaman purchase-history.html
    displayPurchaseHistory();
}
