'use strict'
hexo.extend.filter.register('after_post_render', data => {
  const theme = hexo.theme.config;

  const cheerio = require('cheerio');

  const $ = cheerio.load(data.content, { decodeEntities: false });
  
  const images = $('img').not($('a>img'));

  if (theme.fancybox.enable) {
    images.each((i, o) => {
      var lazyload_src = $(o).attr('src') ? $(o).attr('src') : $(o).attr("data-src")
      var alt = $(o).attr('alt')
      if (alt !== undefined) {
        $(o).attr('title', alt)
      }
      var $a = $(
        '<a href="' +
        lazyload_src +
        '" data-fancybox="group" data-caption="' +
        $(o).attr('alt') +
        '" class="fancybox"></a>'
      )
      $(o).wrap($a)    
    });

  }
  if (theme.medium_zoom.enable) {
    var imgList = $(".justified-gallery img")  
    if (imgList.length) {
      imgList.each((i, o) => {
        var $a = $('<div></div>')
        $(o).wrap($a)
      })
    }  
  }

  if (!theme.medium_zoom.enable && !theme.fancybox.enable) {
    var imgList = $(".justified-gallery > p >img")  
    if (imgList.length) {
      imgList.each((i, o) => {
        $(o).wrap('<div></div>')
      })
    }  
  }

  // a标签后加上link图标
  const links = $('p a');
  links.each((i, o) => {
    var num = $(o).children().length
    if(num==0){
      $(o).addClass('layout_post_link')
    }
  });

  // const blockquotes = $('blockquote');
  // blockquotes.each((i, o) => {
  //   var text = $(o).text()
  //   if(text.startsWith("github")){

  //   }
    
  // });

  data.content = $.html();
}, 100);