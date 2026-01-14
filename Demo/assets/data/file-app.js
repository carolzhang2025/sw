$(window).resize(function () {
  var gridElement = $("#grid");
  var newHeight = $(window).height() - gridElement.offset().top - 20; // 減去上方距離並留點邊距
  gridElement.height(newHeight);

  var grid = gridElement.data("kendoGrid");
  if (grid) {
    grid.resize(); // 強制 Kendo UI 重新計算佈局
  }
});

// 初始化後立即執行一次
$(window).trigger("resize");
$(document).ready(function () {
  $("#grid").kendoGrid({
    dataSource: {
      data: products,
      schema: {
        model: {
          fields: {
            productName: { type: "string" },
            fileType: { type: "string" },
            language: { type: "string" },
            updateDate: { type: "string" },
            downloadUrl: { type: "string" }, // 檔案路徑欄位
          },
        },
      },
      pageSize: 20,
    },
    // height: 550,
    scrollable: true,
    sortable: true,
    filterable: false,
    pageable: {
      input: true,
      numeric: false,
    },
    toolbar: ["search"],
    search: {
      fields: [
        { name: "productName", operator: "contains" },
        // { name: "fileType", operator: "contains" },
        // { name: "language", operator: "contains" },
        // { name: "updateDate", operator: "contains" },
      ],
    },
    columns: [
      // 新增序號欄位
      {
        title: "#",
        width: "35px",
        attributes: { style: "text-align: center;" },
        template: function (dataItem) {
          var grid = $("#grid").data("kendoGrid");
          var dataSource = grid.dataSource;
          var index = dataSource.indexOf(dataItem); // 目前資料在該頁的索引
          var page = dataSource.page(); // 目前頁碼
          var pageSize = dataSource.pageSize(); // 每頁筆數
          // 計算連續序號公式
          return (page - 1) * pageSize + (index + 1);
        },
      },

      { field: "productName", title: "Product Name" },
      { field: "fileType", title: "File Type", width: "180px" },
      { field: "language", title: "Language", width: "130px" },
      { field: "updateDate", title: "Update Date", width: "110px" },
      // 3. +++ 新增下載按鈕欄位 +++
      {
        title: "Download",
        width: "135px",
        attributes: { style: "text-align: center;" },
        // 使用 Template 產生 Kendo 樣式的按鈕
        template: function (dataItem) {
          return `<a href="${dataItem.downloadUrl}" 
                   class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" 
                   target="_blank" 
                   download>
                   <i class="fa-solid fa-file-arrow-down"></i>Download
                </a>`;
        },
      },
    ],
  });
});
