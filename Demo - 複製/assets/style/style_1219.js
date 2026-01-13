document.addEventListener("DOMContentLoaded", () => {
  const headerWrapper = document.querySelector(".header-wrapper");
  const dropdownMegaItems = document.querySelectorAll(".dropdown-mega");

  // --- Custom Menu Button JS ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const offcanvasElement = document.getElementById("offcanvasNavbar");

  if (mobileMenuBtn && offcanvasElement) {
    // 當 offcanvas 被開啟時，為按鈕添加 active 類別 (變成 X)
    offcanvasElement.addEventListener("show.bs.offcanvas", function () {
      mobileMenuBtn.classList.add("active");
    });
    // 當 offcanvas 被關閉時，移除按鈕的 active 類別 (變回漢堡)
    offcanvasElement.addEventListener("hide.bs.offcanvas", function () {
      mobileMenuBtn.classList.remove("active");
    });
  }
  // --- 結束 Custom Menu Button JS ---

  // --- 動態計算 Header 高度 ---
  const updateHeaderHeight = () => {
    if (headerWrapper) {
      const height = headerWrapper.offsetHeight;
      // 將高度寫入 CSS 變數
      document.documentElement.style.setProperty("--sw-header-height", `${height}px`);
    }
  };
  // 初始化與 Resize 時執行
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
  // ---------------------------------
  if (window.innerWidth >= 992) {
    dropdownMegaItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        headerWrapper.classList.add("menu-active");
      });
      item.addEventListener("mouseleave", () => {
        setTimeout(() => {
          const anyHovering = Array.from(dropdownMegaItems).some((i) => i.matches(":hover"));
          if (!anyHovering) {
            headerWrapper.classList.remove("menu-active");
          }
        }, 100);
      });
    });
  }
  const offcanvasElementResize = document.getElementById("offcanvasNavbar");
  if (offcanvasElementResize) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElementResize);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        if (offcanvasElementResize.classList.contains("show")) {
          offcanvas.hide();
        }
      }
    });
  }

  // Search Bar
  const openSearchBtn = document.getElementById("openSearchBtn");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const searchBar = document.getElementById("fullWidthSearch");
  const searchBodyOverlay = document.getElementById("searchBodyOverlay");
  const searchInput = document.querySelector(".search-input-field");

  // 統一處理開關的函數
  function toggleSearch(isOpen) {
    if (isOpen) {
      searchBar.classList.add("active");
      searchBodyOverlay.classList.add("active");

      // 延遲聚焦
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    } else {
      searchBar.classList.remove("active");
      searchBodyOverlay.classList.remove("active");
      searchInput.blur();
    }
  }
  // --- 1. 綁定開/關按鈕事件 ---
  // 點擊 Search Icon (放大鏡) 顯示
  if (openSearchBtn) {
    openSearchBtn.addEventListener("click", function (e) {
      e.preventDefault(); // 防止按鈕觸發其他行為
      toggleSearch(true);
    });
  }
  // 點擊 Close Icon (X) 隱藏
  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", function () {
      toggleSearch(false);
    });
  }
  // --- 2. 修正：監聽點擊外部關閉邏輯 ---
  // 監聽整個文件上的點擊事件
  document.addEventListener("click", function (event) {
    // 只有當搜尋框是開啟狀態時才進行判斷
    if (searchBar.classList.contains("active")) {
      // 檢查點擊的目標是否：
      // 1. 在搜尋框內部 (#fullWidthSearch 及其子元素)
      // 2. 或在開啟搜尋的按鈕 (#openSearchBtn)
      const isClickInsideSearchBar = searchBar.contains(event.target);
      const isClickOnOpenButton = openSearchBtn.contains(event.target);

      // 如果點擊目標不在搜尋框內部，且不在開啟按鈕上 (即點擊了外部區域)
      if (!isClickInsideSearchBar && !isClickOnOpenButton) {
        toggleSearch(false);
      }
    }
  });

  // 注意：舊的 body-overlay.addEventListener('click') 已經被移除，
  // 因為新的 document 監聽器已經包含點擊遮罩的功能。
});
