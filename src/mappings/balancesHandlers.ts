import {SubstrateEvent} from "@subql/types";
import {timestamp, eventId} from "./globalFunction";
import {Transfer} from "../types/models";

import {Balance} from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promise<void> {

    const {event: {data: [from,to, amount]}} = event;

    logger.info('/n TRANSFER IDENTIFIED: From ' + from + ' to ' +  to + ' with an Amount :' + amount + '/n' );
    const addressFrom = from.toString();
    const addressTo = to.toString();
    const amountBalance = (amount as Balance).toBigInt();

    const element = new Transfer(eventId(event));

    element.timestamp = timestamp(event.block);
    element.transferFrom = addressFrom;
    element.transferTo = addressTo;
    element.transferAmount = amountBalance;

    await element.save();

    logger.info('/n TRANSFER SAVED:' + from + ' and ' +  to + ' and Amount : ' + amount + '/n' );

}
