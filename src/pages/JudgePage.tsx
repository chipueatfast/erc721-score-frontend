import React from 'react';
import { FormContainer } from 'components/FormContainer';
import { mintAToken } from 'services/mintAToken';
import {Formik} from 'formik';
import { convertScoreFormToScoreHash } from 'services/convertScoreFormToScoreHash';
import { IScore } from 'models/IScore.model';

interface IProps {
    userAddress: string;
}

export function JudgePage(props: IProps) {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    return (
        <div
            style={{
                display: 'block',
            }}
        >
            <Formik
                initialValues={{
                    score: '',
                    subject: '',
                    candidateAddress: '',
                }}
                onSubmit={(values) => {
                    mintAToken({
                        scoreHash: convertScoreFormToScoreHash({
                            ...values,
                            score: Number(values.score),   
                        } as IScore),
                        toAddress: values.candidateAddress,
                        fromAddress: props.userAddress,
                    }).then(result => {
                        if (result.reponse) {
                            setSuccessMessage(`The new minted token ID is: ${result.reponse.tokenId}`)
                        }
                        if ("errorMessage" in result && typeof result.errorMessage === 'string') {
                            setErrorMessage(result.errorMessage);
                        }                        
                    })
                }}
            >
                {
                    ({
                        values,
                        handleSubmit,
                        handleChange,
                    }) => {
                        return (<FormContainer>
                            <div>
                                ---------------------
                                <br/>
                                Create a score token here:
                            </div>
                            <select 
                                value={values.subject}
                                onChange={handleChange}
                                placeholder='<Choose a subject>'
                                name="subject"
                            >
                                <option value="" disabled>Subject</option>
                                <option value="math">Math</option>
                                <option value="literature">Literature</option>
                                <option value="english">English</option>
                            </select>
                            <div>
                                <input
                                    name="score"
                                    placeholder='score'
                                    onChange={handleChange}
                                />
                            </div> 
                            <div>
                                <input
                                    name="candidateAddress"
                                    placeholder='candidate address'
                                    onChange={handleChange}
                                />
                            </div> 
                            {
                                !!successMessage ?
                                <button
                                    onClick={() => window.location.reload()}
                                >
                                    Reset
                                </button> :
                            <button
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Mint a score token
                            </button>
                            }
                            

                        </FormContainer>)
                    }
                }
            </Formik>
            {
                !!errorMessage &&
                <div style={{color: 'red'}}>
                    {errorMessage}
                </div>
            }
            {
                !!successMessage && 
                <div style={{color: 'green'}}>
                    {successMessage}
                </div>
            }
        </div>
    );
}
