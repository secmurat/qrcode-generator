const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const qrInfo = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const qrcolor = document.getElementById('qrcolor').value;


    if(url === '') {
        alert('Please enter a valid url.');
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQrCode(url, size, color, qrcolor);
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50)
        }, 1000)
    }
    console.log(url, size);
}

const generateQrCode = (url, size, color, qrcolor) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
        colorLight: color,
        colorDark: qrcolor,
    });
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}
hideSpinner();

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if(saveLink) {
        saveLink.remove();
    }
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
}

form.addEventListener('submit', qrInfo)
