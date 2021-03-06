/*! Built with IMPACT - impactjs.com */

(function(window){"use strict";Number.prototype.map=function(istart,istop,ostart,ostop){return ostart+(ostop-ostart)*((this-istart)/(istop-istart));};Number.prototype.limit=function(min,max){return Math.min(max,Math.max(min,this));};Number.prototype.round=function(precision){precision=Math.pow(10,precision||0);return Math.round(this*precision)/precision;};Number.prototype.floor=function(){return Math.floor(this);};Number.prototype.ceil=function(){return Math.ceil(this);};Number.prototype.toInt=function(){return(this|0);};Number.prototype.toRad=function(){return(this/180)*Math.PI;};Number.prototype.toDeg=function(){return(this*180)/Math.PI;};Array.prototype.erase=function(item){for(var i=this.length;i--;){if(this[i]===item){this.splice(i,1);}}
return this;};Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)];};Function.prototype.bind=Function.prototype.bind||function(bind){var self=this;return function(){var args=Array.prototype.slice.call(arguments);return self.apply(bind||null,args);};};window.ig={game:null,debug:null,version:'1.20',global:window,modules:{},resources:[],ready:false,baked:false,nocache:'',ua:{},prefix:(window.ImpactPrefix||''),lib:'lib/',_current:null,_loadQueue:[],_waitForOnload:0,$:function(selector){return selector.charAt(0)=='#'?document.getElementById(selector.substr(1)):document.getElementsByTagName(selector);},$new:function(name){return document.createElement(name);},copy:function(object){if(!object||typeof(object)!='object'||object instanceof HTMLElement||object instanceof ig.Class){return object;}
else if(object instanceof Array){var c=[];for(var i=0,l=object.length;i<l;i++){c[i]=ig.copy(object[i]);}
return c;}
else{var c={};for(var i in object){c[i]=ig.copy(object[i]);}
return c;}},merge:function(original,extended){for(var key in extended){var ext=extended[key];if(typeof(ext)!='object'||ext instanceof HTMLElement||ext instanceof ig.Class){original[key]=ext;}
else{if(!original[key]||typeof(original[key])!='object'){original[key]=(ext instanceof Array)?[]:{};}
ig.merge(original[key],ext);}}
return original;},ksort:function(obj){if(!obj||typeof(obj)!='object'){return[];}
var keys=[],values=[];for(var i in obj){keys.push(i);}
keys.sort();for(var i=0;i<keys.length;i++){values.push(obj[keys[i]]);}
return values;},module:function(name){if(ig._current){throw("Module '"+ig._current.name+"' defines nothing");}
if(ig.modules[name]&&ig.modules[name].body){throw("Module '"+name+"' is already defined");}
ig._current={name:name,requires:[],loaded:false,body:null};ig.modules[name]=ig._current;ig._loadQueue.push(ig._current);return ig;},requires:function(){ig._current.requires=Array.prototype.slice.call(arguments);return ig;},defines:function(body){ig._current.body=body;ig._current=null;ig._initDOMReady();},addResource:function(resource){ig.resources.push(resource);},setNocache:function(set){ig.nocache=set?'?'+Date.now():'';},log:function(){},assert:function(condition,msg){},show:function(name,number){},mark:function(msg,color){},_loadScript:function(name,requiredFrom){ig.modules[name]={name:name,requires:[],loaded:false,body:null};ig._waitForOnload++;var path=ig.prefix+ig.lib+name.replace(/\./g,'/')+'.js'+ig.nocache;var script=ig.$new('script');script.type='text/javascript';script.src=path;script.onload=function(){ig._waitForOnload--;ig._execModules();};script.onerror=function(){throw('Failed to load module '+name+' at '+path+' '+'required from '+requiredFrom);};ig.$('head')[0].appendChild(script);},_execModules:function(){var modulesLoaded=false;for(var i=0;i<ig._loadQueue.length;i++){var m=ig._loadQueue[i];var dependenciesLoaded=true;for(var j=0;j<m.requires.length;j++){var name=m.requires[j];if(!ig.modules[name]){dependenciesLoaded=false;ig._loadScript(name,m.name);}
else if(!ig.modules[name].loaded){dependenciesLoaded=false;}}
if(dependenciesLoaded&&m.body){ig._loadQueue.splice(i,1);m.loaded=true;m.body();modulesLoaded=true;i--;}}
if(modulesLoaded){ig._execModules();}
else if(!ig.baked&&ig._waitForOnload==0&&ig._loadQueue.length!=0){var unresolved=[];for(var i=0;i<ig._loadQueue.length;i++){var unloaded=[];var requires=ig._loadQueue[i].requires;for(var j=0;j<requires.length;j++){var m=ig.modules[requires[j]];if(!m||!m.loaded){unloaded.push(requires[j]);}}
unresolved.push(ig._loadQueue[i].name+' (requires: '+unloaded.join(', ')+')');}
throw('Unresolved (circular?) dependencies. '+"Most likely there's a name/path mismatch for one of the listed modules:\n"+
unresolved.join('\n'));}},_DOMReady:function(){if(!ig.modules['dom.ready'].loaded){if(!document.body){return setTimeout(ig._DOMReady,13);}
ig.modules['dom.ready'].loaded=true;ig._waitForOnload--;ig._execModules();}
return 0;},_boot:function(){if(document.location.href.match(/\?nocache/)){ig.setNocache(true);}
ig.ua.pixelRatio=window.devicePixelRatio||1;ig.ua.viewport={width:window.innerWidth,height:window.innerHeight};ig.ua.screen={width:window.screen.availWidth*ig.ua.pixelRatio,height:window.screen.availHeight*ig.ua.pixelRatio};ig.ua.iPhone=/iPhone/i.test(navigator.userAgent);ig.ua.iPhone4=(ig.ua.iPhone&&ig.ua.pixelRatio==2);ig.ua.iPad=/iPad/i.test(navigator.userAgent);ig.ua.android=/android/i.test(navigator.userAgent);ig.ua.iOS=ig.ua.iPhone||ig.ua.iPad;ig.ua.mobile=ig.ua.iOS||ig.ua.android;},_initDOMReady:function(){if(ig.modules['dom.ready']){ig._execModules();return;}
ig._boot();ig.modules['dom.ready']={requires:[],loaded:false,body:null};ig._waitForOnload++;if(document.readyState==='complete'){ig._DOMReady();}
else{document.addEventListener('DOMContentLoaded',ig._DOMReady,false);window.addEventListener('load',ig._DOMReady,false);}}};var vendors=['ms','moz','webkit','o'];for(var i=0;i<vendors.length&&!window.requestAnimationFrame;i++){window.requestAnimationFrame=window[vendors[i]+'RequestAnimationFrame'];}
if(window.requestAnimationFrame){var next=1,anims={};window.ig.setAnimation=function(callback,element){var current=next++;anims[current]=true;var animate=function(){if(!anims[current]){return;}
window.requestAnimationFrame(animate,element);callback();};window.requestAnimationFrame(animate,element);return current;};window.ig.clearAnimation=function(id){delete anims[id];};}
else{window.ig.setAnimation=function(callback,element){return window.setInterval(callback,1000/60);};window.ig.clearAnimation=function(id){window.clearInterval(id);};}
var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\bparent\b/:/.*/;window.ig.Class=function(){};var inject=function(prop){var proto=this.prototype;var parent={};for(var name in prop){if(typeof(prop[name])=="function"&&typeof(proto[name])=="function"&&fnTest.test(prop[name])){parent[name]=proto[name];proto[name]=(function(name,fn){return function(){var tmp=this.parent;this.parent=parent[name];var ret=fn.apply(this,arguments);this.parent=tmp;return ret;};})(name,prop[name]);}
else{proto[name]=prop[name];}}};window.ig.Class.extend=function(prop){var parent=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){if(typeof(prop[name])=="function"&&typeof(parent[name])=="function"&&fnTest.test(prop[name])){prototype[name]=(function(name,fn){return function(){var tmp=this.parent;this.parent=parent[name];var ret=fn.apply(this,arguments);this.parent=tmp;return ret;};})(name,prop[name]);}
else{prototype[name]=prop[name];}}
function Class(){if(!initializing){if(this.staticInstantiate){var obj=this.staticInstantiate.apply(this,arguments);if(obj){return obj;}}
for(var p in this){if(typeof(this[p])=='object'){this[p]=ig.copy(this[p]);}}
if(this.init){this.init.apply(this,arguments);}}
return this;}
Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=window.ig.Class.extend;Class.inject=inject;return Class;};})(window);

// lib/impact/image.js
ig.baked=true;ig.module('impact.image').defines(function(){"use strict";ig.Image=ig.Class.extend({data:null,width:0,height:0,loaded:false,failed:false,loadCallback:null,path:'',staticInstantiate:function(path){return ig.Image.cache[path]||null;},init:function(path){this.path=path;this.load();},load:function(loadCallback){if(this.loaded){if(loadCallback){loadCallback(this.path,true);}
return;}
else if(!this.loaded&&ig.ready){this.loadCallback=loadCallback||null;this.data=new Image();this.data.onload=this.onload.bind(this);this.data.onerror=this.onerror.bind(this);this.data.src=ig.prefix+this.path+ig.nocache;}
else{ig.addResource(this);}
ig.Image.cache[this.path]=this;},reload:function(){this.loaded=false;this.data=new Image();this.data.onload=this.onload.bind(this);this.data.src=this.path+'?'+Date.now();},onload:function(event){this.width=this.data.width;this.height=this.data.height;this.loaded=true;if(ig.system.scale!=1){this.resize(ig.system.scale);}
if(this.loadCallback){this.loadCallback(this.path,true);}},onerror:function(event){this.failed=true;if(this.loadCallback){this.loadCallback(this.path,false);}},resize:function(scale){var widthScaled=this.width*scale;var heightScaled=this.height*scale;var orig=ig.$new('canvas');orig.width=this.width;orig.height=this.height;var origCtx=orig.getContext('2d');origCtx.drawImage(this.data,0,0,this.width,this.height,0,0,this.width,this.height);var origPixels=origCtx.getImageData(0,0,this.width,this.height);var scaled=ig.$new('canvas');scaled.width=widthScaled;scaled.height=heightScaled;var scaledCtx=scaled.getContext('2d');var scaledPixels=scaledCtx.getImageData(0,0,widthScaled,heightScaled);for(var y=0;y<heightScaled;y++){for(var x=0;x<widthScaled;x++){var index=(Math.floor(y/scale)*this.width+Math.floor(x/scale))*4;var indexScaled=(y*widthScaled+x)*4;scaledPixels.data[indexScaled]=origPixels.data[index];scaledPixels.data[indexScaled+1]=origPixels.data[index+1];scaledPixels.data[indexScaled+2]=origPixels.data[index+2];scaledPixels.data[indexScaled+3]=origPixels.data[index+3];}}
scaledCtx.putImageData(scaledPixels,0,0);this.data=scaled;},draw:function(targetX,targetY,sourceX,sourceY,width,height){if(!this.loaded){return;}
var scale=ig.system.scale;sourceX=sourceX?sourceX*scale:0;sourceY=sourceY?sourceY*scale:0;width=(width?width:this.width)*scale;height=(height?height:this.height)*scale;ig.system.context.drawImage(this.data,sourceX,sourceY,width,height,ig.system.getDrawPos(targetX),ig.system.getDrawPos(targetY),width,height);ig.Image.drawCount++;},drawTile:function(targetX,targetY,tile,tileWidth,tileHeight,flipX,flipY){tileHeight=tileHeight?tileHeight:tileWidth;if(!this.loaded||tileWidth>this.width||tileHeight>this.height){return;}
var scale=ig.system.scale;var tileWidthScaled=Math.floor(tileWidth*scale);var tileHeightScaled=Math.floor(tileHeight*scale);var scaleX=flipX?-1:1;var scaleY=flipY?-1:1;if(flipX||flipY){ig.system.context.save();ig.system.context.scale(scaleX,scaleY);}
ig.system.context.drawImage(this.data,(Math.floor(tile*tileWidth)%this.width)*scale,(Math.floor(tile*tileWidth/this.width)*tileHeight)*scale,tileWidthScaled,tileHeightScaled,ig.system.getDrawPos(targetX)*scaleX-(flipX?tileWidthScaled:0),ig.system.getDrawPos(targetY)*scaleY-(flipY?tileHeightScaled:0),tileWidthScaled,tileHeightScaled);if(flipX||flipY){ig.system.context.restore();}
ig.Image.drawCount++;}});ig.Image.drawCount=0;ig.Image.cache={};ig.Image.reloadCache=function(){for(var path in ig.Image.cache){ig.Image.cache[path].reload();}};});

