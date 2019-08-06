const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Purchases GET testing', () => {

    it('GET all purchases', () => {
        chai.request('http://localhost:3000')
            .get('/purchases')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an("array");
            });
    });

})





