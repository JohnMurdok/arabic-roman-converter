import EventEnum from '@enums/event';

export default interface IEventMessage {
    id?: string;
    event: EventEnum;
    data: string; 
}
