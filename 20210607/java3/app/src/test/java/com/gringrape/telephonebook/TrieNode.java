package com.gringrape.telephonebook;

import java.util.HashMap;
import java.util.Map;

public class TrieNode {
    Character value;
    Map<Character, TrieNode> children;
    boolean ended;

    TrieNode(Character letter) {
        this.value = letter;
        this.children = new HashMap<>();
        this.ended = false;
    }

    TrieNode() {
        this.value = null;
        this.children = new HashMap<>();
    }

    void end() {
        this.ended = true;
    }
}
