  // Criar folhas caindo
        function createLeaves() {
            const leavesCount = 20;
            for (let i = 0; i < leavesCount; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'leaf leaf-fall';
                
                // Posição horizontal aleatória
                const leftPosition = Math.random() * 100;
                leaf.style.left = leftPosition + '%';
                
                // Duração da animação (8 a 15 segundos)
                const duration = Math.random() * 7 + 8;
                leaf.style.animationDuration = duration + 's';
                
                // Delay inicial aleatório
                const delay = Math.random() * 8;
                leaf.style.animationDelay = delay + 's';
                
                // Tamanho aleatório
                const scale = Math.random() * 0.6 + 0.5;
                leaf.style.width = (30 * scale) + 'px';
                leaf.style.height = (30 * scale) + 'px';
                
                document.body.appendChild(leaf);
            }
        }

        // Variáveis globais
        let currentSlide = 0;
        let carouselInterval;
        let images = [];
        let pendingFiles = [];
        const ADMIN_PASSWORD = 'admin123';

        // Inicializar ao carregar a página
        window.onload = function() {
            createLeaves();
            loadImages();
            startCarousel();
        };

        // Carrossel
        function startCarousel() {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, 4000);
        }

        function nextSlide() {
            if (images.length === 0) return;
            currentSlide = (currentSlide + 1) % images.length;
            updateCarousel();
        }

        function updateCarousel() {
            const carouselInner = document.getElementById('carouselInner');
            carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function renderCarousel() {
            const carouselInner = document.getElementById('carouselInner');
            if (images.length === 0) {
                carouselInner.innerHTML = '<div class="carousel-item"><p class="no-images">Adicione fotos através da Área Administrativa</p></div>';
            } else {
                carouselInner.innerHTML = images.map(img => 
                    `<div class="carousel-item"><img src="${img}" alt="Trabalho realizado"></div>`
                ).join('');
            }
            currentSlide = 0;
            updateCarousel();
        }

        // Área Administrativa - Modal
        function openAdminModal() {
            document.getElementById('adminModal').style.display = 'block';
        }

        function closeAdminModal() {
            document.getElementById('adminModal').style.display = 'none';
        }

        // Login
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            if (password === ADMIN_PASSWORD) {
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('adminContent').style.display = 'block';
                renderGallery();
            } else {
                alert('Senha incorreta!');
            }
        });

        function logout() {
            document.getElementById('loginSection').style.display = 'block';
            document.getElementById('adminContent').style.display = 'none';
            document.getElementById('adminPassword').value = '';
        }

        // Upload de imagens
        document.getElementById('fileInput').addEventListener('change', function(e) {
            pendingFiles = Array.from(e.target.files);
            showPreview();
        });

        function showPreview() {
            const container = document.getElementById('previewContainer');
            container.innerHTML = '';
            pendingFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const div = document.createElement('div');
                    div.className = 'preview-item';
                    div.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="remove-preview" onclick="removePreview(${index})">×</button>
                    `;
                    container.appendChild(div);
                };
                reader.readAsDataURL(file);
            });
        }

        function removePreview(index) {
            pendingFiles.splice(index, 1);
            showPreview();
        }

        function uploadImages() {
            if (pendingFiles.length === 0) {
                alert('Selecione pelo menos uma imagem!');
                return;
            }

            pendingFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    images.push(e.target.result);
                    saveImages();
                    renderCarousel();
                    renderGallery();
                };
                reader.readAsDataURL(file);
            });

            pendingFiles = [];
            document.getElementById('previewContainer').innerHTML = '';
            document.getElementById('fileInput').value = '';
            alert('Imagens adicionadas com sucesso!');
        }

        // Galeria administrativa
        function renderGallery() {
            const gallery = document.getElementById('galleryGrid');
            if (images.length === 0) {
                gallery.innerHTML = '<div class="empty-gallery"><p>Nenhuma foto adicionada ainda.</p><p>Use o formulário acima para adicionar fotos.</p></div>';
            } else {
                gallery.innerHTML = images.map((img, index) => `
                    <div class="gallery-item">
                        <img src="${img}" alt="Foto ${index + 1}">
                        <div class="gallery-item-actions">
                            <button class="btn-delete" onclick="deleteImage(${index})">🗑️ Remover</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        function deleteImage(index) {
            if (confirm('Tem certeza que deseja remover esta imagem?')) {
                images.splice(index, 1);
                saveImages();
                renderCarousel();
                renderGallery();
            }
        }

        // Armazenamento (usando variável em memória - as imagens serão perdidas ao recarregar a página)
        function saveImages() {
            // Em uma aplicação real, você salvaria no servidor
            // Aqui estamos apenas mantendo em memória
        }

        function loadImages() {
            // Imagens de exemplo (você pode remover isso)
            renderCarousel();
        }

        // Formulário de orçamento
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

        // Fechar modal ao clicar fora
        window.onclick = function(event) {
            const modal = document.getElementById('adminModal');
            if (event.target == modal) {
                closeAdminModal();
            }
        }