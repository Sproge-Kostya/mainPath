function formVal(){
      var form = jQuery('form#form-authorized');
      form.find('input').addClass('empty_field');
      
      function checkInput(){
        form.find('input').each(function(){
          if($(this).val() != ''){
            $(this).removeClass('empty_field');
            $('input#name, input#email, input#login, input#password').unbind().blur( function(){
            var id = $(this).attr('id');
            var val = $(this).val();
            var rv_name = /^[a-zA-Zа-яА-Я]+$/;
            var rv_login = /^[a-zA-Z0-9]+$/;
            var rv_email = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;
            var rv_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
            
             switch(id){
                  case 'name':
                      if(val.length > 1 && val != '' && rv_name.test(val)){
                        $(this).removeClass('error').addClass('not_error');
                        $('.name').removeClass('not-properly').addClass('correctly');
                        $(this).next('.error-box').empty()
                      }else{
                        $(this).removeClass('not_error').addClass('error');
                        $('.name').removeClass('correctly').addClass('not-properly');
                        $(this).next('.error-box').html('Не верный формат вводимых данных')
                                                  .animate({'paddingLeft':'10px'},400)
                                                  .animate({'paddingLeft':'5px'},400);
                  }break;
                  case 'login':
                      if(val.length > 1 && val != '' && rv_login.test(val)){
                        $(this).removeClass('error').addClass('not_error');
                        $('.login').removeClass('not-properly').addClass('correctly');
                        $(this).next('.error-box').empty()
                      }else{
                        $(this).removeClass('not_error').addClass('error');
                        $('.login').removeClass('correctly').addClass('not-properly');
                        $(this).next('.error-box').html('Не верный формат вводимых данных')
                                                  .animate({'paddingLeft':'10px'},400)
                                                  .animate({'paddingLeft':'5px'},400);
                  }break;
                  case 'email':
                      if(val.length > 4 && val != '' && rv_email.test(val)){
                        $(this).removeClass('error').addClass('not_error');
                        $('.email').removeClass('not-properly').addClass('correctly');
                        $(this).next('.error-box').empty()
                      }else{
                        $(this).removeClass('not_error').addClass('error');
                        $('.email').removeClass('correctly').addClass('not-properly');
                        $(this).next('.error-box').html('Не верный формат вводимых данных')
                                                  .animate({'paddingLeft':'10px'},400)
                                                  .animate({'paddingLeft':'5px'},400);
                  }break;
                  case 'password':
                      if(val.length > 7 && val != '' && rv_password.test(val)){
                        $(this).removeClass('error').addClass('not_error');
                        $('.password').removeClass('not-properly').addClass('correctly');
                        $(this).next('.error-box').empty()
                      }else{
                        $(this).removeClass('not_error').addClass('error');
                        $('.password').removeClass('correctly').addClass('not-properly');
                        $(this).next('.error-box').html('Не верный формат вводимых данных')
                                                  .animate({'paddingLeft':'10px'},400)
                                                  .animate({'paddingLeft':'5px'},400);
                  }break;
             }
           });
          }else{
            $(this).addClass('empty_field');
            $(this).removeClass('not_error');
          }
        });
      };

      function lightEmpty(){
          form.find('.empty_field').css({'border-color':'#d8512d'});
          setTimeout(function(){
          form.find('.empty_field').removeAttr('style');
          },500);
      };

      setInterval(function(){
        checkInput();
        var sizeEmpty = form.find('.empty_field').size();
        var btn = form.find('#send');

        if(sizeEmpty > 0){
            if(btn.hasClass('disabled')){
              return false;
            }else{
              btn.addClass('disabled');
              console.log("ifelse");
            }
        } else {
          btn.removeClass('disabled');
          console.log("else");
        }
      },1000);

      form.submit(function(event){
      event.preventDefault();
          if($('.not_error').length == 4){
            var str = form.serialize();
            $.ajax({
              type: 'POST',
              url: './php/send.php',
              data: str,
              success: function(html){
                $('.list-authorized').append(html);
             }
            });
            form.trigger('reset');
            $(".input-block").removeClass('correctly');
          }else{
            lightEmpty();
            return false;
          }
      });
};
formVal();

function notSubmit(){
  $('#notSubmit').submit(function(){
      return false;
  });
};

function Show_HidePassword(id, button) { 
  var element = document.getElementById(id)
  var inp = document.createElement("input")
    if (element.type == 'password') { 
      button.textContent = 'Скрывать пароль'; 
      inp.id = id; 
      inp.type = "text"; 
      inp.name = "password"; 
      inp.value = element.value; 
      element.parentNode.replaceChild(inp, element); 
    }else{ 
      button.textContent = 'Показывать пароль'; 
      inp.id = id; 
      inp.type = "password"; 
      inp.name = "password"; 
      inp.value = element.value; 
      element.parentNode.replaceChild(inp, element); 
    };
  inp.focus(); 
  inp.selectionEnd = inp.value.length; 
};

