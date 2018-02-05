
var isMobile = 0, isAppleMobile = 0;
var wh = 0, ww = 0, vw = 0, st = 0;

var sec1_top;
var sec2_top, sec2_h, sec2_plx_range;
var sec3_top;
var sec4_top, sec4_bot;
var sec5_rendering = 0, sec5_stage = 0;
var nun_sec_top, nun_sec_h, nun_plx_range;
var tip_titles;
var trailer_video_base_top, trailer_video_h, trailer_video_base_bottom;

var sec1_text_shown = 0,
    sec2_text_shown = 0,
    sec3_text_shown = 0,
    sec5_text_shown = 0;

// For looking up animations
var lookup_top = 0,
    lookup_height = 0,
    lookup_animating = 0;
var lookupTimer = 0,
    lookupTimer1 = 0,
    lookupSpeed = 60,
    lookup_frame = -1;
var lookup_frames = [];
var lookup_images = [
    'lookup/lookUp 01-min.jpg',
    'lookup/lookUp 02-min.jpg',
    'lookup/lookUp 03-min.jpg',
    'lookup/lookUp 04-min.jpg',
    'lookup/lookUp 05-min.jpg',
    'lookup/lookUp 06-min.jpg',
    'lookup/lookUp 07-min.jpg',
    'lookup/lookUp 08-min.jpg',
    'lookup/lookUp 09-min.jpg',
    'lookup/lookUp 10-min.jpg',
    'lookup/lookUp 11-min.jpg',
    'lookup/lookUp 12-min.jpg',
    'lookup/lookUp 13-min.jpg'
];

// For ryan animations
var ryan_top = 0,
    ryan_height = 0,
    ryan_animating = 0;
var ryanTimer = 0,
    ryanTimer1 = 0,
    ryanSpeed = 60,
    ryan_frame = -1;
var ryan_frames = [];
var ryan_images = [
    'ryan/hitman 01-min.jpg',
    'ryan/hitman 02-min.jpg',
    'ryan/hitman 03-min.jpg',
    'ryan/hitman 04-min.jpg',
    'ryan/hitman 05-min.jpg',
    'ryan/hitman 06-min.jpg',
    'ryan/hitman 07-min.jpg',
    'ryan/hitman 08-min.jpg',
    'ryan/hitman 09-min.jpg',
    'ryan/hitman 10-min.jpg',
    'ryan/hitman 11-min.jpg',
    'ryan/hitman 12-min.jpg',
    'ryan/hitman 13-min.jpg',
    'ryan/hitman 14-min.jpg',
    'ryan/hitman 15-min.jpg',
    'ryan/hitman 16-min.jpg',
    'ryan/hitman 17-min.jpg',
    'ryan/hitman 18-min.jpg',
    'ryan/hitman 19-min.jpg',
    'ryan/hitman 20-min.jpg',
    'ryan/hitman 21-min.jpg',
    'ryan/hitman 22-min.jpg',
    'ryan/hitman 23-min.jpg',
    'ryan/hitman 24-min.jpg',
    'ryan/hitman 25-min.jpg'
];


