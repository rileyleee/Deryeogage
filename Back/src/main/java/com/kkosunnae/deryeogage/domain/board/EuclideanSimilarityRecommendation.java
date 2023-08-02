package com.kkosunnae.deryeogage.domain.board;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class EuclideanSimilarityRecommendation {

    public static List<Integer> recommendDogs(int[] userPreferences, Map<Integer, int[]> dogs, String order) {
        //int[] weights = {5, 4, 3, 2, 1}; // 가중치는 내부에 고정되어 있다고 가정
        int[] weights = new int[5];
        for(int i=0;i<5;i++){
            weights[i]=6-Character.getNumericValue(order.charAt(i));
        }

        List<Integer> result = new ArrayList<>();


        TreeMap<Double, List<Integer>> similarityMap = new TreeMap<>(); // 정렬 순서 변경

        for(int id : dogs.keySet()){
            double similarity = euclideanDistance(userPreferences, dogs.get(id), weights);
            similarityMap.computeIfAbsent(similarity, k -> new ArrayList<>()).add(id);
        }

        System.out.println("Top 5 Recommended Dogs:");
        int count = 0;
        L:for (Map.Entry<Double, List<Integer>> entry : similarityMap.entrySet()) {
            for (Integer index : entry.getValue()) {
                System.out.println("Dog " + index + " with similarity (lower is better): " + entry.getKey());
                result.add(index);
                if (++count >= 5) break L;
            }
        }
        return result;
    }

    public static double euclideanDistance(int[] preferences, int[] dog, int[] weights) {
        double sum = 0;
        for (int i = 0; i < preferences.length; i++) {
            double diff = (weights[i] * preferences[i] - weights[i] * dog[i]);
            sum += diff * diff;
        }
        return Math.sqrt(sum);
    }
}
