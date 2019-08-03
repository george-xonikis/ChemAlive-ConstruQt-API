export const show = () => {
    return {
        type: 'SHOW'
    };
};

export const hide = () => {
    return {
        type: 'HIDE'
    };
};

export const save = (smiles) => {
    return {
        type: 'SAVE',
        payload: smiles
    };
};
