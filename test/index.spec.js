const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Index GET testing', () => {

    it('Get initial info', () => {
        chai.request('http://localhost:3000')
            .get('/')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200); ;
            });
    });
})