/**
 * The root parameter list for React Navigation.
 */
export type RootParamList = {
    Users: {}; // No parameters for the Users screen
    Albums: { userId: number }; // The userId parameter for the Albums screen
    Photos: { albumId: number }; // The albumId parameter for the Photos screen
};