// lib/impact/font.js
ig.baked=true;ig.module('impact.font').requires('impact.image').defines(function(){"use strict";ig.Font=ig.Image.extend({widthMap:[],indices:[],firstChar:32,alpha:1,letterSpacing:1,lineSpacing:0,onload:function(ev){this._loadMetrics(this.data);this.parent(ev);},widthForString:function(text){if(text.indexOf('\n')!==-1){var lines=text.split('\n');var width=0;for(var i=0;i<lines.length;i++){width=Math.max(width,this._widthForLine(lines[i]));}
return width;}
else{return this._widthForLine(text);}},_widthForLine:function(text){var width=0;for(var i=0;i<text.length;i++){width+=this.widthMap[text.charCodeAt(i)-this.firstChar]+this.letterSpacing;}
return width;},heightForString:function(text){return text.split('\n').length*(this.height+this.lineSpacing);},draw:function(text,x,y,align){if(typeof(text)!='string'){text=text.toString();}
if(text.indexOf('\n')!==-1){var lines=text.split('\n');var lineHeight=this.height+this.lineSpacing;for(var i=0;i<lines.length;i++){this.draw(lines[i],x,y+i*lineHeight,align);}
return;}
if(align==ig.Font.ALIGN.RIGHT||align==ig.Font.ALIGN.CENTER){var width=this._widthForLine(text);x-=align==ig.Font.ALIGN.CENTER?width/2:width;}
if(this.alpha!==1){ig.system.context.globalAlpha=this.alpha;}
for(var i=0;i<text.length;i++){var c=text.charCodeAt(i);x+=this._drawChar(c-this.firstChar,x,y);}
if(this.alpha!==1){ig.system.context.globalAlpha=1;}
ig.Image.drawCount+=text.length;},_drawChar:function(c,targetX,targetY){if(!this.loaded||c<0||c>=this.indices.length){return 0;}
var scale=ig.system.scale;var charX=this.indices[c]*scale;var charY=0;var charWidth=this.widthMap[c]*scale;var charHeight=(this.height-2)*scale;ig.system.context.drawImage(this.data,charX,charY,charWidth,charHeight,ig.system.getDrawPos(targetX),ig.system.getDrawPos(targetY),charWidth,charHeight);return this.widthMap[c]+this.letterSpacing;},_loadMetrics:function(image){this.height=image.height-1;this.widthMap=[];this.indices=[];var canvas=ig.$new('canvas');canvas.width=image.width;canvas.height=image.height;var ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);var px=ctx.getImageData(0,image.height-1,image.width,1);var currentChar=0;var currentWidth=0;for(var x=0;x<image.width;x++){var index=x*4+3;if(px.data[index]!=0){currentWidth++;}
else if(px.data[index]==0&&currentWidth){this.widthMap.push(currentWidth);this.indices.push(x-currentWidth);currentChar++;currentWidth=0;}}
this.widthMap.push(currentWidth);this.indices.push(x-currentWidth);}});ig.Font.ALIGN={LEFT:0,RIGHT:1,CENTER:2};});

// lib/impact/sound.js
ig.baked=true;ig.module('impact.sound').defines(function(){"use strict";ig.SoundManager=ig.Class.extend({clips:{},volume:1,format:null,init:function(){var probe=new Audio();for(var i=0;i<ig.Sound.use.length;i++){var format=ig.Sound.use[i];if(probe.canPlayType(format.mime)){this.format=format;break;}}
if(!this.format){ig.Sound.enabled=false;}},load:function(path,multiChannel,loadCallback){var realPath=ig.prefix+path.replace(/[^\.]+$/,this.format.ext)+ig.nocache;if(this.clips[path]){if(multiChannel&&this.clips[path].length<ig.Sound.channels){for(var i=this.clips[path].length;i<ig.Sound.channels;i++){var a=new Audio(realPath);a.load();this.clips[path].push(a);}}
return this.clips[path][0];}
var clip=new Audio(realPath);if(loadCallback){clip.addEventListener('canplaythrough',function cb(ev){clip.removeEventListener('canplaythrough',cb,false);loadCallback(path,true,ev);},false);clip.addEventListener('error',function(ev){loadCallback(path,false,ev);},false);}
clip.preload='auto';clip.load();this.clips[path]=[clip];if(multiChannel){for(var i=1;i<ig.Sound.channels;i++){var a=new Audio(realPath);a.load();this.clips[path].push(a);}}
return clip;},get:function(path){var channels=this.clips[path];for(var i=0,clip;clip=channels[i++];){if(clip.paused||clip.ended){if(clip.ended){clip.currentTime=0;}
return clip;}}
channels[0].pause();channels[0].currentTime=0;return channels[0];}});ig.Music=ig.Class.extend({tracks:[],namedTracks:{},currentTrack:null,currentIndex:0,random:false,_volume:1,_loop:false,_fadeInterval:0,_fadeTimer:null,_endedCallbackBound:null,init:function(){this._endedCallbackBound=this._endedCallback.bind(this);if(Object.defineProperty){Object.defineProperty(this,"volume",{get:this.getVolume.bind(this),set:this.setVolume.bind(this)});Object.defineProperty(this,"loop",{get:this.getLooping.bind(this),set:this.setLooping.bind(this)});}
else if(this.__defineGetter__){this.__defineGetter__('volume',this.getVolume.bind(this));this.__defineSetter__('volume',this.setVolume.bind(this));this.__defineGetter__('loop',this.getLooping.bind(this));this.__defineSetter__('loop',this.setLooping.bind(this));}},add:function(music,name){if(!ig.Sound.enabled){return;}
var path=music instanceof ig.Sound?music.path:music;var track=ig.soundManager.load(path,false);track.loop=this._loop;track.volume=this._volume;track.addEventListener('ended',this._endedCallbackBound,false);this.tracks.push(track);if(name){this.namedTracks[name]=track;}
if(!this.currentTrack){this.currentTrack=track;}},next:function(){if(!this.tracks.length){return;}
this.stop();this.currentIndex=this.random?Math.floor(Math.random()*this.tracks.length):(this.currentIndex+1)%this.tracks.length;this.currentTrack=this.tracks[this.currentIndex];this.play();},pause:function(){if(!this.currentTrack){return;}
this.currentTrack.pause();},stop:function(){if(!this.currentTrack){return;}
this.currentTrack.pause();this.currentTrack.currentTime=0;},play:function(name){if(name&&this.namedTracks[name]){var newTrack=this.namedTracks[name];if(newTrack!=this.currentTrack){this.stop();this.currentTrack=newTrack;}}
else if(!this.currentTrack){return;}
this.currentTrack.play();},getLooping:function(){return this._loop;},setLooping:function(l){this._loop=l;for(var i in this.tracks){this.tracks[i].loop=l;}},getVolume:function(){return this._volume;},setVolume:function(v){this._volume=v.limit(0,1);for(var i in this.tracks){this.tracks[i].volume=this._volume;}},fadeOut:function(time){if(!this.currentTrack){return;}
clearInterval(this._fadeInterval);this.fadeTimer=new ig.Timer(time);this._fadeInterval=setInterval(this._fadeStep.bind(this),50);},_fadeStep:function(){var v=this.fadeTimer.delta().map(-this.fadeTimer.target,0,1,0).limit(0,1)*this._volume;if(v<=0.01){this.stop();this.currentTrack.volume=this._volume;clearInterval(this._fadeInterval);}
else{this.currentTrack.volume=v;}},_endedCallback:function(){if(this._loop){this.play();}
else{this.next();}}});ig.Sound=ig.Class.extend({path:'',volume:1,currentClip:null,multiChannel:true,init:function(path,multiChannel){this.path=path;this.multiChannel=(multiChannel!==false);this.load();},load:function(loadCallback){if(!ig.Sound.enabled){if(loadCallback){loadCallback(this.path,true);}
return;}
if(ig.ready){ig.soundManager.load(this.path,this.multiChannel,loadCallback);}
else{ig.addResource(this);}},play:function(){if(!ig.Sound.enabled){return;}
this.currentClip=ig.soundManager.get(this.path);this.currentClip.volume=ig.soundManager.volume*this.volume;this.currentClip.play();},stop:function(){if(this.currentClip){this.currentClip.pause();this.currentClip.currentTime=0;}}});ig.Sound.FORMAT={MP3:{ext:'mp3',mime:'audio/mpeg'},M4A:{ext:'m4a',mime:'audio/mp4; codecs=mp4a'},OGG:{ext:'ogg',mime:'audio/ogg; codecs=vorbis'},WEBM:{ext:'webm',mime:'audio/webm; codecs=vorbis'},CAF:{ext:'caf',mime:'audio/x-caf'}};ig.Sound.use=[ig.Sound.FORMAT.OGG,ig.Sound.FORMAT.MP3];ig.Sound.channels=4;ig.Sound.enabled=true;});

