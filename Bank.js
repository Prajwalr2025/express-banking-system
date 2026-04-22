// Bank.js
const TreeNode = require('./TreeNode');
const LinkedList = require('./LinkedList');

class Bank {
    constructor() {
        this.accountsRoot = null; // The root of our Binary Search Tree for accounts
        this.transactionHistory = new LinkedList(); // Linear log of all operations
    }

    // Phase 3 Requirement: Add new accounts using account number and balance
    addAccount(accountNumber, balance) {
        const newAccount = new TreeNode(accountNumber, balance);

        // If the bank has no accounts yet, this becomes the root
        if (!this.accountsRoot) {
            this.accountsRoot = newAccount;
            this.transactionHistory.append(`Account created: ${accountNumber} with initial balance $${balance}`);
            return true; // Success
        }

        // Traverse the tree to find the correct insertion point
        let current = this.accountsRoot;
        while (true) {
            // Prevent duplicate account numbers
            if (accountNumber === current.accountNumber) {
                this.transactionHistory.append(`Failed creation: Account ${accountNumber} already exists.`);
                return false; 
            }

            // If the new account number is smaller, go left
            if (accountNumber < current.accountNumber) {
                if (!current.left) {
                    current.left = newAccount;
                    this.transactionHistory.append(`Account created: ${accountNumber} with initial balance $${balance}`);
                    return true;
                }
                current = current.left;
            } 
            // If the new account number is larger, go right
            else {
                if (!current.right) {
                    current.right = newAccount;
                    this.transactionHistory.append(`Account created: ${accountNumber} with initial balance $${balance}`);
                    return true;
                }
                current = current.right;
            }
        }
    }

    // Helper method to view the transaction log
    getHistory() {
        return this.transactionHistory.getAll();
    }

    findAccount(accountNumber){
      let current = this.accountsRoot;
      while(current){
      if(accountNumber === current.accountNumber){
          return current;
      }else if(accountNumber < current.accountNumber){
          current = current.left;
      }else{
          current = current.right;
      }
      return null;
    }
  } 
    checkBalance(accountNumber) { 
        const account = this.findAccount(accountNumber);
        
        if (account) {
            this.transactionHistory.append(`Balance inquiry: Account ${accountNumber} checked balance ($${account.balance}).`);
            return account.balance;
        } else {
            this.transactionHistory.append(`Failed inquiry: Account ${accountNumber} not found.`);
            return null;
        }
    }
    transfer(fromAccountNumber, toAccountNumber, amount) {
        if (amount <= 0) {
            this.transactionHistory.append(`Failed transfer: Invalid amount $${amount}.`);
            return false;
        }

        const fromAccount = this.findAccount(fromAccountNumber);
        const toAccount = this.findAccount(toAccountNumber);

        // Validation checks
        if (!fromAccount) {
            this.transactionHistory.append(`Failed transfer: Source account ${fromAccountNumber} not found.`);
            return false;
        }
        if (!toAccount) {
            this.transactionHistory.append(`Failed transfer: Destination account ${toAccountNumber} not found.`);
            return false;
        }
        if (fromAccount.balance < amount) {
            this.transactionHistory.append(`Failed transfer: Insufficient funds in account ${fromAccountNumber}.`);
            return false;
        }
    
    fromAccount.balance -= amount;
    toAccount.balance += amount;
        
        // Log the success
    this.transactionHistory.append(`Transfer successful: $${amount} from Account ${fromAccountNumber} to Account ${toAccountNumber}.`);
    return true;  
    }   
}

module.exports = Bank;