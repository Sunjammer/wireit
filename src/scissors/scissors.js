YUI.add("scissors", function(Y){

/**
 * Scissors widget to cut wires
 * @class Scissors
 * @namespace WireIt
 * @constructor
 * @param {WireIt.Terminal} terminal Associated terminal
 * @param {Object} oConfigs 
 */
Y.WireScissors = function(terminal, oConfigs) {

   /**
    * The terminal it is associated to
    * @property _terminal
    * @type {WireIt.Terminal}
    */
   this._terminal = terminal;
   
   this.initScissors();
};

Y.WireScissors.visibleInstance = null;

Y.WireScissors.prototype = {
   
   /**
    * Init the scissors
    * @method initScissors
    */
   initScissors: function() {
      
      // Display the cut button
      this.el = Y.Node.create('<div class="WireIt-Wire-scissors" style="display: none;"></div>');
      
      // The scissors are within the terminal element
      this.el.appendTo(this._terminal.container ? this._terminal.container.layer.el : this._terminal.el.parentNode.parentNode);

      // Ajoute un listener sur le scissor:
      this.el.on("mouseover", this.show, this, true);
      this.el.on("mouseout", this.hide, this, true);
      this.el.on("click", this.scissorClick, this, true);
      
      // On mouseover/mouseout to display/hide the scissors
      var terminalEl = Y.one(this._terminal.el);
      terminalEl.on("mouseover", this.mouseOver, this, true);
      terminalEl.on("mouseout", this.hide, this, true);
   },
   
   /**
    * @method setPosition
    */
   setPosition: function() {
      var pos = this._terminal.getXY();
      this.el.setStyle("left", (pos[0]+this._terminal.direction[0]*30-8)+"px");
      this.el.setStyle("top", (pos[1]+this._terminal.direction[1]*30-8)+"px");
   },
   /**
    * @method mouseOver
    */
   mouseOver: function() {
      if(this._terminal.wires.length > 0)  {
         this.show();
      }
   },

   /**
    * @method scissorClick
    */
   scissorClick: function() {
      this._terminal.removeAllWires();
      if(this.terminalTimeout) { this.terminalTimeout.cancel(); }
      this.hideNow();
   },   
   /**
    * @method show
    */
   show: function() {
      this.setPosition();
      this.el.setStyle('display','');
		
		if(Y.WireScissors.visibleInstance && Y.WireScissors.visibleInstance != this) {
			if(Y.WireScissors.visibleInstance.terminalTimeout) { Y.WireScissors.visibleInstance.terminalTimeout.cancel(); }
			Y.WireScissors.visibleInstance.hideNow(); 
		}
		Y.WireScissors.visibleInstance = this;
		
      if(this.terminalTimeout) { this.terminalTimeout.cancel(); }
   },
   /**
    * @method hide
    */
   hide: function() {
      this.terminalTimeout = Y.later(700,this,this.hideNow);
   },
   /**
    * @method hideNow
    */
   hideNow: function() {
      Y.WireScissors.visibleInstance = null;
      this.el.setStyle('display','none');
   }

};

}, '0.7.0',{
  requires: []
});