// lib/impact/loader.js
ig.baked=true;ig.module('impact.loader').requires('impact.image','impact.font','impact.sound').defines(function(){"use strict";ig.Loader=ig.Class.extend({resources:[],gameClass:null,status:0,done:false,_unloaded:[],_drawStatus:0,_intervalId:0,_loadCallbackBound:null,init:function(gameClass,resources){this.gameClass=gameClass;this.resources=resources;this._loadCallbackBound=this._loadCallback.bind(this);for(var i=0;i<this.resources.length;i++){this._unloaded.push(this.resources[i].path);}},load:function(){ig.system.clear('#000');if(!this.resources.length){this.end();return;}
for(var i=0;i<this.resources.length;i++){this.loadResource(this.resources[i]);}
this._intervalId=setInterval(this.draw.bind(this),16);},loadResource:function(res){res.load(this._loadCallbackBound);},end:function(){if(this.done){return;}
this.done=true;clearInterval(this._intervalId);ig.system.setGame(this.gameClass);},draw:function(){this._drawStatus+=(this.status-this._drawStatus)/5;var s=ig.system.scale;var w=ig.system.width*0.6;var h=ig.system.height*0.1;var x=ig.system.width*0.5-w/2;var y=ig.system.height*0.5-h/2;ig.system.context.fillStyle='#000';ig.system.context.fillRect(0,0,480,320);ig.system.context.fillStyle='#fff';ig.system.context.fillRect(x*s,y*s,w*s,h*s);ig.system.context.fillStyle='#000';ig.system.context.fillRect(x*s+s,y*s+s,w*s-s-s,h*s-s-s);ig.system.context.fillStyle='#fff';ig.system.context.fillRect(x*s,y*s,w*s*this._drawStatus,h*s);},_loadCallback:function(path,status){if(status){this._unloaded.erase(path);}
else{throw('Failed to load resource: '+path);}
this.status=1-(this._unloaded.length/this.resources.length);if(this._unloaded.length==0){setTimeout(this.end.bind(this),250);}}});});

// lib/impact/timer.js
ig.baked=true;ig.module('impact.timer').defines(function(){"use strict";ig.Timer=ig.Class.extend({target:0,base:0,last:0,pausedAt:0,init:function(seconds){this.base=ig.Timer.time;this.last=ig.Timer.time;this.target=seconds||0;},set:function(seconds){this.target=seconds||0;this.base=ig.Timer.time;this.pausedAt=0;},reset:function(){this.base=ig.Timer.time;this.pausedAt=0;},tick:function(){var delta=ig.Timer.time-this.last;this.last=ig.Timer.time;return(this.pausedAt?0:delta);},delta:function(){return(this.pausedAt||ig.Timer.time)-this.base-this.target;},pause:function(){if(!this.pausedAt){this.pausedAt=ig.Timer.time;}},unpause:function(){if(this.pausedAt){this.base+=ig.Timer.time-this.pausedAt;this.pausedAt=0;}}});ig.Timer._last=0;ig.Timer.time=0;ig.Timer.timeScale=1;ig.Timer.maxStep=0.05;ig.Timer.step=function(){var current=Date.now();var delta=(current-ig.Timer._last)/1000;ig.Timer.time+=Math.min(delta,ig.Timer.maxStep)*ig.Timer.timeScale;ig.Timer._last=current;};});

// lib/impact/system.js
ig.baked=true;ig.module('impact.system').requires('impact.timer','impact.image').defines(function(){"use strict";ig.System=ig.Class.extend({fps:30,width:320,height:240,realWidth:320,realHeight:240,scale:1,tick:0,animationId:0,newGameClass:null,running:false,delegate:null,clock:null,canvas:null,context:null,init:function(canvasId,fps,width,height,scale){this.fps=fps;this.clock=new ig.Timer();this.canvas=ig.$(canvasId);this.resize(width,height,scale);this.context=this.canvas.getContext('2d');this.getDrawPos=ig.System.drawMode;},resize:function(width,height,scale){this.width=width;this.height=height;this.scale=scale||this.scale;this.realWidth=this.width*this.scale;this.realHeight=this.height*this.scale;this.canvas.width=this.realWidth;this.canvas.height=this.realHeight;},setGame:function(gameClass){if(this.running){this.newGameClass=gameClass;}
else{this.setGameNow(gameClass);}},setGameNow:function(gameClass){ig.game=new(gameClass)();ig.system.setDelegate(ig.game);},setDelegate:function(object){if(typeof(object.run)=='function'){this.delegate=object;this.startRunLoop();}else{throw('System.setDelegate: No run() function in object');}},stopRunLoop:function(){ig.clearAnimation(this.animationId);this.running=false;},startRunLoop:function(){this.stopRunLoop();this.animationId=ig.setAnimation(this.run.bind(this),this.canvas);this.running=true;},clear:function(color){this.context.fillStyle=color;this.context.fillRect(0,0,this.realWidth,this.realHeight);},run:function(){ig.Timer.step();this.tick=this.clock.tick();this.delegate.run();ig.input.clearPressed();if(this.newGameClass){this.setGameNow(this.newGameClass);this.newGameClass=null;}},getDrawPos:null,});ig.System.DRAW={AUTHENTIC:function(p){return Math.round(p)*this.scale;},SMOOTH:function(p){return Math.round(p*this.scale);},SUBPIXEL:function(p){return p*this.scale;}};ig.System.drawMode=ig.System.DRAW.SMOOTH;});

// lib/impact/input.js
ig.baked=true;ig.module('impact.input').defines(function(){"use strict";ig.KEY={'MOUSE1':-1,'MOUSE2':-3,'MWHEEL_UP':-4,'MWHEEL_DOWN':-5,'BACKSPACE':8,'TAB':9,'ENTER':13,'PAUSE':19,'CAPS':20,'ESC':27,'SPACE':32,'PAGE_UP':33,'PAGE_DOWN':34,'END':35,'HOME':36,'LEFT_ARROW':37,'UP_ARROW':38,'RIGHT_ARROW':39,'DOWN_ARROW':40,'INSERT':45,'DELETE':46,'_0':48,'_1':49,'_2':50,'_3':51,'_4':52,'_5':53,'_6':54,'_7':55,'_8':56,'_9':57,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'NUMPAD_0':96,'NUMPAD_1':97,'NUMPAD_2':98,'NUMPAD_3':99,'NUMPAD_4':100,'NUMPAD_5':101,'NUMPAD_6':102,'NUMPAD_7':103,'NUMPAD_8':104,'NUMPAD_9':105,'MULTIPLY':106,'ADD':107,'SUBSTRACT':109,'DECIMAL':110,'DIVIDE':111,'F1':112,'F2':113,'F3':114,'F4':115,'F5':116,'F6':117,'F7':118,'F8':119,'F9':120,'F10':121,'F11':122,'F12':123,'SHIFT':16,'CTRL':17,'ALT':18,'PLUS':187,'COMMA':188,'MINUS':189,'PERIOD':190};ig.Input=ig.Class.extend({bindings:{},actions:{},presses:{},locks:{},delayedKeyup:{},isUsingMouse:false,isUsingKeyboard:false,isUsingAccelerometer:false,mouse:{x:0,y:0},accel:{x:0,y:0,z:0},initMouse:function(){if(this.isUsingMouse){return;}
this.isUsingMouse=true;var mouseWheelBound=this.mousewheel.bind(this);ig.system.canvas.addEventListener('mousewheel',mouseWheelBound,false);ig.system.canvas.addEventListener('DOMMouseScroll',mouseWheelBound,false);ig.system.canvas.addEventListener('contextmenu',this.contextmenu.bind(this),false);ig.system.canvas.addEventListener('mousedown',this.keydown.bind(this),false);ig.system.canvas.addEventListener('mouseup',this.keyup.bind(this),false);ig.system.canvas.addEventListener('mousemove',this.mousemove.bind(this),false);ig.system.canvas.addEventListener('touchstart',this.keydown.bind(this),false);ig.system.canvas.addEventListener('touchend',this.keyup.bind(this),false);ig.system.canvas.addEventListener('touchmove',this.mousemove.bind(this),false);},initKeyboard:function(){if(this.isUsingKeyboard){return;}
this.isUsingKeyboard=true;window.addEventListener('keydown',this.keydown.bind(this),false);window.addEventListener('keyup',this.keyup.bind(this),false);},initAccelerometer:function(){if(this.isUsingAccelerometer){return;}
window.addEventListener('devicemotion',this.devicemotion.bind(this),false);},mousewheel:function(event){var delta=event.wheelDelta?event.wheelDelta:(event.detail*-1);var code=delta>0?ig.KEY.MWHEEL_UP:ig.KEY.MWHEEL_DOWN;var action=this.bindings[code];if(action){this.actions[action]=true;this.presses[action]=true;this.delayedKeyup[action]=true;event.stopPropagation();event.preventDefault();}},mousemove:function(event){var el=ig.system.canvas;var pos={left:0,top:0};while(el!=null){pos.left+=el.offsetLeft;pos.top+=el.offsetTop;el=el.offsetParent;}
var tx=event.pageX;var ty=event.pageY;if(event.touches){tx=event.touches[0].clientX;ty=event.touches[0].clientY;}
this.mouse.x=(tx-pos.left)/ig.system.scale;this.mouse.y=(ty-pos.top)/ig.system.scale;},contextmenu:function(event){if(this.bindings[ig.KEY.MOUSE2]){event.stopPropagation();event.preventDefault();}},keydown:function(event){if(event.target.type=='text'){return;}
var code=event.type=='keydown'?event.keyCode:(event.button==2?ig.KEY.MOUSE2:ig.KEY.MOUSE1);if(event.type=='touchstart'||event.type=='mousedown'){this.mousemove(event);}
var action=this.bindings[code];if(action){this.actions[action]=true;if(!this.locks[action]){this.presses[action]=true;this.locks[action]=true;}
event.stopPropagation();event.preventDefault();}},keyup:function(event){if(event.target.type=='text'){return;}
var code=event.type=='keyup'?event.keyCode:(event.button==2?ig.KEY.MOUSE2:ig.KEY.MOUSE1);var action=this.bindings[code];if(action){this.delayedKeyup[action]=true;event.stopPropagation();event.preventDefault();}},devicemotion:function(event){this.accel=event.accelerationIncludingGravity;},bind:function(key,action){if(key<0){this.initMouse();}
else if(key>0){this.initKeyboard();}
this.bindings[key]=action;},bindTouch:function(selector,action){var element=ig.$(selector);var that=this;element.addEventListener('touchstart',function(ev){that.touchStart(ev,action);},false);element.addEventListener('touchend',function(ev){that.touchEnd(ev,action);},false);},unbind:function(key){var action=this.bindings[key];this.delayedKeyup[action]=true;this.bindings[key]=null;},unbindAll:function(){this.bindings={};this.actions={};this.presses={};this.locks={};this.delayedKeyup={};},state:function(action){return this.actions[action];},pressed:function(action){return this.presses[action];},released:function(action){return this.delayedKeyup[action];},clearPressed:function(){for(var action in this.delayedKeyup){this.actions[action]=false;this.locks[action]=false;}
this.delayedKeyup={};this.presses={};},touchStart:function(event,action){this.actions[action]=true;this.presses[action]=true;event.stopPropagation();event.preventDefault();return false;},touchEnd:function(event,action){this.delayedKeyup[action]=true;event.stopPropagation();event.preventDefault();return false;}});});

