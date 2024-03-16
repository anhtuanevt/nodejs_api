const ItemService = require("../services/item.service")

class ItemController {

    static getItem = async (req, res, next) => {
        const { id } = req.params;
        const items = id ? await ItemService.getItem(id) : await ItemService.getAllItems();
        
        res.send({
            message: 'success',
            metadata: items
        })
    }

    static addItem = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await ItemService.addItem(req.body)
        })
    }

    static updateItem = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await ItemService.updateItem(req.body)
        })
    }

    static updateStatusItem = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await ItemService.updateItem(req.body)
        })
    }

    static updateStatus = async (req, res, next) => {
        const { ids, status } = req.body;
        let updatedItems;

        if (Array.isArray(ids)) {
            updatedItems = await ItemService.updateMultipleItemsStatus(ids, status);
        } else {
            updatedItems = await ItemService.updateItemStatus(ids, status);
        }

        res.send({
            message: 'success',
            metadata: updatedItems
        })
    }

    static deleteItems = async (req, res, next) => {
        const { ids } = req.body;
        let updatedItems;

        if (Array.isArray(ids)) {
            updatedItems = await ItemService.deleteItems(ids);
        } else {
            updatedItems = await ItemService.deleteItem(ids);
        }

        res.send({
            message: 'success',
            metadata: updatedItems
        })
    }
    
}

module.exports = ItemController