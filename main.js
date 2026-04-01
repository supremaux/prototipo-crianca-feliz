// Função para gerar URL única do produto (para rich snippet)
function generateProductUrl(product) {
  // Cria uma URL amigável para compartilhamento
  const slug = product.name
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");
  return `https://criancafeliz.com.br/produto/${product.id}/${slug}`;
}

// Função para atualizar meta tags OG (rich snippet)
function updateMetaTags(product) {
  const ogTitle = document.getElementById("ogTitle");
  const ogDescription = document.getElementById("ogDescription");
  const ogImage = document.getElementById("ogImage");
  const ogUrl = document.getElementById("ogUrl");

  if (ogTitle)
    ogTitle.setAttribute("content", `${product.name} - Criança Feliz`);
  if (ogDescription)
    ogDescription.setAttribute(
      "content",
      product.aidaDesc.substring(0, 200) + "...",
    );
  if (ogImage) ogImage.setAttribute("content", product.detailImage);
  if (ogUrl) ogUrl.setAttribute("content", generateProductUrl(product));

  // Atualizar também title da página
  document.title = `${product.name} | Criança Feliz - Moda Infantil`;
}

// Função para restaurar meta tags padrão
function resetMetaTags() {
  const ogTitle = document.getElementById("ogTitle");
  const ogDescription = document.getElementById("ogDescription");
  const ogImage = document.getElementById("ogImage");
  const ogUrl = document.getElementById("ogUrl");

  if (ogTitle) ogTitle.setAttribute("content", "Criança Feliz - Moda Infantil");
  if (ogDescription)
    ogDescription.setAttribute(
      "content",
      "Descubra a melhor moda infantil em Campo Grande, MS",
    );
  if (ogImage)
    ogImage.setAttribute(
      "content",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&h=500&fit=crop",
    );
  if (ogUrl) ogUrl.setAttribute("content", "https://criancafeliz.com.br");
  document.title = "Criança Feliz | Moda Infantil - Campo Grande, MS";
}