// lib/impact/impact.js
ig.baked=true;ig.module('impact.impact').requires('dom.ready','impact.loader','impact.system','impact.input','impact.sound').defines(function(){"use strict";ig.main=function(canvasId,gameClass,fps,width,height,scale,loaderClass){ig.system=new ig.System(canvasId,fps,width,height,scale||1);ig.input=new ig.Input();ig.soundManager=new ig.SoundManager();ig.music=new ig.Music();ig.ready=true;var loader=new(loaderClass||ig.Loader)(gameClass,ig.resources);loader.load();};});

// lib/impact/animation.js
ig.baked=true;ig.module('impact.animation').requires('impact.timer','impact.image').defines(function(){"use strict";ig.AnimationSheet=ig.Class.extend({width:8,height:8,image:null,init:function(path,width,height){this.width=width;this.height=height;this.image=new ig.Image(path);}});ig.Animation=ig.Class.extend({sheet:null,timer:null,sequence:[],flip:{x:false,y:false},pivot:{x:0,y:0},frame:0,tile:0,loopCount:0,alpha:1,angle:0,init:function(sheet,frameTime,sequence,stop){this.sheet=sheet;this.pivot={x:sheet.width/2,y:sheet.height/2};this.timer=new ig.Timer();this.frameTime=frameTime;this.sequence=sequence;this.stop=!!stop;this.tile=this.sequence[0];},rewind:function(){this.timer.set();this.loopCount=0;this.tile=this.sequence[0];return this;},gotoFrame:function(f){this.timer.set(this.frameTime*-f);this.update();},gotoRandomFrame:function(){this.gotoFrame(Math.floor(Math.random()*this.sequence.length))},update:function(){var frameTotal=Math.floor(this.timer.delta()/this.frameTime);this.loopCount=Math.floor(frameTotal/this.sequence.length);if(this.stop&&this.loopCount>0){this.frame=this.sequence.length-1;}
else{this.frame=frameTotal%this.sequence.length;}
this.tile=this.sequence[this.frame];},draw:function(targetX,targetY){var bbsize=Math.max(this.sheet.width,this.sheet.height);if(targetX>ig.system.width||targetY>ig.system.height||targetX+bbsize<0||targetY+bbsize<0){return;}
if(this.alpha!=1){ig.system.context.globalAlpha=this.alpha;}
if(this.angle==0){this.sheet.image.drawTile(targetX,targetY,this.tile,this.sheet.width,this.sheet.height,this.flip.x,this.flip.y);}
else{ig.system.context.save();ig.system.context.translate(ig.system.getDrawPos(targetX+this.pivot.x),ig.system.getDrawPos(targetY+this.pivot.y));ig.system.context.rotate(this.angle);this.sheet.image.drawTile(-this.pivot.x,-this.pivot.y,this.tile,this.sheet.width,this.sheet.height,this.flip.x,this.flip.y);ig.system.context.restore();}
if(this.alpha!=1){ig.system.context.globalAlpha=1;}}});});

// lib/impact/entity.js
ig.baked=true;ig.module('impact.entity').requires('impact.animation','impact.impact').defines(function(){"use strict";ig.Entity=ig.Class.extend({id:0,settings:{},size:{x:16,y:16},offset:{x:0,y:0},pos:{x:0,y:0},last:{x:0,y:0},vel:{x:0,y:0},accel:{x:0,y:0},friction:{x:0,y:0},maxVel:{x:100,y:100},zIndex:0,gravityFactor:1,standing:false,bounciness:0,minBounceVelocity:40,anims:{},animSheet:null,currentAnim:null,health:10,type:0,checkAgainst:0,collides:0,_killed:false,slopeStanding:{min:(44).toRad(),max:(136).toRad()},init:function(x,y,settings){this.id=++ig.Entity._lastId;this.pos.x=x;this.pos.y=y;ig.merge(this,settings);},addAnim:function(name,frameTime,sequence,stop){if(!this.animSheet){throw('No animSheet to add the animation '+name+' to.');}
var a=new ig.Animation(this.animSheet,frameTime,sequence,stop);this.anims[name]=a;if(!this.currentAnim){this.currentAnim=a;}
return a;},update:function(){this.last.x=this.pos.x;this.last.y=this.pos.y;this.vel.y+=ig.game.gravity*ig.system.tick*this.gravityFactor;this.vel.x=this.getNewVelocity(this.vel.x,this.accel.x,this.friction.x,this.maxVel.x);this.vel.y=this.getNewVelocity(this.vel.y,this.accel.y,this.friction.y,this.maxVel.y);var mx=this.vel.x*ig.system.tick;var my=this.vel.y*ig.system.tick;var res=ig.game.collisionMap.trace(this.pos.x,this.pos.y,mx,my,this.size.x,this.size.y);this.handleMovementTrace(res);if(this.currentAnim){this.currentAnim.update();}},getNewVelocity:function(vel,accel,friction,max){if(accel){return(vel+accel*ig.system.tick).limit(-max,max);}
else if(friction){var delta=friction*ig.system.tick;if(vel-delta>0){return vel-delta;}
else if(vel+delta<0){return vel+delta;}
else{return 0;}}
return vel.limit(-max,max);},handleMovementTrace:function(res){this.standing=false;if(res.collision.y){if(this.bounciness>0&&Math.abs(this.vel.y)>this.minBounceVelocity){this.vel.y*=-this.bounciness;}
else{if(this.vel.y>0){this.standing=true;}
this.vel.y=0;}}
if(res.collision.x){if(this.bounciness>0&&Math.abs(this.vel.x)>this.minBounceVelocity){this.vel.x*=-this.bounciness;}
else{this.vel.x=0;}}
if(res.collision.slope){var s=res.collision.slope;if(this.bounciness>0){var proj=this.vel.x*s.nx+this.vel.y*s.ny;this.vel.x=(this.vel.x-s.nx*proj*2)*this.bounciness;this.vel.y=(this.vel.y-s.ny*proj*2)*this.bounciness;}
else{var lengthSquared=s.x*s.x+s.y*s.y;var dot=(this.vel.x*s.x+this.vel.y*s.y)/lengthSquared;this.vel.x=s.x*dot;this.vel.y=s.y*dot;var angle=Math.atan2(s.x,s.y);if(angle>this.slopeStanding.min&&angle<this.slopeStanding.max){this.standing=true;}}}
this.pos=res.pos;},draw:function(){if(this.currentAnim){this.currentAnim.draw(this.pos.x-this.offset.x-ig.game._rscreen.x,this.pos.y-this.offset.y-ig.game._rscreen.y);}},kill:function(){ig.game.removeEntity(this);},receiveDamage:function(amount,from){this.health-=amount;if(this.health<=0){this.kill();}},touches:function(other){return!(this.pos.x>=other.pos.x+other.size.x||this.pos.x+this.size.x<=other.pos.x||this.pos.y>=other.pos.y+other.size.y||this.pos.y+this.size.y<=other.pos.y);},distanceTo:function(other){var xd=(this.pos.x+this.size.x/2)-(other.pos.x+other.size.x/2);var yd=(this.pos.y+this.size.y/2)-(other.pos.y+other.size.y/2);return Math.sqrt(xd*xd+yd*yd);},angleTo:function(other){return Math.atan2((other.pos.y+other.size.y/2)-(this.pos.y+this.size.y/2),(other.pos.x+other.size.x/2)-(this.pos.x+this.size.x/2));},check:function(other){},collideWith:function(other,axis){},ready:function(){}});ig.Entity._lastId=0;ig.Entity.COLLIDES={NEVER:0,LITE:1,PASSIVE:2,ACTIVE:4,FIXED:8};ig.Entity.TYPE={NONE:0,A:1,B:2,BOTH:3};ig.Entity.checkPair=function(a,b){if(a.checkAgainst&b.type){a.check(b);}
if(b.checkAgainst&a.type){b.check(a);}
if(a.collides&&b.collides&&a.collides+b.collides>ig.Entity.COLLIDES.ACTIVE){ig.Entity.solveCollision(a,b);}};ig.Entity.solveCollision=function(a,b){var weak=null;if(a.collides==ig.Entity.COLLIDES.LITE||b.collides==ig.Entity.COLLIDES.FIXED){weak=a;}
else if(b.collides==ig.Entity.COLLIDES.LITE||a.collides==ig.Entity.COLLIDES.FIXED){weak=b;}
if(a.last.x+a.size.x>b.last.x&&a.last.x<b.last.x+b.size.x){if(a.last.y<b.last.y){ig.Entity.seperateOnYAxis(a,b,weak);}
else{ig.Entity.seperateOnYAxis(b,a,weak);}
a.collideWith(b,'y');b.collideWith(a,'y');}
else if(a.last.y+a.size.y>b.last.y&&a.last.y<b.last.y+b.size.y){if(a.last.x<b.last.x){ig.Entity.seperateOnXAxis(a,b,weak);}
else{ig.Entity.seperateOnXAxis(b,a,weak);}
a.collideWith(b,'x');b.collideWith(a,'x');}};ig.Entity.seperateOnXAxis=function(left,right,weak){var nudge=(left.pos.x+left.size.x-right.pos.x);if(weak){var strong=left===weak?right:left;weak.vel.x=-weak.vel.x*weak.bounciness+strong.vel.x;var resWeak=ig.game.collisionMap.trace(weak.pos.x,weak.pos.y,weak==left?-nudge:nudge,0,weak.size.x,weak.size.y);weak.pos.x=resWeak.pos.x;}
else{var v2=(left.vel.x-right.vel.x)/2;left.vel.x=-v2;right.vel.x=v2;var resLeft=ig.game.collisionMap.trace(left.pos.x,left.pos.y,-nudge/2,0,left.size.x,left.size.y);left.pos.x=Math.floor(resLeft.pos.x);var resRight=ig.game.collisionMap.trace(right.pos.x,right.pos.y,nudge/2,0,right.size.x,right.size.y);right.pos.x=Math.ceil(resRight.pos.x);}};ig.Entity.seperateOnYAxis=function(top,bottom,weak){var nudge=(top.pos.y+top.size.y-bottom.pos.y);if(weak){var strong=top===weak?bottom:top;weak.vel.y=-weak.vel.y*weak.bounciness+strong.vel.y;var nudgeX=0;if(weak==top&&Math.abs(weak.vel.y-strong.vel.y)<weak.minBounceVelocity){weak.standing=true;nudgeX=strong.vel.x*ig.system.tick;}
var resWeak=ig.game.collisionMap.trace(weak.pos.x,weak.pos.y,nudgeX,weak==top?-nudge:nudge,weak.size.x,weak.size.y);weak.pos.y=resWeak.pos.y;weak.pos.x=resWeak.pos.x;}
else if(ig.game.gravity&&(bottom.standing||top.vel.y>0)){var resTop=ig.game.collisionMap.trace(top.pos.x,top.pos.y,0,-(top.pos.y+top.size.y-bottom.pos.y),top.size.x,top.size.y);top.pos.y=resTop.pos.y;if(top.bounciness>0&&top.vel.y>top.minBounceVelocity){top.vel.y*=-top.bounciness;}
else{top.standing=true;top.vel.y=0;}}
else{var v2=(top.vel.y-bottom.vel.y)/2;top.vel.y=-v2;bottom.vel.y=v2;var nudgeX=bottom.vel.x*ig.system.tick;var resTop=ig.game.collisionMap.trace(top.pos.x,top.pos.y,nudgeX,-nudge/2,top.size.x,top.size.y);top.pos.y=resTop.pos.y;var resBottom=ig.game.collisionMap.trace(bottom.pos.x,bottom.pos.y,0,nudge/2,bottom.size.x,bottom.size.y);bottom.pos.y=resBottom.pos.y;}};});

