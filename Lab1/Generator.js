const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const colors = ['\x1b[31m', '\x1b[34m', '\x1b[32m', '\x1b[35m'];

function* cyclicArray(array) {
    let index = 0;
    while (true) {
        yield array[index];
        index = (index + 1) % array.length;
    }
}

const dayIter = cyclicArray(days);
const colorIter = cyclicArray(colors);

for (let i = 0; i < 7; i++) {
    const color = colorIter.next().value;
    const day = dayIter.next().value;
    console.log(color + day + "\x1b[0m");
}
