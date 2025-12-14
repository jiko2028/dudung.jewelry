// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== ACTIVE NAVIGATION LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== CHAT WIDGET =====
const chatButton = document.querySelector('.chat-button');
const chatBox = document.querySelector('.chat-box');
const chatClose = document.querySelector('.chat-close');
const chatSend = document.querySelector('.chat-send');
const chatInput = document.querySelector('.chat-input');
const chatMessages = document.querySelector('.chat-messages');

if (chatButton) {
    chatButton.addEventListener('click', () => {
        chatBox.classList.toggle('active');
        if (chatBox.classList.contains('active')) {
            chatInput.focus();
        }
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

const botResponses = {
    'halo': 'Halo! Selamat datang di Dudung Jewelry. Ada yang bisa saya bantu?',
    'hai': 'Hai! Terima kasih telah menghubungi kami. Bagaimana saya bisa membantu Anda?',
    'produk': 'Kami menjual berbagai perhiasan seperti cincin, kalung, gelang, dan anting. Silakan kunjungi halaman Produk untuk melihat koleksi lengkap kami!',
    'harga': 'Harga produk kami bervariasi mulai dari Rp 1.500.000 hingga Rp 8.500.000. Silakan cek halaman Produk untuk detail lengkap.',
    'pesan': 'Untuk memesan, silakan isi formulir pemesanan di halaman Pemesanan atau hubungi kami langsung melalui WhatsApp.',
    'kontak': 'Anda bisa menghubungi kami di:\n📞 +62 812-3456-7890\n📧 info@dudungjewelry.com',
    'jam': 'Kami buka Senin - Sabtu, pukul 09.00 - 18.00 WIB. Minggu dan hari libur tutup.',
    'default': 'Terima kasih atas pertanyaan Anda. Untuk informasi lebih detail, silakan hubungi kami di +62 812-3456-7890 atau kunjungi halaman Kontak.'
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    return botResponses.default;
}

if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 500);
    }
}

if (chatMessages) {
    setTimeout(() => {
        addMessage('Halo! Selamat datang di Dudung Jewelry. Ada yang bisa saya bantu hari ini? 😊', false);
    }, 1000);
}

// ===== PRODUCT FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===== PRODUCT CARD CLICK =====
const productCardElements = document.querySelectorAll('.product-card');

const productIdMap = {
    'Cincin Berlian Klasik': 'cincin-berlian-klasik',
    'Cincin Tunangan Emas': 'cincin-tunangan-emas',
    'Cincin Couple Minimalis': 'cincin-couple-minimalis',
    'Kalung Emas Liontin': 'kalung-emas-liontin',
    'Kalung Berlian Mewah': 'kalung-berlian-mewah',
    'Kalung Mutiara Elegan': 'kalung-mutiara-elegan',
    'Gelang Emas Minimalis': 'gelang-emas-minimalis',
    'Gelang Berlian Cantik': 'gelang-berlian-cantik',
    'Gelang Bangle Emas': 'gelang-bangle-emas',
    'Anting Berlian Stud': 'anting-berlian-stud',
    'Anting Emas Drop': 'anting-emas-drop',
    'Anting Mutiara Klasik': 'anting-mutiara-klasik'
};

productCardElements.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
            return;
        }

        const productName = card.querySelector('.product-name').textContent;
        const productId = productIdMap[productName];

        if (productId) {
            window.location.href = `detail-produk.html?id=${productId}`;
        }
    });

    card.style.cursor = 'pointer';
});

