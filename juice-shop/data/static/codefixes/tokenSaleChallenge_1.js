"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routing = void 0;
exports.oauthMatcher = oauthMatcher;
exports.tokenMatcher = tokenMatcher;
exports.token1 = token1;
exports.token2 = token2;
{
    matcher: oauthMatcher,
        data;
    {
        params: (window.location.href).substr(window.location.href.indexOf('#'));
    }
    component: OAuthComponent;
}
{
    path: atob('dG9rZW5zYWxlLWljby1lYQ=='),
        component;
    TokenSaleComponent;
}
{
    path: 'coding-challenge/:challengeKey',
        loadComponent;
    async () => await loadCodingChallenge();
}
{
    path: '403',
        component;
    ErrorPageComponent;
}
{
    path: '**',
        component;
    SearchResultComponent;
}
exports.Routing = RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' });
function oauthMatcher(url) {
    if (url.length === 0) {
        return null;
    }
    const path = window.location.href;
    if (path.includes('#access_token=')) {
        return ({ consumed: url });
    }
    return null;
}
function tokenMatcher(url) {
    if (url.length === 0) {
        return null;
    }
    const path = url[0].toString();
    if (path.match((token1(25, 184, 174, 179, 182, 186) + (36669).toString(36).toLowerCase() + token2(13, 144, 87, 152, 139, 144, 83, 138) + (10).toString(36).toLowerCase()))) {
        return ({ consumed: url });
    }
    return null;
}
function token1(...args) {
    const L = Array.prototype.slice.call(args);
    const D = L.shift();
    return L.reverse().map(function (C, A) {
        return String.fromCharCode(C - D - 45 - A);
    }).join('');
}
function token2(...args) {
    const T = Array.prototype.slice.call(arguments);
    const M = T.shift();
    return T.reverse().map(function (m, H) {
        return String.fromCharCode(m - M - 24 - H);
    }).join('');
}
