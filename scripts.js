// Daftar file zip yang ada di folder /articles (tambah manual di sini)
const articleFiles = [
    'masakan-padang.zip',
    'wisata-bali.zip',
    'soto-lamongan.zip'
];

async function loadArticles() {
    const container = document.getElementById('blog-container');
    container.innerHTML = '';

    for (const fileName of articleFiles) {
        try {
            const response = await fetch(`articles/${fileName}`);
            const blob = await response.blob();
            const zip = await JSZip.loadAsync(blob);
            
            // Mencari file utama (index.html atau content.html) di dalam ZIP
            const contentFile = zip.file("index.html") || zip.file(Object.keys(zip.files)[0]);
            const htmlContent = await contentFile.async("string");

            // Membuat elemen artikel
            const articleCard = document.createElement('article');
            articleCard.className = "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-[1.01]";
            
            // Memasukkan isi ZIP ke dalam card
            articleCard.innerHTML = `
                <div class="p-2 bg-gray-50 border-b text-xs text-gray-400 flex justify-between">
                    <span>Source: ${fileName}</span>
                    <span class="text-green-500">● Live Render</span>
                </div>
                <div class="p-6">
                    ${htmlContent}
                </div>
            `;
            
            container.appendChild(articleCard);
        } catch (error) {
            console.error(`Gagal memuat ${fileName}:`, error);
        }
    }
}

window.addEventListener('DOMContentLoaded', loadArticles);
