(function(){var $,Lightbox,LightboxOptions;$=jQuery;LightboxOptions=(function(){function LightboxOptions(){this.fadeDuration=500;this.fitImagesInViewport=true;this.resizeDuration=700;this.showImageNumberLabel=true;this.wrapAround=false}LightboxOptions.prototype.albumLabel=function(curImageNum,albumSize){return"Image "+curImageNum+" of "+albumSize};return LightboxOptions})();Lightbox=(function(){function Lightbox(options){this.options=options;this.album=[];this.currentImageIndex=void 0;this.init()}Lightbox.prototype.init=function(){this.enable();return this.build()};Lightbox.prototype.enable=function(){var _this=this;return $('body').on('click','a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]',function(e){_this.start($(e.currentTarget));return false})};Lightbox.prototype.build=function(){var _this=this;$("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo($('body'));this.$lightbox=$('#lightbox');this.$overlay=$('#lightboxOverlay');this.$outerContainer=this.$lightbox.find('.lb-outerContainer');this.$container=this.$lightbox.find('.lb-container');this.containerTopPadding=parseInt(this.$container.css('padding-top'),10);this.containerRightPadding=parseInt(this.$container.css('padding-right'),10);this.containerBottomPadding=parseInt(this.$container.css('padding-bottom'),10);this.containerLeftPadding=parseInt(this.$container.css('padding-left'),10);this.$overlay.hide().on('click',function(){_this.end();return false});this.$lightbox.hide().on('click',function(e){if($(e.target).attr('id')==='lightbox'){_this.end()}return false});this.$outerContainer.on('click',function(e){if($(e.target).attr('id')==='lightbox'){_this.end()}return false});this.$lightbox.find('.lb-prev').on('click',function(){if(_this.currentImageIndex===0){_this.changeImage(_this.album.length-1)}else{_this.changeImage(_this.currentImageIndex-1)}return false});this.$lightbox.find('.lb-next').on('click',function(){if(_this.currentImageIndex===_this.album.length-1){_this.changeImage(0)}else{_this.changeImage(_this.currentImageIndex+1)}return false});return this.$lightbox.find('.lb-loader, .lb-close').on('click',function(){_this.end();return false})};Lightbox.prototype.start=function($link){var $window,a,dataLightboxValue,i,imageNumber,left,top,_i,_j,_len,_len1,_ref,_ref1;$(window).on("resize",this.sizeOverlay);$('select, object, embed').css({visibility:"hidden"});this.$overlay.width($(document).width()).height($(document).height()).fadeIn(this.options.fadeDuration);this.album=[];imageNumber=0;dataLightboxValue=$link.attr('data-lightbox');if(dataLightboxValue){_ref=$($link.prop("tagName")+'[data-lightbox="'+dataLightboxValue+'"]');for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){a=_ref[i];this.album.push({link:$(a).attr('href'),title:$(a).attr('title')});if($(a).attr('href')===$link.attr('href')){imageNumber=i}}}else{if($link.attr('rel')==='lightbox'){this.album.push({link:$link.attr('href'),title:$link.attr('title')})}else{_ref1=$($link.prop("tagName")+'[rel="'+$link.attr('rel')+'"]');for(i=_j=0,_len1=_ref1.length;_j<_len1;i=++_j){a=_ref1[i];this.album.push({link:$(a).attr('href'),title:$(a).attr('title')});if($(a).attr('href')===$link.attr('href')){imageNumber=i}}}}$window=$(window);top=$window.scrollTop()+$window.height()/10;left=$window.scrollLeft();this.$lightbox.css({top:top+'px',left:left+'px'}).fadeIn(this.options.fadeDuration);this.changeImage(imageNumber)};Lightbox.prototype.changeImage=function(imageNumber){var $image,preloader,_this=this;this.disableKeyboardNav();$image=this.$lightbox.find('.lb-image');this.sizeOverlay();this.$overlay.fadeIn(this.options.fadeDuration);$('.lb-loader').fadeIn('slow');this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();this.$outerContainer.addClass('animating');preloader=new Image();preloader.onload=function(){var $preloader,imageHeight,imageWidth,maxImageHeight,maxImageWidth,windowHeight,windowWidth;$image.attr('src',_this.album[imageNumber].link);$preloader=$(preloader);$image.width(preloader.width);$image.height(preloader.height);if(_this.options.fitImagesInViewport){windowWidth=$(window).width();windowHeight=$(window).height();maxImageWidth=windowWidth-_this.containerLeftPadding-_this.containerRightPadding-20;maxImageHeight=windowHeight-_this.containerTopPadding-_this.containerBottomPadding-110;if((preloader.width>maxImageWidth)||(preloader.height>maxImageHeight)){if((preloader.width/maxImageWidth)>(preloader.height/maxImageHeight)){imageWidth=maxImageWidth;imageHeight=parseInt(preloader.height/(preloader.width/imageWidth),10);$image.width(imageWidth);$image.height(imageHeight)}else{imageHeight=maxImageHeight;imageWidth=parseInt(preloader.width/(preloader.height/imageHeight),10);$image.width(imageWidth);$image.height(imageHeight)}}}return _this.sizeContainer($image.width(),$image.height())};preloader.src=this.album[imageNumber].link;this.currentImageIndex=imageNumber};Lightbox.prototype.sizeOverlay=function(){return $('#lightboxOverlay').width($(document).width()).height($(document).height())};Lightbox.prototype.sizeContainer=function(imageWidth,imageHeight){var newHeight,newWidth,oldHeight,oldWidth,_this=this;oldWidth=this.$outerContainer.outerWidth();oldHeight=this.$outerContainer.outerHeight();newWidth=imageWidth+this.containerLeftPadding+this.containerRightPadding;newHeight=imageHeight+this.containerTopPadding+this.containerBottomPadding;this.$outerContainer.animate({width:newWidth,height:newHeight},this.options.resizeDuration,'swing');setTimeout(function(){_this.$lightbox.find('.lb-dataContainer').width(newWidth);_this.$lightbox.find('.lb-prevLink').height(newHeight);_this.$lightbox.find('.lb-nextLink').height(newHeight);_this.showImage()},this.options.resizeDuration)};Lightbox.prototype.showImage=function(){this.$lightbox.find('.lb-loader').hide();this.$lightbox.find('.lb-image').fadeIn('slow');this.updateNav();this.updateDetails();this.preloadNeighboringImages();this.enableKeyboardNav()};Lightbox.prototype.updateNav=function(){this.$lightbox.find('.lb-nav').show();if(this.album.length>1){if(this.options.wrapAround){this.$lightbox.find('.lb-prev, .lb-next').show()}else{if(this.currentImageIndex>0){this.$lightbox.find('.lb-prev').show()}if(this.currentImageIndex<this.album.length-1){this.$lightbox.find('.lb-next').show()}}}};Lightbox.prototype.updateDetails=function(){var _this=this;if(typeof this.album[this.currentImageIndex].title!=='undefined'&&this.album[this.currentImageIndex].title!==""){this.$lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast')}if(this.album.length>1&&this.options.showImageNumberLabel){this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex+1,this.album.length)).fadeIn('fast')}else{this.$lightbox.find('.lb-number').hide()}this.$outerContainer.removeClass('animating');this.$lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration,function(){return _this.sizeOverlay()})};Lightbox.prototype.preloadNeighboringImages=function(){var preloadNext,preloadPrev;if(this.album.length>this.currentImageIndex+1){preloadNext=new Image();preloadNext.src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){preloadPrev=new Image();preloadPrev.src=this.album[this.currentImageIndex-1].link}};Lightbox.prototype.enableKeyboardNav=function(){$(document).on('keyup.keyboard',$.proxy(this.keyboardAction,this))};Lightbox.prototype.disableKeyboardNav=function(){$(document).off('.keyboard')};Lightbox.prototype.keyboardAction=function(event){var KEYCODE_ESC,KEYCODE_LEFTARROW,KEYCODE_RIGHTARROW,key,keycode;KEYCODE_ESC=27;KEYCODE_LEFTARROW=37;KEYCODE_RIGHTARROW=39;keycode=event.keyCode;key=String.fromCharCode(keycode).toLowerCase();if(keycode===KEYCODE_ESC||key.match(/x|o|c/)){this.end()}else if(key==='p'||keycode===KEYCODE_LEFTARROW){if(this.currentImageIndex!==0){this.changeImage(this.currentImageIndex-1)}}else if(key==='n'||keycode===KEYCODE_RIGHTARROW){if(this.currentImageIndex!==this.album.length-1){this.changeImage(this.currentImageIndex+1)}}};Lightbox.prototype.end=function(){this.disableKeyboardNav();$(window).off("resize",this.sizeOverlay);this.$lightbox.fadeOut(this.options.fadeDuration);this.$overlay.fadeOut(this.options.fadeDuration);return $('select, object, embed').css({visibility:"visible"})};return Lightbox})();$(function(){var lightbox,options;options=new LightboxOptions();return lightbox=new Lightbox(options)})}).call(this);window.Modernizr=(function(window,document,undefined){var version='2.7.0',Modernizr={},enableClasses=true,docElement=document.documentElement,mod='modernizr',modElem=document.createElement(mod),mStyle=modElem.style,inputElem=document.createElement('input'),smile=':)',toString={}.toString,prefixes=' -webkit- -moz- -o- -ms- '.split(' '),omPrefixes='Webkit Moz O ms',cssomPrefixes=omPrefixes.split(' '),domPrefixes=omPrefixes.toLowerCase().split(' '),ns={'svg':'http://www.w3.org/2000/svg'},tests={},inputs={},attrs={},classes=[],slice=classes.slice,featureName,injectElementWithStyles=function(rule,callback,nodes,testnames){var style,ret,node,docOverflow,div=document.createElement('div'),body=document.body,fakeBody=body||document.createElement('body');if(parseInt(nodes,10)){while(nodes--){node=document.createElement('div');node.id=testnames?testnames[nodes]:mod+(nodes+1);div.appendChild(node)}}style=['&#173;','<style id="s',mod,'">',rule,'</style>'].join('');div.id=mod;(body?div:fakeBody).innerHTML+=style;fakeBody.appendChild(div);if(!body){fakeBody.style.background='';fakeBody.style.overflow='hidden';docOverflow=docElement.style.overflow;docElement.style.overflow='hidden';docElement.appendChild(fakeBody)}ret=callback(div,rule);if(!body){fakeBody.parentNode.removeChild(fakeBody);docElement.style.overflow=docOverflow}else{div.parentNode.removeChild(div)}return!!ret},testMediaQuery=function(mq){var matchMedia=window.matchMedia||window.msMatchMedia;if(matchMedia){return matchMedia(mq).matches}var bool;injectElementWithStyles('@media '+mq+' { #'+mod+' { position: absolute; } }',function(node){bool=(window.getComputedStyle?getComputedStyle(node,null):node.currentStyle)['position']=='absolute'});return bool},isEventSupported=(function(){var TAGNAMES={'select':'input','change':'input','submit':'form','reset':'form','error':'img','load':'img','abort':'img'};function isEventSupported(eventName,element){element=element||document.createElement(TAGNAMES[eventName]||'div');eventName='on'+eventName;var isSupported=eventName in element;if(!isSupported){if(!element.setAttribute){element=document.createElement('div')}if(element.setAttribute&&element.removeAttribute){element.setAttribute(eventName,'');isSupported=is(element[eventName],'function');if(!is(element[eventName],'undefined')){element[eventName]=undefined}element.removeAttribute(eventName)}}element=null;return isSupported}return isEventSupported})(),_hasOwnProperty=({}).hasOwnProperty,hasOwnProp;if(!is(_hasOwnProperty,'undefined')&&!is(_hasOwnProperty.call,'undefined')){hasOwnProp=function(object,property){return _hasOwnProperty.call(object,property)}}else{hasOwnProp=function(object,property){return((property in object)&&is(object.constructor.prototype[property],'undefined'))}}if(!Function.prototype.bind){Function.prototype.bind=function bind(that){var target=this;if(typeof target!="function"){throw new TypeError()}var args=slice.call(arguments,1),bound=function(){if(this instanceof bound){var F=function(){};F.prototype=target.prototype;var self=new F();var result=target.apply(self,args.concat(slice.call(arguments)));if(Object(result)===result){return result}return self}else{return target.apply(that,args.concat(slice.call(arguments)))}};return bound}}function setCss(str){mStyle.cssText=str}function setCssAll(str1,str2){return setCss(prefixes.join(str1+';')+(str2||''))}function is(obj,type){return typeof obj===type}function contains(str,substr){return!!~(''+str).indexOf(substr)}function testProps(props,prefixed){for(var i in props){var prop=props[i];if(!contains(prop,"-")&&mStyle[prop]!==undefined){return prefixed=='pfx'?prop:true}}return false}function testDOMProps(props,obj,elem){for(var i in props){var item=obj[props[i]];if(item!==undefined){if(elem===false)return props[i];if(is(item,'function')){return item.bind(elem||obj)}return item}}return false}function testPropsAll(prop,prefixed,elem){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+' '+cssomPrefixes.join(ucProp+' ')+ucProp).split(' ');if(is(prefixed,"string")||is(prefixed,"undefined")){return testProps(props,prefixed)}else{props=(prop+' '+(domPrefixes).join(ucProp+' ')+ucProp).split(' ');return testDOMProps(props,prefixed,elem)}}tests['flexbox']=function(){return testPropsAll('flexWrap')};tests['canvas']=function(){var elem=document.createElement('canvas');return!!(elem.getContext&&elem.getContext('2d'))};tests['canvastext']=function(){return!!(Modernizr['canvas']&&is(document.createElement('canvas').getContext('2d').fillText,'function'))};tests['webgl']=function(){return!!window.WebGLRenderingContext};tests['touch']=function(){var bool;if(('ontouchstart'in window)||window.DocumentTouch&&document instanceof DocumentTouch){bool=true}else{injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''),function(node){bool=node.offsetTop===9})}return bool};tests['geolocation']=function(){return'geolocation'in navigator};tests['postmessage']=function(){return!!window.postMessage};tests['websqldatabase']=function(){return!!window.openDatabase};tests['indexedDB']=function(){return!!testPropsAll("indexedDB",window)};tests['hashchange']=function(){return isEventSupported('hashchange',window)&&(document.documentMode===undefined||document.documentMode>7)};tests['history']=function(){return!!(window.history&&history.pushState)};tests['draganddrop']=function(){var div=document.createElement('div');return('draggable'in div)||('ondragstart'in div&&'ondrop'in div)};tests['websockets']=function(){return'WebSocket'in window||'MozWebSocket'in window};tests['rgba']=function(){setCss('background-color:rgba(150,255,150,.5)');return contains(mStyle.backgroundColor,'rgba')};tests['hsla']=function(){setCss('background-color:hsla(120,40%,100%,.5)');return contains(mStyle.backgroundColor,'rgba')||contains(mStyle.backgroundColor,'hsla')};tests['multiplebgs']=function(){setCss('background:url(https://),url(https://),red url(https://)');return(/(url\s*\(.*?){3}/).test(mStyle.background)};tests['backgroundsize']=function(){return testPropsAll('backgroundSize')};tests['borderimage']=function(){return testPropsAll('borderImage')};tests['borderradius']=function(){return testPropsAll('borderRadius')};tests['boxshadow']=function(){return testPropsAll('boxShadow')};tests['textshadow']=function(){return document.createElement('div').style.textShadow===''};tests['opacity']=function(){setCssAll('opacity:.55');return(/^0.55$/).test(mStyle.opacity)};tests['cssanimations']=function(){return testPropsAll('animationName')};tests['csscolumns']=function(){return testPropsAll('columnCount')};tests['cssgradients']=function(){var str1='background-image:',str2='gradient(linear,left top,right bottom,from(#9f9),to(white));',str3='linear-gradient(left top,#9f9, white);';setCss((str1+'-webkit- '.split(' ').join(str2+str1)+prefixes.join(str3+str1)).slice(0,-str1.length));return contains(mStyle.backgroundImage,'gradient')};tests['cssreflections']=function(){return testPropsAll('boxReflect')};tests['csstransforms']=function(){return!!testPropsAll('transform')};tests['csstransforms3d']=function(){var ret=!!testPropsAll('perspective');if(ret&&'webkitPerspective'in docElement.style){injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}',function(node,rule){ret=node.offsetLeft===9&&node.offsetHeight===3})}return ret};tests['csstransitions']=function(){return testPropsAll('transition')};tests['fontface']=function(){var bool;injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}',function(node,rule){var style=document.getElementById('smodernizr'),sheet=style.sheet||style.styleSheet,cssText=sheet?(sheet.cssRules&&sheet.cssRules[0]?sheet.cssRules[0].cssText:sheet.cssText||''):'';bool=/src/i.test(cssText)&&cssText.indexOf(rule.split(' ')[0])===0});return bool};tests['generatedcontent']=function(){var bool;injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''),function(node){bool=node.offsetHeight>=3});return bool};tests['video']=function(){var elem=document.createElement('video'),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,'');bool.h264=elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,'');bool.webm=elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'')}}catch(e){}return bool};tests['audio']=function(){var elem=document.createElement('audio'),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');bool.mp3=elem.canPlayType('audio/mpeg;').replace(/^no$/,'');bool.wav=elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'');bool.m4a=(elem.canPlayType('audio/x-m4a;')||elem.canPlayType('audio/aac;')).replace(/^no$/,'')}}catch(e){}return bool};tests['localstorage']=function(){try{localStorage.setItem(mod,mod);localStorage.removeItem(mod);return true}catch(e){return false}};tests['sessionstorage']=function(){try{sessionStorage.setItem(mod,mod);sessionStorage.removeItem(mod);return true}catch(e){return false}};tests['webworkers']=function(){return!!window.Worker};tests['applicationcache']=function(){return!!window.applicationCache};tests['svg']=function(){return!!document.createElementNS&&!!document.createElementNS(ns.svg,'svg').createSVGRect};tests['inlinesvg']=function(){var div=document.createElement('div');div.innerHTML='<svg/>';return(div.firstChild&&div.firstChild.namespaceURI)==ns.svg};tests['smil']=function(){return!!document.createElementNS&&/SVGAnimate/.test(toString.call(document.createElementNS(ns.svg,'animate')))};tests['svgclippaths']=function(){return!!document.createElementNS&&/SVGClipPath/.test(toString.call(document.createElementNS(ns.svg,'clipPath')))};function webforms(){Modernizr['input']=(function(props){for(var i=0,len=props.length;i<len;i++){attrs[props[i]]=!!(props[i]in inputElem)}if(attrs.list){attrs.list=!!(document.createElement('datalist')&&window.HTMLDataListElement)}return attrs})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));Modernizr['inputtypes']=(function(props){for(var i=0,bool,inputElemType,defaultView,len=props.length;i<len;i++){inputElem.setAttribute('type',inputElemType=props[i]);bool=inputElem.type!=='text';if(bool){inputElem.value=smile;inputElem.style.cssText='position:absolute;visibility:hidden;';if(/^range$/.test(inputElemType)&&inputElem.style.WebkitAppearance!==undefined){docElement.appendChild(inputElem);defaultView=document.defaultView;bool=defaultView.getComputedStyle&&defaultView.getComputedStyle(inputElem,null).WebkitAppearance!=='textfield'&&(inputElem.offsetHeight!==0);docElement.removeChild(inputElem)}else if(/^(search|tel)$/.test(inputElemType)){}else if(/^(url|email)$/.test(inputElemType)){bool=inputElem.checkValidity&&inputElem.checkValidity()===false}else{bool=inputElem.value!=smile}}inputs[props[i]]=!!bool}return inputs})('search tel url email datetime date month week time datetime-local number range color'.split(' '))}for(var feature in tests){if(hasOwnProp(tests,feature)){featureName=feature.toLowerCase();Modernizr[featureName]=tests[feature]();classes.push((Modernizr[featureName]?'':'no-')+featureName)}}Modernizr.input||webforms();Modernizr.addTest=function(feature,test){if(typeof feature=='object'){for(var key in feature){if(hasOwnProp(feature,key)){Modernizr.addTest(key,feature[key])}}}else{feature=feature.toLowerCase();if(Modernizr[feature]!==undefined){return Modernizr}test=typeof test=='function'?test():test;if(typeof enableClasses!=="undefined"&&enableClasses){docElement.className+=' '+(test?'':'no-')+feature}Modernizr[feature]=test}return Modernizr};setCss('');modElem=inputElem=null;(function(window,document){var version='3.7.0';var options=window.html5||{};var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var supportsHtml5Styles;var expando='_html5shiv';var expanID=0;var expandoData={};var supportsUnknownElements;(function(){try{var a=document.createElement('a');a.innerHTML='<xyz></xyz>';supportsHtml5Styles=('hidden'in a);supportsUnknownElements=a.childNodes.length==1||(function(){(document.createElement)('a');var frag=document.createDocumentFragment();return(typeof frag.cloneNode=='undefined'||typeof frag.createDocumentFragment=='undefined'||typeof frag.createElement=='undefined')}())}catch(e){supportsHtml5Styles=true;supportsUnknownElements=true}}());function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement('p'),parent=ownerDocument.getElementsByTagName('head')[0]||ownerDocument.documentElement;p.innerHTML='x<style>'+cssText+'</style>';return parent.insertBefore(p.lastChild,parent.firstChild)}function getElements(){var elements=html5.elements;return typeof elements=='string'?elements.split(' '):elements}function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID++;ownerDocument[expando]=expanID;expandoData[expanID]=data}return data}function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createElement(nodeName)}if(!data){data=getExpandoData(ownerDocument)}var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode()}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode()}else{node=data.createElem(nodeName)}return node.canHaveChildren&&!reSkip.test(nodeName)&&!node.tagUrn?data.frag.appendChild(node):node}function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createDocumentFragment()}data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i++){clone.createElement(elems[i])}return clone}function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag()}ownerDocument.createElement=function(nodeName){if(!html5.shivMethods){return data.createElem(nodeName)}return createElement(nodeName,ownerDocument,data)};ownerDocument.createDocumentFragment=Function('h,f','return function(){'+'var n=f.cloneNode(),c=n.createElement;'+'h.shivMethods&&('+getElements().join().replace(/[\w\-]+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return'c("'+nodeName+'")'})+');return n}')(html5,data.frag)}function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document}var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}'+'mark{background:#FF0;color:#000}'+'template{display:none}')}if(!supportsUnknownElements){shivMethods(ownerDocument,data)}return ownerDocument}var html5={'elements':options.elements||'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video','version':version,'shivCSS':(options.shivCSS!==false),'supportsUnknownElements':supportsUnknownElements,'shivMethods':(options.shivMethods!==false),'type':'default','shivDocument':shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment};window.html5=html5;shivDocument(document)}(this,document));Modernizr._version=version;Modernizr._prefixes=prefixes;Modernizr._domPrefixes=domPrefixes;Modernizr._cssomPrefixes=cssomPrefixes;Modernizr.mq=testMediaQuery;Modernizr.hasEvent=isEventSupported;Modernizr.testProp=function(prop){return testProps([prop])};Modernizr.testAllProps=testPropsAll;Modernizr.testStyles=injectElementWithStyles;Modernizr.prefixed=function(prop,obj,elem){if(!obj){return testPropsAll(prop,'pfx')}else{return testPropsAll(prop,obj,elem)}};docElement.className=docElement.className.replace(/(^|\s)no-js(\s|$)/,'$1$2')+(enableClasses?' js '+classes.join(' '):'');return Modernizr})(this,this.document);(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};$(document).ready(function(){$("#logout").bind("click",function(){window.location="index.php"});$('#mess_container').hide();$("#add_btn").bind("click",function(){var name_val=$('#name_txt').val();var message_val=$('#message_ta').val();var pid=$('#mess_inputs').val();var token=$('#token').val();$.ajax({type:"GET",url:"functions.php",data:{function:"add",name:name_val,message:message_val,pid:pid, token: token}}).done(function(data){alert(data)})});$('.producer-link').on('click',function(event){var pid=$(this).data('id');changeProducer(pid)});function changeProducer(pid){$("#mess_inputs").val(pid);$("#mess_p_mess").text("");$.ajax({type:"GET",url:"functions.php",data:{function:"producers",pid:pid}}).done(function(data){console.log(data);var j=JSON.parse(data);$("#mess_p_headline").text("Meddelande till "+j.name+", "+j.city);if(j.url!==""){$("#mess_p_kontakt").text("Länk till deras hemsida "+j.url)}else{$("#mess_p_kontakt").text("Producenten har ingen webbsida")}if(j.imageURL!==""){$("#p_img_link").attr("href",j.imageURL);$("#p_img").attr("src",j.imageURL)}else{$("#p_img_link").attr("href","#");$("#p_img").attr("src","img/noimg.jpg")}});$.ajax({type:"GET",url:"functions.php",data:{function:"getIdsOfMessages",pid:pid}}).done(function(data){var ids=JSON.parse(data);if(ids!==false){ids.forEach(function(entry){$.ajax({type:"GET",url:"functions.php",data:{function:"getMessage",serial:entry.serial},timeout:2000}).done(function(data){var j=JSON.parse(data);$("#mess_p_mess").append("<p class='message_container'>"+j.message+"<br />Skrivet av: "+j.name+"</p>")})})}});$("#mess_container").show("slow")}});