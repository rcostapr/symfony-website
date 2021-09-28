$(function () {
  $("#sendRequest").on("click", function () {
    let btn = $(this);
    let params = {
      type: "getArtigo",
      artigoid: btn.data("artigoid"),
    };
    sendRequestTo("/artigos/update", btn, params, function (data) {
      let container = btn.closest(".card-body");
      if (data.html) {
        container.append(data.html);
      }
    });
  });
});
