/**
 * Runs after `craco build`. For each page below it writes
 * build/<route>/index.html with the page's real HTML already inside
 * <div id="root">, so the page can be read without JavaScript (payment-gateway
 * compliance checks, search engines). In a browser the app loads as usual and
 * takes over. nginx's `try_files $uri $uri/ /index.html` serves these files.
 */
const fs = require("fs");
const path = require("path");
const Module = require("module");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const BUILD = path.join(ROOT, "build");
const SITE = "https://therakshak.in";

const PAGES = [
  ["/terms", "Terms & Conditions", "pages/Terms"],
  ["/privacy", "Privacy Policy", "pages/Privacy"],
  ["/refund-policy", "Cancellation & Refund Policy", "pages/Refund"],
  ["/cancellation-policy", "Cancellation & Refund Policy", "pages/Refund"],
  ["/shipping-policy", "Shipping & Delivery Policy", "pages/ServiceDelivery"],
  ["/service-delivery", "Shipping & Delivery Policy", "pages/ServiceDelivery"],
  ["/contact", "Contact Us", "pages/Contact"],
  ["/dpdp", "DPDP Consent Notice", "pages/DPDP"],
  ["/pricing", "Pricing", "pages/Pricing"],
  ["/about", "About", "pages/About"],
  ["/support", "Support", "pages/Support"],
  ["/become-a-guard", "Become a Guard", "pages/BecomeGuard"],
];

// babel-preset-react-app emits CommonJS for Node in its "test" mode.
process.env.NODE_ENV = process.env.BABEL_ENV = "test";

// Same "@/" alias as craco.config.js; styles are already in the built CSS.
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  const target = request.startsWith("@/") ? path.join(SRC, request.slice(2)) : request;
  return resolveFilename.call(this, target, ...rest);
};
require.extensions[".css"] = () => {};
require("@babel/register")({
  babelrc: false,
  configFile: false,
  presets: [[require.resolve("babel-preset-react-app"), { runtime: "automatic" }]],
  extensions: [".js", ".jsx"],
  only: [SRC],
  cache: false,
});

const { createElement: h } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { StaticRouter } = require("react-router");
const load = (file) => require(path.join(SRC, file)).default;
const Header = load("components/Header");
const Footer = load("components/Footer");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error("build/index.html has no empty <div id=\"root\"> to fill");
}

for (const [route, title, file] of PAGES) {
  const Page = load(file);
  // Same layout as PublicLayout in App.js.
  const body = renderToStaticMarkup(
    h(StaticRouter, { location: route },
      h("div", { className: "App", "data-testid": "app-root" },
        h(Header), h("main", { className: "pt-20" }, h(Page)), h(Footer))));
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)} | RAKSHAK</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${SITE}${route}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${SITE}${route}"`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const out = path.join(BUILD, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`prerendered ${route} (${Math.round(body.length / 1024)} KB)`);
}
