(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.OffCanvasMenu = factory(global.jQuery));
})(this, (function (require$$0) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var offcanvasMultilevel$1 = {exports: {}};

	/*!
	 * jQuery Off-Canvas Multi-Level Menu (OCM)
	 * Version:     1.3.1
	 * Author:      Muzamiml Hussain (smhz101)
	 * License:     MIT
	 * Repository:  https://github.com/smhz101/ocm
	 *
	 * Description:
	 * Lightweight, accessible, responsive off-canvas navigation menu.
	 * Supports unlimited submenu levels, keyboard navigation, focus trapping,
	 * ARIA attributes, and highly customizable styling.
	 *
	 * Features:
	 * - Responsive panel with breakpoint control
	 * - Multi-level nested menus with animated transitions
	 * - Focus trapping, ESC-to-close, ARIA-compliant
	 * - Overlay and click-to-close support
	 * - Easily themable via JS or CSS custom properties
	 * - API methods for open, close, toggle, and level navigation
	 * - Lifecycle callbacks for integration flexibility
	 *
	 * Dependencies:
	 * - jQuery >= 3.6.0
	 *
	 * Usage:
	 * $('.main-menu').offCanvasMenu({
	 *   side: 'left',
	 *   width: '75%',
	 *   breakpoint: '992px'
	 * });
	 *
	 */

	(function (module) {
		(function (root, factory) {
		  if (module.exports) {
		    // CommonJS
		    module.exports = factory(require$$0);
		  } else {
		    // Browser globals
		    factory(root.jQuery);
		  }
		})(typeof self !== 'undefined' ? self : commonjsGlobal, function ($) {

		  /**
		   * @typedef {Object} OffCanvasMenuSettings
		   * @property {'slide'|'accordion'} mode
		   * @property {'left'|'right'} side
		   * @property {string} width
		   * @property {string} breakpoint
		   * @property {number} zIndex
		   * @property {string} bgColor
		   * @property {string} textColor
		   * @property {string} headerBg
		   * @property {string} borderColor
		   * @property {string} linkHover
		   * @property {number} transitionDuration
		   * @property {string} transitionEasing
		   * @property {boolean} overlay
		   * @property {boolean} trapFocus
		   * @property {boolean} closeOnEsc
		   * @property {boolean} closeOnOverlay
		   * @property {string} navSelector
		   * @property {Object} svg
		   * @property {Function|null} onInit
		   * @property {Function|null} onOpen
		   * @property {Function|null} onClose
		   * @property {Function|null} onNavigate
		   * @property {Function|null} onLevelChange
		   */
		  var defaults = {
		    mode: 'slide', // 'slide' or 'accordion'
		    side: 'right', // 'left' or 'right'
		    width: '80%', // CSS width of panel
		    breakpoint: '768px', // must match CSS media-query
		    zIndex: 9999,
		    bgColor: '#111',
		    textColor: '#eee',
		    headerBg: '#222',
		    borderColor: '#333',
		    linkHover: 'rgba(255,255,255,0.1)',
		    transitionDuration: 300, // ms
		    transitionEasing: 'ease',
		    overlay: true,
		    trapFocus: true,
		    closeOnEsc: true,
		    closeOnOverlay: true,
		    navSelector: '.main-menu',
		    headerSelector: null,

		    // CSS classes
		    containerClass: 'ocm-container',
		    panelClass: 'ocm-panel',
		    levelClass: 'ocm-level',
		    headerClass: 'ocm-header',
		    listClass: 'ocm-list',
		    itemClass: 'ocm-item',
		    linkClass: 'ocm-link',
		    btnClass: 'ocm-btn',
		    btnToggleClass: 'ocm-toggle',
		    btnCloseClass: 'ocm-close',
		    btnBackClass: 'ocm-back',
		    btnHomeClass: 'ocm-home',

		    svg: {
		      home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4L4 7.9V20h16V7.9L12 4zm6.5 14.5H14V13h-4v5.5H5.5V8.8L12 5.7l6.5 3.1v9.7z"></path></svg>',
		      hamburger:
		        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"></path></svg>',
		      close:
		        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>',
		      chevron:
		        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10.6 6L9.4 7l4.6 5-4.6 5 1.2 1 5.4-6z"></path></svg>',
		      chevronDown:
		        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>',
		    },

		    // Callbacks
		    onInit: null, // fn(instance)
		    onOpen: null, // fn(instance)
		    onClose: null, // fn(instance)
		    onNavigate: null, // fn(level, items)
		    onLevelChange: null, // fn(level)
		  };

		  /**
		   * OffCanvasMenu constructor
		   * @class
		   * @param {JQuery} $nav
		   * @param {Partial<OffCanvasMenuSettings>} opts
		   */
		  function OffCanvasMenu($nav, opts) {
		    this.settings = $.extend(true, {}, defaults, opts);

		    // If we're in accordion mode, override all the CSS‐class strings:
		    if (this.settings.mode === 'accordion') {
		      Object.assign(this.settings, {
		        containerClass: 'ocm-accordion-container',
		        panelClass: 'ocm-accordion-panel',
		        levelClass: 'ocm-accordion-level',
		        headerClass: 'ocm-accordion-header',
		        listClass: 'ocm-accordion-list',
		        itemClass: 'ocm-accordion-item',
		        linkClass: 'ocm-accordion-link',
		        btnClass: 'ocm-accordion-btn',
		        btnToggleClass: 'ocm-accordion-toggle',
		        btnCloseClass: 'ocm-accordion-close',
		        btnBackClass: 'ocm-accordion-back',
		        btnHomeClass: 'ocm-accordion-home',
		      });
		    }

		    this.$nav = $nav;

		    // ---- ACCORDION MODE HOOK ----
		    if (this.settings.mode === 'accordion') {
		      // 1) swap hamburger → close
		      defaults.svg.hamburger = defaults.svg.close;

		      // 2) measure your site header
		      const headerH = $('header').first().outerHeight() || 0;
		      // expose as a CSS var for our stylesheet
		      document.documentElement.style.setProperty('--ocm-header-offset', `${headerH}px`);

		      // 3) add a mode-class on the container
		      // $nav.wrap('<div class="' + this.settings.containerClass + '"></div>');
		      // $nav.parent().addClass('ocm-accordion-mode');
		    }

		    if (this.settings.headerSelector) {
		      const hdr = $(this.settings.headerSelector).first();
		      const h = hdr.length ? hdr.outerHeight() : 0;
		      document.documentElement.style.setProperty('--ocm-header-offset', h + 'px');
		    }

		    this.stack = [];
		    this._buildTree();
		    this._buildDOM();
		    this._bindEvents();
		    this._updateVisibility();
		    $(window).on('resize', this._updateVisibility.bind(this));
		    if (this.settings.closeOnEsc) {
		      $(document).on('keydown', this._handleEsc.bind(this));
		    }
		    if ($.isFunction(this.settings.onInit)) this.settings.onInit(this);
		  }

		  /**
		   * Parse the source UL into a JS tree
		   * @private
		   */
		  OffCanvasMenu.prototype._buildTree = function () {
		    const parse = ($ul) => {
		      return $ul
		        .children('li')
		        .map(function () {
		          const $li = $(this);
		          const $a = $li.children('a').first();
		          return {
		            title: $a.text().trim(),
		            url: $a.attr('href'),
		            children: $li.children('ul').length
		              ? // **NO .get() here** — parse already returns an Array
		                parse($li.children('ul').first())
		              : [],
		          };
		        })
		        .get();
		    };

		    this.menuData = parse(this.$nav.find('> ul'));
		  };

		  /**
		   * Build DOM elements: container, header, levels
		   * @private
		   */
		  OffCanvasMenu.prototype._buildDOM = function () {
		    var s = this.settings;

		    // tag mode on container for easy styling
		    this.$nav
		      .parent(`.${s.containerClass}`)
		      .addClass(s.mode === 'accordion' ? 'ocm-accordion' : 'ocm-slide');

		    // wrap + hide original
		    this.$nav.wrap('<div class="' + s.containerClass + '"></div>').hide();

		    // hamburger toggle
		    // this.$toggle = $('<button>')
		    //   .addClass(s.btnClass + ' ' + s.btnToggleClass)
		    //   .attr('aria-label', 'Open menu')
		    //   .html(s.svg.hamburger)
		    //   .insertBefore(this.$nav);
		    this.$toggle = $('<button>')
		      .addClass(s.btnClass + ' ' + s.btnToggleClass)
		      .html(s.svg.hamburger)
		      .on('click', () => {
		        if (this.$panel.attr('aria-hidden') === 'true') {
		          this.open();
		          if (this.settings.headerSelector) this.$toggle.html(s.svg.close);
		        } else {
		          this.close();
		          if (this.settings.headerSelector) this.$toggle.html(s.svg.hamburger);
		        }
		      })
		      .insertBefore(this.$nav);

		    // backdrop
		    if (s.overlay) {
		      this.$overlay = $('<div class="' + s.containerClass + '__overlay"></div>')
		        .css({
		          position: 'fixed',
		          top: 0,
		          left: 0,
		          right: 0,
		          bottom: 0,
		          background: 'rgba(0,0,0,0.5)',
		          zIndex: s.zIndex - 1,
		          display: 'none',
		        })
		        .appendTo('body');
		    }

		    // panel wrapper
		    this.$panel = $(
		      '<nav role="navigation" aria-hidden="true" tabindex="-1" class="' + s.panelClass + '"></nav>'
		    )
		      .css({
		        position: 'fixed',
		        top: this.settings.headerSelector ? 'var(--ocm-header-offset)' : '0',
		        bottom: 0,
		        [s.side]: 0,
		        width: s.width,
		        background: s.bgColor,
		        color: s.textColor,
		        zIndex: s.zIndex,
		        overflow: 'hidden',
		        transform: 'translateX(100%)',
		        transition: 'transform ' + s.transitionDuration + 'ms ' + s.transitionEasing,
		      })
		      .appendTo('body');

		    // only build header for slide mode
		    if (s.mode === 'slide') {
		      this.$header = $('<div>').addClass(s.headerClass).appendTo(this.$panel);

		      // Home button
		      $('<button>')
		        .addClass(s.btnClass + ' ' + s.btnHomeClass)
		        .attr('aria-label', 'Back to top level')
		        .html(s.svg.home)
		        .on('click', (e) => {
		          e.preventDefault();
		          this.jumpTo(0);
		        })
		        .appendTo(this.$header);

		      // Back button
		      $('<button>')
		        .addClass(s.btnClass + ' ' + s.btnBackClass)
		        .attr('aria-label', 'Back one level')
		        .html(s.svg.chevron)
		        .css('transform', 'rotate(180deg)')
		        .on('click', (e) => {
		          e.preventDefault();
		          this.back();
		        })
		        .appendTo(this.$header);

		      // Title span
		      this.$title = $('<span>')
		        .addClass(s.headerClass + '__title')
		        .text('Menu')
		        .appendTo(this.$header);

		      $('<button>')
		        .addClass(s.btnClass + ' ' + s.btnCloseClass)
		        .attr('aria-label', 'Close menu')
		        .html(s.svg.close)
		        .on('click', () => this.close())
		        .appendTo(this.$header);
		    }

		    if (s.mode === 'accordion') {
		      // prepend a header‐like bar with close icon
		      const $hdr = $('<div>').addClass(s.headerClass).prependTo(this.$panel);
		      $('<button>')
		        .addClass(s.btnClass + ' ' + s.btnCloseClass)
		        .attr('aria-label', 'Close menu')
		        .html(this.settings.svg.close)
		        .on('click', () => this.close())
		        .appendTo($hdr);
		    }

		    // render menu body
		    if (s.mode === 'accordion') {
		      this._renderAccordion(this.menuData, this.$panel);
		    } else {
		      this._renderLevel(0, this.menuData, 'Menu');
		    }
		  };

		  /**
		   * Render an in-place accordion.
		   * @private
		   * @param {Array<Object>} items
		   * @param {JQuery} $container
		   */
		  OffCanvasMenu.prototype._renderAccordion = function (items, $container) {
		    var s = this.settings;
		    var $ul = $('<ul>').addClass(s.listClass).appendTo($container);

		    items.forEach(function (it) {
		      var $li = $('<li>').addClass(s.itemClass).appendTo($ul);
		        $('<a>').addClass(s.linkClass).attr('href', it.url).text(it.title).appendTo($li);

		      if (it.children.length) {
		        // 3a) Chevron toggle button
		        var $btn = $('<button>')
		          .addClass(s.btnClass + ' ' + s.btnToggleClass)
		          .attr('aria-expanded', 'false')
		          .attr('aria-label', 'Toggle submenu')
		          .html(s.svg.chevronDown)
		          .appendTo($li)
		          .on('click', function (e) {
		            e.preventDefault();
		            e.stopPropagation();
		            var expanded = $btn.attr('aria-expanded') === 'true';
		            $btn.attr('aria-expanded', String(!expanded));
		            $li.toggleClass('expanded');
		            $li.children('ul').first().slideToggle(s.transitionDuration);
		          });

		        // 3b) Render children, hidden by default
		        this._renderAccordion(it.children, $li);
		        $li.children('ul').first().hide();
		      }
		    }, this);
		  };

		  /* 3) Render one level pane */
		  OffCanvasMenu.prototype._renderLevel = function (level, items, parentTitle) {
		    var s = this.settings;

		    // pane container
		    var $lvl = $('<div>').addClass(s.levelClass).attr('data-level', level);

		    // LIST only
		    var $list = $('<ul>').addClass(s.listClass);
		    items.forEach(function (it) {
		      var $li = $('<li>').addClass(s.itemClass).appendTo($list);
		        $('<a>').addClass(s.linkClass).attr('href', it.url).text(it.title).appendTo($li);
		      if (it.children.length) {
		        $li.addClass('has-children');
		        $('<button>')
		          .addClass(s.btnClass + ' ' + s.btnToggleClass)
		          .attr('aria-label', 'Open submenu')
		          .html(s.svg.chevron)
		          .appendTo($li);
		      }
		    });
		    $lvl.append($list).appendTo(this.$panel);
		    // this.stack[level] = { $lvl: $lvl, items: items };
		    this.stack[level] = { $lvl: $lvl, items: items, title: parentTitle || 'Menu' };
		  };

		  /* 3.1) Remove rendered level pane */
		  OffCanvasMenu.prototype._removeLevel = function (level) {
		    // remove the pane and array entry
		    this.stack[level].$lvl.remove();
		    this.stack.splice(level, 1);
		  };

		  /* 3.2) Reset all but the root pane */
		  OffCanvasMenu.prototype._reset = function () {
		    // start from the top of the stack down to level 1
		    for (let i = this.stack.length - 1; i >= 1; i--) {
		      this._removeLevel(i);
		    }
		  };

		  /**
		   * Bind all event handlers
		   * @private
		   */
		  OffCanvasMenu.prototype._bindEvents = function () {
		    var s = this.settings,
		      self = this;

		    // open
		    this.$toggle.on('click', () => this.open());

		    // close: button
		    this.$panel.on('click', '.' + s.btnCloseClass, () => this.close());

		    // close: overlay
		    if (s.overlay && s.closeOnOverlay) {
		      this.$overlay.on('click', () => this.close());
		    }

		    // drill in (only on chevron click)
		    this.$panel.on('click', '.' + s.btnToggleClass, function () {
		      var $li = $(this).closest('li'),
		        idx = $li.index(),
		        lvl = self._currentLevel(),
		        item = self.stack[lvl].items[idx];
		      self._navigate(lvl + 1, item.children, item.title);
		    });

		    this.$panel.on('click', 'a', function (e) {
		      var href = $(this).attr('href');
		      if (!href || href.indexOf('#') === -1) return;

		      // Construct a URL relative to the site origin:
		      var url;
		      try {
		        url = new URL(href, location.origin);
		      } catch (err) {
		        return;
		      }

		      // If the link’s path is the same as current page, and has a hash
		      if (url.pathname === location.pathname && url.hash) {
		        // let the browser scroll, but close the menu immediately
		        self.close();
		      }
		    });

		    // trap focus & keyboard
		    if (s.trapFocus) {
		      this.$panel.on('keydown', this._trapFocus.bind(this));
		    }
		  };

		  /* ESC key to close */
		  OffCanvasMenu.prototype._handleEsc = function (e) {
		    if (e.key === 'Escape') this.close();
		  };

		  /**
		   * Open the off-canvas panel
		   * @public
		   */
		  OffCanvasMenu.prototype.open = function () {
		    // remove inert so focusable again
		    this.$panel.removeAttr('aria-hidden').removeAttr('inert').css('transform', 'translateX(0)');
		    if (this.$overlay) this.$overlay.show();
		    $('body').addClass('ocm-menu-open');
		    if ($.isFunction(this.settings.onOpen)) this.settings.onOpen(this);
		    this.$panel.focus();
		  };

		  /**
		   * Close the off-canvas panel
		   * @public
		   */
		  OffCanvasMenu.prototype.close = function () {
		    // this.$panel.attr('aria-hidden', 'true').css('transform', 'translateX(100%)');
		    // if (this.$overlay) this.$overlay.hide();
		    // this.jumpTo(0);
		    // if ($.isFunction(this.settings.onClose)) this.settings.onClose(this);
		    // // this._updateVisibility();

		    // use inert instead of aria-hidden to avoid hiding focused descendant
		    this.$panel.attr('aria-hidden', 'true').attr('inert', '').css('transform', 'translateX(100%)');
		    if (this.$overlay) this.$overlay.hide();
		    $('body').removeClass('ocm-menu-open');
		    this.jumpTo(0);
		    if ($.isFunction(this.settings.onClose)) this.settings.onClose(this);
		  };

		  /**
		   * Toggle panel open/close
		   * @public
		   */
		  OffCanvasMenu.prototype.toggle = function () {
		    this.$panel.attr('aria-hidden') === 'true' ? this.open() : this.close();
		  };

		  /**
		   * Navigate into a submenu level
		   * @private
		   * @param {number} level
		   * @param {Array<Object>} items
		   * @param {string} title
		   */
		  OffCanvasMenu.prototype._navigate = function (level, items, title) {
		    // 1) Clear out only this level and deeper
		    for (let i = this.stack.length - 1; i >= level; i--) {
		      this._removeLevel(i);
		    }

		    // 2) Render a fresh pane for this level (list only; header is fixed)
		    this._renderLevel(level, items, title);

		    // 3) Slide into it so content moves under the fixed header
		    this._slide(level);

		    // 4) Update the fixed header title
		    this._updateHeader(title || 'Menu');

		    // 5) Callbacks
		    if ($.isFunction(this.settings.onNavigate)) this.settings.onNavigate(level, items);
		    if ($.isFunction(this.settings.onLevelChange)) this.settings.onLevelChange(level);
		  };

		  /* Slide to level */
		  OffCanvasMenu.prototype._slide = function (activeLevel) {
		    this.$panel.children('.' + this.settings.levelClass).each(function (idx, pane) {
		      var delta = (idx - activeLevel) * 100;
		      $(pane).css('transform', 'translateX(' + delta + '%)');
		    });

		    // update aria-hidden
		    // this.$panel
		    //   .children('.' + this.settings.levelClass)
		    //   .attr('aria-hidden', (i) => (i === activeLevel ? 'false' : 'true'));
		  };

		  /**
		   * Go back one level in the menu
		   * @private
		   */
		  OffCanvasMenu.prototype.back = function () {
		    if (this.stack.length > 1) {
		      this.stack.pop().$lvl.remove();
		      const lvl = this.stack.length - 1;
		      this._slide(lvl);
		      this._updateHeader(this.stack[lvl].title || 'Menu');
		    }
		  };

		  /**
		   * Jump to a specific level
		   * @public
		   * @param {number} level
		   */
		  OffCanvasMenu.prototype.jumpTo = function (level) {
		    if (level === 0) {
		      this._reset();
		      this._slide(0);
		      // this._updateHeader('Menu');
		      if (this.settings.mode === 'slide') {
		        this._updateHeader(level === 0 ? 'Menu' : this.stack[level].title);
		      }
		    } else {
		      this._slide(level);
		      this._updateHeader(this.stack[level].title);
		    }
		  };

		  // helper to change header text
		  OffCanvasMenu.prototype._updateHeader = function (text) {
		    // only update if we actually have a $title element
		    if (this.$title && $.isFunction(this.$title.text)) {
		      this.$title.text(text);
		    }
		  };

		  /* Detect current level */
		  OffCanvasMenu.prototype._currentLevel = function () {
		    var idx = 0;
		    this.$panel.children('.' + this.settings.levelClass).each(function (i, el) {
		      if ($(el).css('transform').includes('0, 0')) idx = i;
		    });
		    return idx;
		  };

		  /* Show/hide toggle+nav based on window width */
		  OffCanvasMenu.prototype._updateVisibility = function () {
		    var w = window.innerWidth,
		      bp = parseInt(this.settings.breakpoint, 10);
		    if (w <= bp) {
		      this.$toggle.show();
		      this.$nav.hide();
		    } else {
		      this.$toggle.hide();
		      this.$nav.show();
		      this.close();
		    }
		  };

		  /* Trap tab focus inside panel */
		  OffCanvasMenu.prototype._trapFocus = function (e) {
		    this.settings;
		      var focusable = this.$panel.find('button, a'),
		      first = focusable.first()[0],
		      last = focusable.last()[0];
		    if (e.key === 'Tab') {
		      if (e.shiftKey && e.target === first) {
		        e.preventDefault();
		        last.focus();
		      } else if (!e.shiftKey && e.target === last) {
		        e.preventDefault();
		        first.focus();
		      }
		    }
		  };

		  /**
		   * jQuery plugin bridge
		   * @param {Partial<OffCanvasMenuSettings>} opts
		   * @returns {JQuery}
		   */
		  $.fn.offCanvasMenu = function (opts) {
		    return this.each(function () {
		      if (!$.data(this, 'offCanvasMenu')) {
		        $.data(this, 'offCanvasMenu', new OffCanvasMenu($(this), opts));
		      }
		    });
		  };

		  return OffCanvasMenu;
		}); 
	} (offcanvasMultilevel$1));

	var offcanvasMultilevelExports = offcanvasMultilevel$1.exports;
	var offcanvasMultilevel = /*@__PURE__*/getDefaultExportFromCjs(offcanvasMultilevelExports);

	return offcanvasMultilevel;

}));
//# sourceMappingURL=offcanvas-multilevel.umd.js.map