// lib/impact/map.js
ig.baked=true;ig.module('impact.map').defines(function(){"use strict";ig.Map=ig.Class.extend({tilesize:8,width:1,height:1,data:[[]],name:null,init:function(tilesize,data){this.tilesize=tilesize;this.data=data;this.height=data.length;this.width=data[0].length;},getTile:function(x,y){var tx=Math.floor(x/this.tilesize);var ty=Math.floor(y/this.tilesize);if((tx>=0&&tx<this.width)&&(ty>=0&&ty<this.height)){return this.data[ty][tx];}
else{return 0;}},setTile:function(x,y,tile){var tx=Math.floor(x/this.tilesize);var ty=Math.floor(y/this.tilesize);if((tx>=0&&tx<this.width)&&(ty>=0&&ty<this.height)){this.data[ty][tx]=tile;}}});});

// lib/impact/collision-map.js
ig.baked=true;ig.module('impact.collision-map').requires('impact.map').defines(function(){"use strict";ig.CollisionMap=ig.Map.extend({lastSlope:1,tiledef:null,init:function(tilesize,data,tiledef){this.parent(tilesize,data);this.tiledef=tiledef||ig.CollisionMap.defaultTileDef;for(var t in this.tiledef){if(t|0>this.lastSlope){this.lastSlope=t|0;}}},trace:function(x,y,vx,vy,objectWidth,objectHeight){var res={collision:{x:false,y:false,slope:false},pos:{x:x,y:y},tile:{x:0,y:0}};var steps=Math.ceil(Math.max(Math.abs(vx),Math.abs(vy))/this.tilesize);if(steps>1){var sx=vx/steps;var sy=vy/steps;for(var i=0;i<steps&&(sx||sy);i++){this._traceStep(res,x,y,sx,sy,objectWidth,objectHeight,vx,vy,i);x=res.pos.x;y=res.pos.y;if(res.collision.x){sx=0;vx=0;}
if(res.collision.y){sy=0;vy=0;}
if(res.collision.slope){break;}}}
else{this._traceStep(res,x,y,vx,vy,objectWidth,objectHeight,vx,vy,0);}
return res;},_traceStep:function(res,x,y,vx,vy,width,height,rvx,rvy,step){res.pos.x+=vx;res.pos.y+=vy;var t=0;if(vx){var pxOffsetX=(vx>0?width:0);var tileOffsetX=(vx<0?this.tilesize:0);var firstTileY=Math.max(Math.floor(y/this.tilesize),0);var lastTileY=Math.min(Math.ceil((y+height)/this.tilesize),this.height);var tileX=Math.floor((res.pos.x+pxOffsetX)/this.tilesize);var prevTileX=Math.floor((x+pxOffsetX)/this.tilesize);if(step>0||tileX==prevTileX||prevTileX<0||prevTileX>=this.width){prevTileX=-1;}
if(tileX>=0&&tileX<this.width){for(var tileY=firstTileY;tileY<lastTileY;tileY++){if(prevTileX!=-1){t=this.data[tileY][prevTileX];if(t>1&&t<=this.lastSlope&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,prevTileX,tileY)){break;}}
t=this.data[tileY][tileX];if(t==1||t>this.lastSlope||(t>1&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,tileX,tileY))){if(t>1&&t<=this.lastSlope&&res.collision.slope){break;}
res.collision.x=true;res.tile.x=t;x=res.pos.x=tileX*this.tilesize-pxOffsetX+tileOffsetX;rvx=0;break;}}}}
if(vy){var pxOffsetY=(vy>0?height:0);var tileOffsetY=(vy<0?this.tilesize:0);var firstTileX=Math.max(Math.floor(res.pos.x/this.tilesize),0);var lastTileX=Math.min(Math.ceil((res.pos.x+width)/this.tilesize),this.width);var tileY=Math.floor((res.pos.y+pxOffsetY)/this.tilesize);var prevTileY=Math.floor((y+pxOffsetY)/this.tilesize);if(step>0||tileY==prevTileY||prevTileY<0||prevTileY>=this.height){prevTileY=-1;}
if(tileY>=0&&tileY<this.height){for(var tileX=firstTileX;tileX<lastTileX;tileX++){if(prevTileY!=-1){t=this.data[prevTileY][tileX];if(t>1&&t<=this.lastSlope&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,tileX,prevTileY)){break;}}
t=this.data[tileY][tileX];if(t==1||t>this.lastSlope||(t>1&&this._checkTileDef(res,t,x,y,rvx,rvy,width,height,tileX,tileY))){if(t>1&&t<=this.lastSlope&&res.collision.slope){break;}
res.collision.y=true;res.tile.y=t;res.pos.y=tileY*this.tilesize-pxOffsetY+tileOffsetY;break;}}}}},_checkTileDef:function(res,t,x,y,vx,vy,width,height,tileX,tileY){var def=this.tiledef[t];if(!def){return false;}
var lx=(tileX+def[0])*this.tilesize,ly=(tileY+def[1])*this.tilesize,lvx=(def[2]-def[0])*this.tilesize,lvy=(def[3]-def[1])*this.tilesize,solid=def[4];var tx=x+vx+(lvy<0?width:0)-lx,ty=y+vy+(lvx>0?height:0)-ly;if(lvx*ty-lvy*tx>0){if(vx*-lvy+vy*lvx<0){return solid;}
var length=Math.sqrt(lvx*lvx+lvy*lvy);var nx=lvy/length,ny=-lvx/length;var proj=tx*nx+ty*ny;var px=nx*proj,py=ny*proj;if(px*px+py*py>=vx*vx+vy*vy){return solid||(lvx*(ty-vy)-lvy*(tx-vx)<0.5);}
res.pos.x=x+vx-px;res.pos.y=y+vy-py;res.collision.slope={x:lvx,y:lvy,nx:nx,ny:ny};return true;}
return false;}});var H=1/2,N=1/3,M=2/3,SOLID=true,NON_SOLID=false;ig.CollisionMap.defaultTileDef={5:[0,1,1,M,SOLID],6:[0,M,1,N,SOLID],7:[0,N,1,0,SOLID],3:[0,1,1,H,SOLID],4:[0,H,1,0,SOLID],2:[0,1,1,0,SOLID],10:[H,1,1,0,SOLID],21:[0,1,H,0,SOLID],32:[M,1,1,0,SOLID],43:[N,1,M,0,SOLID],54:[0,1,N,0,SOLID],27:[0,0,1,N,SOLID],28:[0,N,1,M,SOLID],29:[0,M,1,1,SOLID],25:[0,0,1,H,SOLID],26:[0,H,1,1,SOLID],24:[0,0,1,1,SOLID],11:[0,0,H,1,SOLID],22:[H,0,1,1,SOLID],33:[0,0,N,1,SOLID],44:[N,0,M,1,SOLID],55:[M,0,1,1,SOLID],16:[1,N,0,0,SOLID],17:[1,M,0,N,SOLID],18:[1,1,0,M,SOLID],14:[1,H,0,0,SOLID],15:[1,1,0,H,SOLID],13:[1,1,0,0,SOLID],8:[H,1,0,0,SOLID],19:[1,1,H,0,SOLID],30:[N,1,0,0,SOLID],41:[M,1,N,0,SOLID],52:[1,1,M,0,SOLID],38:[1,M,0,1,SOLID],39:[1,N,0,M,SOLID],40:[1,0,0,N,SOLID],36:[1,H,0,1,SOLID],37:[1,0,0,H,SOLID],35:[1,0,0,1,SOLID],9:[1,0,H,1,SOLID],20:[H,0,0,1,SOLID],31:[1,0,M,1,SOLID],42:[M,0,N,1,SOLID],53:[N,0,0,1,SOLID],12:[0,0,1,0,NON_SOLID],23:[1,1,0,1,NON_SOLID],34:[1,0,1,1,NON_SOLID],45:[0,1,0,0,NON_SOLID]};ig.CollisionMap.staticNoCollision={trace:function(x,y,vx,vy){return{collision:{x:false,y:false,slope:false},pos:{x:x+vx,y:y+vy},tile:{x:0,y:0}};}};});

