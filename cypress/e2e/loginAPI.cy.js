describe('test API auth', () => {
    it('test API auth', () => {
        cy.request('GET', '/');

        const email = 'user456456@test.com';
        const password = 'testuser';

        const formData = new FormData();
        formData.append('Email', email);
        formData.append('Password', password);
        formData.append('RememberMe', remember);

        cy.request({ 
            'method': 'POST', 
            'url': '/login', 
            'body': formData
        });
    });
});