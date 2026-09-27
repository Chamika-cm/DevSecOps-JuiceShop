"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routing = void 0;
exports.oauthMatcher = oauthMatcher;
{
    matcher: oauthMatcher,
        data;
    {
        params: (window.location.href).substr(window.location.href.indexOf('#'));
    }
    component: OAuthComponent;
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
