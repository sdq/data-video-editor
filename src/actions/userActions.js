import ActionType from '@/actions/types';

export const updateUserFolder = (userFolderId) => ({
    type: ActionType.UPDATE_USER_FOLDER,
    userFolderId
})

export const updateUserInfo =(userInfo) =>(
    {
        type :ActionType.UPDATE_USER_INFO,
        userInfo
    }
)