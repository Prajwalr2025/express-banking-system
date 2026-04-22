// LinkedList.js
const Node = require('./Node');

class LinkedList {
    constructor() {
        this.head = null; // The start of the list
    }

    // Method to add a new record to the end of the list
    append(data) {
        const newNode = new Node(data);

        // If the list is empty, make the new node the head
        if (!this.head) {
            this.head = newNode;
            return;
        }

        // Otherwise, traverse to the end of the list
        let current = this.head;
        while (current.next) {
            current = current.next;
        }

        // Add the new node at the end
        current.next = newNode;
    }

    // Method to retrieve all records as an array (useful for displaying history)
    getAll() {
        let current = this.head;
        let records = [];

        while (current) {
            records.push(current.data);
            current = current.next;
        }

        return records;
    }
}

module.exports = LinkedList;