import { Services } from 'nk-js-library';
import Request from '../helpers/request.helper';

const org = Services.PubSubService.Organizer

interface NLMessage extends Services.PubSubService.Message {
    request: Request
}

interface NLSubscriber {
    processMessage(message: NLMessage): any
}

const addSubscriber = (messageType: string, subscriber: NLSubscriber) => {
    return org.addSubscriber(messageType, subscriber);
}

const addSubscriberAll = (messageTypes: any, subscriber: NLSubscriber) => {
    return org.addSubscriberAll(messageTypes, subscriber);
}

const publishMessage = (message: NLMessage) => {
    return org.publishMessage(message);
}

const removeSubscriber = (messageType: string, subscriber: NLSubscriber) => {
    return org.removeSubscriber(messageType, subscriber)
}

export {
    addSubscriber,
    addSubscriberAll,
    publishMessage,
    removeSubscriber,
    NLMessage,
    NLSubscriber
}
