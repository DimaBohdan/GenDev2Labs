const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const colors = ['red', 'blue', 'green;', 'purple'];

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
    console.log(`%c${day}`, `color: ${color};`);
}