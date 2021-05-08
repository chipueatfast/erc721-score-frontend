import React from 'react';
import { Formik } from 'formik';
import { FormContainer } from 'components/FormContainer';
import { getScoreHash } from 'services/getScoreHash';

export function CandidatePage() {
    return (
        <div>
            <Formik
                initialValues={{
                    tokenId: '',
                }}
                onSubmit={(values) => {
                    getScoreHash({
                        tokenId: Number(values.tokenId),
                    })
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                }) => {
                    return (<FormContainer>
                        <div>
                            <input 
                                name='tokenId'
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            onClick={() => handleSubmit()}
                        >
                            Search for result
                        </button>

                    </FormContainer>)
                }}
            </Formik>
        </div>
    );
}