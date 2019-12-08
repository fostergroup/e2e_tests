export default function utils() {
    this.randomString = () => {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        let string_length = 8;
        let randomstring = '';
        for (let i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };
    this.generateSnils = () => {
        const rnd = Math.floor(Math.random() * 999999999);
        const number = this.leftPad('' + rnd, 9, '0');

        let sum = number
            .split('')
            .map((val, i) => parseInt(val) * (9 - i))
            .reduce((a, b) => a + b);

        if (sum > 101) {
            sum = sum % 101
        }

        const checkSum = sum === 100 || sum === 101 ? '00' : this.leftPad('' + sum, 2, '0');
        return number + checkSum;
    };

    this.leftPad = (str, len, ch) => {
        const length = len - str.length + 1;
        return length > 0 ? new Array(length).join(ch) + str : str;
    }
};