'use-strict';

const WordType = require('./../model/WordType');

const getWordTypes = async (req, resp) => {
    const typeid = req.params.wordtypeid;

    try {
        const wordtypes = await mongoGetAllWordTypes({ WordTypeID: typeid });
        const result = wordtypes.map(wordtype => {
            return { '_id': wordtype._id, 'wordtypeid': wordtype.WordTypeID, 'word': wordtype.Word }
        });
        resp.send(result);
    } catch (exception) {
        resp.status(400).send(exception.message);
    }
};

const postWordType = async (req, resp) => {
    try {
        const wordtype = await mongoGetWordType({
            WordTypeID: req.body.wordtypeid,
            Word: req.body.word
        });
        if (wordtype) {
            resp.status(409).send('word type already exists!');
            return;
        }

        const savedWordType = await saveWordType(req.body);
        resp.send({ message: `wordtype ${savedWordType._id} saved successfully`, status: 200 });
    } catch (exception) {
        resp.status(400).send(exception.message);
    }
};

/*
 * postWordTypes saves multiple wordtype documents to mongo
 * verifies reqest body , checks if a type exists before saving new type
*/
const postWordTypes = async (req, resp) => {

    if (!Array.isArray(req.body)) {
        resp.status(400).send(`Invalid body. Expected type array instead, got type ${typeof req.body}`);
        return;
    }

    const wordtypes = [...req.body];
    const result = { message: '', savedItems: 0, status: 200 };

    for (var i = 0; i < wordtypes.length; i++) {
        const wordtype = wordtypes[i];
        try {
            foundWordType = await mongoGetWordType({ WordTypeID: wordtype.wordtypeid, Word: wordtype.word });
            if (foundWordType) {
                console.log(`word type ${JSON.stringify(wordtype)} already exists !`);
                continue;
            }

            await saveWordType(wordtype);
            result.savedItems++;

        } catch (exception) {
            console.log(`Error saving word type  ${wordtype.wordtypeid}:${wordtype.word}`, exception.message);
        }
    }

    result.message = result.savedItems ? 'word type(s) saved successfully' : 'word type(s) already exist!'
    resp.send(result);
};

//mongoGetWordType gets a single word type from mongodb
const mongoGetWordType = async (filter) => {
    const wordtype = await WordType.findOne(filter);
    return wordtype;
};

const mongoGetAllWordTypes = async (filter) => {
    const wordtypes = await WordType.find(filter);
    return wordtypes;
};

//saveWordType saves a single word type to mongodb
const saveWordType = async wordtype => {
    const newWordType = new WordType({
        WordTypeID: wordtype.wordtypeid,
        Word: wordtype.word
    });

    return await newWordType.save();
};

module.exports = {
    GetWordTypes: getWordTypes,
    PostWordType: postWordType,
    PostWordTypes: postWordTypes
};