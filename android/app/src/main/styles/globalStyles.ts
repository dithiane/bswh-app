'use strict';
import { StyleSheet } from 'react-native';
import { colors } from './colors';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardStyle: {
        backgroundColor: colors.dark,
    },
    userName: {
        textAlign: 'left',
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.light,
        backgroundColor: colors.primary,
        zIndex: 100
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.light,
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: colors.primary
    },
    titleContainer: {
        borderTopWidth: 1,
        width: '100%',
        backgroundColor: colors.primary,
        padding: 5
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: colors.dark

    },
    headerText: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10
    },
    getUsersButton: {
        backgroundColor: colors.danger,
        fontSize: 30,
        height: 40,
        padding: 5,
        width: 35,
        borderRadius: 50
    },
    albumContainer: {
        flex: 1,
        marginLeft: 10
    },
    albumRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 20,
        borderColor: colors.light,
        backgroundColor: colors.dark,
        padding: 10,
        zIndex: -1
    },
    albumTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        flexWrap: 'wrap',
        maxWidth: '80%'
    },
    deleteButton: {
        backgroundColor: colors.danger,
        color: colors.light,
        borderRadius: 4,
        width: 60,
        height: 30,
        textAlign: 'center',
        display: "flex",
        justifyContent: "center"
    },
    imagesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        flex: 1, // Set flex to 1 to make the ima
        height: undefined, // Set height to undef
        aspectRatio: 1, // Set aspect ratio to 1 
    },
    imagesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        width: '70%',
        textAlign: 'center',
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.light,
        padding: 10
    },
    starButton: {
        color: colors.light,
        fontSize: 24,
        alignSelf: 'flex-start'
    },
    starButtonPressed: {
        color: colors.info,
        fontSize: 24,
        alignSelf: 'flex-start'
    },
    minusButton: {
        color: colors.info,
        fontSize: 24,
        alignSelf: 'flex-start'
    }
});

export default globalStyles;