// Função para mostrar toast notification
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message || "✨ Link copiado! Enviando mensagem...";
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Função para enviar mensagem com rich snippet via WhatsApp
function sendWhatsAppWithRichSnippet(product, selectedSize = null) {
  const productUrl = generateProductUrl(product);
  const productName = product.name;
  const priceFormatted = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Construir mensagem com rich snippet e informações completas
  let message = `Olá! 👋\n\n`;
  message += `✨ *Vi o ${productName} no catálogo da Criança Feliz* ✨\n\n`;
  message += `📦 *Produto:* ${productName}\n`;
  message += `💰 *Preço:* ${priceFormatted}\n`;

  if (selectedSize) {
    message += `📏 *Tamanho:* ${selectedSize}\n`;
  }

  message += `\n🔗 *Link do produto:* ${productUrl}\n\n`;
  message += `💝 Gostaria de saber mais sobre disponibilidade, formas de pagamento e entrega em Campo Grande - MS.\n\n`;
  message += `Aguardando seu retorno! 🌟`;

  // Codificar a mensagem para URL
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/5567991338297?text=${encodedMsg}`;

  // Abrir WhatsApp em nova aba
  window.open(whatsappUrl, "_blank");

  // Mostrar toast com feedback
  showToast(`✨ Enviando mensagem sobre ${productName}...`);
}

// ------------------------- BASE DE DADOS DE PRODUTOS (8 itens fictícios) -------------------------
const products = [
  {
    id: 1,
    name: "Conjunto Verão Brisa",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=700&h=700&fit=crop",
    category: "Moda Praia",
    aidaDesc:
      "✨ ATENÇÃO: Seu pequeno merece frescor e estilo! O Conjunto Verão Brisa tem tecido leve e proteção UV. 💡 INTERESSE: Algodão orgânico, costuras reforçadas e estampas exclusivas que duram mais lavagens. ❤️ DESEJO: Peça versátil que combina bermuda e regata, perfeita para brincar e se sentir livre. 🛒 AÇÃO: Garanta já o look mais amado da estação e veja a alegria nos olhos do seu filho!",
  },
  {
    id: 2,
    name: "Sapatinho Macio Bebê",
    price: 49.9,
    image:
      "https://images.unsplash.com/photo-1678192568478-9488ee55def6?w=400&h=400&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1678192568478-9488ee55def6?w=700&h=700&fit=crop",
    category: "Calçados",
    aidaDesc:
      "✨ ATENÇÃO: Primeiros passos com conforto e segurança. Sola antiderrapante e palmilha acolchoada. 💡 INTERESSE: Material respirável, fechos ajustáveis e design anatômico que respeita o desenvolvimento. ❤️ DESEJO: Seu bebê merece maciez e estilo. Disponível nas cores mais delicadas do universo infantil. 🛒 AÇÃO: Peça pelo WhatsApp e garanta o sapatinho que vai acompanhar cada conquista!",
  },
  {
    id: 3,
    name: "Brinquedo Educativo Fazendinha",
    price: 69.9,
    image:
      "https://images.unsplash.com/photo-1632593255333-28ea4c9d778f?w=400&h=400&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1632593255333-28ea4c9d778f?w=700&h=700&fit=crop",
    category: "Brinquedos",
    aidaDesc:
      "✨ ATENÇÃO: Estimule a criatividade com o Brinquedo Educativo Fazendinha! Peças coloridas e lúdicas. 💡 INTERESSE: Desenvolve coordenação motora, linguagem e socialização. Madeira reflorestada e tinta atóxica. ❤️ DESEJO: Horas de diversão longe das telas, com aprendizado garantido e segurança total. 🛒 AÇÃO: Escolha o tamanho ideal e adquira já esse presente inesquecível!",
  },
  {
    id: 4,
    name: "Macacão Aventureiro",
    price: 79.9,
    image:
      "https://images.unsplash.com/photo-1664288115734-b2eb18dca532?w=400&h=400&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1664288115734-b2eb18dca532?w=700&h=700&fit=crop",
    category: "Roupas",
    aidaDesc:
      "✨ ATENÇÃO: Praticidade e charme em um só look! Macacão Aventureiro com botões frontais. 💡 INTERESSE: Tecido macio tipo algodão, modelagem que acompanha os movimentos, ideal para dias de parque e passeios. ❤️ DESEJO: Conforto extremo e estilo descolado para seu pequeno explorador. 🛒 AÇÃO: Selecione o tamanho e peça pelo WhatsApp com entrega rápida em Campo Grande!",
  },
  {
    id: 5,
    name: "Camiseta Baby Nuvem",
    price: 39.9,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=700&h=700&fit=crop",
    category: "Camisetas",
    aidaDesc:
      "✨ ATENÇÃO: Suavidade em cada detalhe! Camiseta Baby Nuvem 100% algodão. 💡 INTERESSE: Estampa lúdica, acabamento reforçado, não desbota. Frescor e liberdade para a pele sensível. ❤️ DESEJO: Seu bebê vai adorar a textura fofinha e você vai se apaixonar pela qualidade premium. 🛒 AÇÃO: Garanta já as cores disponíveis e renove o guarda-roupa infantil com afeto.",
  },
  {
    id: 6,
    name: "Short Infantil Estampado",
    price: 44.9,
    image:
      "https://images.unsplash.com/photo-1656734314119-cf8f2d25fed3?w=400&h=400&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1656734314119-cf8f2d25fed3?w=700&h=700&fit=crop",
    category: "Shorts",
    aidaDesc:
      "✨ ATENÇÃO: Leveza e estilo para os dias quentes! Short com elastano e estampa exclusiva. 💡 INTERESSE: Cós ajustável, bolsos laterais e cores vibrantes. Durabilidade e caimento perfeito. ❤️ DESEJO: Combine com regatas ou camisetas e crie visuais versáteis. Seu filho vai querer usar todos os dias. 🛒 AÇÃO: Peça pelo WhatsApp e receba em casa com todo carinho!",
  },
  {
    id: 7,
    name: "Mochila Animal Amigo",
    price: 59.9,
    image:
      "https://plus.unsplash.com/premium_photo-1687936161262-0cda28f0cd72?w=400&h=400&fit=crop",
    detailImage:
      "https://plus.unsplash.com/premium_photo-1687936161262-0cda28f0cd72?w=700&h=700&fit=crop",
    category: "Acessórios",
    aidaDesc:
      "✨ ATENÇÃO: A mochila mais fofa da escolinha! Formato 3D de animal, alças acolchoadas. 💡 INTERESSE: Material resistente e lavável, compartimento para lancheira e zíperes seguros. ❤️ DESEJO: A criança vai amar levar seu amigo para passeios e escola, unindo diversão e utilidade. 🛒 AÇÃO: Escolha o modelo (urso ou coelho) e garanta já na pré-venda!",
  },
  {
    id: 8,
    name: "Vestido Florido Mimo",
    price: 99.9,
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=400&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&h=700&fit=crop",
    category: "Vestidos",
    aidaDesc:
      "✨ ATENÇÃO: Encanto e delicadeza para ocasiões especiais! Vestido Florido Mimo com laço e babados. 💡 INTERESSE: Tecido leve, forro macio e fecho nas costas. Toque premium e caimento princesa. ❤️ DESEJO: A pequena vai se sentir especial, perfeito para festas, aniversários ou momentos inesquecíveis. 🛒 AÇÃO: Adquira agora e receba em até 3 dias úteis. Presenteie com amor!",
  },
];

// Referências DOM
const productsGridSection = document.getElementById("productsGridSection");
const productDetailSection = document.getElementById("productDetailSection");
const productGridContainer = document.getElementById("productGridContainer");
const dynamicDetailContent = document.getElementById("dynamicDetailContent");
const backToGridBtn = document.getElementById("backToGridBtn");
const navHomeBtn = document.getElementById("navHomeBtn");
const navCatalogBtn = document.getElementById("navCatalogBtn");

// Variável de controle do produto ativo
let currentProduct = null;
let currentSelectedSize = null;

// Função para renderizar a vitrine (grid de produtos)
function renderProductGrid() {
  if (!productGridContainer) return;
  productGridContainer.innerHTML = "";

  products.forEach((product) => {
    const priceFormatted = product.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-rose-100 flex flex-col group";
    card.innerHTML = `
                    <div class="relative overflow-hidden bg-rose-50 aspect-square">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" decode="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                        <div class="absolute top-2 left-2 bg-yellow-200/90 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">Novo</div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="font-bold text-stone-800 text-lg line-clamp-1">${product.name}</h3>
                        <p class="text-rose-500 font-semibold text-xl mt-1">${priceFormatted}</p>
                        <p class="text-stone-400 text-xs mt-1 mb-3">${product.category}</p>
                        <button class="btn-details w-full mt-auto bg-gradient-to-r from-sky-100 to-blue-100 hover:from-sky-200 hover:to-blue-200 text-blue-800 font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2" data-id="${product.id}">
                            <i data-lucide="eye" class="w-4 h-4"></i> Ver Detalhes
                        </button>
                    </div>
                `;
    productGridContainer.appendChild(card);
  });

  // Adicionar eventos aos botões "Ver Detalhes" dinâmicos
  document.querySelectorAll(".btn-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = parseInt(btn.getAttribute("data-id"));
      const selectedProduct = products.find((p) => p.id === productId);
      if (selectedProduct) {
        showProductDetails(selectedProduct);
      }
    });
  });

  // re-inicializar ícones lucide para os novos elementos
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Função para gerar conteúdo da página de detalhes com AIDA, seletor de tamanho e botão WhatsApp
function renderDetailContent(product) {
  const priceFormatted = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const aidaHTML = `
                <div class="bg-rose-50/30 p-4 rounded-xl border-l-4 border-rose-300 space-y-2 text-stone-700">
                    <div class="text-sm leading-relaxed">${product.aidaDesc}</div>
                </div>
            `;

  // Seletor de tamanhos fictício
  const sizes = [
    "6 meses",
    "12 meses",
    "18 meses",
    "2 anos",
    "3 anos",
    "4 anos",
  ];
  const sizeSelectorHTML = `
                <div class="mt-4">
                    <label class="block text-stone-700 font-semibold mb-2 flex items-center gap-1"><i data-lucide="ruler" class="w-4 h-4"></i> Escolha o tamanho:</label>
                    <div class="flex flex-wrap gap-2" id="sizeSelectorContainer">
                        ${sizes.map((size) => `<button class="size-option bg-gray-100 hover:bg-amber-100 text-stone-800 px-4 py-2 rounded-full text-sm font-medium transition border border-transparent focus:ring-2 focus:ring-amber-300" data-size="${size}">${size}</button>`).join("")}
                    </div>
                    <p class="text-xs text-stone-400 mt-2">*selecione uma opção e clique em pedir via WhatsApp</p>
                </div>
            `;

  const whatsappButton = `
                <button id="whatsappOrderBtn" class="btn-whatsapp w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 text-lg transition-all">
                    <i data-lucide="message-circle" class="w-6 h-6"></i> Pedir pelo WhatsApp
                </button>
            `;

  const detailHTML = `
                <div class="flex flex-col lg:flex-row gap-8">
                    <!-- Imagem ampliada -->
                    <div class="lg:w-1/2 flex justify-center">
                        <div class="rounded-2xl overflow-hidden bg-rose-50 shadow-md max-w-md w-full">
                            <img src="${product.detailImage}" alt="${product.name}" loading="lazy" decode="async" class="w-full h-auto object-cover aspect-square">
                        </div>
                    </div>
                    <!-- Informações do produto -->
                    <div class="lg:w-1/2 flex flex-col">
                        <div class="mb-3">
                            <span class="text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Destaque</span>
                            <h2 class="text-3xl font-extrabold text-stone-800 mt-2">${product.name}</h2>
                            <p class="text-rose-500 text-2xl font-bold mt-1">${priceFormatted}</p>
                            <p class="text-stone-400 text-sm mt-1">${product.category} • Até 3x sem juros</p>
                        </div>
                        
                        <!-- Seção AIDA completa -->
                        <div class="my-4">
                            <h3 class="text-lg font-bold text-stone-700 flex items-center gap-2"><i data-lucide="star" class="w-5 h-5 text-amber-400"></i> Sobre este produto</h3>
                            ${aidaHTML}
                        </div>
                        
                        <!-- Seletor de tamanho dummy -->
                        ${sizeSelectorHTML}
                        
                        <!-- Botão principal WhatsApp -->
                        ${whatsappButton}
                        
                        <div class="mt-6 pt-4 border-t border-rose-100 text-xs text-stone-400 flex gap-4">
                            <span class="flex items-center gap-1"><i data-lucide="truck" class="w-3 h-3"></i> Entregamos em Campo Grande e região</span>
                            <span class="flex items-center gap-1"><i data-lucide="shield-check" class="w-3 h-3"></i> Compra segura</span>
                        </div>
                    </div>
                </div>
            `;

  dynamicDetailContent.innerHTML = detailHTML;

  // Re-inicializar Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Adicionar eventos aos botões de tamanho
  document.querySelectorAll(".size-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".size-option")
        .forEach((b) =>
          b.classList.remove("bg-amber-200", "ring-2", "ring-amber-300"),
        );
      this.classList.add("bg-amber-200", "ring-2", "ring-amber-300");
      currentSelectedSize = this.getAttribute("data-size");
    });
  });

  // Adicionar evento do WhatsApp com rich snippet
  const whatsappBtn = document.getElementById("whatsappOrderBtn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sendWhatsAppWithRichSnippet(product, currentSelectedSize);
    });
  }
}

// Função para mostrar a página de detalhes (ocultar vitrine)
function showProductDetails(product) {
  if (!product) return;
  currentProduct = product;
  currentSelectedSize = null;
  renderDetailContent(product);
  updateMetaTags(product); // Atualiza meta tags para rich snippet

  // Transição suave
  productsGridSection.classList.add("hidden");
  productDetailSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Função para voltar para a vitrine (grid)
function backToGrid() {
  productDetailSection.classList.add("hidden");
  productsGridSection.classList.remove("hidden");
  renderProductGrid();
  resetMetaTags(); // Restaura meta tags padrão
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Configurar eventos de navegação
function setupNavEvents() {
  if (navHomeBtn) {
    navHomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!productsGridSection.classList.contains("hidden")) {
        document.querySelector("main").scrollIntoView({ behavior: "smooth" });
      } else {
        backToGrid();
      }
    });
  }
  if (navCatalogBtn) {
    navCatalogBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!productsGridSection.classList.contains("hidden")) {
        document
          .querySelector("#productGridContainer")
          .scrollIntoView({ behavior: "smooth" });
      } else {
        backToGrid();
      }
    });
  }
  if (backToGridBtn) {
    backToGridBtn.addEventListener("click", (e) => {
      e.preventDefault();
      backToGrid();
    });
  }
}

// Inicializar app
function init() {
  renderProductGrid();
  setupNavEvents();
  productsGridSection.classList.remove("hidden");
  productDetailSection.classList.add("hidden");
  resetMetaTags();

  if (window.lucide) {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", init);
