"use strict";

var motionFlag = false;
//$(document).ready(function() {
//    $(".pp-scrollable").niceScroll({
//        cursorcolor: "#424242", // change cursor color in hex
//        cursoropacitymin: 1, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
//        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
//        cursorwidth: "5px", // cursor width in pixel (you can also write "5px")
//        cursorborder: "1px solid #fff", // css definition for cursor border
//        cursorborderradius: "5px", // border radius in pixel for cursor
//        scrollspeed: 60,
//    });
//})
$(window).load(function() {
    menu();
})

$(window).load(function() {

    var startPage = 1;
    if(window.location.hash)
    {
        startPage = window.location.hash.substr(window.location.hash.length-1, window.location.hash.length);
    }
    $('#pagepiling').pagepiling({
//        menu: '#menu',
        anchors: ['page1', 'page2', 'page3', 'page4'],
        navigation: {
            'textColor': '#f2f2f2',
            'bulletsColor': '#ccc',
            'position': 'right',
            'tooltips': ['Page 1', 'Page 2', 'Page 3', 'Page 4']
        },
        afterRender: function(index, nextIndex, direction){
            $('#intro').fadeOut(1000);
            setTimeout(function(){
                if(startPage==1)
                {
                    introText()
                    motionFlag = true;
                }
                $('#pagepiling').pagepiling.moveTo(startPage);
            },100)



        },
        afterLoad: function(index, nextIndex, direction){
            if (nextIndex == 1) {
                if(motionFlag){
                    return;
                }
                else {
                    introText()
                    motionFlag = true;
                }

            }
            if (nextIndex == 2) {
                svgDevice();
            }
        },
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex != 1) {

            }
            if (nextIndex == 2) {

            }

            if (nextIndex == 2) {

                $('#arrow').hide();

                //fading out navigation bullets
                $('#pp-nav').fadeOut();

                $('#section2').find('.content').animate({
                    top: '0%'
                }, 700, 'easeInQuart');
            }

            //leaving our last section? The one with our normal site?
            if (index == 2) {
                $('#arrow').show();

                //fadding in navigation bullets
                $('#pp-nav').fadeIn();

                $('#section2 .content').animate({
                    top: '100%'
                }, 700, 'easeInQuart');
            }
        },
    });


    function introText(){
        text_ani()
        var logo = new TimelineLite();
        var tit = $(".intro_contents");
        var sub_tit = $(".sub_title");
        logo.to(tit, 1.0,{marginTop:0, opacity:1})
        logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(-20deg)'},1)
        logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(20deg)'},3.5)
        logo.to( tit, 1.0, {transform:'perspective(1000px) rotateX(0deg) rotateY(0deg) '})
        logo.from(sub_tit, 0.5, {opacity:0,transform:'perspective(1000px) rotateX(0deg) translateY(30px)',onComplete:function(){

            }

        })
    }

    function axis(){
        if($('#section1').hasClass('active')){
            $(".logo_content").bind("mousemove", moveLogo);
         } else {
             $(".logo_content").unbind("mousemove", moveLogo);
         }
    }
    function scrollfn(){
        var scrollDown = $(".scrollDown")
        var wheel = $(".scrollDown .ico_scroll");
        TweenMax.to( scrollDown, 1, {opacity:1,onComplete:function(){
            TweenMax.to( wheel, 1, {transform: 'translateY(20px)',repeat:-1, yoyo:true} );
        }} );
    }

    function moveLogo(e)
    {
        var pageX = e.pageX - $(".intro_wrap").offset().left;
        var pageY = e.pageY - $(".intro_wrap").offset().top;
        pageX = pageX - ($(".intro_wrap").width()/2);
        pageY = pageY - ($(".intro_wrap").height()/2); //-scrollY
        var percentX = pageX / ($(".intro_wrap").width()/2);
        var percentY = pageY / ($(".intro_wrap").height()/2);
        var rotationY = -15*percentX;
        var rotationX = 15*percentY;
        TweenMax.to($(".intro_contents"), 0.6, {rotationY:rotationY, rotationX:rotationX,x:rotationY*2, y:-rotationX*2});
    }
    function mob_gyro(){
        window.addEventListener('deviceorientation', handleOrientation);
        function handleOrientation(event) {
            var x = event.beta // In degree in the range [-180,180]
            var y = event.gamma // In degree in the range [-90,90]
            if (x >  30) { x =  30};
            if (x < -30) { x = -30};
            if (y >  30) { y =  30};
            if (y < -30) { y = -30};
            var rotationX = x
            var rotationY = y
            var moveY = rotationX;
            var moveX = rotationY;
            TweenMax.to($(".intro_contents"), 0.6, {rotationY:-moveX, x:moveX ,y:-moveY*1.5}); //rotationX:(moveY-30)*0.8,
            $(".console input.input01").val('y:'+moveY)
            $(".console input.input02").val('x:'+moveX)
        }
    }



    function text_ani(){
        var svg = $('#svg_logo').getSVG();
        var logopath = svg.find('path');
        var textsvg = $('#svg_text').getSVG();
        var textpath = textsvg.find("path");
        new Vivus('svg_logo',{duration: 200,type:'delayed'}, function (obj) {
            logopath.each(function(i){
                var self = this
                setTimeout(function(){
                    var logo = new TimelineLite();
                    logo.to(self, 0.2,{stroke:'none',delay:1})
                },i*200)
            })
        });
        setTimeout(function(){
            new Vivus('svg_text', {duration: 200,type:'oneByOne'}, function (obj) {
                textpath.each(function(i){
                    var self = this
                    setTimeout(function(){
                        var textlogo = new TimelineLite();
                        textlogo.to(self, 0.2,{stroke:'none'})
                    },i*200)
                })
            })
        },3000)


        setTimeout(function(){
            logopath.each(function(i){
                var self = this
                setTimeout(function(){
                    var logo = new TimelineLite();
                    logo.to(self, 1.0,{fill:'#128dd4'})
                    logo.to(self, 1.0,{fill:'#222'})
                },i*200)
            })
        },3500)
        setTimeout(function(){
            console.log('start')
            textpath.each(function(i){
                var self = this
                setTimeout(function(){
                    var textlogo = new TimelineLite();
                    textlogo.to(self, 1.0,{fill:'#128dd4'})
                    textlogo.to(self, 1.0,{fill:'#222',onComplete:function(){
                        TweenMax.to(logopath.eq(4), 0.5, {fill:'#128dd4'});
                        TweenMax.to(textpath.eq(5), 0.5, {fill:'#128dd4',x:'136%'});
                        //            TweenMax.to(textpath.eq(5), 0.5, { delay:2});
                        TweenMax.to(textpath.eq(6), 0.5, {x:'-136%'});
                    }})
                },i*200)
            })
            setTimeout(function(){
                mob_gyro()
                axis()
                scrollfn()
            },2000)
        },5000)
    }
    function svgDevice(){


        $('.work_article').on('inview', function(event, isInView) {
            if (isInView) {
                new Vivus('svg_device',{duration:200,start: 'autostart',type:'oneByOne', forceRender: false},function(){
                    deviceAxis()
                    TweenMax.to($('#img_device3,.img3'), 0.5, {opacity:1});
                    TweenMax.to($('#svg_device'), 0.5, {opacity:0});
                    //                    TweenMax.to($('#img_device2,.img2'), 0, {opacity:1,delay:1})
                    TweenMax.to($('.device-pos-2'), 0.3, {marginTop:'-10px',marginLeft:'-80%',opacity:1,delay:0.5});
                    //                    TweenMax.to($('#img_device1,.img1'), 0, {opacity:1,delay:1})
                    TweenMax.to($('.device-pos-1'), 0.3, {marginTop:'-30px',marginLeft:'85%',opacity:1, delay:0.5, onComplete:function(){

                                                        }
                    });

                })
                console.log('play')
            } else {
                console.log('out')
            }
        });


    }


    function deviceAxis(){
        var motionDeviceAxis = false;
        $(".project-01").bind("mouseover", function (){
            if(!motionDeviceAxis){
                motionDeviceAxis = true;
                $(".project-01").bind("mousemove", moveAxis);
                //            $(".work_info").bind("mousemove", moveAxis);
                //            TweenMax.to($(".work_info"), 0.6, {transform: "translateZ(50px)"});
                console.log('in')
            }
        });


        $(".project-01").bind("mouseleave", function (){
            motionDeviceAxis = false;
            TweenMax.to($('[data-role="moveTarget-1"]'), 1.0, {transform: "translateZ(0)",x:0, y:0});
            TweenMax.to($('[data-role="moveTarget-2"]'), 1.0, {transform: "translateZ(0)",x:0, y:0});
            TweenMax.to($('[data-role="moveTarget-3"]'), 1.0, {transform: "translateZ(0)",x:0, y:0});
//            TweenMax.to($(".work_info"), 0.6, {transform: "translateZ(0px)"});
            $(".project-01").unbind("mousemove", moveAxis);
//            $(".work_info").unbind("mousemove", moveAxis);
            console.log('out')
        });

    }

    function moveAxis(e){
        var pageX = e.pageX - $(".work_img_area").offset().left;
        var pageY = e.pageY - $(".work_img_area").offset().top;
        pageX = pageX - ($(".work_img_area").width()/2);
        pageY = pageY - ($(".work_img_area").height()/2);
        var percentX = pageX / ($(".work_img_area").width()/2);
        var percentY = pageY / ($(".work_img_area").height()/2);
        var rotationY = -10*percentX;
        var rotationX = 10*percentY;
        var xx = -10*percentX;
        var yy = -10*percentY;
        TweenMax.to($('[data-role="moveTarget-1"]'), 0.6, {x:xx,y:yy});
        TweenMax.to($('[data-role="moveTarget-2"]'), 0.6, {x:xx*1.5,y:yy*2.5});
        TweenMax.to($('[data-role="moveTarget-3"]'), 0.6, {x:xx*3,y:yy*4});
//        TweenMax.to($('.work_info'), 0.6, {rotationY:rotationY, rotationX:rotationX});

    }
