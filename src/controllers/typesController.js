'use-strict';

const Types = require('./../model/Types');

const getTypes = async (req, resp) => {
    try {
        const types = await mongoGetAllTypes({});
        const result = types.map(typeObj => {
            return { '_id': typeObj._id, 'type': typeObj.Type }
        });
        resp.send(result);
    } catch (exception) {
        console.log("Error fetching all types :", exception.message);
        resp.status(400).send(exception.message);
    }
};

const postType = async (req, resp) => {
    try {
        const type = await mongoGetType({
            Type: req.body.type,
        });

        if (type) {
            resp.status(409).send('type already exists!');
            return;
        }

        const savedType = await saveType(req.body);
        resp.send({ message: `type ${savedType._id} saved successfully`, status: 200 });
    } catch (exception) {
        resp.status(400).send(exception.message);
    }
};

const postTypes = async (req, resp) => {
    if (!Array.isArray(req.body)) {
        resp.status(400).send(`Invalid body. Expected type array instead, got type ${typeof req.body}`);
        return;
    }

    const types = [...req.body];
    const result = { message: '', savedItems: 0, status: 200 };

    for (var i = 0; i < types.length; i++) {
        const typeObj = types[i];
        try {
            foundType = await mongoGetType({ Type: typeObj.type });
            if (foundType) {
                console.log(`type ${JSON.stringify(typeObj)} already exists !`);
                continue;
            }

            await saveType(typeObj);
            result.savedItems++;

        } catch (exception) {
            console.log(`Error saving type  ${typeObj.typeid}`, exception.message);
        }
    }

    result.message = result.savedItems ? 'type(s) saved successfully' : 'type(s) already exist!'
    resp.send(result);
};

//mongoGetType gets a single type of word from mongodb
const mongoGetType = async (filter) => {
    const type = await Types.findOne(filter);
    return type;
};

const mongoGetAllTypes = async (filter) => {
    const types = await Types.find(filter);
    return types;
};

//saveType saves a single type of word to mongodb
const saveType = async typeObj => {
    const newType = new Types({
        Type: typeObj.type,
    });

    return await newType.save();
};



module.exports = {
    GetTypes: getTypes,
    PostType: postType,
    PostTypes: postTypes,
};