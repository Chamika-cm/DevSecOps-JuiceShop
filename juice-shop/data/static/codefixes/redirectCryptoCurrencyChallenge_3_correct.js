"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedirectAllowed = exports.redirectAllowlist = void 0;
exports.redirectAllowlist = new Set([
    'https://github.com/juice-shop/juice-shop',
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
