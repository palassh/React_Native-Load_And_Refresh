import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData()
    return () => {

    }
  }, [pageCurrent])

  const getData = async () => {
    const page = pageCurrent;
    const apiUrl = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=" + pageCurrent
    // setRefreshing(true)
    setLoading(true)
    fetch(apiUrl).then((res) => res.json())
      .then((resjson) => {
        // console.log(apiUrl)
        console.log("apiurl", apiUrl)
        console.log("resjson", resjson)
        if (page == 1) {
          setData(resjson)
        } else {
          setData(data.concat(resjson))
        }
        setLoading(false)
        
      })
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemRow}>
        <Image source={{ uri: item.url }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.id}</Text>
      </View>
    )
  }

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator
      />
    );
  };

  const handleLoadMore = () => {
    if (!loading) {
      console.log("calling laod more")
      setPageCurrent(pageCurrent + 1)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setPageCurrent(1)
    setRefreshing(false)
    // const apiUrl = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1"
    // fetch(apiUrl).then((res) => res.json())
    //   .then((resjson) => {
    //     console.log(apiUrl)
    //     console.log("refreshed")
    //     setRefreshing(false)
    //     setData(data.concat(resjson))
    //     // setData(resjson)
    //   })
  }


  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f5fcff'
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  itemText: {
    fontSize: 16,
    padding: 5
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  }
});
