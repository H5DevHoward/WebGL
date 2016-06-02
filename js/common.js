function startAd() {
	
}


var HW_CM = {};

HW_CM.selector = 'preload';
HW_CM.done = function(){};

HW_CM.preloadImgs = function(selector, done) {
  var images = [];
  var imgLen, currentIndex = 0;
  imgLen = $(selector).length;
  $(selector).each(function(index, item) {
    images[index] = new Image();
    images[index].addEventListener('load', function() {
      $(item).append('<img src="'+images[index].src+'">');
      if (++currentIndex == imgLen) {
        done();
      }
    });

    images[index].src = $(item).data('source');
  });

  // $('.preload').each(function() {
  //     var $this = $(this);
  //     var src = $this.data('source');
  //
  //     var img = $('<img>').attr({
  //         src: src,
  //         alt: ''
  //     });
  //
  //     $this.append(img);
  // });
}
