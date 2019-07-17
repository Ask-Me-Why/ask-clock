export const sessionStorage = {
    getItem(key) {
        let _r = window.sessionStorage.getItem(key);
        if (/^\{.*\}$/.test(_r)) _r = JSON.parse(_r);
        return _r;
    },
    setItem(key, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value);
        window.sessionStorage.setItem(key, value);
    },
    removeItem(key) {
        if (Object.prototype.toString.call(key) === '[object String]') {
            window.sessionStorage.removeItem(key);
            return;
        }
        if (Object.prototype.toString.call(key) === '[object Array]' && key.length === 0) {
            window.sessionStorage.removeItem(key);
        } else {
            key.map(index => {
                window.sessionStorage.removeItem(index);
            });
        }
    }
};
export const localStorage = {
    getItem(key) {
        let _r = window.localStorage.getItem(key);
        if (/^\{.*\}$/.test(_r)) _r = JSON.parse(_r);
        return _r;
    },
    setItem(key, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value);
        window.localStorage.setItem(key, value);
    },
    removeItem(key) {
        if (Object.prototype.toString.call(key) === '[object String]') {
            window.localStorage.removeItem(key);
            return;
        }
        if (Object.prototype.toString.call(key) === '[object Array]' && key.length === 0) {
            window.localStorage.removeItem(key);
        } else {
            key.map(index => {
                window.localStorage.removeItem(index);
            });
        }
    }
};
