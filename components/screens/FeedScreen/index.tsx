import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { FlatList, Text } from 'native-base'
import { ActivityIndicator } from 'react-native'

// src
import { FeedStackNavigationParamList } from '../../stacks/FeedScreenStack'
import { axiosClient } from '../../../utills/apiUtills'
import Post, {UserType} from '../../atoms/Post'
import ScreenView from '../../atoms/ScreenView'

type FeedScreenNavigation = NativeStackNavigationProp<FeedStackNavigationParamList, 'FeedScreen'>

export type PostType = {
  id: number,
  text: string | null,
  title: string,
  image: string | null,
  createdAt: string,
  user: UserType
}

export type PostsMetaType = {
  page: number,
  totalCount: number,
  totalPages: number
}

interface PostResponse {
  data: PostType[]
  meta: PostsMetaType
}

interface Props {
  navigation: FeedScreenNavigation
}

const defaultPostsData: PostResponse = {
  data: [],
  meta: {
    page: 1,
    totalCount: 1,
    totalPages: 1
  }
}

export default function FeedScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<PostType[]>(defaultPostsData.data)
  // const [meta, setMeta] = useState<PostsMetaType>(defaultPostsData.meta)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const fetchPosts = () => {
    axiosClient.get(`/v1/posts?page=${page}&per=5`)
      .then((response) => {
        // isRefreshing
        //   ? setPosts(response.data.data)
        //   : setPosts([...posts, ...response.data.data])
        // setMeta(response.data.meta)
        setPosts(response.data.data)
        setIsLoading(false)
        // setIsRefreshing(false)
      })
      .catch((error) => {
        setIsLoading(false)
        // setIsRefreshing(false)
      })
  }

  // const fetchMore = () => {
  //   if (!isLoading && meta.totalPages > page) {
  //     setPage(page + 1)
  //   }
  // }

  // const refresh = () => {
  //   if (!isLoading && !isRefreshing) {
  //     setIsRefreshing(true)
  //     setPage( 1)
  //   }
  // }

  useEffect(() => {
    setIsLoading(true)
    fetchPosts()
  }, [page])

  return (
    <ScreenView>
      <FlatList
        data={posts}
        // onRefresh={refresh}
        // onEndReached={fetchMore}
        // refreshing={isRefreshing}
        // onEndReachedThreshold={0.4}
        // ListEmptyComponent={!isLoading && !isRefreshing && posts.length === 0
        //   ? <Text>There are no Posts yet</Text>
        //   : null
        // }
        // ListFooterComponent={isLoading
        //   ? <ActivityIndicator size="large" />
        //   : null
        // }
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(data, index) => data.id + '-' + index}
        showsVerticalScrollIndicator={false}
      />
    </ScreenView>
  )
}
