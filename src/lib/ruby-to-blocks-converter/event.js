/* global Opal */
import _ from 'lodash';

const KeyOptions = [
    'space',
    'left arrow',
    'right arrow',
    'down arrow',
    'up arrow',
    'any',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
];

/**
 * Event converter
 */
const EventConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) &&
            name === 'when' &&
            args.length >= 1 && args[0].type === 'sym' &&
            rubyBlockArgs && rubyBlockArgs.length === 0 &&
            rubyBlock) {
            switch (args[0].value) {
            case 'flag_clicked':
            case 'clicked':
                if (args.length === 1) {
                    let opcode;
                    switch (args[0].value) {
                    case 'flag_clicked':
                        opcode = 'event_whenflagclicked';
                        break;
                    case 'clicked':
                        opcode = 'event_whenthisspriteclicked';
                        break;
                    }
                    block = this._createBlock(opcode, 'hat');
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'key_pressed':
                if (args.length === 2 && this._isString(args[1]) && KeyOptions.indexOf(args[1].toString()) >= 0) {
                    block = this._createBlock('event_whenkeypressed', 'hat');
                    this._addField(block, 'KEY_OPTION', args[1]);
                    this._setParent(rubyBlock, block);
                }
                break;
            }
        }
        return block;
    }
};

export default EventConverter;