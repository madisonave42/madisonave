/**
 * 롤링 class
 * @namespace 롤링 class
 * 
 */
Swipe = function( $banner ){
	
	this.$currentBanner;
	this.$nextBanner;
	this.currentIndex = 0;
	this.nextIndex;
	this.isMoving;
	this.bannerWidth;
	this.bannerSize;
	
	this.prevTouchedIndex;
	this.nextTouchedIndex;
	
	Swipe.prototype.swipeStart = function( $bannerItem, touchedIndex ){
		this.bannerSize = $bannerItem.length;
		this.bannerWidth = $bannerItem.width();
		this.currentIndex = touchedIndex;
		
		//console.log(touchedIndex);
		//console.log(this.bannerSize);
		//console.log(this.bannerWidth);
		
		// next
		if( this.currentIndex+2 > this.bannerSize ){ this.nextTouchedIndex = 0; }
		else{ this.nextTouchedIndex = this.currentIndex+1; }
		$bannerItem.eq( this.nextTouchedIndex ).css({left:this.bannerWidth});
		// prev
		if( this.currentIndex-1 < 0 ){ this.prevTouchedIndex = this.bannerSize-1; }
		else{ this.prevTouchedIndex = this.currentIndex-1; }
		$bannerItem.eq( this.prevTouchedIndex ).css({left:-this.bannerWidth});
	};
	
	Swipe.prototype.swipeMove = function( $bannerItem, distance ){
		$bannerItem.eq( this.currentIndex ).stop().animate({left:'-=' + distance}, 0);
		$bannerItem.eq( this.nextTouchedIndex ).stop().animate({left:'-=' + distance}, 0);
		$bannerItem.eq( this.prevTouchedIndex ).stop().animate({left:'-=' + distance}, 0);
	};
	
	Swipe.prototype.swipeUpDown = function( $bannerItem, distance ){
		$bannerItem.stop().animate({top:'-=' + distance}, 0);
		console.log( $bannerItem.position().top );
	};
	
	Swipe.prototype.swipeEnd = function( $bannerItem, $pageDot, diff ){
		
		if( Math.abs( diff ) > this.bannerWidth/4 ){
			
			// next
			if( diff > 0 ){
				$bannerItem.eq( this.currentIndex ).stop().animate({left:-this.bannerWidth, opacity:0}, 100);
				$bannerItem.eq( this.nextTouchedIndex ).stop().animate({left:0, opacity:1}, 100);
				
				$pageDot.find('a').removeClass('on');
				$pageDot.find('a').eq(this.nextTouchedIndex).addClass('on');
				
				this.currentIndex = this.nextTouchedIndex;
			// prev	
			} else {
				$bannerItem.eq( this.currentIndex ).stop().animate({left:this.bannerWidth, opacity:0}, 100);
				$bannerItem.eq( this.prevTouchedIndex ).stop().animate({left:0, opacity:1}, 100);

				$pageDot.find('a').removeClass('on');
				$pageDot.find('a').eq(this.prevTouchedIndex).addClass('on');
				
				this.currentIndex = this.prevTouchedIndex;
			}
			
		} else {
			
			$bannerItem.eq( this.currentIndex ).stop().animate({left:0}, 100);
			$bannerItem.eq( this.prevTouchedIndex ).stop().animate({left:-this.bannerWidth}, 100);
			$bannerItem.eq( this.nextTouchedIndex ).stop().animate({left:this.bannerWidth}, 100);
			
		}
		
		return this.currentIndex;
		
	};
	
	Swipe.prototype.swipeUpDownEnd = function( $bannerItem ){
		var topPosition;
		if( $bannerItem.position().top > 0 ){topPosition = 0;}
		//else if( $bannerItem.position().top < -320 ){topPosition = -300;}
		
		$bannerItem.stop().animate({top:topPosition}, 100);
	};
	

};