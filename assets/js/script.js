// Simple logic: fetch PDF from '/pdf' endpoint and trigger download
const downloadBtn = document.getElementById('downloadBtn');
if (!downloadBtn) {
    console.warn('downloadBtn not found');
} else {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    const PDF_FILENAME = 'Testprodukt.pdf';
    const PDF_ENDPOINT = `assets/pdfs/${encodeURIComponent(PDF_FILENAME)}`; // local path

    async function startDownload(e){
        e.preventDefault();
        downloadBtn.setAttribute('aria-busy','true');
        downloadBtn.textContent = 'Lade...';
        try{
            const resp = await fetch(PDF_ENDPOINT);
            if(!resp.ok) throw new Error('Fehler beim Laden der Datei');

            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = PDF_FILENAME;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            downloadBtn.textContent = 'Download starten';
        }catch(err){
            console.error(err);
            downloadBtn.textContent = 'Download fehlgeschlagen';
            alert('Konnte PDF nicht laden. Überprüfe Pfad oder Server');
        }finally{
            downloadBtn.removeAttribute('aria-busy');
            setTimeout(()=> downloadBtn.textContent = 'PDF herunterladen', 1400);
        }
    }

    downloadBtn.addEventListener('click', startDownload);
}