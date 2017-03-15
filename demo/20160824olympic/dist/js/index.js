window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback, element){
            return window.setTimeout(callback, 1000 / 30);
        };
})();
window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame            ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame         ||
        window.oCancelRequestAnimationFrame        ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();
try{
/*! howler.js v2.0.0 | (c) 2013-2016, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.mobileAutoEnable=!0,e._setup(),e},volume:function(e){var o=this||n;if(e=parseFloat(e),o.ctx||_(),"undefined"!=typeof e&&e>=0&&e<=1){if(o._volume=e,o._muted)return o;o.usingWebAudio&&(o.masterGain.gain.value=e);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),u=0;u<r.length;u++){var a=o._howls[t]._soundById(r[u]);a&&a._node&&(a._node.volume=a._volume*e)}return o}return o._volume},mute:function(e){var o=this||n;o.ctx||_(),o._muted=e,o.usingWebAudio&&(o.masterGain.gain.value=e?0:o._volume);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),u=0;u<r.length;u++){var a=o._howls[t]._soundById(r[u]);a&&a._node&&(a._node.muted=!!e||a._muted)}return o},unload:function(){for(var e=this||n,o=e._howls.length-1;o>=0;o--)e._howls[o].unload();return e.usingWebAudio&&"undefined"!=typeof e.ctx.close&&(e.ctx.close(),e.ctx=null,_()),e},codecs:function(e){return(this||n)._codecs[e]},_setup:function(){var e=this||n;return e.state=e.ctx?e.ctx.state||"running":"running",e._autoSuspend(),e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,o="undefined"!=typeof Audio?new Audio:null;if(!o||"function"!=typeof o.canPlayType)return e;var t=o.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),u=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(u||!t&&!o.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!o.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!o.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(o.canPlayType("audio/x-m4a;")||o.canPlayType("audio/m4a;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(o.canPlayType("audio/x-mp4;")||o.canPlayType("audio/mp4;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||n,o=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator&&e._navigator.userAgent),t=!!("ontouchend"in window||e._navigator&&e._navigator.maxTouchPoints>0||e._navigator&&e._navigator.msMaxTouchPoints>0);if(!e._mobileEnabled&&e.ctx&&(o||t)){e._mobileEnabled=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var r=function(){var n=e.ctx.createBufferSource();n.buffer=e._scratchBuffer,n.connect(e.ctx.destination),"undefined"==typeof n.start?n.noteOn(0):n.start(0),n.onended=function(){n.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&"undefined"!=typeof e.ctx.suspend&&n.usingWebAudio){for(var o=0;o<e._howls.length;o++)if(e._howls[o]._webAudio)for(var t=0;t<e._howls[o]._sounds.length;t++)if(!e._howls[o]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",e.ctx.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&"undefined"!=typeof e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.state="resuming",e.ctx.resume().then(function(){e.state="running"}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,o=function(e){var n=this;return e.src&&0!==e.src.length?void n.init(e):void console.error("An array of source files must be passed with any new Howl.")};o.prototype={init:function(e){var o=this;return n.ctx||_(),o._autoplay=e.autoplay||!1,o._format="string"!=typeof e.format?e.format:[e.format],o._html5=e.html5||!1,o._muted=e.mute||!1,o._loop=e.loop||!1,o._pool=e.pool||5,o._preload="boolean"!=typeof e.preload||e.preload,o._rate=e.rate||1,o._sprite=e.sprite||{},o._src="string"!=typeof e.src?e.src:[e.src],o._volume=void 0!==e.volume?e.volume:1,o._duration=0,o._state="unloaded",o._sounds=[],o._endTimers={},o._queue=[],o._onend=e.onend?[{fn:e.onend}]:[],o._onfade=e.onfade?[{fn:e.onfade}]:[],o._onload=e.onload?[{fn:e.onload}]:[],o._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],o._onpause=e.onpause?[{fn:e.onpause}]:[],o._onplay=e.onplay?[{fn:e.onplay}]:[],o._onstop=e.onstop?[{fn:e.onstop}]:[],o._onmute=e.onmute?[{fn:e.onmute}]:[],o._onvolume=e.onvolume?[{fn:e.onvolume}]:[],o._onrate=e.onrate?[{fn:e.onrate}]:[],o._onseek=e.onseek?[{fn:e.onseek}]:[],o._webAudio=n.usingWebAudio&&!o._html5,"undefined"!=typeof n.ctx&&n.ctx&&n.mobileAutoEnable&&n._enableMobileAudio(),n._howls.push(o),o._preload&&o.load(),o},load:function(){var e=this,o=null;if(n.noAudio)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var a,d;if(e._format&&e._format[r])a=e._format[r];else{if(d=e._src[r],"string"!=typeof d){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}a=/^data:audio\/([^;,]+);/i.exec(d),a||(a=/\.([^.]+)$/.exec(d.split("?",1)[0])),a&&(a=a[1].toLowerCase())}if(n.codecs(a)){o=e._src[r];break}}return o?(e._src=o,e._state="loading","https:"===window.location.protocol&&"http:"===o.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new t(e),e._webAudio&&u(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e,o){var t=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if("undefined"==typeof e){e="__default";for(var u=0,a=0;a<t._sounds.length;a++)t._sounds[a]._paused&&!t._sounds[a]._ended&&(u++,r=t._sounds[a]._id);1===u?e=null:r=null}}var d=r?t._soundById(r):t._inactiveSound();if(!d)return null;if(r&&!e&&(e=d._sprite||"__default"),"loaded"!==t._state&&!t._sprite[e])return t._queue.push({event:"play",action:function(){t.play(t._soundById(d._id)?d._id:void 0)}}),d._id;if(r&&!d._paused)return o||setTimeout(function(){t._emit("play",d._id)},0),d._id;t._webAudio&&n._autoResume();var i=d._seek>0?d._seek:t._sprite[e][0]/1e3,_=(t._sprite[e][0]+t._sprite[e][1])/1e3-i,s=1e3*_/Math.abs(d._rate);d._paused=!1,d._ended=!1,d._sprite=e,d._seek=i,d._start=t._sprite[e][0]/1e3,d._stop=(t._sprite[e][0]+t._sprite[e][1])/1e3,d._loop=!(!d._loop&&!t._sprite[e][2]);var l=d._node;if(t._webAudio){var f=function(){t._refreshBuffer(d);var e=d._muted||t._muted?0:d._volume;l.gain.setValueAtTime(e,n.ctx.currentTime),d._playStart=n.ctx.currentTime,"undefined"==typeof l.bufferSource.start?d._loop?l.bufferSource.noteGrainOn(0,i,86400):l.bufferSource.noteGrainOn(0,i,_):d._loop?l.bufferSource.start(0,i,86400):l.bufferSource.start(0,i,_),s!==1/0&&(t._endTimers[d._id]=setTimeout(t._ended.bind(t,d),s)),o||setTimeout(function(){t._emit("play",d._id)},0)};"loaded"===t._state?f():(t.once("load",f,d._id),t._clearTimer(d._id))}else{var c=function(){l.currentTime=i,l.muted=d._muted||t._muted||n._muted||l.muted,l.volume=d._volume*n.volume(),l.playbackRate=d._rate,setTimeout(function(){l.play(),s!==1/0&&(t._endTimers[d._id]=setTimeout(t._ended.bind(t,d),s)),o||t._emit("play",d._id)},0)},p="loaded"===t._state&&(window&&window.ejecta||!l.readyState&&n._navigator.isCocoonJS);if(4===l.readyState||p)c();else{var m=function(){c(),l.removeEventListener(n._canPlayEvent,m,!1)};l.addEventListener(n._canPlayEvent,m,!1),t._clearTimer(d._id)}}return d._id},pause:function(e){var n=this;if("loaded"!==n._state)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=n.seek(o[t]),r._rateSeek=0,r._paused=!0,n._stopFade(o[t]),r._node)if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r._id)}}return n},stop:function(e,n){var o=this;if("loaded"!==o._state)return o._queue.push({event:"stop",action:function(){o.stop(e)}}),o;for(var t=o._getSoundIds(e),r=0;r<t.length;r++){o._clearTimer(t[r]);var u=o._soundById(t[r]);if(u&&!u._paused&&(u._seek=u._start||0,u._rateSeek=0,u._paused=!0,u._ended=!0,o._stopFade(t[r]),u._node))if(o._webAudio){if(!u._node.bufferSource)return o;"undefined"==typeof u._node.bufferSource.stop?u._node.bufferSource.noteOff(0):u._node.bufferSource.stop(0),o._cleanBuffer(u._node)}else isNaN(u._node.duration)&&u._node.duration!==1/0||(u._node.currentTime=u._start||0,u._node.pause());u&&!n&&o._emit("stop",u._id)}return o},mute:function(e,o){var t=this;if("loaded"!==t._state)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if("undefined"==typeof o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),u=0;u<r.length;u++){var a=t._soundById(r[u]);a&&(a._muted=e,t._webAudio&&a._node?a._node.gain.setValueAtTime(e?0:a._volume,n.ctx.currentTime):a._node&&(a._node.muted=!!n._muted||e),t._emit("mute",a._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length){var u=t._getSoundIds(),a=u.indexOf(r[0]);a>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var d;if(!("undefined"!=typeof e&&e>=0&&e<=1))return d=o?t._soundById(o):t._sounds[0],d?d._volume:0;if("loaded"!==t._state)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;"undefined"==typeof o&&(t._volume=e),o=t._getSoundIds(o);for(var i=0;i<o.length;i++)d=t._soundById(o[i]),d&&(d._volume=e,r[2]||t._stopFade(o[i]),t._webAudio&&d._node&&!d._muted?d._node.gain.setValueAtTime(e,n.ctx.currentTime):d._node&&!d._muted&&(d._node.volume=e*n.volume()),t._emit("volume",d._id));return t},fade:function(e,o,t,r){var u=this,a=Math.abs(e-o),d=e>o?"out":"in",i=a/.01,_=t/i;if("loaded"!==u._state)return u._queue.push({event:"fade",action:function(){u.fade(e,o,t,r)}}),u;u.volume(e,r);for(var s=u._getSoundIds(r),l=0;l<s.length;l++){var f=u._soundById(s[l]);if(f){if(r||u._stopFade(s[l]),u._webAudio&&!f._muted){var c=n.ctx.currentTime,p=c+t/1e3;f._volume=e,f._node.gain.setValueAtTime(e,c),f._node.gain.linearRampToValueAtTime(o,p)}var m=e;f._interval=setInterval(function(e,n){m+="in"===d?.01:-.01,m=Math.max(0,m),m=Math.min(1,m),m=Math.round(100*m)/100,u._webAudio?("undefined"==typeof r&&(u._volume=m),n._volume=m):u.volume(m,e,!0),m===o&&(clearInterval(n._interval),n._interval=null,u.volume(m,e),u._emit("fade",e))}.bind(u,s[l],f),_)}}return u},_stopFade:function(e){var o=this,t=o._soundById(e);return t&&t._interval&&(o._webAudio&&t._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(t._interval),t._interval=null,o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return o=t._soundById(parseInt(r[0],10)),!!o&&o._loop;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var u=t._getSoundIds(n),a=0;a<u.length;a++)o=t._soundById(u[a]),o&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e));return t},rate:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var u=t._getSoundIds(),a=u.indexOf(r[0]);a>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var d;if("number"!=typeof e)return d=t._soundById(o),d?d._rate:t._rate;if("loaded"!==t._state)return t._queue.push({event:"rate",action:function(){t.rate.apply(t,r)}}),t;"undefined"==typeof o&&(t._rate=e),o=t._getSoundIds(o);for(var i=0;i<o.length;i++)if(d=t._soundById(o[i])){d._rateSeek=t.seek(o[i]),d._playStart=t._webAudio?n.ctx.currentTime:d._playStart,d._rate=e,t._webAudio&&d._node&&d._node.bufferSource?d._node.bufferSource.playbackRate.value=e:d._node&&(d._node.playbackRate=e);var _=t.seek(o[i]),s=(t._sprite[d._sprite][0]+t._sprite[d._sprite][1])/1e3-_,l=1e3*s/Math.abs(d._rate);!t._endTimers[o[i]]&&d._paused||(t._clearTimer(o[i]),t._endTimers[o[i]]=setTimeout(t._ended.bind(t,d),l)),t._emit("rate",d._id)}return t},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var u=t._getSoundIds(),a=u.indexOf(r[0]);a>=0?o=parseInt(r[0],10):(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if("undefined"==typeof o)return t;if("loaded"!==t._state)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var d=t._soundById(o);if(d){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var i=t.playing(o)?n.ctx.currentTime-d._playStart:0,_=d._rateSeek?d._rateSeek-d._seek:0;return d._seek+(_+i*Math.abs(d._rate))}return d._node.currentTime}var s=t.playing(o);s&&t.pause(o,!0),d._seek=e,d._ended=!1,t._clearTimer(o),s&&t.play(o,!0),!t._webAudio&&d._node&&(d._node.currentTime=e),t._emit("seek",o)}return t},playing:function(e){var n=this;if("number"==typeof e){var o=n._soundById(e);return!!o&&!o._paused}for(var t=0;t<n._sounds.length;t++)if(!n._sounds[t]._paused)return!0;return!1},duration:function(e){var n=this,o=n._duration,t=n._soundById(e);return t&&(o=n._sprite[t._sprite][1]/1e3),o},state:function(){return this._state},unload:function(){for(var e=this,o=e._sounds,t=0;t<o.length;t++){o[t]._paused||(e.stop(o[t]._id),e._emit("end",o[t]._id)),e._webAudio||(o[t]._node.src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",o[t]._node.removeEventListener("error",o[t]._errorFn,!1),o[t]._node.removeEventListener(n._canPlayEvent,o[t]._loadFn,!1)),delete o[t]._node,e._clearTimer(o[t]._id);var u=n._howls.indexOf(e);u>=0&&n._howls.splice(u,1)}var a=!0;for(t=0;t<n._howls.length;t++)if(n._howls[t]._src===e._src){a=!1;break}return r&&a&&delete r[e._src],e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,u=r["_on"+e];return"function"==typeof n&&u.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e],u=0;if(n){for(u=0;u<r.length;u++)if(n===r[u].fn&&o===r[u].id){r.splice(u,1);break}}else if(e)t["_on"+e]=[];else{var a=Object.keys(t);for(u=0;u<a.length;u++)0===a[u].indexOf("_on")&&Array.isArray(t[a[u]])&&(t[a[u]]=[])}return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],u=r.length-1;u>=0;u--)r[u].id&&r[u].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[u].fn),0),r[u].once&&t.off(e,r[u].fn,r[u].id));return t},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var o=this,t=e._sprite,r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id,!0).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var u=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),u)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,o._clearTimer(e._id),o._cleanBuffer(e._node),n._autoSuspend()),o._webAudio||r||o.stop(e._id),o},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new t(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(o<=n)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if("undefined"==typeof e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[o._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=e._rate,o},_cleanBuffer:function(e){var n=this;if(n._scratchBuffer){e.bufferSource.onended=null,e.bufferSource.disconnect(0);try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}}return e.bufferSource=null,n}};var t=function(e){this._parent=e,this.init()};t.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),n._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=n._muted||e._muted||e._parent._muted?0:e._volume;return o._webAudio?(e._node="undefined"==typeof n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(t,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t*n.volume(),e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),e},_errorListener:function(){var e=this;e._node.error&&4===e._node.error.code&&(n.noAudio=!0),e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorListener,!1)},_loadListener:function(){var e=this,o=e._parent;o._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(o._sprite).length&&(o._sprite={__default:[0,1e3*o._duration]}),"loaded"!==o._state&&(o._state="loaded",o._emit("load"),o._loadQueue()),o._autoplay&&o.play(),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)}};var r={},u=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void i(e);if(/^data:[^;]+;base64,/.test(n)){for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),u=0;u<o.length;++u)t[u]=o.charCodeAt(u);d(t.buffer,e)}else{var _=new XMLHttpRequest;_.open("GET",n,!0),_.responseType="arraybuffer",_.onload=function(){var n=(_.status+"")[0];return"0"!==n&&"2"!==n&&"3"!==n?void e._emit("loaderror",null,"Failed loading audio file with status: "+_.status+"."):void d(_.response,e)},_.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},a(_)}},a=function(e){try{e.send()}catch(n){e.onerror()}},d=function(e,o){n.ctx.decodeAudioData(e,function(e){e&&o._sounds.length>0&&(r[o._src]=e,i(o,e))},function(){o._emit("loaderror",null,"Decoding audio data failed.")})},i=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue()),e._autoplay&&e.play()},_=function(){n.noAudio=!1;try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}if(!n.usingWebAudio)if("undefined"!=typeof Audio)try{var e=new Audio;"undefined"==typeof e.oncanplaythrough&&(n._canPlayEvent="canplay")}catch(e){n.noAudio=!0}else n.noAudio=!0;try{var e=new Audio;e.muted&&(n.noAudio=!0)}catch(e){}var o=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),t=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),r=t?parseInt(t[1],10):null;if(o&&r&&r<9){var u=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());(n._navigator&&n._navigator.standalone&&!u||n._navigator&&!n._navigator.standalone&&!u)&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain="undefined"==typeof n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.value=1,n.masterGain.connect(n.ctx.destination)),n._setup()};"function"==typeof define&&define.amd&&define([],function(){return{Howler:n,Howl:o}}),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=o),"undefined"!=typeof window?(window.HowlerGlobal=e,window.Howler=n,window.Howl=o,window.Sound=t):"undefined"!=typeof global&&(global.HowlerGlobal=e,global.Howler=n,global.Howl=o,global.Sound=t)}();
}catch(e){}

function _toConsumableArray(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),Charm=function(){function e(){var n=arguments.length<=0||void 0===arguments[0]?PIXI:arguments[0];if(_classCallCheck(this,e),void 0===n)throw new Error("Please assign a rendering engine in the constructor before using charm.js");this.renderer="",n.ParticleContainer&&n.Sprite&&(this.renderer="pixi"),this.globalTweens=[],this.easingFormulas={linear:function(e){return e},smoothstep:function(e){return e*e*(3-2*e)},smoothstepSquared:function(e){return Math.pow(e*e*(3-2*e),2)}}}return _createClass(e,[{key:"tweenProperty",value:function(e,n,t,r,a){var s=arguments.length<=5||void 0===arguments[5]?"smoothstep":arguments[5],u=this,o=arguments.length<=6||void 0===arguments[6]?!1:arguments[6],i=arguments.length<=7||void 0===arguments[7]?0:arguments[7],l={},g=s.split(" ");return"bounce"===g[0]&&(l.startMagnitude=parseInt(g[1]),l.endMagnitude=parseInt(g[2])),l.start=function(e,n){l.startValue=JSON.parse(JSON.stringify(e)),l.endValue=JSON.parse(JSON.stringify(n)),l.playing=!0,l.totalFrames=a,l.frameCounter=0,u.globalTweens.push(l)},l.start(t,r),l.update=function(){var t=void 0;if(l.playing)if(l.frameCounter<l.totalFrames){var r=l.frameCounter/l.totalFrames;t="bounce"!==g[0]?u.easingFormulas[s](r):u.easingFormulas.spline(r,l.startMagnitude,0,1,l.endMagnitude),e[n]=l.endValue*t+l.startValue*(1-t),l.frameCounter+=1}else e[n]=l.endValue,l.end()},l.end=function(){l.playing=!1,l.onComplete&&l.onComplete(),u.globalTweens.splice(u.globalTweens.indexOf(l),1),o&&u.wait(i).then(function(){l.start(l.endValue,l.startValue)})},l.play=function(){return l.playing=!0},l.pause=function(){return l.playing=!1},l}},{key:"makeTween",value:function(e){var n=this,t={};t.tweens=[],e.forEach(function(e){var r=n.tweenProperty.apply(n,_toConsumableArray(e));t.tweens.push(r)});var r=0;return t.completed=function(){r+=1,r===t.tweens.length&&(t.onComplete&&t.onComplete(),r=0)},t.tweens.forEach(function(e){e.onComplete=function(){return t.completed()}}),t.pause=function(){t.tweens.forEach(function(e){e.playing=!1})},t.play=function(){t.tweens.forEach(function(e){e.playing=!0})},t}},{key:"pulse",value:function(e){var n=arguments.length<=1||void 0===arguments[1]?60:arguments[1],t=arguments.length<=2||void 0===arguments[2]?0:arguments[2];return this.tweenProperty(e,"alpha",e.alpha,t,n,"smoothstep",!0)}},{key:"slide",value:function(e,n,t){var r=arguments.length<=3||void 0===arguments[3]?60:arguments[3],a=arguments.length<=4||void 0===arguments[4]?"smoothstep":arguments[4],s=arguments.length<=5||void 0===arguments[5]?!1:arguments[5],u=arguments.length<=6||void 0===arguments[6]?0:arguments[6];return this.makeTween([[e,"x",e.x,n,r,a,s,u],[e,"y",e.y,t,r,a,s,u]])}},{key:"update",value:function(){if(this.globalTweens.length>0)for(var e=this.globalTweens.length-1;e>=0;e--){var n=this.globalTweens[e];n&&n.update()}}}]),e}();





//需要加载的游戏资源
var gameresources=[
  //路面
  {name:"gameroad",url:"../img/gameroad.png"},
  //视差背景
  {name:"gameparallaxbg",url:"../img/gameparallaxbg.png"},
  //脑子
  {name:"brain",url:"../img/brain.png"},
  //路边对象
  {name:"stuff",url:"../img/stuff.json"},
  //路对象（前景）
  {name:"roadstuff",url:"../img/roadstuff.json"},
  //路面对象
  {name:"roadfacestuff",url:"../img/roadfacestuff.json"}
];
// 全局Game对象
var Game = {
  debug:true,
  director: null,           // 导演类
  map: null,                // 地图类
  hero: null,               // 主角类
  menu: null,               // 菜单类
  totaldistance:0,          // 地图总距离（像素）
  rundistance: 0,           // 跑的距离（像素）
  modeldistance:[],
  initstuffnum:8,           // 初始放置的物品数量
  verticalatio:.294,        // 路边高度占比
  gifts: [],                // 循环使用的礼物数组
  scale:1,                  // 全局适配缩放比
  winW:$(window).width(),   // winW
  winH:$(window).height(),  // winH
  speed:3.7,                  // 默认速度 2为默认
  dynamicSpeed:3.7,                  // 默认速度 2为默认
  heroSpeed:0.75,              // 英雄一次动画时间
  lowphoneheroSpeed:0.75,              // 英雄一次动画时间
  jumpSpeed:.95,            // 跳跃时间
  model: 0,                 // 游戏模式 5开始随机
  mapLevel:0,
  jump1:false,              // 正在1级跳
  jump2:false,              // 正在2级跳
  timmer:null,              // 动画控制器ID
  progress:0,               // 进度
  prize: [],                // 获取到的物品
  capsules: [],             // 循环使用胶囊类数组
  roadsideobj: [],          // 循环使用路边对象数组
  lastFameTime:0,
  fps:0,
  isios:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  islowphone:false,
  /*
  *地图规则，t代表放置物品类型：1胶囊，3礼物，数字表示前面间隔距离
  *胶囊宽度30，高度40;   人物最高跳200(0<y<220);
  */
  mapmodel:{
    level0:[
      {t:"gift",x:400,y:150},
      {t:1,x:330},
      {t:1,x:230},
      {t:1,x:300},{t:1,x:0,y:35},{t:1,x:30},
      {t:1,x:200},
      {t:1,x:200},{t:1,x:0,y:30},
      {t:1,x:260},
    ],
    level1:[
      {t:1,x:400},{t:1,x:30},{t:1,x:0,y:30},
      {t:"gift",x:100,y:50},
      {t:1,x:180},{t:1,x:30},
      {t:1,x:160},
      {t:1,x:0,y:35},
      {t:"star",x:100,y:30},
      {t:1,x:230},
      {t:1,x:180},{t:1,x:30},
    ],
    level2:[{t:1,x:430},
      {t:1,x:450},{t:1,x:30},{t:1,x:0,y:30},
      {t:1,x:180},
      {t:1,x:180},
      {t:"star",x:150,y:30},
      {t:1,x:220},
      {t:1,x:210},{t:1,x:30},{t:1,x:30},
      {t:1,x:180},
      {t:1,x:200},{t:1,x:0,y:30},
    ],
    level3:[
      {t:1,x:500},{t:1,x:30},{t:1,x:0,y:30},
      {t:1,x:220},
      {t:1,x:0,y:35},
      {t:"star",x:300,y:30},
      {t:1,x:230},
      {t:1,x:180},{t:1,x:30},{t:1,x:30},
      {t:1,x:200},{t:1,x:30},
      {t:"star",x:100,y:30},
      {t:1,x:200},{t:1,x:30},{t:"gift",x:60},
    ],
    level4:[
      {t:1,x:550},{t:1,x:30},{t:1,x:0,y:30},
      {t:1,x:200},
      {t:"gift",x:80,y:50},
      {t:1,x:180},{t:1,x:0,y:35},{t:1,x:30},
      {t:1,x:200},{t:1,x:30},
      {t:1,x:200},{t:1,x:30,y:0},{t:1,x:0,y:30},{t:1,x:30},
      {t:1,x:230},
      {t:1,x:180},{t:1,x:0,y:30},
      {t:1,x:230},{t:1,x:0,y:30},
      {t:1,x:300}
    ],
    level5:[
      {t:1,x:600},{t:1,x:30},{t:1,x:0,y:35},{t:1,x:30},
      {t:1,x:300},{t:1,x:30},{t:1,x:30},
      {t:1,x:280},
      {t:1,x:230},{t:1,x:0,y:35},
      {t:"gift",x:60,y:50},
      {t:1,x:200},{t:1,x:30},{t:1,x:30},
      {t:1,x:300},{t:1,x:30},{t:1,x:30},
      {t:1,x:300},{t:1,x:30},
      {t:"door",x:500,y:-20}
    ]
  },
  //升级游戏难度
  upgradeGame:function(){
    var model=0;
    if(Game.rundistance<Game.modeldistance[0]){
        model=0
    }else if(Game.rundistance<Game.modeldistance[1]){
        model=1
    }else if(Game.rundistance<Game.modeldistance[2]){
        model=2
    }else if(Game.rundistance<Game.modeldistance[3]){
        model=3
    }else if(Game.rundistance<Game.modeldistance[4]){
        model=4
    }else{
        model=5
    }
    if(Game.fps>2){
        if(!Game.islowphone){Game.hero._sprite.state.timeScale=(2/Game.fps)*Game.heroSpeed;}
        if(Game.islowphone){Game.lowphoneheroSpeed=Game.heroSpeed*2}
    }else{
        if(!Game.islowphone && Game.hero._sprite.state.timeScale!=Game.herosprite){
            Game.hero._sprite.state.timeScale=Game.heroSpeed
        }
        if(Game.islowphone){Game.lowphoneheroSpeed=Game.heroSpeed*Game.fps}
    }
    if(Game.model!=model){
        Game.model=model;
        //速度调节
        if(this.model==0){
          this.speed=3.7;      
          this.heroSpeed=0.75;
          if(!Game.islowphone){Game.hero._sprite.state.timeScale =Game.heroSpeed}
        }else if(this.model==1){
          this.speed=4;
          this.heroSpeed=0.9;
          if(!Game.islowphone){Game.hero._sprite.state.timeScale =Game.heroSpeed}
        }else if(this.model==2){
          this.speed=4.3;
          this.heroSpeed=1;
          if(!Game.islowphone){Game.hero._sprite.state.timeScale =Game.heroSpeed}
        }else if(this.model==3){
          this.speed=5;
          this.heroSpeed=1.1;
          if(!Game.islowphone){Game.hero._sprite.state.timeScale =Game.heroSpeed}
        }else if(this.model==4){
          this.speed=5.5;
          this.heroSpeed=1.2;
          if(!Game.islowphone){Game.hero._sprite.state.timeScale =Game.heroSpeed}
        }else{
          this.speed=6;      
          this.heroSpeed=1.3;
          if(!Game.islowphone){Game.hero._sprite.state.timeScale =Game.heroSpeed}
        }
    }
  },
  //加载资源
  loadTexture:function(callback){
    //游戏角色骨骼赋值
    this.gamerole=window.gameroletype || "girl";
    if(Game.islowphone){
       gameresources.push({name:"heroframe",url:"../img/heroframe.json"})
    }else{
      this.gamerole=="boy"? gameresources.push({name:"herobone",url:"../bone/bone_boy/Boy_NeuropathyBoy_Suoyou.json"}) : void(0);
      this.gamerole=="girl"? gameresources.push({name:"herobone",url:"../bone/bone_girl/Girl_NeuropathyGirl_Suoyou.json"}) : void(0);
    }
    this.loader=PIXI.loader.add(gameresources)
    this.loader.load(callback)
  },
  // 初始化变量
  init: function() {
    // 初始化导演类
    this.director = new GameDirector();
    if(window.rendertype=="canvas"){
        Game.islowphone=true;
    }
    this.herodirector=new GameHeroDirector();
    // 初始化地图类
    this.map = new GameMapObj();
    // 初始化菜单类
    this.menu = new GameMenuObj();
    // 初始化主角类
    this.hero = new GameHeroObj(); 
    //入场
    this.map.onEnter();
    this.menu.onEnter();
    this.herodirector._stage.addChild(this.hero._sprite)
    this.du = new Dust(PIXI);
    this.cr = new Charm(PIXI);
    try{
        this.music={
            bgmusic :new Howl({src: ['../music/bgmusic.mp3'],loop: true,volume:.6}),
            gameover :new Howl({src: ['../music/gameover.mp3'],loop: false,volume:2}),
            gift :new Howl({src: ['../music/gift.mp3'],loop: false}),
            jump2 :new Howl({src: ['../music/jump2.mp3'],loop: false,volume:2}),
            success :new Howl({src: ['../music/success.mp3'],loop: false})
        };
        Game.music.jump2.on("end",function(){
            if(!Game.islowphone){
                Game.music.bgmusic.pause();
                Game.music.bgmusic.play();
            }
        })
    }catch(e){}
    this.giftEffectContainer=new PIXI.particles.ParticleContainer(
      1500,
      {alpha: true, scale: true, rotation: true, uvs: true}
    );
    this.particleTexture="star"
    this.particleStream = this.du.emitter(
      17,
      function(){
        return Game.du.create(
          0,                                       //x start position
          0,                                       //y start position
          function(){
            return new PIXI.Sprite(PIXI.loader.resources.roadfacestuff.textures[Game.particleTexture+".png"]);
          }, 
          Game.giftEffectContainer,                                     //Container for particles
          25,                                       //Number of particles
          0.01,                                  //Gravity
          true,                                 //Random spacing
          0, 6.28,                             //Min/max angle
          2, 40,                                //Min/max size
          5, 10 ,                              //Min/max speed
          // 0.005, 0.01,                          //Min/max scale speed 
          0.01, 0.02                          //Min/max alpha speed
          // 0.05, 0.1                         //Min/max rotation speed
        )
      }
    );
    !Game.islowphone && Game.director._stage.addChild(Game.giftEffectContainer);
    !Game.islowphone && this.director.renderStage();
  },
  // 主执行函数,元素入场
  gamestart: function(){
    Game.trigger("gamestart");
    this.lastFameTime=performance.now();
    this.refresh();
    try{
        if(!Game.islowphone){
            Game.music.bgmusic.pause();
            Game.music.bgmusic.play();
        }
    }catch(e){}
  },
  // 停止
  gameover: function() {
    //停止动画
    setTimeout(function(){
     cancelRequestAnimFrame(Game.timmer);
    },0)
    Game.trigger("gameover");
    try{
        if(!Game.islowphone){
            Game.music.bgmusic.pause();
            Game.music.gameover.play();
        }
    }catch(e){}
  },
  // 重新开始
  reset: function(){
    this.model=0; //难度设置为O
    this.mapLevel=0;//地图等级设置为O
    this.rundistance = 0;//位置为0
    this.status = 0;//停止
    this.prize = []; //清空获得的奖品
    this.menu.reset();//重置菜单
    this.map.reset();//重置地图
    this.hero.reset();//重置
    Game.speed=3.7; 
    if(!Game.islowphone){Game.hero._sprite.state.timeScale=0.75};
    Game.director.renderStage();
    //更新画布
  },
  //刷新
  refresh: function() {
    //console.log(Game.rundistance+"----"+Game.totaldistance)
    //移动距离
    Game.rundistance += Game.dynamicSpeed;
    //地图的更新
    Game.map.update();
    //菜单显示的更新
    Game.menu.update();
    //菜单显示的更新
    Game.hero.update();
    //更新粒子
    !Game.islowphone && Game.du.update();
    //更新tween
    Game.cr.update();
    //碰撞检查
    Game.collisionCheck();
    //升级游戏难度
    Game.upgradeGame();
    //更新舞台
    Game.director.renderStage();
    //更新舞台
    Game.herodirector.renderStage();
    //循环动画
    Game.timmer=requestAnimFrame(Game.refresh);
    var performancenow=performance.now();
    Game.fps=(performancenow-Game.lastFameTime)/16.7;
    //Game.fps=Game.fps> 2? 2 : Game.fps;
    Game.fps=Game.fps< 1? 1 : Game.fps;
    Game.fps=Game.fps.toFixed(1);
    var fps=Game.fps>2 ? 2 :Game.fps;
    Game.dynamicSpeed=Game.speed*fps;
    Game.lastFameTime=performancenow;
  },
  collisionCheck:function(){
    var heroRect = Game.hero.getRect();
    // 与胶囊碰撞成功
    var capsule=Game.collisionCapsule(heroRect);
    if (capsule) { 
      Game.hero._sprite.tint = 0x000000;
      Game.director.renderStage();
      Game.gameover();
    }
    // 与礼物碰撞成功
    var prize=Game.collisionGift(heroRect);
    if (prize){
      if(prize.getType()=="gift"){
        Game.prize.push(prize);
      }
      if(prize.getType()!="door"){
        prize.setAlpha(0);
      }
      prize.setState(0);
      //胶囊等于回收
      Game.map.putObjToMap();
      //特效
      prize.collisionEffect(prize.getType());
      try{
        if(!Game.islowphone){
            Game.music.gift.play();
        }
      }catch(e){}
    }
  },
  // 与胶囊碰撞
  collisionCapsule: function(rect) {
    for (var i=0; i<Game.capsules.length; i++) {
      var cp = Game.capsules[i];
      // 只有state为正常时才检测
      if ( cp.getState() === 1 && Game.collisionWithRect(rect, cp.getRect()) ) {
        return cp;
        break;
      }
    }
    return false;
  },
  // 与礼物碰撞
  collisionGift: function(rect) {
    for (var i=0; i<Game.gifts.length; i++) {
      var gift = Game.gifts[i];
      //只有state为正常时才检测
      if ( gift.getState() === 1 && Game.collisionWithRect(rect, gift.getRect()) ) {
        return gift;
        break;
      }
    }
    return false;
  },
  // 矩形的碰撞检测算法 x,y 为矩形中点
  collisionWithRect: function(rect1, rect2) {
    // 判断横向和纵向都符合
    return !(
      (rect1.y+rect1.h-1<rect2.y) || (rect1.y>rect2.y+rect2.h-1)||
      (rect1.x+rect1.w-1<rect2.x) || (rect1.x>rect2.x+rect2.w-1)
    )
  },
  handler: function(type, handler) {
      //添加事件对象
      if (typeof this.handlers == "undefined") { this.handlers = {} }
      if (typeof this.handlers[type] == 'undefined') {
          this.handlers[type] = new Array();
      }
      this.handlers[type] = this.handlers[type].concat(handler);
  },
  trigger: function(type) {
      if (typeof this.handlers == "undefined") { this.handlers = {} }
      if (this.handlers[type] instanceof Array) {
          var handlers = this.handlers[type];
          for (var i = 0, len = handlers.length; i < len; i++) {
              handlers[i].call(this, this);
          }
      }
  },
  //take photo 拍照
  /*takePhoto:function(callback){
    var imgdata=Game.director._renderer.view.toDataURL("image/png");
    var img=document.createElement("img");
    img.setAttribute("src",imgdata);
    $("body").append(img)
    var photocvs=document.createElement("canvas");
    photocvs.height=Game.winH;
    photocvs.width=Game.winW; 
    var photoctx=photocvs.getContext("2d");

    var image = new Image();
    image.onload = function() {
      photoctx.drawImage(image,0,0,Game.winW,Game.winH);
      //裁切
      var clipImgData=photoctx.getImageData(
        Game.hero._sprite.x-Game.hero._sprite.width*.5,
        Game.hero._sprite.y-Game.hero._sprite.height*1.1,
        Game.hero._sprite.width*3,
        Game.hero._sprite.height*1.1
      );
      photocvs.width=Game.hero._sprite.width*3;
      photocvs.height=Game.hero._sprite.height*1.1;
      photoctx.putImageData(clipImgData,0,0)
      callback(photocvs.toDataURL("image/png"))
    };
    image.src=imgdata;
  }*/
};


