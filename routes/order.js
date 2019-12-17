var express = require('express');
var router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();
/* GET order listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-by-id/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    let orderRef = db.collection('order').doc(orderId);
    let getDoc = orderRef.get().then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            res.status(400).send({
                code: 400,
                message: 'No such document!'
            })
        } else {
            console.log('Document data: ', doc.data());
            res.status(200).send(JSON.stringify(doc.data()));
        }
    }).catch(err => {
        console.log('Error getting document', err);
        res.status(400).send({
            code: 400,
            message: err
        })
    })
})

module.exports = router;
