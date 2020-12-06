import { Services } from 'nk-js-library';
import Request from '../helpers/request.helper';
interface NLMessage extends Services.PubSubService.Message {
    request: Request;
}
interface NLSubscriber {
    processMessage(message: NLMessage): any;
}
declare const addSubscriber: (messageType: string, subscriber: NLSubscriber) => void;
declare const addSubscriberAll: (messageTypes: any, subscriber: NLSubscriber) => void;
declare const publishMessage: (message: NLMessage) => void;
declare const removeSubscriber: (messageType: string, subscriber: NLSubscriber) => void;
export { addSubscriber, addSubscriberAll, publishMessage, removeSubscriber, NLMessage, NLSubscriber };
