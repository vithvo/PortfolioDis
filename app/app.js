$(function () {
  // Works

  let filter = $("[data-filter]");
  filter.on("click", function (event) {
    event.preventDefault();
    let cat = $(this).data("filter");

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat");

        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  // Modal windows
  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  modalCall.on("click", function (event) {
    event.preventDefault();
    let $this = $(this);
    let modalId = $(this).data("modal");

    $(modalId).addClass("show");
    $("body").addClass("no-scroll");
    setTimeout(function () {
      $(modalId).find(".modal__dialog").css({
        transform: "rotateX(0)",
      });
    }, 200);

    $("#worksSlider").slick("setPosition");
  });

  modalClose.on("click", function (event) {
    event.preventDefault();
    let $this = $(this);
    let modalParent = $(this).parents(".modal");

    modalParent.find(".modal__dialog").css({
      transform: "rotateX(90deg)",
    });
    setTimeout(function () {
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal").on("click", function (event) {
    let $this = $(this);

    event.preventDefault();
    $this.find(".modal__dialog").css({
      transform: "rotateX(90deg)",
    });

    setTimeout(function () {
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation();
  });

  // Slider   https://kenwheeler.github.io/slick/

  $('[data-slider="slick"]').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
  });

  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSLider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSLider.slick("slickPrev");
  });
  $(".slickNext").on("click", function (event) {
    event.preventDefault();
    let currentSLider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSLider.slick("slickNext");
  });

  // MOBILE nav

  const navToggle = $("#navToggle");
  const nav = $("#nav");

  navToggle.on("click", function (event) {
    event.preventDefault();
    nav.toggleClass("show");
  });

  // Header and smoth scroll ======================================================================= //

  let header = $("#header");
  let intro = $("#intro");
  let introH = intro.innerHeight() - 100;
  let ScrollPos = $(window).scrollTop();
  let navH = $("#nav");

  checkScroll(ScrollPos, introH);

  $(window).on("scroll resize", function () {
    ScrollPos = $(this).scrollTop();

    checkScroll(ScrollPos, introH);
  });

  function checkScroll(ScrollPos, introH) {
    if (ScrollPos > introH) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  }

  // Smooth scroll

  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let elementId = $(this).data("scroll");
    let elementOffset = $(elementId).offset().top;

    navH.removeClass("show");

    console.log(elementOffset);

    $("html, body").animate(
      {
        scrollTop: elementOffset - 100,
      },
      700
    );
  });
});
