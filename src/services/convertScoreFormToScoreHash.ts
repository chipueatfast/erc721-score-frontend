import sha256 from 'crypto-js/sha256';
import { IScore } from 'models/IScore.model';

export function convertScoreFormToScoreHash(scoreObj: IScore): string {
    return sha256(JSON.stringify(scoreObj)).toString();
}