// 导演类
var GameDirector = function() {
  // 舞台类
  this._stage = new PIXI.Stage();
  this._stage.interactive = true;
  var nowebgl=Game.islowphone ? true :false;
  this._renderer = PIXI.autoDetectRenderer(
    Game.winW,
    Game.winH,
    {
      transparent:true,
      resolution: window.devicePixelRatio
    },
    nowebgl
  );
  //直接插入body
  $('.page-game').append(this._renderer.view);
};
GameDirector.prototype = {
  // 往舞台添加一个精灵类
  addSprite: function(sprite) {
    if(sprite) {
      this._stage.addChild(sprite);
    }
  },
  // 刷新UI
  renderStage: function() {
    this._renderer.render(this._stage);
  }
};

// 英雄（导演类）
var GameHeroDirector = function() {
  // 舞台类
  this._stage = new PIXI.Stage();
  this._stage.interactive = true;
  var nowebgl=Game.islowphone ? true :false;
  this._renderer = PIXI.autoDetectRenderer(
    Game.winW,
    Game.winH,
    {
      transparent:true,
      resolution: window.devicePixelRatio
    },
    nowebgl
  );
  //直接插入body
  $('.page-game').append(this._renderer.view);
};
GameHeroDirector.prototype = {
  // 往舞台添加一个精灵类
  addSprite: function(sprite) {
    if(sprite) {
      this._stage.addChild(sprite);
    }
  },
  // 刷新UI
  renderStage: function() {
    this._renderer.render(this._stage);
  }
};




