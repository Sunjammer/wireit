/**
 * @fileoverview 
 * Contains the class WireIt.Wire that wraps a canvas tag to create wires
 * 
 */
/**
 * @class WireIt.Wire
 * @constructor
 *
 * @params  {WireIt.Terminal}    terminal1   Source terminal
 * @params  {WireIt.Terminal}    terminal2   Target terminal
 * @params  {DomEl}              parentEl    Container of the CANVAS tag
 * @params  {Obj}                config      Styling configuration
 */
WireIt.Wire = function( terminal1, terminal2, parentEl, config) {
   
   /**
    * Reference to the parent dom element
    */
   this.parentEl = parentEl;
   
   // Render the wire
   this.render();
   
   /**
    * Reference to the first terminal
    */
   this.terminal1 = terminal1;
   
   /**
    * Reference to the second terminal
    */
   this.terminal2 = terminal2;
   
   // Call addWire on both terminals
   this.terminal1.addWire(this);
   this.terminal2.addWire(this);
   
   /**
    * Wire styling
    */
   this.config = config || {};
   this.config.cap = this.config.cap || 'round';
   this.config.bordercap = this.config.bordercap || 'round';
   this.config.width = this.config.width || 3;
   this.config.borderwidth = this.config.borderwidth || 1;
   this.config.color = this.config.color || '#0000ff';
   this.config.bordercolor = this.config.bordercolor || '#000000';
   
};


/**
 * Render the canvas tag
 */
WireIt.Wire.prototype.render = function() {
   
   // Create the canvas element
   this.el = WireIt.cn("canvas", {className: "WireIt-Wire"});
   
   this.parentEl.appendChild(this.el);
   
   // extcanvas.js:
   if(typeof (G_vmlCanvasManager)!="undefined"){
      G_vmlCanvasManager.initElement(this.el);
   }
   
   if(this.el.getContext){
      this.ctxt=this.el.getContext("2d");
   }
};

/**
 * Remove a Wire from the Dom
 */
WireIt.Wire.prototype.remove = function() {
   this.parentEl.removeChild(this.el);
   
   this.terminal1.removeWire(this);
   this.terminal2.removeWire(this);
};

/**
 * Redraw the Wire
 */
WireIt.Wire.prototype.redraw = function() {
   
   // Get the positions of the terminals
   var p1 = this.terminal1.getXYWire();
   var p2 = this.terminal2.getXYWire();
   
   // Coefficient multiplicateur de direction
   // 100 par défaut, si distance(p1,p2) < 100, on passe en distance/2
   var coeffMulDirection=100;
   var distance=Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2));
   if(distance<coeffMulDirection){
      coeffMulDirection=distance/2;
   }
   
   // Calcul des vecteurs directeurs d1 et d2 :
   var d1=[this.terminal1.terminalConfig.direction[0]*coeffMulDirection,this.terminal1.terminalConfig.direction[1]*coeffMulDirection];
   var d2=[this.terminal2.terminalConfig.direction[0]*coeffMulDirection,this.terminal2.terminalConfig.direction[1]*coeffMulDirection];
   
   var bezierPoints=[];
   bezierPoints[0]=p1;
   bezierPoints[1]=[p1[0]+d1[0],p1[1]+d1[1]];
   bezierPoints[2]=[p2[0]+d2[0],p2[1]+d2[1]];
   bezierPoints[3]=p2;
   var min=[p1[0],p1[1]];
   var max=[p1[0],p1[1]];
   for(var i=1;i<bezierPoints.length;i++){
      var p=bezierPoints[i];
      if(p[0]<min[0]){
         min[0]=p[0];
      }
      if(p[1]<min[1]){
         min[1]=p[1];
      }
      if(p[0]>max[0]){
         max[0]=p[0];
      }
      if(p[1]>max[1]){
         max[1]=p[1];
      }
   }
   // Redimensionnement du canvas
   var _115=[4,4];
   min[0]=min[0]-_115[0];
   min[1]=min[1]-_115[1];
   max[0]=max[0]+_115[0];
   max[1]=max[1]+_115[1];
   var lw=Math.abs(max[0]-min[0]);
   var lh=Math.abs(max[1]-min[1]);
   this.el=WireIt.SetCanvasRegion(this.el,min[0],min[1],lw,lh);
   var ctxt=this.el.getContext("2d");
   for(var i=0;i<bezierPoints.length;i++){
      bezierPoints[i][0]=bezierPoints[i][0]-min[0];
      bezierPoints[i][1]=bezierPoints[i][1]-min[1];
   }
   
   // Drawing method
   
   ctxt.lineCap=this.config.bordercap;
   ctxt.strokeStyle=this.config.bordercolor;
   ctxt.lineWidth=this.config.width+this.config.borderwidth*2;
   ctxt.beginPath();
   ctxt.moveTo(bezierPoints[0][0],bezierPoints[0][1]);
   ctxt.bezierCurveTo(bezierPoints[1][0],bezierPoints[1][1],bezierPoints[2][0],bezierPoints[2][1],bezierPoints[3][0],bezierPoints[3][1]);
   ctxt.stroke();
   
   ctxt.lineCap=this.config.cap;
   ctxt.strokeStyle=this.config.color;
   ctxt.lineWidth=this.config.width;
   ctxt.beginPath();
   ctxt.moveTo(bezierPoints[0][0],bezierPoints[0][1]);
   ctxt.bezierCurveTo(bezierPoints[1][0],bezierPoints[1][1],bezierPoints[2][0],bezierPoints[2][1],bezierPoints[3][0],bezierPoints[3][1]);
   ctxt.stroke();
   
};