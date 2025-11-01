function createLeaves() {
    const leavesCount = 20;
    for (let i = 0; i < leavesCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf leaf-fall';
        
        const leftPosition = Math.random() * 100;
        leaf.style.left = leftPosition + '%';
        
        const duration = Math.random() * 7 + 8;
        leaf.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 8;
        leaf.style.animationDelay = delay + 's';
        
        const scale = Math.random() * 0.6 + 0.5;
        leaf.style.width = (30 * scale) + 'px';
        leaf.style.height = (30 * scale) + 'px';
        
        document.body.appendChild(leaf);
    }
}

let currentSlide = 0;
let carouselInterval;
let imagesAntes = [];
let imagesDepois = [];
let pendingFilesAntes = [];
let pendingFilesDepois = [];
const ADMIN_PASSWORD = 'admin123';

// 2 imagens fixas de exemplo para ANTES e DEPOIS
const defaultImagesAntes = [
    './assets/img-antes-1.jpeg',
    './assets/img-antes-2.jpeg',
];

const defaultImagesDepois = [
    './assets/img-depois-1.jpeg',
    './assets/img-depois-2.jpeg',
];

window.onload = function() {
    createLeaves();
    imagesAntes = [...defaultImagesAntes];
    imagesDepois = [...defaultImagesDepois];
    renderCarousels();
    startCarousel();
};

function startCarousel() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 4000);
}

function nextSlide() {
    const maxSlides = Math.max(imagesAntes.length, imagesDepois.length);
    if (maxSlides === 0) return;
    currentSlide = (currentSlide + 1) % maxSlides;
    updateCarousels();
}

function prevSlide() {
    const maxSlides = Math.max(imagesAntes.length, imagesDepois.length);
    if (maxSlides === 0) return;
    currentSlide = (currentSlide - 1 + maxSlides) % maxSlides;
    updateCarousels();
}

function updateCarousels() {
    const carouselAntes = document.getElementById('carouselAntes');
    const carouselDepois = document.getElementById('carouselDepois');
    
    carouselAntes.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselDepois.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    updateIndicators();
}

function updateIndicators() {
    const maxSlides = Math.max(imagesAntes.length, imagesDepois.length);
    
    // Atualizar indicadores ANTES
    const indicatorsAntes = document.getElementById('indicatorsAntes');
    indicatorsAntes.innerHTML = '';
    for (let i = 0; i < maxSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === currentSlide ? ' active' : '');
        indicator.onclick = () => goToSlide(i);
        indicatorsAntes.appendChild(indicator);
    }
    
    // Atualizar indicadores DEPOIS
    const indicatorsDepois = document.getElementById('indicatorsDepois');
    indicatorsDepois.innerHTML = '';
    for (let i = 0; i < maxSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === currentSlide ? ' active' : '');
        indicator.onclick = () => goToSlide(i);
        indicatorsDepois.appendChild(indicator);
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousels();
}

function renderCarousels() {
    const carouselAntes = document.getElementById('carouselAntes');
    const carouselDepois = document.getElementById('carouselDepois');
    
    // Renderizar ANTES
    if (imagesAntes.length === 0) {
        carouselAntes.innerHTML = '<div class="carousel-item"><p class="no-images">Nenhuma foto adicionada</p></div>';
    } else {
        carouselAntes.innerHTML = imagesAntes.map(img => 
            `<div class="carousel-item"><img src="${img}" alt="Antes"></div>`
        ).join('');
    }
    
    // Renderizar DEPOIS
    if (imagesDepois.length === 0) {
        carouselDepois.innerHTML = '<div class="carousel-item"><p class="no-images">Nenhuma foto adicionada</p></div>';
    } else {
        carouselDepois.innerHTML = imagesDepois.map(img => 
            `<div class="carousel-item"><img src="${img}" alt="Depois"></div>`
        ).join('');
    }
    
    currentSlide = 0;
    updateCarousels();
}

