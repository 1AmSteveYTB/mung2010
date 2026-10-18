document.addEventListener('DOMContentLoaded', () => {
    // 1. HIỆU ỨNG TẠO CÁNH HOA / HẠT NỀN RƠI (BACKGROUND PARTICLES)
    const particlesContainer = document.getElementById('particlesContainer');
    if (particlesContainer) {
        const particleCount = 20; // Số lượng cánh hoa/hạt trên màn hình
        for (let i = 0; i < particleCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('floating-petal');
            
            // Random kích thước, vị trí xuất hiện và tốc độ rơi
            const size = Math.random() * 8 + 6; // 6px đến 14px
            const posX = Math.random() * 100; // % chiều rộng
            const duration = Math.random() * 8 + 6; // 6s đến 14s
            const delay = Math.random() * 10; // 0s đến 10s
            
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.2}px`;
            petal.style.left = `${posX}%`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(petal);
        }
    }

    // 2. HIỆU ỨNG PARALLAX KHI DI CHUYỂN CHUỘT (MOUSEMOVE PARALLAX)
    const parallaxBg = document.getElementById('parallaxBg');
    if (parallaxBg) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            parallaxBg.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // 3. HIỆU ỨNG CUỘN TRANG XUẤT HIỆN DẦN (INTERSECTION OBSERVER SCROLL REVEAL)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Có thể hủy quan sát nếu muốn hiệu ứng chỉ chạy 1 lần: observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. HIỆU ỨNG CLICK RIPPLE CHO NÚT BẤM
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 5. XỬ LÝ MENU DI ĐỘNG (MOBILE MENU)
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 6. XỬ LÝ NHẠC NỀN (AUDIO TOGGLE)
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (musicToggle && bgMusic) {
        let isPlaying = false;

        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.querySelector('.music-text').textContent = 'Nhạc nền';
            } else {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicToggle.querySelector('.music-text').textContent = 'Đang phát';
                    isPlaying = true;
                }).catch(error => {
                    console.log("Trình duyệt chặn tự động phát:", error);
                    alert("Trình duyệt yêu cầu tương tác hoặc tệp nhạc đang gặp sự cố tải.");
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // 7. XỬ LÝ MODAL LỜI CHÚC TƯƠNG TÁC
    const wishCards = document.querySelectorAll('.wish-card');
    const wishModal = document.getElementById('wishModal');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');

    const wishesData = {
        health: {
            icon: '🌿',
            title: 'Sức Khỏe Vàng Cho Mẹ',
            text: 'Mẹ yêu ơi, tài sản quý giá nhất của con chính là sức khỏe và sự bình an của mẹ. Nhân ngày 20/10, con thành tâm nguyện cầu ơn trên ban phước cho mẹ luôn dồi dào sức khỏe, thân tâm an lạc, bước chân luôn vững chãi và vui vầy cùng con cháu mỗi ngày.',
            signature: 'Bùi Hoàng Phương kính chúc'
        },
        smile: {
            icon: '🌸',
            title: 'Nụ Cười Rạng Rỡ Của Mẹ',
            text: 'Nụ cười của mẹ chính là ánh nắng ấm áp sưởi ấm cả gia đình ta. Con mong rằng những lo toan, vất vả sẽ lùi xa, để lại trên gương mặt mẹ những nụ cười rạng rỡ và hạnh phúc trọn vẹn nhất trong ngày hôm nay và suốt những năm tháng về sau.',
            signature: 'Bùi Hoàng Phương kính chúc'
        },
        gratitude: {
            icon: '🍵',
            title: 'Lòng Biết Ơn Sâu Sắc',
            text: 'Cảm ơn mẹ vì đã sinh ra con, nuôi dưỡng con nên người bằng tất cả tình yêu thương vô điều kiện và sự hy sinh thầm lặng. Công ơn sinh thành dưỡng dục này tựa trời biển, con khắc ghi trong tim và nguyện sẽ luôn sống thật tốt để làm mẹ tự hào.',
            signature: 'Bùi Hoàng Phương kính chúc'
        },
        happiness: {
            icon: '🏮',
            title: 'Hạnh Phúc Trọn Vẹn An Nhiên',
            text: 'Cuộc đời này dù có bão giông hay mỏi mệt đến đâu, nhà vẫn là nơi bình yên nhất vì có mẹ đợi chờ. Con chúc mẹ yêu luôn an nhiên tự tại, thảnh thơi tận hưởng niềm vui tuổi già và ngập tràn hạnh phúc viên mãn bên gia đình mình.',
            signature: 'Bùi Hoàng Phương kính chúc'
        }
    };

    if (wishCards && wishModal && modalClose && modalContent) {
        wishCards.forEach(card => {
            const btn = card.querySelector('.card-btn');
            const wishKey = card.getAttribute('data-wish');

            const openModalAction = () => {
                const data = wishesData[wishKey];
                if (data) {
                    modalContent.innerHTML = `
                        <div class="modal-content-inner">
                            <div class="modal-icon">${data.icon}</div>
                            <h3 class="modal-title">${data.title}</h3>
                            <p class="modal-text">${data.text}</p>
                            <div class="modal-signature">${data.signature}</div>
                        </div>
                    `;
                    wishModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            };

            card.addEventListener('click', openModalAction);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openModalAction();
                });
            }
        });

        const closeModal = () => {
            wishModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        modalClose.addEventListener('click', closeModal);
        wishModal.addEventListener('click', (e) => {
            if (e.target === wishModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && wishModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // 8. ĐỔI MÀU NAVBAR KHI CUỘN TRANG
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(16, 43, 40, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(16, 43, 40, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
});