'use-strict';

const Sentence = require('./../model/Sentence');

const getSentences = async (req, resp) => {
    try {
        const sentences = await mongoGetAllSentences({});
        const result = sentences.map(sentenceObj => {
            return { '_id': sentenceObj._id, 'sentence': sentenceObj.Sentence }
        });
        resp.send(result);
    } catch (exception) {
        console.log("Error fetching all sentences :", exception.message);
        resp.status(400).send(exception.message);
    }
};


const postSentence = async (req, resp) => {
    try {
        const sentence = await mongoGetSentence({
            Sentence: req.body.sentence,
        });

        if (sentence) {
            resp.status(409).send('sentence already exists!');
            return;
        }

        const savedSentence = await saveSentence(req.body);
        resp.send({ message: `sentence ${savedSentence._id} saved successfully`, status: 200 });
    } catch (exception) {
        resp.status(400).send(exception.message);
    }
};

const mongoGetSentence = async (filter) => {
    const sentence = await Sentence.findOne(filter);
    return sentence;
};

const mongoGetAllSentences = async (filter) => {
    const sentences = await Sentence.find(filter);
    return sentences;
}

const saveSentence = async sentenceObj => {
    const newSentence = new Sentence({
        Sentence: sentenceObj.sentence,
    });

    return await newSentence.save();
}


module.exports = {
    GetSentences: getSentences,
    PostSentence: postSentence,
};