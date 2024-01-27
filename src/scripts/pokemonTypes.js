const getTypeColorClass = (types) => {
    if (!types || types.length === 0) {
        return 'generic-color';
    }

    const primaryType = types[0].toLowerCase();
    return primaryType;
};

export { getTypeColorClass };
