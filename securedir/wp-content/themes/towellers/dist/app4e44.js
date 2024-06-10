var $ = jQuery.noConflict();
let w = $(window);
let hb = $("html, body");

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.25,
};
let callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let imageUrl = entry.target.getAttribute("data-src");
      if (imageUrl) {
        entry.target.src = imageUrl;
        observer.unobserve(entry.target);
      }
    }
  });
};
let observer = new IntersectionObserver(callback, options);
let lazyImagesToLoad = document.querySelectorAll(".lazy-image");
lazyImagesToLoad.forEach((el) => {
  observer.observe(el);
});

var cssFiles = [
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css",
];

function loadCSSFilesAfterLoad() {
  cssFiles.forEach((file) => {
    var link = document.createElement("link");
    link.href = file;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen, print";

    document.getElementsByTagName("head")[0].appendChild(link);
  });
}

$(document).ready(function (e) {
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  let doc = $(document);
  let win = $(window);

  doc.ready(onReadyHandler);
  win.resize(onResizeHandler);

  function onReadyHandler() {
    setEqualHeight();
    // setStickyElements();
    navbar();
  }

  function onResizeHandler() {
    setEqualHeight();
  }

  // $dropdown.hover(
  //   function () {
  //     const $this = $(this);
  //     $this.addClass(showClass);
  //     $this.find($dropdownToggle).attr("aria-expanded", "true");
  //     $this.find($dropdownMenu).addClass(showClass);
  //   },
  //   function () {
  //     const $this = $(this);
  //     $this.removeClass(showClass);
  //     $this.find($dropdownToggle).attr("aria-expanded", "false");
  //     $this.find($dropdownMenu).removeClass(showClass);
  //   }
  // );

  // rellax js parralax
  // let parallax = $(".rellax");

  // if (w.width() > 769) {
  //   if (parallax && parallax.length > 0) {
  //     var rellax = new Rellax(".rellax");
  //   }
  // }

  // page load transition
  $("body").removeClass("load");

  // sal.js animations
  sal({
    threshold: 0.65,
    once: true,
  });

  // when the modal is opened autoplay it
  $(".video-btn").on("click", function (e) {
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr(
      "src",
      $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
    );
    $(".video-thumb, .play-icon, .video-btn").remove();
    $(".embed-responsive").removeClass("d-none");
  });
});

// GET PAGE QUERY PARAMS
function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

// PROCESS QUERY PARAMS
function transformToAssocArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}

var searchParams = getSearchParameters();

var pageTab = searchParams.tab ? searchParams.tab : "";

// active tab mentioned
if (pageTab.length > 0) {
  // hide all active tabs
  $(".tab-pane, .tab").removeClass("active show");
  let targetTab = $(`#${pageTab}`);
  // show selected tab
  targetTab.tab("show");
  $(`.tab[href="#${pageTab}"]`).addClass("active");
  $("html, bdoy").animate(
    {
      scrollTop: targetTab.offset().top - 120 + "px",
    },
    400
  );
}

function navbar() {
  let n = $(".navbar");

  document.documentElement.style.setProperty(
    "--navbar-height",
    n.outerHeight() + "px"
  );

  w.scroll(function (e) {
    if (w.scrollTop() > 50) {
      n.addClass("has-bg");
    } else {
      n.removeClass("has-bg");
    }
  });
}

function setStickyElements() {
  let sticky = $(".is-sticky-top");
  if (sticky) {
    for (i = 0; i < sticky.length; i++) {
      if ($(window).width() > 768) {
        $(sticky[i]).stick_in_parent({
          recalc_every: 10,
        });
      }
    }
  }

  $(".single-blog-stick").stick_in_parent({
    offset_top: 90,
    parent: ".article-author-share-meta",
    spacer: ".sticky-spacer",
  });
}

function setEqualHeight() {
  let heightContainer = $("[data-height]");
  for (let i = 0; i < heightContainer.length; i++) {
    let heightContainerName = $(heightContainer[i]).attr("data-height");
    let heightContainerHeight = $(heightContainer[i]).innerHeight();
    $('[data-height-target="' + heightContainerName + '"]').height(
      heightContainerHeight + "px"
    );
  }
}

