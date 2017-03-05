/**
 * cui	demo预览配置
 * @type {Object}
 * @property {object} cuilist 按名字顺序显示组件
 * @property {string} cuiNameListTemplate cui组件名称view模版
 */

config={
	"widgetGroup":{
		"init":[
			"init",
			"init-ec",
			"init-health",
			"init-avatar"
		],
		"ui-btn":[
			"ui-btn",
			"ui-btn.ui-btn-primary",
			"ui-btn.ui-btn-danger",
			"ui-btn.ui-btn-lg",
			"ui-btn.ui-btn-lg.ui-btn-primary",
			"ui-btn.ui-btn-lg.ui-btn-danger"
		],
		"c-border":[
			"c-border-t",
			"c-border-b",
			"c-border-l",
			"c-border-r",
			"c-border-tb"
		],
		"ui-list":[
			"ui-list.c-border-tb",
			"ui-list.ui-list-function.c-border-tb",
			"ui-list.ui-list-avatar.c-border-tb",
			"ui-list.ui-list-avatar.ui-list-function.c-border-tb"
		],
		"ui-avatar":[
			"ui-avatar",
			"ui-avatar.ui-avatar-s",
			"lm-avatar",
			"ec-avatar"
		],
		"text":[
			"text-block",
			"ec-textblock-list"
		],
		"ec-btn":[
			"ec-btn",
			"ec-btn.ec-btn-primary",
			"ec-btn.ec-btn-disabled",
			"ec-btn.ec-btn-lg",
			"ec-btn.ec-btn-lg.ec-btn-primary",
			"ec-btn.ec-btn-lg.ec-btn-disabled"
		],
		"ec-grid":[
			"ec-grid.ec-grid-img.ec-grid-2",
			"ec-grid.ec-grid-img.ec-grid-info.ec-grid-2",
			"ec-grid.ec-grid-img.ec-grid-3",
			"ec-grid.ec-grid-img.ec-grid-4"
		],
		"ec-ico":[
			"ec-ico-limitsale"
		],
		"ec-searchbar":[
			"ec-searchbar"
		],
		"ec-copyright":[
			"ec-copyright"
		],
		"list":[
			"list",
			"list.list-rule"
		],
		"ec-list":[
			"ec-list.c-border-tb",
			"ec-list-v1"
		],
		"lm-list":[
			"lm-list",
			"lm-list.lm-list-avatar",
			"lm-list.lm-list-type1"
		],
		"lm-widget":[
			"lm-widget1",
			"lm-widget2",
			"lm-widget-banner"
		],
		"lm-tab":[
			"lm-tab"
		],
		"ui-slider":[
			"ui-slider"
		],
		"card-page":[
			"card-page"
		],
		"dialog":[
			"dialog"
		],
		"swipe":[
			"swipe"
		],
		"js-link":[
			"js-zepto.min",
			"js-rem.min",
			"js-motion.loader",
			"js-motion.pageslide",
			"js-motion.loader.pageslide",
			"js-ui.min",
			"js-ui.slider.min",
		],
		"class":[
			"c-nowrap",
			"c-nowrap-multi"
		],
		"style":[
			"style-font",
			"style-layout-absolute",
			"style-layout-full-absolute",
			"style-background",
			"style-sprite-px",
			"style-sprite-rem",
			"style-display-box",
			"style-text-block",
			"style-keyframes",
			"style-animation",
			"style-nowrap-multi",
			"style-nowrap"
		],
	},
	//iframe结构的
	"iframe":[
		"dialog",
		"swipe",
		"card-page",
		"ui-slider",
		"ec-searchbar"
	],
	//不显示的组合
	"noview":[
		"init",
		"class",
		"style",
		"js-link"
	],
	/*module 中的相对路径*/
	"jadePath":"../../../ui/src/jade",
	"htmlPath":"../../../ui/dist/html",
	"sassPath":"../../../ui/src/sass",
	"cssPath":"../../../ui/dist/css",
	"outputCUIDataPath":"../../dist/js/CUIData.js",
	"outputCUIDataJsonPath":"../../dist/js/CUIData.json",
	/*拷贝ui的css给demo做预览使用*/
	"inputCUICssPath":"../../../ui/dist/css/cui.css",
	"outputCUICssPath":"../../dist/css/cui.css"
}
module.exports=config;


