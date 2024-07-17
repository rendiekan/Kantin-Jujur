let kiri = document.getElementById('kiri');
let kanan = document.getElementById('kanan');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    kiri.style.marginTop = value * 1.5 + 'px';
    kanan.style.marginTop = value * 1.5 + 'px';
}); 
