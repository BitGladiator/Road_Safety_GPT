"use strict";
(self.webpackChunksupport_tickets_app =
  self.webpackChunksupport_tickets_app || []).push([
  [947],
  {
    338: (e, t, r) => {
      var i = r(672);
      (t.createRoot = i.createRoot), (t.hydrateRoot = i.hydrateRoot);
    },
    947: (e, t, r) => {
      var i = r(914),
        o = r(338),
        n = r(83);
      const s = "http://localhost:3001/api";
      var l = r(848);
      function a({ onSubmit: e, onCancel: t }) {
        const [r, o] = (0, i.useState)(""),
          [n, s] = (0, i.useState)(""),
          [a, d] = (0, i.useState)("medium"),
          [p, x] = (0, i.useState)(!1),
          [u, h] = (0, i.useState)("");
        return (0, l.jsxs)("div", {
          style: c.container,
          children: [
            (0, l.jsx)("h2", { style: c.title, children: "Create New Ticket" }),
            (0, l.jsxs)("form", {
              onSubmit: async (i) => {
                i.preventDefault(), h(""), x(!0);
                const l = await e({ title: r, description: n, priority: a });
                l.success ? (o(""), s(""), d("medium"), t && t()) : h(l.error),
                  x(!1);
              },
              style: c.form,
              children: [
                (0, l.jsxs)("div", {
                  style: c.field,
                  children: [
                    (0, l.jsx)("label", {
                      style: c.label,
                      children: "Title *",
                    }),
                    (0, l.jsx)("input", {
                      type: "text",
                      value: r,
                      onChange: (e) => o(e.target.value),
                      style: c.input,
                      placeholder: "Brief description of the issue",
                      required: !0,
                    }),
                  ],
                }),
                (0, l.jsxs)("div", {
                  style: c.field,
                  children: [
                    (0, l.jsx)("label", {
                      style: c.label,
                      children: "Description *",
                    }),
                    (0, l.jsx)("textarea", {
                      value: n,
                      onChange: (e) => s(e.target.value),
                      style: c.textarea,
                      placeholder: "Detailed description of the issue",
                      rows: 5,
                      required: !0,
                    }),
                  ],
                }),
                (0, l.jsxs)("div", {
                  style: c.field,
                  children: [
                    (0, l.jsx)("label", {
                      style: c.label,
                      children: "Priority",
                    }),
                    (0, l.jsxs)("select", {
                      value: a,
                      onChange: (e) => d(e.target.value),
                      style: c.select,
                      children: [
                        (0, l.jsx)("option", { value: "low", children: "Low" }),
                        (0, l.jsx)("option", {
                          value: "medium",
                          children: "Medium",
                        }),
                        (0, l.jsx)("option", {
                          value: "high",
                          children: "High",
                        }),
                      ],
                    }),
                  ],
                }),
                u && (0, l.jsx)("div", { style: c.error, children: u }),
                (0, l.jsxs)("div", {
                  style: c.actions,
                  children: [
                    (0, l.jsx)("button", {
                      type: "submit",
                      style: c.submitButton,
                      disabled: p,
                      children: p ? "Creating..." : "Create Ticket",
                    }),
                    t &&
                      (0, l.jsx)("button", {
                        type: "button",
                        onClick: t,
                        style: c.cancelButton,
                        children: "Cancel",
                      }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      const c = {
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
      function d({ tickets: e, onTicketClick: t }) {
        return 0 === e.length
          ? (0, l.jsxs)("div", {
              style: p.empty,
              children: [
                (0, l.jsx)("p", {
                  style: p.emptyText,
                  children: "No tickets yet",
                }),
                (0, l.jsx)("p", {
                  style: p.emptySubtext,
                  children: "Create your first ticket above",
                }),
              ],
            })
          : (0, l.jsx)("div", {
              style: p.container,
              children: e.map((e) => {
                return (0, l.jsxs)(
                  "div",
                  {
                    style: p.ticket,
                    onClick: () => t && t(e),
                    children: [
                      (0, l.jsxs)("div", {
                        style: p.header,
                        children: [
                          (0, l.jsx)("h3", {
                            style: p.title,
                            children: e.title,
                          }),
                          (0, l.jsx)("span", {
                            style:
                              ((i = e.status),
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
                                }[i],
                              }),
                            children: e.status,
                          }),
                        ],
                      }),
                      (0, l.jsx)("p", {
                        style: p.description,
                        children:
                          e.description.length > 100
                            ? `${e.description.substring(0, 100)}...`
                            : e.description,
                      }),
                      (0, l.jsxs)("div", {
                        style: p.footer,
                        children: [
                          (0, l.jsxs)("span", {
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
                          (0, l.jsx)("span", {
                            style: p.date,
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
                var r, i;
              }),
            });
      }
      const p = {
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
      function x({ ticket: e, onClose: t, onUpdate: r }) {
        return e
          ? (0, l.jsx)("div", {
              style: u.overlay,
              onClick: t,
              children: (0, l.jsxs)("div", {
                style: u.modal,
                onClick: (e) => e.stopPropagation(),
                children: [
                  (0, l.jsxs)("div", {
                    style: u.header,
                    children: [
                      (0, l.jsx)("h2", { style: u.title, children: e.title }),
                      (0, l.jsx)("button", {
                        onClick: t,
                        style: u.closeButton,
                        children: "✕",
                      }),
                    ],
                  }),
                  (0, l.jsxs)("div", {
                    style: u.content,
                    children: [
                      (0, l.jsxs)("div", {
                        style: u.section,
                        children: [
                          (0, l.jsx)("label", {
                            style: u.label,
                            children: "Status",
                          }),
                          (0, l.jsx)("div", {
                            style: u.statusButtons,
                            children: ["pending", "processing", "resolved"].map(
                              (t) =>
                                (0, l.jsx)(
                                  "button",
                                  {
                                    onClick: () => {
                                      return (
                                        (i = t), void r(e._id, { status: i })
                                      );
                                      var i;
                                    },
                                    style: {
                                      ...u.statusButton,
                                      ...(e.status === t
                                        ? u.statusButtonActive
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
                      (0, l.jsxs)("div", {
                        style: u.section,
                        children: [
                          (0, l.jsx)("label", {
                            style: u.label,
                            children: "Priority",
                          }),
                          (0, l.jsx)("span", {
                            style: u.value,
                            children: e.priority,
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        style: u.section,
                        children: [
                          (0, l.jsx)("label", {
                            style: u.label,
                            children: "Description",
                          }),
                          (0, l.jsx)("p", {
                            style: u.description,
                            children: e.description,
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        style: u.section,
                        children: [
                          (0, l.jsx)("label", {
                            style: u.label,
                            children: "Created",
                          }),
                          (0, l.jsx)("span", {
                            style: u.value,
                            children: new Date(e.createdAt).toLocaleString(),
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        style: u.section,
                        children: [
                          (0, l.jsx)("label", {
                            style: u.label,
                            children: "Last Updated",
                          }),
                          (0, l.jsx)("span", {
                            style: u.value,
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
      const u = {
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
      function h() {
        const {
            tickets: e,
            loading: t,
            error: r,
            createTicket: o,
            updateTicket: c,
          } = (function () {
            const [e, t] = (0, i.useState)([]),
              [r, o] = (0, i.useState)(!0),
              [l, a] = (0, i.useState)(null),
              c = () => localStorage.getItem("token"),
              d = (0, i.useCallback)(async () => {
                try {
                  o(!0);
                  const e = c();
                  if (!e) throw new Error("Not authenticated");
                  const r = await n.A.get(`${s}/tickets`, {
                    headers: { Authorization: `Bearer ${e}` },
                  });
                  t(r.data), a(null);
                } catch (e) {
                  console.error("Error fetching tickets:", e),
                    a(e.response?.data?.error || e.message);
                } finally {
                  o(!1);
                }
              }, []);
            return (
              (0, i.useEffect)(() => {
                d();
              }, [d]),
              (0, i.useEffect)(() => {
                const e = setInterval(() => {
                  d();
                }, 3e3);
                return () => clearInterval(e);
              }, [d]),
              {
                tickets: e,
                loading: r,
                error: l,
                fetchTickets: d,
                createTicket: async (e) => {
                  try {
                    const r = c(),
                      i = await n.A.post(`${s}/tickets`, e, {
                        headers: { Authorization: `Bearer ${r}` },
                      });
                    return (
                      t((e) => [i.data, ...e]), { success: !0, ticket: i.data }
                    );
                  } catch (e) {
                    return (
                      console.error("Error creating ticket:", e),
                      {
                        success: !1,
                        error: e.response?.data?.error || e.message,
                      }
                    );
                  }
                },
                updateTicket: async (e, r) => {
                  try {
                    const i = c(),
                      o = await n.A.patch(`${s}/tickets/${e}`, r, {
                        headers: { Authorization: `Bearer ${i}` },
                      });
                    return (
                      t((t) => t.map((t) => (t._id === e ? o.data : t))),
                      { success: !0, ticket: o.data }
                    );
                  } catch (e) {
                    return (
                      console.error("Error updating ticket:", e),
                      {
                        success: !1,
                        error: e.response?.data?.error || e.message,
                      }
                    );
                  }
                },
                deleteTicket: async (e) => {
                  try {
                    const r = c();
                    return (
                      await n.A.delete(`${s}/tickets/${e}`, {
                        headers: { Authorization: `Bearer ${r}` },
                      }),
                      t((t) => t.filter((t) => t._id !== e)),
                      { success: !0 }
                    );
                  } catch (e) {
                    return (
                      console.error("Error deleting ticket:", e),
                      {
                        success: !1,
                        error: e.response?.data?.error || e.message,
                      }
                    );
                  }
                },
              }
            );
          })(),
          [p, u] = (0, i.useState)(!1),
          [h, y] = (0, i.useState)(null);
        return t && 0 === e.length
          ? (0, l.jsx)("div", {
              style: g.loading,
              children: (0, l.jsx)("p", { children: "Loading tickets..." }),
            })
          : r
          ? (0, l.jsxs)("div", {
              style: g.error,
              children: [
                (0, l.jsxs)("p", { children: ["Error: ", r] }),
                (0, l.jsx)("p", {
                  style: g.errorHint,
                  children: "Make sure you're logged in and the API is running",
                }),
              ],
            })
          : (0, l.jsxs)("div", {
              style: g.container,
              children: [
                (0, l.jsxs)("div", {
                  style: g.header,
                  children: [
                    (0, l.jsxs)("div", {
                      children: [
                        (0, l.jsx)("h1", {
                          style: g.title,
                          children: "Support Tickets",
                        }),
                        (0, l.jsxs)("p", {
                          style: g.subtitle,
                          children: [e.length, " ticket(s)"],
                        }),
                      ],
                    }),
                    (0, l.jsx)("button", {
                      onClick: () => u(!p),
                      style: g.newButton,
                      children: p ? "Cancel" : "+ New Ticket",
                    }),
                  ],
                }),
                p &&
                  (0, l.jsx)(a, {
                    onSubmit: async (e) => {
                      const t = await o(e);
                      return t.success && u(!1), t;
                    },
                    onCancel: () => u(!1),
                  }),
                (0, l.jsx)(d, { tickets: e, onTicketClick: y }),
                h &&
                  (0, l.jsx)(x, {
                    ticket: h,
                    onClose: () => y(null),
                    onUpdate: async (e, t) => {
                      await c(e, t);
                    },
                  }),
              ],
            });
      }
      const g = {
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
      o.createRoot(document.getElementById("root")).render((0, l.jsx)(h, {}));
    },
  },
]);
