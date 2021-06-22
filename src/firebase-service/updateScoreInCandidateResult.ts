import firebase from "firebase/app";

export async function updateScoreInCandidateResult(args: {
    roomId: string;
    tokenId: number;
    ethAddress: string;
    newScore: number;
    candidateName: string
}): Promise<void> {
    firebase.database().ref(`candidate-results/${args.roomId}/${args.ethAddress}`).set({
        id: args.ethAddress,
        name: args.candidateName,
        score: args.newScore,
        createdDate: (new Date()).toString(),
        tokenId: args.tokenId,
    });
}