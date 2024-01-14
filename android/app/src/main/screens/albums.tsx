import React, { useEffect, useState } from 'react';
import { Text, FlatList, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../actions/albumsActions';
import { Album, AlbumsState } from '../reducers/albumsReducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../styles/globalStyles';
import { View } from 'react-native-animatable';

/**
+ * A component that displays a list of albums for a specific user.
+ *
+ * @param {number} userId - The ID of the user whose albums should be fetched.
+ * @param {boolean} refresh - (optional) Whether to refresh the list of albums.
+ * @param {Function} onRefresh - A callback function to be called when the list of albums is refreshed.
+ * @param {NavigationProp<RootParamList>} navigation - The navigation object from React Navigation.
+ * @returns {JSX.Element} The rendered component.
+ */
const Albums = ({ userId, refresh, onRefresh, navigation }: {
  userId: number,
  refresh?: boolean,
  onRefresh: () => void,
  navigation: any
}) => {

  if (refresh === undefined) {
    refresh = false; // Set default value if refresh is not provided
  }
  const [deletedAlbumTitles, setDeletedAlbumTitles] = useState<string[]>([]);
  const albumsData = useSelector((state: {
    albums: AlbumsState
  }) => state.albums);
  const dispatch = useDispatch();

  const handleFetchAlbums = async (id: number) => await dispatch(
    fetchAlbums(id) as any
  );

  const handleDeleteAlbum = (title: string) => {
    setDeletedAlbumTitles(prevTitles => [
      ...prevTitles,
      title
    ]);
  };

  useEffect(() => {
    handleFetchAlbums(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (refresh) {
      setDeletedAlbumTitles([]);
      onRefresh();
    }
  }, [refresh])

  const handlePressTitle = (album: Album) => {
    navigation.navigate('Photos', { album: album });
  };

  return (
    <FlatList
      style={globalStyles.albumContainer}
      data={albumsData.albums}
      renderItem={({ item }) => {
        // Check if the album title is in the deletedAlbumTitles array
        if (deletedAlbumTitles.includes(item.title)) {
          return null; // Skip rendering this item if it has been deleted
        }
        return (
          <View style={globalStyles.albumContainer}>
            <View style={globalStyles.albumRow} animation="slideInDown" iterationCount={5} direction="alternate">
              <Pressable onPress={() => handlePressTitle(item)}>
                <Text style={globalStyles.albumTitle}>{item.title}</Text>
              </Pressable>
              <Pressable onPress={() => handleDeleteAlbum(item.title)}>
                <Icon
                  name="minus"
                  style={globalStyles.minusButton} />
              </Pressable>
            </View>
          </View>
        );
      }}
      keyExtractor={(
        item) => item.id  // Use the item's ID as the key for each item
          ?.toString()} />
  )
};

export default Albums;
