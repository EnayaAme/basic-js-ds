const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;    
    this.parent = null;    
    this.left = null;        
    this.right = null;     
  }
}
class BinarySearchTree {

  constructor() {
      this.root = null;    
  }

  root() {
      return this.root;
  }

  add(data) {
    this.root = addWithin(this.root, data);   
    
    function addWithin(node, data) {
      if (!node) {                                         
        return new Node(data);                 
      }
      if (node.data === data) {              
        return node;                                    
      }
      if (data < node.data) {                                   
        node.left = addWithin(node.left, data);	    
      } else {                                                    
        node.right = addWithin(node.right, data); 
      }
      return node;
    }
}

  has(data) {
    //throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    return searchWithin(this.root, data);   // ищем в главном дереве какое-то значение 

    function searchWithin(node, data) {
      if (!node) {                                             // если пришли к пустому узлу, …
        return false;                                        // … искомого элемента нет, и возвращаем false
      }

      if (node.data === data) {                  // если пришли к узлу c искомым значением, …
        return true;                                         // … то вернем true
      }

      return data < node.data ?               // если пришли к узлу, но его значение больше искомого, …
        searchWithin(node.left, data) :      // … то попробуем проделать тот же поиск на левом поддереве, …
        searchWithin(node.right, data);    // … а если меньше, то попробуем проделать тот же поиск на правом поддереве, …
    }

  }

  find(data) {
    //throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    return searchWithin(this.root, data);   // ищем в главном дереве какое-то значение 

    function searchWithin(node, data) {
      if (!node) {                                             // если пришли к пустому узлу, …
        return false;                                        // … искомого элемента нет, и возвращаем false
      }

      if (node.data === data) {                  // если пришли к узлу c искомым значением, …
        return true;                                         // … то вернем true
      }

      return data < node.data ?               // если пришли к узлу, но его значение больше искомого, …
        searchWithin(node.left, data) :      // … то попробуем проделать тот же поиск на левом поддереве, …
        searchWithin(node.right, data);    // … а если меньше, то попробуем проделать тот же поиск на правом поддереве, …
    }
  }

  remove(data) {
    //throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    this.root = removeNode(this.root, data);  // кладем в корень то, что получится после всех наших преобразований

    function removeNode(node, value) {
      if (!node) {                                                  // если узла нет, ...
        return null;						   // … то так и оставляем
      }

      if (data < node.data) {   					// если значение узла больше искомого значения, …
        node.left = removeNode(node.left, data);      //  … запускаем поиск на левом поддереве
        return node;							       // возвращаем обновленное поддерево
      } else if (node.data < data) {                             // если значение узла меньше искомого значения, …
        node.right = removeNode(node.right, data);  //  … запускаем поиск на правом поддереве
        return node; 								// возвращаем обновленное поддерево
      } else {                                                                    // если значение узла равно нужному, …

        if (!node.left && !node.right) {                            // … проверяем, является ли он листом.
          return null;                                                         // если да, то приравниваем его к нулю, тем самым удаляя.
        }

        if (!node.left) {                    // если у узла нет левого потомка, …
          node = node.right;           // … ставим его правого потомка на место нашего узла 
          return node;         	     // возвращаем новый узел (обновленное поддерево)
        }

        if (!node.right) {         // если у узла нет правого потомка, …
          node = node.left;    // … ставим его левого потомка на место нашего узла 
          return node;            // возвращаем новый узел (обновленное поддерево)
        }
        // если у узла есть оба потомка, то нам надо найти либо минимальное значение в правом поддереве, либо максимальное в левом
        let minFromRight = node.right; // здесь проработаем вариант минимальное значение в правом поддереве и начинаем с корня правого поддерева
        while (minFromRight.left) {       // минимальные значения - слева, значит идем по левой ветке правого поддерева до конца…
          minFromRight = minFromRight.left; // дойдя до конца, присваиваем новое значение нашей переменной…
        }
        node.data = minFromRight.data;  // …и ставим на место удаляемого узла, …

        node.right = removeNode(node.right, minFromRight.data); // …а сам элемент с минимальным значением удаляем из конца дерева

        return node;
      }
    }
    

  }

  min() {
    //throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    if (!this.root) {                // проверим, есть ли вообще элементы в дереве
      return null;
    }

    let node = this.root;      // если есть, то начинаем искать с корня влево … 
    while (node.left) {         // … и когда дойдем влево до конца, … 
      node = node.left;        // … запоминаем этот самый левый узел…
    }

    return node.data;        // … и возвращаем его значение
  }

  max() {
    //throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    if (!this.root) {                // проверим, есть ли вообще элементы в дереве
      return null;
    }

    let node = this.root;      // если есть, то начинаем искать с корня вправо … 
    while (node.right) {      // … и когда дойдем вправо до конца, …
      node = node.right;    // … запоминаем этот самый правый узел…
    }

    return node.data;     // … и возвращаем его значение
  }
}

module.exports = {
  BinarySearchTree
};