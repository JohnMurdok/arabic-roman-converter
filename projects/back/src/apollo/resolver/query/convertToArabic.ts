import EventEnum from '@enums/event';
import numberConverterService from '@services/numberConverter';
import sseService from '@services/sse';

export interface IArgs {
    clientUuid: string;
    romanNumber: string;
}

/**
 * convert to arabic number
 * Send message to client
 * @param {null} _
 * @param {IArgs} args
 * @returns {boolean}
 */
export default (_: null, { romanNumber, clientUuid } : IArgs): boolean => sseService.sendMessageToClientUuid(
    clientUuid,
    {
        event: EventEnum.CONVERT_TO_ARABIC,
        data: JSON.stringify({
            arabicNumber: numberConverterService.toArabic(romanNumber),
        }),
    },
);
