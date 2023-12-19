import ReactMoE, { MoEAppStatus } from 'react-native-moengage'

export const MoESetUniqueID = (username: string) => {
    ReactMoE.setUserUniqueID(username);
}

export const MoEUpdateUniqueID = (username: string) => {
    ReactMoE.setAlias(username);
}

export const MoESetName = (name: string) => {
    ReactMoE.setUserName(name);
} 

export const MoESetEmail = (email: string) => {
    ReactMoE.setUserEmailID(email);
} 

export const MoELogout = () => {
    ReactMoE.logout();
} 

export const MoEAppUpdate = (update: boolean) => {
    if (update) {
        ReactMoE.setAppStatus(MoEAppStatus.Update);
    } else {
        ReactMoE.setAppStatus(MoEAppStatus.Install)
    }
} 
