const downloadBtn = document.getElementById('downloadBtn');

if (!downloadBtn) {
    console.warn('downloadBtn not found');
} else {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    const PDF_FILENAME = 'Maschenmarkierer-Vorlagen.pdf';

    // Wichtig: absoluter Pfad vom Root
    const PDF_ENDPOINT = `/assets/pdfs/${encodeURIComponent(PDF_FILENAME)}`;

    async function startDownload(e){
        e.preventDefault();
        downloadBtn.setAttribute('aria-busy','true');
        downloadBtn.textContent = 'Lade...';

        try{
            const resp = await fetch(PDF_ENDPOINT, { method: 'GET' });
            if(!resp.ok) throw new Error(`PDF not found at ${PDF_ENDPOINT}`);

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
            alert(`Konnte PDF nicht laden. Prüfe Pfad: ${PDF_ENDPOINT}`);
        }finally{
            downloadBtn.removeAttribute('aria-busy');
            setTimeout(()=> downloadBtn.textContent = 'PDF herunterladen', 1400);
        }
    }

    downloadBtn.addEventListener('click', startDownload);
}
