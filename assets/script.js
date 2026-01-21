
(function(){
  // Reveal on scroll
  const els = Array.from(document.querySelectorAll('section, .card, .panel, .stat'));
  els.forEach(el=>el.classList.add('reveal'));
  // Make first hero blocks appear immediately
  document.querySelectorAll('.hero .h-card, .hero .stat').forEach(el=>el.classList.add('fade-in'));

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -10% 0px'});

  els.forEach(el=>io.observe(el));


  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', id);
    });
  });

  // Lightbox
  const modal = document.getElementById('lightbox');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const closeBtn = document.getElementById('lightboxClose');

  function openModal(src, title){
    modal.classList.add('open');
    modalImg.src = src;
    modalTitle.textContent = title || 'Aperçu';
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.classList.remove('open');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  document.querySelectorAll('[data-lightbox]').forEach(el=>{
    el.addEventListener('click', ()=>{
      openModal(el.getAttribute('data-full'), el.getAttribute('data-title'));
    });
  });
})();
