const fs = require('node:fs')

const slugify = require('slugify');

const { AuthError } = require('../core/error.response')
const ItemModel = require('../databases/item/item.model'); 
const { formatSelectToArray } = require('../helper');
const statusEnumValues = ItemModel.schema.path('status').enumValues;

class UserService {
    
    static getAllItems = async ({ select }) => {
        const items = await ItemModel.find({})
            .sort()
            .skip()
            .limit()
            .select(formatSelectToArray(select))
            .lean()
        return items;
    }

    static getItem = async (itemId) =>{
        const item = await ItemModel.findById(itemId)
        if (!item) {
            throw new Error('Item not found');
        }
        return item;
    }

    static addItem = async (itemData) => {
        // create slug
        let slug = slugify(itemData.name, { lower: true, strict: true })
        let uniqueSlug = slug;
        let count = 0

        while (await ItemModel.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${++count}`;
        }
        itemData.slug = uniqueSlug;

        const newItem = new ItemModel(itemData);
        await newItem.save();
        return newItem;
    }

    static updateItem = async (itemData) => {
        const item = await ItemModel.findByIdAndUpdate(itemData.id, itemData, { new: true });
        const currentItem = await ItemModel.findById(itemData.id)
        const newStatus = currentItem.status
        if (!statusEnumValues.includes(newStatus)) {
            throw new Error('Invalid status value');
        }

        if (!item) {
            throw new Error('Item not found');
        }

        if (!itemData.name || itemData.name.trim().length === 0) {
            throw new Error('No update: "name" is null or blank.');
        }

        if (itemData.name && itemData.name !== currentItem.name) {
            let newSlug = slugify(itemData.name, { lower: true, strict: true });
            let uniqueSlug = newSlug;
            let count = 0;

            while (await ItemModel.findOne({ slug: uniqueSlug, _id: { $ne: itemData.id } })) {
                uniqueSlug = `${newSlug}-${++count}`;
            }

            itemData.slug = uniqueSlug;
        } 

        const updatedItem = await ItemModel.findByIdAndUpdate(itemData.id, itemData, { new: true });
        return updatedItem, newStatus;
    }


    // update status
    static updateItemStatus = async (ItemIds, status) => {
        const item = await ItemModel.findById(ItemIds);

        if (!statusEnumValues.includes(status)) {
            throw new Error('Invalid status value');
        }
        
        if (!item) {
            throw new Error('Item not found');
        }
        const updateResult = await ItemModel.findByIdAndUpdate(ItemIds, { status: status }, { new: true });
        return updateResult
    }

    static updateMultipleItemsStatus = async (ItemIds, status) => {

        if (!statusEnumValues.includes(status)) {
            throw new Error('Invalid status value');
        }

        const updateResult = await ItemModel.updateMany(
            { _id: { $in: ItemIds } },
            { $set: { status: status } }
        );

        if (updateResult.matchedCount === 0) {
            throw new Error('No items found with the provided IDs');
        }

        return updateResult
    }

    // delete items
    static deleteItem = async (ItemIds) => {
        const deleteResult = await ItemModel.findByIdAndDelete(ItemIds);
            if (!deleteResult) {
                throw new Error('Item not found');
            }
            return deleteResult;
    }
    
    static deleteItems = async (ItemIds) => {
        const deleteResult = await ItemModel.deleteMany({
            _id: { $in: ItemIds }
        });
        if (deleteResult.deletedCount === 0) {
            throw new Error('No items found to delete');
        }
        return deleteResult;
    }
}

module.exports = UserService;