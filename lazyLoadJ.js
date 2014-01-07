/*
 * Load image lazy
 * 
 * https://page.kakao.com/store/kakaopage
 * Copyright 2014 'J' in Podotree, Inc.
 * Email : jj81.corp@gmail.com
 * Released under the MIT license
 * Date: 2014-01-03
 * version : 2.0
 */

// @ model
function lazyLoadJ(targetName, wheelSpeed) {
	this.el = document.getElementsByClassName(targetName);
	this.size = this.el.length;
	this.map = [];
	this.viewRange = {};
	this.speedAvaliable = true;
}

lazyLoadJ.prototype = {
		
		initiate : function () {
			var idx = 0;
			do {
				if(! this.el[idx].getAttribute("original-data") ) throw " image element\'s maybe lost original data.";
				this.map.push({
			    	value : this.getOffset(this.el[idx]).top,
			    	status : false
				});
				idx++;
			} while (idx < this.size)
			
			this.availableViewRange();	
		},
		
		getOffset : function ( el ) {
		    var _x = 0, _y = 0;
		    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		        _x += el.offsetLeft - el.scrollLeft;
		        _y += el.offsetTop - el.scrollTop;
		        el = el.offsetParent;
		    }
		    return { top: _y, left: _x };
		},
		
		availableViewRange : function ()
		{
			isStartArea = parseInt( document.body.scrollTop || document.documentElement.scrollTop );
			isEndArea = isStartArea + parseInt( window.innerHeight );
			this.viewRange =  {startEnd : isStartArea, stopEnd : isEndArea};
		},
		
		checkMouseWheelSpeed : function (speed)
		{
			if(Math.abs(event.wheelDelta) <= speed) this.speedAvaliable = true;
			else this.speedAvaliable = false;
		},
		
		findImageAvaliable : function ()
		{
			var tmp = [];
			for(var i = 0; i < this.map.length; i++ ) {
				if( this.viewRange.startEnd <= this.map[i].value && this.map[i].value <= this.viewRange.stopEnd ) 
					if(this.speedAvaliable == true && this.map[i].status == false)  tmp.push(i);
			}
			return tmp;
		},
		
		doLazyLoad : function (imageIndex) {
			if(imageIndex instanceof Array) {
				for(var i=0;i < imageIndex.length; i++) {
					this.el[imageIndex[i]].setAttribute("src", this.el[imageIndex[i]].getAttribute("original-data"));
					this.map[imageIndex[i]].status;
				}
			} else {
				this.el[imageIndex].setAttribute("src", this.el[imageIndex].getAttribute("original-data"));
				this.map[imageIndex].status;
			} 
		}		
};
