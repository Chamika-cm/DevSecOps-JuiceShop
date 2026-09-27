"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedirectAllowed = exports.redirectAllowlist = void 0;
exports.redirectAllowlist = new Set([
    'https://github.com/juice-shop/juice-shop',
    'https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm',
    'https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW',
    'https://etherscan.io/address/0x0f933ab9fcaaa782d0279c300d73750e1311eae6',
    'http://shop.spreadshirt.com/juiceshop',
    'http://shop.spreadshirt.de/juiceshop',
    'https://www.stickeryou.com/products/owasp-juice-shop/794',
    'http://leanpub.com/juice-shop'
]);
const isRedirectAllowed = (url) => {
    let allowed = false;
    for (const allowedUrl of exports.redirectAllowlist) {
        allowed = allowed || url.includes(escapeHTML(allowedUrl));
    }
    return allowed;
};
exports.isRedirectAllowed = isRedirectAllowed;
const escapeHTML = str => {
    return str.replace(/[&<>'"]/g, tag => {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]);
    });
};