function openAdminModal() {
    document.getElementById('adminModal').style.display = 'block';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        renderGalleries();
    } else {
        alert('Senha incorreta!');
    }
});

function logout() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminContent').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// Upload ANTES
document.getElementById('fileInputAntes').addEventListener('change', function(e) {
    pendingFilesAntes = Array.from(e.target.files);
    showPreview('antes');
});

// Upload DEPOIS
document.getElementById('fileInputDepois').addEventListener('change', function(e) {
    pendingFilesDepois = Array.from(e.target.files);
    showPreview('depois');
});

function showPreview(tipo) {
    const files = tipo === 'antes' ? pendingFilesAntes : pendingFilesDepois;
    const containerId = tipo === 'antes' ? 'previewContainerAntes' : 'previewContainerDepois';
    const container = document.getElementById(containerId);
    
    container.innerHTML = '';
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="remove-preview" onclick="removePreview('${tipo}', ${index})">×</button>
            `;
            container.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
}

function removePreview(tipo, index) {
    if (tipo === 'antes') {
        pendingFilesAntes.splice(index, 1);
        showPreview('antes');
    } else {
        pendingFilesDepois.splice(index, 1);
        showPreview('depois');
    }
}

function uploadImages(tipo) {
    const files = tipo === 'antes' ? pendingFilesAntes : pendingFilesDepois;
    const images = tipo === 'antes' ? imagesAntes : imagesDepois;
    
    if (files.length === 0) {
        alert('Selecione pelo menos uma imagem!');
        return;
    }

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            images.push(e.target.result);
            renderCarousels();
            renderGalleries();
        };
        reader.readAsDataURL(file);
    });

    if (tipo === 'antes') {
        pendingFilesAntes = [];
        document.getElementById('previewContainerAntes').innerHTML = '';
        document.getElementById('fileInputAntes').value = '';
    } else {
        pendingFilesDepois = [];
        document.getElementById('previewContainerDepois').innerHTML = '';
        document.getElementById('fileInputDepois').value = '';
    }
    
    alert('Imagens adicionadas com sucesso!');
}

function renderGalleries() {
    renderGallery('antes');
    renderGallery('depois');
}

function renderGallery(tipo) {
    const images = tipo === 'antes' ? imagesAntes : imagesDepois;
    const galleryId = tipo === 'antes' ? 'galleryAntes' : 'galleryDepois';
    const gallery = document.getElementById(galleryId);
    
    if (images.length === 0) {
        gallery.innerHTML = '<div class="empty-gallery"><p>Nenhuma foto adicionada ainda.</p></div>';
    } else {
        gallery.innerHTML = images.map((img, index) => `
            <div class="gallery-item">
                <img src="${img}" alt="${tipo} ${index + 1}">
                <div class="gallery-item-actions">
                    <button class="btn-delete" onclick="deleteImage('${tipo}', ${index})">🗑️ Remover</button>
                </div>
            </div>
        `).join('');
    }
}

function deleteImage(tipo, index) {
    if (confirm('Tem certeza que deseja remover esta imagem?')) {
        if (tipo === 'antes') {
            imagesAntes.splice(index, 1);
        } else {
            imagesDepois.splice(index, 1);
        }
        renderCarousels();
        renderGalleries();
    }
}

document.getElementById('orcamentoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const descricao = document.getElementById('descricao').value;

    const mensagem = `*Solicitação de Orçamento*\n\n` +
                   `*Nome:* ${nome}\n` +
                   `*Telefone:* ${telefone}\n` +
                   `*Serviço:* ${servico}\n` +
                   `*Descrição:* ${descricao}`;

    const whatsappURL = `https://wa.me/5515992678046?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, '_blank');
});

window.onclick = function(event) {
    const modal = document.getElementById('adminModal');
    if (event.target == modal) {
        closeAdminModal();
    }
}