document.addEventListener('DOMContentLoaded', function(){
  var cards = document.querySelectorAll('.floor-card');
  if (cards.length) {
    try {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add('in'); });
      }, { threshold: 0.15 });
      cards.forEach(function(c){ io.observe(c); c.style.cursor = 'zoom-in'; });
    } catch (e) {}
  }

  var modal = document.getElementById('imgModal');
  var modalImg = document.getElementById('imgModalImg');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.id = 'imgModal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
    var viewport = document.createElement('div');
    viewport.className = 'img-modal-viewport';
    modalImg = document.createElement('img');
    modalImg.id = 'imgModalImg';
    viewport.appendChild(modalImg);
    modal.appendChild(viewport);
    document.body.appendChild(modal);
  }

  function openModal(src, alt){
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.hidden = false;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    try { modal.focus(); } catch(e) {}
  }
  function closeModal(){
    if (!modal) return;
    modal.classList.remove('open');
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  cards.forEach(function(card){
    card.addEventListener('click', function(){
      var img = card.querySelector('img');
      if (img) openModal(img.src, img.alt);
    });
  });

  if (modal) {
    modal.addEventListener('click', function(e){
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeModal();
    });
  }

  // Reveal utility for sections
  try {
    var revealElems = Array.from(document.querySelectorAll('.section, .reveal'));
    var rio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    revealElems.forEach(function(el){ el.classList.add('reveal'); rio.observe(el); });
    var staggers = Array.from(document.querySelectorAll('.reveal-stagger'));
    staggers.forEach(function(container){
      var kids = Array.from(container.children);
      kids.forEach(function(k, i){ k.style.transitionDelay = (i * 0.08) + 's'; });
    });
  } catch (e) {}

  // Back to top button
  var btn = document.getElementById('backToTop');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.className = 'back-to-top';
    var icon = document.createElement('span');
    btn.appendChild(icon);
    document.body.appendChild(btn);
  }
  var toggleBtn = function(){
    if (window.scrollY > 300) btn.classList.add('show'); else btn.classList.remove('show');
  };
  window.addEventListener('scroll', toggleBtn);
  toggleBtn();
  btn.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Lazy load images if attribute missing
  Array.from(document.querySelectorAll('img')).forEach(function(img){
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });
});