// 基础精灵类
// Hero, Capsule, Gift, Monster 都继承
// 临时Class设计
// @param width 宽度
// @param height 高度
// @param texture PIXI.Texture 实例

var GameSpriteObj = function() {};
GameSpriteObj.prototype = {
  _sprite: null,                  // pixi精灵类实例
  _texture: null,                 // 纹理素材
  _status: 0,                    // 状态
  _type: 0,                   // 种类

  // init 方法才初始化精灵类
  init: function(width, height, texture) {
    this._texture = texture;
    this._sprite = new PIXI.Sprite(this._texture);
    this.setSize({w: width, h: height});
  },
  // 设置状态
  // @param state number
  setState: function(state) {
    this._state = state;
  },
  // 获取状态
  getState: function() {
    return this._state;
  },
  // 设置类型
  // @param type number
  setType: function(type) {
    this._type = type;
  },
  // 获取类型
  getType: function() {
    return this._type;
  },
  // 设置大小
  setSize: function(size) {
    this._sprite.width = size.w;
    this._sprite.height = size.h;
  },
  // 获取大小
  getSize: function() {
    return { 
      w: this._sprite.width,
      h: this._sprite.height
    }
  },
  // 设置位置
  setPos: function(pos) {
    this._sprite.x = pos.x;
    this._sprite.y = pos.y;
  },
  // 获取位置
  getPos: function() {
    return {
      x: this._sprite.x,
      y: this._sprite.y
    }
  },
  // 设置透明度
  setAlpha: function(num) {
    this._sprite.alpha = num;
  },
  // 获取透明度
  getAlpha: function() {
    return this._sprite.alpha;
  },
  // 获取rect
  getRect:function() {
    //调试代码
    // var rectangle = new PIXI.Graphics();;
    // rectangle.beginFill(0x0033CC);
    // rectangle.lineStyle(2, 0xFF0000, 1);
    // rectangle.drawRect(this._sprite.x+this._sprite.width*.1, this._sprite.y+this._sprite.height*.1, this._sprite.width*.8, this._sprite.height*.8);
    // rectangle.endFill();
    // rectangle.alpha = 0.5;
    // Game.director._stage.addChild(rectangle);
    // setTimeout(function(){
    //   Game.director._stage.removeChild(rectangle);
    // },1000/60)
    //调试代码
    return {
      x: this._sprite.x+this._sprite.width*.2,
      y: this._sprite.y+this._sprite.width*.2,
      w: this._sprite.width*.6,
      h: this._sprite.height*.6
    }
  },
  // 进入舞台
  onEnter: function() {
    Game.director.addSprite(this._sprite);
  },
  // 对象销毁
  onDestroy: function() {

  }
};