$(window).scroll(function (event) {
    st = $(this).scrollTop();

    if (st >= 100) {
        $('#scroll_top_arrow').fadeIn(1000);
    }
    else {
        $('#scroll_top_arrow').fadeOut(1000);
    }

    if (!isMobile) {
        // Scrolldown arrow
        if (st >= 100) {
            $('#scroll_down_arrow').fadeOut(1000);
        }
        else {
            $('#scroll_down_arrow').fadeIn(1000);
        }

        if (ww > 1200) {
            // Make Section2 parallax
            if (st + wh * 0.5 >= sec2_top && st < sec2_top + sec2_h) {
                tmp = st + wh * 0.5 - sec2_top;
                plx_offset = -200 / sec2_plx_range * tmp;

                if (!sec2_text_shown && (plx_offset <= -30 || st > sec2_top || st + wh > sec3_top)) {
                    sec2_text_shown = 1;
                    $('#sec2 .tip-number, #sec2 .sec-content').fadeIn(1000);
                }

                if (plx_offset < -100) plx_offset = -100;

                $('#sec2-bg1-img').css('bottom', plx_offset+'px');
            }


            // Make Nuns section parallax
            if (st + wh * 0.5 >= nun_sec_top && st < nun_sec_top + nun_sec_h) {
                tmp = st + wh * 0.5 - nun_sec_top;
                plx_offset = -200 / nun_plx_range * tmp;

                if (!sec5_text_shown && (plx_offset <= -35 || st > nun_sec_top || st + wh > lookup_top)) {
                    sec5_text_shown = 1;
                    $('#nuns-sec .tip-number, #nuns-sec .sec-content').fadeIn(1000);
                }

                plx_offset1 = plx_offset;
                plx_offset2 = plx_offset / 2;
                if (plx_offset1 < -100) plx_offset1 = -100;
                if (plx_offset2 < -100) plx_offset2 = -100;

                $('#nuns1-img').css('bottom', plx_offset1+'px');
                $('#nuns2-img').css('bottom', plx_offset2+'px');
            }


            // Animate Section4
            if (!sec5_rendering && sec5_stage < 2) {
                if (st + wh * 0.7 > sec4_top) {
                    w_offset = st + wh * 0.7 - sec4_top;

                    if (w_offset > 450)  {
                        w_offset = 450;
                        /*
                         $('#sec5').css('display', 'block');
                         sec5_rendering = 1;
                         sec5_stage = 1;
                         */
                        $('#sec4>.tip-number').fadeIn(500);
                        $('#sec4>.sec-content').fadeIn(500);
                    }
                    else {
                        /*
                         $('#sec5').css('display', 'none');
                         sec5_rendering = 0;
                         sec5_stage = 0;
                         */
                        $('#sec4>.tip-number').fadeOut(500);
                        $('#sec4>.sec-content').fadeOut(500);
                    }

                    $('#character1').css('transform', "translateX(-" + w_offset + "px)");
                    $('#character2').css('transform', "translateX(" + w_offset + "px)");
                }
                else {
                    $('#character1').css('transform', "translateX(0px)");
                    $('#character2').css('transform', "translateX(0px)");
                }
            }


            // Animate looking up animation only once when comes in viewport, ...
            if (!lookup_animating && lookup_frame == -1 && st + wh * 0.3 >= lookup_top) {
                lookup_animating = 1;
                lookup_frame++;

                lookupTimer = setInterval(function() {
                    if (lookup_frame < 0) lookup_frame = 0;
                    else if (lookup_frame >= 12) {  // Animation completed...
                        lookup_frame = 12;
                        clearInterval(lookupTimer);
                        lookup_animating = 0;

                        $('#lookup-ani-div img').css('filter', 'grayscale(100%)');
                        setTimeout(function(){
                            $('#lookup-sec .tip-number, #lookup-sec .sec-content').fadeIn(1000);
                        }, 500);
                    }

                    $('#lookup-ani-div img').css('opacity', '0');
                    $(lookup_frames[lookup_frame++]).css('opacity', '1');
                }, lookupSpeed);
            }
/*            else if (!lookup_animating && lookup_frame == 13 && st + wh * 0.3 < lookup_top) {
                lookup_animating = 1;
                lookup_frame--;

                $('#lookup-ani-div img').css('filter', 'grayscale(0%)');
                $('#lookup-sec .tip-number, #lookup-sec .sec-content').fadeOut(1000);

                lookupTimer1 = setInterval(function() {
                    if (lookup_frame > 12) { lookup_frame = 12; console.log('zzzzz');}
                    else if (lookup_frame <= 0) {  // Animation completed...
                        lookup_frame = 0;
                        clearInterval(lookupTimer1);
                        lookup_animating = 0;
                    }

                    $('#lookup-ani-div img').css('opacity', '0');
                    $(lookup_frames[lookup_frame--]).css('opacity', '1');
                }, lookupSpeed);
            }
*/


            // Animate ryan animation only once when comes in viewport, ...
            if (!ryan_animating && ryan_frame == -1 && st + wh * 0.3 >= ryan_top) {
                ryan_animating = 1;
                ryan_frame++;

                ryanTimer = setInterval(function() {
                    if (ryan_frame < 0) ryan_frame = 0;
                    else if (ryan_frame >= 24) {  // Animation completed...
                        ryan_frame = 24;
                        clearInterval(ryanTimer);
                        ryan_animating = 0;

                        $('#ryan-ani-div img').css('filter', 'grayscale(100%)');
                        setTimeout(function(){
                            $('#sec3 .tip-number, #sec3 .sec-content').fadeIn(1000);
                        }, 500);
                    }

                    $('#ryan-ani-div img').css('opacity', '0');
                    $(ryan_frames[ryan_frame++]).css('opacity', '1');
                }, ryanSpeed);
            }


            // Animate subtle movement for Tip titles
            for (var i = 0; i < tip_titles.length; i++) {
                var el = tip_titles[i];
                if (isElementInViewport(el)) {
                    var el_top = $(el).offset().top + parseFloat($(el).css('padding-top'));
                    y_offset = (st + wh - el_top) / 12;
                    if (y_offset > 115) y_offset = 115;

                    $(el).find('.number').css('transform', "translateY(" + y_offset + "px)");
                    $(el).find('.tip-desc').css('transform', "translateY(" + y_offset/3 + "px)");
                }
                else {
                    $(el).find('.number').css('transform', "translateY(0px)");
                    $(el).find('.tip-desc').css('transform', "translateY(0px)");
                }
            }
        }

        // Animate Section1.
        if (st + wh * 0.5 > sec1_top) {
            x_offset = (st + wh * 0.5 - sec1_top) / 25;

            if (!sec1_text_shown && (x_offset >= 5 || st > sec1_top || st + wh > sec2_top)) {
                sec1_text_shown = 1;
                $('#sec1 .tip-number, #sec1 .sec-content').fadeIn(1000);
            }
            if (x_offset > 50) {
                x_offset = 50;
            }

            $('#sec1-character1').css('transform', "translateX(-" + x_offset + "px)");
            $('#sec1-character2').css('transform', "translateX(" + x_offset + "px)");
        }
        else {
            $('#sec1-character1').css('transform', "translateX(0px");
            $('#sec1-character2').css('transform', "translateX(0px");
        }
    }


    if ((st + wh*0.1 >= trailer_video_base_top && st <= trailer_video_base_top + trailer_video_h*0.5) &&         // Video is in viewport
        $('#trailer-video').data('autoplay') == 1 && $('#trailer-video').data('is-playing') == 0) {
        videojs("trailer-video").play();
        $('#trailer-play-btn').css('display', 'none');
        $('#trailer-video').data('is-playing', '1');
    }
    else if ((st + wh*0.5 < trailer_video_base_top || st > trailer_video_base_top + trailer_video_h*0.5) &&      // Video is out of viewoport
        $('#trailer-video').data('autoplay') == 1 && $('#trailer-video').data('is-playing') == 1) {
        videojs("trailer-video").pause();
        $('#trailer-play-btn').css('display', 'block');
        $('#trailer-video').data('autoplay', '0');
        $('#trailer-video').data('is-playing', '0');
    }
});

