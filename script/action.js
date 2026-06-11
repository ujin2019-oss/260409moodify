// 모바일 햄버거 드로어 메뉴
document.addEventListener('DOMContentLoaded', function () {
  var header   = document.querySelector('header');
  var toggle   = document.querySelector('.nav-toggle');
  var nav      = document.querySelector('header nav');
  var backdrop = document.querySelector('.nav-backdrop');
  var topset   = header ? header.querySelector('.topset') : null;
  var h1       = header ? header.querySelector('h1') : null;

  // ===== 라이트/다크 테마 토글 =====
  function syncThemeIcon() {
    var isLight = document.documentElement.classList.contains('light');
    document.querySelectorAll('.theme-toggle .material-symbols-outlined').forEach(function (i) {
      i.textContent = isLight ? 'dark_mode' : 'light_mode';   // 라이트면 '다크로' 아이콘, 다크면 '라이트로' 아이콘
    });
  }
  syncThemeIcon();
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nowLight = document.documentElement.classList.toggle('light');
      try { localStorage.setItem('theme', nowLight ? 'light' : 'dark'); } catch (e) {}
      syncThemeIcon();
    });
  });

  if (!toggle || !nav) return;

  var mq = window.matchMedia('(max-width: 768px)');

  // 모바일이면 검색/로그인 영역(.topset)을 드로어(nav) 최상단으로 이동,
  // PC면 원래 위치(로고 위)로 복원
  function arrange() {
    if (!topset) return;
    if (mq.matches) {
      if (topset.parentElement !== nav) nav.insertBefore(topset, nav.firstChild);
    } else {
      if (topset.parentElement === nav && h1) header.insertBefore(topset, h1);
      closeMenu();
    }
  }

  function setIcon(name) {
    var icon = toggle.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = name;
  }

  function openMenu() {
    nav.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.classList.add('no-scroll');
    setIcon('close');
    toggle.setAttribute('aria-label', '메뉴 닫기');
  }

  function closeMenu() {
    nav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('no-scroll');
    setIcon('menu');
    toggle.setAttribute('aria-label', '메뉴 열기');
  }

  // 햄버거 토글
  toggle.addEventListener('click', function () {
    if (nav.classList.contains('open')) closeMenu();
    else openMenu();
  });

  // 백드롭 클릭 시 닫기
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // 드로어 안 링크(메뉴/로그인 등) 클릭 시 닫기
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // 초기 배치 + 화면 폭 변경 대응
  arrange();
  if (mq.addEventListener) mq.addEventListener('change', arrange);
  else mq.addListener(arrange); // 구형 브라우저 호환
});
