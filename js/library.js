$.datepicker.regional.pt = {
  closeText: "Fechar",
  prevText: "Anterior",
  nextText: "Seguinte",
  currentText: "Hoje",
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  weekHeader: "Sem",
  dateFormat: "dd/mm/yy",
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: "",
};
$.datepicker.setDefaults($.datepicker.regional.pt);
$.fn.select2.defaults.set("theme", "bootstrap4");
$.fn.select2.defaults.set("language", "pt");
Dropzone.autoDiscover = false;
$(function () {
  $("#adminmodal").on("hidden.bs.modal", function (e) {
    $(this).find(".modal-title").empty();
    $(this).find(".modal-body").empty();
    if (!$(this).find(".modal-dialog").hasClass("modal-xl")) {
      $(this).find(".modal-dialog").addClass("modal-xl");
    }
  });

  $(".btn-active").on("click", function () {
    toggleActive($(this));
  });

  registerRawData();
});

function registerRawData() {
  $(".btn-raw").on("click", function () {
    if ($(this).hasClass("btn-raw-up")) {
      $(this).removeClass("btn-raw-up");
      $(this).addClass("btn-raw-down");
    } else {
      $(this).removeClass("btn-raw-down");
      $(this).addClass("btn-raw-up");
    }
    let element = $(this).closest(".card").find(".card-body");
    $(element).slideToggle(500);
  });
}

function scrollTo(element) {
  if (element) {
    $("html,body").animate(
      {
        scrollTop: element.offset().top - $(window).height() / 2,
      },
      1000
    );
  }
}

function clearOptions(element) {
  let options = element.find("option");
  options.each(function (index) {
    option = $(this);
    if (option.val() == "") {
      option.prop("selected", true);
    } else {
      option.remove();
    }
  });
}

