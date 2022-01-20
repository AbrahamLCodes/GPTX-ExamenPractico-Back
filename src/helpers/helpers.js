module.exports = {
    hasAllKeys: (keys, object) => {
        let has = true;
        keys.forEach(key => {
            if (!Object.hasOwnProperty.bind(object)(key)) {
                has = false;
            }
        });
        return has;
    }
}