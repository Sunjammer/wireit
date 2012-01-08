YUI.add('image-container', function(Y) {

/**
 * ImageContainer is an Overlay (XY positioning)
 * It is a WidgetChild (belongs to Layer)
 * It is also a WidgetParent (has many terminals)
 * @class ImageContainer
 * @extends Overlay
 * @constructor
 */
Y.ImageContainer = Y.Base.create("image-container", Y.ContainerBase, [], {
	
	renderUI: function() {
		
		// TODO: 
		var image = Y.Node.create('<img src="'+this.get('imageUrl')+'" width="'+this.get('width')+'"  height="'+this.get('height')+'"/>');
		image.appendTo( this.get('contentBox') );
		this.image = image;
		
		//console.log( Y.WidgetStdMod.BODY, this._getStdModContent(Y.WidgetStdMod.BODY) );
				
	  	// make the overlay draggable
		this.drag = new Y.DD.Drag({
		  	node: this.get('boundingBox'), 
			handles : [ image ]
	  	});
	
		this.drag.on('drag:drag', function() {
			this.redrawAllWires();
		}, this);
	
	
		// Make the overlay resizable
		var contentBox = this.get('contentBox');
		var resize = new Y.Resize({ 
			node: contentBox,
			handles: 'br'
		});
		/*resize.plug(Y.Plugin.ResizeConstrained, {
			preserveRatio: true
    	});*/
		// On resize, fillHeight, & align terminals & wires
		resize.on('resize:resize', function(e) {
			// TODO: fillHeight
			this._fillHeight();
			
			//console.log(e.details[0].info);
			var p = e.details[0].info;
			var w = p.right-p.left;
			var h = p.bottom-p.top;
			//console.log(w+"x"+h);
			
			// WARNING !!!
			this.image.set('width',w);
			this.image.set('height',h);
			
			this.each(function(term) {
				if(term.get('align')) {	
					term.align( contentBox, ["tl",term.get('align').points[1]]);
				}
			}, this);
			
			this.redrawAllWires();
		}, this);
		
	}/*,
	
	toJSON: function() {
		var o = Y.ImageContainer.superclass.toJSON();
		o.type="ImageContainer";
		return o;
	}*/
	
}, {

	ATTRS: {
		/**
		 * Url of the image you want to render (relative to the script's page)
		 */
		imageUrl: {
			value: ''
		}
	}
	
});


}, '3.5.0pr1a', {requires: ['container-base']});
