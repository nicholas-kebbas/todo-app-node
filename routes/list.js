import { Router } from 'express';
const router = Router();

/* TodoList */

/* CREATE list */

router.post('/', async (req, res, next) => {
    let list;
    try {
        list = await req.context.models.List.create({
            title: req.body.title,
        });
    } catch (err) {
        next(err);
    }
    return res.send(list);
});

router.get('/', async (req, res) => {
    const lists = await req.context.models.List.findAll({
        include: [{ // Notice `include` takes an ARRAY
            model: req.context.models.Item
        }]
    });
    return res.send(lists);
});

router.get('/:listId', async (req, res) => {
    const list = await req.context.models.List.findByPk(
        req.params.listId, {
            include: [
                {
                    model: req.context.models.Item,
                },
            ],
        }
    );
    return res.send(list);
});

router.delete('/:listId', async (req, res) => {
    const result = await req.context.models.List.destroy({
        where: { id: req.params.listId },
    });

    return res.send(true);
});

/* TodoItem */
/* Create an item for a certain list */
router.post('/:listId/item', async (req, res, next) => {
    let item;
    const list = await req.context.models.List.findByPk(
        req.params.listId,
    );
    try {
        item = await req.context.models.Item.create({
            text: req.body.text,
            complete: 0,
            listId: req.params.listId
        });
    } catch (err) {
        next(err);
    }
    return res.send(item);
});

/* View a TODOItem */
router.get('/item/:itemId', async (req, res) => {
    const item = await req.context.models.Item.findByPk(
        req.params.itemId,
    );
    return res.send(item);
});-

/* Update a TODOlist item, mark it as done */
router.put('/item/:itemId',  async (req, res) => {
    try {
        const result = await req.context.models.Item.update(
            { complete: 1},
            { where: {id: req.params.itemId} }
            );
        return res.send(result);
    } catch(err) {
        res.send(err);
    }
});

/* Delete a TODOList Item */
router.delete('/item/:itemId', async (req, res) => {
    const result = await req.context.models.Item.destroy({
        where: {id: req.params.itemId},
    });

    return res.send(true);
});

export default router;