function sendRequestTo(url, btn, params, callback = null) {
  btn.addClass("btn-spin");
  $.ajax({
    type: "POST",
    url: url,
    data: params,
    dataType: "json",
    success: function (data) {
      btn.removeClass("btn-spin");
      if (data.error) {
        toastr.warning(data.error, "Aviso:");
        return false;
      }

      if (data.session) {
        toastr.error(data.session, "Sessão Expirou:");
        setTimeout(function () {
          location.replace("/");
        }, 2000);
        return false;
      }

      if (data.success === true) {
        if (callback) {
          callback(data);
        }
      }

      if (data.success === false) {
        toastr.error(data.info, "Aviso:", {
          onHidden: function () {
            if (data.location) {
              window.location.replace(data.location);
            }
          },
          timeOut: 800,
        });
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      btn.removeClass("btn-spin");
      let info = xhr.status + "<br>" + thrownError;
      toastr.error(info, "Aviso:");
    },
  });
}

function sendFormTo(url, formData, callback = null) {
  $.ajax({
    method: "POST",
    type: "POST",
    url: url,
    data: formData,
    enctype: "multipart/form-data",
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (data) {
      $(".btn-spin").removeClass("btn-spin");
      if (data.error) {
        console.log(data);
        toastr.warning(data.error, "Aviso:");
        return false;
      }

      if (data.session) {
        toastr.error(data.session, "Sessão Expirou:");
        setTimeout(function () {
          window.location("/");
        }, 2000);
        return false;
      }

      if (data.success === true) {
        if (callback) {
          callback(data);
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $(".btn-spin").removeClass("btn-spin");
      toastr.error(thrownError, "Error: " + xhr.status);
    },
  });
}

function getDataTableOptions() {
  return {
    dom: "lBfrtip",
    buttons: [
      { extend: "copy", className: "btn btn-copy" },
      { extend: "csv", className: "btn btn-csv" },
      { extend: "excel", className: "btn btn-excel" },
      { extend: "pdf", className: "btn btn-pdf" },
      { extend: "print", className: "btn btn-print" },
    ],
    language: {
      decimal: ".",
      emptyTable: "Sem Dados Disponíveis",
      info: "Mostrar _START_ até _END_ de _TOTAL_ registos",
      infoEmpty: "Sem Registos",
      infoFiltered: "(filtro de um total de _MAX_ registos)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostar _MENU_ Registos",
      loadingRecords: "Loading...",
      processing: "Processar...",
      search: "",
      zeroRecords: "Não foram encontrados registos",
      paginate: {
        previous: "&lt;",
        next: "&gt;",
        first: "&lt;&lt;",
        last: "&gt;&gt;",
      },
      aria: {
        sortAscending: ": Ordenar Ascendente",
        sortDescending: ": Ordenar Descendente",
      },
    },
    paging: false,
  };
}

function getSimpleDataTableOptions() {
  return {
    dom: "lBfrtip",
    buttons: [],
    language: {
      decimal: ".",
      emptyTable: "Sem Dados Disponíveis",
      info: "Mostrar _START_ até _END_ de _TOTAL_ registos",
      infoEmpty: "Sem Registos",
      infoFiltered: "(filtro de um total de _MAX_ registos)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostar _MENU_ Registos",
      loadingRecords: "Loading...",
      processing: "Processar...",
      search: "",
      zeroRecords: "Não foram encontrados registos",
      paginate: {
        previous: "&lt;",
        next: "&gt;",
        first: "&lt;&lt;",
        last: "&gt;&gt;",
      },
      aria: {
        sortAscending: ": Ordenar Ascendente",
        sortDescending: ": Ordenar Descendente",
      },
    },
    paging: false,
  };
}

function getToastrOptions() {
  return {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "400",
    hideDuration: "1000",
    timeOut: "3000",
    extendedTimeOut: "500",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    tapToDismiss: false,
  };
}

function toggleActive(btn) {
  btn.prop("disabled", true);
  let active = btn.data("active");
  let checkbox = btn.find(".far");
  btn.addClass("fa-spin");
  setTimeout(() => {
    btn.removeClass("fa-spin");

    checkbox.toggleClass("fa-check-square");
    checkbox.toggleClass("fa-square");

    if (checkbox.hasClass("fa-check-square")) {
      checkbox.css("color", "green");
    } else {
      checkbox.css("color", "red");
    }

    btn.data("active", active == "1" ? "0" : "1");

    btn.prop("disabled", false);
  }, 500);
}

function setActive(btn) {
  let active = btn.data("active");
  let checkbox = btn.find("[data-fa-i2svg]");

  if (active == "1") {
    checkbox.removeClass("fa-square");
    checkbox.addClass("fa-check-square");
    checkbox.css("color", "green");
  } else {
    checkbox.removeClass("fa-check-square");
    checkbox.addClass("fa-square");
    checkbox.css("color", "red");
  }
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

let getBase64File = (content, filename, type) => {
  var byteCharacters = atob(content);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], { type: type });

  let uriContent = URL.createObjectURL(blob);
  let link = document.createElement("a");
  link.setAttribute("id", "downloadfile");
  link.setAttribute("href", uriContent);
  link.setAttribute("download", filename);
  let event = new MouseEvent("click");
  link.dispatchEvent(event);
};

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

function bs_input_file() {
  $(".input-file").before(function () {
    if (!$(this).prev().hasClass("input-ghost")) {
      var element = $(
        "<input type='file' class='input-ghost' style='visibility:hidden; height:0'>"
      );
      element.attr("name", $(this).attr("name"));
      element.on("change", function () {
        element
          .next(element)
          .find("input")
          .val(element.val().split("\\").pop());
      });
      $(this)
        .find("button.btn-choose")
        .on("click", function () {
          element.trigger("click");
        });
      $(this)
        .find("button.btn-reset")
        .on("click", function () {
          element.val(null);
          $(this).parents(".input-file").find("input").val(null);
        });
      $(this).find("input").css("cursor", "pointer");
      $(this)
        .find("input")
        .on("mousedown", function () {
          $(this).parents(".input-file").prev().trigger("click");
          return false;
        });
      return element;
    }
  });
}

function limitChar(textarea) {
  let eldivcount = textarea.parent().find("div.countdown");
  let msg = textarea.val();
  let limit = 500;
  let current = limit - msg.length;
  $(eldivcount).html("#" + current);
  if (current < 0) {
    textarea.val(msg.substring(0, limit));
    $(eldivcount).html("#0");
  }
}

function dateRange(pickIni, pickEnd, update = false) {
  /**
   * Datepicker
   */
  const d = new Date();
  var d1 = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
  const today =
    ("0" + d.getDate()).slice(-2) +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    d.getFullYear();
  const nextYear =
    ("0" + d1.getDate()).slice(-2) +
    "-" +
    ("0" + (d1.getMonth() + 1)).slice(-2) +
    "-" +
    d1.getFullYear();

  pickIni.attr("readonly", true);
  pickEnd.attr("readonly", true);
  pickIni.css("cursor", "pointer");
  pickEnd.css("cursor", "pointer");

  if (!update) {
    pickIni.val(today);
    pickEnd.val(today);
  }

  let optionsIni = {
    showAnim: "slideDown",
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    minDate: -30,
    defaultDate: 0,
    onSelect: function (current, prev) {
      pickEnd.datepicker("option", "minDate", current);
    },
  };

  let optionsEnd = {
    showAnim: "slideDown",
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    minDate: -30,
    defaultDate: 0,
  };

  if (update) {
    optionsIni.defaultDate = pickIni.val();
    optionsEnd.defaultDate = pickEnd.val();
  }

  pickIni.datepicker(optionsIni);
  pickEnd.datepicker(optionsEnd);

  pickIni.on("change", checkValidDate);
  pickEnd.on("change", checkValidDate);
}

function checkValidDate() {
  let d = $(this);
  let darr = d.val().split("-");
  if (darr.length !== 3) {
    d.val("");
  }

  let day = parseInt(darr[0]);
  if (day < 1 || day > 31) {
    d.val("");
  }
  let month = parseInt(darr[1]) - 1;
  if (month < 0 || month > 12) {
    d.val("");
  }
  let year = parseInt(darr[2]);
  var d1 = new Date(year, month, day);
  if (d1 == "Invalid Date") {
    d.val("");
  }
}
