"use strict";
(self.webpackChunkflowbit_shell = self.webpackChunkflowbit_shell || []).push([
  [956],
  {
    709: (e, t, n) => {
      var o = n(769),
        r = n.n(o),
        a = n(338),
        l = n(809);
      const i = n(83).A.create({
        baseURL: "http://localhost:3001/api",
        headers: { "Content-Type": "application/json" },
      });
      i.interceptors.request.use(
        (e) => (console.log(`→ ${e.method.toUpperCase()} ${e.url}`), e),
        (e) => Promise.reject(e)
      ),
        i.interceptors.response.use(
          (e) => (console.log(`← ${e.status} ${e.config.url}`), e),
          (e) => (
            401 === e.response?.status &&
              (localStorage.removeItem("token"),
              localStorage.removeItem("user"),
              (window.location.href = "/login")),
            Promise.reject(e)
          )
        );
      const s = i,
        c = (0, o.createContext)();
      function d({ children: e }) {
        const [t, n] = (0, o.useState)(null),
          [a, l] = (0, o.useState)(!0);
        (0, o.useEffect)(() => {
          let e = !0;
          return (
            (async () => {
              const t = localStorage.getItem("token"),
                o = localStorage.getItem("user");
              if (t && o)
                try {
                  const r = await i(t);
                  e &&
                    (r
                      ? (n(JSON.parse(o)),
                        (s.defaults.headers.common.Authorization = `Bearer ${t}`))
                      : d());
                } catch (t) {
                  console.error("Token validation error:", t), e && d();
                }
              e && l(!1);
            })(),
            () => {
              e = !1;
            }
          );
        }, []);
        const i = async (e) => {
            try {
              return 200 === (await s.get("/auth/validate")).status;
            } catch (e) {
              return !1;
            }
          },
          d = () => {
            localStorage.removeItem("token"),
              localStorage.removeItem("user"),
              delete s.defaults.headers.common.Authorization,
              n(null);
          },
          u = {
            user: t,
            login: async (e, t) => {
              try {
                const o = await s.post("/auth/login", {
                    email: e,
                    password: t,
                  }),
                  { token: r, user: a } = o.data,
                  l = {
                    id: a.id,
                    email: a.email,
                    name: a.name,
                    ...(a.role && { role: a.role }),
                  };
                return (
                  localStorage.setItem("token", r),
                  localStorage.setItem("user", JSON.stringify(l)),
                  (s.defaults.headers.common.Authorization = `Bearer ${r}`),
                  n(l),
                  { success: !0 }
                );
              } catch (e) {
                return (
                  console.error("Login error:", e),
                  {
                    success: !1,
                    error:
                      e.response?.data?.error ||
                      e.message ||
                      "Login failed. Please try again.",
                  }
                );
              }
            },
            logout: d,
            loading: a,
            refreshToken: async () => {
              try {
                const e = await s.post("/auth/refresh"),
                  { token: t } = e.data;
                return (
                  localStorage.setItem("token", t),
                  (s.defaults.headers.common.Authorization = `Bearer ${t}`),
                  !0
                );
              } catch (e) {
                return d(), !1;
              }
            },
          };
        return r().createElement(c.Provider, { value: u }, e);
      }
      function u() {
        const e = (0, o.useContext)(c);
        if (!e) throw new Error("useAuth must be used within AuthProvider");
        return e;
      }
      function p() {
        const [e, t] = (0, o.useState)(""),
          [n, a] = (0, o.useState)(""),
          [i, s] = (0, o.useState)(""),
          [c, d] = (0, o.useState)(!1),
          { login: p } = u(),
          g = (0, l.useNavigate)(),
          f = (e) => {
            t(e), a("password123");
          };
        return r().createElement(
          "div",
          { style: m.container },
          r().createElement(
            "div",
            { style: m.card },
            r().createElement("h1", { style: m.title }, "Flowbit Platform"),
            r().createElement(
              "p",
              { style: m.subtitle },
              "Multi-Tenant Support System"
            ),
            r().createElement(
              "form",
              {
                onSubmit: async (t) => {
                  t.preventDefault(), s(""), d(!0);
                  const o = await p(e, n);
                  o.success ? g("/dashboard") : s(o.error), d(!1);
                },
                style: m.form,
              },
              r().createElement(
                "div",
                { style: m.inputGroup },
                r().createElement("label", { style: m.label }, "Email"),
                r().createElement("input", {
                  type: "email",
                  value: e,
                  onChange: (e) => t(e.target.value),
                  style: m.input,
                  placeholder: "admin@logisticsco.com",
                  required: !0,
                })
              ),
              r().createElement(
                "div",
                { style: m.inputGroup },
                r().createElement("label", { style: m.label }, "Password"),
                r().createElement("input", {
                  type: "password",
                  value: n,
                  onChange: (e) => a(e.target.value),
                  style: m.input,
                  placeholder: "Enter password",
                  required: !0,
                })
              ),
              i && r().createElement("div", { style: m.error }, i),
              r().createElement(
                "button",
                { type: "submit", style: m.button, disabled: c },
                c ? "Logging in..." : "Login"
              )
            ),
            r().createElement(
              "div",
              { style: m.quickLogin },
              r().createElement(
                "p",
                { style: m.quickLoginTitle },
                "Quick Login:"
              ),
              r().createElement(
                "button",
                {
                  onClick: () => f("admin@logisticsco.com"),
                  style: m.quickButton,
                },
                "LogisticsCo Admin"
              ),
              r().createElement(
                "button",
                {
                  onClick: () => f("admin@retailgmbh.com"),
                  style: m.quickButton,
                },
                "RetailGmbH Admin"
              )
            ),
            r().createElement(
              "p",
              { style: m.hint },
              "Default password: ",
              r().createElement("code", null, "password123")
            )
          )
        );
      }
      const m = {
        container: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        card: {
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        },
        title: {
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "8px",
          textAlign: "center",
        },
        subtitle: {
          fontSize: "14px",
          color: "#666",
          marginBottom: "32px",
          textAlign: "center",
        },
        form: { display: "flex", flexDirection: "column", gap: "20px" },
        inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
        label: { fontSize: "14px", fontWeight: "500", color: "#333" },
        input: {
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
        },
        button: {
          padding: "12px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "transform 0.2s",
        },
        error: {
          padding: "12px",
          background: "#fee",
          color: "#c33",
          borderRadius: "6px",
          fontSize: "14px",
        },
        quickLogin: {
          marginTop: "24px",
          paddingTop: "24px",
          borderTop: "1px solid #eee",
        },
        quickLoginTitle: {
          fontSize: "14px",
          color: "#666",
          marginBottom: "12px",
        },
        quickButton: {
          display: "block",
          width: "100%",
          padding: "10px",
          margin: "8px 0",
          background: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          cursor: "pointer",
          transition: "background 0.2s",
        },
        hint: {
          marginTop: "16px",
          fontSize: "12px",
          color: "#999",
          textAlign: "center",
        },
      };
      function g({ children: e }) {
        const { user: t, loading: n } = u();
        return n
          ? r().createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                },
              },
              r().createElement("p", null, "Loading...")
            )
          : t
          ? e
          : r().createElement(l.Navigate, { to: "/login" });
      }
      function f() {
        const { user: e, logout: t } = u();
        return r().createElement(
          "header",
          { style: x.header },
          r().createElement(
            "div",
            { style: x.logo },
            r().createElement("h2", { style: x.logoText }, "Flowbit")
          ),
          r().createElement(
            "div",
            { style: x.userInfo },
            r().createElement(
              "div",
              { style: x.userDetails },
              r().createElement("span", { style: x.userName }, e?.email),
              r().createElement("span", { style: x.userTenant }, e?.customerId),
              r().createElement("span", { style: x.userRole }, e?.role)
            ),
            r().createElement(
              "button",
              { onClick: t, style: x.logoutButton },
              "Logout"
            )
          )
        );
      }
      const x = {
        header: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "white",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
        logo: { display: "flex", alignItems: "center" },
        logoText: {
          fontSize: "24px",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        userInfo: { display: "flex", alignItems: "center", gap: "16px" },
        userDetails: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
        },
        userName: { fontSize: "14px", fontWeight: "500", color: "#333" },
        userTenant: { fontSize: "12px", color: "#666" },
        userRole: {
          fontSize: "11px",
          color: "#999",
          textTransform: "uppercase",
        },
        logoutButton: {
          padding: "8px 16px",
          background: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          cursor: "pointer",
          transition: "background 0.2s",
        },
      };
      function h() {
        const [e, t] = (0, o.useState)([]),
          [n, a] = (0, o.useState)(!0),
          i = (0, l.useLocation)();
        (0, o.useEffect)(() => {
          c();
        }, []);
        const c = async () => {
          try {
            const e = await s.get("/me/screens");
            t(e.data);
          } catch (e) {
            console.error("Failed to fetch screens:", e);
          } finally {
            a(!1);
          }
        };
        return n
          ? r().createElement("aside", { style: y.sidebar }, "Loading...")
          : r().createElement(
              "aside",
              { style: y.sidebar },
              r().createElement(
                "nav",
                { style: y.nav },
                r().createElement(
                  l.Link,
                  {
                    to: "/dashboard",
                    style: {
                      ...y.navItem,
                      ...("/dashboard" === i.pathname ? y.navItemActive : {}),
                    },
                  },
                  "Dashboard"
                ),
                e.map((e) =>
                  r().createElement(
                    l.Link,
                    {
                      key: e.id,
                      to: `/app/${e.id}`,
                      style: {
                        ...y.navItem,
                        ...(i.pathname === `/app/${e.id}`
                          ? y.navItemActive
                          : {}),
                      },
                    },
                    e.name
                  )
                )
              )
            );
      }
      const y = {
        sidebar: {
          width: "250px",
          background: "white",
          borderRight: "1px solid #e0e0e0",
          padding: "24px 0",
        },
        nav: { display: "flex", flexDirection: "column", gap: "4px" },
        navItem: {
          padding: "12px 24px",
          color: "#666",
          textDecoration: "none",
          fontSize: "14px",
          transition: "background 0.2s",
        },
        navItemActive: {
          background: "#f5f3ff",
          color: "#667eea",
          fontWeight: "500",
          borderLeft: "3px solid #667eea",
        },
      };
      function E({ children: e }) {
        return r().createElement(
          "div",
          { style: b.container },
          r().createElement(f, null),
          r().createElement(
            "div",
            { style: b.main },
            r().createElement(h, null),
            r().createElement("main", { style: b.content }, e)
          )
        );
      }
      const b = {
        container: {
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        },
        main: { display: "flex", flex: 1, overflow: "hidden" },
        content: {
          flex: 1,
          padding: "24px",
          background: "#f5f5f5",
          overflow: "auto",
        },
      };
      function v() {
        const { user: e } = u();
        return r().createElement(
          "div",
          null,
          r().createElement("h1", { style: S.title }, "Welcome to Flowbit"),
          r().createElement(
            "p",
            { style: S.subtitle },
            "Multi-Tenant Support Platform"
          ),
          r().createElement(
            "div",
            { style: S.card },
            r().createElement("h2", { style: S.cardTitle }, "Your Account"),
            r().createElement(
              "div",
              { style: S.info },
              r().createElement(
                "div",
                { style: S.infoItem },
                r().createElement("span", { style: S.infoLabel }, "Email:"),
                r().createElement("span", { style: S.infoValue }, e?.email)
              ),
              r().createElement(
                "div",
                { style: S.infoItem },
                r().createElement("span", { style: S.infoLabel }, "Company:"),
                r().createElement("span", { style: S.infoValue }, e?.customerId)
              ),
              r().createElement(
                "div",
                { style: S.infoItem },
                r().createElement("span", { style: S.infoLabel }, "Role:"),
                r().createElement("span", { style: S.infoValue }, e?.role)
              )
            )
          ),
          r().createElement(
            "div",
            { style: S.card },
            r().createElement(
              "h2",
              { style: S.cardTitle },
              "🎉 Setup Complete!"
            ),
            r().createElement(
              "p",
              { style: S.text },
              'Your Flowbit platform is ready. Navigate to "Support Tickets" from the sidebar to start managing tickets.'
            )
          )
        );
      }
      const S = {
        title: {
          fontSize: "32px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "8px",
        },
        subtitle: { fontSize: "16px", color: "#666", marginBottom: "32px" },
        card: {
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          marginBottom: "24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
        cardTitle: {
          fontSize: "20px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "16px",
        },
        info: { display: "flex", flexDirection: "column", gap: "12px" },
        infoItem: { display: "flex", gap: "12px" },
        infoLabel: {
          fontSize: "14px",
          color: "#666",
          fontWeight: "500",
          minWidth: "100px",
        },
        infoValue: { fontSize: "14px", color: "#333" },
        text: { fontSize: "14px", color: "#666", lineHeight: "1.6" },
      };
      function w({ scope: e, module: t, url: n }) {
        const a = (0, o.lazy)(
          () =>
            new Promise((o, r) => {
              if (window[e]) return void o(k(e, t));
              const a = document.createElement("script");
              (a.src = n),
                (a.onload = () => {
                  o(k(e, t));
                }),
                (a.onerror = () => {
                  r(new Error(`Failed to load remote: ${n}`));
                }),
                document.head.appendChild(a);
            })
        );
        return r().createElement(
          o.Suspense,
          {
            fallback: r().createElement(
              "div",
              { style: I.loading },
              "Loading module..."
            ),
          },
          r().createElement(a, null)
        );
      }
      async function k(e, t) {
        await n.I("default");
        const o = window[e];
        return await o.init(n.S.default), (await o.get(t))();
      }
      const I = {
        loading: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          fontSize: "16px",
          color: "#666",
        },
      };
      function z() {
        const { appId: e } = (0, l.useParams)(),
          [t, n] = (0, o.useState)(null),
          [a, i] = (0, o.useState)(!0),
          [c, d] = (0, o.useState)(null);
        (0, o.useEffect)(() => {
          u();
        }, [e]);
        const u = async () => {
          try {
            const t = (await s.get("/me/screens")).data.find((t) => t.id === e);
            t ? n(t) : d("App not found");
          } catch (e) {
            d("Failed to load app configuration");
          } finally {
            i(!1);
          }
        };
        return a
          ? r().createElement("div", null, "Loading...")
          : c
          ? r().createElement(
              "div",
              { style: C.error },
              r().createElement("h2", null, "Error"),
              r().createElement("p", null, c)
            )
          : r().createElement(
              "div",
              null,
              r().createElement("h1", { style: C.title }, t.name),
              r().createElement(w, {
                scope: t.scope,
                module: t.module,
                url: t.url,
              })
            );
      }
      const C = {
        title: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "24px",
        },
        error: {
          padding: "24px",
          background: "white",
          borderRadius: "8px",
          color: "#c33",
        },
      };
      function L() {
        return r().createElement(
          d,
          null,
          r().createElement(
            l.BrowserRouter,
            null,
            r().createElement(
              l.Routes,
              null,
              r().createElement(l.Route, {
                path: "/login",
                element: r().createElement(p, null),
              }),
              r().createElement(l.Route, {
                path: "/dashboard",
                element: r().createElement(
                  g,
                  null,
                  r().createElement(E, null, r().createElement(v, null))
                ),
              }),
              r().createElement(l.Route, {
                path: "/app/:appId",
                element: r().createElement(
                  g,
                  null,
                  r().createElement(E, null, r().createElement(z, null))
                ),
              }),
              r().createElement(l.Route, {
                path: "/",
                element: r().createElement(l.Navigate, { to: "/dashboard" }),
              })
            )
          )
        );
      }
      class B extends r().Component {
        constructor(e) {
          super(e), (this.state = { hasError: !1, error: null });
        }
        static getDerivedStateFromError(e) {
          return { hasError: !0, error: e };
        }
        componentDidCatch(e, t) {
          console.error("ErrorBoundary caught:", e, t);
        }
        render() {
          return this.state.hasError
            ? r().createElement(
                "div",
                { style: R.container },
                r().createElement(
                  "h1",
                  { style: R.title },
                  "Oops! Something went wrong"
                ),
                r().createElement(
                  "p",
                  { style: R.text },
                  this.state.error?.message
                ),
                r().createElement(
                  "button",
                  { onClick: () => window.location.reload(), style: R.button },
                  "Reload Page"
                )
              )
            : this.props.children;
        }
      }
      const R = {
        container: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "24px",
        },
        title: { fontSize: "24px", color: "#333", marginBottom: "16px" },
        text: { fontSize: "16px", color: "#666", marginBottom: "24px" },
        button: {
          padding: "12px 24px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        },
      };
      a.createRoot(document.getElementById("root")).render(
        r().createElement(B, null, r().createElement(L, null))
      );
    },
  },
]);
