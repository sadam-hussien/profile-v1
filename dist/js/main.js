"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(function () {
  // fittext
  $(".intro .hi-text").fitText(0.3); // toggle active on navbar toggle button

  $(".main-header .toggle-navbar").on("click", function () {
    $(this).toggleClass("active"); // make the header full width

    $(this).parents(".main-header").toggleClass("active"); // hide the navbar

    $("nav").toggleClass("active"); // make the page full width

    $(".page-content").toggleClass("active");
  }); // navbar

  $("nav li").each(function () {
    $(this).on("click", function () {
      var section = $(this).data("section");
      $(this).addClass("active").siblings().removeClass("active");
      $("html, body").animate({
        scrollTop: $("." + section).offset().top - 100
      }, 700);
    });
  });

  function goToSection(click, section) {
    $(click).on("click", function () {
      $("html, body").animate({
        scrollTop: $(section).offset().top - 100
      }, 700);
    });
  } // go to about from go-to-about button


  goToSection(".intro .go-to-about", ".about"); // go to portfolio from go-to-portfolio button

  goToSection(".intro .go-to-portfolio", ".portfolio"); // add active on links when scroll it's just the section

  $(window).on("scroll", function () {
    var self = $(this);
    $("section").each(function () {
      if (self.scrollTop() >= $(this).offset().top - 200) {
        var arrOfClasses = $(this).attr("class").split(" ");
        arrOfClasses.forEach(function (item) {
          $("nav li").each(function () {
            if ($(this).data("section") == item) {
              $(this).addClass("active").siblings().removeClass("active");
            }
          });
        });
      }
    });
  }); // open full screen

  $(".main-header .full-screen").on("click", function () {
    $(this).toggleClass("full-screen-mode");

    if ($(this).hasClass("full-screen-mode")) {
      $(this).find(".full-screen-icon").attr("name", "scan-outline");
      openFullScreen();
    } else {
      $(this).find(".full-screen-icon").attr("name", "resize-outline");
      closeFullScreen();
    }
  }); // open full screen function

  function openFullScreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      /* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      /* IE/Edge */
      document.documentElement.msRequestFullscreen();
    }
  } // close full screen function 


  function closeFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  } // toggle theme (dark, light)


  $(".main-header .mode .theme-mode").on("click", function () {
    $(this).toggleClass("dark-mode");

    if ($(this).hasClass("dark-mode")) {
      $(this).find(".icon-mode").attr("name", "sunny-outline");
      $(this).find("span").text("light");
    } else {
      $(this).find(".icon-mode").attr("name", "moon-outline");
      $(this).find("span").text("dark");
    } // theme mode


    $(".main-header").toggleClass("dark-theme-header");
    $(".page-content").toggleClass("dark-theme-site");
  }); // move bg intro mousemove

  $(".intro").on("mousemove", function (e) {
    var axisX = e.pageX / 12,
        axisY = e.pageY / 12;
    $(this).find(".dots-img").css({
      "top": axisY,
      "left": axisX
    });
  }); // stats

  $('.about .stats-carousel').flickity({
    prevNextButtons: false,
    pageDots: false,
    arrows: false,
    wrapAround: true,
    autoPlay: true,
    initialIndex: 1
  }); // portfolio

  axios.get("https://5f7cc9f3834b5c0016b0595b.mockapi.io/works").then(function (res) {
    // store all data
    var works = res.data; // portfolio section

    var portfolioEl = $(".portfolio .items"); // get the titles or types of my works

    var tabs = works.map(function (item) {
      return item.tab;
    }); // what is number of tab

    var numberOfTab = {};

    var _iterator = _createForOfIteratorHelper(tabs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var tab = _step.value;

        if (!numberOfTab[tab]) {
          numberOfTab[tab] = 1;
        } else {
          numberOfTab[tab] += 1;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var trimTabs = _toConsumableArray(new Set(tabs)).sort(); // set the main div and the title


    trimTabs.forEach(function (item) {
      portfolioEl.html(portfolioEl.html() + "\n\n                <div class=\"".concat(item, "-projects single-project\">\n\n                    <div class=\"project-title-wrapper\">\n                        <h6 class=\"projects-title float-right\">").concat(item, " ").concat(numberOfTab[item], "</h6>\n                    </div>\n\n                    <div class=projects-wrapper>\n                        <div class=portfolio-carousel id=").concat(item, ">\n\n                        </div>\n                    </div>\n\n                </div>\n\n            "));
    }); // add the same projects in section

    var _loop = function _loop(i) {
      var find = trimTabs.find(function (item) {
        return item == works[i].tab;
      });
      $(".portfolio .portfolio-carousel").each(function () {
        if ($(this).attr("id") == find) {
          $(this).html($(this).html() + "\n\n                        <div class=\"carousel-cell\">\n                            <div class=\"my-single-work\">\n                                <img src=".concat(works[i].img, " alt=\"").concat(works[i].name, "\" class=\"img-fluid\">\n\n                                <div class=\"single-work-body\">\n\n                                    <div class=\"project-details\">\n                                        <h4 class=\"text\">").concat(works[i].name, "</h4>\n                                    </div>\n\n                                    <div class=\"project-link\">\n                                        ").concat(works[i].link ? "<a href=" + works[i].link + " target='_blank' class='my-btn'>visit<ion-icon name='arrow-forward-outline' class='icon'></ion-icon></a>" : "<button class='my-btn'>img only</button>", "\n                                    </div>\n\n                                </div>\n                            </div>\n                        </div>\n                        \n\n                    "));
        }
      });
    };

    for (var i = 0; i < works.length; i++) {
      _loop(i);
    }

    $('.portfolio-carousel').flickity({
      // prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      autoPlay: true,
      initialIndex: 1
    });
  });
});