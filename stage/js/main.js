$(function () {

    // fittext
    $(".intro .hi-text").fitText(0.3);

    // toggle active on navbar toggle button
    $(".main-header .toggle-navbar").on("click", function () {

        $(this).toggleClass("active");

        // make the header full width
        $(this).parents(".main-header").toggleClass("active");

        // hide the navbar
        $("nav").toggleClass("active");

        // make the page full width
        $(".page-content").toggleClass("active");

    });

    // navbar
    $("nav li").each(function () {

        $(this).on("click", function () {

            let section = $(this).data("section");
            
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

    }

    // go to about from go-to-about button
    goToSection(".intro .go-to-about", ".about");

    // go to portfolio from go-to-portfolio button
    goToSection(".intro .go-to-portfolio", ".portfolio");

    // add active on links when scroll it's just the section
    $(window).on("scroll", function () {

        let self = $(this);

        $("section").each(function () {

            if (self.scrollTop() >= $(this).offset().top - 200) {

                let arrOfClasses = $(this).attr("class").split(" ");

                arrOfClasses.forEach( item => {

                    $("nav li").each(function () {

                        if ($(this).data("section") == item) {

                            $(this).addClass("active").siblings().removeClass("active");

                        }

                    });

                });

            }

        });

    });

    // open full screen
    $(".main-header .full-screen").on("click", function () {

        $(this).toggleClass("full-screen-mode");

        if ($(this).hasClass("full-screen-mode")) {

          $(this).find(".full-screen-icon").attr("name", "scan-outline");

          openFullScreen();

        } else {

          $(this).find(".full-screen-icon").attr("name", "resize-outline");

          closeFullScreen();

        }


    });

    // open full screen function
    function openFullScreen () {

        if (document.documentElement.requestFullscreen) {

          document.documentElement.requestFullscreen();

        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */

          document.documentElement.mozRequestFullScreen();

        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */

          document.documentElement.webkitRequestFullscreen();

        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */

          document.documentElement.msRequestFullscreen();

        }

    }

    // close full screen function 
    function closeFullScreen () {

        if (document.exitFullscreen) {

          document.exitFullscreen();

        } else if (document.mozCancelFullScreen) { /* Firefox */

          document.mozCancelFullScreen();

        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */

          document.webkitExitFullscreen();
          
        } else if (document.msExitFullscreen) { /* IE/Edge */

          document.msExitFullscreen();

        }

    }

    // toggle theme (dark, light)
    $(".main-header .mode .theme-mode").on("click", function () {

        $(this).toggleClass("dark-mode");

        if ($(this).hasClass("dark-mode")) {

            $(this).find(".icon-mode").attr("name", "sunny-outline");

            $(this).find("span").text("light");

        } else {

            $(this).find(".icon-mode").attr("name", "moon-outline");

            $(this).find("span").text("dark");

        }

        // theme mode
        $(".main-header").toggleClass("dark-theme-header");
        $(".page-content").toggleClass("dark-theme-site");

    });

    // move bg intro mousemove
    $(".intro").on("mousemove", function (e) {

        let axisX = e.pageX / 12,

            axisY = e.pageY / 12;

        $(this).find(".dots-img").css({
          "top": axisY,
          "left": axisX
        });

    });

    // stats
    $('.about .stats-carousel').flickity({
        prevNextButtons: false,
        pageDots: false,
        arrows: false,
        wrapAround: true,
        autoPlay: true,
        initialIndex: 1,
    });

    // portfolio
    axios.get("https://5f7cc9f3834b5c0016b0595b.mockapi.io/works").then( res => {

        // store all data
        let works = res.data;

        // portfolio section
        let portfolioEl = $(".portfolio .items");

        // get the titles or types of my works
        let tabs = works.map( item => {

            return item.tab;

        });

        // what is number of tab
        let numberOfTab = {};

        for (let tab of tabs) {

            if (!numberOfTab[tab]) {

                numberOfTab[tab] = 1;

            } else {

                numberOfTab[tab] += 1;

            }
        }
        
        let trimTabs = [... new Set(tabs)].sort();

        // set the main div and the title
        trimTabs.forEach( item => {

            portfolioEl.html(portfolioEl.html() + `

                <div class="${item}-projects single-project">

                    <div class="project-title-wrapper">
                        <h6 class="projects-title float-right">${item} ${numberOfTab[item]}</h6>
                    </div>

                    <div class=projects-wrapper>
                        <div class=portfolio-carousel id=${item}>

                        </div>
                    </div>

                </div>

            `);

        });

        // add the same projects in section
        for (let i = 0; i < works.length; i++) {

            let find = trimTabs.find( item => item == works[i].tab);

            $(".portfolio .portfolio-carousel").each(function () {

                if ($(this).attr("id") == find) {

                    $(this).html($(this).html() + `

                        <div class="carousel-cell">
                            <div class="my-single-work">
                                <img src=${works[i].img} alt="${works[i].name}" class="img-fluid">

                                <div class="single-work-body">

                                    <div class="project-details">
                                        <h4 class="text">${works[i].name}</h4>
                                    </div>

                                    <div class="project-link">
                                        ${works[i].link ? "<a href="+ works[i].link +" target='_blank' class='my-btn'>visit<ion-icon name='arrow-forward-outline' class='icon'></ion-icon></a>" : "<button class='my-btn'>img only</button>"}
                                    </div>

                                </div>
                            </div>
                        </div>
                        

                    `);

                }

            });

        }

        $('.portfolio-carousel').flickity({

            // prevNextButtons: false,
            pageDots: false,
            wrapAround: true,
            autoPlay: true,
            initialIndex: 1,
  
        });

    });

});