// lib/impact/background-map.js
ig.baked=true;ig.module('impact.background-map').requires('impact.map','impact.image').defines(function(){"use strict";ig.BackgroundMap=ig.Map.extend({tiles:null,scroll:{x:0,y:0},distance:1,repeat:false,tilesetName:'',foreground:false,enabled:true,preRender:false,preRenderedChunks:null,chunkSize:512,debugChunks:false,anims:{},init:function(tilesize,data,tileset){this.parent(tilesize,data);this.setTileset(tileset);},setTileset:function(tileset){this.tilesetName=tileset instanceof ig.Image?tileset.path:tileset;this.tiles=new ig.Image(this.tilesetName);this.preRenderedChunks=null;},setScreenPos:function(x,y){this.scroll.x=x/this.distance;this.scroll.y=y/this.distance;},preRenderMapToChunks:function(){var totalWidth=this.width*this.tilesize*ig.system.scale,totalHeight=this.height*this.tilesize*ig.system.scale;var chunkCols=Math.ceil(totalWidth/this.chunkSize),chunkRows=Math.ceil(totalHeight/this.chunkSize);this.preRenderedChunks=[];for(var y=0;y<chunkRows;y++){this.preRenderedChunks[y]=[];for(var x=0;x<chunkCols;x++){var chunkWidth=(x==chunkCols-1)?totalWidth-x*this.chunkSize:this.chunkSize;var chunkHeight=(y==chunkRows-1)?totalHeight-y*this.chunkSize:this.chunkSize;this.preRenderedChunks[y][x]=this.preRenderChunk(x,y,chunkWidth,chunkHeight);}}},preRenderChunk:function(cx,cy,w,h){var tw=w/this.tilesize/ig.system.scale+1,th=h/this.tilesize/ig.system.scale+1;var nx=(cx*this.chunkSize/ig.system.scale)%this.tilesize,ny=(cy*this.chunkSize/ig.system.scale)%this.tilesize;var tx=Math.floor(cx*this.chunkSize/this.tilesize/ig.system.scale),ty=Math.floor(cy*this.chunkSize/this.tilesize/ig.system.scale);var chunk=ig.$new('canvas');chunk.width=w;chunk.height=h;var oldContext=ig.system.context;ig.system.context=chunk.getContext("2d");for(var x=0;x<tw;x++){for(var y=0;y<th;y++){if(x+tx<this.width&&y+ty<this.height){var tile=this.data[y+ty][x+tx];if(tile){this.tiles.drawTile(x*this.tilesize-nx,y*this.tilesize-ny,tile-1,this.tilesize);}}}}
ig.system.context=oldContext;return chunk;},draw:function(){if(!this.tiles.loaded||!this.enabled){return;}
if(this.preRender){this.drawPreRendered();}
else{this.drawTiled();}},drawPreRendered:function(){if(!this.preRenderedChunks){this.preRenderMapToChunks();}
var dx=ig.system.getDrawPos(this.scroll.x),dy=ig.system.getDrawPos(this.scroll.y);if(this.repeat){var w=this.width*this.tilesize*ig.system.scale;dx=(dx%w+w)%w;var h=this.height*this.tilesize*ig.system.scale;dy=(dy%h+h)%h;}
var minChunkX=Math.max(Math.floor(dx/this.chunkSize),0),minChunkY=Math.max(Math.floor(dy/this.chunkSize),0),maxChunkX=Math.ceil((dx+ig.system.realWidth)/this.chunkSize),maxChunkY=Math.ceil((dy+ig.system.realHeight)/this.chunkSize),maxRealChunkX=this.preRenderedChunks[0].length,maxRealChunkY=this.preRenderedChunks.length;if(!this.repeat){maxChunkX=Math.min(maxChunkX,maxRealChunkX);maxChunkY=Math.min(maxChunkY,maxRealChunkY);}
var nudgeY=0;for(var cy=minChunkY;cy<maxChunkY;cy++){var nudgeX=0;for(var cx=minChunkX;cx<maxChunkX;cx++){var chunk=this.preRenderedChunks[cy%maxRealChunkY][cx%maxRealChunkX];var x=-dx+cx*this.chunkSize-nudgeX;var y=-dy+cy*this.chunkSize-nudgeY;ig.system.context.drawImage(chunk,x,y);ig.Image.drawCount++;if(this.debugChunks){ig.system.context.strokeStyle='#f0f';ig.system.context.strokeRect(x,y,this.chunkSize,this.chunkSize);}
if(this.repeat&&chunk.width<this.chunkSize&&x+chunk.width<ig.system.realWidth){nudgeX=this.chunkSize-chunk.width;maxChunkX++;}}
if(this.repeat&&chunk.height<this.chunkSize&&y+chunk.height<ig.system.realHeight){nudgeY=this.chunkSize-chunk.height;maxChunkY++;}}},drawTiled:function(){var tile=0,anim=null,tileOffsetX=(this.scroll.x/this.tilesize).toInt(),tileOffsetY=(this.scroll.y/this.tilesize).toInt(),pxOffsetX=this.scroll.x%this.tilesize,pxOffsetY=this.scroll.y%this.tilesize,pxMinX=-pxOffsetX-this.tilesize,pxMinY=-pxOffsetY-this.tilesize,pxMaxX=ig.system.width+this.tilesize-pxOffsetX,pxMaxY=ig.system.height+this.tilesize-pxOffsetY;for(var mapY=-1,pxY=pxMinY;pxY<pxMaxY;mapY++,pxY+=this.tilesize){var tileY=mapY+tileOffsetY;if(tileY>=this.height||tileY<0){if(!this.repeat){continue;}
tileY=(tileY%this.height+this.height)%this.height;}
for(var mapX=-1,pxX=pxMinX;pxX<pxMaxX;mapX++,pxX+=this.tilesize){var tileX=mapX+tileOffsetX;if(tileX>=this.width||tileX<0){if(!this.repeat){continue;}
tileX=(tileX%this.width+this.width)%this.width;}
if((tile=this.data[tileY][tileX])){if((anim=this.anims[tile-1])){anim.draw(pxX,pxY);}
else{this.tiles.drawTile(pxX,pxY,tile-1,this.tilesize);}}}}}});});

// lib/impact/game.js
ig.baked=true;ig.module('impact.game').requires('impact.impact','impact.entity','impact.collision-map','impact.background-map').defines(function(){"use strict";ig.Game=ig.Class.extend({clearColor:'#000000',gravity:0,screen:{x:0,y:0},_rscreen:{x:0,y:0},entities:[],namedEntities:{},collisionMap:ig.CollisionMap.staticNoCollision,backgroundMaps:[],backgroundAnims:{},autoSort:false,sortBy:null,cellSize:64,_deferredKill:[],_levelToLoad:null,_doSortEntities:false,staticInstantiate:function(){this.sortBy=this.sortBy||ig.Game.SORT.Z_INDEX;ig.game=this;return null;},loadLevel:function(data){this.screen={x:0,y:0};this.entities=[];this.namedEntities={};for(var i=0;i<data.entities.length;i++){var ent=data.entities[i];this.spawnEntity(ent.type,ent.x,ent.y,ent.settings);}
this.sortEntities();this.collisionMap=ig.CollisionMap.staticNoCollision;this.backgroundMaps=[];for(var i=0;i<data.layer.length;i++){var ld=data.layer[i];if(ld.name=='collision'){this.collisionMap=new ig.CollisionMap(ld.tilesize,ld.data);}
else{var newMap=new ig.BackgroundMap(ld.tilesize,ld.data,ld.tilesetName);newMap.anims=this.backgroundAnims[ld.tilesetName]||{};newMap.repeat=ld.repeat;newMap.distance=ld.distance;newMap.foreground=!!ld.foreground;newMap.preRender=!!ld.preRender;newMap.name=ld.name;this.backgroundMaps.push(newMap);}}
for(var i=0;i<this.entities.length;i++){this.entities[i].ready();}},loadLevelDeferred:function(data){this._levelToLoad=data;},getMapByName:function(name){if(name=='collision'){return this.collisionMap;}
for(var i=0;i<this.backgroundMaps.length;i++){if(this.backgroundMaps[i].name==name){return this.backgroundMaps[i];}}
return null;},getEntityByName:function(name){return this.namedEntities[name];},getEntitiesByType:function(type){var entityClass=typeof(type)==='string'?ig.global[type]:type;var a=[];for(var i=0;i<this.entities.length;i++){var ent=this.entities[i];if(ent instanceof entityClass&&!ent._killed){a.push(ent);}}
return a;},spawnEntity:function(type,x,y,settings){var entityClass=typeof(type)==='string'?ig.global[type]:type;if(!entityClass){throw("Can't spawn entity of type "+type);}
var ent=new(entityClass)(x,y,settings||{});this.entities.push(ent);if(ent.name){this.namedEntities[ent.name]=ent;}
return ent;},sortEntities:function(){this.entities.sort(this.sortBy);},sortEntitiesDeferred:function(){this._doSortEntities=true;},removeEntity:function(ent){if(ent.name){delete this.namedEntities[ent.name];}
ent._killed=true;ent.type=ig.Entity.TYPE.NONE;ent.checkAgainst=ig.Entity.TYPE.NONE;ent.collides=ig.Entity.COLLIDES.NEVER;this._deferredKill.push(ent);},run:function(){this.update();this.draw();},update:function(){if(this._levelToLoad){this.loadLevel(this._levelToLoad);this._levelToLoad=null;}
if(this._doSortEntities||this.autoSort){this.sortEntities();this._doSortEntities=false;}
this.updateEntities();this.checkEntities();for(var i=0;i<this._deferredKill.length;i++){this.entities.erase(this._deferredKill[i]);}
this._deferredKill=[];for(var tileset in this.backgroundAnims){var anims=this.backgroundAnims[tileset];for(var a in anims){anims[a].update();}}},updateEntities:function(){for(var i=0;i<this.entities.length;i++){var ent=this.entities[i];if(!ent._killed){ent.update();}}},draw:function(){if(this.clearColor){ig.system.clear(this.clearColor);}
this._rscreen.x=ig.system.getDrawPos(this.screen.x)/ig.system.scale;this._rscreen.y=ig.system.getDrawPos(this.screen.y)/ig.system.scale;var mapIndex;for(mapIndex=0;mapIndex<this.backgroundMaps.length;mapIndex++){var map=this.backgroundMaps[mapIndex];if(map.foreground){break;}
map.setScreenPos(this.screen.x,this.screen.y);map.draw();}
this.drawEntities();for(mapIndex;mapIndex<this.backgroundMaps.length;mapIndex++){var map=this.backgroundMaps[mapIndex];map.setScreenPos(this.screen.x,this.screen.y);map.draw();}},drawEntities:function(){for(var i=0;i<this.entities.length;i++){this.entities[i].draw();}},checkEntities:function(){var hash={};for(var e=0;e<this.entities.length;e++){var entity=this.entities[e];if(entity.type==ig.Entity.TYPE.NONE&&entity.checkAgainst==ig.Entity.TYPE.NONE&&entity.collides==ig.Entity.COLLIDES.NEVER){continue;}
var checked={},xmin=Math.floor(entity.pos.x/this.cellSize),ymin=Math.floor(entity.pos.y/this.cellSize),xmax=Math.floor((entity.pos.x+entity.size.x)/this.cellSize)+1,ymax=Math.floor((entity.pos.y+entity.size.y)/this.cellSize)+1;for(var x=xmin;x<xmax;x++){for(var y=ymin;y<ymax;y++){if(!hash[x]){hash[x]={};hash[x][y]=[entity];}
else if(!hash[x][y]){hash[x][y]=[entity];}
else{var cell=hash[x][y];for(var c=0;c<cell.length;c++){if(entity.touches(cell[c])&&!checked[cell[c].id]){checked[cell[c].id]=true;ig.Entity.checkPair(entity,cell[c]);}}
cell.push(entity);}}}}}});ig.Game.SORT={Z_INDEX:function(a,b){return a.zIndex-b.zIndex;},POS_X:function(a,b){return(a.pos.x+a.size.x)-(b.pos.x+b.size.x);},POS_Y:function(a,b){return(a.pos.y+a.size.y)-(b.pos.y+b.size.y);}};});

