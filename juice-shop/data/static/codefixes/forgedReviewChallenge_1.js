"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductReviews = updateProductReviews;
function updateProductReviews() {
    return (req, res, next) => {
        const user = security.authenticatedUsers.from(req);
        db.reviewsCollection.update({ _id: req.body.id }, { $set: { message: req.body.message, author: user.data.email } }, { multi: true }).then((result) => {
            res.json(result);
        }, (err) => {
            res.status(500).json(err);
        });
    };
}