$(document).ready(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobile = 1;
    }

    if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
        isAppleMobile = 1;
    }

    $(window).bind("resize", initializeAnimationArgs);
    $(window).bind("orientationchange", initializeAnimationArgs);

    // Load assets for looking up animation.
    preload(lookup_images, 'lookup-ani-div');
    lookup_frames = $('#lookup-ani-div').find('img');
    $(lookup_frames[0]).css('opacity', '1');

    // Load assets for ryan animation.
    preload(ryan_images, 'ryan-ani-div');
    ryan_frames = $('#ryan-ani-div').find('img');
    $(ryan_frames[0]).css('opacity', '1');

    if (!isMobile) {

    }


    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x

    $('body').bind(mousewheelevt, function (e) {
//        e.preventDefault();
//        e.stopPropagation();

        var st = $(window).scrollTop();
        var evt = window.event || e; //equalize event object
        evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
        var delta = evt.detail ? evt.detail * -40 : evt.wheelDelta; //check for detail first, because it is used by Opera and FF

        if (sec5_rendering && sec5_stage == 1) {
            var tx = $('#sec5-stage1').data('tx');
            tx += delta;

            if (tx <= -3720) {
                sec5_stage = 2;
                tx = -3720;
            }
            else if (tx >= 0) {
                $('#sec5').css('display', 'none');
                sec5_stage = 0;
                sec5_rendering = 0;
                tx = 0;
            }

            $('#sec5-stage1').css('transform', 'translateX(' + tx + 'px)');
            $('#sec5-stage1').data('tx', tx);

            e.preventDefault();
        }
        if (sec5_rendering && sec5_stage == 2) {
            $('#sec5-stage2').css('display', 'block');

            var scale = $('#five-mask').data('scale');
            scale += delta / -600;

            if (scale >= 3.6) {
                $('#sec5-stage2').css('background-image','url(./images/sec5-bg.jpg)');
                $('#five-mask').css('background-image','url(./images/05b.png)');

                $('#sec5-stage2 .tip-number').fadeIn(500);
                $('#sec5-stage2 .sec-content').fadeIn(500);

                // Adjust scroll top to sec4.
                $('html, body').stop().animate({
                    'scrollTop':  sec4_top //no need of parseInt here
                }, 1, 'swing', function () {});
            }
            else if (scale < 3.6 && scale >= 1.0){
                $('#sec5-stage2').css('background-image','none');
                $('#five-mask').css('background-image','url(./images/05a.png)');

                $('#sec5-stage2 .tip-number').fadeOut(500);
                $('#sec5-stage2 .sec-content').fadeOut(500);
            }
            else if (scale < 1.0) {
                scale = 1;
                sec5_stage = 1;
                $('#sec5-stage2').css('display', 'none');
            }

            if (scale >= 18.0 && sec5_rendering) {
                scale = 18.0;
                $('#five-mask').fadeOut(500);
                $('#sec5-stage2 .tip-number').fadeOut(500);
                $('#sec5-stage2 .sec-content').fadeOut(500);

                $('html, body').stop().animate({
                    'scrollTop':  sec4_bot //no need of parseInt here
                }, 1, 'swing', function () {});

                sec5_rendering = 0;
                sec5_stage = 3;
                $('#sec5-stage2').data('sticky-time', '0');
            }

            $('#five-mask').css('transform', 'scale(' + scale + ')');
            $('#five-mask').data('scale', scale);

            e.preventDefault();
        }
        else if (sec5_stage == 3 && sec4_bot >= st) {   // Disappearing Number 5 Mask Stage
            var sticky_time = $('#sec5-stage2').data('sticky-time');
            sticky_time = parseInt(sticky_time) + parseInt(delta / -120.0);

            if (parseInt(sticky_time) >= 4) {
                sticky_time = 4;
                $('#sec5').css('position', 'relative');
                $('#sec5-stage1').css('display', 'none');
            }
            else if (parseInt(sticky_time) <= 0) {
                sticky_time = 0;

                sec5_stage = 2;
                sec5_rendering = 1;

                $('#sec5').css('position', 'fixed');
                $('#sec5-stage1').css('display', 'block');

                $('#five-mask').fadeIn(500);
                $('#sec5-stage2 .tip-number').fadeIn(500);
                $('#sec5-stage2 .sec-content').fadeIn(500);
            }

            // If scroll down and sticky effect, ignore scroll event
            if (parseInt(sticky_time) < 4 && delta < 0) {
                e.preventDefault();
            }
            else if (delta > 0) {
                // Adjust scroll top to sec4.
                $('html, body').stop().animate({
                    'scrollTop':  sec4_bot //no need of parseInt here
                }, 1, 'swing', function () {});
                e.preventDefault();
            }
            $('#sec5-stage2').data('sticky-time', sticky_time);
        }

        return;
    }).keydown(function(e) {

        return;
    });

    // When you click video area, toggle playing status...
    $('.video-div').on('click',function (e) {
        e.preventDefault();

        $play_btn = $(this).find('button');
        is_playing = $(this).data('is-playing');
        if (is_playing == 1) {
            $play_btn.css('display', 'block');
            $(this).data('is-playing', '0');
            $(this).data('autoplay', '0');          // Remove auto play attribute when stops by clicking
        }
        else {
            $play_btn.css('display', 'none');
            $(this).data('is-playing', '1');
        }
    });

    // When you click Play button, ...
    $('.video-play-btn').on('click',function (e) {
        e.preventDefault();

        video_id = $(this).parent().attr('id');
        videojs(video_id).play();
        $(this).css('display', 'none');
        $(this).parent().data('is-playing', '1');

        return false;
    });

    // Navigate smoothly (INTRO, TIP1, 2, 3, 4, 5, 6)
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop':  $target.offset().top //no need of parseInt here
        }, 2000, 'swing', function () {
//            window.location.hash = target;
        });
    });
});


