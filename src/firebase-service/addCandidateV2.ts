import firebase from "firebase/app";
import { candidatePath } from './candidatePath';

export async function addCandidateV2(args: {
    name: string;
    ethAddress: string;
}) {
    await firebase.database().ref(`${candidatePath}/${args.ethAddress}`).set({
        name: args.name,
        ethAddress: args.ethAddress,
        isVerified: false,
    });
    return true;
}