$(document).ready(function(){
  $('.carousel').loadCarousel();
});

jQuery.fn.loadCarousel = function(){
  //Pre Variables
  var $imagesPre  = this.find('img');
  var $carousel   = this;
  var images      = [];
  var quantity    = $imagesPre.length;
  var bullets     = "";

  //Create Bullets
  $imagesPre.each(function(index, element){
    var imgAux = {
      'index' : index,
      'src'   : $(this).attr('src'),
      'title' : $(this).data('title'),
      'desc'  : $(this).data('desc')
    };
    $(this).replaceWith('<div class="image-box" data-index="'+imgAux.index+'"></div>');
    var $thisImageBox = $('.image-box[data-index='+index+']');
    $thisImageBox.append('<div class="carousel-img" style="background-image: url('+imgAux.src+')">');
    $thisImageBox.append('<div class="title">'+imgAux.title+'</div>');
    $thisImageBox.append('<div class="desc">'+imgAux.desc+'</div>');
    bullets += "<div class='bullet carousel-component' data-image-index='"+imgAux.index+"'></div>";
  });
  this.append('<div class="box-arrow left"><div class="arrow"><div><div>');
  this.append('<div class="box-arrow right"><div class="arrow"><div><div>');
  this.append('<div class="bullets">'+bullets+'</div>');
  //Set first bullet element as active
  this.find('.bullet').first().addClass('on');

  //Carousel Vars
  var $bullets  = this.find('.bullet');
  var $imageBox = this.find('.image-box');
  var $arrow    = this.find('.box-arrow');
  var touch     = false;
  var positionStart  = 0;
  var positionEnd    = 0;

  jQuery('.carousel-img').each(function(index, element){
    var imageWidth = $(this).closest('.image-box').width();
    var imgAux = {
      'index' : index,
      'src'   : $(this).attr('src'),
      'width' : imageWidth,
      'title' : $(this).data('title'),
      'desc'  : $(this).data('desc')
    };
    images.push(imgAux);
  });

  //Actions
  //bullets
  $bullets.bind('click',function(){
    fetchImage($(this));
  });
  //nav
  $arrow.bind('click',function(){
    var $bulletOn       = $('.bullet.on');
    var $isArrowLeft    = $(this).hasClass('left');
    var $bulletTarget   = null;

    if($isArrowLeft){
      $bulletTarget = $bulletOn.prev();
    }
    else{
      $bulletTarget = $bulletOn.next();
    }

    fetchImage($bulletTarget);
  });
  //image
  $imageBox.bind('click',function(){
    var index   = $(this).data('index');
    var $bullet = $('.bullet[data-image-index='+index+']');
    fetchImage($bullet);
  });
  //carousel
  $carousel.bind('touchstart', function(event) {
    positionStart = event.originalEvent.changedTouches[0].clientX;
  });
  $carousel.bind('touchend', function(event) {
    var $bulletOn = $('.bullet.on');
    positionEnd   = event.originalEvent.changedTouches[0].clientX;
    if(positionEnd < positionStart){
      fetchImage($bulletOn.next());
    }
    else if(positionEnd > positionStart){
      fetchImage($bulletOn.prev());
    }
  });

  //Functions
  function fetchImage(bullet){
    var index  = $(bullet).data('image-index');
    margin = -(((index-1)*80)+70);
    if(index == 1){
      margin = -(index*70);
    }
    $imageBox.first().css('margin-left',margin+'%');
    checkBullet(bullet);
  }

  function checkBullet(bullet){
    if(bullet.length > 0){
      $bullets.removeClass('on');
      bullet.addClass('on');
    }
  }
};
