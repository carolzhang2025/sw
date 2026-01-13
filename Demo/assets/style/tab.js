document.querySelectorAll(".acc-button").forEach((button) => {
  button.addEventListener("click", function () {
    // 僅在電腦版處理 active class
    if (window.innerWidth >= 992) {
      document.querySelectorAll(".acc-button").forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  function setMaxHeight() {
    const container = document.querySelector(".accordion-to-tabs");
    const panels = document.querySelectorAll(".acc-collapse");
    const isDesktop = window.innerWidth >= 992;
    // 1. 如果是手機版：清除高度限制，讓它自然伸縮
    if (!isDesktop) {
      container.style.minHeight = "";
      return;
    }
    // 2. 如果是電腦版：開始計算最高的高度
    let maxHeight = 0;

    panels.forEach((panel) => {
      // 暫存目前的 display 狀態
      const originalDisplay = panel.style.display;

      // 強制暫時顯示 (為了讓瀏覽器計算高度)
      // 使用 'block' 確保能抓到完整高度
      panel.style.display = "block";
      // 抓取高度 (scrollHeight 包含 padding)
      const h = panel.scrollHeight;
      // 更新最大值
      if (h > maxHeight) {
        maxHeight = h;
      }
      // 還原 display 狀態 (隱藏回去)
      panel.style.display = originalDisplay;
    });
    // 預設最小高 300px
    const finalHeight = Math.max(maxHeight, 300) + 0;

    // 4. 設定給父容器
    container.style.minHeight = finalHeight + "px";
  }
  // 畫面載入完成後執行
  setMaxHeight();
  // 圖片載入完成後再執行一次 (防止圖片撐開高度沒算到)
  window.addEventListener("load", setMaxHeight);
  // 視窗縮放時重新計算
  window.addEventListener("resize", setMaxHeight);
});
