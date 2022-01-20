module.exports = {
    hasAllKeys: (keys, object) => {
        let has = true;
        console.log("BODDY asdasd", object);
        keys.forEach(key => {
            if (!Object.hasOwnProperty.bind(object)(key)) {
                has = false;
            }
        });
        console.log("HAS ALL KEYS?", has);
        return has;
    }
}