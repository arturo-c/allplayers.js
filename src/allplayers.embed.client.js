var allplayers = allplayers || {embed: {}};

if (!jQuery.fn.allplayers_client) {

  /**
   * Define the jQuery plugin.
   *
   * @param {object} options The options for this plugin.
   * @return {object} A jQuery object.
   * @this The jQuery context for each element.
   **/
  jQuery.fn.allplayers_client = function(options) {
    return jQuery(this).each(function() {
      new allplayers.embed.client(options, jQuery(this));
    });
  };
}

/**
 * The allplayers embed client.
 *
 * @param {object} options The options for this embed client.
 * @param {object} context The display context for this plugin.
 * @this The allplayers.embed.client.
 */
allplayers.embed.client = function(options, context) {

  // Store the context.
  this.context = context;

  var spinner = 'https://www.allplayers.com';
  spinner += '/sites/all/themes/allplayers960/images/loading.gif';

  // Call the allplayers.embed constructor.
  allplayers.embed.call(this, options, {
    spinner: spinner,
    loading: 'loading...',
    base: 'https://platform.allplayers.com',
    type: 'registration',
    group: 'api',
    query: {},
    src: '',
    complete: function() {}
  });
};

/** Derive from allplayers.embed. */
allplayers.embed.client.prototype = new allplayers.embed();

/** Reset the constructor. */
allplayers.embed.client.prototype.constructor = allplayers.embed.client;


/**
 * Initialize the allplayer embed library.
 */
allplayers.embed.client.prototype.init = function() {

  // Call the parent.
  allplayers.embed.prototype.init.call(this);

  // Add the loading and iframe.
  var loading = jQuery(document.createElement('div')).css({
    background: 'url(' + this.options.spinner + ') no-repeat',
    margin: '0 5px',
    paddingLeft: '20px'
  });

  // Add the loading text.
  loading.append(this.options.loading);

  // Add the iframe.
  var iframeId = this.context.attr('id') + '_iframe';

  // Get the source for the iframe.
  var source = '';
  if (this.options.src) {
    source = this.options.src;
  }
  else {
    source = this.options.base + '/g/' + this.options.group;
    switch (this.options.type) {
      case 'registration':
        source += '/register';
        break;
      case 'forms':
        source += '/forms';
        break;
    }

    // Add the type as a query parameter.
    this.options.query.embedtype = this.options.type;

    // If they have some query options then add them here.
    if (!jQuery.isEmptyObject(this.options.query)) {
      source += '?';
      for (var param in this.options.query) {
        source += param + '=' + encodeURIComponent(this.options.query[param]);
        source += '&';
      }
      source = source.replace(/\&$/, '');
    }
  }

  // Add the iframe ID to the iframe source.
  source += '#' + iframeId;

  var iframe = jQuery(document.createElement('iframe')).attr({
    id: iframeId,
    name: iframeId,
    scrolling: 'no',
    seamless: 'seamless',
    width: '100%',
    height: '0px',
    src: source
  }).css({
    border: 'none',
    overflowY: 'hidden'
  });

  // Create the loading element.
  this.context.append(loading);
  this.context.append(iframe);

  // Get the proxy.
  this.proxy = new Porthole.WindowProxy(
    this.options.proxy,
    iframe.attr('id')
  );

  // Pass along chrome message responses to the server.
  window.addEventListener('message', function(event) {
    if (event.data.name == 'chromeMsgResp') {
      document.proxy.post({event: event.data});
    }
  });

  // Add the event listener.
  var self = this;
  this.proxy.addEventListener(function(e) {

    // Switch on the event name.
    var event = e.data.hasOwnProperty('event') ? e.data.event : false;
    if (event) {
      switch (event.name) {

        // Pass along chrome messages.
        case 'chromeMsg':
          window.postMessage(e.data, '*');
          break;

        // Called when the iframe has initalized.
        case 'init':
          loading.remove();
          iframe.height(event.height).attr('height', event.height + 'px');
          break;

        // Called when the process is complete.
        case 'complete':
          self.options.complete.call(self, event);
          break;
      }
    }
  });
};
