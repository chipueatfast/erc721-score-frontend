import firebase from "firebase/app";
import { doesKeyExistInObject } from "utils/keyDoesExistInObject";
import { auditorPath } from "./auditorPath";
import { candidatePath } from './candidatePath';
import { judgePath } from './judgePath';
 
export async function detectRole(args: {
    userAddress: string;
}): Promise<{
    titleName: string;
    role: 'JUDGE' | 'AUDITOR' | 'CANDIDATE' | '';
}> {
    const auditorList = (await firebase.database().ref(`${auditorPath}`).get()).val();
    if (doesKeyExistInObject(auditorList, args.userAddress)) {
        return {
            titleName: `Auditor ${auditorList[args.userAddress].name}`,
            role: 'AUDITOR', 
        };
    }
    const judgeList = (await firebase.database().ref(`${judgePath}`).get()).val();
    if (doesKeyExistInObject(judgeList, args.userAddress)) {
        return {
            titleName: `Judge ${judgeList[args.userAddress].name}`,
            role: 'JUDGE', 
        };
    }
    const candidateList = (await firebase.database().ref(`${candidatePath}`).get()).val();
    if (doesKeyExistInObject(candidateList, args.userAddress)) {
        return {
            titleName: `Candidate ${candidateList[args.userAddress].name}`,
            role: 'CANDIDATE' 
        };
    }
    return {
        titleName: '',
        role: '',
    };
}