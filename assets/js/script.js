// Simple logic: fetch PDF from '/pdf' endpoint and trigger download
const downloadBtn = document.getElementById('downloadBtn');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

// Endpoint: expects a Worker or route that proxies the R2 object at /pdf
const PDF_ENDPOINT = '/pdf'; // if you deploy Worker to same domain and route, this will work

async function startDownload(e){
e.preventDefault();
downloadBtn.setAttribute('aria-busy','true');
downloadBtn.textContent = 'Lade...';
try{
const resp = await fetch(PDF_ENDPOINT);
if(!resp.ok) throw new Error('Fehler beim Laden der Datei');

const blob = await resp.blob();
const url = URL.createObjectURL(blob);

// trigger download
const a = document.createElement('a');
a.href = url;
a.download = 'heavenstruck-guide.pdf';
document.body.appendChild(a);
a.click();
a.remove();
URL.revokeObjectURL(url);

downloadBtn.textContent = 'Download starten';
}catch(err){
console.error(err);
downloadBtn.textContent = 'Download fehlgeschlagen';
alert('Konnte PDF nicht laden. Überprüfe Konfiguration und R2/Bucket');
}finally{
downloadBtn.removeAttribute('aria-busy');
setTimeout(()=> downloadBtn.textContent = 'PDF herunterladen', 1400);
}
}

downloadBtn.addEventListener('click', startDownload);