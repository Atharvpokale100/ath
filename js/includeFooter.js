document.addEventListener('DOMContentLoaded', function() {
  var mount = document.getElementById('footer');
  if (!mount) return;
  fetch('footer.html')
    .then(function(res) { return res.text(); })
    .then(function(html) { mount.innerHTML = html; })
    .catch(function() { mount.innerHTML = ''; });
});
