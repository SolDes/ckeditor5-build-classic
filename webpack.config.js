/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	devtool: 'source-map',
	performance: { hints: false },

	entry: path.resolve( __dirname, 'src', 'ckeditor.js' ),

	output: {
		// The name under which the editor will be exported.
		library: 'ClassicEditor',

		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			} )
		]
	},

	plugins: [
		new CKEditorWebpackPlugin( {
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: 'all'
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} ),
		new webpack.NormalModuleReplacementPlugin(
			/pilcrow\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/edit_form.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/bold\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/bold.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/italic\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/italic.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/underline\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/underline.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/link\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/link.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/unlink\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/remove_link.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/code\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/insert_tag_field.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-left\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/left_align_text.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-center\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/center_align_text.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-right\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/right_align_text.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-justify\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/justify_text.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/bulletedlist\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/richtextbulletedlist.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/numberedlist\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/richtextnumberedlist.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/indent\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/richtextindent.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/outdent\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/richtextoutdent.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/image\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/image.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/media\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/video.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/table\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/table.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/undo\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/undo.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/redo\.svg/,
			path.resolve( __dirname, 'theme' ) + '/icons/utility/redo.svg'
		)
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag'
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
							},
							minify: true
						} )
					}
				]
			}
		]
	}
};
