import firebase from "firebase/app";

export async function addCandidateToFirebaseService(args: {
    roomId: string;
    ethAddress: string;
    candidateName: string;
    score: number;
}): Promise<void> {
    firebase.database().ref(`candidate-results/${args.roomId}/${args.ethAddress}`).set({
        id: args.ethAddress,
        name: args.candidateName,
        score: args.score,
        createdDate: (new Date()).toString(),
    });
}