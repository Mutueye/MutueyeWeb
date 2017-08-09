/* ========================================================================
 * Dolphin: popbox.js v0.0.1
 * 用于点击某元素弹出相应的提示框、模态窗口以及菜单等内容区域
 * ======================================================================== */

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory;
    } else {
        // Global
        factory();
    }

})(function($){
    'use strict';

    var toggle   = '[data-toggle="popbox"]';
    var backdrop = '.popbox-backdrop';
    var Popbox = function(){};

    function getParent($this) {
      var selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href');
        selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
      }

      var $parent = selector && $(selector);

      return $parent && $parent.length ? $parent : $this.parent();
    }

    function clearPopboxes(e) {
      if (e && e.which === 3) return;
      $(backdrop).remove();
      $(toggle).each(function () {
        var $this         = $(this);
        var $parent       = getParent($this);
        var relatedTarget = { relatedTarget: this };

        if (!$parent.hasClass('open')) return;

        if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;

        $parent.trigger(e = $.Event('hide.dp.popbox', relatedTarget));

        if (e.isDefaultPrevented()) return;

        $parent.removeClass('open').trigger($.Event('hidden.dp.popbox', relatedTarget));
      })
    }

    Popbox.prototype.dismiss = function(e){
        var $this = $(this);
        var $parent  = getParent($this);
        if( $parent.hasClass('open')){
            $parent.removeClass('open');
        }
    }

    Popbox.prototype.toggle = function(e){
        var $this = $(this);

        if ($this.is('.disabled, :disabled')) return;

        var $parent  = getParent($this);
        var isActive = $parent.hasClass('open');

        //alert($this.hasClass('no-clear'));
        //alert($(e.target).hasClass('no-clear'));
        if(!$this.hasClass('no-clear')){
            clearPopboxes();
        }

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $(document.createElement('div'))
                    .addClass('popbox-backdrop')
                    .insertAfter($(this))
                    .on('click', clearPopboxes);
            }
            var relatedTarget = { relatedTarget: this };
            $parent.trigger(e = $.Event('show.dp.popbox', relatedTarget));

            if (e.isDefaultPrevented()) return;

            $this.trigger('focus')

            $parent
                .toggleClass('open')
                .trigger($.Event('shown.dp.popbox', relatedTarget));
        }

        return false;
    };

    $(document)
        .on('click.dp.popbox.data-api', clearPopboxes)
        .on('click.dp.popbox.data-api', '.popbox form', function (e) { e.stopPropagation() })
        .on('click.dp.popbox.data-api', '.popbox-content form', function (e) { e.stopPropagation() })
        .on('click.dp.popbox.data-api', '.popbox-model', function (e) { e.stopPropagation() })
        .on('click.dp.popbox.data-api', '.dropdown-menu li', function(e){e.stopPropagation()})
        .on('click.dp.popbox.data-api', '.pagination', function(e){e.stopPropagation()})
        .on('click.dp.popbox.data-api', '.popbox-dismiss', Popbox.prototype.dismiss)
        .on('click.dp.popbox.data-api', toggle, Popbox.prototype.toggle);

});
