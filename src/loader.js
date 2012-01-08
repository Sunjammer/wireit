YUI().use(function(Y) {
   
	var CONFIG = {
		groups: {
			'wireit': {
				base: 'wireit/src/',
				combine: false,
				modules: {
					
					/**
					 * Wire
					 */
					'wire-base': {
					    skinnable: true,
					    requires: ['widget','widget-position']
					},
					'canvas-node': {
					   requires: ['node']
					},
					'canvas-wire': {
					    requires: ['wire-base','canvas-node']
					},
					'bezier-wire': {
					    requires: ['canvas-wire']
					},
					'wire': {
						requires: ['canvas-wire']
					},
					'wires-delegate': {
					    requires: ['wire-base']
					},
					
					
					/**
					 * Terminal
					 */
					'terminal-base': {
						requires: ['widget','widget-child','widget-position','widget-position-align','wire-base', 'wires-delegate']
					},
					'terminal-dragedit': {
						requires: ['dd-drop', 'dd-drag','dd-proxy']
					},
					'terminal-scissors': {
						requires: ['overlay']
					},
					'terminal-groups': {
						requires: ['terminal-dragedit']
					},
					'terminal': { // aka editable terminal
					    skinnable: true,
						requires: ['terminal-base', 'terminal-dragedit', 'terminal-scissors', 'terminal-groups']
					},
					
					
					/**
					 * Container
					 */
					'container-base': {
					   requires: ['overlay','widget-parent','widget-child','dd','resize','terminal','wires-delegate']
					},
					'container': {
					   skinnable: true,
					   requires: ['container-base']
					},
					'image-container': {
						requires: ['container-base']
					},
					'form-container': {
						requires: ['container','inputex-group','inputex-string']
					},
					'inout-container': {
						requires: ['container']
					},
					
					/**
					 * Layer
					 */
					'layer': {
					  requires: ['widget-parent','container','wires-delegate']
					},
					
					
					/**
					 * App
					 */
					'container-type': {
						requires: ['model', 'model-list', 'json', 'view']
					},
					'wiring-model': {
						requires: ['model', 'model-list', 'json', 'view']
					},
					'wireit-app': {
						requires: ['app', 'handlebars', 'container-type', 'wiring-model', 'layer', 'bezier-wire']
					}
					
				}
			}
		}
	};

	if(typeof YUI_config === 'undefined') { YUI_config = {groups: {}}; }
	Y.mix(YUI_config.groups, CONFIG.groups);

});
