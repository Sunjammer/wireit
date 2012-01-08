YUI.add('wire-label-plugin', function(Y) {

/**
 * TODO
 */
function WireLabelPlugin(config) {
	WireLabelPlugin.superclass.constructor.apply(this, arguments);
}
WireLabelPlugin.NAME = 'WireLabelPlugin';
WireLabelPlugin.NS = 'label';
WireLabelPlugin.ATTRS = {
	
	label: {
		value: null
	}
	
};

Y.extend(WireLabelPlugin, Y.Plugin.Base, {
	
   initializer: function(config) { 
       this.afterHostEvent('render', this._renderLabel);
   },

   _renderLabel: function() {
		var widget = this.get("host");
      var contentBox = widget.get("contentBox");

		this._label = new Y.Node.create("<div>")
							.addClass(widget.getClassName("label"));
		contentBox.appendChild( this._label );
   },

	destructor: function() {
		this._label.remove();
	}
});

Y.WireLabelPlugin = WireLabelPlugin;

}, '3.5.0pr1a', {requires: ['wire']});

