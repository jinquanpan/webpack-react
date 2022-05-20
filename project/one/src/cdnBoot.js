!function() {
    window._removeLoading = function() {
        var e = document.getElementById("loading");
        e && e.parentElement && e.parentElement.removeChild(e)
    };
    var e = document.getElementsByTagName("script");
    script = e[e.length - 1];
    var a, c, e = script.src,
    s = {};
    s.b = script.getAttribute("b"),
    s.b || (s.b = /^https?:\/\/(.*?)\//i.exec(e)[0]);
    var d = [],
    p = [],
    m = Array.prototype.push,
    e = {
        push: function(...e) {
            m.apply(d, e),
            m.apply(p, e),
            a && c && n()
        }
    };
    window._jkModules = e;
    var t = window.onload;
    function n() {
        for (var e = "",
        t = "",
        n = [], r = [], o = 0; o < d.length; o++) {
            var l = d[o];
            l.injectHtml && (l.injectHtml.header && (e += l.injectHtml.header), l.injectHtml.body && (t += l.injectHtml.body)),
            l.js && l.js.length && m.apply(r, l.js),
            l.css && l.css.length && m.apply(n, l.css)
        }
        d = [],
        e && (a.innerHTML += e),
        t && (c.innerHTML += t);
        for (o = 0; o < r.length; o++)(i = document.createElement("link")).rel = "preload",
        i.as = "script",
        /\/$/.test(s.b) || /^\//.test(r[o]) || (s.b += "/"),
        i.href = s.b + r[o],
        a.appendChild(i);
        for (var i, o = 0; o < n.length; o++)(i = document.createElement("link")).rel = "stylesheet",
        i.type = "text/css",
        /\/$/.test(s.b) || /^\//.test(n[o]) || (s.b += "/"),
        i.href = s.b + n[o],
        a.appendChild(i);
        h || (h = !0,
        function e() {
            if (!p.length) return void(h = !1);
            var t = p[0];
            if (!t.js || !t.js.length) return p.shift(),
            void e();
            h = !0;
            var n = document.createElement("script");
            n.onload = () = >{
                e()
            };
            n.onerror = () = >{
                n._count++,
                n._count < 3 && (c.removeChild(n), c.appendChild(n))
            };
            n._count = 0;
            n.src = s.b + t.js.shift();
            c.appendChild(n)
        } ())
    }
    var h = !(window.onload = function() {
        a = document.getElementsByTagName("head")[0],
        c = document.getElementsByTagName("body")[0],
        n(),
        "function" == typeof t && t()
    })
} ();