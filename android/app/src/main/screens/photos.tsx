import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../actions/photosActions';
import { Photo, PhotosState } from '../reducers/photosReducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootParamList } from '../components/navigation';
import globalStyles from '../styles/globalStyles';

/**
 * Renders a photo gallery component.
 *
 * @param {Object} route - The route object containing the album parameter.
 * @return {JSX.Element} The rendered photo gallery component.
 */
const Photos = ({ route }: { route: any }) => {
    const [currentAlbumId, setCurentAlbumId] = useState(route.params?.album.id);
    const [albumId, setAlbumId] = useState(route.params?.album.id);
    const [groupedPhotos, setGroupedPhotos] = useState<Photo[][] | null>(null);

    const navigation = useNavigation<NavigationProp<RootParamList>>();
    const title = route.params?.album.title;
    const photosData = useSelector((state: {
        photos: PhotosState
    }) => state.photos);
    const dispatch = useDispatch();

    const renderIcons = (name: string, onPress: () => void) => (
        <Pressable onPress={onPress}>
            <Icon
                name={name}
                style={albumId && name == "star" ? globalStyles.starButton : globalStyles.starButtonPressed}
            />
        </Pressable>
    );
    const handleFetchPhotos = async (albumId: number | null) => {
        return await dispatch(fetchPhotos(albumId) as any);
    }

    const groupPhotos = (photos: Photo[] | null) => {
        if (!photos) return;
        const currentGroups = [];
        for (let i = 0; i < photos.length; i += 3) {
            const group = photos.slice(i, i + 3);
            currentGroups.push(group);
        }
        setGroupedPhotos(currentGroups);
    }

    useEffect(() => {
        if ((photosData.photos.length > 0 && photosData.loading === false)) {
            groupPhotos(photosData.photos);
        }
    }, [photosData.loading, photosData.photos])


    useEffect(() => {
        handleFetchPhotos(albumId);
    }, [albumId])

    const loadAllImages = () => {
        setAlbumId(albumId ? null : currentAlbumId)
    }

    const navigateToAlbums = () => {
        navigation.navigate('Users', {});
    }

    return (
        <View>
            <View style={globalStyles.menuContainer}>
                {renderIcons('chevron-left', navigateToAlbums)}
                <Text style={globalStyles.imagesTitle}>{albumId ? title : 'All Photos'}</Text>
                {renderIcons('star', loadAllImages)}
            </View>
            <FlatList
                data={groupedPhotos}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row' }}>
                        {item.map((photo) => (
                            <View key={photo.id} style={globalStyles.imageContainer}>
                                <Image source={{ uri: photo.thumbnailUrl }} style={globalStyles.image} />
                            </View>
                        ))}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )

}
export default Photos;

