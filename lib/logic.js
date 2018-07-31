
'use strict';

/**
 * Eternal Trusts transaction
 * @param {com.eternaltrusts.privatenetwork.EternalTrustsTransaction} etTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('com.eternaltrusts.privatenetwork.EternalTrustsAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('com.eternaltrusts.privatenetwork', 'EternalTrustsEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}



