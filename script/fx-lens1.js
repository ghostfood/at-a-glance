$(window).load(function(){
  for (var i = 25; i < 100; i++) {
      var circlesW = $('.circles').width(),
          size = Math.floor(Math.random() * circlesW),
          borderW = Math.floor(Math.random() * 16),
          hue = Math.floor(Math.random() * 255) + 255,
          opac = Math.floor(Math.random() * 2) + 1,
          duration = Math.floor(Math.random() * 512) + 16,
          directions = ['normal','reverse'],
          direction = directions[Math.floor(Math.random() * directions.length)],
          borders = ['border-top-color','border-right-color','border-bottom-color','border-left-color'],
          border = borders[Math.floor(Math.random() * borders.length)];
      $('.circles').append('<div class="circle c'+ i +'"></div>');
      $('.c' + i).css({
          'width': size + 'px',
          'height': size + 'px',
          'border-width': borderW + 'px',
          'animation': 'z ' + duration + 's linear infinite '+ direction
      });
      $('.c' + i).css(border, 'rgba(' + hue + ',' + hue + ',' + hue + ', 0.' + opac + ')');
  }
});