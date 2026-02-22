(function(){
  const burger = document.querySelector('[data-burger]');
  const mobile = document.querySelector('[data-mobile]');

  if(burger && mobile){
    burger.addEventListener('click', () => {
      const open = mobile.getAttribute('data-open') === '1';
      mobile.setAttribute('data-open', open ? '0' : '1');
      mobile.style.display = open ? 'none' : 'block';
    });
    if(window.innerWidth < 821) mobile.style.display = 'none';
  }

  // active link highlight for page links (not hash links)
  const path = (location.pathname || '/').split('/').pop() || 'index.html';
  const links = document.querySelectorAll('a[data-nav]');
  links.forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if(href === path) a.classList.add('active');
  });
})();