$(window).load(function() {

});


function loadPage() {
    $("#preloader").fadeOut(500);     // fade out the loading animation firstly

    setTimeout(function(){
        $('#cover-div').css('height', '0%');
        $('#spin_logo').animate({'opacity': '0'}, 1);
    }, 500);

    initializeAnimationArgs();

    // Animate Intro section
    $('#orange-diag-bg').delay(300).animate({'top': '0vw'});
    $('#intro-character').delay(1300).animate({'bottom': '0vw'}, 750);
    $('#bro-guid-title').delay(2050).animate({'opacity': '1'}, 1500);
    $('#social-share').delay(3550).animate({'opacity': '1'}, 500);
    $('#chapters-nav').delay(4050).animate({'opacity': '1'}, 250);
    $('#scroll_down_arrow').delay(4300).animate({'opacity': '1'}, 250);


    if (isMobile) {
        $('#scroll_down_arrow').css('display', 'none');

        //Section1 Animation
        $('#sec1 .tip-number, #sec1 .sec-content').removeClass('hidden');

        //Section2 Animation
        $('#sec2 .tip-number, #sec2 .sec-content').removeClass('hidden');

        //Section3 Animation
        $('#sec3 .tip-number, #sec3 .sec-content').removeClass('hidden');

        // Section4 animation
        $('#character1').css('transform', "translateX(-25vw)");
        $('#character2').css('transform', "translateX(25vw)");
        $('#sec4>.tip-number').fadeIn(500);
        $('#sec4>.sec-content').fadeIn(500);

        //Nuns Animation
        $('#nuns-sec .tip-number, #nuns-sec .sec-content').removeClass('hidden');

        // Lookup Anmation
        $('#lookup-ani-div img').css('opacity', '0');
        $(lookup_frames[12]).css('opacity', '1');
        $('#lookup-sec .tip-number, #lookup-sec .sec-content').removeClass('hidden');

        // Ryan Anmation
        $('#ryan-ani-div img').css('opacity', '0');
        $(ryan_frames[24]).css('opacity', '1');
        $('#sec3 .tip-number, #sec3 .sec-content').removeClass('hidden');

        // Disable cre animation for mobile devices.
        // Because this animation doesn't work properly inside iframe on iOS mobile devices.
        $('.cre-animate').css('transition', 'unset');
        $('.cre-animate').css(' -webkit-transition', 'unset');
    }
    else if (ww <= 1200){
        //Section2 Animation
        $('#sec2 .tip-number, #sec2 .sec-content').removeClass('hidden');

        // Section4 animation
        $('#character1').css('transform', "translateX(-25vw)");
        $('#character2').css('transform', "translateX(25vw)");
        $('#sec4>.tip-number').fadeIn(500);
        $('#sec4>.sec-content').fadeIn(500);

        //Nuns Animation
        $('#nuns-sec .tip-number, #nuns-sec .sec-content').removeClass('hidden');

        // Lookup Anmation
        $('#lookup-ani-div img').css('opacity', '0');
        $(lookup_frames[12]).css('opacity', '1');
        $('#lookup-sec .tip-number, #lookup-sec .sec-content').removeClass('hidden');

        // Ryan Anmation
        $('#ryan-ani-div img').css('opacity', '0');
        $(ryan_frames[24]).css('opacity', '1');
        $('#sec3 .tip-number, #sec3 .sec-content').removeClass('hidden');
    }

    if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
        // Need to consider scrolling based animations on iOS mobile devices,
        // because scroll event and position:fixed does not work in iFrame on iOS mobile.
    }
}


