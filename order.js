// Fungsi untuk menangkap input dari modal dan menampilkan dalam tabel
function order() {
    // Ambil nilai dari input pada modal
    let namaPemesan = document.getElementById('FormControlInput1').value;
    let jamPengambilan = document.getElementById('pickup-time').value;
    let metodePembayaran = document.getElementById('payment-method').value;

    // Validasi sederhana: pastikan nama pemesan diisi
    if (namaPemesan.trim() === '') {
        document.getElementById('nama-error').innerText = 'Nama Pemesan harus diisi';
        return;
    } else {
        document.getElementById('nama-error').innerText = '<i class="fa-solid fa-circle-check"></i>';
    }

    // Buat objek untuk menyimpan data pembayaran
    let purchase = {
        nama: namaPemesan,
        jam: jamPengambilan,
        metode: metodePembayaran
    };

    // Simpan data pembayaran ke dalam localStorage (atau gunakan database server jika perlu)
    let purchaseHistory = localStorage.getItem('purchaseHistory');
    if (!purchaseHistory) {
        purchaseHistory = [];
    } else {
        purchaseHistory = JSON.parse(purchaseHistory);
    }
    purchaseHistory.push(purchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    // Reset form setelah data disimpan
    document.getElementById('FormControlInput1').value = '';
    document.getElementById('pickup-time').value = '8:40';
    document.getElementById('payment-method').value = 'GoPay';

    // Tampilkan data dalam tabel di halaman purchase-history.html
    displayPurchaseHistory();
}

// Fungsi untuk menampilkan data pembelian dalam bentuk tabel di halaman purchase-history.html
function displayPurchaseHistory() {
    let tableBody = document.getElementById('purchaseHistoryTable');
    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    // Kosongkan tabel sebelum menambahkan data baru
    tableBody.innerHTML = '';

    if (purchaseHistory.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Tidak ada data pembelian.</td></tr>';
    } else {
        // Loop untuk setiap pembelian dalam purchaseHistory
        purchaseHistory.forEach(function(purchase, index) {
            let row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${purchase.nama}</td>
                    <td>${purchase.jam}</td>
                    <td>${purchase.metode}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}

// Panggil fungsi displayPurchaseHistory saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    displayPurchaseHistory();
});

// Fungsi untuk mereset purchase history
function resetPurchaseHistory() {
    localStorage.removeItem('purchaseHistory');
    // Setelah menghapus data, panggil kembali fungsi untuk menampilkan tabel kosong
    displayPurchaseHistory();
}

