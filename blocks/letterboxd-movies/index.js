( function () {
	var el                = wp.element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var ServerSideRender  = wp.serverSideRender;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody         = wp.components.PanelBody;
	var RangeControl      = wp.components.RangeControl;
	var ToggleControl     = wp.components.ToggleControl;

	var letterboxdIcon = el(
		'svg',
		{ xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: 24, height: 24 },
		el( 'circle', { cx: '7',  cy: '12', r: '6', fill: '#00c030' } ),
		el( 'circle', { cx: '12', cy: '12', r: '6', fill: '#ff8000', opacity: '0.9' } ),
		el( 'circle', { cx: '17', cy: '12', r: '6', fill: '#3dbfbf', opacity: '0.85' } )
	);

	registerBlockType( 'letterboxd-movies/movies', {
		icon: letterboxdIcon,
		edit: function ( props ) {
			var attr = props.attributes;
			var set  = props.setAttributes;

			return [
				el(
					InspectorControls,
					{ key: 'inspector' },
					el(
						PanelBody,
						{ title: 'Display Settings', initialOpen: true },
						el( RangeControl, {
							label:    'Columns',
							value:    attr.columns,
							min:      1,
							max:      6,
							onChange: function ( v ) { set( { columns: v } ); },
						} ),
						el( RangeControl, {
							label:    'Number of movies',
							value:    attr.moviesCount,
							min:      1,
							max:      20,
							onChange: function ( v ) { set( { moviesCount: v } ); },
						} ),
						el( ToggleControl, {
							label:    'Show poster',
							checked:  attr.showImage,
							onChange: function ( v ) { set( { showImage: v } ); },
						} ),
						el( ToggleControl, {
							label:    'Show title',
							checked:  attr.showTitle,
							onChange: function ( v ) { set( { showTitle: v } ); },
						} ),
						el( ToggleControl, {
							label:    'Show rating',
							checked:  attr.showRating,
							onChange: function ( v ) { set( { showRating: v } ); },
						} )
					)
				),
				el(
					ServerSideRender,
					{
						key:        'preview',
						block:      'letterboxd-movies/movies',
						attributes: attr,
					}
				),
			];
		},
		save: function () {
			return null;
		},
	} );
} )();