// lib/game/eventbus.js
ig.baked=true;ig.module('game.eventbus').defines(function(){var EventContainer=function(defaultContext){this.handlers=[];this.defaultContext=defaultContext;};EventContainer.prototype={raise:function(source,data){var handlerLength=this.handlers.length;for(var i=0;i<handlerLength;i++){var handler=this.handlers[i];handler.method.call(handler.context||this.defaultContext,data,source);}},add:function(method,context){this.handlers.push({method:method,context:context});},remove:function(method,context){this.handlers=_(this.handlers).filter(function(item){return item.method!==method||item.context!==context;});}};var Eventable=function(){this.eventListeners={};this.allContainer=new EventContainer(this);this.eventDepth=0;};Eventable.prototype={autoHook:function(container){for(var key in container){if(key.indexOf('on')===0){this.on(key.substr(2),container[key],container);}}},autoUnhook:function(container){for(var key in container){if(key.indexOf('on')===0){this.off(key.substr(2),container[key],container);}}},once:function(eventName,callback,context){var self=this;var wrappedCallback=function(data,sender){callback.call(this,data,sender);self.off(eventName,wrappedCallback,context);};this.on(eventName,wrappedCallback,context);},on:function(eventName,callback,context){if(!callback)
console.log('NO CALLBACK GIVEN')
this.eventContainerFor(eventName).add(callback,context);},off:function(eventName,callback,context){this.eventContainerFor(eventName).remove(callback,context);},onAny:function(callback,context){this.allContainer.add(callback,context);},raise:function(eventName,data,sender){this.audit(eventName,data);var container=this.eventListeners[eventName];if(container)
container.raise(sender||this,data);this.allContainer.raise(sender||this,{event:eventName,data:data});},audit:function(eventName,data){},eventContainerFor:function(eventName){var container=this.eventListeners[eventName];if(!container){container=new EventContainer(this);this.eventListeners[eventName]=container;}
return container;}};function createEventsGlobal(){Events=new Eventable()
Events.clear=createEventsGlobal}
createEventsGlobal()})

// lib/game/entities/rock.js
ig.baked=true;ig.module('game.entities.rock').requires('impact.entity','game.eventbus').defines(function(){EntityRock=ig.Entity.extend({size:{x:12,y:12},collides:ig.Entity.COLLIDES.ACTIVE,checkAgainst:ig.Entity.TYPE.BOTH,type:ig.Entity.TYPE.A,rockType:0,animSheet:new ig.AnimationSheet('media/rock.png',12,12),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',1.0,[0]);this.addAnim('idle1',1.0,[1]);this.addAnim('idle2',1.0,[2]);},check:function(other){this.parent(other)
if(other instanceof EntityBullet){other.kill()
if(this.rockType===2){this.kill()
Events.raise('rock-destroyed',this)}
else
this.decreaseSize()}},decreaseSize:function(){this.rockType++
var rockSize=12-this.rockType*4
this.currentAnim=this.anims['idle'+this.rockType]
this.size.x=rockSize
this.size.y=rockSize}})})

// lib/game/entities/flower.js
ig.baked=true;ig.module('game.entities.flower').requires('impact.entity','game.eventbus').defines(function(){EntityFlower=ig.Entity.extend({size:{x:6,y:6},collides:ig.Entity.COLLIDES.ACTIVE,checkAgainst:ig.Entity.TYPE.BOTH,type:ig.Entity.TYPE.A,animSheet:new ig.AnimationSheet('media/flower.png',6,6),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',0.5,[0,1,2,3,4]);},check:function(other){this.parent(other)
if(other instanceof EntityBullet){other.kill()}
else if(other instanceof EntityCentipedeHead){other.grow()
this.kill()
Events.raise('flower-eaten',this)}}})})

// lib/game/entities/bullet.js
ig.baked=true;ig.module('game.entities.bullet').requires('impact.entity',"game.eventbus","game.eventbus","game.eventbus","game.eventbus").defines(function(){EntityBullet=ig.Entity.extend({size:{x:4,y:4},collides:ig.Entity.COLLIDES.LITE,checkAgainst:ig.Entity.TYPE.A,type:ig.Entity.TYPE.B,animSheet:new ig.AnimationSheet('media/bullet.png',4,4),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',0.1,[0,1,2]);this.vel.x=typeof settings.spread==='undefined'?0:settings.spread
this.vel.y=-settings.speed
Events.raise('bullet-fired')},check:function(other){this.parent(other)}})})

// lib/game/entities/deadsegment.js
ig.baked=true;ig.module('game.entities.deadsegment').requires('impact.entity').defines(function(){EntityDeadSegment=ig.Entity.extend({size:{x:8,y:8},collides:ig.Entity.COLLIDES.NONE,animSheet:new ig.AnimationSheet('media/centipede.png',8,8),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('idle',0.2,[10,15,16,17,18,19]);this.ticks=30},update:function(){this.parent()
this.ticks--
if(this.ticks<=0)
this.kill()}})})

// lib/game/entities/centipedesegment.js
ig.baked=true;ig.module('game.entities.centipedesegment').requires('impact.entity','game.entities.bullet','game.entities.deadsegment','game.entities.rock').defines(function(){EntityCentipedeSegment=ig.Entity.extend({size:{x:8,y:8},collides:ig.Entity.COLLIDES.LITE,checkAgainst:ig.Entity.TYPE.B,type:ig.Entity.TYPE.A,animSheet:new ig.AnimationSheet('media/centipede.png',8,8),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('walkleft',0.1,[12,13]);this.addAnim('walkright',0.1,[12,13]);this.addAnim('walkdown',0.1,[10,11]);this.addAnim('walkup',0.1,[10,11]);this.head=settings.head
this.index=settings.index
this.calculatePosition()},calculatePosition:function(){var position=this.head.getPositionForSegment(this.index)
this.pos.x=position.x
this.pos.y=position.y
this.direction=position.direction},update:function(){this.parent()
this.calculatePosition()
this.currentAnim=this.anims['walk'+this.direction]},check:function(other){this.parent(other)
if(other instanceof EntityBullet){this.head.damage()
other.kill()}},kill:function(){this.parent()
ig.game.spawnEntity(EntityDeadSegment,this.pos.x,this.pos.y)
if(Math.random()<0.3)
var self=this
setTimeout(function(){ig.game.spawnEntity(EntityRock,self.pos.x,self.pos.y)},1000)}})})

// lib/game/entities/centipedehead.js
ig.baked=true;ig.module('game.entities.centipedehead').requires('impact.entity','game.entities.centipedesegment','game.entities.bullet').defines(function(){EntityCentipedeHead=ig.Entity.extend({size:{x:8,y:8},maxSegments:20,segments:[],history:[],speed:60,direction:'',collides:ig.Entity.COLLIDES.LITE,checkAgainst:ig.Entity.TYPE.B,type:ig.Entity.TYPE.A,animSheet:new ig.AnimationSheet('media/centipede.png',8,8),init:function(x,y,settings){this.parent(x,y,settings);this.addAnim('walkleft',0.1,[0,1]);this.addAnim('walkright',0.1,[0,1]);this.addAnim('walkdown',0.1,[2,3]);this.addAnim('walkup',0.1,[2,3],true);this.anims.walkleft.flip.x=true
this.anims.walkup.flip.y=true
this.moveRight()
this.addInitialSegments()},addInitialSegments:function(){for(var i=0;i<5;i++){this.grow()}},moveLeft:function(){this.changeDirection('left',-this.speed,0)},moveRight:function(){this.changeDirection('right',this.speed,0)},moveUp:function(){this.changeDirection('up',0,-this.speed)},moveDown:function(){this.changeDirection('down',0,this.speed)},changeDirection:function(direction,x,y){if(this.direction===direction)return
this.direction=direction
this.vel.x=x
this.vel.y=y
this.currentAnim=this.anims['walk'+this.direction]
this.pushHistory()},update:function(){this.updateHistory()
this.checkBounds()
this.parent()},checkBounds:function(){if(this.pos.x<0)
this.moveRight()
if(this.pos.x>312)
this.moveLeft()
if(this.pos.y<0)
this.moveDown()
if(this.pos.y>200)
this.moveUp()},updateHistory:function(){this.history[this.history.length-1].endx=this.pos.x
this.history[this.history.length-1].endy=this.pos.y},pushHistory:function(){this.history.push({x:this.pos.x,y:this.pos.y,endx:this.pos.x,endy:this.pos.y,direction:this.direction})},getPositionForSegment:function(index){var distanceFromHead=index*8
return this.tryGetPositionFromHistory(this.history.length-1,distanceFromHead,0)},tryGetPositionFromHistory:function(index,desired,current){var item=this.history[index],distx=(item.endx-item.x),disty=(item.endy-item.y)
var distance=Math.sqrt(distx*distx+disty*disty)
var xvel=distx/distance
var yvel=disty/distance
var total=distance+current
if(total>=desired){var remainder=desired-current
return{x:item.endx-(remainder*xvel),y:item.endy-(remainder*yvel),direction:item.direction}}
else{if(index===0)
return{x:item.x,y:item.y,direction:item.direction}
else
return this.tryGetPositionFromHistory(index-1,desired,total)}},check:function(other){this.parent(other)
if(other instanceof EntityBullet){this.damage()
other.kill()}},kill:function(){this.parent()
for(var i=0;i<this.segments.length;i++)
this.segments[i].kill()},damage:function(){if(this.segments.length===0){Events.raise('player-died')
this.kill()
return}
Events.raise('player-damaged')
var segment=this.segments.pop()
segment.kill()},grow:function(){if(this.segments.length===this.maxSegments)return
var segment=ig.game.spawnEntity(EntityCentipedeSegment,0,0,{head:this,index:this.segments.length+1})
this.segments.push(segment)}});});

// lib/game/entities/centipedecontroller.js
ig.baked=true;ig.module('game.entities.centipedecontroller').requires('impact.game','impact.entity').defines(function(){EntityCentipedeController=ig.Entity.extend({init:function(x,y,settings){this.parent(x,y,settings)
this.head=settings.head
ig.input.bind(ig.KEY.LEFT_ARROW,'left')
ig.input.bind(ig.KEY.RIGHT_ARROW,'right')
ig.input.bind(ig.KEY.UP_ARROW,'up')
ig.input.bind(ig.KEY.DOWN_ARROW,'down')
$('#game').touchwipe({wipeLeft:function(e){settings.head.moveLeft()},wipeUp:function(){settings.head.moveDown()},wipeDown:function(){settings.head.moveUp()},wipeRight:function(){settings.head.moveRight()},preventDefaultEvents:true})},onSwipe:function(e){alert(e.direction)
if(e.direction==='left')
this.head.moveLeft()
else if(e.direction==='right')
this.head.moveRight()
else if(e.direction==='down')
this.head.moveDown()
else if(e.direction==='up')
this.head.moveUp()},update:function(){this.parent()
if(ig.input.state('left')){this.head.moveLeft()}
else if(ig.input.state('right')){this.head.moveRight()}
else if(ig.input.state('down')){this.head.moveDown()}
else if(ig.input.state('up')){this.head.moveUp()}}})})

