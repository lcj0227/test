! function() {
	function e() {
		if (void 0 != window.pageYOffset) return {
			x: pageXOffset,
			y: t(pageYOffset)
		};
		var e, n, o = document,
			r = o.documentElement,
			i = o.body;
		return e = r.scrollLeft || i.scrollLeft || 0, n = r.scrollTop || i.scrollTop || 0, {
			x: e,
			y: t(n)
		}
	}

	function t(e) {
		return Number((e / (n() - window.innerHeight)).toFixed(2))
	}

	function n() {
		var e = document.body,
			t = document.documentElement,
			n = Math.max(e.scrollHeight, e.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight);
		return n
	}

	function o(e, t, n, o) {
		return e /= o / 2, 1 > e ? n / 2 * e * e + t : (e--, -n / 2 * (e * (e - 2) - 1) + t)
	}

	function r(e) {
		if (e) {
			for (var t = [], n = !1; null != e.parentNode;) {
				for (var o = 0, r = 0, i = 0; i < e.parentNode.childNodes.length; i++) {
					var a = e.parentNode.childNodes[i];
					a.nodeName == e.nodeName && (a === e && (r = o), o++)
				}
				var c = e.nodeName.toLowerCase();
				n && (c += "::shadow", n = !1), t.unshift(o > 1 ? c + ":nth-of-type(" + (r + 1) + ")" : c), e = e.parentNode, 11 === e.nodeType && (n = !0, e = e.host)
			}
			return t.splice(0, 1), t.join(" > ")
		}
	}

	function i(e) {
		N || (N = e);
		var t = e - N,
			n = o(t, E, b - E, k);
		window.scrollTo(0, n), k > t ? T = requestAnimationFrame(i) : (N = null, E = null, X = !1)
	}

	function a() {
		c()
	}

	function c() {
		window.addEventListener("message", f, !0);
		for (var e = 0; e < x.length; e++) window.addEventListener(x[e], u, !0);
		window.addEventListener("scroll", s, !0)
	}

	function s() {
		clearTimeout(g), g = setTimeout(function() {
			l()
		}, H)
	}

	function l() {
		parent.postMessage(["event", {
			type: "scroll",
			positions: e()
		}], "*")
	}

	function u(e) {
		for (var t = r(e.target), n = e.constructor.name, o = e.type, i = {
				type: o,
				targetPath: t,
				eventClass: n
			}, a = {}, c = 0; c < C.length; c++) {
			var s = C[c];
			"undefined" != typeof e[s] && (a[s] = e[s])
		}
		i.options = a, L.push(i), clearTimeout(w), w = setTimeout(function() {
			d()
		}, Y)
	}

	function d() {
		parent.postMessage(["event", L], "*"), L = []
	}

	function f(e) {
		var t = e.data;
		t.length && "event" === t[0] && t[1] && ("scroll" === t[1].type ? p(t[1].positions) : v(t[1]))
	}

	function p(e) {
		X !== !0 && (X = !0, E = document.documentElement.scrollTop || document.body.scrollTop, b = e.y * (n() - window.innerHeight), requestAnimationFrame(i))
	}

	function v(e) {
		for (var t = 0; t < e.length; t++) m(e[t])
	}

	function m(e) {
		"MouseEvent" === e.eventClass ? y(e) : "KeyboardEvent" === e.eventClass && h(e)
	}

	function y(e) {
		var t = document.querySelector(e.targetPath),
			n = new MouseEvent(e.type, {
				bubbles: !0,
				cancelable: !0,
				view: window
			});
		t.dispatchEvent(n)
	}

	function h(e) {
		var t = document.querySelector(e.targetPath),
			n = new KeyboardEvent(e.type, e.options);
		t.dispatchEvent(n)
	}
	var g, w, E, b, N, T, H = 300,
		Y = 500,
		L = [],
		X = !1,
		k = 300,
		x = ["click", "keydown", "keypress", "keyup"],
		C = ["altKey", "code", "ctrlKey", "keyCode", "which", "clientX", "clientY", "layerX", "layerY", "offsetX", "offsetY", "pageX", "pageY", "screenX", "screenY", "x", "y"];
	a()
}();