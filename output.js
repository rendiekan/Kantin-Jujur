var namaPemesan = sessionStorage.getItem('nama');
var jamPengambilan = sessionStorage.getItem('jam');
var metodePembayaran = sessionStorage.getItem('metode');

document.getElementById('namaPemesan').textContent = namaPemesan;
document.getElementById('jamPengambilan').textContent = jamPengambilan;
document.getElementById('metodePembayaran').textContent = metodePembayaran;