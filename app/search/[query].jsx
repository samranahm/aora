import {View, Text, FlatList} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const query = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() =>
    searchPosts(query?.query || "")
  );
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
        <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text
              className="font-pmedium text-sm
                text-gray-100"
            >
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {query.query}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>

            <View className="mt-1.5"></View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Video Found"
            subtitle="No video found for this search query"
          />
        )}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Search;
