"use strict";
(self.webpackChunksupport_tickets_app =
  self.webpackChunksupport_tickets_app || []).push([
  [107],
  {
    47: (e, t, r) => {
      r.d(t, { A: () => o });
      var i = r(914),
        n = r(848);
      function o({ onSubmit: e, onCancel: t }) {
        const [r, o] = (0, i.useState)(""),
          [l, a] = (0, i.useState)(""),
          [d, c] = (0, i.useState)("medium"),
          [p, x] = (0, i.useState)(!1),
          [u, h] = (0, i.useState)("");
        return (0, n.jsxs)("div", {
          style: s.container,
          children: [
            (0, n.jsx)("h2", { style: s.title, children: "Create New Ticket" }),
            (0, n.jsxs)("form", {
              onSubmit: async (i) => {
                i.preventDefault(), h(""), x(!0);
                const n = await e({ title: r, description: l, priority: d });
                n.success ? (o(""), a(""), c("medium"), t && t()) : h(n.error),
                  x(!1);
              },
              style: s.form,
              children: [
                (0, n.jsxs)("div", {
                  style: s.field,
                  children: [
                    (0, n.jsx)("label", {
                      style: s.label,
                      children: "Title *",
                    }),
                    (0, n.jsx)("input", {
                      type: "text",
                      value: r,
                      onChange: (e) => o(e.target.value),
                      style: s.input,
                      placeholder: "Brief description of the issue",
                      required: !0,
                    }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  style: s.field,
                  children: [
                    (0, n.jsx)("label", {
                      style: s.label,
                      children: "Description *",
                    }),
                    (0, n.jsx)("textarea", {
                      value: l,
                      onChange: (e) => a(e.target.value),
                      style: s.textarea,
                      placeholder: "Detailed description of the issue",
                      rows: 5,
                      required: !0,
                    }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  style: s.field,
                  children: [
                    (0, n.jsx)("label", {
                      style: s.label,
                      children: "Priority",
                    }),
                    (0, n.jsxs)("select", {
                      value: d,
                      onChange: (e) => c(e.target.value),
                      style: s.select,
                      children: [
                        (0, n.jsx)("option", { value: "low", children: "Low" }),
                        (0, n.jsx)("option", {
                          value: "medium",
                          children: "Medium",
                        }),
                        (0, n.jsx)("option", {
                          value: "high",
                          children: "High",
                        }),
                      ],
                    }),
                  ],
                }),
                u && (0, n.jsx)("div", { style: s.error, children: u }),
                (0, n.jsxs)("div", {
                  style: s.actions,
                  children: [
                    (0, n.jsx)("button", {
                      type: "submit",
                      style: s.submitButton,
                      disabled: p,
                      children: p ? "Creating..." : "Create Ticket",
                    }),
                    t &&
                      (0, n.jsx)("button", {
                        type: "button",
                        onClick: t,
                        style: s.cancelButton,
                        children: "Cancel",
                      }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      const s = {
        container: {
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          marginBottom: "24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
        title: {
          fontSize: "20px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "20px",
        },
        form: { display: "flex", flexDirection: "column", gap: "16px" },
        field: { display: "flex", flexDirection: "column", gap: "8px" },
        label: { fontSize: "14px", fontWeight: "500", color: "#333" },
        input: {
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
        },
        textarea: {
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
          fontFamily: "inherit",
          resize: "vertical",
        },
        select: {
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          outline: "none",
          cursor: "pointer",
        },
        error: {
          padding: "12px",
          background: "#fee",
          color: "#c33",
          borderRadius: "6px",
          fontSize: "14px",
        },
        actions: { display: "flex", gap: "12px" },
        submitButton: {
          padding: "12px 24px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        },
        cancelButton: {
          padding: "12px 24px",
          background: "#f5f5f5",
          color: "#666",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          cursor: "pointer",
        },
      };
    },
    107: (e, t, r) => {
      r.r(t), r.d(t, { default: () => d });
      var i = r(914),
        n = r(537),
        o = r(47),
        s = r(913),
        l = r(138),
        a = r(848);
      function d() {
        const {
            tickets: e,
            loading: t,
            error: r,
            createTicket: d,
            updateTicket: p,
          } = (0, n.d)(),
          [x, u] = (0, i.useState)(!1),
          [h, g] = (0, i.useState)(null);
        return t && 0 === e.length
          ? (0, a.jsx)("div", {
              style: c.loading,
              children: (0, a.jsx)("p", { children: "Loading tickets..." }),
            })
          : r
          ? (0, a.jsxs)("div", {
              style: c.error,
              children: [
                (0, a.jsxs)("p", { children: ["Error: ", r] }),
                (0, a.jsx)("p", {
                  style: c.errorHint,
                  children: "Make sure you're logged in and the API is running",
                }),
              ],
            })
          : (0, a.jsxs)("div", {
              style: c.container,
              children: [
                (0, a.jsxs)("div", {
                  style: c.header,
                  children: [
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsx)("h1", {
                          style: c.title,
                          children: "Support Tickets",
                        }),
                        (0, a.jsxs)("p", {
                          style: c.subtitle,
                          children: [e.length, " ticket(s)"],
                        }),
                      ],
                    }),
                    (0, a.jsx)("button", {
                      onClick: () => u(!x),
                      style: c.newButton,
                      children: x ? "Cancel" : "+ New Ticket",
                    }),
                  ],
                }),
                x &&
                  (0, a.jsx)(o.A, {
                    onSubmit: async (e) => {
                      const t = await d(e);
                      return t.success && u(!1), t;
                    },
                    onCancel: () => u(!1),
                  }),
                (0, a.jsx)(s.A, { tickets: e, onTicketClick: g }),
                h &&
                  (0, a.jsx)(l.A, {
                    ticket: h,
                    onClose: () => g(null),
                    onUpdate: async (e, t) => {
                      await p(e, t);
                    },
                  }),
              ],
            });
      }
      const c = {
        container: { maxWidth: "1200px", margin: "0 auto" },
        header: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        },
        title: {
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
          margin: 0,
        },
        subtitle: { fontSize: "14px", color: "#666", margin: "4px 0 0 0" },
        newButton: {
          padding: "12px 24px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        },
        loading: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          fontSize: "16px",
          color: "#666",
        },
        error: {
          padding: "24px",
          background: "#fee",
          borderRadius: "8px",
          color: "#c33",
          textAlign: "center",
        },
        errorHint: { marginTop: "8px", fontSize: "14px", color: "#999" },
      };
    },
    138: (e, t, r) => {
      r.d(t, { A: () => n }), r(914);
      var i = r(848);
      function n({ ticket: e, onClose: t, onUpdate: r }) {
        return e
          ? (0, i.jsx)("div", {
              style: o.overlay,
              onClick: t,
              children: (0, i.jsxs)("div", {
                style: o.modal,
                onClick: (e) => e.stopPropagation(),
                children: [
                  (0, i.jsxs)("div", {
                    style: o.header,
                    children: [
                      (0, i.jsx)("h2", { style: o.title, children: e.title }),
                      (0, i.jsx)("button", {
                        onClick: t,
                        style: o.closeButton,
                        children: "✕",
                      }),
                    ],
                  }),
                  (0, i.jsxs)("div", {
                    style: o.content,
                    children: [
                      (0, i.jsxs)("div", {
                        style: o.section,
                        children: [
                          (0, i.jsx)("label", {
                            style: o.label,
                            children: "Status",
                          }),
                          (0, i.jsx)("div", {
                            style: o.statusButtons,
                            children: ["pending", "processing", "resolved"].map(
                              (t) =>
                                (0, i.jsx)(
                                  "button",
                                  {
                                    onClick: () => {
                                      return (
                                        (i = t), void r(e._id, { status: i })
                                      );
                                      var i;
                                    },
                                    style: {
                                      ...o.statusButton,
                                      ...(e.status === t
                                        ? o.statusButtonActive
                                        : {}),
                                    },
                                    children: t,
                                  },
                                  t
                                )
                            ),
                          }),
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        style: o.section,
                        children: [
                          (0, i.jsx)("label", {
                            style: o.label,
                            children: "Priority",
                          }),
                          (0, i.jsx)("span", {
                            style: o.value,
                            children: e.priority,
                          }),
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        style: o.section,
                        children: [
                          (0, i.jsx)("label", {
                            style: o.label,
                            children: "Description",
                          }),
                          (0, i.jsx)("p", {
                            style: o.description,
                            children: e.description,
                          }),
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        style: o.section,
                        children: [
                          (0, i.jsx)("label", {
                            style: o.label,
                            children: "Created",
                          }),
                          (0, i.jsx)("span", {
                            style: o.value,
                            children: new Date(e.createdAt).toLocaleString(),
                          }),
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        style: o.section,
                        children: [
                          (0, i.jsx)("label", {
                            style: o.label,
                            children: "Last Updated",
                          }),
                          (0, i.jsx)("span", {
                            style: o.value,
                            children: new Date(e.updatedAt).toLocaleString(),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null;
      }
      const o = {
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1e3,
        },
        modal: {
          background: "white",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflow: "auto",
        },
        header: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
          borderBottom: "1px solid #eee",
        },
        title: {
          fontSize: "24px",
          fontWeight: "600",
          color: "#333",
          margin: 0,
        },
        closeButton: {
          background: "none",
          border: "none",
          fontSize: "24px",
          color: "#999",
          cursor: "pointer",
          padding: "0",
          width: "32px",
          height: "32px",
        },
        content: { padding: "24px" },
        section: { marginBottom: "24px" },
        label: {
          display: "block",
          fontSize: "12px",
          fontWeight: "600",
          color: "#666",
          textTransform: "uppercase",
          marginBottom: "8px",
          letterSpacing: "0.5px",
        },
        value: { fontSize: "14px", color: "#333" },
        description: {
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
        },
        statusButtons: { display: "flex", gap: "8px" },
        statusButton: {
          padding: "8px 16px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          cursor: "pointer",
          background: "white",
          textTransform: "capitalize",
          transition: "all 0.2s",
        },
        statusButtonActive: {
          background: "#667eea",
          color: "white",
          borderColor: "#667eea",
        },
      };
    },
    537: (e, t, r) => {
      r.d(t, { d: () => s });
      var i = r(914),
        n = r(83);
      const o = "http://localhost:3001/api";
      function s() {
        const [e, t] = (0, i.useState)([]),
          [r, s] = (0, i.useState)(!0),
          [l, a] = (0, i.useState)(null),
          d = () => localStorage.getItem("token"),
          c = (0, i.useCallback)(async () => {
            try {
              s(!0);
              const e = d();
              if (!e) throw new Error("Not authenticated");
              const r = await n.A.get(`${o}/tickets`, {
                headers: { Authorization: `Bearer ${e}` },
              });
              t(r.data), a(null);
            } catch (e) {
              console.error("Error fetching tickets:", e),
                a(e.response?.data?.error || e.message);
            } finally {
              s(!1);
            }
          }, []);
        return (
          (0, i.useEffect)(() => {
            c();
          }, [c]),
          (0, i.useEffect)(() => {
            const e = setInterval(() => {
              c();
            }, 3e3);
            return () => clearInterval(e);
          }, [c]),
          {
            tickets: e,
            loading: r,
            error: l,
            fetchTickets: c,
            createTicket: async (e) => {
              try {
                const r = d(),
                  i = await n.A.post(`${o}/tickets`, e, {
                    headers: { Authorization: `Bearer ${r}` },
                  });
                return (
                  t((e) => [i.data, ...e]), { success: !0, ticket: i.data }
                );
              } catch (e) {
                return (
                  console.error("Error creating ticket:", e),
                  { success: !1, error: e.response?.data?.error || e.message }
                );
              }
            },
            updateTicket: async (e, r) => {
              try {
                const i = d(),
                  s = await n.A.patch(`${o}/tickets/${e}`, r, {
                    headers: { Authorization: `Bearer ${i}` },
                  });
                return (
                  t((t) => t.map((t) => (t._id === e ? s.data : t))),
                  { success: !0, ticket: s.data }
                );
              } catch (e) {
                return (
                  console.error("Error updating ticket:", e),
                  { success: !1, error: e.response?.data?.error || e.message }
                );
              }
            },
            deleteTicket: async (e) => {
              try {
                const r = d();
                return (
                  await n.A.delete(`${o}/tickets/${e}`, {
                    headers: { Authorization: `Bearer ${r}` },
                  }),
                  t((t) => t.filter((t) => t._id !== e)),
                  { success: !0 }
                );
              } catch (e) {
                return (
                  console.error("Error deleting ticket:", e),
                  { success: !1, error: e.response?.data?.error || e.message }
                );
              }
            },
          }
        );
      }
    },
    913: (e, t, r) => {
      r.d(t, { A: () => n }), r(914);
      var i = r(848);
      function n({ tickets: e, onTicketClick: t }) {
        return 0 === e.length
          ? (0, i.jsxs)("div", {
              style: o.empty,
              children: [
                (0, i.jsx)("p", {
                  style: o.emptyText,
                  children: "No tickets yet",
                }),
                (0, i.jsx)("p", {
                  style: o.emptySubtext,
                  children: "Create your first ticket above",
                }),
              ],
            })
          : (0, i.jsx)("div", {
              style: o.container,
              children: e.map((e) => {
                return (0, i.jsxs)(
                  "div",
                  {
                    style: o.ticket,
                    onClick: () => t && t(e),
                    children: [
                      (0, i.jsxs)("div", {
                        style: o.header,
                        children: [
                          (0, i.jsx)("h3", {
                            style: o.title,
                            children: e.title,
                          }),
                          (0, i.jsx)("span", {
                            style:
                              ((n = e.status),
                              {
                                padding: "4px 12px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: "500",
                                textTransform: "capitalize",
                                ...{
                                  pending: {
                                    background: "#fff3cd",
                                    color: "#856404",
                                  },
                                  processing: {
                                    background: "#cfe2ff",
                                    color: "#084298",
                                  },
                                  resolved: {
                                    background: "#d1e7dd",
                                    color: "#0f5132",
                                  },
                                }[n],
                              }),
                            children: e.status,
                          }),
                        ],
                      }),
                      (0, i.jsx)("p", {
                        style: o.description,
                        children:
                          e.description.length > 100
                            ? `${e.description.substring(0, 100)}...`
                            : e.description,
                      }),
                      (0, i.jsxs)("div", {
                        style: o.footer,
                        children: [
                          (0, i.jsxs)("span", {
                            style:
                              ((r = e.priority),
                              {
                                fontSize: "12px",
                                fontWeight: "500",
                                textTransform: "capitalize",
                                ...{
                                  low: { color: "#666" },
                                  medium: { color: "#ff9800" },
                                  high: { color: "#f44336" },
                                }[r],
                              }),
                            children: [e.priority, " priority"],
                          }),
                          (0, i.jsx)("span", {
                            style: o.date,
                            children: new Date(
                              e.createdAt
                            ).toLocaleDateString(),
                          }),
                        ],
                      }),
                    ],
                  },
                  e._id
                );
                var r, n;
              }),
            });
      }
      const o = {
        container: { display: "flex", flexDirection: "column", gap: "16px" },
        ticket: {
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
        },
        header: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
          gap: "16px",
        },
        title: {
          fontSize: "16px",
          fontWeight: "600",
          color: "#333",
          margin: 0,
        },
        description: {
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.5",
          marginBottom: "12px",
        },
        footer: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        date: { fontSize: "12px", color: "#999" },
        empty: {
          background: "white",
          padding: "60px 20px",
          borderRadius: "8px",
          textAlign: "center",
        },
        emptyText: { fontSize: "18px", color: "#333", marginBottom: "8px" },
        emptySubtext: { fontSize: "14px", color: "#999" },
      };
    },
  },
]);
