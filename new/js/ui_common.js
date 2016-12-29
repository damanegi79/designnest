"use strict";
(function ($){
    var nest = nest || function (){
    var pageAr = ["home", "service", "portfolio", "developement", "contact"];
    var currentPage = "";
    var oldPage = "";
    var firstFlag = true;
    var currentUrl = "";

    function loadPage() {
        chkAgent()

        var html = "";
//        console.log(currentPage)
        var url = currentPage.replace("#", "");
        console.log(url)
        $.get("/pages/"+url+".html?"+(Math.random()*999999999), function ( data ){

            var page = $(data);
            console.log(page)
            if(firstFlag)
            {
                $("#ajaxContainer").append(page);
                if(nest[url]) nest[url].init();
                firstFlag = false;
                oldPage = currentPage;
                TweenMax.to($('#ajaxContents'), 0.8, {transform:'translateX(0)', force3D:true, ease:Cubic.easeInOut});
//                if(url != "home")
//                {
//                    console.log('home_view')
//                    page.append(footer);
//                }
            }
            else
            {

                var outPage = $("#ajaxContents").size();
                console.log(outPage)
                var arrow = getMotionArrow(url);
                console.log(arrow)
                TweenMax.to(outPage, 1.5, {x:-($(window).width())*arrow,delay:1, force3D:true, onComplete:motionEnd});
                TweenMax.to($("#ajaxContents"), 0, {x:($(window).width()*0.5)*arrow, opacity:0});
                TweenMax.to($("#ajaxContents"), 1.5, {x:0, opacity:1, force3D:true, delay:2.5});
                $("#ajaxContainer").append(page);
                console.log('append end')
//                if(url != "home")
//                {
//                    page.append(footer.clone());
//                }
//
                function motionEnd()
                {
//                    if(url != "home") nest[url].init();
                    var oldUrl = oldPage.replace("#", "");
                    outPage.remove();
                    oldPage = currentPage;
//                    if(nest[oldUrl]) nest[oldUrl].dispos();

                }
                if(url=="home") setTimeout(function (){nest[url].init();}, 100);

            }
            currentUrl = url;

        });

    function getMotionArrow( url )
    {
        var prevIdx = pageAr.indexOf(currentUrl);
        var nextIdx = pageAr.indexOf(url);
        if(prevIdx < nextIdx) return 1;
        else                  return -1;
    }
}

    $(function (){
        currentPage = location.hash;
        if(currentPage == "") currentPage = "#home";
        $(window).on("hashchange", function ( e ){
            currentPage = location.hash;
            loadPage();
        });
        loadPage();
    });

}

    nest.home = (function (){
        console.log('home class start')
        return {
            init : function (){
                introText()
                //    motionFlag = true;
                console.log(motionFlag)
                svgDevice()
                mobileZoom()
                scrollbg()
            }
        }
    })();

    window.nest = nest;

})(jQuery);

var nest = new nest();


//$(window).on('hashchange', function() {
//    var pagelocation = location.hash.substring(1)
////    console.log(pagelocation)
//    $("#ajaxContainer").load('/pages/'+pagelocation+'.html #ajaxContents',function(){
//        setTimeout(function(){
////            init();
//        },1000)
//    });
//});

//$(document).ready(function() {
//    var pagelocation = location.hash.substring(1)
//    //    console.log(pagelocation)
//    if(pagelocation==''){
//        $("#ajaxContainer").load('/pages/home.html #ajaxContents',function(){
//            setTimeout(function(){
//                //            init();
//            },1000)
//        });
//    } else {
//        $("#ajaxContainer").load('/pages/'+pagelocation+'.html #ajaxContents',function(){
//            setTimeout(function(){
//                //            init();
//            },1000)
//        });
//    }
//});

$(window).load(function() {
    menu();
    $('#intro').fadeOut(1000);
})

function chkAgent(){
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        var caution = $('.browserCaution');
        TweenMax.to(caution,0,({display:'block',delay:1, onComplete:function(){
            TweenMax.to(caution,0.5,({bottom:'0px'}))
        }}))
    }
    $('.browserCaution .close button').on('click',function(){
        TweenMax.to(caution,0.5,({bottom:'-150px',onComplete:function(){
            TweenMax.to(caution,0,({display:'none'}))
        }}))
    })
}
function menu(){
    var content = $('#wrapper')
    var menuWrap = $('#menu_wrap')
    var menuOpen = $('.menuOpen')
    var menuClose = $('.menuClose')
    var menuLogo = $("#menuLogo")
    var svg = menuLogo.getSVG();
    var logopath = svg.find('path');
    var menuContainer = $('.menu_container')
    var content = $('.menu_contents');

    TweenMax.to(menuOpen,1.0,({left:'30px',ease: Power4.easeInOut,delay:0}))

    $(".menuOpen button").hover(function(){
        TweenMax.to(logopath,1.0,({fill:'#128dd4'}))
    },function(){
        TweenMax.to(logopath,1.0,({fill:'#fff'}))
    })
    $('.menuOpen button').on('click',function(){
        TweenMax.to(menuOpen,1.0,({left:'-200px',ease: Power4.easeInOut}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.2}))
        TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.4, onComplete:function(){
            TweenMax.to(menuClose,0.3,({transform:'translateX(0)',ease: Power4.easeInOut}))
        }}))
    })
    $('.menuClose button, #nav ul li a').on('click',function(){
        TweenMax.to(menuClose,0.3,({transform:'translateX(200px)',ease: Power4.easeInOut}))
        //            TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut}))
        TweenMax.to(content,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut,delay:0.2}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut,delay:0.4, onComplete:function(){
            TweenMax.to(menuOpen,0.5,({left:'30px',ease: Power4.easeInOut}))
            TweenMax.to(menuWrap,0,({transform:'translateX(-100vw)'}))
            TweenMax.to(menuContainer,0,({transform:'translateX(-100vw)'}))
            TweenMax.to(content,0,({transform:'translateX(-100vw)'}))
        }}))
    })
}