// 地图管理类#map
// 背景的生成和怪物礼物的管理
// 地图的难度state: 0: 测试模式, 1: 正常模式, 2: 困难模式, 3: 非常难模式, 4: 地狱模式, 5:停止
var GameMapObj = function() {
  this.init();
  this.coutRSOloc=0;//累计rso偏移位置
  this.coutStuffloc=0;//累计stuff偏移位置
  this.TotalStuffNum=0;//单个level总共物品
  this.currentStuffNum=0;//单个level的当前物品index
};
GameMapObj.prototype = {
  // 初始化地图所需东西
  init: function() {
    //视差背景
    this.gameparallaxbg1=new PIXI.Sprite(PIXI.loader.resources.gameparallaxbg.texture);
    this.gameparallaxbg2=new PIXI.Sprite(PIXI.loader.resources.gameparallaxbg.texture);
    //路面
    this.gameroad1=new PIXI.Sprite(PIXI.loader.resources.gameroad.texture);
    this.gameroad2=new PIXI.Sprite(PIXI.loader.resources.gameroad.texture);
    //前景
    this.gameforeground=new PIXI.Sprite(PIXI.loader.resources.roadstuff.textures["gameforeground.png"]);
    this.gameforeground1=new PIXI.Sprite(PIXI.loader.resources.roadstuff.textures["gameforeground1.png"]);
    this.gameforeground2=new PIXI.Sprite(PIXI.loader.resources.roadstuff.textures["gameforeground2.png"]);
    this.gameforeground3=new PIXI.Sprite(PIXI.loader.resources.roadstuff.textures["gameforeground3.png"]);
    this.gameforeground4=new PIXI.Sprite(PIXI.loader.resources.roadstuff.textures["gameforeground4.png"]);
    //计算适配比例
    Game.scale=(Game.winH*Game.verticalatio)/(this.gameroad1.height/2);
  },
  // 当MapObj进入舞台时
  onEnter: function(){
    //渲染游戏场景
    this.initGameBg();
    //渲染路边对象
    this.initRoadsideObj();
    //渲染路面
    this.initGameRoad();
    //初始化地图模型
    this.initMapModel();
    //渲染前景
    this.initGameFore();
    //初始化胶囊
    this.initCapsules();
    //初始化礼物
    this.initGift();
    //初始化脑子
    this.initBrain();
    //布置胶囊和礼物
    this.layoutCapsulesAndGiftToMap();
  },
  // 重置
  reset: function() {
    //重置路边对象
    this.resetRoadsideObj();
    //重置路面
    this.updateGameRoad(0);
    //物品，难度相关
    this.coutStuffloc=0;
    this.currentStuffNum=0;
    //重新排列胶囊和礼品
    this.layoutCapsulesAndGiftToMap();
  },
  // 屏幕更新所需的更新
  update: function(){
    //移动路边对象
    this.updateRoadsideObj();
    //移动路面
    this.updateGameRoad(Game.rundistance);
    //移动胶囊
    this.updateCapsules();
    //移动礼物
    this.updateGift();
    //旋转大脑
    this.updateBrain();
    //前景动效
    this.updateFore();
    // 回收处理
    this.recycleRoadsideObj();
    this.recycleCapsule();
    this.recycleGift();
    this.recycleMonster();
  },
  //生成8胶囊
  initCapsules:function(){
    for (var i=0; i<12; i++) {
      cp = new GameCapsuleObj();
      Game.capsules.push(cp);
      cp.onEnter();
    }
  },
  //生成4个礼物
  initGift:function(){
    for (var i=0; i<5; i++) {
      cp = new GameGiftObj();
      Game.gifts.push(cp);
      cp.onEnter();
    }
  },
  initBrain:function(){
    this.brain=new BrainObj();
    this.brain._sprite.anchor.x = 0.5;
    this.brain._sprite.anchor.y = 0.5;
    this.brain.onEnter();
  },
  layoutCapsulesAndGiftToMap:function(){
    //修改胶囊，礼品状态
    for(var i in Game.capsules){
      Game.capsules[i].setState(0);
      Game.capsules[i].setAlpha(0);
    }
    for(var i in Game.gifts){
      Game.gifts[i].setState(0);
      Game.gifts[i].setAlpha(0);
    }
    //排列N个
    for(var i=0;i<Game.initstuffnum;i++){
      Game.map.putObjToMap();
    }
  },
  initRoadsideObj:function(){
    for (var i=0; i<6; i++) {
      rso = new RoadsideObj();
      Game.roadsideobj.push(rso);
      rso.onEnter();
      //放置路边对象（有策略）
      rso.putInRoadSide();
    }
  },
  //重置路边对象
  resetRoadsideObj:function(){
    Game.map.coutRSOloc=0;
    for (var i=0; i<Game.roadsideobj.length; i++){
      Game.roadsideobj[i].status=1;
      //放置路边对象（有策略）
      Game.roadsideobj[i].putInRoadSide();
    }
  },
  //移动路面
  updateRoadsideObj:function(){
    for(var i=0; i<Game.roadsideobj.length; i++) {
      var rso = Game.roadsideobj[i];
      if (rso.getState() === 1) {
        this.moveSprite(rso);
      }
    }
  },
  //初始化游戏背景层
  initGameBg:function(){
    //添加视差背景
    this.gameparallaxbg1.scale.x=this.gameparallaxbg1.scale.y=this.gameparallaxbg2.scale.x=this.gameparallaxbg2.scale.y=.5*Game.scale;
    this.gameparallaxbg1.position.y=this.gameparallaxbg2.position.y=Game.winH-this.gameparallaxbg1.height;
    Game.director.addSprite(this.gameparallaxbg1);
    Game.director.addSprite(this.gameparallaxbg2);
    //加入路边对象
    //gameparallaxbg
  },
  //初始化游戏路面层
  initGameRoad:function(){
    this.gameroad1.scale.x=this.gameroad1.scale.y=this.gameroad2.scale.x=this.gameroad2.scale.y=.5*Game.scale;
    this.gameroad1.position.y=this.gameroad2.position.y=Game.winH-this.gameroad1.height;
    Game.director.addSprite(this.gameroad1);
    Game.director.addSprite(this.gameroad2);
  },
  //初始化游戏前景
  initGameFore:function(){
    //玩偶最里面
    this.gameforeground2.width=this.gameforeground2.width/2*Game.scale;
    this.gameforeground2.height=this.gameforeground2.height/2*Game.scale;
    this.gameforeground2.position.x=Game.winW-this.gameforeground2.width*2.5;
    this.gameforeground2.position.y=Game.winH-this.gameforeground2.height;
    Game.director.addSprite(this.gameforeground2);
    //最底部
    var scale=this.gameforeground.height/this.gameforeground.width;
    this.gameforeground.width=Game.winW;
    this.gameforeground.height=Game.winW*scale;
    this.gameforeground.position.y=Game.winH-this.gameforeground.height*0.9;
    Game.director.addSprite(this.gameforeground);
    //盒子
    this.gameforeground4.width=this.gameforeground4.width/2*Game.scale;
    this.gameforeground4.height=this.gameforeground4.height/2*Game.scale;
    this.gameforeground4.position.x=this.gameforeground4.width*.6;
    this.gameforeground4.position.y=Game.winH-this.gameforeground4.height*1.3;
    Game.director.addSprite(this.gameforeground4);
    //飞
    this.gameforeground1.width=this.gameforeground1.width/2*Game.scale;
    this.gameforeground1.height=this.gameforeground1.height/2*Game.scale;
    this.gameforeground1.position.y=Game.winH-this.gameforeground1.height;
    Game.director.addSprite(this.gameforeground1);
    //玩偶外面
    this.gameforeground3.width=this.gameforeground3.width/2*Game.scale;
    this.gameforeground3.height=this.gameforeground3.height/2*Game.scale;
    this.gameforeground3.position.x=Game.winW-this.gameforeground3.width;
    this.gameforeground3.position.y=Game.winH-this.gameforeground3.height*.7;
    Game.director.addSprite(this.gameforeground3);
    //移动路径
    this.movepath=[-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1];
  },
  //初始化地图模型数据
  initMapModel:function(){
    var index=0;
    for(var i in Game.mapmodel){
      for(var j in Game.mapmodel[i]){
        //比例
        Game.mapmodel[i][j]["x"]=(Game.mapmodel[i][j]["x"]*Game.scale).toFixed(0);
        Game.mapmodel[i][j]["y"] = Game.mapmodel[i][j]["y"] ? (Game.mapmodel[i][j]["y"]*Game.scale).toFixed(0) : null;
        Game.totaldistance+=Number(Game.mapmodel[i][j]["x"]);
      }
      Game.modeldistance[index]=Game.totaldistance;
      index++;
    }
  },
  //渲染移动中的路面
  updateGameRoad:function(loc){
    // 停止状态就停止
    this.gameroad1.position.x = -(loc);
    this.gameroad1.position.x %= this.gameroad1.width * 2;
    if(this.gameroad1.position.x<0)
      this.gameroad1.position.x += this.gameroad1.width * 2;
    this.gameroad1.position.x -= this.gameroad1.width;
    this.gameroad2.position.x = -(loc) + this.gameroad1.width;
    this.gameroad2.position.x %= this.gameroad1.width * 2;
    if(this.gameroad2.position.x<0)
      this.gameroad2.position.x += this.gameroad1.width * 2;
    this.gameroad2.position.x -= this.gameroad1.width;
    //视差层
    this.gameparallaxbg1.position.x = -(loc*.2);
    this.gameparallaxbg1.position.x %= this.gameparallaxbg1.width * 2;
    if(this.gameparallaxbg1.position.x<0)
      this.gameparallaxbg1.position.x += this.gameparallaxbg1.width * 2;
    this.gameparallaxbg1.position.x -= this.gameparallaxbg1.width;
    this.gameparallaxbg2.position.x = -(loc*.2) + this.gameparallaxbg1.width;
    this.gameparallaxbg2.position.x %= this.gameparallaxbg1.width * 2;
    if(this.gameparallaxbg2.position.x<0)
      this.gameparallaxbg2.position.x += this.gameparallaxbg1.width * 2;
    this.gameparallaxbg2.position.x -= this.gameparallaxbg1.width;
  },
  moveSprite: function(sprite) {
    //移动物体
    sprite.setPos({
      x: sprite.getPos().x - Game.dynamicSpeed,
      y: sprite.getPos().y
    });
  },
  updateCapsules:function(){
    //移动胶囊
    for(var i=0; i<Game.capsules.length; i++) {
      var cp = Game.capsules[i];
      if (cp.getState() === 1){
        this.moveSprite(cp);
      }
    }
  },
  updateGift:function(){
    //移动礼物
    for(var i=0; i<Game.gifts.length; i++) {
      var gift = Game.gifts[i];
      if (gift.getState() === 1){
        this.moveSprite(gift);
      }
    }
  },
  updateFore:function(){
    var index1=(Game.rundistance*.05).toFixed(0)%this.movepath.length;
    this.gameforeground.y+=this.movepath[index1]*.02;
    this.gameforeground1.y+=this.movepath[index1]*.05;
    this.gameforeground2.y+=this.movepath[index1]*.2
    this.gameforeground3.y+=this.movepath[index1]*.1
    this.gameforeground4.y+=this.movepath[index1]*.08;
  },
  updateBrain:function(){
    this.brain.rotate()
  },
  // 获取可以使用的胶囊
  getAvailableCapsule: function() {
    for(var i=0; i<Game.capsules.length; i++) {
      var cp = Game.capsules[i];
      // 可用状态
      if (cp.getState() == 0){
        return cp;
        break;
      }
    }
  },
  // 获取可以使用的路边对象数组
  getAvailableRoadsideObj: function(type) {
    for(var i=0; i<Game.roadsideobj.length; i++) {
      var rso = Game.roadsideobj[i];
      // 可用状态
      if (rso.getState() == 0 && rso.getType() == type) {
        return rso;
        break;
      }
    }
  },
  // 获取可以使用的礼物
  getAvailableGift: function(type) {
    for(var i=0; i<Game.gifts.length; i++) {
      var cp = Game.gifts[i];
      // 可用状态
      if (cp.getState() == 0){
        /*
        *修改礼
        */
        this.setGiftType(cp,type)
        return cp;
        break;
      }
    }
  },
  setGiftType:function(cp,type){
    function modifyTexture(cp,texture){
      //还原纹理
      cp.setSize({w: texture.width, h: texture.height});
      cp.setSize({w: texture.width/2, h: texture.height/2});
      cp._sprite.setTexture(texture);
    };
    if(type=="gift" && cp._type!="gift"){
      modifyTexture(cp,PIXI.loader.resources.roadfacestuff.textures["gift.png"]);
    }else if(type=="star"){
      modifyTexture(cp,PIXI.loader.resources.roadfacestuff.textures["star.png"]);
    }else if(type=="door"){
      modifyTexture(cp,PIXI.loader.resources.roadfacestuff.textures["door.png"]);
    }
    //赋值
    cp.setType(type);
  },
  // 获取可以使用的怪兽
  getAvailableMonster: function() {
 
  },
  // 回收胶囊
  recycleCapsule: function() {
    // 在正常状态而且已经移出屏幕范围的可以回收
    for(var i=0; i<Game.capsules.length; i++) {
      var cp = Game.capsules[i];
      if (cp.getState() == 1 && cp.getPos().x <= -cp.getSize().w) {
        cp.setState(0);
        Game.map.putObjToMap();
      }
    }
  },
  // 回收礼物
  recycleGift: function() {
    for(var i=0; i<Game.gifts.length; i++) {
      var cp = Game.gifts[i];
      if (cp.getState() == 1 && cp.getPos().x <= -cp.getSize().w) {
        cp.setState(0);
        Game.map.putObjToMap();
      }
    }
  },
  //回收路边对象 
  recycleRoadsideObj:function(){
    // 在正常状态而且已经移出屏幕范围的可以回收
    for(var i=0; i<Game.roadsideobj.length; i++) {
      var rso = Game.roadsideobj[i];
      if (rso.getState() == 1 && rso.getPos().x <= -rso.getSize().w) {
        rso.putInRoadSide();
      }
    }
  },
  // 回收怪物
  recycleMonster: function() {

  },
  // 放置对象到地图
  putObjToMap:function(){
    if(Game.mapLevel==6){
      return false;
    }
    var level=Game.mapmodel["level"+Game.mapLevel];
    this.TotalStuffNum=level.length;
    //拿出一个物品（胶囊，礼物）
    var stuffType=level[this.currentStuffNum]["t"];
    var stuff=null;
    if(stuffType=="1"){
      stuff=this.getAvailableCapsule();
    }else{
      stuff=this.getAvailableGift(stuffType);
    };
    var x=level[this.currentStuffNum]["x"];
    var y=Game.winH*.74 - stuff.getSize().h;
    var h=level[this.currentStuffNum]["y"];
    if(h){y-=h}
    pos = {
      "x": x,
      "y": y
    };
    Game.map.coutStuffloc+=Number(pos.x);
    pos.x=(Game.map.coutStuffloc-Game.rundistance);
    stuff.updateState(1, pos);
    this.currentStuffNum+=1;
    if(this.currentStuffNum==this.TotalStuffNum){
      //下一关
      Game.mapLevel+=1;
      this.currentStuffNum=0;
    }
  }
};

