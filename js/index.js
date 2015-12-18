/**
 * Chargement d'une carte API en fond
 */
window.onload = function() {

	Geoportal.load(
		'backgroundMap',
		['ld0jgrlpaway88fw6u4x3h38'],
		{
			lon:8.70,
			lat:42.45
		},
		14,
		{
			type: 'js',
			viewerClass: Geoportal.Viewer.Simple,
			layers: ['GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD','ORTHOIMAGERY.ORTHOPHOTOS'],
			layersOptions: {'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD':{visibility:true,opacity:0.3},'ORTHOIMAGERY.ORTHOPHOTOS':{opacity:0.5}},
			overlays:{},
			geormUrl: './js/Geoportal/autoconf.js'
		}
	);
};

/**
 * If IE<11, static background map
 */ 
var UAString = navigator.userAgent;
if (UAString.indexOf('Trident') !== -1 && UAString.indexOf("rv:11") === -1)
{
    document.getElementById('backgroundMap').style.zIndex = '-1';
}

/**
 * Index scrolling
 */
function scrollIndex() {
    smooth_scroll_to(document.getElementById('indexMore').offsetTop-10,500);
}

/**
 * Smooth scrolling
 */
var smooth_scroll_to = function(target, duration) {
	target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        window.scrollTo(0,target);
        return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = window.pageYOffset;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    }

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        var previous_top = window.pageYOffset;

        // This is like a think function from a game loop
        var scroll_frame = function() {
            if(window.pageYOffset != previous_top) {
                reject("interrupted");
                return;
            }

            // set the scrollTop for this frame
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(start_top + (distance * point));
            window.scrollTo(0,frameTop);

            // check if we're done!
            if(now >= end_time) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if(window.pageYOffset === previous_top
                && window.pageYOffset !== frameTop) {
                resolve();
                return;
            }
            previous_top = window.pageYOffset;

            // schedule next frame for execution
            setTimeout(scroll_frame, 0);
        }

        // boostrap the animation process
        setTimeout(scroll_frame, 0);
    });
}