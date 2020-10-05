function caesar(str, num, type) {
    if (type === "decode") num = num * -1;
    const new_arr = [];
    const re_arr = /[a-zA-Z]/;
    for (const c of str) {
        if (re_arr.test(c)) {
            const start = c === c.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            const diff = (c.charCodeAt(0) - start);
            const sh = num >= 0 ? diff + num : diff + Math.abs(26 - Math.abs(num));
            const code = sh % 26 + start;
            new_arr.push(String.fromCharCode(code));
        } else {
            new_arr.push(c);
        }
    }
    return new_arr.join('');
}

module.exports = {
    caesar
}