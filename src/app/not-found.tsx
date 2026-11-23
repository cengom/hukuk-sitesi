// Dil öneki eşleşmeyen istekler için yedek 404.
export default function GlobalNotFound() {
  return (
    <html lang="tr">
      <body style={{ fontFamily: "system-ui", background: "#faf7f0", color: "#1c1f26", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center", padding: 24 }}>
          <p style={{ letterSpacing: "0.12em", fontSize: 12, color: "#8a6516" }}>404</p>
          <h1 style={{ fontWeight: 300, fontSize: 36 }}>Sayfa bulunamadı</h1>
          <a href="/" style={{ color: "#8a6516" }}>Ana sayfaya dön</a>
        </div>
      </body>
    </html>
  );
}
