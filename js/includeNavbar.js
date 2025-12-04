document.addEventListener('DOMContentLoaded', function() {
  var mount = document.getElementById('navbar');
  if (!mount) return;
  fetch('navbar.html')
    .then(function(res) { return res.text(); })
    .then(function(html) {
      mount.innerHTML = html;
      try {
        var current = (location.pathname.split('/').pop() || 'index.html');
        var links = mount.querySelectorAll('.nav a, .dropdown-menu a, .mobile-menu a');
        links.forEach(function(a) { a.classList.remove('active'); });
        var matched = null;
        links.forEach(function(a) {
          var href = a.getAttribute('href') || '';
          var file = href.split('#')[0];
          if (file === current) matched = a;
        });
        if (matched) {
          matched.classList.add('active');
          var parentDropdown = matched.closest('.nav-dropdown');
          if (parentDropdown) {
            var parentLink = parentDropdown.querySelector('.has-menu');
            if (parentLink) parentLink.classList.add('active');
          }
        }

        var toggle = mount.querySelector('.nav-toggle');
        var menu = mount.querySelector('.mobile-menu');
        function setOpen(open) {
          if (!menu || !toggle) return;
          toggle.classList.toggle('open', open);
          toggle.setAttribute('aria-expanded', String(open));
          if (open) {
            menu.hidden = false;
            menu.classList.add('open');
            document.body.style.overflow = 'hidden';
          } else {
            menu.classList.remove('open');
            menu.hidden = true;
            document.body.style.overflow = '';
          }
        }
        if (toggle) {
          toggle.addEventListener('click', function(){
            var isOpen = toggle.classList.contains('open');
            setOpen(!isOpen);
          });
        }
        if (menu) {
          menu.addEventListener('click', function(e){
            if (e.target.classList && e.target.matches('a')) setOpen(false);
          });
        }
        window.addEventListener('resize', function(){
          if (window.innerWidth > 900) setOpen(false);
        });
        document.addEventListener('keydown', function(e){
          if (e.key === 'Escape') setOpen(false);
        });
      } catch (e) {}
    })
    .catch(function() {
      mount.innerHTML = '<header class="site-header"><div class="container nav"><a href="index.html" class="logo"><span class="logo-mark"></span><span class="logo-text">Gadge Engineer and Contractor</span></a></div></header>';
    });
});
