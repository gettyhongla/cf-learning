export default {
  async fetch(request) {
    const userAgent = request.headers.get("user-agent") || "";
    const cookieHeader = request.headers.get("cookie") || "";

    const bypassRedirect = cookieHeader
      .split(";")
      .map(c => c.trim())
      .some(c => c === "cf-noredir=true");

    if (userAgent.toLowerCase().includes("curl") && !bypassRedirect) {
      return Response.redirect(
        "https://developers.cloudflare.com/workers/about/",
        302
      );
    }

    return fetch(request);
  },
};
