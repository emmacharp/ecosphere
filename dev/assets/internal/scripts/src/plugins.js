
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

// SVG — manipulating classes with jQuery

!function(s){var t=s.fn.addClass;s.fn.addClass=function(a){for(var n,r=t.apply(this,arguments),e=0,i=this.length;i>e;e++)if(n=this[e],n instanceof SVGElement){var f=s(n).attr("class");if(f){var l=f.indexOf(a);-1===l&&(f=f+" "+a,s(n).attr("class",f))}else s(n).attr("class",a)}return r};var a=s.fn.removeClass;s.fn.removeClass=function(t){for(var n,r=a.apply(this,arguments),e=0,i=this.length;i>e;e++)if(n=this[e],n instanceof SVGElement){var f=s(n).attr("class");if(f){var l=f.indexOf(t);-1!==l&&(f=f.substring(0,l)+f.substring(l+t.length,f.length),s(n).attr("class",f))}}return r};var n=s.fn.hasClass;s.fn.hasClass=function(t){for(var a,r=n.apply(this,arguments),e=0,i=this.length;i>e;e++)if(a=this[e],a instanceof SVGElement){var f=s(a).attr("class");return f?-1===f.indexOf(t)?!1:!0:!1}return r}}(jQuery);