function initializeAnimationArgs() {
    wh = $(window).height();
    ww = $(window).width();
    vw = ww / 100;

    sec1_top = $('#sec1').offset().top;

    sec2_top = $('#sec2').offset().top;
    sec2_h = $('#sec2').height();
    sec2_plx_range =  wh * 0.5 + sec2_h;

    sec3_top = $('#sec3').offset().top;

    sec4_top = $('#sec4').offset().top;
    sec4_bot = sec4_top + $('#sec4').height();

    nun_sec_top = $('#nuns-sec').offset().top;
    nun_sec_h = $('#nuns-sec').height();
    nun_plx_range =  wh * 0.5 + nun_sec_h;

    lookup_top = $('#lookup-ani-div').offset().top;
    lookup_height = $('#lookup-ani-div').height();

    ryan_top = $('#ryan-ani-div').offset().top;
    ryan_height = $('#ryan-ani-div').height();

    tip_titles = document.querySelectorAll(".tip-number");

    // Get the trailer video pos after a while to get exact with new document height.
    var $trailer_video = $('#trailer-video');
    trailer_video_base_top = $trailer_video.offset().top;
    trailer_video_h = $trailer_video.height();
    trailer_video_base_bottom = trailer_video_base_top + trailer_video_h;
}


// Check if an element is in viewport
// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
function isElementInViewport(el) {
/*    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)// &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
*/
    var top = $(el).offset().top + parseFloat($(el).css('padding-top'));
    var height = $(el).height();
    return (top + height >= st &&
        top <= st + wh);
}


// Preload assets for animations
function preload(arrayOfImages, parent_id) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src', './images/ani/'+this).appendTo('#'+parent_id).addClass('ani-frame');
    });
}


function popupDlgCenterDual(url, title, w, h) {
// Fixes dual-screen position Most browsers Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    if (w > ww) w = ww - 20;
    if (h > wh) h = wh - 20;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

// Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

document.onreadystatechange = function(e) {
    if (document.readyState=="interactive") {
        var all_el = document.getElementsByTagName("*");

        $('#spin_logo').animate({'opacity': '1'}, 1000);

        setTimeout(function(){
            for (var i=0, max=all_el.length; i < max; i++) {
                check_element(all_el[i]);
            }
        }, 1000);
    }
}

function check_element(el) {
    var all_el = document.getElementsByTagName("*");
    var per_step = parseFloat(100 / all_el.length);

    if($(el).on()) {
        var prog_height = Number($('#cover-div').data('height')) + per_step;
        $('#cover-div').data('height', prog_height);

        $("#cover-div").animate({height:prog_height+"%"}, 1, function(){
            if($('#cover-div').height() >= $('#status_div').height()) {
                loadPage();
            }
        });
    }
    else {
        check_element(el);
    }
}