function Plagin(){
  if (typeof jQuery === 'undefined') {
    throw new Error('Error')
  }
  +function ($) {
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
      throw new Error('Error')
    }
  }(jQuery);
  +function ($) {
    var backdrop = '.dropdown-backdrop'
    var toggle   = '[data-toggle="dropdown"]'
    var Dropdown = function (element) {
      $(element).on('click.bs.dropdown', this.toggle)
    }
    Dropdown.VERSION = '3.3.7'
    function getParent($this) {
      var selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
      }

      var $parent = selector && $(selector)

      return $parent && $parent.length ? $parent : $this.parent()
    }

    function clearMenus(e) {
      if (e && e.which === 3) return
      $(backdrop).remove()
      $(toggle).each(function () {
        var $this         = $(this)
        var $parent       = getParent($this)
        var relatedTarget = { relatedTarget: this }

        if (!$parent.hasClass('open')) return

        if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

        $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

        if (e.isDefaultPrevented()) return

        $this.attr('aria-expanded', 'false')
        $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
      })
    }
    Dropdown.prototype.toggle = function (e) {
      var $this = $(this)
      if ($this.is('.disabled, :disabled')) return
      var $parent  = getParent($this)
      var isActive = $parent.hasClass('open')
      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
          $(document.createElement('div'))
            .addClass('dropdown-backdrop')
            .insertAfter($(this))
            .on('click', clearMenus)
        }

        var relatedTarget = { relatedTarget: this }
        $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

        if (e.isDefaultPrevented()) return

        $this
          .trigger('focus')
          .attr('aria-expanded', 'true')

        $parent
          .toggleClass('open')
          .trigger($.Event('shown.bs.dropdown', relatedTarget))
      }

      return false
    }
    Dropdown.prototype.keydown = function (e) {
      if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return
      var $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      var $parent  = getParent($this)
      var isActive = $parent.hasClass('open')

      if (!isActive && e.which != 27 || isActive && e.which == 27) {
        if (e.which == 27) $parent.find(toggle).trigger('focus')
        return $this.trigger('click')
      }

      var desc = ' li:not(.disabled):visible a'
      var $items = $parent.find('.dropdown-menu' + desc)

      if (!$items.length) return

      var index = $items.index(e.target)

      if (e.which == 38 && index > 0)                 index--         // up
      if (e.which == 40 && index < $items.length - 1) index++         // down
      if (!~index)                                    index = 0

      $items.eq(index).trigger('focus')
    }

    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data  = $this.data('bs.dropdown')

        if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
        if (typeof option == 'string') data[option].call($this)
      })
    }

    var old = $.fn.dropdown

    $.fn.dropdown             = Plugin
    $.fn.dropdown.Constructor = Dropdown

    $.fn.dropdown.noConflict = function () {
      $.fn.dropdown = old
      return this
    }
    $(document)
      .on('click.bs.dropdown.data-api', clearMenus)
      .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
      .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
      .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)
  }(jQuery);
   +function ($) {

    var Tab = function (element) {
      this.element = $(element)
    }
    Tab.VERSION = '3.3.7'
    Tab.TRANSITION_DURATION = 150
    Tab.prototype.show = function () {
      var $this    = this.element
      var $ul      = $this.closest('ul:not(.dropdown-menu)')
      var selector = $this.data('target')
      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
      }
      if ($this.parent('li').hasClass('active')) return
      var $previous = $ul.find('.active:last a')
      var hideEvent = $.Event('hide.bs.tab', {
        relatedTarget: $this[0]
      })
      var showEvent = $.Event('show.bs.tab', {
        relatedTarget: $previous[0]
      })
      $previous.trigger(hideEvent)
      $this.trigger(showEvent)
      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return
      var $target = $(selector)
      this.activate($this.closest('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $previous.trigger({
          type: 'hidden.bs.tab',
          relatedTarget: $this[0]
        })
        $this.trigger({
          type: 'shown.bs.tab',
          relatedTarget: $previous[0]
        })
      })
    }
    Tab.prototype.activate = function (element, container, callback) {
      var $active    = container.find('> .active')
      var transition = callback
        && $.support.transition
        && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)
      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
            .removeClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', false)
        element
          .addClass('active')
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }
        if (element.parent('.dropdown-menu').length) {
          element
            .closest('li.dropdown')
              .addClass('active')
            .end()
            .find('[data-toggle="tab"]')
              .attr('aria-expanded', true)
        }
        callback && callback()
      }
      $active.length && transition ?
        $active
          .one('bsTransitionEnd', next)
          .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
        next()

      $active.removeClass('in')
    }
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data  = $this.data('bs.tab')

        if (!data) $this.data('bs.tab', (data = new Tab(this)))
        if (typeof option == 'string') data[option]()
      })
    }
    var old = $.fn.tab
    $.fn.tab             = Plugin
    $.fn.tab.Constructor = Tab
    $.fn.tab.noConflict = function () {
      $.fn.tab = old
      return this
    }
    var clickHandler = function (e) {
      e.preventDefault()
      Plugin.call($(this), 'show')
    }
    $(document)
      .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
      .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)
  }(jQuery);

  +function ($) {

    var Collapse = function (element, options) {
      this.$element      = $(element)
      this.options       = $.extend({}, Collapse.DEFAULTS, options)
      this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                             '[data-toggle="collapse"][data-target="#' + element.id + '"]')
      this.transitioning = null
      if (this.options.parent) {
        this.$parent = this.getParent()
      } else {
        this.addAriaAndCollapsedClass(this.$element, this.$trigger)
      }
      if (this.options.toggle) this.toggle()
    }
    Collapse.VERSION  = '3.3.7'
    Collapse.TRANSITION_DURATION = 350
    Collapse.DEFAULTS = {
      toggle: true
    }
    Collapse.prototype.dimension = function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }
    Collapse.prototype.show = function () {
      if (this.transitioning || this.$element.hasClass('in')) return
      var activesData
      var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

      if (actives && actives.length) {
        activesData = actives.data('bs.collapse')
        if (activesData && activesData.transitioning) return
      }

      var startEvent = $.Event('show.bs.collapse')
      this.$element.trigger(startEvent)
      if (startEvent.isDefaultPrevented()) return

      if (actives && actives.length) {
        Plugin.call(actives, 'hide')
        activesData || actives.data('bs.collapse', null)
      }

      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        .addClass('collapsing')[dimension](0)
        .attr('aria-expanded', true)

      this.$trigger
        .removeClass('collapsed')
        .attr('aria-expanded', true)

      this.transitioning = 1

      var complete = function () {
        this.$element
          .removeClass('collapsing')
          .addClass('collapse in')[dimension]('')
        this.transitioning = 0
        this.$element
          .trigger('shown.bs.collapse')
      }

      if (!$.support.transition) return complete.call(this)

      var scrollSize = $.camelCase(['scroll', dimension].join('-'))

      this.$element
        .one('bsTransitionEnd', $.proxy(complete, this))
        .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function () {
      if (this.transitioning || !this.$element.hasClass('in')) return

      var startEvent = $.Event('hide.bs.collapse')
      this.$element.trigger(startEvent)
      if (startEvent.isDefaultPrevented()) return

      var dimension = this.dimension()

      this.$element[dimension](this.$element[dimension]())[0].offsetHeight

      this.$element
        .addClass('collapsing')
        .removeClass('collapse in')
        .attr('aria-expanded', false)

      this.$trigger
        .addClass('collapsed')
        .attr('aria-expanded', false)

      this.transitioning = 1

      var complete = function () {
        this.transitioning = 0
        this.$element
          .removeClass('collapsing')
          .addClass('collapse')
          .trigger('hidden.bs.collapse')
      }

      if (!$.support.transition) return complete.call(this)

      this.$element
        [dimension](0)
        .one('bsTransitionEnd', $.proxy(complete, this))
        .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }
    Collapse.prototype.toggle = function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }
    Collapse.prototype.getParent = function () {
      return $(this.options.parent)
        .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
        .each($.proxy(function (i, element) {
          var $element = $(element)
          this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
        }, this))
        .end()
    }
    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
      var isOpen = $element.hasClass('in')

      $element.attr('aria-expanded', isOpen)
      $trigger
        .toggleClass('collapsed', !isOpen)
        .attr('aria-expanded', isOpen)
    }
    function getTargetFromTrigger($trigger) {
      var href
      var target = $trigger.attr('data-target')
        || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

      return $(target)
    }
    function Plugin(option) {
      return this.each(function () {
        var $this   = $(this)
        var data    = $this.data('bs.collapse')
        var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

        if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
        if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
        if (typeof option == 'string') data[option]()
      })
    }
    var old = $.fn.collapse
    $.fn.collapse             = Plugin
    $.fn.collapse.Constructor = Collapse
    $.fn.collapse.noConflict = function () {
      $.fn.collapse = old
      return this
    }
    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
      var $this   = $(this)

      if (!$this.attr('data-target')) e.preventDefault()

      var $target = getTargetFromTrigger($this)
      var data    = $target.data('bs.collapse')
      var option  = data ? 'toggle' : $this.data()

      Plugin.call($target, option)
    })
  }(jQuery);
};
Plagin();