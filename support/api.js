const getToken = () => {
    if (Cypress.env('token')) {
        return cy.wrap(Cypress.env('token'));
    } else {
        return cy.request('POST', '/oauth/token', {
            'client_id': 3,
            'grant_type': 'password',
            'username': 'admin',
            'password': 'admin',
        }).then(res => {
            let token = res.body.access_token
            Cypress.env('token', token);
            return token;
        });
    }
}

const setRunAsUser = (response) => {
    for (const assignable of response.assignable) {
        if(assignable.type === 'script') {
            updateScriptRunAsUser(assignable.id);
        }
    }
};

const updateScriptRunAsUser = (scriptId) => {
    return getToken().then(token => {
        return cy.request({
            method: 'GET',
            url: '/api/1.0/scripts/' + scriptId,
            auth: { bearer: token },
        }).then(res => {
            const script = res.body;
            return cy.request({
                method: 'PUT',
                url: '/api/1.0/scripts/' + scriptId,
                auth: { bearer: token },
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                },
                body: {
                    run_as_user_id: 2,
                    title: script.title,
                    language: script.language,
                    description: script.description,
                }
            });
        });
    });
};

exports.importProcess = (file) => {
    return getToken().then(token => {
        return cy.fixture(`processes/${file}.json`).then(content => {
            var formdata = new FormData();
            formdata.append(
                "file",
                new Blob([JSON.stringify(content)]),
                'process.json'
            );
            formdata.append('queue', 0);
            cy.request({
                method: 'POST',
                url: '/api/1.0/processes/import',
                auth: { bearer: token },
                headers: {
                    'content-type': 'multipart/form-data',
                    'accept': 'application/json',
                },
                body: formdata,
            }).then(res => {
                let response = JSON.parse(new TextDecoder().decode(res.body));
                setRunAsUser(response);
                return cy.then(() => {
                    return response.process.id;
                })
            });
        });
    });
};