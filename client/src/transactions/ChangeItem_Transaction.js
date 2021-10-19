import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldText, initNewText) {
        super();
        this.store = initStore;
        this.oldText = initOldText;
        this.newText = initNewText;
    }

    doTransaction() {
        console.log(this.oldText, this.newText);
        this.store.changeItem(this.oldText, this.newText);
    }
    
    undoTransaction() {
        this.store.changeItem(this.newText, this.oldText);
    }
}