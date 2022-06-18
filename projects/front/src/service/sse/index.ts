import EventEnum from '../../enum/event';

interface IEvent {
    data: string;
}

class SSEService {
    private eventSource: EventSource;
    public clientUuid: string = '';
    private registeredEvents: string[] = [];

    constructor() {
        this.eventSource = this.createConnection();
    }

    createConnection() {
        const eventSource = new EventSource(`${process.env.REACT_APP_BACKEND_HOST}/events/register`);
        eventSource.addEventListener('open', this.onOpen);
        eventSource.addEventListener('error', this.onError);
        eventSource.addEventListener(EventEnum.AUTHENTICATE, (ev: IEvent) => {
            this.clientUuid = JSON.parse(ev.data).clientUuid;
        });
        this.registeredEvents = [];
        return eventSource;
    }

    closeConnection() {
        this.eventSource.close();
    }

    /**
     * Register event function
     * @param id
     * @param callback
     * @returns 
     */
    registerEvent(id: EventEnum, callback: Function) : void {
        if (this.registeredEvents.find((event) => event === id)) {
            return;
        }
        this.registeredEvents.push(id);
        this.eventSource.addEventListener(id, (ev: IEvent) => callback(JSON.parse(ev.data)));
    }

    onError(ev: Event) {
        if (!this.eventSource) {
            return;
        }

        if (this.eventSource.readyState === EventSource.CLOSED) {
            this.eventSource = this.createConnection();
            return;
        }

        this.closeConnection();
        this.eventSource = this.createConnection();
        return;
    }

    onOpen(event: Event) {
        console.debug(event);
    }
}

export default new SSEService();