// LAZY LOAD VIDEOS
document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll(".lazy-video"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy-video");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

// LAZY LOAD IMAGES
var lazyImages = document.querySelectorAll(".lazy-image");

window.onload = function () {
  loadCSSFilesAfterLoad();

  //  for (i = 0; i < lazyImages.length; i++) {
  //    lazyLoadImage(lazyImages[i]);
  //  }
};

function lazyLoadImage(img) {
  // img.src = img.dataset.src;
  // img.classList.remove('lazy-image');

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  };
  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.className === "lazy-image") {
        let imageUrl = entry.target.getAttribute("data-src");
        if (imageUrl) {
          entry.target.src = imageUrl;
          observer.unobserver(entry.target);
        }
      }
    });
  };
  let observer = new IntersectionObserver(callback, options);
  observer.observe(img);
}

// SET VIDEO BG IFRAME DIMENSIONS
var lazyIframes = document.querySelectorAll(".lazy-iframe");

for (i = 0; i < lazyIframes.length; i++) {
  lazyLoadIframe(lazyIframes[i]);
}

function lazyLoadIframe(iframe) {
  iframe.setAttribute("src", iframe.dataset.src);
}

// VIDEO AUTOPLAY FOR MODALS
let modals = $(".modal");

if (modals) {
  for (i = 0; i < modals.length; i++) {
    let iframe = $(modals[i]).find("iframe");
    // set data source for pause behaviour
    if (iframe) {
      iframe.attr("data-src", iframe.attr("src"));
    }
    // on modal show
    $(modals[i]).on("show.bs.modal", function (e) {
      iframe.attr(
        "src",
        iframe.attr("src") + "background=1&autoplay=1&byline=0&title=0"
      );
    });
    // on modal hide
    $(modals[i]).on("hide.bs.modal", function (e) {
      iframe.attr("src", iframe.attr("data-src"));
    });
  }
}

let csd_submit_btn = $("#csd-submit-track");

if (csd_submit_btn) {
  csd_submit_btn.click(function () {
    gtag_report_conversion();
  });
}

// In View
inView.threshold(0.25);

inView(".thread-anim, .img-border-wrapper, .h-divider").on("enter", (el) => {
  el.classList.add("active");
});

inView(".counter").on("enter", (el) => {
  const speed = 100000;
  const animate = () => {
    const value = +el.getAttribute("value");
    const data = +el.innerText;

    const time = value / speed;

    if (data < value) {
      el.innerText = Math.ceil(data + time);
      setTimeout(animate, 25);
    } else {
      el.innerText = value;
    }
  };
  animate();
});

// Custom marquee for about page
const marqueeItemsTop = document.querySelectorAll(".marquee-top .marquee-item");
const marqueeItemsBottom = document.querySelectorAll(
  ".marquee-bottom .marquee-item"
);

marqueeItemsTop.forEach((item) => {
  marquee(item, marqueeItemsTop);
});
marqueeItemsBottom.forEach((item) => {
  marquee(item, marqueeItemsBottom);
});

function marquee(item, marqueeItems) {
  function animate() {
    requestAnimationFrame(animate);

    const index = parseInt(item.getAttribute("data-index"));
    const styles = window.getComputedStyle(item);
    const matrix = new WebKitCSSMatrix(styles.transform);
    const marqueWidth = document.querySelector(".marquee-wrapper").offsetWidth;

    let x = matrix.m41;

    x = x - 1;

    if (x == -200) {
      // get all element's transforms
      let maxX = 0;
      marqueeItems.forEach((el) => {
        let newStyles = window.getComputedStyle(el);
        let newMatrix = new WebKitCSSMatrix(newStyles.transform);
        let newX = newMatrix.m41;

        if (newX > maxX) maxX = newX;
      });
      x = maxX + 200;
    }

    item.style.transform = `translateX(${x}px)`;
  }
  animate();
}

$('.video-wrapper img').hover(
    function(e) {
      let targetVdo = $(e.target).next('video');
      targetVdo.get(0).play();
    },
    function(e) {
      let targetVdo = $(e.target).next('video');
      targetVdo.get(0).pause();
      targetVdo.get(0).currentTime = 0;
    }
);