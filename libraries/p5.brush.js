!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).brush =
          {})
      );
})(this, function (t) {
  "use strict";
  function e(t, e) {
    let s = new i(t),
      n = () => s.next();
    return (
      (n.double = () => n() + 11102230246251565e-32 * ((2097152 * n()) | 0)),
      (n.int32 = () => (4294967296 * s.next()) | 0),
      (n.quick = n),
      (function (t, e, i) {
        let s = i && i.state;
        s &&
          ("object" == typeof s && e.copy(s, e),
          (t.state = () => e.copy(e, {})));
      })(n, s, e),
      n
    );
  }
  class i {
    constructor(t) {
      null == t && (t = +new Date());
      let e = 4022871197;
      function i(t) {
        t = String(t);
        for (let i = 0; i < t.length; i++) {
          e += t.charCodeAt(i);
          let s = 0.02519603282416938 * e;
          (e = s >>> 0),
            (s -= e),
            (s *= e),
            (e = s >>> 0),
            (s -= e),
            (e += 4294967296 * s);
        }
        return 2.3283064365386963e-10 * (e >>> 0);
      }
      (this.c = 1),
        (this.s0 = i(" ")),
        (this.s1 = i(" ")),
        (this.s2 = i(" ")),
        (this.s0 -= i(t)),
        this.s0 < 0 && (this.s0 += 1),
        (this.s1 -= i(t)),
        this.s1 < 0 && (this.s1 += 1),
        (this.s2 -= i(t)),
        this.s2 < 0 && (this.s2 += 1);
    }
    next() {
      let { c: t, s0: e, s1: i, s2: s } = this,
        n = 2091639 * e + 2.3283064365386963e-10 * t;
      return (this.s0 = i), (this.s1 = s), (this.s2 = n - (this.c = 0 | n));
    }
    copy(t, e) {
      return (e.c = t.c), (e.s0 = t.s0), (e.s1 = t.s1), (e.s2 = t.s2), e;
    }
  }
  let s,
    n = !1,
    r = !1,
    o = !1;
  function a(t = !1) {
    let e = !(!r || !t) && o;
    n && h(!1),
      !t && r && (t = o),
      (s = t || window.self),
      n || ((n = !0), _.create(), A(s.width / 250)),
      x.load(e);
  }
  function h(t = !0) {
    n &&
      (x.masks[0].remove(),
      (x.masks[0] = null),
      x.masks[1].remove(),
      (x.masks[1] = null),
      x.masks[2].remove(),
      (x.masks[2] = null),
      t && brush.load());
  }
  function l() {
    n || a();
  }
  let c = new e(Math.random());
  const m = {
    random(t = 0, e = 1) {
      return 1 === arguments.length
        ? this.map(c(), 0, 1, 0, t)
        : this.map(c(), 0, 1, t, e);
    },
    randInt(t, e) {
      return Math.floor(this.random(t, e));
    },
    gaussian(t = 0, e = 1) {
      const i = 1 - m.random(),
        s = m.random();
      return Math.sqrt(-2 * Math.log(i)) * Math.cos(2 * Math.PI * s) * e + t;
    },
    weightedRand(t) {
      let e,
        i,
        s = [];
      for (e in t) for (i = 0; i < 10 * t[e]; i++) s.push(e);
      return s[Math.floor(c() * s.length)];
    },
    map(t, e, i, s, n, r = !1) {
      let o = s + ((t - e) / (i - e)) * (n - s);
      return r
        ? s < n
          ? this.constrain(o, s, n)
          : this.constrain(o, n, s)
        : o;
    },
    constrain: (t, e, i) => Math.max(Math.min(t, i), e),
    cos(t) {
      return this.c[Math.floor((((t % 360) + 360) % 360) * 4)];
    },
    sin(t) {
      return this.s[Math.floor((((t % 360) + 360) % 360) * 4)];
    },
    isPrecalculationDone: !1,
    preCalculation() {
      if (this.isPrecalculationDone) return;
      const t = 1440,
        e = (2 * Math.PI) / t;
      (this.c = new Float64Array(t)), (this.s = new Float64Array(t));
      for (let i = 0; i < t; i++) {
        const t = i * e;
        (m.c[i] = Math.cos(t)), (m.s[i] = Math.sin(t));
      }
      this.isPrecalculationDone = !0;
    },
    isNumber: (t) => !isNaN(t),
    toDegrees: (t) =>
      ((("radians" === s.angleMode() ? (180 * t) / Math.PI : t) % 360) + 360) %
      360,
    dist: (t, e, i, s) => Math.hypot(i - t, s - e),
  };
  function d(t, e, i, s, n = !1) {
    let r = t.x,
      o = t.y,
      a = e.x,
      h = e.y,
      l = i.x,
      c = i.y,
      m = s.x,
      d = s.y;
    if ((r === a && o === h) || (l === m && c === d)) return !1;
    let u = a - r,
      p = h - o,
      f = m - l,
      v = d - c,
      g = v * u - f * p;
    if (0 === g) return !1;
    let x = (f * (o - c) - v * (r - l)) / g,
      y = (u * (o - c) - p * (r - l)) / g;
    return !(!n && (y < 0 || y > 1)) && { x: r + x * u, y: o + x * p };
  }
  function u(t, e, i, s) {
    return (
      (((Math.atan2(-(s - e), i - t) * (180 / Math.PI)) % 360) + 360) % 360
    );
  }
  m.preCalculation();
  const p = { field: {}, stroke: {}, hatch: {}, fill: {}, others: {} };
  const f = {
    translation: [0, 0],
    rotation: 0,
    trans() {
      return (
        (this.translation = [
          s._renderer.uMVMatrix.mat4[12],
          s._renderer.uMVMatrix.mat4[13],
        ]),
        this.translation
      );
    },
  };
  let v = 1;
  function g(t) {
    v *= t;
  }
  const x = {
    loaded: !1,
    isBlending: !1,
    isCaching: !0,
    currentColor: new Float32Array(3),
    load(t) {
      (this.type = r && !t ? 0 : t ? 2 : 1), (this.masks = []);
      for (let e = 0; e < 3; e++)
        switch (this.type) {
          case 0:
            this.masks[e] = s.createGraphics(
              s.width,
              s.height,
              1 == e ? s.WEBGL : s.P2D
            );
            break;
          case 1:
            this.masks[e] = createGraphics(
              s.width,
              s.height,
              1 == e ? WEBGL : P2D
            );
            break;
          case 2:
            this.masks[e] = t.createGraphics(
              t.width,
              t.height,
              1 == e ? t.WEBGL : t.P2D
            );
        }
      for (let t of this.masks)
        t.pixelDensity(s.pixelDensity()),
          t.clear(),
          t.angleMode(s.DEGREES),
          t.noSmooth();
      (this.shader = s.createShader(this.vert, this.frag)), (x.loaded = !0);
    },
    getPigment(t) {
      let e = t.levels,
        i = new Float32Array(3);
      return (i[0] = e[0] / 255), (i[1] = e[1] / 255), (i[2] = e[2] / 255), i;
    },
    color1: new Float32Array(3),
    color2: new Float32Array(3),
    blending1: !1,
    blending2: !1,
    blend(t = !1, e = !1, i = !1) {
      if (
        ((this.isBlending = i ? this.blending1 : this.blending2),
        (this.currentColor = i ? this.color1 : this.color2),
        !this.isBlending)
      )
        if (t)
          (this.currentColor = this.getPigment(t)),
            i
              ? ((this.blending1 = !0), (this.color1 = this.currentColor))
              : ((this.blending2 = !0), (this.color2 = this.currentColor));
        else if (e) return void (i || y());
      if (
        (t ? this.getPigment(t) : this.currentColor).toString() !==
          this.currentColor.toString() ||
        e ||
        !this.isCaching
      ) {
        if ((y(), this.isBlending)) {
          s.push(),
            s.translate(-f.trans()[0], -f.trans()[1]),
            s.shader(this.shader),
            this.shader.setUniform("addColor", this.currentColor),
            this.shader.setUniform("source", s._renderer),
            this.shader.setUniform("active", x.watercolor),
            this.shader.setUniform("random", [
              m.random(),
              m.random(),
              m.random(),
            ]);
          let t = i ? this.masks[1] : this.masks[0];
          this.shader.setUniform("mask", t),
            s.fill(0, 0, 0, 0),
            s.noStroke(),
            s.rect(-s.width / 2, -s.height / 2, s.width, s.height),
            s.pop(),
            t.clear();
        }
        e ||
          ((this.currentColor = this.getPigment(t)),
          i
            ? (this.color1 = this.currentColor)
            : (this.color2 = this.currentColor));
      }
      e &&
        ((this.isBlending = !1),
        i
          ? (this.blending1 = this.isBlending)
          : (this.blending2 = this.isBlending));
    },
    vert: "precision highp float;attribute vec3 aPosition;attribute vec2 aTexCoord;uniform mat4 uModelViewMatrix,uProjectionMatrix;varying vec2 vVertTexCoord;void main(){gl_Position=uProjectionMatrix*uModelViewMatrix*vec4(aPosition,1);vVertTexCoord=aTexCoord;}",
    frag: "precision highp float;varying vec2 vVertTexCoord;uniform sampler2D source,mask;uniform vec4 addColor;uniform vec3 random;uniform bool active;\n        #ifndef SPECTRAL\n        #define SPECTRAL\n        float x(float v){return v<.04045?v/12.92:pow((v+.055)/1.055,2.4);}float v(float v){return v<.0031308?v*12.92:1.055*pow(v,1./2.4)-.055;}vec3 m(vec3 v){return vec3(x(v[0]),x(v[1]),x(v[2]));}vec3 f(vec3 f){return clamp(vec3(v(f[0]),v(f[1]),v(f[2])),0.,1.);}void f(vec3 v,out float m,out float f,out float x,out float y,out float z,out float i,out float r){m=min(v.x,min(v.y,v.z));v-=m;f=min(v.y,v.z);x=min(v.x,v.z);y=min(v.x,v.y);z=min(max(0.,v.x-v.z),max(0.,v.x-v.y));i=min(max(0.,v.y-v.z),max(0.,v.y-v.x));r=min(max(0.,v.z-v.y),max(0.,v.z-v.x));}void f(vec3 v,inout float i[38]){float x,y,d,z,o,m,e;f(v,x,y,d,z,o,m,e);i[0]=max(1e-4,x+y*.96853629+d*.51567122+z*.02055257+o*.03147571+m*.49108579+e*.97901834);i[1]=max(1e-4,x+y*.96855103+d*.5401552+z*.02059936+o*.03146636+m*.46944057+e*.97901649);i[2]=max(1e-4,x+y*.96859338+d*.62645502+z*.02062723+o*.03140624+m*.4016578+e*.97901118);i[3]=max(1e-4,x+y*.96877345+d*.75595012+z*.02073387+o*.03119611+m*.2449042+e*.97892146);i[4]=max(1e-4,x+y*.96942204+d*.92826996+z*.02114202+o*.03053888+m*.0682688+e*.97858555);i[5]=max(1e-4,x+y*.97143709+d*.97223624+z*.02233154+o*.02856855+m*.02732883+e*.97743705);i[6]=max(1e-4,x+y*.97541862+d*.98616174+z*.02556857+o*.02459485+m*.013606+e*.97428075);i[7]=max(1e-4,x+y*.98074186+d*.98955255+z*.03330189+o*.0192952+m*.01000187+e*.96663223);i[8]=max(1e-4,x+y*.98580992+d*.98676237+z*.05185294+o*.01423112+m*.01284127+e*.94822893);i[9]=max(1e-4,x+y*.98971194+d*.97312575+z*.10087639+o*.01033111+m*.02636635+e*.89937713);i[10]=max(1e-4,x+y*.99238027+d*.91944277+z*.24000413+o*.00765876+m*.07058713+e*.76070164);i[11]=max(1e-4,x+y*.99409844+d*.32564851+z*.53589066+o*.00593693+m*.70421692+e*.4642044);i[12]=max(1e-4,x+y*.995172+d*.13820628+z*.79874659+o*.00485616+m*.85473994+e*.20123039);i[13]=max(1e-4,x+y*.99576545+d*.05015143+z*.91186529+o*.00426186+m*.95081565+e*.08808402);i[14]=max(1e-4,x+y*.99593552+d*.02912336+z*.95399623+o*.00409039+m*.9717037+e*.04592894);i[15]=max(1e-4,x+y*.99564041+d*.02421691+z*.97137099+o*.00438375+m*.97651888+e*.02860373);i[16]=max(1e-4,x+y*.99464769+d*.02660696+z*.97939505+o*.00537525+m*.97429245+e*.02060067);i[17]=max(1e-4,x+y*.99229579+d*.03407586+z*.98345207+o*.00772962+m*.97012917+e*.01656701);i[18]=max(1e-4,x+y*.98638762+d*.04835936+z*.98553736+o*.0136612+m*.9425863+e*.01451549);i[19]=max(1e-4,x+y*.96829712+d*.0001172+z*.98648905+o*.03181352+m*.99989207+e*.01357964);i[20]=max(1e-4,x+y*.89228016+d*8.554e-5+z*.98674535+o*.10791525+m*.99989891+e*.01331243);i[21]=max(1e-4,x+y*.53740239+d*.85267882+z*.98657555+o*.46249516+m*.13823139+e*.01347661);i[22]=max(1e-4,x+y*.15360445+d*.93188793+z*.98611877+o*.84604333+m*.06968113+e*.01387181);i[23]=max(1e-4,x+y*.05705719+d*.94810268+z*.98559942+o*.94275572+m*.05628787+e*.01435472);i[24]=max(1e-4,x+y*.03126539+d*.94200977+z*.98507063+o*.96860996+m*.06111561+e*.01479836);i[25]=max(1e-4,x+y*.02205445+d*.91478045+z*.98460039+o*.97783966+m*.08987709+e*.0151525);i[26]=max(1e-4,x+y*.01802271+d*.87065445+z*.98425301+o*.98187757+m*.13656016+e*.01540513);i[27]=max(1e-4,x+y*.0161346+d*.78827548+z*.98403909+o*.98377315+m*.22169624+e*.01557233);i[28]=max(1e-4,x+y*.01520947+d*.65738359+z*.98388535+o*.98470202+m*.32176956+e*.0156571);i[29]=max(1e-4,x+y*.01475977+d*.59909403+z*.98376116+o*.98515481+m*.36157329+e*.01571025);i[30]=max(1e-4,x+y*.01454263+d*.56817268+z*.98368246+o*.98537114+m*.4836192+e*.01571916);i[31]=max(1e-4,x+y*.01444459+d*.54031997+z*.98365023+o*.98546685+m*.46488579+e*.01572133);i[32]=max(1e-4,x+y*.01439897+d*.52110241+z*.98361309+o*.98550011+m*.47440306+e*.01572502);i[33]=max(1e-4,x+y*.0143762+d*.51041094+z*.98357259+o*.98551031+m*.4857699+e*.01571717);i[34]=max(1e-4,x+y*.01436343+d*.50526577+z*.98353856+o*.98550741+m*.49267971+e*.01571905);i[35]=max(1e-4,x+y*.01435687+d*.5025508+z*.98351247+o*.98551323+m*.49625685+e*.01571059);i[36]=max(1e-4,x+y*.0143537+d*.50126452+z*.98350101+o*.98551563+m*.49807754+e*.01569728);i[37]=max(1e-4,x+y*.01435408+d*.50083021+z*.98350852+o*.98551547+m*.49889859+e*.0157002);}vec3 t(vec3 x){mat3 i;i[0]=vec3(3.24306333,-1.53837619,-.49893282);i[1]=vec3(-.96896309,1.87542451,.04154303);i[2]=vec3(.05568392,-.20417438,1.05799454);float v=dot(i[0],x),y=dot(i[1],x),o=dot(i[2],x);return f(vec3(v,y,o));}vec3 d(float m[38]){vec3 i=vec3(0);i+=m[0]*vec3(6.469e-5,1.84e-6,.00030502);i+=m[1]*vec3(.00021941,6.21e-6,.00103681);i+=m[2]*vec3(.00112057,3.101e-5,.00531314);i+=m[3]*vec3(.00376661,.00010475,.01795439);i+=m[4]*vec3(.01188055,.00035364,.05707758);i+=m[5]*vec3(.02328644,.00095147,.11365162);i+=m[6]*vec3(.03455942,.00228226,.17335873);i+=m[7]*vec3(.03722379,.00420733,.19620658);i+=m[8]*vec3(.03241838,.0066888,.18608237);i+=m[9]*vec3(.02123321,.0098884,.13995048);i+=m[10]*vec3(.01049099,.01524945,.08917453);i+=m[11]*vec3(.00329584,.02141831,.04789621);i+=m[12]*vec3(.00050704,.03342293,.02814563);i+=m[13]*vec3(.00094867,.05131001,.01613766);i+=m[14]*vec3(.00627372,.07040208,.0077591);i+=m[15]*vec3(.01686462,.08783871,.00429615);i+=m[16]*vec3(.02868965,.09424905,.00200551);i+=m[17]*vec3(.04267481,.09795667,.00086147);i+=m[18]*vec3(.05625475,.09415219,.00036904);i+=m[19]*vec3(.0694704,.08678102,.00019143);i+=m[20]*vec3(.08305315,.07885653,.00014956);i+=m[21]*vec3(.0861261,.0635267,9.231e-5);i+=m[22]*vec3(.09046614,.05374142,6.813e-5);i+=m[23]*vec3(.08500387,.04264606,2.883e-5);i+=m[24]*vec3(.07090667,.03161735,1.577e-5);i+=m[25]*vec3(.05062889,.02088521,3.94e-6);i+=m[26]*vec3(.03547396,.01386011,1.58e-6);i+=m[27]*vec3(.02146821,.00810264,0);i+=m[28]*vec3(.01251646,.0046301,0);i+=m[29]*vec3(.00680458,.00249138,0);i+=m[30]*vec3(.00346457,.0012593,0);i+=m[31]*vec3(.00149761,.00054165,0);i+=m[32]*vec3(.0007697,.00027795,0);i+=m[33]*vec3(.00040737,.00014711,0);i+=m[34]*vec3(.00016901,6.103e-5,0);i+=m[35]*vec3(9.522e-5,3.439e-5,0);i+=m[36]*vec3(4.903e-5,1.771e-5,0);i+=m[37]*vec3(2e-5,7.22e-6,0);return i;}float d(float y,float m,float v){float z=m*pow(v,2.);return z/(y*pow(1.-v,2.)+z);}vec3 f(vec3 v,vec3 y,float z){vec3 x=m(v),o=m(y);float i[38],a[38];f(x,i);f(o,a);float r=d(i)[1],e=d(a)[1];z=d(r,e,z);float s[38];for(int u=0;u<38;u++){float p=(1.-z)*(pow(1.-i[u],2.)/(2.*i[u]))+z*(pow(1.-a[u],2.)/(2.*a[u]));s[u]=1.+p-sqrt(pow(p,2.)+2.*p);}return t(d(s));}vec4 f(vec4 v,vec4 x,float y){return vec4(f(v.xyz,x.xyz,y),mix(v.w,x.w,y));}\n        #endif\n        float d(vec2 m,vec2 v,float y,out vec2 i){vec2 f=vec2(m.x+m.y*.5,m.y),x=floor(f),o=fract(f);float z=step(o.y,o.x);vec2 d=vec2(z,1.-z),r=x+d,e=x+1.,a=vec2(x.x-x.y*.5,x.y),p=vec2(a.x+d.x-d.y*.5,a.y+d.y),s=vec2(a.x+.5,a.y+1.),w=m-a,g=m-p,k=m-s;vec3 u,c,t,A;if(any(greaterThan(v,vec2(0)))){t=vec3(a.x,p.x,s);A=vec3(a.y,p.y,s.y);if(v.x>0.)t=mod(vec3(a.x,p.x,s),v.x);if(v.y>0.)A=mod(vec3(a.y,p.y,s.y),v.y);u=floor(t+.5*A+.5);c=floor(A+.5);}else u=vec3(x.x,r.x,e),c=vec3(x.y,r.y,e.y);vec3 S=mod(u,289.);S=mod((S*51.+2.)*S+c,289.);S=mod((S*34.+10.)*S,289.);vec3 b=S*.07482+y,C=cos(b),D=sin(b);vec2 h=vec2(C.x,D),B=vec2(C.y,D.y),E=vec2(C.z,D.z);vec3 F=.8-vec3(dot(w,w),dot(g,g),dot(k,k));F=max(F,0.);vec3 G=F*F,H=G*G,I=vec3(dot(h,w),dot(B,g),dot(E,k)),J=G*F,K=-8.*J*I;i=10.9*(H.x*h+K.x*w+(H.y*B+K.y*g)+(H.z*E+K.z*k));return 10.9*dot(H,I);}vec4 d(vec3 v,float x){return vec4(mix(v,vec3(dot(vec3(.299,.587,.114),v)),x),1);}float f(vec2 v,float x,float y,float f){return fract(sin(dot(v,vec2(x,y)))*f);}void main(){vec4 v=texture2D(mask,vVertTexCoord);if(v.x>0.){vec2 x=vec2(12.9898,78.233),o=vec2(7.9898,58.233),m=vec2(17.9898,3.233);float y=f(vVertTexCoord,x.x,x.y,43358.5453)*2.-1.,z=f(vVertTexCoord,o.x,o.y,43213.5453)*2.-1.,e=f(vVertTexCoord,m.x,m.y,33358.5453)*2.-1.;const vec2 i=vec2(0);vec2 s;vec4 r;if(active){float a=d(vVertTexCoord*5.,i,10.*random.x,s),p=d(vVertTexCoord*5.,i,10.*random.y,s),g=d(vVertTexCoord*5.,i,10.*random.z,s),k=.25+.25*d(vVertTexCoord*4.,i,3.*random.x,s);r=vec4(d(addColor.xyz,k).xyz+vec3(a,p,g)*.03*abs(addColor.x-addColor.y-addColor.z),1);}else r=vec4(addColor.xyz,1);if(v.w>.7){float a=.5*(v.w-.7);r=r*(1.-a)-vec4(.5)*a;}vec3 a=f(texture2D(source,vVertTexCoord).xyz,r.xyz,.9*v.w);gl_FragColor=vec4(a+.01*vec3(y,z,e),1);}}",
  };
  function y() {
    s.push(),
      s.translate(-f.trans()[0], -f.trans()[1]),
      s.image(x.masks[2], -s.width / 2, -s.height / 2),
      x.masks[2].clear(),
      s.pop();
  }
  function w(t) {
    t.registerMethod("afterSetup", () => x.blend(!1, !0)),
      t.registerMethod("afterSetup", () => x.blend(!1, !0, !0)),
      t.registerMethod("post", () => x.blend(!1, !0)),
      t.registerMethod("post", () => x.blend(!1, !0, !0));
  }
  function k(t, e) {
    l(), _.list.set(t, { gen: e }), (_.current = t), _.refresh();
  }
  "undefined" != typeof p5 && w(p5.prototype);
  const _ = {
    isActive: !1,
    list: new Map(),
    current: "",
    step_length: () => Math.min(s.width, s.height) / 1e3,
    create() {
      (this.R = 0.01 * s.width),
        (this.left_x = -1 * s.width),
        (this.top_y = -1 * s.height),
        (this.num_columns = Math.round((2 * s.width) / this.R)),
        (this.num_rows = Math.round((2 * s.height) / this.R)),
        this.addStandard();
    },
    flow_field() {
      return this.list.get(this.current).field;
    },
    refresh(t = 0) {
      this.list.get(this.current).field = this.list
        .get(this.current)
        .gen(t, this.genField());
    },
    genField() {
      let t = new Array(this.num_columns);
      for (let e = 0; e < this.num_columns; e++)
        t[e] = new Float64Array(this.num_rows);
      return t;
    },
    addStandard() {
      k("curved", function (t, e) {
        let i = m.randInt(-25, -15);
        m.randInt(0, 100) % 2 == 0 && (i *= -1);
        for (let n = 0; n < _.num_columns; n++)
          for (let r = 0; r < _.num_rows; r++) {
            let o = s.noise(0.02 * n + 0.03 * t, 0.02 * r + 0.03 * t),
              a = m.map(o, 0, 1, -i, i);
            e[n][r] = 3 * a;
          }
        return e;
      }),
        k("truncated", function (t, e) {
          let i = m.randInt(-25, -15) + 5 * m.sin(t);
          m.randInt(0, 100) % 2 == 0 && (i *= -1);
          let n = m.randInt(5, 10);
          for (let t = 0; t < _.num_columns; t++)
            for (let r = 0; r < _.num_rows; r++) {
              let o = s.noise(0.02 * t, 0.02 * r),
                a = Math.round(m.map(o, 0, 1, -i, i) / n) * n;
              e[t][r] = 4 * a;
            }
          return e;
        }),
        k("zigzag", function (t, e) {
          let i = m.randInt(-30, -15) + Math.abs(44 * m.sin(t));
          m.randInt(0, 100) % 2 == 0 && (i *= -1);
          let s = i,
            n = 0;
          for (let t = 0; t < _.num_columns; t++) {
            for (let i = 0; i < _.num_rows; i++)
              (e[t][i] = n), (n += s), (s *= -1);
            (n += s), (s *= -1);
          }
          return e;
        }),
        k("waves", function (t, e) {
          let i = m.randInt(10, 15) + 5 * m.sin(t),
            s = m.randInt(3, 6) + 3 * m.cos(t),
            n = m.randInt(20, 35);
          for (let t = 0; t < _.num_columns; t++)
            for (let r = 0; r < _.num_rows; r++) {
              let o = m.sin(i * t) * (n * m.cos(r * s)) + m.randInt(-3, 3);
              e[t][r] = o;
            }
          return e;
        }),
        k("seabed", function (t, e) {
          let i = m.random(0.4, 0.8),
            s = m.randInt(18, 26);
          for (let n = 0; n < _.num_columns; n++)
            for (let r = 0; r < _.num_rows; r++) {
              let o = m.randInt(15, 20),
                a = s * m.sin(i * r * n + o);
              e[n][r] = 1.1 * a * m.cos(t);
            }
          return e;
        });
    },
  };
  class z {
    constructor(t, e) {
      this.update(t, e), (this.plotted = 0);
    }
    update(t, e) {
      (this.x = t),
        (this.y = e),
        _.isActive &&
          ((this.x_offset = this.x - _.left_x + f.trans()[0]),
          (this.y_offset = this.y - _.top_y + f.trans()[1]),
          (this.column_index = Math.round(this.x_offset / _.R)),
          (this.row_index = Math.round(this.y_offset / _.R)));
    }
    reset() {
      this.plotted = 0;
    }
    isIn() {
      return _.isActive
        ? this.column_index >= 0 &&
            this.row_index >= 0 &&
            this.column_index < _.num_columns &&
            this.row_index < _.num_rows
        : this.isInCanvas();
    }
    isInCanvas() {
      let t = s.width,
        e = s.height;
      return (
        this.x >= -t - f.trans()[0] &&
        this.x <= t - f.trans()[0] &&
        this.y >= -e - f.trans()[1] &&
        this.y <= e - f.trans()[1]
      );
    }
    angle() {
      return this.isIn() && _.isActive
        ? _.flow_field()[this.column_index][this.row_index]
        : 0;
    }
    moveTo(t, e, i = C.spacing(), s = !0) {
      if (this.isIn()) {
        let n, r;
        s || ((n = m.cos(-e)), (r = m.sin(-e)));
        for (let o = 0; o < t / i; o++) {
          if (s) {
            let t = this.angle();
            (n = m.cos(t - e)), (r = m.sin(t - e));
          }
          let t = i * n,
            o = i * r;
          (this.plotted += i), this.update(this.x + t, this.y + o);
        }
      } else this.plotted += i;
    }
    plotTo(t, e, i, s) {
      if (this.isIn()) {
        const n = 1 / s;
        for (let s = 0; s < e / i; s++) {
          let e = this.angle(),
            s = t.angle(this.plotted),
            r = i * m.cos(e - s),
            o = i * m.sin(e - s);
          (this.plotted += i * n), this.update(this.x + r, this.y + o);
        }
      } else this.plotted += i / g;
    }
  }
  function A(t) {
    for (let e of Y) {
      let i = C.list.get(e[0]).param;
      (i.weight *= t), (i.vibration *= t), (i.spacing *= t);
    }
    b = t;
  }
  let b = 1;
  const C = {
    isActive: !0,
    list: new Map(),
    c: "#000000",
    w: 1,
    cr: null,
    name: "HB",
    spacing() {
      return (
        (this.p = this.list.get(this.name).param),
        "default" === this.p.type || "spray" === this.p.type
          ? this.p.spacing / this.w
          : this.p.spacing
      );
    },
    initializeDrawingState(t, e, i, s, n) {
      (this.position = new z(t, e)),
        (this.length = i),
        (this.flow = s),
        (this.plot = n),
        n && n.calcIndex(0);
    },
    draw(t, e) {
      e || (this.dir = t), this.pushState();
      const i = this.spacing(),
        s = e ? Math.round((this.length * t) / i) : Math.round(this.length / i);
      for (let n = 0; n < s; n++)
        this.tip(),
          e
            ? this.position.plotTo(this.plot, i, i, t)
            : this.position.moveTo(i, t, i, this.flow);
      this.popState();
    },
    drawTip(t) {
      this.pushState(!0), this.tip(t), this.popState(!0);
    },
    pushState(t = !1) {
      if (((this.p = this.list.get(this.name).param), !t)) {
        (this.a = "custom" !== this.p.pressure.type ? m.random(-1, 1) : 0),
          (this.b = "custom" !== this.p.pressure.type ? m.random(1, 1.5) : 0),
          (this.cp =
            "custom" !== this.p.pressure.type
              ? m.random(3, 3.5)
              : m.random(-0.2, 0.2));
        const [t, e] = this.p.pressure.min_max;
        (this.min = t), (this.max = e);
      }
      (this.c = s.color(this.c)),
        (this.mask = this.p.blend
          ? "image" === this.p.type
            ? x.masks[1]
            : x.masks[0]
          : x.masks[2]),
        f.trans(),
        this.mask.push(),
        this.mask.noStroke(),
        "image" === this.p.type
          ? this.mask.translate(f.translation[0], f.translation[1])
          : this.mask.translate(
              f.translation[0] + s.width / 2,
              f.translation[1] + s.height / 2
            ),
        this.mask.rotate(-f.rotation),
        this.mask.scale(v),
        this.p.blend &&
          ((x.watercolor = !1),
          "image" !== this.p.type ? x.blend(this.c) : x.blend(this.c, !1, !0),
          t || this.markerTip()),
        (this.alpha = this.calculateAlpha()),
        this.applyColor(this.alpha);
    },
    popState(t = !1) {
      this.p.blend && !t && this.markerTip(), this.mask.pop();
    },
    tip(t = !1) {
      let e = t || this.calculatePressure();
      if (this.isInsideClippingArea())
        switch (this.p.type) {
          case "spray":
            this.drawSpray(e);
            break;
          case "marker":
            this.drawMarker(e);
            break;
          case "custom":
          case "image":
            this.drawCustomOrImage(e, this.alpha);
            break;
          default:
            this.drawDefault(e);
        }
    },
    calculatePressure() {
      return this.plot
        ? this.simPressure() * this.plot.pressure(this.position.plotted)
        : this.simPressure();
    },
    simPressure() {
      return "custom" === this.p.pressure.type
        ? m.map(
            this.p.pressure.curve(this.position.plotted / this.length) +
              this.cp,
            0,
            1,
            this.min,
            this.max,
            !0
          )
        : this.gauss();
    },
    gauss(
      t = 0.5 + C.p.pressure.curve[0] * C.a,
      e = 1 - C.p.pressure.curve[1] * C.b,
      i = C.cp,
      s = C.min,
      n = C.max
    ) {
      return m.map(
        1 /
          (1 +
            Math.pow(
              Math.abs(
                (this.position.plotted - t * this.length) /
                  ((e * this.length) / 2)
              ),
              2 * i
            )),
        0,
        1,
        s,
        n
      );
    },
    calculateAlpha() {
      return "default" !== this.p.type && "spray" !== this.p.type
        ? this.p.opacity / this.w
        : this.p.opacity;
    },
    applyColor(t) {
      this.p.blend
        ? this.mask.fill(255, 0, 0, t / 2)
        : (this.c.setAlpha(t), this.mask.fill(this.c));
    },
    isInsideClippingArea() {
      if (C.cr)
        return (
          this.position.x >= C.cr[0] &&
          this.position.x <= C.cr[2] &&
          this.position.y >= C.cr[1] &&
          this.position.y <= C.cr[3]
        );
      {
        let t = 0.55 * s.width,
          e = 0.55 * s.height;
        return (
          this.position.x >= -t - f.trans()[0] &&
          this.position.x <= t - f.trans()[0] &&
          this.position.y >= -e - f.trans()[1] &&
          this.position.y <= e - f.trans()[1]
        );
      }
    },
    drawSpray(t) {
      let e =
          this.w * this.p.vibration * t +
          (this.w * m.gaussian() * this.p.vibration) / 3,
        i = this.p.weight * m.random(0.9, 1.1);
      const s = this.p.quality / t;
      for (let t = 0; t < s; t++) {
        let t = m.random(0.9, 1.1),
          s = t * e * m.random(-1, 1),
          n = m.random(-1, 1),
          r = Math.pow(t * e, 2),
          o = Math.sqrt(r - Math.pow(s, 2));
        this.mask.circle(this.position.x + s, this.position.y + n * o, i);
      }
    },
    drawMarker(t, e = !0) {
      let i = e ? this.w * this.p.vibration : 0,
        s = e ? i * m.random(-1, 1) : 0,
        n = e ? i * m.random(-1, 1) : 0;
      this.mask.circle(
        this.position.x + s,
        this.position.y + n,
        this.w * this.p.weight * t
      );
    },
    drawCustomOrImage(t, e, i = !0) {
      this.mask.push();
      let s = i ? this.w * this.p.vibration : 0,
        n = i ? s * m.random(-1, 1) : 0,
        r = i ? s * m.random(-1, 1) : 0;
      this.mask.translate(this.position.x + n, this.position.y + r),
        this.adjustSizeAndRotation(this.w * t, e),
        this.p.tip(this.mask),
        this.mask.pop();
    },
    drawDefault(t) {
      let e =
        this.w *
        this.p.vibration *
        (this.p.definition +
          ((1 - this.p.definition) *
            m.gaussian() *
            this.gauss(0.5, 0.9, 5, 0.2, 1.2)) /
            t);
      m.random(0, this.p.quality * t) > 0.4 &&
        this.mask.circle(
          this.position.x + 0.7 * e * m.random(-1, 1),
          this.position.y + e * m.random(-1, 1),
          t * this.p.weight * m.random(0.85, 1.15)
        );
    },
    adjustSizeAndRotation(t, e) {
      if (
        (this.mask.scale(t),
        "image" === this.p.type &&
          (this.p.blend
            ? this.mask.tint(255, 0, 0, e / 2)
            : this.mask.tint(
                this.mask.red(this.c),
                this.mask.green(this.c),
                this.mask.blue(this.c),
                e
              )),
        "random" === this.p.rotate)
      )
        this.mask.rotate(m.randInt(0, 360));
      else if ("natural" === this.p.rotate) {
        let t =
          (this.plot ? -this.plot.angle(this.position.plotted) : -this.dir) +
          (this.flow ? this.position.angle() : 0);
        this.mask.rotate(t);
      }
    },
    markerTip() {
      if (this.isInsideClippingArea()) {
        let t = this.calculatePressure(),
          e = this.calculateAlpha(t);
        if ((this.mask.fill(255, 0, 0, e / 1.5), "marker" === C.p.type))
          for (let e = 1; e < 5; e++) this.drawMarker((t * e) / 5, !1);
        else if ("custom" === C.p.type || "image" === C.p.type)
          for (let i = 1; i < 5; i++)
            this.drawCustomOrImage((t * i) / 5, e, !1);
      }
    },
  };
  function M(t, e) {
    const i = "marker" === e.type || "custom" === e.type || "image" === e.type;
    i || "spray" === e.type || (e.type = "default"),
      "image" === e.type &&
        (D.add(e.image.src),
        (e.tip = () =>
          C.mask.image(
            D.tips.get(C.p.image.src),
            -C.p.weight / 2,
            -C.p.weight / 2,
            C.p.weight,
            C.p.weight
          ))),
      (e.blend = !!((i && !1 !== e.blend) || e.blend)),
      C.list.set(t, { param: e, colors: [], buffers: [] });
  }
  function S(t, e, i = 1) {
    P(t), (C.c = e), (C.w = i), (C.isActive = !0);
  }
  function P(t) {
    C.name = t;
  }
  function I(t, e, i, s) {
    l();
    let n = m.dist(t, e, i, s);
    if (0 == n) return;
    C.initializeDrawingState(t, e, n, !1, !1);
    let r = u(t, e, i, s);
    C.draw(r, !1);
  }
  function T(t, e, i, s) {
    l(), C.initializeDrawingState(e, i, t.length, !0, t), C.draw(s, !0);
  }
  const D = {
    tips: new Map(),
    add(t) {
      this.tips.set(t, !1);
    },
    imageToWhite(t) {
      t.loadPixels();
      for (let e = 0; e < 4 * t.width * t.height; e += 4) {
        let i = (t.pixels[e] + t.pixels[e + 1] + t.pixels[e + 2]) / 3;
        (t.pixels[e] = t.pixels[e + 1] = t.pixels[e + 2] = 255),
          (t.pixels[e + 3] = 255 - i);
      }
      t.updatePixels();
    },
    load() {
      for (let t of this.tips.keys()) {
        let e = (r ? o : window.self).loadImage(t, () => D.imageToWhite(e));
        this.tips.set(t, e);
      }
    },
  };
  function B(t = 5, e = 45, i = { rand: !1, continuous: !1, gradient: !1 }) {
    (E.isActive = !0), (E.hatchingParams = [t, e, i]);
  }
  const E = {
      isActive: !1,
      hatchingParams: [5, 45, {}],
      hatchingBrush: !1,
      hatch(t) {
        let e = E.hatchingParams[0],
          i = E.hatchingParams[1],
          s = E.hatchingParams[2],
          n = C.c,
          r = C.name,
          o = C.w,
          a = C.isActive;
        E.hatchingBrush &&
          S(E.hatchingBrush[0], E.hatchingBrush[1], E.hatchingBrush[2]),
          (i = m.toDegrees(i) % 180);
        let h = 1 / 0,
          l = -1 / 0,
          c = 1 / 0,
          d = -1 / 0,
          u = (t) => {
            for (let e of t.a)
              (h = e[0] < h ? e[0] : h),
                (l = e[0] > l ? e[0] : l),
                (c = e[1] < c ? e[1] : c),
                (d = e[1] > d ? e[1] : d);
          };
        Array.isArray(t) || (t = [t]);
        for (let e of t) u(e);
        let p = new V([
            [h, c],
            [l, c],
            [l, d],
            [h, d],
          ]),
          f = i <= 90 && i >= 0 ? c : d,
          v = s.gradient ? m.map(s.gradient, 0, 1, 1, 1.1, !0) : 1,
          g = [],
          x = 0,
          y = e,
          w = (t) => ({
            point1: {
              x: h + y * t * m.cos(90 - i),
              y: f + y * t * m.sin(90 - i),
            },
            point2: {
              x: h + y * t * m.cos(90 - i) + m.cos(-i),
              y: f + y * t * m.sin(90 - i) + m.sin(-i),
            },
          });
        for (; p.intersect(w(x)).length > 0; ) {
          let e = [];
          for (let i of t) e.push(i.intersect(w(x)));
          (g[x] = e
            .flat()
            .sort((t, e) => (t.x === e.x ? t.y - e.y : t.x - e.x))),
            (y *= v),
            x++;
        }
        let k = [];
        for (let t of g) void 0 !== t[0] && k.push(t);
        let _ = s.rand ? s.rand : 0;
        for (let t = 0; t < k.length; t++) {
          let i = k[t],
            n = t > 0 && s.continuous;
          for (let s = 0; s < i.length - 1; s += 2)
            0 !== _ &&
              ((i[s].x += _ * e * m.random(-10, 10)),
              (i[s].y += _ * e * m.random(-10, 10)),
              (i[s + 1].x += _ * e * m.random(-10, 10)),
              (i[s + 1].y += _ * e * m.random(-10, 10))),
              I(i[s].x, i[s].y, i[s + 1].x, i[s + 1].y),
              n && I(k[t - 1][1].x, k[t - 1][1].y, i[s].x, i[s].y);
        }
        S(r, n, o), (C.isActive = a);
      },
    },
    F = E.hatch;
  class V {
    constructor(t, e = !1) {
      (this.a = t),
        (this.vertices = t.map((t) => ({ x: t[0], y: t[1] }))),
        e && (this.vertices = t),
        (this.sides = this.vertices.map((t, e, i) => [
          t,
          i[(e + 1) % i.length],
        ]));
    }
    intersect(t) {
      let e = `${t.point1.x},${t.point1.y}-${t.point2.x},${t.point2.y}`;
      if (this._intersectionCache && this._intersectionCache[e])
        return this._intersectionCache[e];
      let i = [];
      for (let e of this.sides) {
        let s = d(t.point1, t.point2, e[0], e[1]);
        !1 !== s && i.push(s);
      }
      return (
        this._intersectionCache || (this._intersectionCache = {}),
        (this._intersectionCache[e] = i),
        i
      );
    }
    draw(t = !1, e, i) {
      let s = C.isActive;
      if ((t && S(t, e, i), C.isActive)) {
        l();
        for (let t of this.sides) I(t[0].x, t[0].y, t[1].x, t[1].y);
      }
      C.isActive = s;
    }
    fill(t = !1, e, i, s, n, r) {
      let o = $.isActive;
      t && (j(t, e), U(i, r), K(s, n)),
        $.isActive && (l(), $.fill(this)),
        ($.isActive = o);
    }
    hatch(t = !1, e, i) {
      let s = E.isActive;
      t && B(t, e, i), E.isActive && (l(), E.hatch(this)), (E.isActive = s);
    }
    erase(t = !1, e = W.a) {
      if (W.isActive || t) {
        x.masks[2].push(), x.masks[2].noStroke();
        let i = s.color(t || W.c);
        i.setAlpha(e), x.masks[2].fill(i), x.masks[2].beginShape();
        for (let t of this.vertices) x.masks[2].vertex(t.x, t.y);
        x.masks[2].endShape(s.CLOSE), x.masks[2].pop();
      }
    }
    show() {
      this.fill(), this.hatch(), this.draw(), this.erase();
    }
  }
  class R {
    constructor(t) {
      (this.segments = []),
        (this.angles = []),
        (this.pres = []),
        (this.type = t),
        (this.dir = 0),
        this.calcIndex(0),
        (this.pol = !1);
    }
    addSegment(t = 0, e = 0, i = 1, s = !1) {
      this.angles.length > 0 && this.angles.splice(-1),
        (t = s ? ((t % 360) + 360) % 360 : m.toDegrees(t)),
        this.angles.push(t),
        this.pres.push(i),
        this.segments.push(e),
        (this.length = this.segments.reduce((t, e) => t + e, 0)),
        this.angles.push(t);
    }
    endPlot(t = 0, e = 1, i = !1) {
      (t = i ? ((t % 360) + 360) % 360 : m.toDegrees(t)),
        this.angles.splice(-1),
        this.angles.push(t),
        this.pres.push(e);
    }
    rotate(t) {
      this.dir = m.toDegrees(t);
    }
    pressure(t) {
      return t > this.length
        ? this.pres[this.pres.length - 1]
        : this.curving(this.pres, t);
    }
    angle(t) {
      return t > this.length
        ? this.angles[this.angles.length - 1]
        : (this.calcIndex(t),
          "curve" === this.type
            ? this.curving(this.angles, t) + this.dir
            : this.angles[this.index] + this.dir);
    }
    curving(t, e) {
      let i = t[this.index],
        s = t[this.index + 1];
      return (
        void 0 === s && (s = i),
        Math.abs(s - i) > 180 && (s > i ? (s = -(360 - s)) : (i = -(360 - i))),
        m.map(e - this.suma, 0, this.segments[this.index], i, s, !0)
      );
    }
    calcIndex(t) {
      (this.index = -1), (this.suma = 0);
      let e = 0;
      for (; e <= t; )
        (this.suma = e), (e += this.segments[this.index + 1]), this.index++;
      return this.index;
    }
    genPol(t, e, i = 1, s = !1) {
      l();
      const n = 0.5,
        r = [],
        o = Math.round(this.length / n),
        a = new z(t, e);
      let h = s ? 0.15 : 3 * $.bleed_strength,
        c = 0,
        d = 0;
      for (let t = 0; t < o; t++) {
        a.plotTo(this, n, n, 1);
        let t = this.calcIndex(a.plotted);
        (c += n),
          (c >= this.segments[t] * h * m.random(0.7, 1.3) || t >= d) &&
            a.x &&
            (r.push([a.x, a.y]), (c = 0), t >= d && d++);
      }
      return new V(r);
    }
    draw(t, e, i) {
      C.isActive &&
        (l(),
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
        T(this, t, e, i));
    }
    fill(t, e, i) {
      $.isActive &&
        (l(),
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
        (this.pol = this.genPol(t, e, i)),
        this.pol.fill());
    }
    hatch(t, e, i) {
      E.isActive &&
        (l(),
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
        (this.pol = this.genPol(t, e, i, !0)),
        this.pol.hatch());
    }
    erase(t, e, i) {
      if (W.isActive) {
        this.origin && ((t = this.origin[0]), (e = this.origin[1]), (i = 1)),
          (this.pol = this.genPol(t, e, i, !0)),
          x.masks[2].push(),
          x.masks[2].noStroke();
        let n = s.color(W.c);
        n.setAlpha(W.a), x.masks[2].fill(n), x.masks[2].beginShape();
        for (let t of this.pol.vertices) x.masks[2].vertex(t.x, t.y);
        x.masks[2].endShape(s.CLOSE), x.masks[2].pop();
      }
    }
    show(t, e, i = 1) {
      this.draw(t, e, i),
        this.fill(t, e, i),
        this.hatch(t, e, i),
        this.erase(t, e, i);
    }
  }
  let G,
    L = !1;
  function H(t = 0) {
    (G = m.constrain(t, 0, 1)), (L = []);
  }
  function O(t, e, i) {
    L.push([t, e, i]);
  }
  function q(t) {
    t === s.CLOSE && (L.push(L[0]), L.push(L[1])),
      (0 != G || _.isActive ? N(L, G, t === s.CLOSE) : new V(L)).show(),
      (L = !1);
  }
  function N(t, e = 0.5, i = !1) {
    let s = new R(0 === e ? "segments" : "curve");
    if (t && t.length > 0) {
      let n,
        r,
        o,
        a = 0;
      for (let h = 0; h < t.length - 1; h++)
        if (e > 0 && h < t.length - 2) {
          let l = t[h],
            c = t[h + 1],
            p = t[h + 2],
            f = m.dist(l[0], l[1], c[0], c[1]),
            v = m.dist(c[0], c[1], p[0], p[1]),
            g = u(l[0], l[1], c[0], c[1]),
            x = u(c[0], c[1], p[0], p[1]),
            y = e * Math.min(Math.min(f, v), 0.5 * Math.min(f, v)),
            w = Math.max(f, v),
            k = f - y,
            _ = v - y;
          if (Math.floor(g) === Math.floor(x)) {
            let e = i && 0 === h ? 0 : f - a,
              m = i ? (0 === h ? 0 : v - o) : v;
            s.addSegment(g, e, l[2], !0),
              h === t.length - 3 && s.addSegment(x, m, c[2], !0),
              (a = 0),
              0 === h && ((n = f), (o = y), (r = t[1]), (a = 0));
          } else {
            let e = { x: c[0] - y * m.cos(-g), y: c[1] - y * m.sin(-g) },
              u = { x: e.x + w * m.cos(90 - g), y: e.y + w * m.sin(90 - g) },
              p = { x: c[0] + y * m.cos(-x), y: c[1] + y * m.sin(-x) },
              f = d(
                e,
                u,
                p,
                { x: p.x + w * m.cos(90 - x), y: p.y + w * m.sin(90 - x) },
                !0
              ),
              v = m.dist(e.x, e.y, f.x, f.y),
              z = m.dist(e.x, e.y, p.x, p.y) / 2,
              A = 2 * Math.asin(z / v) * (180 / Math.PI),
              b = (2 * Math.PI * v * A) / 360,
              C = i && 0 === h ? 0 : k - a,
              M = h === t.length - 3 ? (i ? n - y : _) : 0;
            s.addSegment(g, C, l[2], !0),
              s.addSegment(g, isNaN(b) ? 0 : b, l[2], !0),
              s.addSegment(x, M, c[2], !0),
              (a = y),
              0 === h && ((n = k), (o = y), (r = [e.x, e.y]));
          }
          h == t.length - 3 && s.endPlot(x, c[2], !0);
        } else if (0 === e) {
          0 === h && i && t.pop();
          let e = t[h],
            n = t[h + 1],
            r = m.dist(e[0], e[1], n[0], n[1]),
            o = u(e[0], e[1], n[0], n[1]);
          s.addSegment(o, r, 1, !0), h == t.length - 2 && s.endPlot(o, 1, !0);
        }
      s.origin = i && 0 !== e ? r : t[0];
    }
    return s;
  }
  const W = {};
  function j(t, e, i, n) {
    l(),
      ($.opacity = arguments.length < 4 ? (arguments.length < 3 ? e : 1) : n),
      ($.color = arguments.length < 3 ? s.color(t) : s.color(t, e, i)),
      ($.isActive = !0);
  }
  function U(t, e = "out") {
    l(), ($.bleed_strength = m.constrain(t, 0, 0.6)), ($.direction = e);
  }
  function K(t = 0.4, e = 0.4) {
    l(),
      ($.texture_strength = m.constrain(t, 0, 1)),
      ($.border_strength = m.constrain(e, 0, 1));
  }
  const $ = {
    isActive: !1,
    isAnimated: !1,
    color: "#002185",
    opacity: 80,
    bleed_strength: 0.07,
    texture_strength: 0.4,
    border_strength: 0.4,
    fill(t) {
      (this.polygon = t), (this.v = [...t.vertices]);
      const e = this.v.length * m.random(0.4);
      $.m = this.v.map((t, i) => {
        let s = m.random(0.8, 1.2) * this.bleed_strength;
        return i < e ? m.constrain(2 * s, 0, 0.9) : s;
      });
      let i = m.randInt(0, this.v.length);
      if ($.light_source)
        for (let t = 0; t < this.v.length; t++)
          m.dist(this.v[t].x, this.v[t].y, $.light_source.x, $.light_source.y) <
            m.dist(
              this.v[i].x,
              this.v[i].y,
              $.light_source.x,
              $.light_source.y
            ) && (i = t);
      (this.v = [...this.v.slice(i), ...this.v.slice(0, i)]),
        new Q(this.v, this.m, this.calcCenter(), [], !0).fill(
          this.color,
          Math.floor(m.map(this.opacity, 0, 155, 0, 20, !0)),
          this.texture_strength
        );
    },
    calcCenter() {
      let t = 0,
        e = 0;
      for (let i = 0; i < this.v.length; ++i)
        (t += this.v[i].x), (e += this.v[i].y);
      return (t /= this.v.length), (e /= this.v.length), { x: t, y: e };
    },
  };
  function J(t, e, i, s, n) {
    let r = m.cos(n),
      o = m.sin(n);
    return {
      x: r * (i - t) + o * (s - e) + t,
      y: r * (s - e) - o * (i - t) + e,
    };
  }
  class Q {
    constructor(t, e, i, s, n = !1) {
      (this.pol = new V(t, !0)),
        (this.v = t),
        (this.dir = s),
        (this.m = e),
        (this.midP = i),
        (this.size = -1 / 0);
      for (let t of this.v) {
        let e = m.dist(this.midP.x, this.midP.y, t.x, t.y);
        e > this.size && (this.size = e);
      }
      if (n)
        for (let t = 0; t < this.v.length; t++) {
          const e = this.v[t],
            i = this.v[(t + 1) % this.v.length],
            s = { x: i.x - e.x, y: i.y - e.y },
            n = J(0, 0, s.x, s.y, 90);
          let r = {
            point1: { x: e.x + s.x / 2, y: e.y + s.y / 2 },
            point2: { x: e.x + s.x / 2 + n.x, y: e.y + s.y / 2 + n.y },
          };
          const o = (t, e, i) =>
            (e.x - t.x) * (i.y - t.y) - (e.y - t.y) * (i.x - t.x) > 0.01;
          let a = 0;
          for (let t of $.polygon.intersect(r)) o(e, i, t) && a++;
          this.dir[t] = a % 2 == 0;
        }
    }
    trim(t) {
      let e = [...this.v],
        i = [...this.m],
        s = [...this.dir];
      if (this.v.length > 10 && t >= 0.2) {
        let n = ~~((1 - t) * this.v.length),
          r = ~~this.v.length / 2 - ~~n / 2;
        e.splice(r, n), i.splice(r, n), s.splice(r, n);
      }
      return { v: e, m: i, dir: s };
    }
    grow(t, e = !1) {
      const i = [],
        s = [],
        n = [];
      let r = this.trim(t);
      const o = e ? -0.5 : 1,
        a = (t) => t + 0.1 * (m.gaussian(0.5, 0.1) - 0.5);
      for (let e = 0; e < r.v.length; e++) {
        const h = r.v[e],
          l = r.v[(e + 1) % r.v.length];
        let c = 0.1 === t ? ($.bleed_strength <= 0.1 ? 0.25 : 0.75) : r.m[e];
        (c *= o), i.push(h), s.push(a(c));
        let d = { x: l.x - h.x, y: l.y - h.y },
          u = r.dir[e],
          p = "out" == $.direction ? -90 : 90,
          f = (u ? p : -p) + 45 * m.gaussian(0, 0.4),
          v = m.constrain(m.gaussian(0.5, 0.2), 0.1, 0.9),
          g = { x: h.x + d.x * v, y: h.y + d.y * v },
          x = m.gaussian(0.5, 0.2) * m.random(0.6, 1.4) * c,
          y = J(0, 0, d.x, d.y, f);
        (g.x += y.x * x),
          (g.y += y.y * x),
          i.push(g),
          s.push(a(c)),
          n.push(u, u);
      }
      return new Q(i, s, this.midP, n);
    }
    fill(t, e, i) {
      let n = m.map($.bleed_strength, 0, 0.15, 0.6, 1, !0);
      const r = 24 * n,
        o = e / 5 + (i * e) / 6,
        a = e / 4 + (i * e) / 3,
        h = e / 7 + (i * e) / 3,
        l = e / 5,
        c = 3 * i;
      (x.watercolor = !0),
        f.trans(),
        x.blend(t, !1, !1, !0),
        x.masks[0].push(),
        x.masks[0].noStroke(),
        x.masks[0].translate(
          f.translation[0] + s.width / 2,
          f.translation[1] + s.height / 2
        ),
        x.masks[0].rotate(f.rotation),
        x.masks[0].scale(v);
      let d = this.grow(),
        u = d.grow().grow(0.9),
        p = u.grow(0.75),
        g = this.grow(0.6);
      for (let t = 0; t < r; t++)
        (t !== Math.floor(r / 4) &&
          t !== Math.floor(r / 2) &&
          t !== Math.floor((3 * r) / 4)) ||
          ((d = d.grow()),
          (1 !== n && t !== Math.floor(r / 2)) ||
            ((u = u.grow(0.75)), (p = p.grow(0.75)), (g = g.grow(0.1, !0)))),
          d.grow().layer(t, l),
          g.grow(0.1, !0).grow(0.1).layer(t, h, !1),
          u.grow(0.1).grow(0.1).layer(t, a, !1),
          p.grow(0.8).grow(0.1).layer(t, o, !1),
          0 !== c && d.erase(c, e);
      x.masks[0].pop();
    }
    layer(t, e, i = !0) {
      x.masks[0].fill(255, 0, 0, e),
        i
          ? (x.masks[0].stroke(255, 0, 0, 0.5 + 1.5 * $.border_strength),
            x.masks[0].strokeWeight(m.map(t, 0, 24, 6, 0.5)))
          : x.masks[0].noStroke(),
        x.masks[0].beginShape();
      for (let t of this.v) x.masks[0].vertex(t.x, t.y);
      x.masks[0].endShape(s.CLOSE);
    }
    erase(t, e) {
      const i = m.random(130, 200),
        s = this.size / 2,
        n = 0.025 * this.size,
        r = 0.19 * this.size;
      x.masks[0].erase(3.5 * t - m.map(e, 80, 120, 0.3, 1, !0), 0);
      for (let t = 0; t < i; t++) {
        const t = this.midP.x + m.gaussian(0, s),
          e = this.midP.y + m.gaussian(0, s),
          i = m.random(n, r);
        x.masks[0].circle(t, e, i);
      }
      x.masks[0].noErase();
    }
  }
  const X = [
      "weight",
      "vibration",
      "definition",
      "quality",
      "opacity",
      "spacing",
      "pressure",
      "type",
      "tip",
      "rotate",
    ],
    Y = [
      [
        "pen",
        [
          0.35,
          0.12,
          0.5,
          8,
          200,
          0.3,
          { curve: [0.15, 0.2], min_max: [1.4, 0.9] },
        ],
      ],
      [
        "rotring",
        [
          0.2,
          0.05,
          1,
          3,
          250,
          0.15,
          { curve: [0.05, 0.2], min_max: [1.7, 0.8] },
        ],
      ],
      [
        "2B",
        [
          0.35,
          0.5,
          0.1,
          8,
          180,
          0.2,
          { curve: [0.15, 0.2], min_max: [1.3, 1] },
        ],
      ],
      [
        "HB",
        [
          0.3,
          0.5,
          0.4,
          4,
          180,
          0.25,
          { curve: [0.15, 0.2], min_max: [1.2, 0.9] },
        ],
      ],
      [
        "2H",
        [
          0.2,
          0.4,
          0.3,
          2,
          150,
          0.2,
          { curve: [0.15, 0.2], min_max: [1.2, 0.9] },
        ],
      ],
      [
        "cpencil",
        [
          0.4,
          0.6,
          0.8,
          7,
          120,
          0.15,
          { curve: [0.15, 0.2], min_max: [0.95, 1.2] },
        ],
      ],
      [
        "charcoal",
        [
          0.5,
          2,
          0.8,
          300,
          110,
          0.06,
          { curve: [0.15, 0.2], min_max: [1.3, 0.8] },
        ],
      ],
      [
        "hatch_brush",
        [0.2, 0.4, 0.3, 2, 150, 0.15, { curve: [0.5, 0.7], min_max: [1, 1.5] }],
      ],
      [
        "spray",
        [
          0.3,
          12,
          15,
          40,
          80,
          0.65,
          { curve: [0, 0.1], min_max: [0.15, 1.2] },
          "spray",
        ],
      ],
      [
        "marker",
        [
          2.5,
          0.12,
          null,
          null,
          25,
          0.4,
          { curve: [0.35, 0.25], min_max: [1.5, 1] },
          "marker",
        ],
      ],
      [
        "marker2",
        [
          2.5,
          0.12,
          null,
          null,
          25,
          0.35,
          { curve: [0.35, 0.25], min_max: [1.3, 0.95] },
          "custom",
          function (t) {
            let e = b;
            t.rect(-1.5 * e, -1.5 * e, 3 * e, 3 * e),
              t.rect(1 * e, 1 * e, 1 * e, 1 * e);
          },
          "natural",
        ],
      ],
    ];
  for (let t of Y) {
    let e = {};
    for (let i = 0; i < t[1].length; i++) e[X[i]] = t[1][i];
    M(t[0], e);
  }
  (t.Plot = R),
    (t.Polygon = V),
    (t.Position = z),
    (t.add = M),
    (t.addField = k),
    (t.beginShape = H),
    (t.beginStroke = function (t, e, i) {
      (G = [e, i]), (L = new R(t));
    }),
    (t.bleed = U),
    (t.box = function () {
      return Array.from(C.list.keys());
    }),
    (t.circle = function (t, e, i, s = !1) {
      let n = new R("curve"),
        r = (Math.PI * i) / 2,
        o = m.random(0, 360),
        a = () => (s ? m.random(-1, 1) : 0);
      n.addSegment(0 + o + a(), r + a(), 1, !0),
        n.addSegment(-90 + o + a(), r + a(), 1, !0),
        n.addSegment(-180 + o + a(), r + a(), 1, !0),
        n.addSegment(-270 + o + a(), r + a(), 1, !0);
      let h = s ? m.randInt(-5, 5) : 0;
      s && n.addSegment(0 + o, h * (Math.PI / 180) * i, !0),
        n.endPlot(h + o, 1, !0);
      let l = [t - i * m.sin(o), e - i * m.cos(-o)];
      n.show(l[0], l[1], 1);
    }),
    (t.clip = function (t) {
      C.cr = t;
    }),
    (t.colorCache = function (t = !0) {
      x.isCaching = t;
    }),
    (t.endShape = q),
    (t.endStroke = function (t, e) {
      L.endPlot(t, e), L.draw(G[0], G[1], 1), (L = !1);
    }),
    (t.erase = function (t = "white", e = 255) {
      (W.isActive = !0), (W.c = t), (W.a = e);
    }),
    (t.field = function (t) {
      l(), (_.isActive = !0), (_.current = t);
    }),
    (t.fill = j),
    (t.fillAnimatedMode = function (t) {
      $.isAnimated = t;
    }),
    (t.fillTexture = K),
    (t.flowLine = function (t, e, i, s) {
      l(),
        C.initializeDrawingState(t, e, i, !0, !1),
        C.draw(m.toDegrees(s), !1);
    }),
    (t.gravity = function (t, e) {
      l(), ($.light_source = { x: t, y: e });
    }),
    (t.hatch = B),
    (t.hatchArray = F),
    (t.instance = function (t) {
      (r = !0), (o = t), w(t);
    }),
    (t.line = I),
    (t.listFields = function () {
      return Array.from(_.list.keys());
    }),
    (t.load = a),
    (t.noClip = function () {
      C.cr = null;
    }),
    (t.noErase = function () {
      W.isActive = !1;
    }),
    (t.noField = function () {
      _.isActive = !1;
    }),
    (t.noFill = function () {
      $.isActive = !1;
    }),
    (t.noGravity = function () {
      $.light_source = !1;
    }),
    (t.noHatch = function () {
      (E.isActive = !1), (E.hatchingBrush = !1);
    }),
    (t.noStroke = function () {
      C.isActive = !1;
    }),
    (t.pick = P),
    (t.plot = T),
    (t.polygon = function (t) {
      new V(t).show();
    }),
    (t.pop = function () {
      (_.isActive = p.field.isActive),
        (_.current = p.field.current),
        (C.isActive = p.stroke.isActive),
        (C.name = p.stroke.name),
        (C.c = p.stroke.color),
        (C.w = p.stroke.weight),
        (C.cr = p.stroke.clip),
        (E.isActive = p.hatch.isActive),
        (E.hatchingParams = p.hatch.hatchingParams),
        (E.hatchingBrush = p.hatch.hatchingBrush),
        ($.isActive = p.fill.isActive),
        ($.color = p.fill.color),
        ($.opacity = p.fill.opacity),
        ($.bleed_strength = p.fill.bleed_strength),
        ($.texture_strength = p.fill.texture_strength),
        ($.border_strength = p.fill.border_strength),
        (f.rotation = p.others.rotate);
    }),
    (t.preload = function () {
      D.load();
    }),
    (t.push = function () {
      (p.field.isActive = _.isActive),
        (p.field.current = _.current),
        (p.stroke.isActive = C.isActive),
        (p.stroke.name = C.name),
        (p.stroke.color = C.c),
        (p.stroke.weight = C.w),
        (p.stroke.clip = C.cr),
        (p.hatch.isActive = E.isActive),
        (p.hatch.hatchingParams = E.hatchingParams),
        (p.hatch.hatchingBrush = E.hatchingBrush),
        (p.fill.isActive = $.isActive),
        (p.fill.color = $.color),
        (p.fill.opacity = $.opacity),
        (p.fill.bleed_strength = $.bleed_strength),
        (p.fill.texture_strength = $.texture_strength),
        (p.fill.border_strength = $.border_strength),
        (p.others.rotate = f.rotation);
    }),
    (t.reBlend = function () {
      s.push(), s.set("marker", "white", 1), s.line(-10, -10, -5, -5), s.pop();
    }),
    (t.reDraw = y),
    (t.rect = function (t, e, i, n, r = s.CORNER) {
      if ((r == s.CENTER && ((t -= i / 2), (e -= n / 2)), _.isActive))
        H(0), O(t, e), O(t + i, e), O(t + i, e + n), O(t, e + n), q(s.CLOSE);
      else {
        new V([
          [t, e],
          [t + i, e],
          [t + i, e + n],
          [t, e + n],
        ]).show();
      }
    }),
    (t.refreshField = function (t) {
      _.refresh(t);
    }),
    (t.remove = h),
    (t.rotate = function (t = 0) {
      f.rotation = m.toDegrees(t);
    }),
    (t.scale = g),
    (t.scaleBrushes = A),
    (t.seed = function (t) {
      c = new e(t);
    }),
    (t.segment = function (t, e, i) {
      L.addSegment(t, e, i);
    }),
    (t.set = S),
    (t.setHatch = function (t, e = "black", i = 1) {
      E.hatchingBrush = [t, e, i];
    }),
    (t.spline = function (t, e = 0.5) {
      N(t, e).draw();
    }),
    (t.stroke = function (t, e, i) {
      arguments.length > 0 && (C.c = arguments.length < 2 ? t : [t, e, i]),
        (C.isActive = !0);
    }),
    (t.strokeWeight = function (t) {
      C.w = t;
    }),
    (t.vertex = O);
});
