class ChallengesApiClient {

    static SERVER_URL = 'http://localhost:8080';
    static GET_CHALLENGE = '/challenges/random';
    static POST_RESULT = '/attempts';
    static GET_ATTEMPTS_BY_ALIAS = '/attempts?alias=';
    static GET_USERS_BY_IDS = '/users';

    static challenge(): Promise<Response> {
        return fetch(ChallengesApiClient.SERVER_URL +
            ChallengesApiClient.GET_CHALLENGE);
    }

    static sendGuess(user: string,
                     a: number,
                     b: number,
                     guess: number): Promise<Response> {
        return fetch(ChallengesApiClient.SERVER_URL +
            ChallengesApiClient.POST_RESULT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        userAlias: user,
                        factorA: a,
                        factorB: b,
                        guess: guess
                    }
                )
            });
    }

    static getAttempts(userAlias: string): Promise<Response> {
        return fetch(ChallengesApiClient.SERVER_URL +
            ChallengesApiClient.GET_ATTEMPTS_BY_ALIAS + userAlias);
    }

    static getUsers(userIds: number[]): Promise<Response> {
        return fetch(ChallengesApiClient.SERVER_URL +
            ChallengesApiClient.GET_USERS_BY_IDS +
            '/' + userIds.join(','));
    }
}

export default ChallengesApiClient;
