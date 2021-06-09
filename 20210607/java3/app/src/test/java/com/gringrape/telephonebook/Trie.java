package com.gringrape.telephonebook;

public class Trie {
    TrieNode root;

    Trie() {
        this.root = new TrieNode();
    }

    public boolean search(String word) {
        var currentNode = this.root;
        for (Character letter : word.toCharArray()) {
            if (!currentNode.children.containsKey(letter)) {
                return false;
            }
            currentNode = currentNode.children.get(letter);
        }

        return currentNode.ended;
    }

    public void insert(String word) {
        var currentNode = this.root;
        for (Character letter : word.toCharArray()) {
            if (currentNode.children.containsKey(letter)) {
                currentNode = currentNode.children.get(letter);
                continue;
            }
            var childNode = new TrieNode(letter);
            currentNode.children.put(letter, childNode);
            currentNode = childNode;
        }
        currentNode.end();
    }

    public boolean startsWith(String prefix) {
        var currentNode = this.root;
        for (Character letter : prefix.toCharArray()) {
            if (!currentNode.children.containsKey(letter)) {
                return false;
            }
            currentNode = currentNode.children.get(letter);
        }

        return !currentNode.children.isEmpty();
    }
}
