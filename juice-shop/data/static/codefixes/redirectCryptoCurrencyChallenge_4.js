"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedirectAllowed = exports.redirectAllowlist = void 0;
exports.redirectAllowlist = new Set([
    'https://github.com/juice-shop/juice-shop',
    'https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm',
    'https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW',
    'http://shop.spreadshirt.com/juiceshop',
    'http://shop.spreadshirt.de/juiceshop',
    'https://www.stickeryou.com/products/owasp-juice-shop/794',
    'http://leanpub.com/juice-shop'
]);
const isRedirectAllowed = (url) => {
    let allowed = false;
    for (const allowedUrl of exports.redirectAllowlist) {
        allowed = allowed || url.includes(allowedUrl);
    }
    return allowed;
};
exports.isRedirectAllowed = isRedirectAllowed;