//菜单类
var GameMenuObj = function() {
  this.init();
};
GameMenuObj.prototype = {
  //初始化
  init: function() {
    this.head=$(".progresswrap .head");
    this.progress=$(".progresswrap .progress")[0];
    this.prizenum=$(".prizewrap .num").eq(0);
    //初始化头像
    Game.gamerole=="boy" ? this.head.addClass("boyhead") : void(0);
    Game.gamerole=="girl" ? this.head.addClass("girlhead") : void(0);

  },
  //菜单元素进入舞台
  onEnter: function() {
  },
  //添加分数相关
  initScore:function(){
    /*Game.director.addSprite(this.bit);
    Game.director.addSprite(this.tenBit);
    Game.director.addSprite(this.hundredBit);
    Game.director.addSprite(this.thousandBit);
    Game.director.addSprite(this.mi);*/
  },
  //设置分数
  setScore:function(num){
    this.progress.style.width=num+"%";
  },
  //获取分数
  getScore:function(){

  },
  initGiftScore:function(){
   /* Game.director.addSprite(this.getPrize);
    Game.director.addSprite(this.totalPrize);
    Game.director.addSprite(this.numsplit);*/
  },
  setGiftNum:function(num){
    this.prizenum.attr("data",num);
  },
  //重置
  reset: function(){
    this.setScore(0);
    this.setGiftNum(0);
  },
  //菜单元素的更细
  update: function() {
    //更新分数
    Game.progress=Game.rundistance/Game.totaldistance*100;
    this.setScore(Game.progress);
    this.setGiftNum(Game.prize.length);
    if(Game.progress>100){
      Game.progress=100;
      Game.gameover();
    }
  }
};



