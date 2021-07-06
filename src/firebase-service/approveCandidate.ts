import firebase from "firebase/app";
import { EnumCandidateVerifyStatus } from "models/EnumCandidateVerifyStatus.model";
import { candidatePath } from './candidatePath';

export async function approveCandidate(args: {
    name: string;
    ethAddress: string;
}) {
    await firebase.database().ref(`${candidatePath}/${args.ethAddress}`).set({
        name: args.name,
        ethAddress: args.ethAddress,
        isVerified: EnumCandidateVerifyStatus.APPROVED,
    });
    return true;
}