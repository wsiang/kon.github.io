
(function ($) {
  var attr = 'placeholder', nativeSupported = attr in document.createElement('input')

  $.fn.placeholder = function (options) {
    return this.each(function () {
      var $input = $(this)

      if ( typeof options === 'string' ) {
        options = { text: options }
      }

      var opt = $.extend({
        text     : '',
        style    : {},
        namespace: 'placeholder',
        hideOnFocus: true
      }, options || {})

      if ( !opt.text ) {
        opt.text = $input.attr(attr)
      }

      if ( nativeSupported ) {
        
        $input.attr(attr, opt.text)
        return
      }

      var width     = $input.width(), height = $input.height()
      var box_style = ['marginTop', 'marginLeft', 'paddingTop', 'paddingLeft', 'paddingRight','line-height']
      
      var show      = function () { $layer.show() }
      var hide      = function () { $layer.hide() }
      var is_empty  = function () { return !$input.val() }
      var check     = function () { is_empty() ? show() : hide() }
      
      var position  = function () {
        var pos = $input.position()
        if (!opt.hideOnFocus) {
          
          pos.left += 2
        }
        $layer.css(pos)
        $.each(box_style, function (i, name) {
		  if(name == 'line-height') {
			 $layer.css(name, '40px')
		  }else{
		     $layer.css(name, $input.css(name))
		  }
         
        })
      }

      var layer_style = {
          color     : 'gray',
          cursor    : 'text',
          textAlign : 'left',
          position  : 'absolute',
          textShadow: 'none',
          fontSize  : $input.css('fontSize'),
          fontFamily: $input.css('fontFamily'),
          display   : is_empty() ? 'block' : 'none'
      }
      
      // create
      var layer_props = {
        text  : opt.text,
        width : width,
        height: '40'
      }

      var ns = '.' + opt.namespace, $layer = $input.data('layer' + ns)
      if (!$layer) {
        $layer = $('<label>', layer_props)
          .attr('for', $input.attr('id'))
          .appendTo($input.offsetParent())
        
        $input.data('layer' + ns, $layer)
      }

      // activate
      $layer
      .css($.extend(layer_style, opt.style))
      .unbind('click' + ns)
      .bind('click' + ns, function () {
        opt.hideOnFocus && hide()
        $input.focus()
      })

      $input
      .unbind(ns)
      .bind('blur' + ns, check)

      if (opt.hideOnFocus) {
        $input.bind('focus' + ns, hide)
      }else{
        $input.bind('keypress keydown' + ns, function(e) {
          var key = e.keyCode
          if (e.charCode || (key >= 65 && key <=90)) {
            hide()
          }
        })
        .bind('keyup' + ns,check)
      }

      
      $input.get(0).onpropertychange = check

      position()
      check()
    })
  }

})(jQuery)