//主角精灵类
var GameHeroObj = function() {
    //hero的生成策略
    var herosprite;
    if(!Game.islowphone){
        herosprite = new PIXI.spine.Spine(PIXI.loader.resources.herobone.spineData);
        herosprite.skeleton.flipX=true;
        herosprite.width=herosprite.width/3*Game.scale;
        herosprite.height=herosprite.height/3*Game.scale;
        herosprite.position.x = Game.winW*.2;
        herosprite.position.y =Game.winH*.73;
        herosprite.skeleton.setSkinByName("default");
        herosprite.stateData.setMixByName('cazryrun_sender_0', 'cazryrun_sender_0', 0.2);
        herosprite.stateData.setMixByName('1jitiao_sender_0', '1jitiao_sender_0', 0.4);
        herosprite.stateData.setMixByName('2jitiao_sender_0', '2jitiao_sender_0', 0.4);
        herosprite.state.setAnimationByName(0, 'cazryrun_sender_0', true);
        //跳跃高度参考点
        Game.jumpStoneIndex= Game.gamerole=="boy" ? 18 :22;
        //事件
        $(Game.herodirector._renderer.view).bind('touchstart', onTouchStart);
        function onTouchStart(){
            var hp=Math.abs(Game.jumpH)/Game.hero.height;
            if(hp<0.2){
              herosprite.state.setAnimationByName(0, '1jitiao_sender_0', false);
              herosprite.state.addAnimationByName(0, 'cazryrun_sender_0', true,0);
              Game.jump2=false
            }else if(Game.jump2==false){
              Game.jump2=true;
              herosprite.state.setAnimationByName(0, '2jitiao_sender_0', false);
              herosprite.state.addAnimationByName(0, 'cazryrun_sender_0', true,0);
              try{
                if(!Game.islowphone){
                    Game.music.bgmusic.pause();
                    Game.music.jump2.play();
                }
              }catch(e){}
            }
        }
        this._sprite=herosprite;
        this.height=herosprite.height;
        this.width=herosprite.width;
        Game.heroh=this.height;
        Game.herow=this.width;
        //起跳原点
        Game.jumpOriginH=this._sprite.children[Game.jumpStoneIndex].transform.localTransform.ty;
    }else{
        /*兼容方案*/
        var textures=PIXI.loader.resources.heroframe.textures;
        this.heroframes=[
            textures["heroframe1.png"],
            textures["heroframe2.png"],
            textures["heroframe3.png"],
            textures["heroframe4.png"],
            textures["heroframe5.png"],
            textures["heroframe6.png"],
            textures["heroframe7.png"],
            textures["heroframe8.png"],
            textures["heroframe9.png"],
            textures["heroframe10.png"]
        ];
        herosprite=new PIXI.Sprite(this.heroframes[0]);
        herosprite.height=herosprite.height/1.4*Game.scale;;
        herosprite.width=herosprite.width/1.4*Game.scale;
        herosprite.position.x = Game.winW*.2;
        herosprite.position.y =Game.winH*.73-herosprite.height;
        this._sprite=herosprite;
        $(Game.herodirector._renderer.view).bind('touchstart', onTouchStartX);
        function onTouchStartX(){
            if(!Game.jump1 && !Game.jump2){
                //1级条
                Game.jump1= Game.cr.slide(herosprite, herosprite.position.x, herosprite.position.y-herosprite.width*0.7,15/Game.lowphoneheroSpeed,"smoothstep");
                Game.jump1.onComplete=function(){
                    Game.jump1=Game.cr.slide(herosprite, herosprite.position.x, Game.winH*.73-herosprite.height,15/Game.lowphoneheroSpeed,"smoothstepSquared");
                    Game.jump1.onComplete=function(){
                        Game.jump1=false
                    }
                }
            }else if(!Game.jump2){
                //2级条
                Game.jump1 && Game.jump1.pause();
                Game.jump1=false;
                Game.jump2= Game.cr.slide(herosprite, herosprite.position.x, herosprite.position.y-herosprite.width*.8,13/Game.lowphoneheroSpeed,"smoothstep");
                Game.jump2.onComplete=function(){
                    Game.jump2=Game.cr.slide(herosprite, herosprite.position.x, Game.winH*.73-herosprite.height,13/Game.lowphoneheroSpeed,"smoothstepSquared");
                    Game.jump2.onComplete=function(){
                        Game.jump2=false
                    }
                }

            }
        }
    }
};
GameHeroObj.prototype = new GameSpriteObj();
GameHeroObj.prototype.reset = function() {
  Game.hero._sprite.tint = 0xFFFFFF;
    if(!Game.islowphone){
        Game.hero._sprite.state.addAnimationByName(4, 'cazryrun_sender_0', false,0);
    }else{
    }
};
GameHeroObj.prototype.update = function(){
    if(Game.islowphone){
        var index=(Game.rundistance*.05).toFixed(0)%this.heroframes.length;
        this._sprite.texture=this.heroframes[index];
    }
    if(!Game.islowphone){
      var curJumpH=this._sprite.children[Game.jumpStoneIndex].transform.localTransform.ty;
      Game.jumpH=(curJumpH-Game.jumpOriginH)/3*Game.scale;
    }
};
//重写一下getRect方法，跳跃时把人物碰撞范围缩小
GameHeroObj.prototype.getRect = function() {
  //调试代码
  // var rectangle = new PIXI.Graphics();
  // rectangle.beginFill(0x0033CC);
  // rectangle.lineStyle(2, 0xFF0000, 1);
  // rectangle.drawRect(
  //   this._sprite.x-this._sprite.width*.1, 
  //   this._sprite.y-this._sprite.height,
  //   Math.floor(this._sprite.width*.2), 
  //   Math.floor(this._sprite.height)+Game.jumpH
  // );
  // rectangle.endFill();
  // rectangle.alpha = 0.5;
  // Game.director._stage.addChild(rectangle);
  // setTimeout(function(){
  //   Game.director._stage.removeChild(rectangle);
  // },1000/60)
  //调试代码
  //
  //调试代码 低端机
  // var rectangle = new PIXI.Graphics();
  // rectangle.beginFill(0x0033CC);
  // rectangle.lineStyle(2, 0xFF0000, 1);
  // rectangle.drawRect(
  //   this._sprite.x +this._sprite.width*.4, 
  //   this._sprite.y,
  //   Math.floor(this._sprite.width*.2), 
  //   Math.floor(this._sprite.height)
  // );
  // rectangle.endFill();
  // rectangle.alpha = 0.5;
  // Game.director._stage.addChild(rectangle);
  // setTimeout(function(){
  //   Game.director._stage.removeChild(rectangle);
  // },1000/60)
  //调试代码
    if(!Game.islowphone){
      return {
        x: this._sprite.x-this._sprite.width*.1,
        y: this._sprite.y-this._sprite.height,
        w: Math.floor(this._sprite.width*.2),
        h: Math.floor(this._sprite.height)+Game.jumpH
      };
    }else{
      return {
        x: this._sprite.x+this._sprite.width*.4, 
        y: this._sprite.y,
        w: Math.floor(this._sprite.width*.3), 
        h: Math.floor(this._sprite.height)
      };   
    }
};




