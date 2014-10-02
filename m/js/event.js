$(function(){
	
	// loader
	(function(){
		var count = 0;
		loaderID = setInterval(function(){
			if( count >= 38 ){count = 0;}
			$('.loading_image').css({'background-position': -(count*100) });
			count++;		
		}, 40);
		
		$(window).on('load', function(){
			setTimeout(function(){
				var $loader = $('.loader .loading_image');
				$loader.stop().hide();
				$('.loader').delay(500).fadeOut();
				$('.wrap').delay(500).fadeIn();
				setTimeout(function(){
					$('.loader').remove();
				}, 1000);
			}, 5000);
		});
	})();
	
	var $bannerItem = $('.text_area');
	
	var $swpObjContent = $('.text_area');
	var $swpObjClient = $('.content_frame');
	var $pageDot = $('.page_dot');
	
	var originalLeft = 0;
	var originalTop = 0;
	var originalPosition = 0;
	var oldLeft = 0;
	var oldTop = 0;
	var touchedIndex = 0;
	
	var madison = new Madison();
	
	// load
	$(window).on('load resize', function(){
		madison.contentInit( $bannerItem );
		madison.bgInit();
	});
	
	// click dot - page move
	$('.page_dot a').on('click', function(e){
		
		e.preventDefault();
		
		if($('.text_area').is(':animated')){return false;}
		var clickIndex = $(this).index();
		madison.setIndex( $bannerItem, clickIndex );
		
	});

	// swipe
	$swpObjContent.on('touchstart', function(e){
		
		touchedIndex = $(this).index();
		
		if( touchedIndex <5 ){
			e.preventDefault();
		}
		
		oldLeft = originalLeft = e.originalEvent.touches[0].clientX;
		oldTop = originalTop = e.originalEvent.touches[0].clientY;
		originalPosition = $(this).position().left;
		
		madison.swipeStart($swpObjContent, touchedIndex);
		
	});
	
	$swpObjClient.on('touchstart', function(e){
		e.preventDefault();
	});

	$swpObjContent.on('touchmove', function(e){
		var distanceX = oldLeft - e.originalEvent.touches[0].clientX;
		var distanceY = oldTop - e.originalEvent.touches[0].clientY;
		oldLeft = e.originalEvent.touches[0].clientX;
		oldTop = e.originalEvent.touches[0].clientY;
		var slope = distanceY / distanceX;
		if( Math.abs(slope) < 0.5 ) {
			e.preventDefault();
			madison.swipeMove( $swpObjContent, distanceX );
		} else {
			madison.swipeUpDown( $swpObjClient, distanceY );
		}
	});
	
	$swpObjContent.on('touchend', function(e){
		var diff = originalPosition - $(this).position().left;
		var nextIndex = madison.swipeEnd( $swpObjContent, $pageDot, diff );
		
		currentIndex = nextIndex;
	});
	
	$swpObjClient.on('touchend', function(e){
		madison.swipeUpDownEnd( $swpObjClient );
	});
	
});



