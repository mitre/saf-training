exports.debounce=function(e,r,n){var i,o,t;void 0===r&&(r=50),void 0===n&&(n={});var a=null!=(i=n.isImmediate)&&i,u=null!=(o=n.callback)&&o,c=n.maxWait,v=Date.now(),l=[];function f(){if(void 0!==c){var e=Date.now()-v;if(e+r>=c)return c-e}return r}var d=function(){var r=[].slice.call(arguments),n=this;return new Promise(function(i,o){var c=a&&void 0===t;if(void 0!==t&&clearTimeout(t),t=setTimeout(function(){if(t=void 0,v=Date.now(),!a){var i=e.apply(n,r);u&&u(i),l.forEach(function(e){return(0,e.resolve)(i)}),l=[]}},f()),c){var d=e.apply(n,r);return u&&u(d),i(d)}l.push({resolve:i,reject:o})})};return d.cancel=function(e){void 0!==t&&clearTimeout(t),l.forEach(function(r){return(0,r.reject)(e)}),l=[]},d};
//# sourceMappingURL=index.js.map