// 胶囊类
// 胶囊状态 0:隐藏(不被使用), 1: 显示(正在使用)
var GameCapsuleObj = function() {
  texture = PIXI.loader.resources.roadfacestuff.textures["capsule"+Math.ceil(Math.random()*2)+".png"];
  // 调用初始化
  this.init(texture.width/2*Game.scale, texture.height/2*Game.scale, texture);
  this.setState(0);
};  
GameCapsuleObj.prototype = new GameSpriteObj();
// 根据胶囊的状态更新其属性, 是否设置透明，是否可用等
GameCapsuleObj.prototype.updateState = function(state, pos) {
  var pos = pos? pos : {x: 0, y: 0};
  this.setState(state);
  if (this.getState() == 0) { 
    this.setAlpha(0);
  }
  else if (this.getState() == 1) {
    this.setAlpha(1);
  }
  this.setPos(pos);
};




// 礼物类
// 礼物状态 0:隐藏(不被使用), 1: 显示(正在使用)
var GameGiftObj = function() {
  this._type="gift";
  var texture = PIXI.loader.resources.roadfacestuff.textures["gift.png"];
  // 调用初始化
  this.init(texture.width/2*Game.scale, texture.height/2*Game.scale, texture);
  this.setState(0);
};
GameGiftObj.prototype = new GameSpriteObj();
// 根据礼物的状态更新其属性, 是否设置透明，是否可用等
GameGiftObj.prototype.updateState = function(state, pos) {
  var pos = pos? pos : {x: 0, y: 0};
  this.setState(state);
  if (this.getState() == 0) { 
    this.setAlpha(0);
  }else if (this.getState() == 1) {
    this.setAlpha(1);
  }
  this.setPos(pos);
};
GameGiftObj.prototype.collisionEffect = function(type) {
  Game.giftEffectContainer.x=this._sprite.x;
  Game.giftEffectContainer.y=this._sprite.y;
  Game.particleStream.play();
  setTimeout(function(){
    Game.particleStream.stop();
  },100)
};