// lib/game/entities/defenceunit.js
ig.baked=true;ig.module('game.entities.defenceunit').requires('impact.entity','game.entities.bullet').defines(function(){EntityDefenceUnit=ig.Entity.extend({size:{x:8,y:8},speed:25,bulletSpeed:20,collides:ig.Entity.COLLIDES.NONE,firingTicks:0,firingRate:250,accuracyTolerance:50,animSheet:new ig.AnimationSheet('media/defenceunit.png',8,8),firingStrategies:[function(){ig.game.spawnEntity(EntityBullet,this.pos.x,this.pos.y,{speed:this.bulletSpeed})},function(){var count=5
var self=this
var fire=function(){ig.game.spawnEntity(EntityBullet,self.pos.x,self.pos.y,{speed:self.bulletSpeed})
if(count-->0)
setTimeout(fire,1000)}
fire()},function(){for(var i=0;i<10;i++){ig.game.spawnEntity(EntityBullet,this.pos.x,this.pos.y,{speed:this.bulletSpeed,spread:(5-i)*2.0})}}],init:function(x,y,settings){this.parent(x,y,settings);this.head=settings.head
this.addAnim('idle',1.0,[0]);},update:function(){this.parent()
this.updateFiringTicks()
this.updateVelocity()
if(Math.abs(this.head.pos.x-this.pos.x)<this.accuracyTolerance)
this.tryFire()},updateVelocity:function(){if(this.head.pos.x<this.pos.x)
this.vel.x=-this.speed
else if(this.head.pos.x>this.pos.x)
this.vel.x=this.speed},updateFiringTicks:function(){if(this.firingTicks!==0){this.firingTicks++
if(this.firingTicks%this.firingRate===0)
this.firingTicks=0}},tryFire:function(){if(this.firingTicks===0){this.firingTicks++
this.fire()}},fire:function(){var strategy=this.firingStrategies[Math.floor(Math.random()*this.firingStrategies.length)]
strategy.call(this)}})})

// lib/game/entities/audio.js
ig.baked=true;ig.module('game.entities.audio').requires('game.eventbus',"impact.entity","impact.sound").defines(function(){EntityAudio=ig.Entity.extend({hurt:new ig.Sound('media/hurt.*'),fire:new ig.Sound('media/fire.*'),pickup:new ig.Sound('media/pickup.*'),init:function(){this.parent()
Events.on('player-damaged',this.onPlayerDamaged,this)
Events.on('bullet-fired',this.onBulletFired,this)
Events.on('flower-eaten',this.onFlowerEaten,this)},onPlayerDamaged:function(){this.hurt.volume=0.2
this.hurt.play()},onBulletFired:function(){this.fire.volume=0.2
this.fire.play()},onFlowerEaten:function(){this.pickup.volume=0.2
this.pickup.play()}})})

// lib/game/entities/world.js
ig.baked=true;ig.module('game.entities.world').requires('impact.entity','game.entities.rock','game.entities.flower','game.entities.centipedehead','game.entities.centipedecontroller','game.entities.defenceunit','game.entities.audio','game.eventbus').defines(function(){EntityWorld=ig.Entity.extend({init:function(x,y,settings){this.parent(x,y,settings);this.level=1
Events.on('flower-eaten',this.onFlowerEaten,this)},start:function(){this.head=ig.game.spawnEntity(EntityCentipedeHead,0,0)
this.input=ig.game.spawnEntity(EntityCentipedeController,0,0,{head:this.head})
this.defence=ig.game.spawnEntity(EntityDefenceUnit,160,232,{head:this.head})
this.audio=ig.game.spawnEntity(EntityAudio,0,0)
this.createRocks()
this.startLevel()},startLevel:function(){this.createFlowers()
this.head.speed=50+(this.level*10)
this.defence.bulletSpeed=40+(this.level*5)
this.defence.firingRate=Math.floor(Math.max(150-(this.level*10),30))
this.defence.speed=25+this.level*2
this.defence.accuracyTolerance=30+(this.level*5)
Events.raise('level-started',this.level)},createRocks:function(){for(var i=0;i<10;i++){ig.game.spawnEntity(EntityRock,Math.random()*270+25,Math.random()*180+30)}},createRock:function(x,y){ig.game.spawnEntity(EntityRock,x,y)},createFlowers:function(){this.flowerCount=5
this.spawnFlower()},spawnFlower:function(){ig.game.spawnEntity(EntityFlower,Math.random()*270+25,Math.random()*180+20)},onFlowerEaten:function(flower){this.flowerCount--
if(this.flowerCount<=0){this.level++
this.startLevel()}
else
this.spawnFlower()
var self=this
if(Math.random()>0.3)
setTimeout(function(){self.createRock(flower.pos.x,flower.pos.y)},3000)},removeAll:function(Type){var rocks=ig.game.getEntitiesByType(Type)
for(var i=0;i<rocks.length;i++)
rocks[i].kill()}})})

// lib/game/entities/messaging.js
ig.baked=true;ig.module('game.entities.messaging').requires('impact.entity','game.eventbus').defines(function(){EntityMessaging=ig.Entity.extend({messages:[],font:new ig.Font('media/04b03.font.png'),init:function(x,y,settings){this.parent(x,y,settings)
Events.on('level-started',this.onLevelStarted,this)
Events.on('score-changed',this.onScoreChanged,this)},onLevelStarted:function(level){this.addMessage("Level "+level)},onScoreChanged:function(ev){this.addMessage(ev.amount,ev.x,ev.y)},addMessage:function(text,x,y){this.messages.push({ticks:0,text:text,x:x||160,y:y||120})},update:function(){var newMessages=[]
for(var i=0;i<this.messages.length;i++){var message=this.messages[i]
if(message.ticks++<120){newMessages.push(message)
message.y-=0.2}}
this.messages=newMessages},draw:function(){for(var i=0;i<this.messages.length;i++){var message=this.messages[i]
this.font.draw(message.text,message.x,message.y,ig.Font.ALIGN_CENTER)}}})})

// lib/game/entities/scoredisplay.js
ig.baked=true;ig.module('game.entities.scoredisplay').requires('impact.entity','game.eventbus').defines(function(){EntityScoreDisplay=ig.Entity.extend({font:new ig.Font('media/04b03.font.png'),init:function(x,y,settings){this.parent(x,y,settings);this.world=settings.world
this.score=0
this.totalrocks=0
this.totalflowers=0
this.longeststreak=0
this.currentstreak=0
Events.on('flower-eaten',this.onFlowerEaten,this)
Events.on('rock-destroyed',this.onRockDestroyed,this)
Events.on('player-damaged',this.onPlayerDamaged,this)},getStats:function(){return{score:this.score,rockcount:this.totalrocks,flowercount:this.totalflowers,longeststreak:this.longeststreak}},onFlowerEaten:function(flower){this.currentstreak++
this.totalflowers++
var change=this.world.level*this.currentstreak
this.score+=change
Events.raise('score-changed',{amount:change,x:flower.pos.x,y:flower.pos.y})},onRockDestroyed:function(rock){this.totalrocks++},onPlayerDamaged:function(){if(this.currentstreak>this.longeststreak)
this.longeststreak=this.currentstreak
this.currentstreak=0},draw:function(){this.font.draw('Score: '+this.score,0,232,ig.Font.ALIGN_LEFT)}})})

// lib/game/centipedegame.js
ig.baked=true;ig.module('game.centipedegame').requires('impact.game','impact.font','game.entities.world','game.entities.messaging','game.entities.scoredisplay','game.eventbus').defines(function(){CentipedeGame=ig.Game.extend({font:new ig.Font('media/04b03.font.png'),state:{},actions:[],clearColor:'#002200',enabled:false,init:function(){this.start()},onPlayerDied:function(){Events.raise('game-over',this.scorekeeper.getStats())
this.enabled=false},update:function(){if(this.enabled)
this.parent()},draw:function(){if(this.enabled)
this.parent()},restart:function(){Events.clear()
var entities=this.getEntitiesByType(ig.Entity)
for(var i=0;i<entities.length;i++)
entities[i].kill()
this.start()},start:function(){this.world=ig.game.spawnEntity(EntityWorld,0,0)
this.messaging=ig.game.spawnEntity(EntityMessaging,0,0)
this.scorekeeper=ig.game.spawnEntity(EntityScoreDisplay,0,0,{world:this.world})
this.world.start()
this.enabled=true
Events.on('player-died',this.onPlayerDied,this)}})})

// lib/game/main.js
ig.baked=true;ig.module('game.main').requires('game.centipedegame','game.eventbus').defines(function(){var $start=$('#start'),$game=$('#game'),$gameover=$('#gameover'),$startbutton=$('#start'),$totalflowers=$('#total-flowers'),$totalrocks=$('#total-rocks'),$longeststreak=$('#longest-streak'),$finalscore=$('#final-score'),$restartbutton=$('#restart-button')
$startbutton.on('click',startGame)
$restartbutton.on('click',restartGame)
function showSplash(){$start.show()
$game.hide()
$gameover.hide()}
function showGameOver(stats){$start.hide()
$game.hide()
$gameover.show()
$totalflowers.text(stats.flowercount)
$totalrocks.text(stats.rockcount)
$longeststreak.text(stats.longeststreak)
$finalscore.text(stats.score)}
function restartGame(){ig.game.restart()
$start.hide()
$game.show()
$gameover.hide()
Events.on('game-over',showGameOver)}
function startGame(){if(ig.ua.iPad){ig.Sound.enabled=false;ig.main('#canvas',CentipedeGame,30,320,240,2.5);}
else if(ig.ua.mobile){ig.Sound.enabled=false;ig.main('#canvas',CentipedeGame,30,320,240,1.0);}
else if(getParameterByName('disablesounds')){ig.Sound.enabled=false;ig.main('#canvas',CentipedeGame,30,320,240,3);}
else{ig.Sound.channels=10,ig.main('#canvas',CentipedeGame,30,320,240,3);}
$start.hide()
$game.show()
$gameover.hide()
Events.on('game-over',showGameOver)}
function getParameterByName(name)
{name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.search);if(!results)
return"";else
return decodeURIComponent(results[1].replace(/\+/g," "));}
showSplash()});