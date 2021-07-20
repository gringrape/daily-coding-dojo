/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package com.gringrape.gps;

import org.junit.jupiter.api.Test;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

class AppTest {
    class Entry {
        Integer vertex;
        List<Integer> path;

        Entry(Integer vertex, List<Integer> path) {
            this.vertex = vertex;
            this.path = path;
        }
    }

    Map<Integer, List<Integer>> connect(int[][] edges) {
        Map<Integer, List<Integer>> network = new HashMap<>();

        Arrays.stream(edges).forEach(edge -> {
            int vertex1 = edge[0];
            int vertex2 = edge[1];

            network.putIfAbsent(vertex1, new ArrayList<>());
            network.putIfAbsent(vertex2, new ArrayList<>());

            network.get(vertex1).add(vertex2);
            network.get(vertex2).add(vertex1);
        });

        return network;
    }

    @Test void testNetwork() {
        Map<Integer, List<Integer>> network = connect(sampleEdges);

        assertTrue(network.get(1).contains(2));
    }

    List<List<Integer>> traverse(int start, int end, int distance, Map<Integer, List<Integer>> network) {
        List<Entry> queue = new ArrayList<>();
        List<Integer> initialPath = new ArrayList<>();
        initialPath.add(start);

        Entry firstEntry = new Entry(start, initialPath);

        queue.add(firstEntry);

        List<List<Integer>> result = new ArrayList<>();

        while (true) {
            Entry entry = queue.remove(0);
            Integer vertex = entry.vertex;
            List<Integer> path = entry.path;

            if (path.size() > distance) {
                break;
            }

            if (path.size() == distance && vertex == end) {
                result.add(path);
            }

            List<Integer> neighbors = network.get(vertex);
            List<Entry> neighborEntries = neighbors.stream().map(neighbor -> {
                List<Integer> newPath = new ArrayList<>(path);
                newPath.add(neighbor);
                return new Entry(neighbor, newPath);
            }).collect(Collectors.toList());

            queue.addAll(neighborEntries);
        }

        return result;
    }

    @Test void testTraverse() {
        assertTrue(
                traverse(1, 7, 6, connect(sampleEdges))
                    .contains(List.of(1, 2, 3, 4, 6, 7))
        );
    }

    int solution(int n, int m, int[][] edge_list, int k, int[] gps_log) {
        Map<Integer, List<Integer>> network = connect(edge_list);
        int start = gps_log[0];
        int end = gps_log[gps_log.length - 1];

        List<List<Integer>> paths = traverse(start, end, gps_log.length, network);

        // case 1. 애초에 그런 경로가 존재하지 않는다면 수정할 수 없다.
        if (paths.size() == 0) {
            return -1;
        }

        // case 2. 올바른 경로들 중에 원래 경로가 포함되어 있다면 고칠 필요가 없다.
        List<Integer> givenPath = Arrays.stream(gps_log).boxed().collect(Collectors.toList());
        if (paths.contains(givenPath)) {
            return 0;
        }

        Long first = paths.stream().map(path -> IntStream.range(0, path.size())
                .filter(i -> !path.get(i).equals(givenPath.get(i)))
                .count()).sorted().findFirst().get();

        return first.intValue();
    }

    @Test void testSample() {
        assertEquals(
                solution(7, 10, sampleEdges, 6, sampleLogs),
                1
        );

        assertEquals(
                solution(7, 10, sampleEdges, 6, sampleLogs2),
                0
        );
    }

    final int[] sampleLogs = new int[]{1, 2, 3, 3, 6, 7};
    final int[] sampleLogs2 = new int[]{1, 2, 4, 6, 5, 7};

    final int[][] sampleEdges = new int[][]{
            new int[]{1, 2},
            new int[]{1, 3},
            new int[]{2, 3},
            new int[]{2, 4},
            new int[]{3, 4},
            new int[]{3, 5},
            new int[]{4, 6},
            new int[]{5, 6},
            new int[]{5, 7},
            new int[]{6, 7},
    };
}
