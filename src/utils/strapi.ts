import { BlocksContent } from '@strapi/blocks-react-renderer';

const createId = (text: string) => {
    return text
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^0-9A-Z_-\s]/gi, '');
};

export const getHeaderId = (children: any) => {
    const name = (children as any)[0]?.props?.text || '';
    const id = createId(name);

    return { id, name };
};

export const getHeadings = (content: BlocksContent) => {
    const headers: { id: string; name: string, level: number }[] = [];

    if(Array.isArray(content)) {
        for (const { children, type, level } of content as any) {
            if (type === 'heading' && children[0].type === 'text') {
                if (children[0].type === 'text') {
                    const text = children[0].text;
                    if (text.trim().length > 0) {
                        headers.push({
                            name: text,
                            id: createId(text),
                            level
                        });
                    }
                }
            }
        }
    }

    

    return headers;
};