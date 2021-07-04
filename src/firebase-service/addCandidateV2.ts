import firebase from "firebase/app";
import { candidatePath } from './candidatePath';

export async function addCandidateV2(args: {
    name: string;
    ethAddress: string;
}) {
    const existingCandidate = await firebase.database().ref(`${candidatePath}/${args.ethAddress}`).get();
    if (existingCandidate) {
        return false;
    }
    firebase.database().ref(`${candidatePath}/${args.ethAddress}`).set({
        name: args.name,
        ethAddress: args.ethAddress,
    });
}