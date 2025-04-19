/* 
Implement a priority queue that allows:
•	Retrieving both the highest and lowest priority elements from any end.
•	Retrieving elements based on order of insertion (FIFO/LIFO) from either end.

Requirements:
1.	Core Priority Queue Functionality
•	Support inserting elements with an associated priority value.
•	Allow peeking and dequeuing elements based on priority order (highest or lowest).
•	Allow peeking and dequeuing elements based on insertion order (oldest or newest).
2.	Operations:
•	enqueue(item, priority): Insert an element with a priority.
•	dequeue(highest, lowest, oldest, newest)
•	peek(highest, lowest, oldest, newest)
*/

type DequeueMode = 'highest' | 'lowest' | 'oldest' | 'newest';

interface Node<T> {
  item: T;
  priority: number;
  insertedAt: number;
}

export class Queue<T> {
  private queue: Node<T>[] = [];
  private timestamp = 0;

  enqueue(item: T, priority: number): void {
    this.queue.push({ item, priority, insertedAt: this.timestamp++ });
  }

  dequeue(mode: DequeueMode): T | undefined {
    if (this.queue.length === 0) return undefined;
    let index = this.findIndexByMode(mode);
    if (index === -1) return undefined;
    const [removed] = this.queue.splice(index, 1);
    return removed.item;
  }

  peek(mode: DequeueMode): T | undefined {
    if (this.queue.length === 0) return undefined;
    const index = this.findIndexByMode(mode);
    if (index === -1) return undefined;
    return this.queue[index].item;
  }

  private findIndexByMode(mode: DequeueMode): number {
    const comparators: Record<DequeueMode, (a: Node<T>, b: Node<T>) => boolean> = {
      highest: (a, b) => a.priority > b.priority,
      lowest:  (a, b) => a.priority < b.priority,
      oldest:  (a, b) => a.insertedAt < b.insertedAt,
      newest:  (a, b) => a.insertedAt > b.insertedAt,
    };
    const comparator = comparators[mode];
    if (!comparator || this.queue.length === 0) return -1;
    return this.queue.reduce((bestIdx, current, idx, arr) =>
      comparator(current, arr[bestIdx]) ? idx : bestIdx, 0);
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  size(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue = [];
    this.timestamp = 0;
  }
}