// ===== PRE-FILL ORDER FORM FROM URL =====
if (window.location.pathname.includes('pemesanan.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');

    if (productParam) {
        const productSelect = document.getElementById('produk');
        if (productSelect) {
            const options = productSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value.toLowerCase().includes(productParam.toLowerCase())) {
                    productSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-gold);
    color: var(--primary-dark);
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 998;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SWEETALERT-STYLE THANK YOU MODAL =====
function showThankYouModal(orderData) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 24px;
        max-width: 550px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.7);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
    `;

    modalContent.innerHTML = `
        <style>
            @keyframes scaleIn {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes checkmarkDraw {
                0% { stroke-dashoffset: 100; }
                100% { stroke-dashoffset: 0; }
            }
            @keyframes sparkle {
                0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
                50% { transform: scale(1) rotate(180deg); opacity: 1; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .success-icon-container {
                width: 120px;
                height: 120px;
                margin: 0 auto 1.5rem;
                position: relative;
                animation: scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s backwards;
            }
            .success-circle {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
            }
            .checkmark-svg {
                width: 60px;
                height: 60px;
            }
            .checkmark-path {
                stroke: white;
                stroke-width: 6;
                stroke-linecap: round;
                stroke-linejoin: round;
                fill: none;
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: checkmarkDraw 0.5s ease-out 0.6s forwards;
            }
            .sparkle {
                position: absolute;
                width: 20px;
                height: 20px;
                background: linear-gradient(45deg, #D4AF37, #F4E4C1);
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            }
            .sparkle-1 { top: 10%; right: 15%; animation: sparkle 1s ease-out 0.8s; }
            .sparkle-2 { bottom: 15%; left: 10%; animation: sparkle 1s ease-out 1s; }
            .sparkle-3 { top: 20%; left: 15%; animation: sparkle 1s ease-out 1.2s; }
            .modal-title { animation: fadeIn 0.5s ease 0.9s backwards; }
            .modal-subtitle { animation: fadeIn 0.5s ease 1s backwards; }
            .order-summary { animation: fadeIn 0.5s ease 1.1s backwards; }
            .next-steps { animation: fadeIn 0.5s ease 1.2s backwards; }
            .contact-box { animation: fadeIn 0.5s ease 1.3s backwards; }
            .close-btn { animation: fadeIn 0.5s ease 1.4s backwards; }
            .summary-item {
                display: flex;
                justify-content: space-between;
                padding: 0.75rem 0;
                border-bottom: 1px solid #f0f0f0;
                transition: all 0.3s ease;
            }
            .summary-item:hover {
                background: #fafafa;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                border-radius: 8px;
            }
            .summary-item:last-child { border-bottom: none; }
        </style>
        
        <div style="padding: 2.5rem 2rem;">
            <div class="success-icon-container">
                <div class="sparkle sparkle-1"></div>
                <div class="sparkle sparkle-2"></div>
                <div class="sparkle sparkle-3"></div>
                <div class="success-circle">
                    <svg class="checkmark-svg" viewBox="0 0 52 52">
                        <path class="checkmark-path" d="M14 27l7.5 7.5L38 18"/>
                    </svg>
                </div>
            </div>
            
            <h2 class="modal-title" style="text-align: center; color: #1a1a1a; font-family: 'Playfair Display', serif; font-size: 2.2rem; margin-bottom: 0.5rem; font-weight: 700;">
                Terima Kasih! 🎉
            </h2>
            <p class="modal-subtitle" style="text-align: center; color: #666; font-size: 1.05rem; margin-bottom: 2rem;">
                Pesanan Anda telah berhasil diterima
            </p>
            
            <div class="order-summary" style="background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid #e8e8e8;">
                <h3 style="color: #D4AF37; font-size: 1rem; margin-bottom: 1rem; text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                    📋 Ringkasan Pesanan
                </h3>
                <div>
                    <div class="summary-item">
                        <span style="color: #888; font-weight: 500; font-size: 0.95rem;">Nama</span>
                        <span style="color: #1a1a1a; font-weight: 600; font-size: 0.95rem;">${orderData.nama}</span>
                    </div>
                    <div class="summary-item">
                        <span style="color: #888; font-weight: 500; font-size: 0.95rem;">Produk</span>
                        <span style="color: #1a1a1a; font-weight: 600; font-size: 0.95rem;">${orderData.produk}</span>
                    </div>
                    <div class="summary-item">
                        <span style="color: #888; font-weight: 500; font-size: 0.95rem;">Jumlah</span>
                        <span style="color: #1a1a1a; font-weight: 600; font-size: 0.95rem;">${orderData.jumlah} pcs</span>
                    </div>
                    <div class="summary-item">
                        <span style="color: #888; font-weight: 500; font-size: 0.95rem;">Email</span>
                        <span style="color: #1a1a1a; font-weight: 600; font-size: 0.95rem;">${orderData.email}</span>
                    </div>
                </div>
            </div>
            
            <div class="next-steps" style="background: linear-gradient(135deg, #D4AF37 0%, #C9A690 100%); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; box-shadow: 0 8px 20px rgba(212, 175, 55, 0.25);">
                <h3 style="color: #1a1a1a; font-size: 1rem; margin-bottom: 1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.3rem;">⏭️</span> Langkah Selanjutnya
                </h3>
                <ol style="color: #1a1a1a; padding-left: 1.3rem; margin: 0; line-height: 1.9; font-size: 0.95rem;">
                    <li style="margin-bottom: 0.5rem;">Tim kami akan menghubungi Anda dalam <strong>1x24 jam</strong></li>
                    <li style="margin-bottom: 0.5rem;">Konfirmasi detail pesanan dan pembayaran</li>
                    <li>Pesanan Anda akan segera diproses</li>
                </ol>
            </div>
            
            <div class="contact-box" style="text-align: center; padding: 1.25rem; background: #f8f8f8; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid #e8e8e8;">
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 500;">
                    Ada pertanyaan? Hubungi kami
                </p>
                <p style="color: #D4AF37; font-weight: 700; font-size: 1.15rem; margin: 0; letter-spacing: 0.3px;">
                    📞 +62 812-3456-7890
                </p>
            </div>
            
            <button class="close-btn" onclick="this.closest('[style*=\\'position: fixed\\']').remove()" 
                    style="width: 100%; padding: 1rem 2rem; background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%); color: #1a1a1a; border: none; border-radius: 12px; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: 'Poppins', sans-serif; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(212, 175, 55, 0.5)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(212, 175, 55, 0.3)'">
                Tutup
            </button>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Trigger animations
    requestAnimationFrame(() => {
        modalOverlay.style.opacity = '1';
        requestAnimationFrame(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        });
    });

    // Close handlers
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };
    document.addEventListener('keydown', handleEscape);

    function closeModal() {
        modalContent.style.transform = 'scale(0.7)';
        modalContent.style.opacity = '0';
        modalOverlay.style.opacity = '0';
        setTimeout(() => {
            modalOverlay.remove();
            document.removeEventListener('keydown', handleEscape);
        }, 300);
    }
}
