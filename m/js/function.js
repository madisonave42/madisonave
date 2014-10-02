/**
 * Madison class
 * @namespace Madison class
 * 
 */

Madison = function(){
	
	var contentWidth;
	var bannerWidth;
	var bannerSize;
	var bannerLength;
	
	var $currentBanner;
	var $nextBanner;
	
	var currentIndex = 0;
	var nextIndex;
	
	var prevTouchedIndex;
	var nextTouchedIndex;
	
	/*=====================================================================================
	 * init
	 ======================================================================================*/
	
	Madison.prototype.contentInit = function( $bannerItem ){
		
		var winHeight = $(window).height();
		contentWidth = $('.text_crop').width();
		
		$bannerItem.eq(currentIndex).css({left:0, opacity:1});
		$bannerItem.eq(currentIndex).siblings().css({left:contentWidth, opacity:0});
		
		$('.bg').hide();
		$('.bg').eq(currentIndex).show();

		$('.text_area').each(function(i){
			var contentHeight = $('.text_area').eq(i).height();
			$(this).css({'margin-top' : - ( $(this).height()/2 ) });
			$('.text_area.content_2').css({'margin-top' : 0});
		});
		
	};
	
	Madison.prototype.bgInit = function(){
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		
		if( (winWidth/winHeight) >= 1.6){
			$('.bg').removeClass('narrow');
			$('.bg').addClass('wide');
			$('.bg img').css({
				position:'relative',
				left:0,
				'margin-left': 0
			});
		} else {
			$('.bg').removeClass('wide');
			$('.bg').addClass('narrow');
			$('.bg img').css({
				position:'relative',
				left:'50%',
				'margin-left': -( $('.bg').eq(currentIndex).find('img').width()/2 )
			});
		}
	};
	
	/*=====================================================================================
	 * rolling
	 ======================================================================================*/
	Madison.prototype.setIndex = function($bannerItem, clickIndex){
		if( (clickIndex-currentIndex) > 0  ){
			if( Math.abs(clickIndex-currentIndex) == $bannerItem.length-1 ){
				Madison.prototype.moveRight($bannerItem, clickIndex);
			} else {
				Madison.prototype.moveLeft($bannerItem, clickIndex);
			}	
		} else {
			if( Math.abs(clickIndex-currentIndex) == $bannerItem.length-1 ){
				Madison.prototype.moveLeft($bannerItem, clickIndex);
			} else {
				Madison.prototype.moveRight($bannerItem, clickIndex);
			}	
		}
	};
	
	Madison.prototype.moveLeft= function($bannerItem, nextIndex){
		$currentBanner = $bannerItem.eq(currentIndex);
		$nextBanner = $bannerItem.eq(nextIndex);
		
		$currentBanner.stop().animate({left:-contentWidth, opacity:0}, 1000);
		$nextBanner.css({left:contentWidth});
		$nextBanner.stop().animate({left:0, opacity:1}, 1000);

		$('.bg').eq(currentIndex).fadeOut();
		$('.bg').eq(nextIndex).fadeIn();
		
		$('.page_area .current_page').html('0'+ (nextIndex+1) );
		
		$('.page_dot a').removeClass('on');
		$('.page_dot a').eq(nextIndex).addClass('on');
		
		currentIndex = nextIndex;
	};
	
	Madison.prototype.moveRight= function($bannerItem, nextIndex){
		$currentBanner = $bannerItem.eq(currentIndex);
		$nextBanner = $bannerItem.eq(nextIndex);
		
		$currentBanner.stop().animate({left:contentWidth, opacity:0}, 1000);
		$nextBanner.css({left:-contentWidth});
		$nextBanner.stop().animate({left:0, opacity:1}, 1000);

		$('.bg').eq(currentIndex).fadeOut();
		$('.bg').eq(nextIndex).fadeIn();
		
		$('.page_area .current_page').html('0'+ (nextIndex+1) );
		
		$('.page_dot a').removeClass('on');
		$('.page_dot a').eq(nextIndex).addClass('on');
		
		currentIndex = nextIndex;
	};
	
	
	
	/*=====================================================================================
	 * swipe
	 ======================================================================================*/
	Madison.prototype.swipeStart = function( $bannerItem, touchedIndex ){
		bannerSize = $bannerItem.length;
		bannerWidth = $bannerItem.width();
		currentIndex = touchedIndex;
		
		// next
		if( currentIndex+2 > bannerSize ){ nextTouchedIndex = 0; }
		else{ nextTouchedIndex = currentIndex+1; }
		$bannerItem.eq( nextTouchedIndex ).css({left:bannerWidth});
		// prev
		if( currentIndex-1 < 0 ){ prevTouchedIndex = bannerSize-1; }
		else{ prevTouchedIndex = currentIndex-1; }
		$bannerItem.eq( prevTouchedIndex ).css({left:-bannerWidth});
	};
	
	Madison.prototype.swipeMove = function( $bannerItem, distance ){
		$bannerItem.eq( currentIndex ).stop().animate({left:'-=' + distance}, 0);
		$bannerItem.eq( nextTouchedIndex ).stop().animate({left:'-=' + distance}, 0);
		$bannerItem.eq( prevTouchedIndex ).stop().animate({left:'-=' + distance}, 0);
	};
	
	Madison.prototype.swipeUpDown = function( $bannerItem, distance ){
		$bannerItem.stop().animate({top:'-=' + distance}, 0);
	};
	
	Madison.prototype.swipeEnd = function( $bannerItem, $pageDot, diff ){
		
		if( Math.abs( diff ) > bannerWidth/4 ){
			
			// next
			if( diff > 0 ){
				$bannerItem.eq( currentIndex ).stop().animate({left:-bannerWidth, opacity:0}, 300);
				$bannerItem.eq( nextTouchedIndex ).stop().animate({left:0, opacity:1}, 300);
				
				$pageDot.find('a').removeClass('on');
				$pageDot.find('a').eq(nextTouchedIndex).addClass('on');
				
				$('.bg').eq(currentIndex).fadeOut();
				$('.bg').eq(nextTouchedIndex).fadeIn();
				
				$('.page_area .current_page').html('0'+ (nextTouchedIndex+1) );
				
				currentIndex = nextTouchedIndex;
			// prev	
			} else {
				$bannerItem.eq( currentIndex ).stop().animate({left:bannerWidth, opacity:0}, 300);
				$bannerItem.eq( prevTouchedIndex ).stop().animate({left:0, opacity:1}, 300);

				$pageDot.find('a').removeClass('on');
				$pageDot.find('a').eq(prevTouchedIndex).addClass('on');
				
				$('.bg').eq(currentIndex).fadeOut();
				$('.bg').eq(prevTouchedIndex).fadeIn();
				
				$('.page_area .current_page').html('0'+ (prevTouchedIndex+1) );
				
				currentIndex = prevTouchedIndex;
			}
			
		} else {
			
			$bannerItem.eq( currentIndex ).stop().animate({left:0}, 300);
			$bannerItem.eq( prevTouchedIndex ).stop().animate({left:-bannerWidth}, 300);
			$bannerItem.eq( nextTouchedIndex ).stop().animate({left:bannerWidth}, 300);
			
		}
		
		return currentIndex;
		
	};
	
	Madison.prototype.swipeUpDownEnd = function( $bannerItem ){
		var topPosition;
		var wrapHeight = $('.content_2_wrap').height();
		var imgHeight = $('.content_frame').height();
		var maxTop = wrapHeight - imgHeight;
		
		if( $bannerItem.position().top > 0 ){topPosition = 0;}
		else if( $bannerItem.position().top < maxTop ){;topPosition = maxTop;}
		
		$bannerItem.stop().animate({top:topPosition}, 100);
	};
	

};