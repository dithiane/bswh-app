import React, { useState } from 'react';
import { FlatList, Text, Button, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../actions/usersActions';
import { UsersState } from '../reducers/usersReducer';
import Albums from './albums';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootParamList } from '../components/navigation';
import globalStyles from '../styles/globalStyles';
import { View } from 'react-native-animatable';

type UserItemProps = {
    name: string;
    userId: number;
    refresh: boolean;
    onRefresh: () => void;
    navigation: NavigationProp<RootParamList>;
};

/**
 * Renders a user item component.
 *
 * @param {string} name - The name of the user.
 * @param {string} userId - The ID of the user.
 * @param {boolean} refresh - A flag indicating whether the component should refresh.
 * @param {function} onRefresh - The callback function to trigger when refreshing.
 * @param {object} navigation - The navigation object for navigating between screens.
 * @return {ReactElement} The rendered user item component.
 */

const UserItem = ({ name, userId, refresh, onRefresh, navigation }: UserItemProps) => {
    return (
        <View>
            <Text style={globalStyles.userName}>{name}</Text>
            <Albums userId={userId} refresh={refresh} onRefresh={onRefresh} navigation={navigation} />
        </View>
    )
}

type ListHeaderProps = {
    onFetchUsers: () => void;
};

const ListHeaderComponent = ({ onFetchUsers }: ListHeaderProps, usersData: UsersState) => (
    <Pressable onPress={onFetchUsers}>
        <View animation="pulse" easing="ease-out" iterationCount="infinite" >
            <View style={globalStyles.header}>
                <Icon
                    name="refresh"
                    onPress={onFetchUsers}
                    style={globalStyles.getUsersButton} />
                <Text style={globalStyles.headerText}>Press to load Users</Text>
            </View>
        </View>
        <View style={globalStyles.titleContainer}>
            <Text style={globalStyles.title}>Users</Text>
        </View>
    </Pressable>

);

const ListEmptyComponent = () => (
    <View >
        <Text>Nothing to show .. yet</Text>
    </View>
);

const Users = () => {
    const usersData = useSelector((state: {
        users: UsersState
    }) => state.users);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const navigation = useNavigation<NavigationProp<RootParamList>>();


    const handleFetchUsers = async () => {
        setRefresh(true);
        return await dispatch(fetchUsers() as any);
    }
    return (
        <FlatList data={usersData.users} renderItem={({ item }) =>
            <UserItem
                name={item.name}
                userId={item.id}
                refresh={refresh}
                onRefresh={() => setRefresh(false)}
                navigation={navigation}
            />}
            keyExtractor={user => user.id.toString()}
            ListHeaderComponent={<ListHeaderComponent onFetchUsers={handleFetchUsers} {...usersData} />}
            ListEmptyComponent={<ListEmptyComponent />}
            stickyHeaderIndices={[0]}
        />
    );
};

export default Users;
