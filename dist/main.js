(()=>{"use strict";const t=2.3283064365386963e-10;class e{constructor(){this._seed=0,this._s0=0,this._s1=0,this._s2=0,this._c=0}getSeed(){return this._seed}setSeed(e){return e=e<1?1/e:e,this._seed=e,this._s0=(e>>>0)*t,e=69069*e+1>>>0,this._s1=e*t,e=69069*e+1>>>0,this._s2=e*t,this._c=1,this}getUniform(){let e=2091639*this._s0+this._c*t;return this._s0=this._s1,this._s1=this._s2,this._c=0|e,this._s2=e-this._c,this._s2}getUniformInt(t,e){let i=Math.max(t,e),s=Math.min(t,e);return Math.floor(this.getUniform()*(i-s+1))+s}getNormal(t=0,e=1){let i,s,o;do{i=2*this.getUniform()-1,s=2*this.getUniform()-1,o=i*i+s*s}while(o>1||0==o);return t+i*Math.sqrt(-2*Math.log(o)/o)*e}getPercentage(){return 1+Math.floor(100*this.getUniform())}getItem(t){return t.length?t[Math.floor(this.getUniform()*t.length)]:null}shuffle(t){let e=[],i=t.slice();for(;i.length;){let t=i.indexOf(this.getItem(i));e.push(i.splice(t,1)[0])}return e}getWeightedValue(t){let e=0;for(let i in t)e+=t[i];let i,s=this.getUniform()*e,o=0;for(i in t)if(o+=t[i],s<o)return i;return i}getState(){return[this._s0,this._s1,this._s2,this._c]}setState(t){return this._s0=t[0],this._s1=t[1],this._s2=t[2],this._c=t[3],this}clone(){return(new e).setState(this.getState())}}(new e).setSeed(Date.now());class i{getContainer(){return null}setOptions(t){this._options=t}}class s extends i{constructor(){super(),this._ctx=document.createElement("canvas").getContext("2d")}schedule(t){requestAnimationFrame(t)}getContainer(){return this._ctx.canvas}setOptions(t){super.setOptions(t);const e=`${t.fontStyle?`${t.fontStyle} `:""} ${t.fontSize}px ${t.fontFamily}`;this._ctx.font=e,this._updateSize(),this._ctx.font=e,this._ctx.textAlign="center",this._ctx.textBaseline="middle"}clear(){this._ctx.fillStyle=this._options.bg,this._ctx.fillRect(0,0,this._ctx.canvas.width,this._ctx.canvas.height)}eventToPosition(t,e){let i=this._ctx.canvas,s=i.getBoundingClientRect();return t-=s.left,e-=s.top,t*=i.width/s.width,e*=i.height/s.height,t<0||e<0||t>=i.width||e>=i.height?[-1,-1]:this._normalizedEventToPosition(t,e)}}class o extends s{constructor(){super(),this._spacingX=0,this._spacingY=0,this._hexSize=0}draw(t,e){let[i,s,o,n,r]=t,a=[(i+1)*this._spacingX,s*this._spacingY+this._hexSize];if(this._options.transpose&&a.reverse(),e&&(this._ctx.fillStyle=r,this._fill(a[0],a[1])),!o)return;this._ctx.fillStyle=n;let l=[].concat(o);for(let t=0;t<l.length;t++)this._ctx.fillText(l[t],a[0],Math.ceil(a[1]))}computeSize(t,e){return this._options.transpose&&(t+=e,t-=e=t-e),[Math.floor(t/this._spacingX)-1,Math.floor((e-2*this._hexSize)/this._spacingY+1)]}computeFontSize(t,e){this._options.transpose&&(t+=e,t-=e=t-e);let i=2*t/((this._options.width+1)*Math.sqrt(3))-1,s=e/(2+1.5*(this._options.height-1)),o=Math.min(i,s),n=this._ctx.font;this._ctx.font="100px "+this._options.fontFamily;let r=Math.ceil(this._ctx.measureText("W").width);this._ctx.font=n;let a=r/100;o=Math.floor(o)+1;let l=2*o/(this._options.spacing*(1+a/Math.sqrt(3)));return Math.ceil(l)-1}_normalizedEventToPosition(t,e){let i;this._options.transpose?(t+=e,t-=e=t-e,i=this._ctx.canvas.width):i=this._ctx.canvas.height;let s=i/this._options.height;return function(t,e){return(t%e+e)%e}(e=Math.floor(e/s),2)?(t-=this._spacingX,t=1+2*Math.floor(t/(2*this._spacingX))):t=2*Math.floor(t/(2*this._spacingX)),[t,e]}_fill(t,e){let i=this._hexSize,s=this._options.border;const o=this._ctx;o.beginPath(),this._options.transpose?(o.moveTo(t-i+s,e),o.lineTo(t-i/2+s,e+this._spacingX-s),o.lineTo(t+i/2-s,e+this._spacingX-s),o.lineTo(t+i-s,e),o.lineTo(t+i/2-s,e-this._spacingX+s),o.lineTo(t-i/2+s,e-this._spacingX+s),o.lineTo(t-i+s,e)):(o.moveTo(t,e-i+s),o.lineTo(t+this._spacingX-s,e-i/2+s),o.lineTo(t+this._spacingX-s,e+i/2-s),o.lineTo(t,e+i-s),o.lineTo(t-this._spacingX+s,e+i/2-s),o.lineTo(t-this._spacingX+s,e-i/2+s),o.lineTo(t,e-i+s)),o.fill()}_updateSize(){const t=this._options,e=Math.ceil(this._ctx.measureText("W").width);let i,s;this._hexSize=Math.floor(t.spacing*(t.fontSize+e/Math.sqrt(3))/2),this._spacingX=this._hexSize*Math.sqrt(3)/2,this._spacingY=1.5*this._hexSize,t.transpose?(i="height",s="width"):(i="width",s="height"),this._ctx.canvas[i]=Math.ceil((t.width+1)*this._spacingX),this._ctx.canvas[s]=Math.ceil((t.height-1)*this._spacingY+2*this._hexSize)}}const n=(()=>{class t extends s{constructor(){super(),this._spacingX=0,this._spacingY=0,this._canvasCache={}}setOptions(t){super.setOptions(t),this._canvasCache={}}draw(e,i){t.cache?this._drawWithCache(e):this._drawNoCache(e,i)}_drawWithCache(t){let e,[i,s,o,n,r]=t,a=""+o+n+r;if(a in this._canvasCache)e=this._canvasCache[a];else{let t=this._options.border;e=document.createElement("canvas");let i=e.getContext("2d");if(e.width=this._spacingX,e.height=this._spacingY,i.fillStyle=r,i.fillRect(t,t,e.width-t,e.height-t),o){i.fillStyle=n,i.font=this._ctx.font,i.textAlign="center",i.textBaseline="middle";let t=[].concat(o);for(let e=0;e<t.length;e++)i.fillText(t[e],this._spacingX/2,Math.ceil(this._spacingY/2))}this._canvasCache[a]=e}this._ctx.drawImage(e,i*this._spacingX,s*this._spacingY)}_drawNoCache(t,e){let[i,s,o,n,r]=t;if(e){let t=this._options.border;this._ctx.fillStyle=r,this._ctx.fillRect(i*this._spacingX+t,s*this._spacingY+t,this._spacingX-t,this._spacingY-t)}if(!o)return;this._ctx.fillStyle=n;let a=[].concat(o);for(let t=0;t<a.length;t++)this._ctx.fillText(a[t],(i+.5)*this._spacingX,Math.ceil((s+.5)*this._spacingY))}computeSize(t,e){return[Math.floor(t/this._spacingX),Math.floor(e/this._spacingY)]}computeFontSize(t,e){let i=Math.floor(t/this._options.width),s=Math.floor(e/this._options.height),o=this._ctx.font;this._ctx.font="100px "+this._options.fontFamily;let n=Math.ceil(this._ctx.measureText("W").width);this._ctx.font=o;let r=n/100*s/i;return r>1&&(s=Math.floor(s/r)),Math.floor(s/this._options.spacing)}_normalizedEventToPosition(t,e){return[Math.floor(t/this._spacingX),Math.floor(e/this._spacingY)]}_updateSize(){const t=this._options,e=Math.ceil(this._ctx.measureText("W").width);this._spacingX=Math.ceil(t.spacing*e),this._spacingY=Math.ceil(t.spacing*t.fontSize),t.forceSquareRatio&&(this._spacingX=this._spacingY=Math.max(this._spacingX,this._spacingY)),this._ctx.canvas.width=t.width*this._spacingX,this._ctx.canvas.height=t.height*this._spacingY}}return t.cache=!1,t})();class r extends s{constructor(){super(),this._colorCanvas=document.createElement("canvas")}draw(t,e){let[i,s,o,n,r]=t,a=this._options.tileWidth,l=this._options.tileHeight;if(e&&(this._options.tileColorize?this._ctx.clearRect(i*a,s*l,a,l):(this._ctx.fillStyle=r,this._ctx.fillRect(i*a,s*l,a,l))),!o)return;let h=[].concat(o),c=[].concat(n),_=[].concat(r);for(let t=0;t<h.length;t++){let e=this._options.tileMap[h[t]];if(!e)throw new Error(`Char "${h[t]}" not found in tileMap`);if(this._options.tileColorize){let o=this._colorCanvas,n=o.getContext("2d");n.globalCompositeOperation="source-over",n.clearRect(0,0,a,l);let r=c[t],h=_[t];n.drawImage(this._options.tileSet,e[0],e[1],a,l,0,0,a,l),"transparent"!=r&&(n.fillStyle=r,n.globalCompositeOperation="source-atop",n.fillRect(0,0,a,l)),"transparent"!=h&&(n.fillStyle=h,n.globalCompositeOperation="destination-over",n.fillRect(0,0,a,l)),this._ctx.drawImage(o,i*a,s*l,a,l)}else this._ctx.drawImage(this._options.tileSet,e[0],e[1],a,l,i*a,s*l,a,l)}}computeSize(t,e){return[Math.floor(t/this._options.tileWidth),Math.floor(e/this._options.tileHeight)]}computeFontSize(){throw new Error("Tile backend does not understand font size")}_normalizedEventToPosition(t,e){return[Math.floor(t/this._options.tileWidth),Math.floor(e/this._options.tileHeight)]}_updateSize(){const t=this._options;this._ctx.canvas.width=t.width*t.tileWidth,this._ctx.canvas.height=t.height*t.tileHeight,this._colorCanvas.width=t.tileWidth,this._colorCanvas.height=t.tileHeight}}function a(t){let e,i;if(t in l)e=l[t];else{if("#"==t.charAt(0)){let i=(t.match(/[0-9a-f]/gi)||[]).map((t=>parseInt(t,16)));if(3==i.length)e=i.map((t=>17*t));else{for(let t=0;t<3;t++)i[t+1]+=16*i[t],i.splice(t,1);e=i}}else e=(i=t.match(/rgb\(([0-9, ]+)\)/i))?i[1].split(/\s*,\s*/).map((t=>parseInt(t))):[0,0,0];l[t]=e}return e.slice()}const l={black:[0,0,0],navy:[0,0,128],darkblue:[0,0,139],mediumblue:[0,0,205],blue:[0,0,255],darkgreen:[0,100,0],green:[0,128,0],teal:[0,128,128],darkcyan:[0,139,139],deepskyblue:[0,191,255],darkturquoise:[0,206,209],mediumspringgreen:[0,250,154],lime:[0,255,0],springgreen:[0,255,127],aqua:[0,255,255],cyan:[0,255,255],midnightblue:[25,25,112],dodgerblue:[30,144,255],forestgreen:[34,139,34],seagreen:[46,139,87],darkslategray:[47,79,79],darkslategrey:[47,79,79],limegreen:[50,205,50],mediumseagreen:[60,179,113],turquoise:[64,224,208],royalblue:[65,105,225],steelblue:[70,130,180],darkslateblue:[72,61,139],mediumturquoise:[72,209,204],indigo:[75,0,130],darkolivegreen:[85,107,47],cadetblue:[95,158,160],cornflowerblue:[100,149,237],mediumaquamarine:[102,205,170],dimgray:[105,105,105],dimgrey:[105,105,105],slateblue:[106,90,205],olivedrab:[107,142,35],slategray:[112,128,144],slategrey:[112,128,144],lightslategray:[119,136,153],lightslategrey:[119,136,153],mediumslateblue:[123,104,238],lawngreen:[124,252,0],chartreuse:[127,255,0],aquamarine:[127,255,212],maroon:[128,0,0],purple:[128,0,128],olive:[128,128,0],gray:[128,128,128],grey:[128,128,128],skyblue:[135,206,235],lightskyblue:[135,206,250],blueviolet:[138,43,226],darkred:[139,0,0],darkmagenta:[139,0,139],saddlebrown:[139,69,19],darkseagreen:[143,188,143],lightgreen:[144,238,144],mediumpurple:[147,112,216],darkviolet:[148,0,211],palegreen:[152,251,152],darkorchid:[153,50,204],yellowgreen:[154,205,50],sienna:[160,82,45],brown:[165,42,42],darkgray:[169,169,169],darkgrey:[169,169,169],lightblue:[173,216,230],greenyellow:[173,255,47],paleturquoise:[175,238,238],lightsteelblue:[176,196,222],powderblue:[176,224,230],firebrick:[178,34,34],darkgoldenrod:[184,134,11],mediumorchid:[186,85,211],rosybrown:[188,143,143],darkkhaki:[189,183,107],silver:[192,192,192],mediumvioletred:[199,21,133],indianred:[205,92,92],peru:[205,133,63],chocolate:[210,105,30],tan:[210,180,140],lightgray:[211,211,211],lightgrey:[211,211,211],palevioletred:[216,112,147],thistle:[216,191,216],orchid:[218,112,214],goldenrod:[218,165,32],crimson:[220,20,60],gainsboro:[220,220,220],plum:[221,160,221],burlywood:[222,184,135],lightcyan:[224,255,255],lavender:[230,230,250],darksalmon:[233,150,122],violet:[238,130,238],palegoldenrod:[238,232,170],lightcoral:[240,128,128],khaki:[240,230,140],aliceblue:[240,248,255],honeydew:[240,255,240],azure:[240,255,255],sandybrown:[244,164,96],wheat:[245,222,179],beige:[245,245,220],whitesmoke:[245,245,245],mintcream:[245,255,250],ghostwhite:[248,248,255],salmon:[250,128,114],antiquewhite:[250,235,215],linen:[250,240,230],lightgoldenrodyellow:[250,250,210],oldlace:[253,245,230],red:[255,0,0],fuchsia:[255,0,255],magenta:[255,0,255],deeppink:[255,20,147],orangered:[255,69,0],tomato:[255,99,71],hotpink:[255,105,180],coral:[255,127,80],darkorange:[255,140,0],lightsalmon:[255,160,122],orange:[255,165,0],lightpink:[255,182,193],pink:[255,192,203],gold:[255,215,0],peachpuff:[255,218,185],navajowhite:[255,222,173],moccasin:[255,228,181],bisque:[255,228,196],mistyrose:[255,228,225],blanchedalmond:[255,235,205],papayawhip:[255,239,213],lavenderblush:[255,240,245],seashell:[255,245,238],cornsilk:[255,248,220],lemonchiffon:[255,250,205],floralwhite:[255,250,240],snow:[255,250,250],yellow:[255,255,0],lightyellow:[255,255,224],ivory:[255,255,240],white:[255,255,255]};class h extends i{constructor(){super(),this._uniforms={};try{this._gl=this._initWebGL()}catch(t){alert(t.message)}}static isSupported(){return!!document.createElement("canvas").getContext("webgl2",{preserveDrawingBuffer:!0})}schedule(t){requestAnimationFrame(t)}getContainer(){return this._gl.canvas}setOptions(t){super.setOptions(t),this._updateSize();let e=this._options.tileSet;e&&"complete"in e&&!e.complete?e.addEventListener("load",(()=>this._updateTexture(e))):this._updateTexture(e)}draw(t,e){const i=this._gl,s=this._options;let[o,n,r,a,l]=t,h=i.canvas.height-(n+1)*s.tileHeight;if(i.scissor(o*s.tileWidth,h,s.tileWidth,s.tileHeight),e&&(s.tileColorize?i.clearColor(0,0,0,0):i.clearColor(...d(l)),i.clear(i.COLOR_BUFFER_BIT)),!r)return;let c=[].concat(r),_=[].concat(l),u=[].concat(a);i.uniform2fv(this._uniforms.targetPosRel,[o,n]);for(let t=0;t<c.length;t++){let e=this._options.tileMap[c[t]];if(!e)throw new Error(`Char "${c[t]}" not found in tileMap`);i.uniform1f(this._uniforms.colorize,s.tileColorize?1:0),i.uniform2fv(this._uniforms.tilesetPosAbs,e),s.tileColorize&&(i.uniform4fv(this._uniforms.tint,d(u[t])),i.uniform4fv(this._uniforms.bg,d(_[t]))),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}clear(){const t=this._gl;t.clearColor(...d(this._options.bg)),t.scissor(0,0,t.canvas.width,t.canvas.height),t.clear(t.COLOR_BUFFER_BIT)}computeSize(t,e){return[Math.floor(t/this._options.tileWidth),Math.floor(e/this._options.tileHeight)]}computeFontSize(){throw new Error("Tile backend does not understand font size")}eventToPosition(t,e){let i=this._gl.canvas,s=i.getBoundingClientRect();return t-=s.left,e-=s.top,t*=i.width/s.width,e*=i.height/s.height,t<0||e<0||t>=i.width||e>=i.height?[-1,-1]:this._normalizedEventToPosition(t,e)}_initWebGL(){let t=document.createElement("canvas").getContext("webgl2",{preserveDrawingBuffer:!0});window.gl=t;let e=function(t,e,i){const s=t.createShader(t.VERTEX_SHADER);if(t.shaderSource(s,e),t.compileShader(s),!t.getShaderParameter(s,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(s)||"");const o=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(o,i),t.compileShader(o),!t.getShaderParameter(o,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(o)||"");const n=t.createProgram();if(t.attachShader(n,s),t.attachShader(n,o),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(n)||"");return n}(t,_,u);return t.useProgram(e),function(t){const e=new Float32Array([0,0,1,0,0,1,1,1]),i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,e,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0)}(t),c.forEach((i=>this._uniforms[i]=t.getUniformLocation(e,i))),this._program=e,t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.SCISSOR_TEST),t}_normalizedEventToPosition(t,e){return[Math.floor(t/this._options.tileWidth),Math.floor(e/this._options.tileHeight)]}_updateSize(){const t=this._gl,e=this._options,i=[e.width*e.tileWidth,e.height*e.tileHeight];t.canvas.width=i[0],t.canvas.height=i[1],t.viewport(0,0,i[0],i[1]),t.uniform2fv(this._uniforms.tileSize,[e.tileWidth,e.tileHeight]),t.uniform2fv(this._uniforms.targetSize,i)}_updateTexture(t){!function(t,e){let i=t.createTexture();t.bindTexture(t.TEXTURE_2D,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e)}(this._gl,t)}}const c=["targetPosRel","tilesetPosAbs","tileSize","targetSize","colorize","bg","tint"],_="\n#version 300 es\n\nin vec2 tilePosRel;\nout vec2 tilesetPosPx;\n\nuniform vec2 tilesetPosAbs;\nuniform vec2 tileSize;\nuniform vec2 targetSize;\nuniform vec2 targetPosRel;\n\nvoid main() {\n\tvec2 targetPosPx = (targetPosRel + tilePosRel) * tileSize;\n\tvec2 targetPosNdc = ((targetPosPx / targetSize)-0.5)*2.0;\n\ttargetPosNdc.y *= -1.0;\n\n\tgl_Position = vec4(targetPosNdc, 0.0, 1.0);\n\ttilesetPosPx = tilesetPosAbs + tilePosRel * tileSize;\n}".trim(),u="\n#version 300 es\nprecision highp float;\n\nin vec2 tilesetPosPx;\nout vec4 fragColor;\nuniform sampler2D image;\nuniform bool colorize;\nuniform vec4 bg;\nuniform vec4 tint;\n\nvoid main() {\n\tfragColor = vec4(0, 0, 0, 1);\n\n\tvec4 texel = texelFetch(image, ivec2(tilesetPosPx), 0);\n\n\tif (colorize) {\n\t\ttexel.rgb = tint.a * tint.rgb + (1.0-tint.a) * texel.rgb;\n\t\tfragColor.rgb = texel.a*texel.rgb + (1.0-texel.a)*bg.rgb;\n\t\tfragColor.a = texel.a + (1.0-texel.a)*bg.a;\n\t} else {\n\t\tfragColor = texel;\n\t}\n}".trim();let g={};function d(t){if(!(t in g)){let e;if("transparent"==t)e=[0,0,0,0];else if(t.indexOf("rgba")>-1){e=(t.match(/[\d.]+/g)||[]).map(Number);for(let t=0;t<3;t++)e[t]=e[t]/255}else e=a(t).map((t=>t/255)),e.push(1);g[t]=e}return g[t]}function p(t){const e=6/256;let i=a(t);return 36*Math.floor(i[0]*e)+6*Math.floor(i[1]*e)+1*Math.floor(i[2]*e)+16}class f extends i{constructor(){super(),this._offset=[0,0],this._cursor=[-1,-1],this._lastColor=""}schedule(t){setTimeout(t,1e3/60)}setOptions(t){super.setOptions(t);let e=[t.width,t.height],i=this.computeSize();this._offset=i.map(((t,i)=>Math.floor((t-e[i])/2)))}clear(){process.stdout.write(`[0;48;5;${p(this._options.bg)}m[2J`)}draw(t,e){let[i,s,o,n,r]=t,a=this._offset[0]+i,l=this._offset[1]+s,h=this.computeSize();if(a<0||a>=h[0])return;if(l<0||l>=h[1])return;if(a===this._cursor[0]&&l===this._cursor[1]||(process.stdout.write(function(t,e){return`[${e+1};${t+1}H`}(a,l)),this._cursor[0]=a,this._cursor[1]=l),e&&(o||(o=" ")),!o)return;let c=function(t,e){return`[0;38;5;${p(t)};48;5;${p(e)}m`}(n,r);if(c!==this._lastColor&&(process.stdout.write(c),this._lastColor=c),"\t"!=o){let t=[].concat(o);process.stdout.write(t[0])}this._cursor[0]++,this._cursor[0]>=h[0]&&(this._cursor[0]=0,this._cursor[1]++)}computeFontSize(){throw new Error("Terminal backend has no notion of font size")}eventToPosition(t,e){return[t,e]}computeSize(){return[process.stdout.columns,process.stdout.rows]}}const m=/%([bc]){([^}]*)}/g;function v(t,e,i,s){let o={type:0,value:t[e].value.substring(i+(s?1:0))};return t.splice(e+1,0,{type:1},o),t[e].value.substring(0,i)}const w={hex:o,rect:n,tile:r,"tile-gl":h,term:f},x={width:80,height:25,transpose:!1,layout:"rect",fontSize:15,spacing:1,border:0,forceSquareRatio:!1,fontFamily:"monospace",fontStyle:"",fg:"#ccc",bg:"#000",tileWidth:32,tileHeight:32,tileMap:{},tileSet:null,tileColorize:!1},b=(()=>{class t{constructor(t={}){this._data={},this._dirty=!1,this._options={},t=Object.assign({},x,t),this.setOptions(t),this.DEBUG=this.DEBUG.bind(this),this._tick=this._tick.bind(this),this._backend.schedule(this._tick)}DEBUG(t,e,i){let s=[this._options.bg,this._options.fg];this.draw(t,e,null,null,s[i%s.length])}clear(){this._data={},this._dirty=!0}setOptions(t){if(Object.assign(this._options,t),t.width||t.height||t.fontSize||t.fontFamily||t.spacing||t.layout){if(t.layout){let e=w[t.layout];this._backend=new e}this._backend.setOptions(this._options),this._dirty=!0}return this}getOptions(){return this._options}getContainer(){return this._backend.getContainer()}computeSize(t,e){return this._backend.computeSize(t,e)}computeFontSize(t,e){return this._backend.computeFontSize(t,e)}computeTileSize(t,e){return[Math.floor(t/this._options.width),Math.floor(e/this._options.height)]}eventToPosition(t){let e,i;return"touches"in t?(e=t.touches[0].clientX,i=t.touches[0].clientY):(e=t.clientX,i=t.clientY),this._backend.eventToPosition(e,i)}draw(t,e,i,s,o){s||(s=this._options.fg),o||(o=this._options.bg);let n=`${t},${e}`;this._data[n]=[t,e,i,s,o],!0!==this._dirty&&(this._dirty||(this._dirty={}),this._dirty[n]=!0)}drawText(t,e,i,s){let o=null,n=null,r=t,a=e,l=1;s||(s=this._options.width-t);let h=function(t,e){let i=[],s=0;t.replace(m,(function(e,o,n,r){let a=t.substring(s,r);return a.length&&i.push({type:0,value:a}),i.push({type:"c"==o?2:3,value:n.trim()}),s=r+e.length,""}));let o=t.substring(s);return o.length&&i.push({type:0,value:o}),function(t,e){e||(e=1/0);let i=0,s=0,o=-1;for(;i<t.length;){let n=t[i];if(1==n.type&&(s=0,o=-1),0!=n.type){i++;continue}for(;0==s&&" "==n.value.charAt(0);)n.value=n.value.substring(1);let r=n.value.indexOf("\n");if(-1!=r){n.value=v(t,i,r,!0);let e=n.value.split("");for(;e.length&&" "==e[e.length-1];)e.pop();n.value=e.join("")}if(n.value.length){if(s+n.value.length>e){let r=-1;for(;;){let t=n.value.indexOf(" ",r+1);if(-1==t)break;if(s+t>e)break;r=t}if(-1!=r)n.value=v(t,i,r,!0);else if(-1!=o){let e=t[o],s=e.value.lastIndexOf(" ");e.value=v(t,o,s,!0),i=o}else n.value=v(t,i,e-s,!1)}else s+=n.value.length,-1!=n.value.indexOf(" ")&&(o=i);i++}else t.splice(i,1)}t.push({type:1});let n=null;for(let e=0;e<t.length;e++){let i=t[e];switch(i.type){case 0:n=i;break;case 1:if(n){let t=n.value.split("");for(;t.length&&" "==t[t.length-1];)t.pop();n.value=t.join("")}n=null}}return t.pop(),t}(i,e)}(i,s);for(;h.length;){let e=h.shift();switch(e.type){case 0:let i=!1,s=!1,h=!1,c=!1;for(let t=0;t<e.value.length;t++){let l=e.value.charCodeAt(t),_=e.value.charAt(t);if("term"===this._options.layout){let t=l>>8;if(17===t||t>=46&&t<=159||t>=172&&t<=215||l>=43360&&l<=43391){this.draw(r+0,a,_,o,n),this.draw(r+1,a,"\t",o,n),r+=2;continue}}h=l>65280&&l<65377||l>65500&&l<65512||l>65518,i=32==_.charCodeAt(0)||12288==_.charCodeAt(0),!c||h||i||r++,h&&!s&&r++,this.draw(r++,a,_,o,n),s=i,c=h}break;case 2:o=e.value||null;break;case 3:n=e.value||null;break;case 1:r=t,a++,l++}}return l}_tick(){if(this._backend.schedule(this._tick),this._dirty){if(!0===this._dirty){this._backend.clear();for(let t in this._data)this._draw(t,!1)}else for(let t in this._dirty)this._draw(t,!0);this._dirty=!1}}_draw(t,e){let i=this._data[t];i[4]!=this._options.bg&&(e=!0),this._backend.draw(i,e)}}return t.Rect=n,t.Hex=o,t.Tile=r,t.TileGL=h,t.Term=f,t})();Math.sqrt(3),Math.sqrt(3),(new class{constructor(){this.display=new b,document.body.appendChild(this.display.getContainer())}start(){this.display.draw(10,10,"@")}}).start()})();