// 大脑类
var BrainObj = function() {
  texture = PIXI.loader.resources.brain.texture;
  // 调用初始化
  this.init(texture.width/2*Game.scale, texture.height/2*Game.scale, texture);
  this._sprite.x=Game.winW-this._sprite.height*.1;
  this._sprite.y=this._sprite.height*.1;
};
BrainObj.prototype = new GameSpriteObj();
// 根据礼物的状态更新其属性, 是否设置透明，是否可用等
BrainObj.prototype.rotate = function(state, pos) {
  //旋转脑子
  this._sprite.rotation = Game.rundistance*.1 * (Math.PI / 180);
};
  



// 路边对象类
// @param type 类型 1，2，3，4
// @param status路边对象状态 0:隐藏(不被使用), 1: 显示(正在使用)
var RoadsideObj = function() {
  //出现的概率
  this.getRondomTexture=function(){
    var r=Math.random()*100;
    if(r<20){
      return PIXI.loader.resources.stuff.textures["roadside_obj3.png"];
    }else if(r<60){
      return PIXI.loader.resources.stuff.textures["roadside_obj1.png"];
    }else if(r<70){
      return PIXI.loader.resources.stuff.textures["roadside_obj2.png"];
    }else if(r<80){
      return PIXI.loader.resources.stuff.textures["roadside_obj4.png"];
    }else if(r<90){
      return PIXI.loader.resources.stuff.textures["roadside_obj5.png"];
    }else{
      return PIXI.loader.resources.stuff.textures["roadside_obj0.png"];
    }
  }
  // 根据type使用纹理
  var texture=PIXI.loader.resources.stuff.textures["roadside_obj0.png"];
  // 调用初始化
  if (texture != null) {  
    this.init(texture.width/2*Game.scale, texture.height/2*Game.scale, texture);
  }
};
RoadsideObj.prototype = new GameSpriteObj();
// 根据路边对象的状态更新其属性, 是否设置透明，是否可用等
RoadsideObj.prototype.updateState = function(state, pos) {
  var pos = pos? pos : {x: 0, y: 0};
  this.setState(state);
  this.setPos(pos);
};
RoadsideObj.prototype.putInRoadSide=function(){
  var texture=this.getRondomTexture();
  this._sprite._texture=texture;
  this._sprite.width=texture.width/2*Game.scale;
  this._sprite.height=texture.height/2*Game.scale;
  pos = {
    x: this.getSize().w,
    y: Game.winH*.73 - this.getSize().h
  };
  Game.map.coutRSOloc+=pos.x+Math.random()*600;
  pos.x+=((Game.map.coutRSOloc-Game.rundistance)-this._sprite.width);
  this.updateState(1, pos);
}






