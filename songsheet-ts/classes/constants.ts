export const FONTS = {
    anonymous: {
        normal: 'AnonymousPro-Regular.ttf',
        bold: 'AnonymousPro-Bold.ttf',
        italics: 'AnonymousPro-Italic.ttf',
        bolditalics: 'AnonymousPro-BoldItalic.ttf',
    },
    ubuntu: {
        normal: 'UbuntuMono-R.ttf',
        bold: 'UbuntuMono-B.ttf',
        italics: 'UbuntuMono-RI.ttf',
        bolditalics: 'UbuntuMono-BI.ttf',
    }
};

export const DEFAULT_FONT = 'ubuntu';
export const MARKUP_REG = /(\*[^*]|\*\*|<r>|<b>|<g>)/g;
export const MARKUP_REP_REG = /(\*|<r>|<b>|<g>)/g;