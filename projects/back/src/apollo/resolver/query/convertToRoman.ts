import EventEnum from '@enums/event';
import numberConverterService from '@services/numberConverter';
import sseService from '@services/sse';

export interface IArgs {
    arabicNumber: number;
    clientUuid: string;
}

/**
 * convert to roman number
 * send message
 * @param {null} _
 * @param {IArgs} args
 * @returns {boolean}
 */
export default (_: null, { arabicNumber, clientUuid } : IArgs) : boolean => sseService.sendMessageToClientUuid(
    clientUuid,
    {
        event: EventEnum.CONVERT_TO_ROMAN,
        data: JSON.stringify({
            romanNumber: numberConverterService.toRoman(arabicNumber),
        }),
    },
);