//    $("#section2").scroll(function(){
//        var header = $("#section2 .header").height()
//        var winHeight = $(".project-01").height()
//        var sectionScroll = $("#section2").scrollTop()
//        var indicator01 = $(".project-01").position().top
//        console.log(sectionScroll*0.01,header)
//        TweenMax.to($('.bg'),0.1,{y:-(sectionScroll)*0.2})
//        if(sectionScroll>=header){
//            TweenMax.to($('.device_origin'),0.6,{y:-(sectionScroll-header)*0.5})
//        }
//    })

//    var zoom = false;
//    $(".img_zoom").on('click',function(){
//        var target = $(this).parent().parent()
//        if(zoom==false){
//            TweenMax.to(target,0.6,{scale:1.5})
//            $(this).addClass('active')
//            zoom=true;
//        }else if(zoom==true){
//            TweenMax.to(target,0.6,{scale:1})
//            $(this).removeClass('active')
//            zoom=false;
//        }
//
//
//    })





//    function menuStats(nextIndex){
//        var stats = new TimelineLite();
//        var menuOpen = $('.menuOpen');
//        var statsTxt = $('.menuOpen .stats');
//        var textInfo = $.pagepiling.index
//        console.log('index = ' + nextIndex)
//
//        stats.to(menuOpen, 1.0,{left:'-100px',ease: Power4.easeInOut})
//            .to(menuOpen, 1.0,{left:'10px',ease: Power4.easeInOut,afterFunction(){
//                statsTxt.text(nextIndex)
//            }})
//    }

});

function menu(){
    console.log('asdasd')
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
        TweenMax.to(menuOpen,1.0,({left:'-100px',ease: Power4.easeInOut}))
        //            TweenMax.to(content,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut, onComplete:function(){
            TweenMax.to(menuClose,0.5,({right:'10px',ease: Power4.easeInOut}))
        }}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.2}))

        TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.4}))
    })
    $('.menuClose button').on('click',function(){
        TweenMax.to(menuClose,1.0,({right:'-100px',ease: Power4.easeInOut}))
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


/* Scroll Magic Test */
//var scrollFunction = true;
//function scrollTest(){
//    scrollFunction = false;
//    var controller = new ScrollMagic.Controller();
//    var tween = TweenMax.to(".test_block", 2, {left: 200,backgroundColor:"rgba(0,0,0,0.5)",ease:Linear.easeNone,rotationZ: 360, marginTop:100})
//    new ScrollMagic.Scene({triggerElement: ".test_block",offset:0}) //,duration:100
//        .setTween(tween)
//        .addIndicators()
//        .addTo(controller)
//}
