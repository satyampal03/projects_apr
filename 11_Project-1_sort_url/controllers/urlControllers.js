const {nanoid} = require('nanoid');
const URL = require('../model/url');

async function handleGenerateSortURL (req, res){

    const body = req.body;

    console.log(body);

    if(!body.url) return res.status(400).json({message :'url is required'});

    const shortId = nanoid(8);
    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        visitHistory : []
    })

    return res.json({id : shortId});
}   


module.exports = {
    handleGenerateSortURL,
}